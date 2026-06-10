import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PlayScreen({ players, onComplete, onAbort }) {
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const player = players[index]
  const isLast = index === players.length - 1

  const next = () => {
    if (isLast) {
      onComplete()
    } else {
      setRevealed(false)
      setIndex((i) => i + 1)
    }
  }

  return (
    <motion.div
      key="play"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-8 pt-8"
    >
      {/* top bar */}
      <div className="mb-6 flex items-center justify-between no-tap-select">
        <button
          onClick={onAbort}
          className="rounded-full glass px-3.5 py-1.5 text-sm text-white/60"
        >
          ✕ Keluar
        </button>
        <div className="flex gap-1.5">
          {players.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i < index
                  ? 'w-4 bg-gold-500'
                  : i === index
                    ? 'w-7 bg-white'
                    : 'w-4 bg-white/15'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <p className="mb-6 text-center text-sm font-600 uppercase tracking-[0.2em] text-white/40 no-tap-select">
          Giliran ke-{index + 1} dari {players.length}
        </p>

        {/* Kartu flip */}
        <div className="relative w-full" style={{ perspective: 1400 }}>
          <motion.div
            className="relative h-[26rem] w-full no-tap-select"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: revealed ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Depan: tutup */}
            <CardFace>
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="flex h-full w-full flex-col items-center justify-center gap-5 px-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  key={index}
                  className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-coral-500 font-display text-3xl font-700 text-night-950 shadow-lg shadow-coral-600/30"
                >
                  {player.name.slice(0, 2).toUpperCase()}
                </motion.div>
                <div>
                  <p className="font-display text-3xl font-700 text-white">
                    {player.name}
                  </p>
                  <p className="mt-2 text-sm text-white/50">
                    Pastikan tidak ada yang mengintip
                  </p>
                </div>
                <motion.span
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8 }}
                  className="mt-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-600 text-gold-300"
                >
                  👆 Ketuk untuk lihat kata
                </motion.span>
              </button>
            </CardFace>

            {/* Belakang: kata */}
            <CardFace back>
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="text-sm font-600 uppercase tracking-[0.2em] text-white/40">
                  Kata kamu
                </span>
                <AnimatePresence mode="wait">
                  {revealed && (
                    <motion.p
                      key={player.id}
                      initial={{ scale: 0.6, opacity: 0, rotateX: -40 }}
                      animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.25 }}
                      className="bg-gradient-to-r from-gold-300 via-white to-gold-300 bg-clip-text px-2 font-display text-5xl font-700 leading-tight text-transparent"
                    >
                      {player.word}
                    </motion.p>
                  )}
                </AnimatePresence>
                <p className="max-w-[15rem] text-balance text-sm text-white/45">
                  Ingat baik-baik. Jangan tunjukkan ke siapa pun.
                </p>
              </div>
            </CardFace>
          </motion.div>
        </div>

        {/* Tombol bawah */}
        <div className="mt-7 h-14 w-full">
          <AnimatePresence>
            {revealed && (
              <motion.button
                type="button"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileTap={{ scale: 0.97 }}
                onClick={next}
                className="w-full rounded-2xl bg-white py-4 font-display text-lg font-700 text-night-950 shadow-lg shadow-black/30 no-tap-select"
              >
                {isLast ? 'Sudah hafal — Mulai Diskusi' : 'Sudah hafal — Oper ke berikutnya →'}
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

function CardFace({ children, back = false }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden rounded-[2rem] border shadow-2xl ${
        back
          ? 'border-gold-500/25 bg-gradient-to-br from-night-700 to-night-900 shadow-gold-900/30'
          : 'border-white/10 bg-gradient-to-br from-night-700 to-night-800 shadow-black/40'
      }`}
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: back ? 'rotateY(180deg)' : 'none',
      }}
    >
      {children}
    </div>
  )
}
