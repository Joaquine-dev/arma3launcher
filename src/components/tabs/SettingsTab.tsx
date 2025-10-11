import { Folder, Download, Settings } from 'lucide-react'
import type { LauncherState } from '../../types/launcher'

// @ts-ignore
export function SettingsTab({ arma3Path, onLocate, onLaunch, state }: {
  arma3Path: string | null
  onLocate: () => void
  onLaunch: () => void
  state: LauncherState
}) {
  return (
    <div className="space-y-6">
      {/* Configuration Arma 3 */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-200 mb-4 flex items-center space-x-2">
          <Settings className="w-5 h-5 text-purple-400" />
          <span>Configuration</span>
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Chemin d'installation Arma 3</label>
            <div className="flex space-x-2">
              <div className="flex-1 p-3 bg-gray-800/50 rounded border border-gray-600/50 text-gray-300 text-sm">
                {arma3Path || 'Aucun chemin sélectionné'}
              </div>
              <button
                onClick={onLocate}
                disabled={state === 'locating'}
                className="btn-secondary"
              >
                <Folder className="w-5 h-5" />
                <span>{state === 'locating' ? 'Recherche...' : 'Parcourir'}</span>
              </button>
            </div>
          </div>
          <div className="pt-2 border-t border-gray-700/50">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={async () => {
                  try {
                    await window.ipcRenderer.invoke('install-tfar')
                  } catch (e) {
                    // no-op, le main enverra des toasts via messages
                  }
                }}
                className="btn-secondary"
                title="Installer le plugin TeamSpeak TFAR"
              >
                <Download className="w-5 h-5" />
                <span>Installer TFAR</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
