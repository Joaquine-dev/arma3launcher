import { Download, AlertCircle, CheckCircle } from 'lucide-react'
import type { LauncherState } from '../../types/launcher'

export function ModsTab({ state, progress, fileProgress, fileName, eta, modsStatus, onDownload, onRefresh }: {
  state: LauncherState
  progress: number
  fileProgress: number
  fileName: string
  eta: string
  modsStatus: 'synced' | 'outdated' | 'downloading'
  onDownload: () => void
  onRefresh: () => void
}) {
  return (
    <div className="space-y-6">
      {/* Statut des mods */}
      <div className="relative overflow-hidden rounded-2xl card-military border border-orange-600/30 shadow-2xl max-w-3xl mx-auto">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)'
          }}
        />
        <div className="relative p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 arma-gradient rounded-full border border-orange-500/40 shadow-lg pulse-glow">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-2xl font-bold text-orange-100 leading-tight truncate">Synchronisation des mods</h3>
                <p className="text-orange-200/70 text-xs">Gérez et mettez à jour vos mods Arma 3</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-start md:justify-end gap-2 w/full md:w-auto">
              <div className={`shrink-0 flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${modsStatus === 'synced' ? 'bg-green-900/30 text-green-400 border border-green-600/30' :
                modsStatus === 'downloading' ? 'bg-blue-900/30 text-blue-400 border border-blue-600/30' :
                  'bg-orange-900/30 text-orange-400 border border-orange-600/30'
                }`}>
                {modsStatus === 'synced' && <CheckCircle className="w-3 h-3" />}
                {modsStatus === 'downloading' && <Download className="w-3 h-3 animate-bounce" />}
                {modsStatus === 'outdated' && <AlertCircle className="w-3 h-3" />}
                <span>
                  {modsStatus === 'synced' && 'Synchronisé'}
                  {modsStatus === 'downloading' && 'Téléchargement...'}
                  {modsStatus === 'outdated' && (state === 'checking' ? 'Vérification...' : 'Désynchronisé')}
                </span>
              </div>
              <button
                onClick={onRefresh}
                disabled={state === 'downloading' || state === 'checking'}
                className="btn-secondary shrink-0"
                title="Vérifier les mises à jour"
              >
                <CheckCircle className={`w-5 h-5 ${state === 'checking' ? 'animate-spin' : ''}`} />
                <span>{state === 'checking' ? 'Vérification...' : 'Vérifier'}</span>
              </button>

              {modsStatus === 'synced' || (state === 'checking' && modsStatus !== 'outdated') ? (
                <div className="shrink-0 flex items-center space-x-2 px-4 py-2 bg-green-900/20 text-green-400 border border-green-600/30 rounded-lg">
                  <CheckCircle className={`w-5 h-5 ${state === 'checking' ? 'animate-pulse' : ''}`} />
                  <span className="font-medium">{state === 'checking' ? 'Vérification...' : 'À jour'}</span>
                </div>
              ) : (
                <button
                  onClick={onDownload}
                  disabled={state === 'downloading' || state === 'checking'}
                  className="btn-success shrink-0"
                >
                  <Download className={`w-5 h-5 ${state === 'downloading' ? 'animate-bounce' : ''}`} />
                  <span>{state === 'downloading' ? 'Synchronisation...' : 'Synchroniser'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Progression */}
          {(progress > 0 || state === 'downloading' || fileName) && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-orange-200/90">Progression globale</span>
                <span className="text-white font-mono">{progress}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {fileName && (
                <div className="space-y-2 p-3 rounded bg-gray-800/50 border border-gray-700/50">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-300 truncate">{fileName}</span>
                    <span className="text-gray-200">{fileProgress}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-400 rounded-full transition-all duration-300"
                      style={{ width: `${fileProgress}%` }}
                    />
                  </div>
                  {eta && <div className="text-xs text-gray-400">Temps restant: {eta}</div>}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-600/50 via-red-500/50 to-yellow-500/50 opacity-60" />
      </div>
    </div>
  )
}
