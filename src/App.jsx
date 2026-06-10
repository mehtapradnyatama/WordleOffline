import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SetupScreen from './screens/SetupScreen.jsx'
import PlayScreen from './screens/PlayScreen.jsx'
import DiscussScreen from './screens/DiscussScreen.jsx'
import ResultScreen from './screens/ResultScreen.jsx'
import { buildRound } from './lib/game.js'

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
    setRound(buildRound({ names, impostorCount: config.impostorCount, lang: config.lang }))
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
