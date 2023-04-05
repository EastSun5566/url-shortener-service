
import { getDbClient } from './db'

export async function findUserByEmail (email: string) {
  const db = await getDbClient()

  return await db.user.findUnique({
    where: { email }
  })
}

export async function createUser (email: string, password: string) {
  const db = await getDbClient()

  return await db.user.create({
    data: { email, password }
  })
}
