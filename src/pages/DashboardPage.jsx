import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import SystemStatusPanel from '../components/SystemStatusPanel'
import ControlPanel from '../components/ControlPanel'
import SkeletonBlock from '../components/SkeletonBlock'

const AdaptiveMedia = lazy(() => import('../components/AdaptiveMedia'))
const AnalyticsWidget = lazy(() => import('../components/AnalyticsWidget'))

const DashboardPage = ({ state }) => {
  const MotionSection = motion.section

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <HeroSection modeConfig={state.modeConfig} />

      <MotionSection layout className="grid gap-6 lg:grid-cols-2">
        <SystemStatusPanel deviceType={state.deviceType} network={state.activeNetwork} mode={state.mode} />
        <ControlPanel
          prefs={state.prefs}
          setModeOverride={state.setModeOverride}
          setSimulatedNetwork={state.setSimulatedNetwork}
          setLayoutPreference={state.setLayoutPreference}
        />
      </MotionSection>

      <Suspense fallback={<SkeletonBlock className="h-[420px] w-full" />}>
        <AdaptiveMedia mode={state.mode} activeNetwork={state.activeNetwork} layoutDensity={state.layoutDensity} />
      </Suspense>

      <Suspense fallback={<SkeletonBlock className="h-[150px] w-full" />}>
        <AnalyticsWidget analytics={state.analytics} />
      </Suspense>
    </main>
  )
}

export default DashboardPage
