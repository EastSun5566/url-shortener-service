import type { FastifyReply, FastifyRequest } from 'fastify'
import { createShortenKey, getDbClient, getLinkCache, setLinkCache } from '../services'
export async function handleRedirect (request: FastifyRequest<{ Params: { shortenKey: string } }>, reply: FastifyReply) {
  const { shortenKey } = request.params

  // 1. get from cache
  const originalUrl = await getLinkCache(shortenKey)
  if (originalUrl != null) {
    reply.redirect(originalUrl)
    return
  }

  // 2. get from database
  const db = await getDbClient()
  const link = await db.link.findUnique({
    where: { shorten_key: shortenKey }
  })
  if (link === null) {
    reply.status(404).send({ error: 'Link not found' })
    return
  }

  // 3. add to cache
  await setLinkCache(shortenKey, link.original_url)

  reply.redirect(link.original_url)
}

export async function handleCreateLink (request: FastifyRequest<{ Body: { originalUrl: string } }>, reply: FastifyReply) {
  const { originalUrl } = request.body

  // 1. validate originalUrl
  if (originalUrl === '') {
    reply.status(400).send({ error: 'originalUrl is required' })
    return
  }

  // 2. create shortenKey
  const shortenKey = await createShortenKey()

  // 3. insert into database
  const db = await getDbClient()
  await db.link.create({
    data: {
      original_url: originalUrl,
      shorten_key: shortenKey
    }
  })

  // 4. add to cache
  await setLinkCache(shortenKey, originalUrl)

  reply.status(201).send({ shortenUrl: `http://localhost:8080/${shortenKey}` })
}
