import type { Type } from '../model'

const regexp = [
  {
    v: /[々〇〻\u2E80-\u2FDF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]/,
    rep: 'J',
  },
  { v: /[一二三四五六七八九十百千万億兆]/, rep: 'S' },
  { v: /[ぁ-ん]/, rep: 'H' },
  { v: /[ァ-ヴーｧ-ﾝﾞﾟ]/, rep: 'K' },
  { v: /[a-zA-Zａ-ｚＡ-Ｚ]/, rep: 'R' },
  { v: /[0-9０-９]/, rep: 'N' },
]

export const getCharType = (char: string): Type => {
  let i = regexp.length
  while (i--) {
    const reg = regexp[i]!
    if (reg.v.test(char)) {
      return reg.rep
    }
  }
  return 'O'
}
