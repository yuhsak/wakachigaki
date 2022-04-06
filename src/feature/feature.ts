import type { NgramFeature } from './types'
import { ngram, range } from '../util'
import { hash } from '../hash'
import { getCharType } from './char'
import { model } from '../model'

const {
  config: { nBuckets, size, offset },
} = model

const markers = [
  'B',
  'D',
  'E',
  'F',
  'G',
  'I',
  'J',
  'L',
  'M',
  'P',
  'Q',
  'R',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

export const featurer = (nBuckets: number, size: number, offset: number) => {
  const prefix = markers.slice(0, offset)
  const suffix = markers.slice().reverse().slice(0, offset)
  const h = hash(nBuckets)

  return (text: string) => {
    const source = text.normalize()
    const chars = [...source]

    const ngramByChars = ngram([...prefix, ...source.toLowerCase(), ...suffix])
    const ngramByTypes = ngram([
      ...prefix,
      ...chars.map(getCharType),
      ...suffix,
    ])

    return chars.map((char, i): NgramFeature => {
      const index = i + offset
      const ngramByCharsAt = ngramByChars(index)
      const ngramByTypesAt = ngramByTypes(index)

      return range(1, size + 1).reduce<NgramFeature>(
        (acc, s) => {
          return range(-1 * offset, offset + 1 + 1 - s).reduce<NgramFeature>(
            (acc, o) => {
              const _t = ngramByTypesAt(s, o)
              const _h = h(ngramByCharsAt(s, o))
              return {
                ...acc,
                features: [
                  ...acc.features,
                  { kind: 'type', size: s, offset: o, value: _t },
                  { kind: 'hash', size: s, offset: o, value: _h },
                ],
              }
            },
            acc,
          )
        },
        { char, features: [] },
      )
    })
  }
}

export const features = featurer(nBuckets, size, offset)
