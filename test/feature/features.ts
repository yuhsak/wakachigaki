import { features } from '../../src/feature'

const props = (t: string) =>
  ['U', 'B', 'T'].flatMap((n) =>
    [...Array(n === 'U' ? 13 : n === 'B' ? 12 : 11).keys()].map(
      (k) => `${n}${t}${k + 1}`,
    ),
  )

describe('Features Functions', () => {
  test('features', () => {
    const text = 'aあ0漢カ百bhjかいオ'
    const feats = features(text)
    expect(feats).toHaveLength(text.length)
    const feature = feats[0]
    const { type, hash } = feature
    props('H').forEach((prop) => {
      expect(hash).toHaveProperty(prop)
    })
    props('T').forEach((prop) => {
      expect(type).toHaveProperty(prop)
    })
  })
})
