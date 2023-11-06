import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button, List, Text, Stack, Group
} from '@mantine/core'
import { Virtuoso } from 'react-virtuoso'
import { useMemo } from 'react'
import { QuizAnswerInput } from '../QuizAnswerInput'
import { QuizFormFields, QuizFormProps, QuizFormSchema } from './types'
import { prepareQuizResponse } from '../../utils'

export const QuizForm = ({ data, onSubmit }: QuizFormProps) => {
  const questions = useMemo(() => prepareQuizResponse(data), [data])

  const defaultValues = useMemo(
    () => data?.reduce((acc, question) => {
      acc[question.id] = 3
      return acc
    }, {}),
    [data]
  )

  const form = useForm<QuizFormFields>({
    mode: 'onChange',
    resolver: zodResolver(QuizFormSchema),
    defaultValues
  })

  const submitHandler: SubmitHandler<QuizFormFields> = async (data) => {
    try {
      await onSubmit(data)
    } catch {
      form.reset(form.getValues())
    }
  }

  const { isValid, isSubmitting } = form.formState

  const isSubmitDisabled = !isValid
  const isSubmitLoading = isSubmitting

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <Stack>
          <Text c="blue" fz="lg">
            Вопросы c выбором между двумя утверждениями
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
          <Text c="blue" fz="lg">
            Вопросы с выбором близости одного утверждения
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
          <Text c="blue" fz="lg">
            Что может тебя удерживать в хорошем настроении?
          </Text>
          <Virtuoso
            useWindowScroll
            data={questions.SINGLE1}
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
          <Text c="blue" fz="lg">
            Что стоит за твоей ленью?
          </Text>
          <Virtuoso
            useWindowScroll
            data={questions.SINGLE2}
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
          <Text c="blue" fz="lg">
            В чём причина отсутствия настоящих друзей?
          </Text>
          <Virtuoso
            useWindowScroll
            data={questions.SINGLE3}
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
          <Group justify="end">
            <Button type="submit" disabled={isSubmitDisabled} loading={isSubmitLoading}>
              Сохранить
            </Button>
          </Group>
        </Stack>
      </form>
    </FormProvider>
  )
}
