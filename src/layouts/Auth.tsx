import { Card, Center, Stack } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { Logo } from '@/components'

export const AuthLayout = () => (
  <Center h="100vh">
    <Stack gap="xl">
      <Logo />
      <Card withBorder w="26rem" padding={0} radius="sm" shadow="xs">
        <Outlet />
      </Card>
    </Stack>
  </Center>
)
