import { sign, verify, type JwtPayload } from 'jsonwebtoken'

interface TokenPayload {
  email: string
  id: number
}

export function signToken (payload: TokenPayload) {
  return sign(payload, process.env.JWT_SECRET ?? 'secret')
}

export function verifyToken (token: string) {
  return verify(token, process.env.JWT_SECRET ?? 'secret') as (TokenPayload & JwtPayload)
}
