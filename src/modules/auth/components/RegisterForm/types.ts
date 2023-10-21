import { z } from 'zod'

export const RegisterFromSchema = z.object({
  login: z
    .string()
    .min(3, { message: 'Логин должен быть больше 3 символов' })
    .max(12, { message: 'Логин должен быть короче 12 символов' }),
  password: z.string().min(8, { message: 'Пароль болжен быть больше 8 символов' }),
  repeatPassword: z.string()
}).refine(({ password, repeatPassword }) => password === repeatPassword, {
  path: ['repeatPassword'],
  message: 'Пароли должны совпадать'
})

export type RegisterFormFields = z.infer<typeof RegisterFromSchema>

export type RegisterFormProps = {
  onSubmit: (data: RegisterFormFields) => Promise<void>
}
