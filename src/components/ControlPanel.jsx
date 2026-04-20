import { memo } from 'react'

const modeOptions = [
  { value: 'auto', label: 'Auto Detect' },
  { value: 'performance', label: 'Performance' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'quality', label: 'High Quality' },
]

const networkOptions = [
  { value: 'auto', label: 'Auto' },
  { value: 'slow', label: 'Simulate Slow' },
  { value: 'medium', label: 'Simulate Medium' },
  { value: 'fast', label: 'Simulate Fast' },
]

const densityOptions = [
  { value: 'auto', label: 'Auto' },
  { value: 'compact', label: 'Compact' },
  { value: 'expanded', label: 'Expanded' },
]

const Selector = ({ label, value, onChange, options }) => (
  <label className="block">
    <span className="text-xs uppercase tracking-[0.16em] text-slate-400">{label}</span>
    <select
      className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-300/70"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
)

const ControlPanel = ({ prefs, setModeOverride, setSimulatedNetwork, setLayoutPreference }) => (
  <section className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
    <h2 className="text-base font-medium text-white">Control Panel</h2>
    <p className="mt-1 text-sm text-slate-400">Override automatic intelligence for live demos.</p>
    <div className="mt-4 grid gap-4 md:grid-cols-3">
      <Selector label="Mode" value={prefs.modeOverride} onChange={setModeOverride} options={modeOptions} />
      <Selector
        label="Network Simulation"
        value={prefs.simulatedNetwork}
        onChange={setSimulatedNetwork}
        options={networkOptions}
      />
      <Selector
        label="Layout Density"
        value={prefs.layoutPreference}
        onChange={setLayoutPreference}
        options={densityOptions}
      />
    </div>
  </section>
)

export default memo(ControlPanel)
