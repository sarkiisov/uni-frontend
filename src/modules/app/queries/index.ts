import { DefaultQueryKey } from '@/core'

export const recommendationQuery = () => ({
  queryKey: ['connection/user/recommendation'] as DefaultQueryKey
})

export const likesQuery = () => ({
  queryKey: ['connection/user/likes'] as DefaultQueryKey
})

export const matchesQuery = () => ({
  queryKey: ['connection/user/matches'] as DefaultQueryKey
})
