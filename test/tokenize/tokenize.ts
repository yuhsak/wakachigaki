import { tokenize, segment } from '../../src/tokenize'

describe('Tokenize Functions', () => {
  const tokens = tokenize('This is a Test')
  test('tokenize', () => {
    expect(Array.isArray(tokens)).toBe(true)
  })
  test('segment', () => {
    expect(segment('This is a Test')).toStrictEqual(tokens)
  })
})
