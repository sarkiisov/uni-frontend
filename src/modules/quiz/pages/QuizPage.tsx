import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Box, Transition } from '@mantine/core'
import { QuizForm } from '../components'
import { questionsQuery } from '@/modules/quiz/queries'
import { Question } from '../types/question'
import { saveQuiz } from '../api/quiz'
import { showNotification, getErrorMessage } from '@/utils'
import { QUIZ_ERRORS } from '../utils'
import { QuizFormFields } from '../components/QuizForm/types'
import { queryClient } from '@/core'
import { userStatusQuery } from '@/modules/auth/queries'

export const QuizPage = () => {
  const { data } = useQuery<Question[]>(questionsQuery())

  const navigate = useNavigate()

  const saveQuizMutation = useMutation({
    mutationFn: saveQuiz,
    onError: (error: Error) => {
      showNotification({
        message: getErrorMessage(error, QUIZ_ERRORS),
        type: 'ERROR'
      })
    },
    onSuccess: () => {
      showNotification({
        message: 'Когнитивный тест сохранен',
        type: 'SUCCESS'
      })

      queryClient.removeQueries({
        queryKey: userStatusQuery().queryKey
      })

      navigate('/quiz')
    }
  })

  const handleSubmit = async (data: QuizFormFields) => {
    await saveQuizMutation.mutateAsync(data)
  }

  const [opened, setOpened] = useState(false)

  useEffect(() => {
    setOpened(true)
  }, [])

  return (
    <Transition mounted={opened} transition="fade" duration={400}>
      {(transitionStyle) => (
        <Box
          mih={1000}
          style={{ ...transitionStyle, zIndex: 1 }}
        >
          <QuizForm onSubmit={handleSubmit} data={data ?? []} />
        </Box>
      )}
    </Transition>
  )
}
