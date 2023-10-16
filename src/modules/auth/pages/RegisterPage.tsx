import { Alert, Box, Stack } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { showNotification } from '@mantine/notifications'
import { AuthTabs, RegisterForm } from '../components'
import { RegisterFormFields } from '../components/RegisterForm/types'
import { register } from '../api/register'
import { setToken } from '../store'
import { REGISTER_ERRORS } from '../utils/consts'
import { getErrorMessage } from '@/utils/error'

export const RegisterPage = () => {
  const [error, setError] = useState<string | null>()

  const registerMutation = useMutation({
    mutationFn: register,
    onError: (error: Error) => {
      setError(getErrorMessage(REGISTER_ERRORS, error))
    },
    onSuccess: ({ token }) => {
      showNotification({
        message: 'Добро пожаловать'
      })
      setError(null)
      setToken(token)
    }
  })

  const handleSubmit = async (data: RegisterFormFields) => {
    await registerMutation.mutateAsync({
      login: data.login,
      password: data.password
    })
  }

  return (
    <Stack>
      <AuthTabs />
      <Box p="xl" pt="md">
        {error && <Alert mb="md" variant="filled" color="red">{error}</Alert>}
        <RegisterForm onSubmit={handleSubmit} />
      </Box>
    </Stack>
  )
}
