import { cyclicShiftBy5, crcVariant, txt2hash } from '../../src'

describe('Hash Functions', () => {
  test('cyclicShiftBy5', () => {
    expect(cyclicShiftBy5(0)).toBe(0)
    expect(cyclicShiftBy5(1)).toBe(32)
    expect(cyclicShiftBy5(2)).toBe(64)
    expect(cyclicShiftBy5(3)).toBe(96)
    expect(cyclicShiftBy5(4)).toBe(128)
    expect(cyclicShiftBy5(5)).toBe(160)
    expect(cyclicShiftBy5(6)).toBe(192)
    expect(cyclicShiftBy5(7)).toBe(224)
    expect(cyclicShiftBy5(8)).toBe(256)
    expect(cyclicShiftBy5(9)).toBe(288)
    expect(cyclicShiftBy5(10)).toBe(320)
    expect(cyclicShiftBy5(-1)).toBe(4294967295)
    expect(cyclicShiftBy5(-2)).toBe(4294967263)
    expect(cyclicShiftBy5(9007199254740991)).toBe(4294967295)
    expect(cyclicShiftBy5(-9007199254740991)).toBe(32)
  })

  test('crcVariant', () => {
    expect(crcVariant([0, 1, 2, 3, 4])).toBe(34916)
    expect(crcVariant([90, 72, 1024, 5678, 9611])).toBe(93773899)
  })

  test('txt2hash', () => {
    expect(txt2hash('Hello, World!')).toBe(49)
    expect(txt2hash('Test if this works')).toBe(136)
  })
})
