import type { NgramFeature } from './types'
import { ngram, txt2hash } from '../util'
import { getCharType } from './char'
import { hashFeature, typeFeature } from './feature'

export const features = (text: string): NgramFeature[] => {
  const chars = [...text]

  const ngramByChars = ngram([
    ...['B6', 'B5', 'B4', 'B3', 'B2', 'B1'],
    ...chars,
    ...['E1', 'E2', 'E3', 'E4', 'E5', 'E6'],
  ])

  const ngramByTypes = ngram([
    ...['B', 'B', 'B', 'B', 'B', 'B'],
    ...chars.map(getCharType),
    ...['E', 'E', 'E', 'E', 'E', 'E'],
  ])

  return chars.map((char, i) => {
    const index = i + 6
    const ngramByCharsAt = ngramByChars(index)
    const ngramByTypesAt = ngramByTypes(index)

    const hash = hashFeature((pos, num) => txt2hash(ngramByCharsAt(pos, num)))
    const type = typeFeature(ngramByTypesAt)

    return { char, hash, type }
  })
}
