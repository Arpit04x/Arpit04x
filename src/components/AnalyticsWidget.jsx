import { memo } from 'react'

const Stat = ({ label, value, hint }) => (
  <div className="rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3">
    <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">{label}</p>
    <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    <p className="text-xs text-slate-400">{hint}</p>
  </div>
)

const AnalyticsWidget = ({ analytics }) => (
  <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
    <h2 className="text-base font-medium text-white">Analytics Widget</h2>
    <div className="mt-4 grid gap-3 sm:grid-cols-3">
      <Stat
        label="Estimated Data Saved"
        value={`${analytics.estimatedDataSavedMB} MB`}
        hint="Compared with full-quality baseline"
      />
      <Stat
        label="Load Time Improvement"
        value={`${analytics.loadTimeImprovementMS} ms`}
        hint="Projected based on current conditions"
      />
      <Stat
        label="Performance Score"
        value={`${analytics.performanceScore}/100`}
        hint="Dynamic health indicator"
      />
    </div>
  </section>
)

export default memo(AnalyticsWidget)
