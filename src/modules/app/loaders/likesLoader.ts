import { makeLoader } from 'react-router-typesafe'
import { likesQuery } from '../queries/index'
import { queryClient } from '@/core'
import { requireProtected } from './requireProtected'

export const likesLoader = makeLoader(
  async () => {
    await requireProtected()

    return queryClient.fetchQuery(likesQuery())
  }
)
