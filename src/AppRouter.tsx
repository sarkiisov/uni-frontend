import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Test } from './components/Test/Test'

const router = createBrowserRouter([{
  path: '/',
  element: <Test />
}])

export const AppRouter = () => <RouterProvider router={router} />
