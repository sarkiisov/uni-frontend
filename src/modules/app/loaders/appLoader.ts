import { makeLoader } from 'react-router-typesafe'
import { queryClient } from '@/core'
import { userQuery } from '@/modules/auth/queries'
import { User } from '@/modules/auth/types'
import { requireProtected } from './requireProtected'

export const appLoader = makeLoader(async () => {
  await requireProtected()

  return queryClient.getQueryData(userQuery().queryKey) ??
      await queryClient.fetchQuery(userQuery()) as User
})
