import { Outlet, RouteObject } from 'react-router-dom'
import { quizRoutes } from '@/modules/quiz/routes'

// TODO: fix layout
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <span>Hello</span>
  },
  {
    element: (
      <div
        style={{
          width: '650px',
          margin: '0 auto',
          padding: '100px 0'
        }}
      >
        <Outlet />
      </div>),
    children: [
      ...quizRoutes
    ]
  }
]
