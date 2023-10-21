import { RouteObject } from 'react-router-dom'
import { LoginPage, RegisterPage, UserInfoPage } from '../pages'
import { authLoader, infoLoader } from '../loaders'
import { AuthLayout, InfoLayout } from '@/layouts'

export const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    loader: authLoader,
    children: [
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      }
    ]
  },
  {
    element: <InfoLayout />,
    loader: infoLoader,
    children: [
      {
        path: '/info',
        element: <UserInfoPage />
      }
    ]
  }
]
