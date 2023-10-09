import { z } from 'zod'

export const RegisterFromSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Логин должен быть больше 3 символов' })
    .max(8, { message: 'Логин должен быть короче 8 символов' }),
  password: z.string().min(8, { message: 'Пароль болжен быть больште 8 символов' }),
  repeatPassword: z.string()
}).refine(({ password, repeatPassword }) => password === repeatPassword, {
  path: ['repeatPassword'],
  message: 'Пароли должны совпадать'
})

export type RegisterFormFields = z.infer<typeof RegisterFromSchema>

export type RegisterFormProps = {
  onSubmit: (data: RegisterFormFields) => Promise<void>
}
