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

      const queryPort = (config.server as any).queryPort || config.server.port;
      const host = `${config.server.ip}:${queryPort}`;
      console.log(`🔍 Steam Query via lib vers ${host}...`);

      const info = await queryGameServerInfo(
        host,
        1,
        (config as any)?.steamQuery?.timeout ?? 3000
      );

      let playerList: string[] = [];
      try {
        const players = await queryGameServerPlayer(
          host,
          1,
          (config as any)?.steamQuery?.timeout ?? 3000
        );
        // players: tableau d'objets { name, score, duration }
        playerList = Array.isArray(players) ? players.map((p: any) => p?.name).filter(Boolean) : [];
      } catch (playerError) {
        console.log('Info: Liste des joueurs non disponible');
      }

      const ping = Date.now() - startTime;

      const publicInfo: PublicServerInfo = {
        playerCount: (info as any)?.players ?? 0,
        maxPlayers: (info as any)?.maxPlayers ?? config.server.maxSlots,
        serverName: (info as any)?.name ?? config.server.name,
        map: (info as any)?.map ?? config.server.map,
        gameMode: (info as any)?.game ?? config.server.gameMode,
        ping,
        isOnline: true,
        version: (info as any)?.version ?? 'Unknown',
        playerList
      };

      this.lastServerInfo = publicInfo;
      this.lastQueryTime = now;

      console.log(`✅ Steam Query: ${publicInfo.playerCount}/${publicInfo.maxPlayers} joueurs, ${ping}ms`);
      return publicInfo;

    } catch (error) {
      console.error('❌ Erreur Steam Query:', error);

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
      const queryPort = (config.server as any).queryPort || config.server.port;
      const host = `${config.server.ip}:${queryPort}`;
      await queryGameServerInfo(
        host,
        1,
        (config as any)?.steamQuery?.timeout ?? 3000
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
      const queryPort = (config.server as any).queryPort || config.server.port;
      const host = `${config.server.ip}:${queryPort}`;
      const serverInfo = await queryGameServerInfo(
        host,
        1,
        (config as any)?.steamQuery?.timeout ?? 3000
      );
      return {
        count: (serverInfo as any)?.players ?? 0,
        max: (serverInfo as any)?.maxPlayers ?? config.server.maxSlots
      };
    } catch (error) {
      return { count: 0, max: config.server.maxSlots };
    }
  }
}
