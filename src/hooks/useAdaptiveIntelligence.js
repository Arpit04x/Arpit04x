import { useEffect, useMemo, useState } from 'react'
import {
  classifyNetwork,
  detectDeviceType,
  getAnalytics,
  MODE_CONFIG,
  PREFS_KEY,
  resolveLayoutDensity,
  resolveMode,
} from '../utils/adaptiveEngine'

const getInitialPrefs = () => {
  try {
    const raw = localStorage.getItem(PREFS_KEY)
    if (!raw) return { modeOverride: 'auto', simulatedNetwork: 'auto', layoutPreference: 'auto' }
    return { modeOverride: 'auto', simulatedNetwork: 'auto', layoutPreference: 'auto', ...JSON.parse(raw) }
  } catch {
    return { modeOverride: 'auto', simulatedNetwork: 'auto', layoutPreference: 'auto' }
  }
}

export const useAdaptiveIntelligence = () => {
  const [prefs, setPrefs] = useState(getInitialPrefs)
  const [effectiveType, setEffectiveType] = useState(() => navigator.connection?.effectiveType ?? '4g')
  const [deviceType, setDeviceType] = useState(() =>
    detectDeviceType(window.innerWidth, navigator.userAgent),
  )

  useEffect(() => {
    const connection = navigator.connection
    const onConnectionChange = () => setEffectiveType(connection?.effectiveType ?? '4g')
    const onResize = () => setDeviceType(detectDeviceType(window.innerWidth, navigator.userAgent))

    connection?.addEventListener?.('change', onConnectionChange)
    window.addEventListener('resize', onResize)

    return () => {
      connection?.removeEventListener?.('change', onConnectionChange)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
  }, [prefs])

  const detectedNetwork = useMemo(() => classifyNetwork(effectiveType), [effectiveType])
  const activeNetwork = prefs.simulatedNetwork === 'auto' ? detectedNetwork : prefs.simulatedNetwork
  const mode = useMemo(
    () => resolveMode(activeNetwork, deviceType, prefs.modeOverride),
    [activeNetwork, deviceType, prefs.modeOverride],
  )
  const layoutDensity = useMemo(
    () => resolveLayoutDensity(mode, deviceType, prefs.layoutPreference),
    [deviceType, mode, prefs.layoutPreference],
  )
  const analytics = useMemo(
    () => getAnalytics({ mode, detectedNetwork, activeNetwork }),
    [activeNetwork, detectedNetwork, mode],
  )

  const updatePref = (key, value) => setPrefs((prev) => ({ ...prev, [key]: value }))

  return {
    mode,
    modeConfig: MODE_CONFIG[mode],
    detectedNetwork,
    activeNetwork,
    deviceType,
    layoutDensity,
    analytics,
    prefs,
    setModeOverride: (value) => updatePref('modeOverride', value),
    setSimulatedNetwork: (value) => updatePref('simulatedNetwork', value),
    setLayoutPreference: (value) => updatePref('layoutPreference', value),
  }
}
