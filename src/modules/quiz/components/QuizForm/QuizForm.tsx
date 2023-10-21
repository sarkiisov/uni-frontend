import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button, List, Text, Stack, Group
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
      [QuestionType.SINGLE1]: [],
      [QuestionType.SINGLE2]: [],
      [QuestionType.SIGNLE3]: [],
      [QuestionType.TWO_TRACK]: []
    }

    data.forEach((item) => {
      const questionType: QuestionType = item.text2
        ? QuestionType.TWO_TRACK
        : QuestionType.SINGLE

      if (questionType === QuestionType.SINGLE && item.id >= 70 && item.id <= 77) {
        questions[QuestionType.SINGLE1].push(item)
      } else if (questionType === QuestionType.SINGLE && item.id >= 78 && item.id <= 85) {
        questions[QuestionType.SINGLE2].push(item)
      } else if (questionType === QuestionType.SINGLE && item.id >= 86 && item.id <= 93) {
        questions[QuestionType.SIGNLE3].push(item)
      } else {
        questions[questionType].push(item)
      }
    })

    return questions
  }, [data])

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
