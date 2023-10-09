import { Tabs } from '@mantine/core'
import { useLocation, useNavigate } from 'react-router-dom'

export const AuthTabs = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleTabChange = (value: string) => {
    navigate(value)
  }

  return (
    <Tabs value={location.pathname} onChange={handleTabChange}>
      <Tabs.List grow h="3rem">
        <Tabs.Tab value="/login">Вход в аккаунт</Tabs.Tab>
        <Tabs.Tab value="/register">Создание аккаунта</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  )
}
