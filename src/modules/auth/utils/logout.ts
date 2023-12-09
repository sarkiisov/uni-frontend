import { queryClient } from '@/core'
import { setToken, setUser } from '../store'

export const logout = () => {
  setUser(undefined)
  setToken(undefined)

  queryClient.removeQueries()
}
