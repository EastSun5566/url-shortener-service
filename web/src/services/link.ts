import { getRequest } from './request'

export async function createLink (originalUrl: string) {
  return await getRequest().post<{ shortenUrl: string }>('/links', {
    originalUrl
  })
}
