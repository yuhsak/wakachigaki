import { features } from './feature'
import { predict } from './predict'

export const tokenize = (text: string) => {
  const chars = features(text)
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

export { tokenize as segment }
