import { ipcMain, BrowserWindow, dialog, shell } from "electron";
import fs from "fs-extra";
import Store from "electron-store";
import Registry from "winreg";
import path from "node:path";
import { config } from "../src/config/config";
import { spawn } from "child_process";

import { downloadFileWithResume } from "./services/ModDownloadService";
import { ManifestService } from "./services/ManifestService";
import { NewsService } from "./services/NewsService";
import { SteamQueryService } from "./services/SteamQueryService";

// Configuration du store simplifié
const store = new Store({
  name: "userData",
  cwd: "arma3-data",
  fileExtension: "json",
});

// Services modernes
let newsService: NewsService | null = null;
let steamQueryService: SteamQueryService | null = null;

// Fonction pour récupérer le chemin d'Arma 3 depuis le registre Windows
async function getArma3PathFromRegistry(): Promise<string | null> {
  return new Promise((resolve) => {
    const regKey = new Registry({
      hive: Registry.HKLM,
      key: "\\SOFTWARE\\WOW6432Node\\Bohemia Interactive\\Arma 3",
    });
    regKey.get("main", (err, item) => {
      resolve(err || !item ? null : item.value);
    });
  });
}

// Vérifie si le mod Arma 3 est installé
function isModInstalled(arma3Path: string): boolean {
  return fs.existsSync(`${arma3Path}\\${config.mods.folderName}`);
}

// Vérifie si le chemin d'Arma 3 est valide
async function isValidArma3Path(path: string): Promise<boolean> {
  return await fs.pathExists(`${path}\\arma3.exe`);
}



// Envoie un message au processus de rendu
function sendMessage(
  win: BrowserWindow,
  message: string,
  success?: string,
  error?: string,
  data?: string,
  fileProgress?: string,
  timeRemaining?: string
) {
  win?.webContents.send("main-process-message", {
    message,
    success,
    error,
    data,
    fileProgress,
    timeRemaining,
  });
}

// Gestionnaire principal IPC
export function setupIpcHandlers(win: BrowserWindow) {
  // Initialiser Steam Query (SANS MOT DE PASSE)
  if (config.steamQuery.enabled) {
    steamQueryService = new SteamQueryService();
    console.log(`✅ Steam Query activé pour ${config.server.ip}:${config.server.port}`);

    // Mettre à jour les infos serveur via Steam Query
    setInterval(async () => {
      try {
        const serverInfo = await steamQueryService!.getPublicServerInfo();
        if (serverInfo.isOnline) {
          sendMessage(win, "server-info-update", JSON.stringify({
            playerCount: serverInfo.playerCount,
            maxPlayers: serverInfo.maxPlayers,
            serverName: serverInfo.serverName,
            map: serverInfo.map,
            gameMode: serverInfo.gameMode,
            ping: serverInfo.ping,
            isOnline: true,
            fps: 0, // Pas disponible via Steam Query
            uptime: '0:00:00', // Pas disponible via Steam Query
            playerList: serverInfo.playerList
          }));
        } else {
          // Serveur hors ligne
          sendMessage(win, "server-info-update", JSON.stringify({
            isOnline: false
          }));
        }
      } catch (error) {
        console.error("Erreur mise à jour infos serveur:", error);
        // En cas d'erreur, indiquer que le serveur est hors ligne
        sendMessage(win, "server-info-update", JSON.stringify({
          isOnline: false
        }));
      }
    }, config.steamQuery.refreshInterval);
  }

  // Initialiser le service d'actualités
  const arma3DataPath = path.join(process.env.APPDATA || process.env.HOME || '', 'arma3-data');
  newsService = new NewsService(config.news.url, arma3DataPath);

  // Gestionnaire de chargement initial
  win.webContents.on("did-finish-load", async () => {
    let arma3Path = store.get("arma3Path") as string | null;
    const firstLaunch = store.get("firstLaunch");

    // Chargement des actualités (système JSON moderne)
    try {
      if (newsService) {
        const newsItems = await newsService.getNews();
        console.log(`✅ ${newsItems.length} actualités chargées`);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des actualités:", error);
    }

    // Tente de récupérer le chemin depuis le registre si non défini
    if (!arma3Path || arma3Path === "null") {
      arma3Path = await getArma3PathFromRegistry();
      if (arma3Path) store.set("arma3Path", arma3Path);
    }

    if (arma3Path && arma3Path !== "null") {
      // Vérifie l'installation du mod
      const modInstalled = isModInstalled(arma3Path);
      sendMessage(
        win,
        modInstalled ? "arma3Path-mod-loaded" : "arma3Path-mod-not-loaded",
        undefined,
        !modInstalled ? `Mod ${config.mods.folderName} non installé` : undefined
      );

      // Message de première utilisation
      if (firstLaunch) {
        sendMessage(
          win,
          "firstLaunch-done",
          "Nous vous avons trouvé Arma 3 automatiquement"
        );
        store.set("firstLaunch", false);
      }
    } else {
      store.set("arma3Path", null);
      sendMessage(win, "arma3Path-not-loaded");
    }

    // Vérification optimisée des mods
    await checkModsWithManifest(win);
  });

  // Gestionnaire de sélection manuelle du dossier Arma 3
  ipcMain.on("locate-arma3", async () => {
    try {
      const result = await dialog.showOpenDialog({
        properties: ["openDirectory"],
        title: "Sélectionner le dossier d'installation d'Arma 3",
        defaultPath: "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Arma 3",
      });

      if (!result.canceled && result.filePaths.length > 0) {
        const selectedPath = result.filePaths[0];

        if (await isValidArma3Path(selectedPath)) {
          store.set("arma3Path", selectedPath);
          sendMessage(win, "arma3Path-ready", "Arma 3 trouvé");
          await checkModsWithManifest(win);
        } else {
          sendMessage(
            win,
            "arma3Path-invalid",
            undefined,
            "Le dossier sélectionné ne contient pas Arma 3"
          );
        }
      }
    } catch (error) {
      console.error("Erreur lors de la sélection du dossier Arma 3:", error);
      sendMessage(
        win,
        "arma3Path-error",
        undefined,
        error instanceof Error ? error.message : "Erreur inconnue"
      );
    }
  });

  // Gestionnaire de vérification manuelle des mods
  ipcMain.on("check-mods", async () => {
    console.log("🔄 Vérification manuelle des mods demandée");
    await checkModsWithManifest(win);
  });

  // Gestionnaire de téléchargement des mods OPTIMISÉ avec Manifest
  ipcMain.on("download-mods", async () => {
    const arma3Path = store.get("arma3Path") as string | null;
    if (!arma3Path) {
      sendMessage(win, "download-error", undefined, "Chemin Arma 3 non trouvé");
      return;
    }

    const modPath = `${arma3Path}\\${config.mods.folderName}`;
    const addonsPath = `${modPath}\\addons`;

    try {
      await fs.ensureDir(addonsPath);
      sendMessage(win, "download-start");

      // Utiliser le système Manifest pour téléchargement optimisé
      const manifestService = new ManifestService(config.mods.manifestUrl, modPath);
      const delta = await manifestService.calculateDelta(addonsPath);

      if (delta.toDownload.length === 0) {
        sendMessage(win, "download-complete", "Mods déjà à jour");
        return;
      }

      const totalSize = delta.totalDownloadSize;
      let downloadedSize = 0;
      const startTime = Date.now();
      let lastProgressUpdate = 0;

      // Téléchargement avec progression
      for (const fileToDownload of delta.toDownload) {
        const destination = path.join(addonsPath, fileToDownload.name);
        let lastBytesForThisFile = 0;

        await downloadFileWithResume(
          `${config.mods.urlMods}/${fileToDownload.name}`,
          destination,
          (p) => {
            const bytesForThisFile = Math.floor((fileToDownload.size || 0) * (p.percent / 100));
            const deltaBytes = Math.max(0, bytesForThisFile - lastBytesForThisFile);
            lastBytesForThisFile = bytesForThisFile;
            downloadedSize = Math.min(totalSize, downloadedSize + deltaBytes);

            const elapsedTime = (Date.now() - startTime) / 1000;
            const downloadSpeed = downloadedSize / Math.max(elapsedTime, 0.001);
            const remainingSize = Math.max(0, totalSize - downloadedSize);
            const estimatedTimeRemaining = Math.round(remainingSize / Math.max(downloadSpeed, 1));
            const minutes = Math.floor(estimatedTimeRemaining / 60);
            const seconds = Math.round(estimatedTimeRemaining % 60);
            const timeRemaining = `${minutes}m ${seconds}s`;

            const globalProgress = totalSize > 0 ? Math.round((downloadedSize / totalSize) * 100) : 0;
            const fileProgress = Math.round(p.percent);

            if (Date.now() - lastProgressUpdate > 1000) {
              sendMessage(
                win,
                "download-progress",
                globalProgress.toString(),
                undefined,
                fileToDownload.name,
                fileProgress.toString(),
                timeRemaining
              );
              lastProgressUpdate = Date.now();
            }
          },
          fileToDownload.hash
        );
      }

      // Sauvegarder le nouveau manifest local
      const serverManifest = await manifestService.fetchServerManifest();
      if (serverManifest) {
        await manifestService.saveLocalManifest(serverManifest);
      }

      sendMessage(win, "download-complete", "Mods synchronisés avec succès");
      sendMessage(win, "arma3Path-mod-loaded", "Jeu prêt à être lancé");
    } catch (error) {
      console.error("Erreur lors de la synchronisation des mods:", error);
      sendMessage(
        win,
        "download-error",
        undefined,
        error instanceof Error ? error.message : "Erreur inconnue"
      );
    }
  });

  // Gestionnaire de récupération du chemin d'Arma 3
  ipcMain.handle("get-arma3-path", async () => {
    const arma3Path = store.get("arma3Path") as string | null;
    if (!arma3Path) return null;
    return arma3Path;
  });

  // Gestionnaire de lancement du jeu
  ipcMain.handle("launch-game", async () => {
    const arma3Path = store.get("arma3Path") as string | null;

    const defaultParamsx64 = "-skipIntro -noSplash -enableHT -malloc=jemalloc_bi_x64 -hugePages -noPause -noPauseAudio";
    const defaultParamsx86 = "-skipIntro -noSplash -enableHT -malloc=jemalloc_bi -hugePages -noPause -noPauseAudio";

    if (!arma3Path) return;

    const is64bit = process.arch === 'x64';
    const exeName = is64bit ? "arma3_x64.exe" : "arma3.exe";
    const defaultParams = is64bit ? defaultParamsx64 : defaultParamsx86;
    const arma3PathExe = path.join(arma3Path, exeName);

    if (!fs.existsSync(arma3PathExe)) {
      sendMessage(win, "launch-game-error", undefined, `Impossible de trouver ${exeName}`);
      return;
    }

    spawn(arma3PathExe, [defaultParams]);
    sendMessage(win, "launch-game-success", "Jeu lancé avec succès");

    setTimeout(() => {
      win.close();
    }, 5000);
  });

  // Connexion directe au serveur (lancement + -connect/-port)
  ipcMain.handle("connect-server", async () => {
    const arma3Path = store.get("arma3Path") as string | null;

    const defaultParamsx64 = "-skipIntro -noSplash -enableHT -malloc=jemalloc_bi_x64 -hugePages -noPause -noPauseAudio";
    const defaultParamsx86 = "-skipIntro -noSplash -enableHT -malloc=jemalloc_bi -hugePages -noPause -noPauseAudio";

    if (!arma3Path) return;

    const is64bit = process.arch === 'x64';
    const exeName = is64bit ? "arma3_x64.exe" : "arma3.exe";
    const defaultParams = is64bit ? defaultParamsx64 : defaultParamsx86;
    const arma3PathExe = path.join(arma3Path, exeName);

    if (!fs.existsSync(arma3PathExe)) {
      sendMessage(win, "launch-game-error", undefined, `Impossible de trouver ${exeName}`);
      return;
    }

    const connectArgs = `-connect=${config.server.ip} -port=${config.server.port}`;
    spawn(arma3PathExe, [`${defaultParams} ${connectArgs}`]);
    sendMessage(win, "launch-game-success", "Jeu lancé — connexion au serveur en cours");

    setTimeout(() => {
      win.close();
    }, 5000);
  });

  // Gestionnaire des actualités
  ipcMain.handle("get-news", async () => {
    if (!newsService) return [];
    try {
      return await newsService.getNews();
    } catch (error) {
      console.error("Erreur récupération actualités:", error);
      return [];
    }
  });

  ipcMain.handle("get-critical-news", async () => {
    if (!newsService) return [];
    try {
      return await newsService.getCriticalNews();
    } catch (error) {
      console.error("Erreur récupération actualités critiques:", error);
      return [];
    }
  });

  // Gestionnaire des infos serveur via Steam Query (SANS MOT DE PASSE)
  ipcMain.handle("get-server-info", async () => {
    // Priorité 1: Steam Query (public, sans password)
    if (steamQueryService) {
      try {
        const steamInfo = await steamQueryService.getPublicServerInfo();
        return {
          playerCount: steamInfo.playerCount,
          maxPlayers: steamInfo.maxPlayers,
          serverName: steamInfo.serverName,
          map: steamInfo.map,
          gameMode: steamInfo.gameMode,
          ping: steamInfo.ping,
          isOnline: steamInfo.isOnline,
          fps: 0, // Pas disponible via Steam Query
          uptime: '0:00:00', // Pas disponible via Steam Query
          playerList: steamInfo.playerList
        };
      } catch (error) {
        console.error("Erreur Steam Query:", error);
      }
    }

    // Aucune info disponible - retourner null pour indiquer "hors ligne"
    return null;
  });

  // Ouvrir un lien dans le navigateur
  ipcMain.handle("open-url", async (_, url) => {
    shell.openExternal(url);
  });

  // Contrôles de fenêtre
  ipcMain.on("close-app", () => {
    win.close();
  });

  ipcMain.on("minimize-app", () => {
    win.minimize();
  });

  // Gestionnaire de téléchargement des mods OPTIMISÉ
  ipcMain.on("download-mods", async () => {
    const arma3Path = store.get("arma3Path") as string | null;
    if (!arma3Path) {
      sendMessage(win, "download-error", undefined, "Chemin Arma 3 non trouvé");
      return;
    }

    const modPath = `${arma3Path}\\${config.mods.folderName}`;
    const addonsPath = `${modPath}\\addons`;

    try {
      await fs.ensureDir(addonsPath);
      sendMessage(win, "download-start");

      // Utiliser le système Manifest pour téléchargement optimisé
      const manifestService = new ManifestService(config.mods.manifestUrl, modPath);
      const delta = await manifestService.calculateDelta(addonsPath);

      if (delta.toDownload.length === 0) {
        sendMessage(win, "download-complete", "Mods déjà à jour");
        return;
      }

      const totalSize = delta.totalDownloadSize;
      let downloadedSize = 0;
      const startTime = Date.now();
      let lastProgressUpdate = 0;

      // Téléchargement avec progression en temps réel
      for (const fileToDownload of delta.toDownload) {
        const destination = path.join(addonsPath, fileToDownload.name);
        let lastBytesForThisFile = 0;

        await downloadFileWithResume(
          `${config.mods.urlMods}/${fileToDownload.name}`,
          destination,
          (p) => {
            const bytesForThisFile = Math.floor((fileToDownload.size || 0) * (p.percent / 100));
            const deltaBytes = Math.max(0, bytesForThisFile - lastBytesForThisFile);
            lastBytesForThisFile = bytesForThisFile;
            downloadedSize = Math.min(totalSize, downloadedSize + deltaBytes);

            const elapsedTime = (Date.now() - startTime) / 1000;
            const downloadSpeed = downloadedSize / Math.max(elapsedTime, 0.001);
            const remainingSize = Math.max(0, totalSize - downloadedSize);
            const estimatedTimeRemaining = Math.round(remainingSize / Math.max(downloadSpeed, 1));
            const minutes = Math.floor(estimatedTimeRemaining / 60);
            const seconds = Math.round(estimatedTimeRemaining % 60);
            const timeRemaining = `${minutes}m ${seconds}s`;

            const globalProgress = totalSize > 0 ? Math.round((downloadedSize / totalSize) * 100) : 0;
            const fileProgress = Math.round(p.percent);

            if (Date.now() - lastProgressUpdate > 1000) {
              sendMessage(
                win,
                "download-progress",
                globalProgress.toString(),
                undefined,
                fileToDownload.name,
                fileProgress.toString(),
                timeRemaining
              );
              lastProgressUpdate = Date.now();
            }
          },
          fileToDownload.hash
        );
      }

      // Sauvegarder le nouveau manifest local
      const serverManifest = await manifestService.fetchServerManifest();
      if (serverManifest) {
        await manifestService.saveLocalManifest(serverManifest);
      }

      sendMessage(win, "download-complete", "Mods synchronisés avec succès");
      sendMessage(win, "arma3Path-mod-loaded", "Jeu prêt à être lancé");
    } catch (error) {
      console.error("Erreur lors de la synchronisation des mods:", error);
      sendMessage(
        win,
        "download-error",
        undefined,
        error instanceof Error ? error.message : "Erreur inconnue"
      );
    }
  });
}

// Vérification optimisée des mods avec Manifest
async function checkModsWithManifest(win: BrowserWindow) {
  const arma3Path = store.get("arma3Path") as string | null;
  if (!arma3Path) return false;

  const modPath = `${arma3Path}\\${config.mods.folderName}`;
  const addonsPath = `${modPath}\\addons`;

  try {
    await fs.ensureDir(addonsPath);

    // Initialiser le service de manifest
    const manifestService = new ManifestService(config.mods.manifestUrl, modPath);

    // TOUJOURS calculer les différences avec le manifest serveur d'abord
    const delta = await manifestService.calculateDelta(addonsPath);

    // Si aucune différence détectée, faire une vérification rapide d'intégrité pour confirmer
    if (delta.toDownload.length === 0 && delta.toDelete.length === 0) {
      const isQuickCheckOk = await manifestService.quickIntegrityCheck(
        addonsPath,
        config.performance.quickCheckSampleSize
      );

      if (isQuickCheckOk) {
        sendMessage(win, "mods-check-complete", "Mods à jour");
        return true;
      }

      // Si le check rapide échoue, forcer une re-synchronisation
      console.log("⚠️ Quick check failed, forcing re-sync - will re-download suspicious files");
      // On continue vers la logique de téléchargement pour forcer une re-sync
    }

    // Nettoyer les anciens fichiers
    for (const fileToDelete of delta.toDelete) {
      const filePath = path.join(addonsPath, fileToDelete);
      if (await fs.pathExists(filePath)) {
        await fs.remove(filePath);
      }
    }

    // Notifier les mises à jour nécessaires
    if (config.maintenance) {
      sendMessage(win, "maintenance", "Le serveur est en maintenance, merci de réessayer plus tard");
    } else if (delta.toDownload.length > 0) {
      const sizeGB = (delta.totalDownloadSize / 1024 / 1024 / 1024).toFixed(2);
      sendMessage(
        win,
        "updateMod-needed",
        `${delta.toDownload.length} fichier(s) à synchroniser (${sizeGB} GB)`
      );
    }

    return true;
  } catch (error) {
    console.error("Erreur lors de la vérification des mods:", error);
    sendMessage(win, "mods-check-error", undefined, "Erreur de vérification");
    return false;
  }
}
