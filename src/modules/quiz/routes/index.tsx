import { RouteObject } from 'react-router-dom'
import { QuizPage } from '../pages'
import { quizPageLoader } from '../loaders'
import { InfoLayout } from '@/layouts'

export const quizRoutes: RouteObject[] = [
  {
    element: <InfoLayout />,
    children: [
      {
        path: '/quiz',
        element: <QuizPage />,
        loader: quizPageLoader
      }
    ]
  }
]
