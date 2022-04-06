import { featurer } from './feature'
import { predict } from './predict'
import { model } from './model'

const { nBuckets, size, offset } = model.config

export const tokenizer = (nBuckets: number, size: number, offset: number) => {
  const f = featurer(nBuckets, size, offset)

  return (text: string) => {
    const chars = f(text)
    return predict(chars)
      .reduce(
        (acc, willBreak, i) => {
          acc[acc.length - 1] += chars[i]!.char
          if (willBreak) acc.push('')
          return acc
        },
        [''],
      )
      .filter((c) => !!c)
  }
}

export const tokenize = tokenizer(nBuckets, size, offset)

export { tokenize as segment }
