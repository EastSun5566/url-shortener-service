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
