import { RouteObject } from 'react-router-dom'
import { SettingsPage, UserPage } from '../pages'
import { appLoader } from '../loaders'

export const appRoutes: RouteObject[] = [
  {
    path: '/app',
    loader: appLoader,
    element: <UserPage />
  },
  {
    path: '/app/settings',
    element: <SettingsPage />
  }
]
