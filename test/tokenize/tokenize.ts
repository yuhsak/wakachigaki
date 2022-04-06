import { tokenize, segment } from '../../src/tokenize'

describe('tokenize functions', () => {
  const tokens = tokenize('This is a Test')
  test('tokenize', () => {
    expect(Array.isArray(tokens)).toBe(true)
    expect(Array.isArray(tokenize('あいうえお'))).toBe(true)
  })
  test('segment', () => {
    expect(segment('This is a Test')).toStrictEqual(tokens)
  })
})
