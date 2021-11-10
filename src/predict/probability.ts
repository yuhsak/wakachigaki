import type { NgramHashFeature, NgramTypeFeature } from '../feature'
import type { NgramFeatureWithDistance } from './types'
import { model } from '../model'

export const probability = (feature: NgramFeatureWithDistance) => {
  const { bias } = model

  const hash = (Object.keys(feature.hash) as (keyof NgramHashFeature)[]).reduce(
    (score, key) => score + (model.weight.hash[key][feature.hash[key]] || 0),
    0,
  )

  const type = (Object.keys(feature.type) as (keyof NgramTypeFeature)[]).reduce(
    (score, key) => score + (model.weight.type[key][feature.type[key]] || 0),
    0,
  )

  const distance = model.weight.distance * feature.distance

  return bias + hash + type + distance
}
