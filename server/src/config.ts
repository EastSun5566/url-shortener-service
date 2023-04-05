export const config = {
  server: {
    host: process.env.HOST ?? 'localhost',
    port: +(process.env.PORT ?? 8080)
  },
  cache: {
    host: process.env.CACHE_HOST ?? 'localhost',
    port: +(process.env.CACHE_PORT ?? 6379)
  },
  db: {
    host: process.env.DB_HOST ?? 'localhost',
    port: +(process.env.DB_PORT ?? 5432),
    name: process.env.DB_NAME ?? 'url_shortener',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
}
