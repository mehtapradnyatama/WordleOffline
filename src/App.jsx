import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SetupScreen from './screens/SetupScreen.jsx'
import PlayScreen from './screens/PlayScreen.jsx'
import DiscussScreen from './screens/DiscussScreen.jsx'
import ResultScreen from './screens/ResultScreen.jsx'
import { buildRound } from './lib/game.js'

function shufflePlayers(players) {
  const a = [...players]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function App() {
  const [phase, setPhase] = useState('setup') // setup | play | discuss | result
  const [config, setConfig] = useState({
    playerCount: 4,
    impostorCount: 1,
    lang: 'id',
    names: ['', '', '', ''],
  })
  const [round, setRound] = useState(null)

  const startRound = () => {
    const names = config.names.slice(0, config.playerCount)
    const built = buildRound({ names, impostorCount: config.impostorCount, lang: config.lang })
    setRound({ ...built, players: shufflePlayers(built.players) })
    setPhase('play')
  }

  return (
    <AnimatePresence mode="wait">
      {phase === 'setup' && (
        <SetupScreen key="setup" config={config} setConfig={setConfig} onStart={startRound} />
      )}

      {phase === 'play' && round && (
        <PlayScreen
          key="play"
          players={round.players}
          onComplete={() => setPhase('discuss')}
          onAbort={() => setPhase('setup')}
        />
      )}

      {phase === 'discuss' && round && (
        <DiscussScreen
          key="discuss"
          players={round.players}
          impostorCount={config.impostorCount}
          onReveal={() => setPhase('result')}
          onAbort={() => setPhase('setup')}
        />
      )}

      {phase === 'result' && round && (
        <ResultScreen
          key="result"
          round={round}
          onReplay={startRound}
          onNewSetup={() => setPhase('setup')}
        />
      )}
    </AnimatePresence>
  )
}
