import { makeLoader } from 'react-router-typesafe'
import { requireProtected } from './requireProtected'
import { queryClient } from '@/core'
import { userQuery } from '@/modules/auth/queries'

export const settingsLoader = makeLoader(async () => {
  await requireProtected()

  return queryClient.getQueryData(userQuery().queryKey) ??
  await queryClient.fetchQuery(userQuery())
})
