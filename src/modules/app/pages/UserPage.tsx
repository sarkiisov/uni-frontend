import { Box, Image, Modal } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { userQuery } from '@/modules/auth/queries'
import { User } from '@/modules/auth/types'
import { AvatarCarousel } from '../components'

export const UserPage = () => {
  const { data } = useQuery<User>(userQuery())

  const avatars = useMemo(() => data?.imageLinks.slice(0).reverse().map((image) => ({
    id: image.id,
    src: `/api/downloadfile/${image.link}`
  })) ?? [], [data])

  const hasAvatar = useMemo(() => Boolean(avatars.length ?? 0), [avatars])

  const [opened, { open, close }] = useDisclosure(false)

  return (
    <Box>
      <Modal
        opened={opened}
        padding={0}
        onClose={close}
        withCloseButton={false}
        size={650}
        radius={0}
      >
        <AvatarCarousel avatars={avatars} />
      </Modal>
      {hasAvatar && (
        <Image src={avatars[0].src} onClick={open} w={300} h={300} fit="cover" />
      )}
    </Box>
  )
}
