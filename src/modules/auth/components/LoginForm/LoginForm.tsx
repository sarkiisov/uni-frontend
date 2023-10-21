import { Button, Stack } from '@mantine/core'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordInput, TextInput } from '@/libs/react-hook-form'
import { LoginFormFields, LoginFormProps, LoginFormSchema } from './types'

export const LoginForm = ({
  onSubmit
}: LoginFormProps) => {
  const form = useForm<LoginFormFields>({
    defaultValues: {
      login: '',
      password: ''
    },
    resolver: zodResolver(LoginFormSchema)
  })

  const submitHandler: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      await onSubmit(data)
    } catch {
      form.reset(form.getValues())
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <Stack gap="lg">
          <TextInput name="login" label="Логин" autoComplete="username" withAsterisk />
          <PasswordInput
            name="password"
            label="Пароль"
            autoComplete="current-password"
            withAsterisk
          />
          <Button
            fullWidth
            size="md"
            fz="sm"
            type="submit"
            loading={form.formState.isSubmitting}
          >
            Войти
          </Button>
        </Stack>

      </form>
    </FormProvider>
  )
}
