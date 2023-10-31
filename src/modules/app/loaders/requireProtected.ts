/* eslint-disable @typescript-eslint/no-throw-literal */
import { redirect } from 'react-router-dom'
import { queryClient } from '@/core'
import { userStatusQuery } from '@/modules/auth/queries'
import { UserStatus } from '@/modules/auth/types'

export const requireProtected = async () => {
  try {
    const userStatus = (
      queryClient.getQueryData(userStatusQuery().queryKey) ??
        await queryClient.fetchQuery(userStatusQuery())) as UserStatus

    if (!userStatus.hasTest) {
      throw redirect('/quiz')
    }
    if (!userStatus.hasInfo) {
      throw redirect('/info')
    }
  } catch (error) {
    throw redirect('/login')
  }
}
