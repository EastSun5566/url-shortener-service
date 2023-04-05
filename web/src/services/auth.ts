import { getRequest } from './request'

interface AuthData {
  email: string
  password: string
}

interface AuthResponse {
  token: string
}

export async function register (data: AuthData) {
  return await getRequest().post<AuthResponse>('/register', data)
}

export async function login (data: AuthData) {
  return await getRequest().post<AuthResponse>('/login', data)
}
