import axios, { type AxiosInstance } from 'axios'

let request: AxiosInstance | null = null
export function getRequest () {
  if (request) return request

  request = axios.create({
    baseURL: 'http://localhost:8080'
  })

  // request interceptor
  request.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = 'Bearer ' + token
      }

      return config
    }
  )

  return request
}
