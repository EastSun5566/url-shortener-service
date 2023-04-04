import type { FastifyPluginAsync } from 'fastify'
import {
  redirect,
  createLink
} from '../controllers'

export const linkRoute: FastifyPluginAsync = async (app): Promise<void> => {
  app.get('/:shortenKey', redirect)
  app.post('/links', createLink)
}

export default linkRoute
