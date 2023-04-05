import { PrismaClient } from '@prisma/client'

let client: PrismaClient | null = null

export async function getDbClient () {
  if (client != null) return client

  client = new PrismaClient()

  return client
}
