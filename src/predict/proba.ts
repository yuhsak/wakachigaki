import type { NgramFeatureWithDistance } from './types'
import { Weight } from '../model'
import { sigmoid } from '../util'

export const proba = (weight: Weight, scale: number) => {
  const { bias } = weight

  return (feature: NgramFeatureWithDistance) => {
    const features = feature.features.reduce<number>((score, f) => {
      return score + (weight[f.kind][f.size]?.[f.offset]?.[f.value] || 0)
    }, 0)

    const distance = feature.distance * weight.distance

    return sigmoid((bias + features + distance) / scale)
  }
}
