import dgram from 'dgram';
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

      // Query A2S_INFO via UDP sur le port Query
      const queryPort = (config.server as any).queryPort || config.server.port;
      console.log(`🔍 Steam Query vers ${config.server.ip}:${queryPort}...`);
      const serverInfo = await this.queryServerInfo(config.server.ip, queryPort);

      

      console.log('Info: Server info:', serverInfo);
      const ping = Date.now() - startTime;

      // Essayer de récupérer la liste des joueurs
      let playerList: string[] = [];
      try {
        playerList = await this.queryPlayerList(config.server.ip, config.server.port);
      } catch (playerError) {
        console.log('Info: Liste des joueurs non disponible');
      }

      const publicInfo: PublicServerInfo = {
        playerCount: serverInfo.players || 0,
        maxPlayers: serverInfo.maxPlayers || config.server.maxSlots,
        serverName: serverInfo.name || config.server.name,
        map: serverInfo.map || config.server.map,
        gameMode: serverInfo.game || config.server.gameMode,
        ping: ping,
        isOnline: true,
        version: serverInfo.version || 'Unknown',
        playerList: playerList
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

  /**
   * Query A2S_INFO - Informations serveur (protocole Steam natif)
   */
  private async queryServerInfo(ip: string, port: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const client = dgram.createSocket('udp4');
      const timeout = setTimeout(() => {
        client.close();
        reject(new Error('Timeout'));
      }, 3000);

      // Paquet A2S_INFO
      const packet = Buffer.from([
        0xFF, 0xFF, 0xFF, 0xFF, // Header
        0x54, // A2S_INFO
        0x53, 0x6F, 0x75, 0x72, 0x63, 0x65, 0x20, 0x45, 0x6E, 0x67, 0x69, 0x6E, 0x65, 0x20, 0x51, 0x75, 0x65, 0x72, 0x79, 0x00 // "Source Engine Query"
      ]);

      client.on('message', (msg) => {
        clearTimeout(timeout);
        client.close();

        try {
          const response = this.parseA2SInfoResponse(msg);
          resolve(response);
        } catch (parseError) {
          reject(parseError);
        }
      });

      client.on('error', (err) => {
        clearTimeout(timeout);
        client.close();
        reject(err);
      });

      client.send(packet, port, ip);
    });
  }

  /**
   * Parser la réponse A2S_INFO
   */
  private parseA2SInfoResponse(buffer: Buffer): any {
    let offset = 4; // Skip header
    const type = buffer.readUInt8(offset++);

    if (type !== 0x49) { // A2S_INFO response
      throw new Error('Invalid A2S_INFO response');
    }

    // Protocol version
    const protocol = buffer.readUInt8(offset++);

    // Server name (null-terminated string)
    const nameStart = offset;
    while (buffer[offset] !== 0 && offset < buffer.length) offset++;
    const name = buffer.toString('utf8', nameStart, offset);
    offset++; // Skip null terminator

    // Map name
    const mapStart = offset;
    while (buffer[offset] !== 0 && offset < buffer.length) offset++;
    const map = buffer.toString('utf8', mapStart, offset);
    offset++;

    // Folder name
    const folderStart = offset;
    while (buffer[offset] !== 0 && offset < buffer.length) offset++;
    const folder = buffer.toString('utf8', folderStart, offset);
    offset++;

    // Game name
    const gameStart = offset;
    while (buffer[offset] !== 0 && offset < buffer.length) offset++;
    const game = buffer.toString('utf8', gameStart, offset);
    offset++;

    // Skip app ID (2 bytes)
    offset += 2;

    // Players
    const players = buffer.readUInt8(offset++);
    const maxPlayers = buffer.readUInt8(offset++);

    return {
      protocol,
      name,
      map,
      folder,
      game,
      players,
      maxPlayers,
      version: 'Steam'
    };
  }

  /**
   * Query simple de la liste des joueurs
   */
  private async queryPlayerList(ip: string, port: number): Promise<string[]> {
    // Pour simplifier, retourner une liste vide
    // L'implémentation complète A2S_PLAYER est plus complexe
    return [];
  }

  /**
   * Ping simple du serveur
   */
  async pingServer(): Promise<{ online: boolean; ping: number }> {
    try {
      const startTime = Date.now();
      await this.queryServerInfo(config.server.ip, config.server.port);
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
      const serverInfo = await this.queryServerInfo(config.server.ip, config.server.port);
      return {
        count: serverInfo.players || 0,
        max: serverInfo.maxPlayers || config.server.maxSlots
      };
    } catch (error) {
      return { count: 0, max: config.server.maxSlots };
    }
  }
}
