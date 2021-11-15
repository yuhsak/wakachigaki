import { features } from './feature'
import { predict } from './predict'

export const tokenize = (text: string) => {
  return predict(features(text))
    .reduce(
      (acc, willBreak, i) => {
        acc[acc.length - 1] += text[i]
        if (willBreak) acc.push('')
        return acc
      },
      [''],
    )
    .filter((c) => !!c)
}

export { tokenize as segment }
