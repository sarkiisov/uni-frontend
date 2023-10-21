import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack } from '@mantine/core'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { RegisterFormFields, RegisterFormProps, RegisterFromSchema } from './types'
import { PasswordInput, TextInput } from '@/libs/react-hook-form'

export const RegisterForm = ({
  onSubmit
}: RegisterFormProps) => {
  const form = useForm<RegisterFormFields>({
    defaultValues: {
      login: '',
      password: '',
      repeatPassword: ''
    },
    resolver: zodResolver(RegisterFromSchema)
  })

  const handleSubmit: SubmitHandler<RegisterFormFields> = async (data) => {
    try {
      await onSubmit(data)
    } catch {
      form.reset(form.getValues())
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Stack gap="lg">
          <TextInput name="login" label="Логин" autoComplete="username" withAsterisk />
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
          <Button
            fullWidth
            size="md"
            fz="sm"
            type="submit"
            loading={form.formState.isSubmitting}
          >
            Создать аккаунт
          </Button>
        </Stack>
      </form>
    </FormProvider>
  )
}
