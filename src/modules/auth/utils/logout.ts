import { setToken, setUser } from '../store'

export const logout = () => {
  setUser(undefined)
  setToken(undefined)
}
