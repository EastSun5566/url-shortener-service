import { getRequest } from './request'

interface CreateLinkData {
  originalUrl: string
}

interface LinkResponse {
  shortenUrl: string
}

export async function createLink (data: CreateLinkData) {
  return await getRequest().post<LinkResponse>('/links', data)
}

export async function getLink () {
  return await getRequest().get<LinkResponse[]>('/links')
}
