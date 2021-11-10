import { getCharType } from '../../src/feature/char'

describe('Char Functions', () => {
  test('getCharType', () => {
    expect(getCharType('a')).toBe('R')
    expect(getCharType('0')).toBe('N')
    expect(getCharType('あ')).toBe('H')
    expect(getCharType('ア')).toBe('K')
    expect(getCharType('漢')).toBe('J')
    expect(getCharType('百')).toBe('S')
    expect(getCharType('!')).toBe('O')
  })
})
