import { RouteObject } from 'react-router-dom'
import { QuizPage } from '../pages'
import { quizPageLoader } from '../loaders'

export const quizRoutes: RouteObject[] = [
  {
    path: '/quiz',
    element: <QuizPage />,
    loader: quizPageLoader
  }
]
