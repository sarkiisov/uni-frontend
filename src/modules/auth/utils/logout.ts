import { queryClient } from '@/core'
import { setToken, setUser } from '../store'
import { authUserQuery, userQuery, userStatusQuery } from '../queries'

export const logout = () => {
  setUser(undefined)
  setToken(undefined)

  queryClient.removeQueries({
    queryKey: userQuery().queryKey
  })
  queryClient.removeQueries({
    queryKey: userStatusQuery().queryKey
  })
  queryClient.removeQueries({
    queryKey: authUserQuery().queryKey
  })
}
