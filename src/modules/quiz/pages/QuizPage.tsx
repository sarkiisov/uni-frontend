import { Stepper } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { QuizForm } from '../components'
import { questionsQuery } from '@/modules/quiz/queries'
import { Question } from '../types/question'

export const QuizPage = () => {
  const { data } = useQuery<Question[]>(questionsQuery())

  const [activeStep, setActiveStep] = useState(0)

  const handleSubmit = async () => {}

  return (
    <>
      <Stepper active={activeStep} onStepClick={setActiveStep}>
        <Stepper.Step label="Шаг 1" />
        <Stepper.Step label="Шаг 2" />
      </Stepper>
      {activeStep === 0 && <QuizForm onSubmit={handleSubmit} data={data ?? []} />}
    </>
  )
}
