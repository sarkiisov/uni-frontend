const STORAGE_TOKEN_KEY = 'token'

export const setToken = (token?: string) => {
  if (token) {
    localStorage.setItem(STORAGE_TOKEN_KEY, token)
  } else {
    localStorage.removeItem(STORAGE_TOKEN_KEY)
  }
}

export const getToken = () => localStorage.getItem(STORAGE_TOKEN_KEY) ?? ''
