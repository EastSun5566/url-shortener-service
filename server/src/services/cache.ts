import { createClient, type RedisClientType } from 'redis'

let client: RedisClientType | null = null
export async function getCacheClient () {
  if (client != null) return client

  client = createClient()
  client.on('error', error => { console.error('Redis Client Error', error) })

  await client.connect()

  return client
}
