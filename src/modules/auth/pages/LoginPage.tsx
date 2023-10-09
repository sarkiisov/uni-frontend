import { Alert, Box } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { useAtom } from 'jotai/react'
import { useState } from 'react'
import { showNotification } from '@mantine/notifications'
import { LoginForm } from '../components/LoginForm'
import { AuthTabs } from '../components'
import { login } from '../api/login'
import { LoginFormFields } from '../components/LoginForm/types'
import { tokenAtom } from '../store'

export const LoginPage = () => {
  const [error, setError] = useState<string | null>()
  const [token, setToken] = useAtom(tokenAtom)

  const loginMutation = useMutation({
    mutationFn: login,
    onError: (error: string) => {
      setError(error)
    },
    onSuccess: ({ token }) => {
      showNotification({
        message: 'Добро пожаловать'
      })
      setError(null)
      setToken(token)
    }
  })

  const handleSubmit = async (data: LoginFormFields) => {
    await loginMutation.mutateAsync(data)
  }

  return (
    <>
      <AuthTabs />
      <Box p="xl">
        {error && <Alert variant="filled" color="red">{error}</Alert>}
        <LoginForm onSubmit={handleSubmit} />
      </Box>
    </>
  )
}
