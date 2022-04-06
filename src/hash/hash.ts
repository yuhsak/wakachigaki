import { crc32 } from './crc32'

export const hash = (nBuckets: number) => (text: string) =>
  (crc32(new TextEncoder().encode(text)) % nBuckets).toString(16).toLowerCase()
