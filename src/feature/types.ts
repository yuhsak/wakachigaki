export type NgramFeature = {
  char: string
  features: {
    kind: 'type' | 'hash'
    size: number
    offset: number
    value: string
  }[]
}
