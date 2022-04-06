import type { NgramFeature } from '../feature'
import { threshold as t, model, Weight } from '../model'
import { proba } from './proba'

const {
  weight,
  config: { scale },
} = model

export const probaPredictor = (weight: Weight, scale: number) => {
  const p = proba(weight, scale)

  return (features: NgramFeature[], threshold = 0.5) => {
    return features.reduce<{ value: number[]; distance: number }>(
      (acc, feature) => {
        const _p = p({ ...feature, distance: acc.distance })
        const willBreak = _p > threshold
        const distance = willBreak ? 0 : acc.distance + 1
        return { value: [...acc.value, _p], distance }
      },
      { value: [], distance: 0 },
    ).value
  }
}

export const predictProba = probaPredictor(weight, scale)

export const predictor = (weight: Weight, scale: number) => {
  const predictProba = probaPredictor(weight, scale)

  return (features: NgramFeature[], threshold = t) =>
    predictProba(features, threshold).map((p) => p > threshold)
}

export const predict = predictor(weight, scale)
