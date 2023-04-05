import { createClient, type RedisClientType } from 'redis'

import { config } from '../config'

let client: RedisClientType | null = null
export async function getCacheClient () {
  if (client != null) return client

  client = createClient({
    socket: {
      host: config.cache.host,
      port: config.cache.port
    }
  })
  client.on('error', error => { console.error('Redis Client Error', error) })

  await client.connect()

  return client
}
