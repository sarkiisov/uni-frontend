import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './routes'

const router = createBrowserRouter(routes)

export const AppRouter = () => <RouterProvider router={router} />
