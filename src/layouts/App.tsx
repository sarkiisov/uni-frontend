import {
  HeartHandshake, Search, SmilePlus, User2
} from 'lucide-react'
import { Outlet } from 'react-router-dom'
import {
  Box,
  Center, Stack
} from '@mantine/core'
import { HorizontalMenu, Logo } from '@/components'
import { HorizontalMenuItem } from '@/components/HorizontalMenu/types'

const menuItems: HorizontalMenuItem[] = [
  {
    icon: Search,
    label: 'Рекомендации',
    to: '/app/recommendation'
  },
  {
    icon: SmilePlus,
    label: 'Запросы',
    to: '/app/likes'
  },
  {
    icon: HeartHandshake,
    label: 'Пары',
    to: '/app/matches'
  },
  {
    icon: User2,
    label: 'Настройки',
    to: '/app/settings'
  }
]

export const AppLayout = () => (
  <Center>
    <Stack mt="md">
      <Logo />
      <HorizontalMenu items={menuItems} my="lg" />
      <Box w={840}>
        <Outlet />
      </Box>
    </Stack>
  </Center>
)
