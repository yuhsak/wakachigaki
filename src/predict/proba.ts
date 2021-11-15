import type { NgramHashFeature, NgramTypeFeature } from '../feature'
import type { NgramFeatureWithDistance } from './types'
import { model } from '../model'

export const proba = (feature: NgramFeatureWithDistance) => {
  const bias = model.bias / 1000

  const hash =
    (Object.keys(feature.hash) as (keyof NgramHashFeature)[]).reduce(
      (score, key) => score + (model.weight.hash[key][feature.hash[key]] || 0),
      0,
    ) / 1000

  const type =
    (Object.keys(feature.type) as (keyof NgramTypeFeature)[]).reduce(
      (score, key) => score + (model.weight.type[key][feature.type[key]] || 0),
      0,
    ) / 1000

  const distance = (model.weight.distance / 1000) * feature.distance

  return 1 / (1 + Math.exp(-1 * (bias + hash + type + distance)))
}
