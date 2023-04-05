import type { FastifyPluginAsync } from 'fastify'
import {
  handleRedirect,
  handleCreateLink
} from '../controllers'

export const linkRoute: FastifyPluginAsync = async (app): Promise<void> => {
  app.get('/:shortenKey', handleRedirect)
  app.post('/links', handleCreateLink)
}

export default linkRoute
