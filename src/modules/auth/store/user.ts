import { User } from '../types'

const STORAGE_USER_KEY = 'user'

export const setUser = (user?: User) => {
  if (user) {
    sessionStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user))
  } else {
    sessionStorage.removeItem(STORAGE_USER_KEY)
  }
}

export const getUser = () => {
  const user = sessionStorage.getItem(STORAGE_USER_KEY)
  return user ? JSON.parse(user) : null
}
