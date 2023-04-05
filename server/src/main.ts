import createApp from 'fastify'
import cors from '@fastify/cors'
import sensible from '@fastify/sensible'

import {
  linkRoute,
  userRoute
} from './routes/'

export async function main (): Promise<void> {
  const app = createApp({
    logger: {
      transport: {
        target: 'pino-pretty'
      }
    }
  })

  await app.register(sensible)
  await app.register(cors)

  app.get('/', () => 'Welcome to the URL Shortener API')
  app.register(userRoute)
  app.register(linkRoute)

  try {
    await app.listen({
      host: process.env.HOST ?? 'localhost',
      port: +(process.env.PORT ?? 8080)
    })
  } catch (error: unknown) {
    app.log.error(error)
    process.exit(1)
  }
}

main()
