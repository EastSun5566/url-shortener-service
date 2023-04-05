import type { FastifyReply, FastifyRequest } from 'fastify'
import { createShortenKey, getDbClient, setLinkCache } from '../services'
export async function handleRedirect (request: FastifyRequest, reply: FastifyReply) {
  // TODO: Implement redirect
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

  reply.status(201)
}
