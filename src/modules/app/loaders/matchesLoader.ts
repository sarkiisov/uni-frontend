import { makeLoader } from 'react-router-typesafe'
import { queryClient } from '@/core'
import { matchesQuery } from '../queries'
import { requireProtected } from './requireProtected'

export const matchesLoader = makeLoader(
  async () => {
    await requireProtected()

    return queryClient.fetchQuery(matchesQuery())
  }
)
