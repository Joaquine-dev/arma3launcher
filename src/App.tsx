import { useEffect, useState } from 'react'
import { Folder, Download, Play, Settings, AlertCircle, CheckCircle, Clock, Target, Radio, Crosshair, Users, Server, Globe, Gamepad2, Monitor, X, Minimize } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import { config } from './config/config'

type LauncherState = 'idle' | 'locating' | 'downloading' | 'launching' | 'ready' | 'checking'
type TabType = 'home' | 'servers' | 'mods' | 'settings'

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
  const [maxPlayers, setMaxPlayers] = useState<number>(config.server.maxSlots)
  const [serverStatus, setServerStatus] = useState<'online' | 'offline'>('offline')
  const [serverName, setServerName] = useState<string>(config.server.name)
  const [serverMap, setServerMap] = useState<string>(config.server.map)
  const [serverPing, setServerPing] = useState<number>(0)
  const [serverFps, setServerFps] = useState<number>(0)
  const [serverUptime, setServerUptime] = useState<string>('0:00:00')
  const [hasRconData, setHasRconData] = useState<boolean>(false)
  const [news, setNews] = useState<any[]>([])
  const [criticalNews, setCriticalNews] = useState<any[]>([])
  const [lastToastMessage, setLastToastMessage] = useState<string>('')

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
        toast.success('✅ ' + (success || 'Arma 3 détecté'), { id: 'arma3-ready' })
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
          toast.success('✅ ' + (success || 'Mods à jour'), { id: 'mods-check' })
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
      if (message === 'launch-game-success') {
        if (lastToastMessage !== toastKey) {
          setLastToastMessage(toastKey)
          toast.success('🚀 Jeu lancé avec succès !', { id: 'game-launch' })
          setTimeout(() => setLastToastMessage(''), 1000)
        }
      }
      if (message === 'server-info-update') {
        try {
          const serverInfo = JSON.parse(data || '{}')
          if (serverInfo && serverInfo.isOnline) {
            setHasRconData(true)
            setPlayerCount(serverInfo.playerCount || 0)
            setMaxPlayers(serverInfo.maxPlayers || config.server.maxSlots)
            setServerStatus('online')
            setServerName(serverInfo.serverName || config.server.name)
            setServerMap(serverInfo.map || config.server.map)
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
        setMaxPlayers(serverInfo.maxPlayers || config.server.maxSlots)
        setServerStatus('online')
        setServerName(serverInfo.serverName || config.server.name)
        setServerMap(serverInfo.map || config.server.map)
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
        setServerName(config.server.name) // Garder le nom de config
        setServerMap(config.server.map) // Garder la map de config
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

  const getStateColor = () => {
    switch (state) {
      case 'ready': return 'text-green-400'
      case 'downloading': return 'text-blue-400'
      case 'launching': return 'text-red-400'
      case 'locating': return 'text-orange-400'
      default: return 'text-gray-400'
    }
  }

  const getStateIcon = () => {
    switch (state) {
      case 'ready': return <CheckCircle className="w-4 h-4" />
      case 'downloading': return <Download className="w-4 h-4 animate-bounce" />
      case 'launching': return <Target className="w-4 h-4 animate-pulse" />
      case 'locating': return <Crosshair className="w-4 h-4 animate-pulse" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getStateText = () => {
    switch (state) {
      case 'ready': return 'Prêt'
      case 'downloading': return 'Téléchargement...'
      case 'launching': return 'Lancement...'
      case 'locating': return 'Recherche...'
      default: return 'En attente'
    }
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
        className="fixed top-0 left-0 right-0 h-8 bg-black/60 backdrop-blur-sm border-b border-orange-600/20 z-50 flex items-center justify-between px-4"
        style={{ WebkitAppRegion: 'drag' } as any}
      >
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-xs text-gray-400 font-mono">{config.launcher.name.toUpperCase()}</div>
        <div className="flex items-center space-x-1" style={{ WebkitAppRegion: 'no-drag' } as any}>
          <button
            onClick={handleMinimize}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-700/50 transition-colors"
          >
            <Minimize className="w-3 h-3 text-gray-400" />
          </button>
          <button
            onClick={handleClose}
            className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-600/50 transition-colors"
          >
            <X className="w-3 h-3 text-gray-400 hover:text-white" />
          </button>
        </div>
      </div>

      {/* Padding pour compenser la barre de titre */}
      <div className="pt-8">
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

        {/* Header style Arma 3 */}
        <div className="relative military-gradient backdrop-blur-sm border-b border-orange-600/30 shadow-2xl header-glow">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative max-w-7xl mx-auto px-6 py-3 animate-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 arma-gradient rounded flex items-center justify-center border border-orange-500/50 shadow-lg pulse-glow">
                    <Gamepad2 className="w-7 h-7 text-white" />
                  </div>
                  <div className={`absolute -top-1 -right-1 ${serverStatus === 'online' ? 'status-online' : 'status-offline'}`} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-orange-100 tracking-wide">
                    {config.launcher.shortName}
                  </h1>
                  <p className="text-orange-300/80 text-sm">{config.server.gameMode} • {playerCount} joueurs connectés</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className={`glass-effect px-4 py-2 rounded-lg ${getStateColor()}`}>
                  {getStateIcon()}
                  <span className="text-sm font-medium ml-2">{getStateText()}</span>
                </div>
                <div className={`flex items-center space-x-1 ${serverStatus === 'online' ? 'text-green-400' : 'text-red-400'}`}>
                  <Server className="w-4 h-4" />
                  <span className="text-xs font-medium">{serverStatus.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation tabs style Arma 3 */}
        <div className="relative bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl border-b border-orange-600/20 shadow-lg">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="flex">
              {[
                { id: 'home', label: 'Accueil', icon: Monitor },
                { id: 'servers', label: 'Serveur', icon: Server },
                { id: 'mods', label: 'Mods', icon: Download },
                { id: 'settings', label: 'Config', icon: Settings }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as TabType)}
                  className={`nav-tab ${activeTab === id ? 'active' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto p-6">
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
          {activeTab === 'home' && <HomeTab
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
            news={news}
            criticalNews={criticalNews}
            onConnect={() => window.ipcRenderer.invoke('connect-server')}
          />}
          {activeTab === 'servers' && <ServersTab
            serverStatus={serverStatus}
            playerCount={playerCount}
            maxPlayers={maxPlayers}
            serverName={serverName}
            serverMap={serverMap}
            serverPing={serverPing}
            hasRconData={hasRconData}
            onConnect={() => window.ipcRenderer.invoke('connect-server')}
          />}
          {activeTab === 'mods' && <ModsTab
            state={state}
            progress={progress}
            fileProgress={fileProgress}
            fileName={fileName}
            eta={eta}
            modsStatus={modsStatus}
            onDownload={handleDownload}
            onRefresh={handleRefresh}
          />}
          {activeTab === 'settings' && <SettingsTab
            arma3Path={arma3Path}
            onLocate={handleLocate}
            onLaunch={handleLaunch}
            state={state}
          />}
        </div>
      </div>
    </div>
  )
}

// Composant Onglet Accueil
function HomeTab({
  serverStatus,
  playerCount,
  maxPlayers,
  serverName,
  serverMap,
  serverPing,
  serverFps,
  serverUptime,
  hasRconData,
  news,
  criticalNews,
  onConnect
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
  news: any[]
  criticalNews: any[]
  onConnect: () => void
}) {
  // Éviter les doublons: retirer les actualités critiques de la liste générale
  const criticalIds = new Set((criticalNews || []).map((n: any) => n.id))
  const filteredNews = (news || []).filter((n: any) => !criticalIds.has(n.id))
  return (
    <div className="space-y-6">
      {/* Bannière serveur */}
      <div className="relative overflow-hidden rounded-xl card-military">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)'
        }} />
        <div className="relative p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-orange-100 mb-2">{serverName}</h2>
              <p className="text-orange-200/80 text-lg mb-4">{config.server.description.replace('Altis', serverMap)}</p>

              {serverStatus === 'online' ? (
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-green-400" />
                    <span className="text-gray-200">{playerCount}/{maxPlayers} joueurs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-200">Ping: {serverPing}ms</span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-400">
                    <Server className="w-4 h-4" />
                    <span>En ligne</span>
                  </div>
                  {hasRconData && serverFps > 0 && (
                    <div className="flex items-center space-x-2 text-purple-400">
                      <Target className="w-4 h-4" />
                      <span>{serverFps} FPS</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-red-400">
                  <Server className="w-4 h-4" />
                  <span>Serveur hors ligne</span>
                </div>
              )}
            </div>
            <div className="text-right">
              {serverStatus === 'online' ? (
                <>
                  <div className="text-4xl font-bold text-green-400 mb-1">{playerCount}</div>
                  <div className="text-green-300/80 text-sm">Joueurs en ligne</div>
                  {hasRconData && serverUptime !== '0:00:00' && (
                    <div className="text-xs text-gray-400 mt-1">Uptime: {serverUptime}</div>
                  )}
                  <button
                    onClick={onConnect}
                    disabled={serverStatus !== 'online'}
                    className="btn-join btn-join-sm mt-3"
                  >
                    <Play className="w-4 h-4" />
                    <span>Se connecter</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="text-4xl font-bold text-red-400 mb-1">
                    <Server className="w-8 h-8" />
                  </div>
                  <div className="text-red-300/80 text-sm">Hors ligne</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Actualités critiques */}
      {criticalNews.length > 0 && (
        <div className="card-military animate-in">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="w-6 h-6 text-red-400 animate-pulse" />
            <h3 className="text-lg font-bold text-red-200">🚨 Actualités importantes</h3>
          </div>
          <div className="space-y-3">
            {criticalNews.slice(0, 2).map((item, i) => (
              <div key={i} className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-red-200">{item.title}</h4>
                  <span className="text-xs text-red-300">{getNewsTypeEmoji(item.type)} {item.type.toUpperCase()}</span>
                </div>
                <p className="text-sm text-red-100/80">{item.content}</p>
                <div className="text-xs text-red-300/70 mt-2">Par {item.author}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* News/Changelog */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-200 mb-4 flex items-center space-x-2">
          <Radio className="w-5 h-5 text-orange-400" />
          <span>Actualités du serveur</span>
        </h3>
        <div className="space-y-4">
          {filteredNews.length > 0 ? filteredNews.slice(0, 5).map((item, i) => (

            <div key={i} className={`border-l-4 pl-4 ${getNewsBorderColor(item.type)}`}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-gray-200">{item.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getNewsTypeClass(item.type)}`}>
                    {getNewsTypeEmoji(item.type)} {item.type}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{formatDate(item.publishedAt)}</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">{item.content}</p>
              {item.tags.length > 0 && (
                <div className="flex gap-1 mb-2">
                  {item.tags.slice(0, 3).map((tag: string, tagI: number) => (
                    <span key={tagI} className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="text-xs text-gray-500">Par {item.author}</div>
              {item.actionButton && (
                <button
                  className="btn-secondary mt-2 text-xs"
                  onClick={() => window.ipcRenderer.invoke('open-url', item.actionButton.url)}
                >
                  {item.actionButton.text}
                </button>
              )}
            </div>
          )) : (
            <div className="text-center text-gray-400 py-8">
              <Radio className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Aucune actualité pour le moment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Composant Onglet Serveurs
function ServersTab({
  serverStatus,
  playerCount,
  maxPlayers,
  serverName,
  serverMap,
  serverPing,
  hasRconData: _hasRconData,
  onConnect
}: {
  serverStatus: string
  playerCount: number
  maxPlayers: number
  serverName: string
  serverMap: string
  serverPing: number
  hasRconData: boolean
  onConnect: () => void
}) {
  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-200 mb-4 flex items-center space-x-2">
          <Server className="w-5 h-5 text-orange-400" />
          <span>{config.server.shortName}</span>
        </h3>

        <div className="space-y-3">
          {serverStatus === 'online' ? (
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-600/30">
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg" />
                <div>
                  <h4 className="font-bold text-green-100 text-lg">{serverName}</h4>
                  <p className="text-green-200/80 text-sm">Map: {serverMap} • Mode: {config.server.gameMode} • Version: Stable</p>
                  <p className="text-gray-300 text-xs mt-1">IP: {config.server.ip} • Port: {config.server.port}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-bold text-xl">{serverPing}ms</div>
                <div className="text-xs text-gray-400">Latence</div>
                <div className="text-green-400 font-medium text-sm mt-1">{playerCount}/{maxPlayers} joueurs</div>
                <button
                  onClick={onConnect}
                  className="btn-join btn-join-sm mt-3"
                >
                  <Play className="w-4 h-4" />
                  <span>Se connecter</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-red-900/20 to-gray-900/20 rounded-lg border border-red-600/30">
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-red-500 rounded-full" />
                <div>
                  <h4 className="font-bold text-red-100 text-lg">{config.server.name}</h4>
                  <p className="text-red-200/80 text-sm">Serveur actuellement hors ligne</p>
                  <p className="text-gray-400 text-xs mt-1">IP: {config.server.ip} • Port: {config.server.port}</p>
                  <p className="text-gray-500 text-xs mt-1">Aucune donnée RCON/Steam Query disponible</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-red-400 font-bold text-xl">
                  <Server className="w-8 h-8" />
                </div>
                <div className="text-xs text-gray-400">Hors ligne</div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

// Composant Onglet Mods
function ModsTab({ state, progress, fileProgress, fileName, eta, modsStatus, onDownload, onRefresh }: {
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
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-200 flex items-center space-x-2">
            <Download className="w-5 h-5 text-blue-400" />
            <span>Synchronisation des mods</span>
          </h3>
          <div className="flex items-center space-x-3">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${modsStatus === 'synced' ? 'bg-green-900/30 text-green-400 border border-green-600/30' :
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
              className="btn-secondary"
              title="Vérifier les mises à jour"
            >
              <CheckCircle className={`w-5 h-5 ${state === 'checking' ? 'animate-spin' : ''}`} />
              <span>{state === 'checking' ? 'Vérification...' : 'Vérifier'}</span>
            </button>

            {modsStatus === 'synced' || (state === 'checking' && modsStatus !== 'outdated') ? (
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-900/20 text-green-400 border border-green-600/30 rounded-lg">
                <CheckCircle className={`w-5 h-5 ${state === 'checking' ? 'animate-pulse' : ''}`} />
                <span className="font-medium">{state === 'checking' ? 'Vérification...' : 'À jour'}</span>
              </div>
            ) : (
              <button
                onClick={onDownload}
                disabled={state === 'downloading' || state === 'checking'}
                className="btn-success"
              >
                <Download className={`w-5 h-5 ${state === 'downloading' ? 'animate-bounce' : ''}`} />
                <span>{state === 'downloading' ? 'Synchronisation...' : 'Synchroniser'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Progression */}
        {(progress > 0 || state === 'downloading' || fileName) && (
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Progression globale</span>
              <span className="text-white font-mono">{progress}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            {fileName && (
              <div className="space-y-2 p-3 rounded bg-gray-800/50">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 truncate">{fileName}</span>
                  <span className="text-gray-300">{fileProgress}%</span>
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

        {/* Liste des mods */}
        <div className="space-y-4">
          <div className="p-4 bg-gray-800/30 rounded-lg">
            <h4 className="font-medium text-gray-300 mb-3">Méthode de téléchargement</h4>
            <div className="text-sm text-gray-400 space-y-2">
              <p>• <span className="text-blue-400">HTTPS/FTP</span> - Téléchargement direct depuis le serveur</p>
              <p>• <span className="text-green-400">Vérification d'intégrité</span> - Contrôle SHA-256 automatique</p>
              <p>• <span className="text-purple-400">Reprise de téléchargement</span> - Reprend en cas d'interruption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Composant Onglet Paramètres
function SettingsTab({ arma3Path, onLocate, onLaunch, state }: {
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

          <div className="pt-4 border-t border-gray-700/50">
            <button
              onClick={onLaunch}
              disabled={state === 'launching' || !arma3Path}
              className="btn-join w-full"
            >
              <Play className={`w-6 h-6 ${state === 'launching' ? 'animate-pulse' : ''}`} />
              <span>{state === 'launching' ? 'Lancement en cours...' : `Rejoindre ${config.server.shortName}`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Fonctions utilitaires pour les actualités
function getNewsTypeEmoji(type: string): string {
  const emojis: Record<string, string> = {
    info: '📢',
    update: '🔄',
    event: '🎉',
    warning: '⚠️',
    maintenance: '🔧'
  }
  return emojis[type] || '📢'
}

function getNewsTypeClass(type: string): string {
  const classes: Record<string, string> = {
    info: 'bg-blue-900/30 text-blue-400',
    update: 'bg-green-900/30 text-green-400',
    event: 'bg-purple-900/30 text-purple-400',
    warning: 'bg-orange-900/30 text-orange-400',
    maintenance: 'bg-red-900/30 text-red-400'
  }
  return classes[type] || 'bg-gray-900/30 text-gray-400'
}

function getNewsBorderColor(type: string): string {
  const colors: Record<string, string> = {
    info: 'border-blue-500',
    update: 'border-green-500',
    event: 'border-purple-500',
    warning: 'border-orange-500',
    maintenance: 'border-red-500'
  }
  return colors[type] || 'border-gray-500'
}

function formatDate(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor(diff / (1000 * 60))

  if (days > 0) return `Il y a ${days} jour${days > 1 ? 's' : ''}`
  if (hours > 0) return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`
  if (minutes > 0) return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`
  return 'À l\'instant'
}

export default App
