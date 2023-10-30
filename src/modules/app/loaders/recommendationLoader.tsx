import { makeLoader } from 'react-router-typesafe'
import { queryClient } from '@/core'
import { recommendationQuery } from '../queries'

export const recommendationLoader = makeLoader(
  async () => queryClient.getQueryData(recommendationQuery().queryKey) ??
  await queryClient.fetchQuery(recommendationQuery())
)
