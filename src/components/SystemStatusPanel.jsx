import { memo } from 'react'
import { NETWORK_LEVELS } from '../utils/adaptiveEngine'

const Badge = ({ title, value }) => (
  <div className="rounded-2xl border border-white/10 bg-slate-900/55 px-4 py-3">
    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{title}</p>
    <p className="mt-1 text-sm font-medium text-slate-100">{value}</p>
  </div>
)

const SystemStatusPanel = ({ deviceType, network, mode }) => (
  <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
    <h2 className="text-base font-medium text-white">System Status</h2>
    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
      <Badge title="Device" value={deviceType} />
      <Badge title="Network" value={NETWORK_LEVELS[network].label} />
      <Badge title="Mode" value={mode} />
    </div>
  </section>
)

export default memo(SystemStatusPanel)
