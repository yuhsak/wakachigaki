import { featurer } from '../../src/feature'

describe('feature functions', () => {
  test('features', () => {
    const text = 'aあ0漢カ百bhjかいオ'
    const feats = featurer(262144, 3, 3)(text)
    expect(feats).toHaveLength(text.length)
    feats.forEach((f) =>
      f.features.forEach((f) => {
        expect(['type', 'hash'].includes(f.kind)).toEqual(true)
        expect(typeof f.size).toEqual('number')
        expect(typeof f.offset).toEqual('number')
        expect(typeof f.value).toEqual('string')
      }),
    )
  })
})
