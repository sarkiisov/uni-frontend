import { Question, QuestionType } from '../types'

export const prepareQuizResponse = (data: Question[]) => {
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
}
