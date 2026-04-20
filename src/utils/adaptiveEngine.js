export const PREFS_KEY = 'adaptivex.preferences.v1'

export const NETWORK_LEVELS = {
  slow: { label: 'Slow (3G)', badge: 'low-bandwidth' },
  medium: { label: 'Medium (4G)', badge: 'standard' },
  fast: { label: 'Fast (WiFi/5G)', badge: 'high-throughput' },
}

export const MODE_CONFIG = {
  performance: {
    label: 'Performance',
    description: 'Prioritizes speed and data savings',
    mediaQuality: 'low',
    compactness: 'compact',
    scoreBoost: 22,
  },
  balanced: {
    label: 'Balanced',
    description: 'Optimizes quality and speed',
    mediaQuality: 'medium',
    compactness: 'expanded',
    scoreBoost: 12,
  },
  quality: {
    label: 'High Quality',
    description: 'Prioritizes fidelity and immersive visuals',
    mediaQuality: 'high',
    compactness: 'expanded',
    scoreBoost: 4,
  },
}

export const MEDIA_PROFILES = {
  low: {
    imageWidth: 640,
    estimatedSizeMB: 0.48,
    videoLabel: '480p stream',
    videoSrc: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  },
  medium: {
    imageWidth: 1024,
    estimatedSizeMB: 1.1,
    videoLabel: '720p stream',
    videoSrc: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  high: {
    imageWidth: 1600,
    estimatedSizeMB: 2.2,
    videoLabel: '1080p stream',
    videoSrc: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
}

export const classifyNetwork = (effectiveType = '4g') => {
  if (['slow-2g', '2g', '3g'].includes(effectiveType)) return 'slow'
  if (effectiveType === '4g') return 'medium'
  return 'fast'
}

export const detectDeviceType = (width = 1280, userAgent = '') => {
  const mobileAgent = /Android|iPhone|iPod|Windows Phone|Opera Mini/i.test(userAgent)
  const tabletAgent = /iPad|Tablet|PlayBook|Silk/i.test(userAgent)

  if (mobileAgent || width < 768) return 'mobile'
  if (tabletAgent || width < 1100) return 'tablet'
  return 'desktop'
}

export const resolveMode = (network, deviceType, modeOverride) => {
  if (modeOverride && modeOverride !== 'auto') return modeOverride
  if (network === 'slow' || deviceType === 'mobile') return 'performance'
  if (network === 'fast' && deviceType === 'desktop') return 'quality'
  return 'balanced'
}

export const resolveLayoutDensity = (mode, deviceType, layoutPreference) => {
  if (layoutPreference && layoutPreference !== 'auto') return layoutPreference
  if (deviceType === 'mobile') return 'compact'
  return MODE_CONFIG[mode].compactness
}

export const getAnalytics = ({ mode, detectedNetwork, activeNetwork }) => {
  const baselineDataMB = activeNetwork === 'slow' ? 2.7 : 3.6
  const selectedProfile = MEDIA_PROFILES[MODE_CONFIG[mode].mediaQuality]
  const dataSaved = Math.max(0, baselineDataMB - selectedProfile.estimatedSizeMB)

  const networkPenalty = detectedNetwork === 'slow' ? 14 : detectedNetwork === 'medium' ? 8 : 2
  const loadTimeImprovement = Math.round(dataSaved * 420 + MODE_CONFIG[mode].scoreBoost * 7)
  const performanceScore = Math.max(63, Math.min(99, 100 - networkPenalty + MODE_CONFIG[mode].scoreBoost))

  return {
    estimatedDataSavedMB: Number(dataSaved.toFixed(2)),
    loadTimeImprovementMS: loadTimeImprovement,
    performanceScore,
  }
}

export const getImageSourceSet = () => {
  const seed = 'adaptivex-dynamic-visual'
  return [480, 768, 1080, 1440, 1920]
    .map((w) => `https://picsum.photos/seed/${seed}/${w}/${Math.round(w * 0.58)} ${w}w`)
    .join(', ')
}
