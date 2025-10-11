import { queryGameServerInfo, queryGameServerPlayer } from 'steam-server-query';
import { config } from '../../src/config/config';

export interface PublicServerInfo {
  playerCount: number;
  maxPlayers: number;
  serverName: string;
  map: string;
  gameMode: string;
  ping: number;
  isOnline: boolean;
  version: string;
  playerList: string[];
}

export class SteamQueryService {
  private lastServerInfo: PublicServerInfo | null = null;
  private lastQueryTime = 0;
  private readonly CACHE_DURATION = 10000; // 10 secondes de cache
  private consecutiveErrors = 0;
  private lastErrorLogTime = 0;
  private readonly ERROR_LOG_INTERVAL = 60000; // Logger les erreurs max 1 fois par minute

  /**
   * Implémentation native du protocole Steam Query A2S_INFO
   * Aucun mot de passe requis - informations publiques
   */
  async getPublicServerInfo(): Promise<PublicServerInfo> {
    const now = Date.now();

    // Utiliser le cache si récent
    if (this.lastServerInfo && (now - this.lastQueryTime) < this.CACHE_DURATION) {
      return this.lastServerInfo;
    }

    try {
      const startTime = Date.now();

      const queryPort = config.servers[0].queryPort || config.servers[0].port;
      const host = `${config.servers[0].ip}:${queryPort}`;

      // Logger seulement si pas d'erreurs récentes
      if (this.consecutiveErrors === 0) {
        console.log(`🔍 Steam Query vers ${host}...`);
      }

      const info = await queryGameServerInfo(
        host,
        1,
        15000 // Augmenté à 15 secondes
      );

      let playerList: string[] = [];
      try {
        const players = await queryGameServerPlayer(
          host,
          1,
          15000
        );
        // players: tableau d'objets { name, score, duration }
        playerList = Array.isArray(players) ? players.map((p: any) => p?.name).filter(Boolean) : [];
      } catch (playerError) {
        // Silencieux - liste joueurs optionnelle
      }

      const ping = Date.now() - startTime;

      const publicInfo: PublicServerInfo = {
        playerCount: (info as any)?.players ?? 0,
        maxPlayers: (info as any)?.maxPlayers ?? config.servers[0].maxSlots,
        serverName: (info as any)?.name ?? config.servers[0].name,
        map: (info as any)?.map ?? '',
        gameMode: (info as any)?.game ?? '',
        ping,
        isOnline: true,
        version: (info as any)?.version ?? 'Unknown',
        playerList
      };

      this.lastServerInfo = publicInfo;
      this.lastQueryTime = now;

      // Logger succès seulement après des erreurs ou périodiquement
      const wasOffline = this.consecutiveErrors > 0;
      this.consecutiveErrors = 0; // Reset compteur d'erreurs

      if (wasOffline) {
        console.log(`✅ Steam Query reconnecté: ${publicInfo.playerCount}/${publicInfo.maxPlayers} joueurs, ${ping}ms`);
      }

      return publicInfo;

    } catch (error) {
      this.consecutiveErrors++;

      // Logger l'erreur seulement 1 fois par minute max
      const shouldLog = (now - this.lastErrorLogTime) > this.ERROR_LOG_INTERVAL;
      if (shouldLog) {
        console.warn(`⚠️ Steam Query indisponible (${this.consecutiveErrors} échecs) - Le serveur est peut-être hors ligne ou le port ${config.servers[0].queryPort} n'est pas ouvert`);
        this.lastErrorLogTime = now;
      }

      // Pas d'infos fantômes - juste indiquer que c'est offline
      const offlineInfo: PublicServerInfo = {
        playerCount: 0,
        maxPlayers: 0,
        serverName: '',
        map: '',
        gameMode: '',
        ping: 0,
        isOnline: false,
        version: '',
        playerList: []
      };

      this.lastServerInfo = offlineInfo;
      this.lastQueryTime = now;

      return offlineInfo;
    }
  }

  // Les implémentations UDP natives sont remplacées par la librairie steam-server-query

  /**
   * Ping simple du serveur
   */
  async pingServer(): Promise<{ online: boolean; ping: number }> {
    try {
      const startTime = Date.now();
      const queryPort = config.servers[0].queryPort || config.servers[0].port;
      const host = `${config.servers[0].ip}:${queryPort}`;
      await queryGameServerInfo(
        host,
        1,
        15000
      );
      const ping = Date.now() - startTime;

      return { online: true, ping };
    } catch (error) {
      return { online: false, ping: 0 };
    }
  }

  /**
   * Vérifier si le serveur est en ligne
   */
  async isServerOnline(): Promise<boolean> {
    const result = await this.pingServer();
    return result.online;
  }

  /**
   * Obtenir seulement le nombre de joueurs (requête très rapide)
   */
  async getPlayerCount(): Promise<{ count: number; max: number }> {
    try {
      const queryPort = config.servers[0].queryPort || config.servers[0].port;
      const host = `${config.servers[0].ip}:${queryPort}`;
      const serverInfo = await queryGameServerInfo(
        host,
        1,
        15000
      );
      return {
        count: (serverInfo as any)?.players ?? 0,
        max: (serverInfo as any)?.maxPlayers ?? config.servers[0].maxSlots
      };
    } catch (error) {
      return { count: 0, max: config.servers[0].maxSlots };
    }
  }
}
