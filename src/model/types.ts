type Weights = Record<number, Record<number, Record<string, number>>>

export type Weight = {
  hash: Weights
  type: Weights
  distance: number
  bias: number
}

export type Model = {
  version: number
  config: {
    nBuckets: number
    size: number
    offset: number
    scale: number
  }
  weight: Weight
}
