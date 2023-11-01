import { useMemo } from 'react'
import { User } from '@/modules/auth/types'

export const useUserAvatars = (user?: User) => {
  if (!user) return []
  const avatars = useMemo(() => user?.imageLinks.slice(0).reverse().map((image) => ({
    id: image.id,
    src: `/api/downloadfile/${image.link}`
  })) ?? [], [user])

  return avatars
}
