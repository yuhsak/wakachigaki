import * as R from './regexp'

const rules = [
  {
    fn: R.isKanji,
    rep: 'C',
  },
  { fn: R.isNumeralKanji, rep: 'S' },
  { fn: R.isHiragana, rep: 'H' },
  { fn: R.isKatakana, rep: 'K' },
  { fn: R.isAlphabet, rep: 'A' },
  { fn: R.isNumeral, rep: 'N' },
]

export const getCharType = (char: string) =>
  rules.reduce((rep, rule) => (rule.fn(char) ? rule.rep : rep), 'O')
