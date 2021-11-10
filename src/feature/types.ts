import type {
  NgramHashWeightKey,
  NgramTypeWeightKey,
  Hash,
  Type,
} from '../model'

export type NgramHashFeature = Record<NgramHashWeightKey, Hash>

export type NgramTypeFeature = Record<NgramTypeWeightKey, Type>

export type NgramFeature = { hash: NgramHashFeature; type: NgramTypeFeature }
