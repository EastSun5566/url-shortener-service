import { getRequest } from './request'

interface CreateLinkData {
  originalUrl: string
}

export async function createLink (data: CreateLinkData) {
  return await getRequest().post<{ shortenUrl: string }>('/links', data)
}
