import { ExternalLink } from 'lucide-react'
import { config } from '../../config/config'

export function LinksTab() {
  // Configuration des couleurs par catégorie
  const categoryColors = {
    principal: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    communaute: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    communication: 'from-green-500/20 to-green-600/20 border-green-500/30',
    vote: 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30',
    information: 'from-gray-500/20 to-gray-600/20 border-gray-500/30',
    support: 'from-red-500/20 to-red-600/20 border-red-500/30',
  }

  // Noms d'affichage des catégories
  const categoryLabels = {
    principal: 'Principal',
    communaute: 'Communauté',
    communication: 'Communication',
    vote: 'Vote',
    information: 'Information',
    support: 'Support',
  }

  // Récupérer les liens depuis la configuration
  const linkCategories = config.links || {}
  const availableCategories = Object.keys(linkCategories).filter((cat) =>
    linkCategories[cat as keyof typeof linkCategories] &&
    linkCategories[cat as keyof typeof linkCategories].length > 0,
  )

  const handleLinkClick = (url: string) => {
    window.ipcRenderer.invoke('open-url', url)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-orange-100 mb-2">🔗 Liens Utiles</h2>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Accès rapide à tous les services et ressources du serveur
        </p>
      </div>

      {/* Liens par catégorie */}
      {availableCategories.length > 0 ? (
        availableCategories.map((categoryKey) => {
          const categoryLinks = linkCategories[categoryKey as keyof typeof linkCategories] || []
          const categoryLabel = categoryLabels[categoryKey as keyof typeof categoryLabels] || categoryKey
          const categoryColor = categoryColors[categoryKey as keyof typeof categoryColors] || 'from-gray-500/20 to-gray-600/20 border-gray-500/30'

          return (
            <div key={categoryKey} className="card">
              <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center space-x-2">
                <ExternalLink className="w-4 h-4 text-orange-400" />
                <span>{categoryLabel}</span>
                <span className="text-xs bg-orange-900/30 text-orange-300 px-2 py-1 rounded-full">
                  {categoryLinks.length}
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categoryLinks.map((link: any, index: any) => (
                  <div
                    key={index}
                    onClick={() => handleLinkClick(link.url)}
                    className={`link-card group cursor-pointer p-4 rounded-lg bg-gradient-to-br ${categoryColor} hover:scale-[1.02] transition-all duration-300`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {link.icon}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-gray-200 mb-1 group-hover:text-orange-200 transition-colors">
                          {link.title}
                        </h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {link.description}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })
      ) : (
        <div className="card text-center py-8">
          <ExternalLink className="w-16 h-16 mx-auto mb-4 opacity-50 text-gray-400" />
          <h4 className="text-lg font-medium mb-2 text-gray-300">Aucun lien configuré</h4>
          <p className="text-sm text-gray-400">
            Les liens utiles peuvent être configurés dans le fichier de configuration.
          </p>
        </div>
      )}

      {/* Info footer */}
      <div className="text-center pt-2 border-t border-orange-600/20">
        <p className="text-xs text-gray-500">
          💡 Cliquez sur un lien pour l'ouvrir dans votre navigateur par défaut
        </p>
      </div>
    </div>
  )
}
