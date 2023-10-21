import { makeLoader, redirect } from 'react-router-typesafe'
import { queryClient } from '@/core'
import { questionsQuery } from '../queries'
import { userStatusQuery } from '@/modules/auth/queries'
import { UserStatus } from '@/modules/auth/types'

export const quizPageLoader = makeLoader(async () => {
  try {
    const userStatus = (
      queryClient.getQueryData(userStatusQuery().queryKey) ??
      await queryClient.fetchQuery(userStatusQuery())) as UserStatus

    if (userStatus.hasTest) {
      return redirect('/app')
    }
    if (!userStatus.hasInfo) {
      return redirect('/info')
    }

    const query = questionsQuery()

    return (
      queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))
    )
  } catch (error) {
    return redirect('/login')
  }
})
