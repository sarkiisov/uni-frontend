import { DefaultValues } from 'react-hook-form'
import { z } from 'zod'

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export const InfoFormSchema = z.object({
  name: z.string().min(1, { message: 'Имя обязательно для заполнения' }),
  // showMale: z.boolean(),
  // showFemale: z.boolean(),
  showGenders: z.array(z.nativeEnum(Gender)).min(1, { message: 'Должна быть выбрана хотя бы одна опция' }),
  description: z.string(),
  tgAccount: z.string().min(1, { message: 'Telegram аккаунт обязателен для заполнения' }),
  birthday: z.date({ errorMap: () => ({ message: 'Дата рождения обязательня для заполнения' }) }),
  gender: z.nativeEnum(Gender)
  // birthday
})

export type InfoFormFields = z.infer<typeof InfoFormSchema>

export type InfoFormProps = {
  defaultValues?: DefaultValues<InfoFormFields>
  onSubmit: (data: InfoFormFields) => Promise<void>
}
