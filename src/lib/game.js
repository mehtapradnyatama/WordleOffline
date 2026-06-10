import { WORD_PAIRS } from '../data/wordPairs.js'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function pickPair(lang) {
  const pairs = WORD_PAIRS[lang] || WORD_PAIRS.id
  const [a, b] = pairs[Math.floor(Math.random() * pairs.length)]
  // acak kata mana yang jadi milik warga vs penyusup
  return Math.random() < 0.5 ? [a, b] : [b, a]
}

/**
 * Bangun satu ronde.
 * @returns {{ players: Array<{id:number,name:string,isImpostor:boolean,word:string}>,
 *            civilianWord:string, impostorWord:string }}
 */
export function buildRound({ names, impostorCount, lang }) {
  const total = names.length
  const [civilianWord, impostorWord] = pickPair(lang)

  // pilih indeks penyusup secara acak
  const indices = shuffle(names.map((_, i) => i)).slice(0, impostorCount)
  const impostorSet = new Set(indices)

  const players = names.map((name, i) => {
    const isImpostor = impostorSet.has(i)
    return {
      id: i,
      name: name.trim() || defaultName(i, lang),
      isImpostor,
      word: isImpostor ? impostorWord : civilianWord,
    }
  })

  return { players, civilianWord, impostorWord }
}

export function defaultName(i, lang) {
  return lang === 'en' ? `Player ${i + 1}` : `Pemain ${i + 1}`
}
