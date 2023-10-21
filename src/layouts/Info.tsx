import {
  ActionIcon, Card, Center, Group, Stack, Stepper, Text
} from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LogOut, User2 } from 'lucide-react'
import { authUserQuery } from '@/modules/auth/queries'
import { AuthUser } from '@/modules/auth/types'
import { logout } from '@/modules/auth/utils'

export const InfoLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const stepperRoutes = ['info', 'quiz']

  const activeRouteIndex = useMemo(
    () => stepperRoutes.findIndex(
      (route) => location.pathname.includes(route)
    ),
    [location]
  )

  const handleLogoutCLick = () => {
    logout()

    navigate('/login')
  }

  const { data } = useQuery<AuthUser>(authUserQuery())

  return (
    <Center>
      <Stack
        w="700"
        maw="700"
        miw="400"
      >
        <Group justify="space-between" pt="lg" pb="xl">
          <Group>
            {data && (
              <>
                <User2 size="1rem" />
                <Text fw={500}>{data?.userName}</Text>
              </>
            )}
          </Group>
          <ActionIcon onClick={handleLogoutCLick} variant="light">
            <LogOut size="1rem" />
          </ActionIcon>
        </Group>
        <Stepper active={activeRouteIndex}>
          <Stepper.Step label="Шаг 1" description="Персональная информация" />
          <Stepper.Step label="Шаг 2" description="Тест на когнитивные функции" />
        </Stepper>
        <Card
          withBorder
          p="lg"
          mb="xl"
          padding={0}
          radius="sm"
          shadow="xs"
        >
          <Outlet />
        </Card>
      </Stack>
    </Center>
  )
}
