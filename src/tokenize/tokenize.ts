import { getFeatures } from '../feature'
import { predict } from '../predict'

export const tokenize = (text: string) => {
  return predict(getFeatures(text))
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
