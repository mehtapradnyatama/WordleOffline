import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function DiscussScreen({ players, impostorCount, onReveal, onAbort }) {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [running])

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return (
    <motion.div
      key="discuss"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-10 pt-12"
    >
      <div className="mb-8 flex items-center justify-between no-tap-select">
        <button
          onClick={onAbort}
          className="rounded-full glass px-3.5 py-1.5 text-sm text-white/60"
        >
          ✕ Keluar
        </button>
        <span className="rounded-full bg-coral-500/15 px-3.5 py-1.5 text-sm font-600 text-coral-400">
          {impostorCount} penyusup bersembunyi 🤫
        </span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center no-tap-select">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 240, damping: 18 }}
          className="mb-2 text-6xl"
        >
          🗣️
        </motion.div>
        <h2 className="font-display text-4xl font-700 text-white">Waktunya Diskusi</h2>
        <p className="mx-auto mt-3 max-w-xs text-balance text-sm leading-relaxed text-white/55">
          Bergiliran sebutkan satu petunjuk soal kata kalian — jangan terlalu
          gamblang. Lalu pilih siapa yang paling mencurigakan.
        </p>

        {/* Timer */}
        <motion.button
          type="button"
          onClick={() => setRunning((r) => !r)}
          whileTap={{ scale: 0.96 }}
          className="mt-9 rounded-3xl glass px-10 py-6"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">
            {running ? 'Ketuk untuk jeda' : 'Dijeda — ketuk lanjut'}
          </p>
          <p className="font-display text-6xl font-700 tabular-nums text-white">
            {mm}:{ss}
          </p>
        </motion.button>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {players.map((p) => (
            <span
              key={p.id}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70"
            >
              {p.name}
            </span>
          ))}
        </div>
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={onReveal}
        className="mt-8 w-full rounded-2xl bg-gradient-to-r from-coral-500 to-coral-600 py-4 font-display text-xl font-700 text-white shadow-lg shadow-coral-600/30 no-tap-select"
      >
        Ungkap Penyusup 👀
      </motion.button>
    </motion.div>
  )
}
