import { RouteObject, redirect } from 'react-router-dom'
import {
  LikesPage, MatchesPage, SettingsPage
} from '../pages'
import {
  appLoader, likesLoader, matchesLoader, recommendationLoader
} from '../loaders'
import { RecomendationPage } from '../pages/RecommendationPage'
import { AppLayout } from '@/layouts/App'

export const appRoutes: RouteObject[] = [
  {
    path: '/app',
    loader: appLoader,
    element: <AppLayout />,
    children: [
      {
        index: true,
        loader: () => redirect('/app/recommendation')
      },
      {
        path: 'settings',
        element: <SettingsPage />
      },
      {
        path: 'recommendation',
        loader: recommendationLoader,
        element: <RecomendationPage />
      },
      {
        path: 'likes',
        loader: likesLoader,
        element: <LikesPage />
      },
      {
        path: 'matches',
        loader: matchesLoader,
        element: <MatchesPage />
      }
    ]
  }
]
