
import { getCacheClient } from './cache'
import { toBase62 } from '../utils'

export async function createShortenKey () {
  const cache = await getCacheClient()

  const KEY = 'api:globalCounter'
  const count = await cache.incr(KEY)

  return toBase62(count)
}

const PREFIX_KEY = 'api:link'
export async function setLinkCache (shortenKey: string, originalUrl: string) {
  const cache = await getCacheClient()

  const key = `${PREFIX_KEY}:${shortenKey}`
  return await cache.set(key, originalUrl)
}

export async function getLinkCache (shortenKey: string) {
  const cache = await getCacheClient()

  const key = `${PREFIX_KEY}:${shortenKey}`
  return await cache.get(key)
}
