import { DefaultQueryKey } from '@/core'

export const refreshQuery = () => ({
  queryKey: ['auth/refresh'] as DefaultQueryKey,
  retry: 0
})

export const authUserQuery = () => ({
  queryKey: ['auth/user'] as DefaultQueryKey
})

export const userQuery = () => ({
  queryKey: ['user'] as DefaultQueryKey
})

export const userStatusQuery = () => ({
  queryKey: ['user/status'] as DefaultQueryKey
})
