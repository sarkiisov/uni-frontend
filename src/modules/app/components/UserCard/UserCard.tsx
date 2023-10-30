import dayjs from 'dayjs'
import {
  Card, Stack, Image, Text
} from '@mantine/core'
import { useUserAvatars } from '../../hooks/useUserAvatars'
import { UserCardProps } from './types'
import { AvatarCarousel } from '..'

export const UserCard = ({ user, actions, nameProps }: UserCardProps) => {
  const age = dayjs().diff(dayjs(user?.birthday), 'year')

  const avatars = useUserAvatars(user)

  return (
    <Card>
      <Stack>
        {avatars.length
          ? <AvatarCarousel avatars={avatars} key={user?.id} />
          : <Image src="/src/assets/placeholder.webp" draggable={false} />}
        <Text fz="xl" c="blue" fw={500} {...nameProps}>{`${user?.name}, ${age}`}</Text>
        <Text lineClamp={2}>{user?.description}</Text>
      </Stack>
      {actions}
    </Card>
  )
}
