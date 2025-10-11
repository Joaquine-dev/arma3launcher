import { useEffect, useState } from 'react'
import { Download, Monitor, X, Minimize, Settings as SettingsIcon, Radio, ExternalLink, AlertCircle } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { config } from './config/config'
import type { LauncherState, TabType } from './types/launcher'
import { HomeTab } from './components/tabs/HomeTab'
import { NewsTab } from './components/tabs/NewsTab'
import { ServersTab } from './components/tabs/ServersTab'
import { ModsTab } from './components/tabs/ModsTab'
import { LinksTab } from './components/tabs/LinksTab'
import { SettingsTab } from './components/tabs/SettingsTab'

function App() {
  const [state, setState] = useState<LauncherState>('idle')
  const [activeTab, setActiveTab] = useState<TabType>('home')
  const [arma3Path, setArma3Path] = useState<string | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [fileProgress, setFileProgress] = useState<number>(0)
  const [fileName, setFileName] = useState<string>('')
  const [eta, setEta] = useState<string>('')
  const [modsStatus, setModsStatus] = useState<'synced' | 'outdated' | 'downloading'>('synced')
  const [playerCount, setPlayerCount] = useState<number>(0)
  const [maxPlayers, setMaxPlayers] = useState<number>(config.servers[0].maxSlots)
  const [serverStatus, setServerStatus] = useState<'online' | 'offline'>('offline')
  const [serverName, setServerName] = useState<string>(config.servers[0].name)
  const [serverMap, setServerMap] = useState<string>('')
  const [serverPing, setServerPing] = useState<number>(0)
  const [serverFps, setServerFps] = useState<number>(0)
  const [serverUptime, setServerUptime] = useState<string>('0:00:00')
  const [hasRconData, setHasRconData] = useState<boolean>(false)
  const [news, setNews] = useState<any[]>([])
  const [criticalNews, setCriticalNews] = useState<any[]>([])
  const [lastToastMessage, setLastToastMessage] = useState<string>('')

  // État pour la gestion multi-serveurs
  const [selectedServerId, setSelectedServerId] = useState<string>(
    config.servers.find(s => s.isDefault)?.id || config.servers[0]?.id || ''
  )
  const selectedServer = config.servers.find(s => s.id === selectedServerId) || config.servers[0]

  // Mise à jour autoUpdater
  const [updateVisible, setUpdateVisible] = useState<boolean>(false)
  const [updateMessage, setUpdateMessage] = useState<string>('')
  const [updatePercent, setUpdatePercent] = useState<number>(0)
  const [updateSpeed, setUpdateSpeed] = useState<number>(0)
  const [updateTransferred, setUpdateTransferred] = useState<number>(0)
  const [updateTotal, setUpdateTotal] = useState<number>(0)

  useEffect(() => {
    const handleMessage = (_e: any, payload: any) => {
      const { message, success, error, data, fileProgress, timeRemaining } = payload
      const toastKey = `${message}-${success || error || ''}`

      if (lastToastMessage === toastKey) return

      if (message === 'arma3Path-ready' || message === 'arma3Path-mod-loaded') {
        setState('ready')
        setLastToastMessage(toastKey)
        setTimeout(() => setLastToastMessage(''), 1000)
      }
      if (message === 'arma3Path-not-loaded' || message === 'arma3Path-invalid') {
        setState('idle')
        setLastToastMessage(toastKey)
        toast.error('❌ ' + (error || 'Chemin invalide'), { id: 'arma3-error' })
        setTimeout(() => setLastToastMessage(''), 1000)
      }
      if (message === 'updateMod-needed') {
        setState('ready')
        setModsStatus('outdated')
        if (lastToastMessage !== toastKey) {
          setLastToastMessage(toastKey)
          toast('📦 Mods à synchroniser', { id: 'mods-update' })
          setTimeout(() => setLastToastMessage(''), 1000)
        }
      }
      if (message === 'mods-check-complete') {
        setState('ready')
        setModsStatus('synced')
        // Reset des barres de progression si les mods sont déjà à jour
        setProgress(0)
        setFileProgress(0)
        setFileName('')
        setEta('')

        if (lastToastMessage !== toastKey) {
          setLastToastMessage(toastKey)
          setTimeout(() => setLastToastMessage(''), 1000)
        }
      }
      if (message === 'cleanup-start') {
        setState('downloading')
        setModsStatus('downloading')
        if (lastToastMessage !== toastKey) {
          setLastToastMessage(toastKey)
          toast.loading('🗑️ ' + (success || 'Nettoyage en cours...'), { id: 'cleanup' })
          setTimeout(() => setLastToastMessage(''), 1000)
        }
      }
      if (message === 'cleanup-complete') {
        if (lastToastMessage !== toastKey) {
          setLastToastMessage(toastKey)
          toast.success('✅ ' + (success || 'Nettoyage terminé'), { id: 'cleanup' })
          setTimeout(() => setLastToastMessage(''), 1000)
        }
      }
      if (message === 'download-start') {
        setState('downloading')
        setModsStatus('downloading')
      }
      if (message === 'download-progress') {
        setProgress(Number(success || 0))
        setFileProgress(Number(fileProgress || 0))
        setFileName(String(data || ''))
        setEta(String(timeRemaining || ''))
      }
      if (message === 'download-complete') {
        setState('ready')
        setModsStatus('synced')
        // Reset des barres de progression après un délai pour voir la completion
        setTimeout(() => {
          setProgress(0)
          setFileProgress(0)
          setFileName('')
          setEta('')
        }, 2000) // 2 secondes pour voir 100% puis disparition

        if (lastToastMessage !== toastKey) {
          setLastToastMessage(toastKey)
          toast.success('✅ Mods synchronisés avec succès', { id: 'download-complete' })
          setTimeout(() => setLastToastMessage(''), 1000)
        }
      }
      if (message === 'download-error') {
        setState('ready')
        setModsStatus('outdated')
        // Reset des barres de progression en cas d'erreur
        setProgress(0)
        setFileProgress(0)
        setFileName('')
        setEta('')

        if (lastToastMessage !== toastKey) {
          setLastToastMessage(toastKey)
          toast.error('❌ ' + (error || 'Erreur de téléchargement'), { id: 'download-error' })
          setTimeout(() => setLastToastMessage(''), 1000)
        }
      }
      if (message === 'tfar-install-start') {
        toast.loading('📦 Installation TFAR...', { id: 'tfar-install' })
      }
      if (message === 'tfar-install-success') {
        toast.success('✅ ' + (success || 'TFAR installé'), { id: 'tfar-install' })
      }
      if (message === 'tfar-install-error') {
        toast.error('❌ ' + (error || 'Erreur installation TFAR'), { id: 'tfar-install' })
      }
      if (message === 'launch-game-success') {
        if (lastToastMessage !== toastKey) {
          setLastToastMessage(toastKey)
          toast.success('🚀 Jeu lancé avec succès !', { id: 'game-launch' })
          setTimeout(() => setLastToastMessage(''), 1000)
        }
      }
      if (message === 'server-info-update') {
        try {
          const defaultServer = config.servers.find(s => s.isDefault) || config.servers[0]
          const serverInfo = JSON.parse(data || '{}')
          if (serverInfo && serverInfo.isOnline) {
            setHasRconData(true)
            setPlayerCount(serverInfo.playerCount || 0)
            setMaxPlayers(serverInfo.maxPlayers || defaultServer.maxSlots)
            setServerStatus('online')
            setServerName(serverInfo.serverName || defaultServer.name)
            setServerMap(serverInfo.map || 'Unknown')
            setServerPing(serverInfo.ping || 0)
            setServerFps(serverInfo.fps || 0)
            setServerUptime(serverInfo.uptime || '0:00:00')
          } else {
            // Serveur hors ligne - pas d'infos fantômes
            setHasRconData(false)
            setServerStatus('offline')
            setPlayerCount(0)
            setServerPing(0)
            setServerFps(0)
            setServerUptime('0:00:00')
          }
        } catch (error) {
          console.error('Erreur parsing server info:', error)
          setHasRconData(false)
          setServerStatus('offline')
          setPlayerCount(0)
          setServerPing(0)
          setServerFps(0)
        }
      }
    }

    window.ipcRenderer.on('main-process-message', handleMessage)

    window.ipcRenderer.invoke('get-arma3-path').then((path) => {
      if (path) {
        setArma3Path(path)
        setState('ready')
      }
    })

    // Récupérer les infos serveur au démarrage
    window.ipcRenderer.invoke('get-server-info').then((serverInfo) => {
      if (serverInfo && serverInfo.isOnline) {
        setHasRconData(true)
        setPlayerCount(serverInfo.playerCount || 0)
        setMaxPlayers(serverInfo.maxPlayers || config.servers[0].maxSlots)
        setServerStatus('online')
        setServerName(serverInfo.serverName || config.servers[0].name)
        setServerMap(serverInfo.map || '')
        setServerPing(serverInfo.ping || 0)
        setServerFps(serverInfo.fps || 0)
        setServerUptime(serverInfo.uptime || '0:00:00')
      } else {
        // Pas d'infos disponibles = serveur hors ligne
        setHasRconData(false)
        setServerStatus('offline')
        setPlayerCount(0)
        setServerPing(0)
        setServerFps(0)
        setServerName(config.servers[0].name) // Garder le nom de config
        setServerMap('') // Garder la map de config
      }
    })

    // Récupérer les actualités
    window.ipcRenderer.invoke('get-news').then((newsItems) => {
      if (newsItems) {
        setNews(newsItems)
      }
    })

    // Récupérer les actualités critiques
    window.ipcRenderer.invoke('get-critical-news').then((criticalItems) => {
      if (criticalItems) {
        setCriticalNews(criticalItems)
      }
    })

    return () => {
      window.ipcRenderer.off('main-process-message', handleMessage)
    }
  }, [lastToastMessage])

  // Auto-refresh du statut serveur toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      // Seulement si on n'est pas en train de télécharger ou autre
      if (state === 'ready' || state === 'idle') {
        window.ipcRenderer.invoke('get-server-info').then((serverInfo) => {
          if (serverInfo && serverInfo.isOnline) {
            setHasRconData(true)
            setPlayerCount(serverInfo.playerCount || 0)
            setMaxPlayers(serverInfo.maxPlayers || config.servers[0].maxSlots)
            setServerStatus('online')
            setServerName(serverInfo.serverName || config.servers[0].name)
            setServerMap(serverInfo.map || '')
            setServerPing(serverInfo.ping || 0)
            setServerFps(serverInfo.fps || 0)
            setServerUptime(serverInfo.uptime || '0:00:00')
          } else {
            setHasRconData(false)
            setServerStatus('offline')
            setPlayerCount(0)
            setServerPing(0)
            setServerFps(0)
            setServerName(config.servers[0].name)
            setServerMap('')
          }
        })
      }
    }, 30000) // 30 secondes

    return () => clearInterval(interval)
  }, [state])

  // Événements d'auto‑mise à jour
  useEffect(() => {
    const onChecking = () => {
      setUpdateVisible(true)
      setUpdateMessage('Recherche de mise à jour...')
      setUpdatePercent(0)
    }
    const onAvailable = () => {
      setUpdateVisible(true)
      setUpdateMessage('Mise à jour disponible — téléchargement en cours...')
    }
    const onProgress = (_e: any, data: { percent: number; transferred: number; total: number; bytesPerSecond: number }) => {
      const percent = Math.round(Number(data?.percent || 0))
      setUpdatePercent(percent)
      setUpdateTransferred(Number(data?.transferred || 0))
      setUpdateTotal(Number(data?.total || 0))
      setUpdateSpeed(Number(data?.bytesPerSecond || 0))
      setUpdateVisible(true)
      setUpdateMessage('Téléchargement de la mise à jour...')
    }
    const onReady = () => {
      setUpdateVisible(true)
      setUpdatePercent(100)
      setUpdateMessage('Mise à jour téléchargée — redémarrage imminent...')
    }
    const onNotAvailable = () => {
      setUpdateVisible(false)
      setUpdatePercent(0)
      setUpdateMessage('')
    }
    const onError = (_e: any, msg?: string) => {
      toast.error('❌ ' + (msg || 'Erreur de mise à jour'))
      setUpdateVisible(false)
      setUpdatePercent(0)
      setUpdateMessage('')
    }

    window.ipcRenderer.on('checking-update', onChecking)
    window.ipcRenderer.on('update-available', onAvailable)
    window.ipcRenderer.on('update-progress', onProgress as any)
    window.ipcRenderer.on('update-ready', onReady)
    window.ipcRenderer.on('update-not-available', onNotAvailable)
    window.ipcRenderer.on('update-error', onError as any)

    return () => {
      window.ipcRenderer.off('checking-update', onChecking)
      window.ipcRenderer.off('update-available', onAvailable)
      window.ipcRenderer.off('update-progress', onProgress as any)
      window.ipcRenderer.off('update-ready', onReady)
      window.ipcRenderer.off('update-not-available', onNotAvailable)
      window.ipcRenderer.off('update-error', onError as any)
    }
  }, [])

  const handleLocate = async () => {
    setState('locating')
    window.ipcRenderer.send('locate-arma3')
    const path = await window.ipcRenderer.invoke('get-arma3-path')
    setArma3Path(path)
  }

  const handleDownload = () => {
    setState('downloading')
    setProgress(0)
    setFileProgress(0)
    window.ipcRenderer.send('download-mods')
  }

  const handleRefresh = () => {
    setState('checking')
    // Ne pas changer le modsStatus pendant la vérification pour éviter le clignotement
    window.ipcRenderer.send('check-mods')
  }

  const handleRefreshServerStatus = () => {
    setState('checking')
    // Relancer la vérification du serveur et des mods
    window.ipcRenderer.invoke('get-server-info').then((serverInfo) => {
      if (serverInfo && serverInfo.isOnline) {
        setHasRconData(true)
        setPlayerCount(serverInfo.playerCount || 0)
        setMaxPlayers(serverInfo.maxPlayers || config.servers[0].maxSlots)
        setServerStatus('online')
        setServerName(serverInfo.serverName || config.servers[0].name)
        setServerMap(serverInfo.map || '')
        setServerPing(serverInfo.ping || 0)
        setServerFps(serverInfo.fps || 0)
        setServerUptime(serverInfo.uptime || '0:00:00')
      } else {
        setHasRconData(false)
        setServerStatus('offline')
        setPlayerCount(0)
        setServerPing(0)
        setServerFps(0)
        setServerName(config.servers[0].name)
        setServerMap('')
      }
      setState('ready')
    })
    // Vérifier aussi les mods
    window.ipcRenderer.send('check-mods')
  }

  const handleLaunch = () => {
    setState('launching')
    window.ipcRenderer.invoke('launch-game')
    setTimeout(() => setState('ready'), 2000)
  }

  const handleClose = () => {
    window.ipcRenderer.send('close-app')
  }

  const handleMinimize = () => {
    window.ipcRenderer.send('minimize-app')
  }



  return (
    <div className="min-h-screen relative overflow-hidden scan-lines">
      {updateVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md card-military p-6 border border-orange-600/30">
            <div className="flex items-center space-x-3 mb-4">
              <Download className="w-6 h-6 text-orange-400 animate-bounce" />
              <h3 className="text-lg font-bold text-orange-200">Mise à jour en cours</h3>
            </div>
            <p className="text-sm text-gray-300 mb-4">{updateMessage}</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Progression</span>
                <span className="text-white font-mono">{updatePercent}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${updatePercent}%` }} />
              </div>
              {(updateTotal > 0) && (
                <div className="text-xs text-gray-400 flex justify-between">
                  <span>{(updateTransferred / 1024 / 1024).toFixed(1)} / {(updateTotal / 1024 / 1024).toFixed(1)} Mo</span>
                  <span>{(updateSpeed / 1024 / 1024).toFixed(1)} Mo/s</span>
                </div>
              )}
              <div className="text-xs text-gray-500">L'application redémarrera automatiquement une fois prête.</div>
            </div>
          </div>
        </div>
      )}
      {/* Barre de titre personnalisée avec drag */}
      <div
        className="fixed top-0 left-0 right-0 h-9 titlebar-gradient backdrop-blur-md border-b border-orange-600/30 z-50 flex items-center justify-between px-4"
        style={{ WebkitAppRegion: 'drag' } as any}
      >
        <div className="flex items-center space-x-2">
          <div className="titlebar-dot titlebar-dot-red"></div>
          <div className="titlebar-dot titlebar-dot-orange"></div>
          <div className="titlebar-dot titlebar-dot-green"></div>
        </div>
        <div className="text-xs text-orange-200 font-mono font-semibold tracking-wider">{config.launcher.name.toUpperCase()} V.{config.launcher.version}</div>
        <div className="flex items-center space-x-2" style={{ WebkitAppRegion: 'no-drag' } as any}>
          <button
            onClick={handleMinimize}
            className="titlebar-btn titlebar-btn-minimize group"
            title="Réduire"
          >
            <Minimize className="w-3 h-3 text-gray-300 group-hover:text-white transition-colors duration-200" />
          </button>
          <button
            onClick={handleClose}
            className="titlebar-btn titlebar-btn-close group"
            title="Fermer"
          >
            <X className="w-3 h-3 text-gray-300 group-hover:text-white transition-colors duration-200" />
          </button>
        </div>
      </div>

      {/* Padding pour compenser la barre de titre */}
      <div className="pt-9">
        {/* Particles d'arrière-plan */}
        <div className="particles">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1f2937',
              color: '#f1f5f9',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '0.75rem',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }
          }}
          containerStyle={{
            top: 40,
            right: 20,
          }}
          gutter={8}
        />


        {/* Navigation tabs - Responsive */}
        <div className="relative bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl border-b border-orange-600/20 shadow-lg">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex overflow-x-auto scrollbar-hide">
            {[
                { id: 'home', label: 'Accueil', icon: Monitor },
                { id: 'news', label: 'News', icon: Radio },
                //{ id: 'servers', label: 'Serveurs', icon: Server },
                { id: 'mods', label: 'Mods', icon: Download },
                { id: 'links', label: 'Liens', icon: ExternalLink },
                { id: 'settings', label: 'Config', icon: SettingsIcon }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as TabType)}
                  className={`nav-tab flex-shrink-0 ${activeTab === id ? 'active' : ''}`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto p-4">
          {/* Alerte synchronisation */}
          {modsStatus === 'outdated' && activeTab === 'mods' && (
            <div className="mb-6 relative animate-in">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-lg blur-sm" />
              <div className="relative card-military p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 arma-gradient rounded-full pulse-glow">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-orange-200 font-bold">⚠️ Synchronisation requise</p>
                    <p className="text-orange-300/90 text-sm">Les mods du serveur doivent être synchronisés</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contenu des onglets */}
          {activeTab === 'home' && (
            <HomeTab
              arma3Path={arma3Path}
              serverStatus={serverStatus}
              playerCount={playerCount}
              maxPlayers={maxPlayers}
              serverName={serverName}
              serverMap={serverMap}
              serverPing={serverPing}
              serverFps={serverFps}
              serverUptime={serverUptime}
              hasRconData={hasRconData}
              modsStatus={modsStatus}
              state={state}
              selectedServer={selectedServer}
              servers={config.servers}
              selectedServerId={selectedServerId}
              onSelectServer={setSelectedServerId}
              onConnect={() => window.ipcRenderer.invoke('connect-server', selectedServerId)}
              onRefreshStatus={handleRefreshServerStatus}
            />
          )}
          {activeTab === 'news' && (
            <NewsTab news={news} criticalNews={criticalNews} />
          )}
          {activeTab === 'servers' && (
            <ServersTab
              servers={config.servers}
              selectedServerId={selectedServerId}
              onSelectServer={setSelectedServerId}
              serverStatus={serverStatus}
              playerCount={playerCount}
              serverPing={serverPing}
              modsStatus={modsStatus}
              onConnect={() => window.ipcRenderer.invoke('connect-server', selectedServerId)}
            />
          )}
          {activeTab === 'mods' && (
            <ModsTab
              state={state}
              progress={progress}
              fileProgress={fileProgress}
              fileName={fileName}
              eta={eta}
              modsStatus={modsStatus}
              onDownload={handleDownload}
              onRefresh={handleRefresh}
            />
          )}
          {activeTab === 'links' && <LinksTab />}
          {activeTab === 'settings' && (
            <SettingsTab
              arma3Path={arma3Path}
              onLocate={handleLocate}
              onLaunch={handleLaunch}
              state={state}
            />
          )}
        </div>
      </div>
    </div>
  )
}
export default App
