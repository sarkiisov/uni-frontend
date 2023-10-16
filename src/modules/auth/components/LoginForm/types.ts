import { z } from 'zod'

export const LoginFormSchema = z.object({
  login: z.string().min(1, { message: 'Логин обязателен для заполнения' }),
  password: z.string().min(1, { message: 'Пароль обязателен для заполнения' })
})

export type LoginFormFields = z.infer<typeof LoginFormSchema>

export type LoginFormProps = {
  onSubmit: (data: LoginFormFields) => Promise<void>
}
