import type { NgramFeature } from './types'
import { ngram, txt2hash } from '../util'
import { getCharType } from './char'
import { getHashFeature, getTypeFeature } from './feature'

export const getFeatures = (text: string): NgramFeature[] => {
  const _chars = [...text]

  const chars = ['B6', 'B5', 'B4', 'B3', 'B2', 'B1']
    .concat(_chars)
    .concat(['E1', 'E2', 'E3', 'E4', 'E5', 'E6'])

  const types = ['B', 'B', 'B', 'B', 'B', 'B']
    .concat(_chars.map(getCharType))
    .concat(['E', 'E', 'E', 'E', 'E', 'E'])

  const ngramByChars = ngram(chars)
  const ngramByTypes = ngram(types)

  return _chars.map((c, i) => {
    const index = i + 6
    const ngramByCharsAt = ngramByChars(index)
    const ngramByTypesAt = ngramByTypes(index)

    const hash = getHashFeature((pos, num) =>
      txt2hash(ngramByCharsAt(pos, num)),
    )
    const type = getTypeFeature(ngramByTypesAt)

    return { hash, type }
  })
}
