import { motion } from 'framer-motion'

export default function ResultScreen({ round, onReplay, onNewSetup }) {
  const { players, civilianWord, impostorWord } = round
  const impostors = players.filter((p) => p.isImpostor)

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-10 pt-12"
    >
      <div className="text-center no-tap-select">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
          className="mb-2 text-6xl"
        >
          🎭
        </motion.div>
        <h2 className="font-display text-4xl font-700 text-white">Penyusupnya…</h2>
      </div>

      {/* Daftar penyusup */}
      <div className="mt-6 space-y-2.5">
        {impostors.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.12, type: 'spring', stiffness: 260, damping: 20 }}
            className="flex items-center gap-3 rounded-2xl border border-coral-500/30 bg-coral-500/10 p-3.5"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-coral-500 to-coral-600 font-display text-lg font-700 text-white">
              {p.name.slice(0, 2).toUpperCase()}
            </span>
            <div className="flex-1">
              <p className="font-display text-xl font-600 text-white">{p.name}</p>
              <p className="text-sm text-coral-300/80">Penyusup</p>
            </div>
            <span className="text-2xl">🕵️</span>
          </motion.div>
        ))}
      </div>

      {/* Dua kata */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 + impostors.length * 0.12 + 0.1 }}
        className="mt-5 grid grid-cols-2 gap-3 no-tap-select"
      >
        <WordCard label="Kata Warga" word={civilianWord} tone="mint" />
        <WordCard label="Kata Penyusup" word={impostorWord} tone="coral" />
      </motion.div>

      <p className="mt-6 text-center text-sm text-white/45 no-tap-select">
        {players.length - impostors.length} warga vs {impostors.length} penyusup
      </p>

      <div className="mt-auto space-y-3 pt-8">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onReplay}
          className="w-full rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 py-4 font-display text-xl font-700 text-night-950 shadow-lg shadow-gold-600/30 no-tap-select"
        >
          🔀 Ronde Baru (kata acak)
        </motion.button>
        <button
          type="button"
          onClick={onNewSetup}
          className="w-full rounded-2xl glass py-3.5 font-600 text-white/70 no-tap-select"
        >
          Ubah Pengaturan
        </button>
      </div>
    </motion.div>
  )
}

function WordCard({ label, word, tone }) {
  const styles =
    tone === 'mint'
      ? 'border-mint-500/30 bg-mint-500/10 text-mint-400'
      : 'border-coral-500/30 bg-coral-500/10 text-coral-400'
  return (
    <div className={`rounded-2xl border p-4 text-center ${styles}`}>
      <p className="text-xs uppercase tracking-[0.15em] opacity-70">{label}</p>
      <p className="mt-1.5 font-display text-2xl font-700 leading-tight text-white">
        {word}
      </p>
    </div>
  )
}
