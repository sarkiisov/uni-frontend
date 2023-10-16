import { queryClient } from '@/core'
import { refreshQuery } from '../queries'
import { setToken } from '../store'
import { logout } from './logout'

export const refreshAuthToken = async () => {
  try {
    const { token } = await queryClient.fetchQuery(refreshQuery()) as { token: string }
    setToken(token)

    return await Promise.resolve(token)
  } catch (error) {
    logout()

    return Promise.reject(error)
  }
}
