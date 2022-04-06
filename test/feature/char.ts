import { getCharType } from '../../src/feature'

describe('char functions', () => {
  test('getCharType', () => {
    expect(getCharType('a')).toBe('A')
    expect(getCharType('0')).toBe('N')
    expect(getCharType('あ')).toBe('H')
    expect(getCharType('ア')).toBe('K')
    expect(getCharType('漢')).toBe('C')
    expect(getCharType('百')).toBe('S')
    expect(getCharType('!')).toBe('O')
  })
})
