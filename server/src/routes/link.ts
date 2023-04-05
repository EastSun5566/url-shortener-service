import type { FastifyPluginAsync } from 'fastify'
import {
  handleRedirect,
  handleCreateLink,
  handleListLinks
} from '../controllers'

export const linkRoute: FastifyPluginAsync = async (app): Promise<void> => {
  app.get('/links', handleListLinks)
  app.post('/links', handleCreateLink)
  app.get('/:shortenKey', handleRedirect)
}

export default linkRoute
