import { Box, Stack } from '@mantine/core'
import { AuthTabs, RegisterForm } from '../components'
import { RegisterFormFields } from '../components/RegisterForm/types'

export const RegisterPage = () => {
  const handleSubmit = async (data: RegisterFormFields) => {}

  return (
    <Stack>
      <AuthTabs />
      <Box p="xl" pt="md">
        <RegisterForm onSubmit={handleSubmit} />
      </Box>
    </Stack>
  )
}
