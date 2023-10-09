import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack } from '@mantine/core'
import { FormProvider, useForm } from 'react-hook-form'
import { RegisterFormFields, RegisterFormProps, RegisterFromSchema } from './types'
import { PasswordInput, TextInput } from '@/libs/react-hook-form'

export const RegisterForm = ({
  onSubmit
}: RegisterFormProps) => {
  const form = useForm<RegisterFormFields>({
    defaultValues: {
      name: '',
      password: '',
      repeatPassword: ''
    },
    resolver: zodResolver(RegisterFromSchema)
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack gap="lg">
          <TextInput name="name" label="Логин" autoComplete="username" withAsterisk />
          <PasswordInput
            name="password"
            label="Пароль"
            autoComplete="new-password"
            withAsterisk
          />
          <PasswordInput
            name="repeatPassword"
            label="Повторите пароль"
            autoComplete="new-password"
            withAsterisk
          />
          <Button mt="md" type="submit" loading={form.formState.isSubmitting}>Создать аккаунт</Button>
        </Stack>
      </form>
    </FormProvider>
  )
}
