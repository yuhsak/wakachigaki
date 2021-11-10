import { getFeatures } from '../../src/feature'

const props = (t: string) =>
  ['U', 'B', 'T'].flatMap((n) =>
    [...Array(n === 'U' ? 13 : n === 'B' ? 12 : 11).keys()].map(
      (k) => `${n}${t}${k + 1}`,
    ),
  )

describe('Features Functions', () => {
  test('getFeatures', () => {
    const text = 'aあ0漢カ百bhjかいオ'
    const features = getFeatures(text)
    expect(features).toHaveLength(text.length)
    const feature = features[0]
    const { type, hash } = feature
    props('H').forEach((prop) => {
      expect(hash).toHaveProperty(prop)
    })
    props('T').forEach((prop) => {
      expect(type).toHaveProperty(prop)
    })
  })
})
