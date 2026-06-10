import { motion } from 'framer-motion'

/**
 * Slider angka dengan tombol -/+ dan track berisi.
 * Dipakai untuk jumlah pemain & jumlah penyusup.
 */
export default function Stepper({ label, hint, value, min, max, onChange, accent = 'gold' }) {
  const span = Math.max(1, max - min)
  const pct = ((value - min) / span) * 100

  const trackFill =
    accent === 'coral'
      ? 'from-coral-500 to-coral-400'
      : 'from-gold-600 to-gold-400'

  const clamp = (v) => Math.min(max, Math.max(min, v))

  return (
    <div className="no-tap-select">
      <div className="mb-3 flex items-baseline justify-between">
        <div>
          <p className="font-display text-lg font-600 text-white">{label}</p>
          {hint && <p className="text-sm text-white/45">{hint}</p>}
        </div>
        <motion.span
          key={value}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 22 }}
          className={`font-display text-3xl font-700 tabular-nums ${
            accent === 'coral' ? 'text-coral-400' : 'text-gold-400'
          }`}
        >
          {value}
        </motion.span>
      </div>

      <div className="flex items-center gap-3">
        <RoundBtn disabled={value <= min} onClick={() => onChange(clamp(value - 1))}>
          –
        </RoundBtn>

        <div className="relative h-3 flex-1">
          <div className="absolute inset-0 rounded-full bg-white/8" />
          <motion.div
            className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${trackFill}`}
            animate={{ width: `${pct}%` }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(clamp(Number(e.target.value)))}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label={label}
          />
          <motion.div
            className="pointer-events-none absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg shadow-black/40 ring-2 ring-white/40"
            animate={{ left: `${pct}%` }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        </div>

        <RoundBtn disabled={value >= max} onClick={() => onChange(clamp(value + 1))}>
          +
        </RoundBtn>
      </div>
    </div>
  )
}

function RoundBtn({ children, disabled, onClick }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      disabled={disabled}
      onClick={onClick}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full glass text-2xl font-600 leading-none text-white transition-opacity disabled:opacity-25"
    >
      {children}
    </motion.button>
  )
}
