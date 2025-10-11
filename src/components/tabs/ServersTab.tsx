import { Play, Server } from 'lucide-react'

export function ServersTab({
  servers,
  selectedServerId,
  onSelectServer,
  serverStatus,
  playerCount,
  serverPing,
  modsStatus,
  onConnect,
}: {
  servers: any[]
  selectedServerId: string
  onSelectServer: (serverId: string) => void
  serverStatus: string
  playerCount: number
  serverPing: number
  modsStatus: 'synced' | 'outdated' | 'downloading'
  onConnect: () => void
}) {
  const getServerStatusColor = (status: string) => {
    switch (status) {
      case 'production': return 'text-green-400 bg-green-900/20 border-green-600/30'
      case 'beta': return 'text-blue-400 bg-blue-900/20 border-blue-600/30'
      case 'maintenance': return 'text-orange-400 bg-orange-900/20 border-orange-600/30'
      default: return 'text-gray-400 bg-gray-900/20 border-gray-600/30'
    }
  }

  const getServerStatusLabel = (status: string) => {
    switch (status) {
      case 'production': return 'Production'
      case 'beta': return 'Bêta'
      case 'maintenance': return 'Maintenance'
      default: return 'Inconnu'
    }
  }

  return (
    <div className="space-y-4">
      {/* Header avec sélection */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-orange-100 mb-2">🖥️ Serveurs Disponibles</h2>
        <p className="text-sm text-gray-400">
          Sélectionnez un serveur pour voir ses informations et vous connecter
        </p>
      </div>

      {/* Liste des serveurs */}
      <div className="grid grid-cols-1 gap-3">
        {servers.map((server) => {
          const isSelected = server.id === selectedServerId
          const isCurrentServerOnline = isSelected && serverStatus === 'online'

          return (
            <div
              key={server.id}
              onClick={() => onSelectServer(server.id)}
              className={`server-card cursor-pointer transition-all duration-300 ${isSelected
                ? 'server-card-selected border-orange-500/50 bg-gradient-to-r from-orange-900/20 to-orange-800/20'
                : 'server-card-default border-gray-600/30 hover:border-orange-500/30 hover:bg-gradient-to-r hover:from-gray-800/40 hover:to-gray-700/40'
                }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Indicateur de statut */}
                  <div className="flex flex-col items-center space-y-1">
                    <div className={`w-4 h-4 rounded-full ${isCurrentServerOnline ? 'bg-green-500 animate-pulse shadow-lg' : 'bg-red-500'
                      }`} />
                    <span className={`text-xs px-2 py-1 rounded-full border ${getServerStatusColor(server.status)}`}>
                      {getServerStatusLabel(server.status)}
                    </span>
                  </div>

                  {/* Infos serveur */}
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`font-bold text-lg ${isSelected ? 'text-orange-100' : 'text-gray-200'}`}>
                        {server.name}
                      </h4>
                      {server.isDefault && (
                        <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full border border-orange-500/30">
                          Défaut
                        </span>
                      )}
                    </div>
                    <p className={`text-sm mb-2 ${isSelected ? 'text-orange-200/90' : 'text-gray-300/80'}`}>
                      {server.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {server.tags.map((tag: string, i: number) => (
                        <span key={i} className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400">
                      IP: {server.ip} • Port: {server.port} • {server.maxSlots} slots
                      {server.whitelist && ' • Liste blanche'}
                    </p>
                  </div>
                </div>

                {/* Stats et bouton de connexion */}
                <div className="text-right flex-shrink-0">
                  {isSelected && isCurrentServerOnline ? (
                    <>
                      <div className="text-2xl font-bold text-green-400 mb-1">{playerCount}</div>
                      <div className="text-green-300/80 text-xs mb-1">Joueurs en ligne</div>
                      <div className="text-xs text-gray-400 mb-2">Ping: {serverPing}ms</div>
                      {modsStatus === 'synced' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onConnect()
                          }}
                          className="btn-join btn-join-sm"
                        >
                          <Play className="w-4 h-4" />
                          <span>Rejoindre</span>
                        </button>
                      )}
                    </>
                  ) : isSelected ? (
                    <>
                      <div className="text-xl text-red-400 mb-1">
                        <Server className="w-6 h-6" />
                      </div>
                      <div className="text-red-300/80 text-xs">Hors ligne</div>
                    </>
                  ) : (
                    <div className="text-xs text-gray-500">Cliquer pour sélectionner</div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
