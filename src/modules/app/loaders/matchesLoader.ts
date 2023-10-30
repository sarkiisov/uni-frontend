import { makeLoader } from 'react-router-typesafe'
import { queryClient } from '@/core'
import { matchesQuery } from '../queries'

export const matchesLoader = makeLoader(
  async () => queryClient.fetchQuery(matchesQuery())
)
