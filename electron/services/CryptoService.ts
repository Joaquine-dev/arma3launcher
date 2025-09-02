import crypto from "node:crypto";
import { app } from "electron";

/**
 * Service de chiffrement pour protéger les credentials sensibles
 * Utilise une clé dérivée de l'ID de l'application pour le chiffrement
 */
export class CryptoService {
  private static readonly ALGORITHM = 'aes-256-gcm';
  private static readonly KEY_LENGTH = 32;
  private static readonly IV_LENGTH = 16;
  private static readonly TAG_LENGTH = 16;

  /**
   * Génère une clé de chiffrement unique basée sur l'app
   */
  private static generateKey(): Buffer {
    const appName = app.getName();
    const appVersion = app.getVersion();
    const machineId = process.env.COMPUTERNAME || process.env.HOSTNAME || 'default';

    // Créer une clé unique mais reproductible pour cette installation
    const keySource = `${appName}-${appVersion}-${machineId}-Arma-LAUNCHER-SECRET`;
    return crypto.scryptSync(keySource, 'salt', CryptoService.KEY_LENGTH);
  }

  /**
   * Chiffre une chaîne de caractères
   */
  static encrypt(text: string): string {
    try {
      const key = this.generateKey();
      const iv = crypto.randomBytes(this.IV_LENGTH);
      const cipher = crypto.createCipher(this.ALGORITHM, key);

      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      const tag = cipher.getAuthTag();

      // Combiner IV + Tag + Données chiffrées
      return iv.toString('hex') + tag.toString('hex') + encrypted;
    } catch (error) {
      console.error('Erreur chiffrement:', error);
      return text; // Fallback en cas d'erreur
    }
  }

  /**
   * Déchiffre une chaîne de caractères
   */
  static decrypt(encryptedData: string): string {
    try {
      const key = this.generateKey();

      // Extraire IV, Tag et données
      const iv = Buffer.from(encryptedData.slice(0, this.IV_LENGTH * 2), 'hex');
      const tag = Buffer.from(encryptedData.slice(this.IV_LENGTH * 2, (this.IV_LENGTH + this.TAG_LENGTH) * 2), 'hex');
      const encrypted = encryptedData.slice((this.IV_LENGTH + this.TAG_LENGTH) * 2);

      const decipher = crypto.createDecipheriv(this.ALGORITHM, key, iv);
      decipher.setAuthTag(tag);

      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (error) {
      console.error('Erreur déchiffrement:', error);
      return encryptedData; // Retourner tel quel si erreur
    }
  }

  /**
   * Vérifie si une chaîne est chiffrée
   */
  static isEncrypted(data: string): boolean {
    // Une chaîne chiffrée fait au moins (IV + TAG) * 2 caractères hex
    return data.length >= (this.IV_LENGTH + this.TAG_LENGTH) * 2;
  }

  /**
   * Chiffre les credentials sensibles dans la config
   */
  static encryptCredentials(config: any): any {
    const configCopy = JSON.parse(JSON.stringify(config));

    // Chiffrer le mot de passe RCON
    if (configCopy.rcon?.password && !this.isEncrypted(configCopy.rcon.password)) {
      configCopy.rcon.password = this.encrypt(configCopy.rcon.password);
      console.log('🔒 Mot de passe RCON chiffré');
    }

    // Chiffrer d'autres credentials si nécessaires
    // Exemple: API keys, tokens, etc.

    return configCopy;
  }

  /**
   * Déchiffre les credentials pour utilisation
   */
  static decryptCredentials(config: any): any {
    const configCopy = JSON.parse(JSON.stringify(config));

    // Déchiffrer le mot de passe RCON
    if (configCopy.rcon?.password && this.isEncrypted(configCopy.rcon.password)) {
      configCopy.rcon.password = this.decrypt(configCopy.rcon.password);
    }

    return configCopy;
  }
}

/**
 * Utilitaire pour chiffrer la config avant build
 * À utiliser dans un script de build
 */
export function encryptConfigForProduction() {
  const fs = require('fs-extra');
  const path = require('path');

  const configPath = path.join(__dirname, '../../src/config/config.ts');
  const configContent = fs.readFileSync(configPath, 'utf8');

  // Parser et chiffrer
  const config = eval(configContent.replace('export const config =', '').replace(/;$/, ''));
  const encryptedConfig = CryptoService.encryptCredentials(config);

  // Sauvegarder la version chiffrée
  const encryptedConfigContent = `export const config = ${JSON.stringify(encryptedConfig, null, 2)};`;
  const encryptedConfigPath = path.join(__dirname, '../../src/config/config.encrypted.ts');

  fs.writeFileSync(encryptedConfigPath, encryptedConfigContent);
  console.log('🔒 Configuration chiffrée sauvée dans config.encrypted.ts');
}
