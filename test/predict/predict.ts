import { predictor, probaPredictor } from '../../src/predict/predict'

const weight = { type: {}, hash: {}, distance: 0, bias: 0 }

const predictProba = probaPredictor(weight, 1)

const predict = predictor(weight, 1)

const features = [{ char: 'a', features: [] }]

describe('prediction functions', () => {
  describe('predictProba', () => {
    test('works', () => {
      const probas = predictProba(features)
      expect(probas[0]).toEqual(0.5)
    })
  })

  describe('predict', () => {
    test('works with threshold', () => {
      expect(predict(features, 0.6)[0]).toEqual(false)
      expect(predict(features, 0.4)[0]).toEqual(true)
    })
  })
})
