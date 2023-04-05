
import { getCacheClient } from './cache'
import { getDbClient } from './db'
import { toBase62 } from '../utils'

export async function createShortenKey () {
  const cache = await getCacheClient()

  const KEY = 'api:globalCounter'
  const count = await cache.incr(KEY)

  return toBase62(count)
}

const PREFIX_KEY = 'api:link'
export async function setLinkFromCache (shortenKey: string, originalUrl: string) {
  const cache = await getCacheClient()

  const key = `${PREFIX_KEY}:${shortenKey}`
  return await cache.set(key, originalUrl)
}

export async function getLinkFromCache (shortenKey: string) {
  const cache = await getCacheClient()

  const key = `${PREFIX_KEY}:${shortenKey}`
  return await cache.get(key)
}

export async function findLinkByShortenKey (shortenKey: string) {
  const db = await getDbClient()

  return await db.link.findUnique({
    where: { shorten_key: shortenKey }
  })
}

export async function findLinksByUserId (userId: number) {
  const db = await getDbClient()

  return await db.link.findMany({
    where: { userId }
  })
}

export async function createLink ({
  originalUrl,
  shortenKey,
  userId
}: {
  originalUrl: string
  shortenKey: string
  userId?: number
}) {
  const db = await getDbClient()

  return await db.link.create({
    data: {
      original_url: originalUrl,
      shorten_key: shortenKey,
      ...(userId && {
        user: {
          connect: { id: userId }
        }
      })
    }
  })
}
