import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Stepper from '../components/Stepper.jsx'

export default function SetupScreen({ config, setConfig, onStart }) {
  const [showNames, setShowNames] = useState(false)
  const { playerCount, impostorCount, lang, names } = config

  const setPlayerCount = (n) => {
    setConfig((c) => {
      const nextNames = [...c.names]
      while (nextNames.length < n) nextNames.push('')
      nextNames.length = n
      return {
        ...c,
        playerCount: n,
        names: nextNames,
        impostorCount: Math.min(c.impostorCount, n - 1),
      }
    })
  }

  const setImpostorCount = (n) => setConfig((c) => ({ ...c, impostorCount: n }))
  const setLang = (l) => setConfig((c) => ({ ...c, lang: l }))
  const setName = (i, v) =>
    setConfig((c) => {
      const nextNames = [...c.names]
      nextNames[i] = v
      return { ...c, names: nextNames }
    })

  return (
    <motion.div
      key="setup"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-10 pt-12"
    >
      {/* Brand */}
      <header className="mb-9 text-center no-tap-select">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.05 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-600 uppercase tracking-[0.2em] text-gold-400"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-coral-500" />
          Offline · Pass &amp; Play
        </motion.div>
        <h1 className="font-display text-5xl font-700 leading-[0.95] text-white">
          Kata
          <br />
          <span className="bg-gradient-to-r from-gold-400 via-coral-400 to-coral-500 bg-clip-text text-transparent">
            Penyusup
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-xs text-balance text-sm leading-relaxed text-white/55">
          Semua dapat satu kata rahasia — kecuali si penyusup yang dapat kata
          mirip. Temukan siapa yang bohong.
        </p>
      </header>

      <div className="space-y-4">
        {/* Pemain */}
        <Panel>
          <Stepper
            label="Jumlah Pemain"
            hint="Minimal 2 orang"
            value={playerCount}
            min={2}
            max={12}
            onChange={setPlayerCount}
          />
        </Panel>

        {/* Penyusup */}
        <Panel>
          <Stepper
            label="Jumlah Penyusup"
            hint={`Maks ${playerCount - 1} dari ${playerCount} pemain`}
            value={impostorCount}
            min={1}
            max={playerCount - 1}
            accent="coral"
            onChange={setImpostorCount}
          />
        </Panel>

        {/* Bahasa */}
        <Panel>
          <p className="mb-3 font-display text-lg font-600 text-white no-tap-select">
            Bahasa Kata
          </p>
          <div className="relative grid grid-cols-2 gap-1 rounded-2xl bg-white/6 p-1">
            <LangPill active={lang === 'id'} onClick={() => setLang('id')} label="Indonesia" flag="🇮🇩" />
            <LangPill active={lang === 'en'} onClick={() => setLang('en')} label="English" flag="🇬🇧" />
          </div>
        </Panel>

        {/* Nama (opsional) */}
        <Panel>
          <button
            type="button"
            onClick={() => setShowNames((s) => !s)}
            className="flex w-full items-center justify-between no-tap-select"
          >
            <div className="text-left">
              <p className="font-display text-lg font-600 text-white">Nama Pemain</p>
              <p className="text-sm text-white/45">Opsional — biar lebih seru</p>
            </div>
            <motion.span
              animate={{ rotate: showNames ? 45 : 0 }}
              className="flex h-9 w-9 items-center justify-center rounded-full glass text-xl leading-none text-white"
            >
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {showNames && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {names.map((n, i) => (
                    <input
                      key={i}
                      value={n}
                      onChange={(e) => setName(i, e.target.value)}
                      placeholder={`Pemain ${i + 1}`}
                      maxLength={14}
                      className="rounded-xl border border-white/10 bg-night-950/50 px-3 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-gold-500/60"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Panel>
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="mt-7 w-full rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 py-4 font-display text-xl font-700 text-night-950 shadow-lg shadow-gold-600/30 no-tap-select"
      >
        Mulai Bermain →
      </motion.button>

      <p className="mt-4 text-center text-xs text-white/35 no-tap-select">
        {playerCount} pemain · {impostorCount} penyusup ·{' '}
        {playerCount - impostorCount} warga
      </p>
    </motion.div>
  )
}

function Panel({ children }) {
  return <div className="rounded-3xl glass p-5">{children}</div>
}

function LangPill({ active, onClick, label, flag }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative z-10 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-600 no-tap-select"
    >
      {active && (
        <motion.span
          layoutId="lang-pill"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 shadow shadow-gold-600/30"
        />
      )}
      <span className={active ? 'text-night-950' : 'text-white/60'}>
        {flag} {label}
      </span>
    </button>
  )
}
