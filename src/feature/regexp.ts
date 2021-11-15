export const regexp = {
  Kanji:
    /^[々〇〻\u2E80-\u2FDF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]|[\uD840-\uD87F][\uDC00-\uDFFF]+$/,
  NumeralKanji: /^[一二三四五六七八九十百千万億兆]+$/,
  Hiragana: /^[ぁ-ん]+$/,
  Katakana: /^[ァ-ヴーｧ-ﾝﾞﾟ]+$/,
  Alphabet: /^[a-zA-Zａ-ｚＡ-Ｚ]+$/,
  Numeral: /^[0-9０-９]+$/,
}

export const isKanji = (text: string) => regexp.Kanji.test(text)
export const isNumeralKanji = (text: string) => regexp.NumeralKanji.test(text)
export const isHiragana = (text: string) => regexp.Hiragana.test(text)
export const isKatakana = (text: string) => regexp.Katakana.test(text)
export const isAlphabet = (text: string) => regexp.Alphabet.test(text)
export const isNumeral = (text: string) => regexp.Numeral.test(text)
