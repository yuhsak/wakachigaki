import { proba } from '../../src/predict/proba'

describe('probability functions', () => {
  describe('proba', () => {
    test('works even if empty weights are given', () => {
      const p = proba({ type: {}, hash: {}, distance: 0, bias: 0 }, 1)
      const v = p({
        char: 'a',
        features: [
          {
            kind: 'type',
            size: 1,
            offset: 0,
            value: 'A',
          },
        ],
        distance: 0,
      })
      expect(v).toEqual(0.5)
    })
  })
})
