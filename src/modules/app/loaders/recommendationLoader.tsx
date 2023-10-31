import { makeLoader } from 'react-router-typesafe'
import { queryClient } from '@/core'
import { recommendationQuery } from '../queries'
import { requireProtected } from './requireProtected'

export const recommendationLoader = makeLoader(
  async () => {
    await requireProtected()

    return queryClient.getQueryData(recommendationQuery().queryKey) ??
    await queryClient.fetchQuery(recommendationQuery())
  }
)
