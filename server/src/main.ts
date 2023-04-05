import createApp from 'fastify'
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

  app.register(sensible)

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
