import { makeLoader } from 'react-router-typesafe'
import { queryClient } from '@/core'
import { questionsQuery } from '../queries'

export const quizPageLoader = makeLoader(async () => {
  const query = questionsQuery()

  return (
    queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
  )
})
