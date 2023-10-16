import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box, Button, List, Text, Stack
} from '@mantine/core'
import { Virtuoso } from 'react-virtuoso'
import { useMemo } from 'react'
import { QuizAnswerInput } from '../QuizAnswerInput'
import { Question, QuestionType } from '../../types/question'
import { QuizFormFields, QuizFormProps, QuizFormSchema } from './types'

export const QuizForm = ({ data, onSubmit }: QuizFormProps) => {
  const questions = useMemo(() => {
    const questions: {
      [key in QuestionType]: Question[];
    } = {
      [QuestionType.SINGLE]: [],
      [QuestionType.TWO_TRACK]: []
    }

    data.forEach((item) => {
      const questionType: QuestionType = item.text2
        ? QuestionType.TWO_TRACK
        : QuestionType.SINGLE
      questions[questionType].push(item)
    })

    return questions
  }, [data])

  const defaultValues = useMemo(
    () => data?.reduce((acc, question) => {
      acc[question.id] = undefined
      return acc
    }, {}),
    [data]
  )

  const form = useForm<QuizFormFields>({
    mode: 'onChange',
    resolver: zodResolver(QuizFormSchema),
    defaultValues
  })

  const { isValid, isSubmitting } = form.formState

  const isSubmitDisabled = !isValid || isSubmitting

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack>
          <Text c="theme-colorful-blue" fz="xl">
            Описание вопросов одного вида
          </Text>
          <Virtuoso
            useWindowScroll
            data={questions.TWO_TRACK}
            itemContent={(index, question) => (
              <QuizAnswerInput
                key={question.id}
                name={String(question.id)}
                label={`Вопрос ${index + 1}`}
                radioCount={5}
                leftSection="1"
                rightSection="2"
                description={(
                  <List type="ordered">
                    <List.Item>{question.text}</List.Item>
                    <List.Item>{question.text2}</List.Item>
                  </List>
                )}
              />
            )}
          />
          <Text c="theme-colorful-blue" fz="lg">
            Описание вопросов другого вида
          </Text>
          <Virtuoso
            useWindowScroll
            data={questions.SINGLE}
            itemContent={(index, question) => (
              <QuizAnswerInput
                key={question.id}
                name={String(question.id)}
                label={`Вопрос ${index + 1}`}
                radioCount={4}
                leftSection="Да"
                rightSection="Нет"
                description={<Text>{question.text}</Text>}
              />
            )}
          />
          <Box>
            <Button type="submit" disabled={isSubmitDisabled}>
              Сохранить
            </Button>
          </Box>
        </Stack>
      </form>
    </FormProvider>
  )
}
