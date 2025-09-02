import { Rcon } from 'rcon-client';
import { config } from '../../src/config/config';
import { CryptoService } from './CryptoService';

export interface ServerInfo {
  playerCount: number;
  maxPlayers: number;
  serverName: string;
  map: string;
  gameMode: string;
  playerList: string[];
  ping: number;
  isOnline: boolean;
  fps: number;
  uptime: string;
}

export class RconService {
  private rcon: Rcon | null = null;
  private isConnected = false;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private lastServerInfo: ServerInfo | null = null;

  constructor() {
    if (config.rcon.enabled) {
      this.connect();
    }
  }

  /**
   * Connexion RCON au serveur Arma 3
   */
  private async connect(): Promise<void> {
    try {
      // Déchiffrer la configuration pour utilisation
      const decryptedConfig = CryptoService.decryptCredentials(config);

      this.rcon = new Rcon({
        host: decryptedConfig.rcon.host,
        port: decryptedConfig.rcon.port,
        password: decryptedConfig.rcon.password,
        timeout: decryptedConfig.rcon.timeout
      });

      await this.rcon.connect();
      this.isConnected = true;
      console.log('✅ RCON connecté au serveur Arma 3');

      // Programmer la reconnexion automatique
      this.scheduleReconnect();

    } catch (error) {
      console.error('❌ Erreur connexion RCON:', error);
      this.isConnected = false;
      this.scheduleReconnect();
    }
  }

  /**
   * Programmer une reconnexion automatique
   */
  private scheduleReconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }

    this.reconnectTimer = setTimeout(() => {
      if (!this.isConnected) {
        console.log('🔄 Tentative de reconnexion RCON...');
        this.connect();
      }
    }, config.rcon.reconnectInterval);
  }

  /**
   * Récupérer les informations du serveur en temps réel
   */
  async getServerInfo(): Promise<ServerInfo> {
    if (!this.isConnected || !this.rcon) {
      // Retourner les infos par défaut si RCON indisponible
      return this.getDefaultServerInfo();
    }

    try {
      const startTime = Date.now();

      // Commandes RCON Arma 3
      const [playersResponse, statusResponse, fpsResponse] = await Promise.allSettled([
        this.rcon.send('players'),
        this.rcon.send('#status'),
        this.rcon.send('#monitor')
      ]);

      const ping = Date.now() - startTime;

      // Parser les réponses
      const playerInfo = this.parsePlayersResponse(
        playersResponse.status === 'fulfilled' ? playersResponse.value : ''
      );

      const statusInfo = this.parseStatusResponse(
        statusResponse.status === 'fulfilled' ? statusResponse.value : ''
      );

      const fpsInfo = this.parseFpsResponse(
        fpsResponse.status === 'fulfilled' ? fpsResponse.value : ''
      );

      const serverInfo: ServerInfo = {
        playerCount: playerInfo.count,
        maxPlayers: config.server.maxSlots,
        serverName: statusInfo.name || config.server.name,
        map: statusInfo.map || config.server.map,
        gameMode: config.server.gameMode,
        playerList: playerInfo.players,
        ping,
        isOnline: true,
        fps: fpsInfo.fps,
        uptime: statusInfo.uptime || '0:00:00'
      };

      this.lastServerInfo = serverInfo;
      return serverInfo;

    } catch (error) {
      console.error('❌ Erreur récupération infos RCON:', error);
      this.isConnected = false;
      this.scheduleReconnect();

      // Retourner les dernières infos connues ou par défaut
      return this.lastServerInfo || this.getDefaultServerInfo();
    }
  }

  /**
   * Parser la réponse de la commande 'players'
   */
  private parsePlayersResponse(response: string): { count: number; players: string[] } {
    const lines = response.split('\n').filter(line => line.trim());
    const players: string[] = [];

    for (const line of lines) {
      // Format typique: "0  192.168.1.1:2304  0  PlayerName (Lobby)"
      const match = line.match(/^\d+\s+[\d.]+:\d+\s+\d+\s+(.+?)(?:\s+\(.*?\))?$/);
      if (match && match[1] && match[1].trim() !== '') {
        players.push(match[1].trim());
      }
    }

    return {
      count: players.length,
      players
    };
  }

  /**
   * Parser la réponse de la commande '#status'
   */
  private parseStatusResponse(response: string): { name?: string; map?: string; uptime?: string } {
    const result: { name?: string; map?: string; uptime?: string } = {};

    const lines = response.split('\n');
    for (const line of lines) {
      if (line.includes('Mission:')) {
        const match = line.match(/Mission:\s*(.+)/);
        if (match) result.map = match[1].trim();
      }
      if (line.includes('Server name:')) {
        const match = line.match(/Server name:\s*(.+)/);
        if (match) result.name = match[1].trim();
      }
      if (line.includes('Uptime:')) {
        const match = line.match(/Uptime:\s*(.+)/);
        if (match) result.uptime = match[1].trim();
      }
    }

    return result;
  }

  /**
   * Parser la réponse de la commande '#monitor'
   */
  private parseFpsResponse(response: string): { fps: number } {
    const match = response.match(/fps:\s*(\d+)/i);
    return {
      fps: match ? parseInt(match[1], 10) : 50 // FPS par défaut
    };
  }

  /**
   * Informations par défaut si RCON indisponible
   */
  private getDefaultServerInfo(): ServerInfo {
    return {
      playerCount: 0,
      maxPlayers: config.server.maxSlots,
      serverName: config.server.name,
      map: config.server.map,
      gameMode: config.server.gameMode,
      playerList: [],
      ping: 0,
      isOnline: false,
      fps: 0,
      uptime: '0:00:00'
    };
  }

  /**
   * Exécuter une commande RCON personnalisée
   */
  async executeCommand(command: string): Promise<string> {
    if (!this.isConnected || !this.rcon) {
      throw new Error('RCON non connecté');
    }

    try {
      return await this.rcon.send(command);
    } catch (error) {
      console.error('❌ Erreur commande RCON:', error);
      throw error;
    }
  }

  /**
   * Fermer la connexion RCON
   */
  async disconnect(): Promise<void> {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.rcon) {
      try {
        await this.rcon.disconnect();
      } catch (error) {
        console.error('Erreur fermeture RCON:', error);
      }
      this.rcon = null;
    }

    this.isConnected = false;
  }

  /**
   * Vérifier si RCON est connecté
   */
  isRconConnected(): boolean {
    return this.isConnected;
  }
}
