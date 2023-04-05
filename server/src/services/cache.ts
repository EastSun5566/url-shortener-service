import { createClient, type RedisClientType } from 'redis'
import { toBase62 } from '../utils'

let client: RedisClientType | null = null

export async function getCacheClient () {
  if (client != null) return client

  client = createClient()
  client.on('error', error => { console.error('Redis Client Error', error) })

  await client.connect()

  return client
}

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
