import type { NgramFeature } from '../feature'
import { threshold as t } from '../model'
import { proba } from './proba'

export const predictProba = (features: NgramFeature[], treshold = t) => {
  return features.reduce(
    (acc, feature) => {
      const p = proba({ ...feature, distance: acc.distance })
      const willBreak = p >= treshold
      const distance = willBreak ? 0 : acc.distance + 1
      return { value: [...acc.value, p], distance }
    },
    { value: [], distance: 0 } as { value: number[]; distance: number },
  ).value
}

export const predict = (features: NgramFeature[], threshold = t) =>
  predictProba(features, threshold).map((p) => p >= threshold)
