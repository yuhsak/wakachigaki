import { crc32, hash } from '../../src/hash'

describe('hash functions', () => {
  describe('crc32', () => {
    test('provides correct value', () => {
      expect(crc32(new TextEncoder().encode('abcdef'))).toEqual(1267612143)
      expect(crc32(new TextEncoder().encode('CRC32関数のテスト'))).toEqual(
        549135931,
      )
    })
  })

  describe('hash', () => {
    test('provides correct hex', () => {
      expect(hash(262144)('abcdef')).toEqual('239ef')
      expect(hash(262144)('CRC32関数のテスト')).toEqual('3263b')
    })
  })
})
