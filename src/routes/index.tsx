import { RouteObject } from 'react-router-dom'
import { quizRoutes } from '@/modules/quiz/routes'
import { authRoutes } from '@/modules/auth/routes'
import { AuthLayout } from '@/layouts'

// TODO: fix layout
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <span>Hello</span>
  },
  {
    children: quizRoutes
  },
  {
    element: <AuthLayout />,
    children: authRoutes
  }
]
