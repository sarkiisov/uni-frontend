import dayjs from 'dayjs'
import { DefaultValues } from 'react-hook-form'
import { z } from 'zod'

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export const InfoFormSchema = z.object({
  name: z.string().min(1, { message: 'Имя обязательно для заполнения' }),
  showGenders: z
    .array(z.nativeEnum(Gender))
    .min(1, { message: 'Должна быть выбрана хотя бы одна опция' }),
  description: z.string(),
  tgAccount: z
    .string()
    .min(1, { message: 'Telegram аккаунт обязателен для заполнения' }),
  birthday: z
    .date({
      errorMap: () => ({ message: 'Дата рождения обязательня для заполнения' })
    })
    .max(dayjs().subtract(18, 'years').toDate(), {
      message: 'Вам должно быть боль 18 лет'
    })
    .min(dayjs('1900-01-01').toDate(), { message: 'Дата имеет неверный формат' }),
  gender: z.nativeEnum(Gender)
})

export type InfoFormFields = z.infer<typeof InfoFormSchema>

export type InfoFormProps = {
  defaultValues?: DefaultValues<InfoFormFields>
  onSubmit: (data: InfoFormFields) => Promise<void>
}
