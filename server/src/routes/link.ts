import type { FastifyPluginAsync } from 'fastify'
import {
  handleRedirect,
  handleCreateLink
} from '../controllers'

export const linkRoute: FastifyPluginAsync = async (app): Promise<void> => {
  app.post('/links', handleCreateLink)
  app.get('/:shortenKey', handleRedirect)
}

export default linkRoute
