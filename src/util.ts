export const ngram = (chars: string[]) => (index: number) => {
  const get = (size: number, offset: number): string => {
    if (size === 1) {
      return chars[index + offset] || ''
    }
    return get(size - 1, offset) + get(1, offset + (size - 1))
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

export const sigmoid = (n: number) => 1 / (1 + Math.exp(-1 * n))
