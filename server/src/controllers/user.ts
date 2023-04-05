import type { FastifyReply, FastifyRequest } from 'fastify'
import { hash } from 'bcrypt'

import { createUser, findUserByEmail } from '../services'

export async function handleRegister (
  request: FastifyRequest<{ Body: { email: string, password: string } }>,
  reply: FastifyReply
) {
  const { email, password } = request.body

  // 1. validate email and password
  if (!email || !password) {
    reply.badRequest('Email and password are required')
    return
  }

  // 2. check if email is already registered
  const user = await findUserByEmail(email)
  if (user) {
    reply.badRequest('Email is already registered')
    return
  }

  // 3. hash password
  const saltOrRounds = 10
  const hashedPassword = await hash(password, saltOrRounds)

  // 4. save user to database
  await createUser(email, hashedPassword)

  reply.send({ message: 'User created' })
}

export async function handleLogin (request: FastifyRequest, reply: FastifyReply) {
  // TODO: Implement
}
