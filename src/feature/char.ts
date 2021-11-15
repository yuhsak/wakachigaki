import type { Type } from '../model'
import * as R from './regexp'

const rules = [
  {
    fn: R.isKanji,
    rep: 'J',
  },
  { fn: R.isNumeralKanji, rep: 'S' },
  { fn: R.isHiragana, rep: 'H' },
  { fn: R.isKatakana, rep: 'K' },
  { fn: R.isAlphabet, rep: 'R' },
  { fn: R.isNumeral, rep: 'N' },
]

export const getCharType = (char: string): Type => {
  let i = rules.length
  while (i--) {
    const rule = rules[i]!
    if (rule.fn(char)) {
      return rule.rep
    }
  }
  return 'O'
}
