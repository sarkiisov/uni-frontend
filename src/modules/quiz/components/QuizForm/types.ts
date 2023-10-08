import { z } from 'zod'
import { Question } from '../../types'

export const QuizFormSchema = z.record(z.number({ invalid_type_error: 'Вопрос обязателен для заполнения' }))

export type QuizFormFields = z.infer<typeof QuizFormSchema>

export type QuizFormProps = {
  data: Question[]
  onSubmit: (data: QuizFormFields) => Promise<void>
}
