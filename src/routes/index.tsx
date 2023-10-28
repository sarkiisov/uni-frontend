import { RouteObject, redirect } from 'react-router-dom'
import { quizRoutes } from '@/modules/quiz/routes'
import { authRoutes } from '@/modules/auth/routes'
import { appRoutes } from '@/modules/app/routes'

export const routes: RouteObject[] = [
  {
    path: '/',
    loader: () => redirect('/login')
  },
  {
    children: quizRoutes
  },
  {
    children: authRoutes
  },
  {
    children: appRoutes
  }
]
