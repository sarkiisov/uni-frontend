import { Card, Center } from '@mantine/core'
import { Outlet } from 'react-router-dom'

export const AuthLayout = () => (
  <Center h="100vh">
    <Card withBorder w="28rem" padding={0} radius="sm" shadow="xs">
      <Outlet />
    </Card>
  </Center>
)
