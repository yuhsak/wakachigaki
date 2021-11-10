import type { NgramHashFeature, NgramTypeFeature } from './types'
import { range } from '../util'

type FeatureSource = [string, number, number]

const hashSources: FeatureSource[] = [
  ['UH', 7, 1],
  ['BH', 6, 2],
  ['TH', 5, 3],
]

const typeSources: FeatureSource[] = [
  ['UT', 7, 1],
  ['BT', 6, 2],
  ['TT', 5, 3],
]

const getFeature =
  <T, R>(sources: FeatureSource[]) =>
  (fn: (pos: number, num: number) => T) => {
    return sources.reduce(
      (acc, [name, end, size]) => ({
        ...acc,
        ...range(-6, end).reduce(
          (acc, i) => ({
            ...acc,
            [name + (i + 7)]: fn(i, size),
          }),
          {},
        ),
      }),
      {},
    ) as R
  }

export const getHashFeature = getFeature<number, NgramHashFeature>(hashSources)

export const getTypeFeature = getFeature<string, NgramTypeFeature>(typeSources)
