import { RouteObject } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../pages'

export const authRoutes: RouteObject[] = [
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  }
]
