import { Alert, Box, Stack } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { showNotification } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
import { AuthTabs } from '../components'
import { login } from '../api/login'
import { LoginFormFields } from '../components/LoginForm/types'
import { setToken } from '../store'
import { getErrorMessage } from '@/utils/error'
import { LOGIN_ERRORS } from '../utils/consts'

export const LoginPage = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>()

  const loginMutation = useMutation({
    mutationFn: login,
    onError: (error: Error) => {
      setError(getErrorMessage(LOGIN_ERRORS, error))
    },
    onSuccess: ({ token }) => {
      showNotification({
        message: 'Добро пожаловать'
      })

      setError(null)
      setToken(token)

      navigate('/info')
    }
  })

  const handleSubmit = async (data: LoginFormFields) => {
    await loginMutation.mutateAsync(data)
  }

  return (
    <Stack>
      <AuthTabs />
      <Box p="lg">
        {error && <Alert mb="md" color="red">{error}</Alert>}
        <LoginForm onSubmit={handleSubmit} />
      </Box>
    </Stack>
  )
}
