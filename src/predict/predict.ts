import type { NgramFeature } from '../feature'
import type { NgramFeatureWithDistance } from './types'
import { model } from '../model'
import { probability } from './probability'

export const predictOne = (feature: NgramFeatureWithDistance) =>
  probability(feature) >= model.threshold

export const predict = (features: NgramFeature[]) => {
  return features.reduce(
    (acc, feature) => {
      const willBreak = predictOne({ ...feature, distance: acc.distance })
      const distance = willBreak ? 0 : acc.distance + 1
      return { value: [...acc.value, willBreak], distance }
    },
    { value: [], distance: 0 } as { value: boolean[]; distance: number },
  ).value
}
