export function getNewsTypeEmoji(type: string): string {
  const emojis: Record<string, string> = {
    info: '📢',
    update: '🔄',
    event: '🎉',
    warning: '⚠️',
    maintenance: '🔧',
  }
  return emojis[type] || '📢'
}

export function getNewsTypeClass(type: string): string {
  const classes: Record<string, string> = {
    info: 'bg-blue-900/30 text-blue-400',
    update: 'bg-green-900/30 text-green-400',
    event: 'bg-purple-900/30 text-purple-400',
    warning: 'bg-orange-900/30 text-orange-400',
    maintenance: 'bg-red-900/30 text-red-400',
  }
  return classes[type] || 'bg-gray-900/30 text-gray-400'
}

export function getNewsBorderColor(type: string): string {
  const colors: Record<string, string> = {
    info: 'border-blue-500',
    update: 'border-green-500',
    event: 'border-purple-500',
    warning: 'border-orange-500',
    maintenance: 'border-red-500',
  }
  return colors[type] || 'border-gray-500'
}

export function formatDate(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor(diff / (1000 * 60))

  if (days > 0) return `Il y a ${days} jour${days > 1 ? 's' : ''}`
  if (hours > 0) return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`
  if (minutes > 0) return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`
  return "À l'instant"
}
