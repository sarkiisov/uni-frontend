/* eslint-disable @typescript-eslint/no-unused-vars */
import { redirect } from 'react-router-dom'
import { makeLoader } from 'react-router-typesafe'
import { queryClient } from '@/core'
import { userQuery, userStatusQuery } from '@/modules/auth/queries'
import { User, UserStatus } from '@/modules/auth/types'

export const appLoader = makeLoader(async () => {
  try {
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

      const user = queryClient.getQueryData(userQuery().queryKey) ??
      await queryClient.fetchQuery(userQuery()) as User

      return null
    } catch (error) {
      return Promise.reject(error)
    }
  } catch (error) {
    return redirect('/login')
  }
})
