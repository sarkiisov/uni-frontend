import { Alert, Box, Stack } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthTabs, RegisterForm } from '../components'
import { RegisterFormFields } from '../components/RegisterForm/types'
import { register } from '../api/register'
import { setToken } from '../store'
import { REGISTER_ERRORS } from '../utils/consts'
import { showNotification, getErrorMessage } from '@/utils'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>()

  const registerMutation = useMutation({
    mutationFn: register,
    onError: (error: Error) => {
      setError(getErrorMessage(error, REGISTER_ERRORS))
    },
    onSuccess: ({ token }) => {
      showNotification({
        message: 'Добро пожаловать',
        type: 'SUCCESS'
      })

      setError(null)
      setToken(token)

      navigate('/info')
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
      <Box p="lg" pt="md">
        {error && <Alert mb="md" variant="filled" color="red">{error}</Alert>}
        <RegisterForm onSubmit={handleSubmit} />
      </Box>
    </Stack>
  )
}
