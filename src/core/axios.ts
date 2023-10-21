import axios from 'axios'
import { getToken } from '@/modules/auth/store'
import { refreshAuthToken } from '@/modules/auth/utils'

export const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10 * 1000
})

axiosInstance.interceptors.request.use(async (config) => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosInstance.interceptors.response.use(async (config) => config, async (error) => {
  if (error === null) throw new Error('Unknown null error')
  if (axios.isAxiosError(error)) {
    const isAuthError = error.response?.status === 403 && error.config?.url !== 'auth/refresh'
    if (isAuthError) {
      try {
        const token = await refreshAuthToken()

        if (token) {
          const config = error.config!
          config.headers.Authorization = `Bearer ${token}`

          return await axiosInstance.request(config)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    }

    const message = (error.response?.data?.message as string ?? '') as string
    return Promise.reject(new Error(message))
  }
})
