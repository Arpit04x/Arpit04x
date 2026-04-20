import { memo, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SkeletonBlock from './SkeletonBlock'
import { getImageSourceSet, MEDIA_PROFILES, MODE_CONFIG } from '../utils/adaptiveEngine'

const AdaptiveMedia = ({ mode, activeNetwork, layoutDensity }) => {
  const MotionContainer = motion.div
  const [ready, setReady] = useState(false)

  const profile = useMemo(() => MEDIA_PROFILES[MODE_CONFIG[mode].mediaQuality], [mode])
  const imageSrcSet = useMemo(() => getImageSourceSet(), [])

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-medium text-white">Adaptive Media Component</h2>
        <p className="text-xs uppercase tracking-[0.16em] text-cyan-300">{profile.videoLabel}</p>
      </div>

      <AnimatePresence mode="wait">
        <MotionContainer
          key={`${mode}-${activeNetwork}-${layoutDensity}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.26 }}
          className={`mt-4 grid gap-4 ${layoutDensity === 'compact' ? 'grid-cols-1' : 'grid-cols-1 xl:grid-cols-[1.15fr_1fr]'}`}
        >
          <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
            {!ready && <SkeletonBlock className="absolute inset-0" />}
            <img
              src={`https://picsum.photos/seed/adaptivex-dynamic-visual/${profile.imageWidth}/${Math.round(profile.imageWidth * 0.58)}`}
              srcSet={imageSrcSet}
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 720px"
              loading="lazy"
              decoding="async"
              alt="Adaptive media preview"
              onLoad={() => setReady(true)}
              className="aspect-[16/9] w-full object-cover"
            />
          </article>

          <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-3">
            {!ready && <SkeletonBlock className="mb-3 h-[220px] w-full" />}
            <video
              className="h-[220px] w-full rounded-xl object-cover"
              preload="metadata"
              controls
              muted
              playsInline
              onLoadedData={() => setReady(true)}
            >
              <source src={profile.videoSrc} type="video/mp4" />
            </video>
            <div className="mt-3 rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-xs text-cyan-100">
              Stream simulation adapts instantly for <strong>{activeNetwork}</strong> network and <strong>{mode}</strong>{' '}
              mode.
            </div>
          </article>
        </MotionContainer>
      </AnimatePresence>
    </section>
  )
}

export default memo(AdaptiveMedia)
