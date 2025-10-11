import { Play, Clock, Server, CheckCircle, Target } from 'lucide-react'
import type { LauncherState } from '../../types/launcher'

export function HomeTab({
  serverStatus,
  playerCount,
  maxPlayers,
  modsStatus,
  state,
  selectedServer,
  servers,
  selectedServerId,
  onSelectServer,
  onConnect,
  onRefreshStatus,
}: {
  arma3Path: string | null
  serverStatus: string
  playerCount: number
  maxPlayers: number
  serverName: string
  serverMap: string
  serverPing: number
  serverFps: number
  serverUptime: string
  hasRconData: boolean
  modsStatus: 'synced' | 'outdated' | 'downloading'
  state: LauncherState
  selectedServer: any
  servers: any[]
  selectedServerId: string
  onSelectServer: (serverId: string) => void
  onConnect: () => void
  onRefreshStatus: () => void
}) {
  return (
    <div className="space-y-4">
      {/* Hero - Accueillant et Responsive */}
      <div className="hero-container relative overflow-hidden rounded-2xl">
        {/* Background avec effet parallax */}
        <div className="absolute inset-0 hero-bg opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-transparent to-blue-900/10"></div>

        {/* Contenu principal */}
        <div className="relative z-10 p-4 sm:p-6">
          <div className="max-w-5xl mx-auto">
            {/* Badge et titre principal */}
            <div className="text-center mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="text-orange-300 text-sm font-medium uppercase tracking-wider">Serveur Français • Semi‑RP</span>
              </div>

              <h2 className="hero-title text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-orange-100 to-orange-200 leading-tight mb-3">
                CHANGEZ DE VIE
              </h2>

              <p className="text-base text-orange-200/90 font-light max-w-2xl mx-auto leading-relaxed mb-4">
                Rejoignez <span className="font-semibold text-orange-100">Serveur ARMA III RPG</span>, le serveur ARMA III RPG nouvelle génération.
              </p>

              {/* Stats en temps réel */}
              <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-4">
                <div className="stats-card-compact">
                  <div className="text-xl font-bold text-green-400">{playerCount}</div>
                  <div className="text-xs text-gray-400">Joueurs</div>
                </div>
                <div className="stats-card-compact">
                  <div className="text-xl font-bold text-blue-400">{maxPlayers - playerCount}</div>
                  <div className="text-xs text-gray-400">Places</div>
                </div>
                <div className="stats-card-compact">
                  <div className={`text-xl font-bold ${serverStatus === 'online' ? 'text-green-400' : 'text-red-400'}`}>
                    {serverStatus === 'online' ? '🟢' : '🔴'}
                  </div>
                  <div className="text-xs text-gray-400">{serverStatus === 'online' ? 'En ligne' : 'Hors ligne'}</div>
                </div>
              </div>
            </div>

            {/* Badges de statut */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <span className="badge badge--success">
                <CheckCircle className="w-3 h-3" />
                Ouverture 29/08/2025
              </span>
              <span className="badge badge--info">
                <Target className="w-3 h-3" />
                BETA Ouverte
              </span>
            </div>

            {/* Sélecteur de serveur */}
            {servers.length > 1 && (
              <div className="mb-6">
                <div className="text-center mb-4">
                  <label className="inline-flex items-center gap-2 text-sm text-orange-200/80 font-medium">
                    <Server className="w-4 h-4" />
                    Choisissez votre serveur
                  </label>
                  <p className="text-xs text-gray-400 mt-1">Sélectionnez le serveur sur lequel vous souhaitez jouer</p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {servers.map((server, index) => (
                    <button
                      key={server.id}
                      onClick={() => onSelectServer(server.id)}
                      className={`server-selector ${server.id === selectedServerId
                        ? 'server-selector-active'
                        : 'server-selector-inactive'
                        }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="server-name text-sm">{server.shortName}</span>
                      <span className={`server-status ${server.status === 'production' ? 'server-status-production' :
                        server.status === 'beta' ? 'server-status-beta' :
                          'server-status-maintenance'
                        }`}>
                        {server.status === 'production' ? 'PROD' :
                          server.status === 'beta' ? 'BETA' : 'MAINT'}
                      </span>
                    </button>
                  ))}
                </div>
                {/* Indicateur du serveur sélectionné */}
                <div className="text-center mt-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-orange-300 font-medium">
                      {selectedServer?.name || 'Aucun serveur sélectionné'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              {serverStatus === 'online' && modsStatus === 'synced' ? (
                <button
                  onClick={onConnect}
                  className="btn-join hero-cta-primary"
                >
                  <Play className="w-5 h-5" />
                  <span>Rejoindre le serveur</span>
                </button>
              ) : (
                <button
                  onClick={onRefreshStatus}
                  className="btn-join hero-cta-primary"
                >
                  <Clock className={`w-5 h-5 ${state === 'checking' ? 'animate-spin' : 'animate-pulse'}`} />
                  <span>{state === 'checking' ? 'Vérification...' : 'Actualiser le statut'}</span>
                </button>
              )}

              {/* Bouton Site Web déplacé pour ne pas être à côté de "Rejoindre le serveur" */}
            </div>

            {/* Info supplémentaire */}
            <div className="text-center mt-4 pt-3 border-t border-orange-600/20">
              <p className="text-xs text-gray-400 max-w-xl mx-auto">
                <span className="font-medium text-orange-300">90% contenu original</span> • Semi‑RP authentique
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
