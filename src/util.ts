export const ngram = (chars: string[]) => (index: number) => {
  const get = (pos: number, num: number): string => {
    if (num === 1) {
      return chars[index + pos] || ''
    }
    return get(pos, num - 1) + get(pos + (num - 1), 1)
  }
  return get
}

export const range = (start: number, end: number) => {
  const tmp: number[] = []
  for (let i = start; i < end; i++) {
    tmp.push(i)
  }
  return tmp
}

export const cyclicShift = (bits: number) => (num: number) => {
  const int32 = num & 0xffffffff
  return (((int32 << bits) >>> 0) | (int32 >>> (32 - bits))) >>> 0
}

export const cyclicShiftBy5 = cyclicShift(5)

export const crcVariant = (seq: number[]) =>
  seq.reduce((acc, n) => (cyclicShiftBy5(acc) ^ n) >>> 0, 0)

export const PRIME_NUMBER = 255

export const seq2hash = (seq: number[]) => crcVariant(seq) % PRIME_NUMBER

export const txt2hash = (text: string) =>
  seq2hash([...text].map((c) => c.charCodeAt(0)))
