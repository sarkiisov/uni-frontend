import { makeLoader } from 'react-router-typesafe'
import { likesQuery } from '../queries/index'
import { queryClient } from '@/core'

export const likesLoader = makeLoader(
  async () => queryClient.fetchQuery(likesQuery())
)
