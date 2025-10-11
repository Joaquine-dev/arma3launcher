import { AlertCircle, Radio } from 'lucide-react'
import { getNewsTypeEmoji, getNewsTypeClass, getNewsBorderColor, formatDate } from '../../utils/news'

export function NewsTab({
  news,
  criticalNews,
}: {
  news: any[]
  criticalNews: any[]
}) {
  // Éviter les doublons: retirer les actualités critiques de la liste générale
  const criticalIds = new Set((criticalNews || []).map((n: any) => n.id))
  const filteredNews = (news || []).filter((n: any) => !criticalIds.has(n.id))

  return (
    <div className="space-y-4">
      {/* Header de la section News */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-orange-100 mb-2">📰 Actualités UnRealLife</h2>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Dernières nouvelles et événements du serveur
        </p>
      </div>

      {/* Actualités critiques */}
      {criticalNews.length > 0 && (
        <div className="card-military animate-in">
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="w-5 h-5 text-red-400 animate-pulse" />
            <h3 className="text-lg font-bold text-red-200">🚨 Actualités importantes</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {criticalNews.map((item, i) => (
              <div key={i} className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg hover:bg-red-900/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-red-200">{item.title}</h4>
                  <span className="text-xs text-red-300">{getNewsTypeEmoji(item.type)} {item.type.toUpperCase()}</span>
                </div>
                <p className="text-sm text-red-100/80 mb-3">{item.content}</p>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-red-300/70">Par {item.author}</div>
                  <div className="text-xs text-red-400">{formatDate(item.publishedAt)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actualités générales */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center space-x-2">
          <Radio className="w-4 h-4 text-orange-400" />
          <span>Actualités du serveur</span>
          <span className="text-xs bg-orange-900/30 text-orange-300 px-2 py-1 rounded-full">
            {filteredNews.length}
          </span>
        </h3>

        <div className="space-y-4">
          {filteredNews.length > 0 ? filteredNews.map((item, i) => (
            <div key={i} className={`news-article border-l-4 pl-6 pb-6 ${i < filteredNews.length - 1 ? 'border-b border-gray-700/50' : ''} ${getNewsBorderColor(item.type)}`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                <div className="flex items-center space-x-3">
                  <h4 className="font-semibold text-gray-200 text-lg">{item.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getNewsTypeClass(item.type)}`}>
                    {getNewsTypeEmoji(item.type)} {item.type}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{formatDate(item.publishedAt)}</span>
              </div>

              <p className="text-sm text-gray-300 mb-4 leading-relaxed">{item.content}</p>

              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.tags.map((tag: string, tagI: number) => (
                    <span key={tagI} className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded hover:bg-gray-700/70 transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">Par {item.author}</div>
                {item.actionButton && (
                  <button
                    className="btn-secondary text-xs"
                    onClick={() => window.ipcRenderer.invoke('open-url', item.actionButton.url)}
                  >
                    {item.actionButton.text}
                  </button>
                )}
              </div>
            </div>
          )) : (
            <div className="text-center text-gray-400 py-12">
              <Radio className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h4 className="text-lg font-medium mb-2">Aucune actualité pour le moment</h4>
              <p className="text-sm">Les dernières nouvelles apparaîtront ici dès qu'elles seront disponibles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
