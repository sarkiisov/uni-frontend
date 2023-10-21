import { RouteObject, redirect } from 'react-router-dom'
import { quizRoutes } from '@/modules/quiz/routes'
import { authRoutes } from '@/modules/auth/routes'
import { appLoader } from '@/modules/auth/loaders'
import { Logout } from '@/components/Logout'

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
    path: '/app',
    loader: appLoader,
    element: <div><Logout />Тут будет приложение</div>
  }
]
