import type { FastifyPluginAsync } from 'fastify'
import { handleLogin, handleRegister } from '../controllers'

export const userRoute: FastifyPluginAsync = async (app): Promise<void> => {
  app.post('/register', handleRegister)
  app.post('/login', handleLogin)
}

export default userRoute
