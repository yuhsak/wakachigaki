import { ngram, range } from '../../src/util'

describe('utility Functions', () => {
  describe('ngram', () => {
    const chars = [...'abcdefghijklmn']
    const last = chars.length - 1
    test('works', () => {
      expect(ngram(chars)(4)(3, -2)).toBe('cde')
      expect(ngram(chars)(2)(3, 2)).toBe('efg')
    })
    test('works even if given index is out of range', () => {
      expect(ngram(chars)(-2)(5, -2)).toBe('a')
      expect(ngram(chars)(last + 1)(1, -1)).toBe('n')
    })
    test('works even if given position is out of range', () => {
      expect(ngram(chars)(0)(4, -2)).toBe('ab')
      expect(ngram(chars)(last)(1, 2)).toBe('')
    })
    test('works even if given size is out of range', () => {
      expect(ngram(chars)(0)(999, -2)).toBe(chars.join(''))
    })
  })

  test('range', () => {
    expect(range(0, 3)).toStrictEqual([0, 1, 2])
    expect(range(-2, 1)).toStrictEqual([-2, -1, 0])
  })
})
