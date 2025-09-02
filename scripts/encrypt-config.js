#!/usr/bin/env node
/**
 * Script pour chiffrer la configuration avant build de production
 * Usage: node scripts/encrypt-config.js
 */

import fs from "fs-extra";
import path from "node:path";
import crypto from "node:crypto";

// Même logique que CryptoService mais pour Node.js pur
class ConfigCrypto {
  static ALGORITHM = 'aes-256-gcm';
  static KEY_LENGTH = 32;
  static IV_LENGTH = 16;
  static TAG_LENGTH = 16;

  static generateKey() {
    const appName = "ar3url_launcher";
    const appVersion = "5.0.0";
    const machineId = process.env.COMPUTERNAME || process.env.HOSTNAME || 'default';

    const keySource = `${appName}-${appVersion}-${machineId}-Arma-LAUNCHER-SECRET`;
    return crypto.scryptSync(keySource, 'salt', this.KEY_LENGTH);
  }

  static encrypt(text) {
    try {
      const key = this.generateKey();
      const iv = crypto.randomBytes(this.IV_LENGTH);
      const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);

      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      const tag = cipher.getAuthTag();

      return iv.toString('hex') + tag.toString('hex') + encrypted;
    } catch (error) {
      console.error('Erreur chiffrement:', error);
      return text;
    }
  }

  static isEncrypted(data) {
    return data.length >= (this.IV_LENGTH + this.TAG_LENGTH) * 2;
  }
}

async function encryptConfigFile() {
  const configPath = path.join(process.cwd(), 'src/config/config.ts');
  const configBackupPath = path.join(process.cwd(), 'src/config/config.original.ts');

  console.log('🔐 Chiffrement de la configuration pour production...');

  if (!fs.existsSync(configPath)) {
    console.error('❌ Fichier config.ts non trouvé');
    process.exit(1);
  }

  // Lire la configuration AVANT de décider du backup
  let configContent = await fs.readFile(configPath, 'utf8');

  // Parser la config (méthode simple pour ce cas)
  const configMatch = configContent.match(/export const config = ({[\s\S]*?});/);
  if (!configMatch) {
    console.error('❌ Format de config invalide');
    process.exit(1);
  }

  let configObj;
  try {
    // Évaluer la config de manière sécurisée
    configObj = eval(`(${configMatch[1]})`);
  } catch (error) {
    console.error('❌ Erreur parsing config:', error);
    process.exit(1);
  }

  // Détecter si la config est déjà chiffrée
  const isAlreadyEncrypted = Boolean(
    configObj?._encrypted === true ||
    (configObj?.rcon?.password && typeof configObj.rcon.password === 'string' && ConfigCrypto.isEncrypted(configObj.rcon.password))
  );

  // Gérer le backup intelligemment pour ne JAMAIS sauvegarder une version chiffrée comme original
  if (!isAlreadyEncrypted) {
    let shouldBackup = true;
    if (fs.existsSync(configBackupPath)) {
      try {
        const backupContent = await fs.readFile(configBackupPath, 'utf8');
        const backupMatch = backupContent.match(/export const config = ({[\s\S]*?});/);
        if (backupMatch) {
          const backupObj = eval(`(${backupMatch[1]})`);
          const backupEncrypted = Boolean(
            backupObj?._encrypted === true ||
            (backupObj?.rcon?.password && typeof backupObj.rcon.password === 'string' && ConfigCrypto.isEncrypted(backupObj.rcon.password))
          );
          // Si le backup existe et n'est PAS chiffré, on ne l'écrase pas
          // Si le backup est chiffré, on va le remplacer par la version en clair actuelle
          shouldBackup = backupEncrypted;
        } else {
          // Format inconnu: on remplace pour assurer un original en clair
          shouldBackup = true;
        }
      } catch {
        // En cas d'erreur lecture/parsing, on écrase avec la version en clair courante
        shouldBackup = true;
      }
    }

    if (shouldBackup) {
      await fs.copy(configPath, configBackupPath);
      console.log('💾 Backup sauvé/mis à jour: config.original.ts');
    }
  } else {
    console.log('ℹ️ Config déjà chiffrée — pas de backup, pas de re-chiffrement.');
    return;
  }

  // Chiffrer les credentials sensibles
  if (configObj.rcon?.password && !ConfigCrypto.isEncrypted(configObj.rcon.password)) {
    const originalPassword = configObj.rcon.password;
    configObj.rcon.password = ConfigCrypto.encrypt(originalPassword);
    console.log(`🔒 RCON password chiffré: ${originalPassword} → ${configObj.rcon.password.substring(0, 20)}...`);
  }

  // Marquer comme chiffré
  configObj._encrypted = true;
  configObj._encryptedAt = Date.now();

  // Réécrire le fichier avec la config chiffrée
  const newConfigContent = `export const config = ${JSON.stringify(configObj, null, 2)};`;
  await fs.writeFile(configPath, newConfigContent);

  console.log('✅ Configuration chiffrée avec succès !');
  console.log('📁 Original sauvé dans config.original.ts');
  console.log('🔒 Credentials protégés dans le build');
}

async function restoreOriginalConfig() {
  const configPath = path.join(process.cwd(), 'src/config/config.ts');
  const configBackupPath = path.join(process.cwd(), 'src/config/config.original.ts');

  if (fs.existsSync(configBackupPath)) {
    await fs.copy(configBackupPath, configPath);
    console.log('🔄 Configuration originale restaurée');
  } else {
    console.log('⚠️ Aucun backup trouvé');
  }
}

// Exécution du script
const command = process.argv[2];

if (command === 'restore') {
  restoreOriginalConfig()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('❌ Erreur:', error);
      process.exit(1);
    });
} else {
  encryptConfigFile()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('❌ Erreur:', error);
      process.exit(1);
    });
}
