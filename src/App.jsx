import { motion } from 'framer-motion'
import DashboardPage from './pages/DashboardPage'
import { useAdaptiveIntelligence } from './hooks/useAdaptiveIntelligence'

function App() {
  const MotionContainer = motion.div
  const state = useAdaptiveIntelligence()

  return (
    <MotionContainer
      layout
      className="min-h-screen bg-gradient-to-br from-[#05070e] via-[#0e1220] to-[#11182a] text-slate-100"
      animate={{
        filter:
          state.mode === 'quality'
            ? 'saturate(1.06)'
            : state.mode === 'performance'
              ? 'saturate(0.92)'
              : 'saturate(1)',
      }}
      transition={{ duration: 0.35 }}
    >
      <DashboardPage state={state} />
    </MotionContainer>
  )
}

export default App
