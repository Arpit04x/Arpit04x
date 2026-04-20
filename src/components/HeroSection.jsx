import { motion } from 'framer-motion'

const HeroSection = ({ modeConfig }) => {
  const MotionHeader = motion.header
  const MotionBadge = motion.div

  return (
    <MotionHeader
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-10"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/90">AdaptiveX</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        Intelligent Content Delivery Interface
      </h1>
      <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
        A real-time adaptive frontend that reshapes media quality, layout density, and UX delivery for each
        user condition.
      </p>
      <MotionBadge
        key={modeConfig.label}
        initial={{ opacity: 0.4, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100"
      >
        <span className="h-2 w-2 rounded-full bg-cyan-300" />
        Optimized for your conditions · {modeConfig.label}
      </MotionBadge>
    </MotionHeader>
  )
}

export default HeroSection
