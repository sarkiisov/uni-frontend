import { makeLoader, redirect } from 'react-router-typesafe'
import { AuthUser, UserStatus } from '../types/user'
import { queryClient } from '@/core'
import { authUserQuery, userStatusQuery } from '../queries'

export const infoLoader = makeLoader(async () => {
  try {
    const userStatus = (
      queryClient.getQueryData(userStatusQuery().queryKey) ??
      await queryClient.fetchQuery(userStatusQuery())) as UserStatus

    if (userStatus.hasInfo) {
      return redirect('/quiz')
    }

    (queryClient.getQueryData(authUserQuery().queryKey) ??
    await queryClient.fetchQuery(authUserQuery())) as AuthUser

    return null
  } catch (error) {
    return redirect('/login')
  }
})

export const appLoader = makeLoader(async () => {
  try {
    const userStatus = (
      queryClient.getQueryData(userStatusQuery().queryKey) ??
      await queryClient.fetchQuery(userStatusQuery())) as UserStatus

    if (!userStatus.hasTest) {
      return redirect('/quiz')
    }
    if (!userStatus.hasInfo) {
      return redirect('/info')
    }

    return null
  } catch (error) {
    return redirect('/login')
  }
})
