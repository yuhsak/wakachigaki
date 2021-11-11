export type NgramHashWeightKey =
  | 'UH1'
  | 'UH2'
  | 'UH3'
  | 'UH4'
  | 'UH5'
  | 'UH6'
  | 'UH7'
  | 'UH8'
  | 'UH9'
  | 'UH10'
  | 'UH11'
  | 'UH12'
  | 'UH13'
  | 'BH1'
  | 'BH2'
  | 'BH3'
  | 'BH4'
  | 'BH5'
  | 'BH6'
  | 'BH7'
  | 'BH8'
  | 'BH9'
  | 'BH10'
  | 'BH11'
  | 'BH12'
  | 'TH1'
  | 'TH2'
  | 'TH3'
  | 'TH4'
  | 'TH5'
  | 'TH6'
  | 'TH7'
  | 'TH8'
  | 'TH9'
  | 'TH10'
  | 'TH11'

export type NgramTypeWeightKey =
  | 'UT1'
  | 'UT2'
  | 'UT3'
  | 'UT4'
  | 'UT5'
  | 'UT6'
  | 'UT7'
  | 'UT8'
  | 'UT9'
  | 'UT10'
  | 'UT11'
  | 'UT12'
  | 'UT13'
  | 'BT1'
  | 'BT2'
  | 'BT3'
  | 'BT4'
  | 'BT5'
  | 'BT6'
  | 'BT7'
  | 'BT8'
  | 'BT9'
  | 'BT10'
  | 'BT11'
  | 'BT12'
  | 'TT1'
  | 'TT2'
  | 'TT3'
  | 'TT4'
  | 'TT5'
  | 'TT6'
  | 'TT7'
  | 'TT8'
  | 'TT9'
  | 'TT10'
  | 'TT11'

export type NgramDistanceWeightKey = 'distance'

export type Hash = number
export type Type = string

export type Model = {
  version: string
  threshold: number
  bias: number
  weight: {
    hash: Record<NgramHashWeightKey, Record<Hash, number>>
    type: Record<NgramTypeWeightKey, Record<Type, number>>
    distance: number
  }
}
