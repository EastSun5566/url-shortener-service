import type { FastifyReply, FastifyRequest } from 'fastify'

import {
  createLink,
  createShortenKey,
  findLinkByShortenKey,
  findLinksByUserId,
  getLinkFromCache,
  setLinkFromCache,
  verifyToken
} from '../services'
export async function handleRedirect (
  request: FastifyRequest<{ Params: { shortenKey: string } }>,
  reply: FastifyReply
) {
  const { shortenKey } = request.params

  // 1. get from cache
  const originalUrl = await getLinkFromCache(shortenKey)
  if (originalUrl) {
    reply.redirect(originalUrl)
    return
  }

  // 2. get from database
  const link = await findLinkByShortenKey(shortenKey)
  if (!link) {
    reply.notFound('Link not found')
    return
  }

  // 3. add to cache
  await setLinkFromCache(shortenKey, link.original_url)

  reply.redirect(link.original_url)
}

export async function handleListLinks (
  request: FastifyRequest<{
    Headers: { authorization?: string }
  }>,
  reply: FastifyReply
) {
  // 1. check authorization
  const token = request.headers.authorization?.split(' ')[1]
  if (!token) {
    reply.unauthorized('Unauthorized')
    return
  }

  // 2. get links from database
  const links = await findLinksByUserId(verifyToken(token).id)

  reply.send(links.map((link) => ({
    ...link,
    shortenUrl: `http://${request.hostname}/${link.shorten_key}`
  })))
}

export async function handleCreateLink (
  request: FastifyRequest<{
    Headers: { authorization?: string }
    Body: { originalUrl: string }
  }>,
  reply: FastifyReply
) {
  const { originalUrl } = request.body

  // 1. validate originalUrl
  if (!originalUrl) {
    reply.badRequest('originalUrl is required')
    return
  }

  // 2. create shortenKey
  const shortenKey = await createShortenKey()

  // 3. insert into database
  const token = request.headers.authorization?.split(' ')[1]
  await createLink({
    originalUrl,
    shortenKey,
    ...(token && {
      userId: verifyToken(token).id
    })
  })

  // 4. add to cache
  await setLinkFromCache(shortenKey, originalUrl)

  reply.status(201).send({ shortenUrl: `http://${request.hostname}/${shortenKey}` })
}
