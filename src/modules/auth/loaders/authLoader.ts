import { makeLoader, redirect } from 'react-router-typesafe'
import { getToken } from '@/modules/auth/store'

export const authLoader = makeLoader(async () => {
  const token = getToken()

  if (token) {
    return redirect('/info')
  }

  return null
})
