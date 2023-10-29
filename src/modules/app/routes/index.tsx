import { RouteObject } from 'react-router-dom'
import { SettingsPage, UserPage } from '../pages'
import { appLoader } from '../loaders'

export const appRoutes: RouteObject[] = [
  {
    path: '/app',
    loader: appLoader,
    children: [
      {
        index: true,
        element: <UserPage />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      }
    ]
  }
]
