import { QueryClient, QueryFunctionContext } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'
import { axiosInstance } from './axios'

const defaultQueryFn = ({ queryKey }: QueryFunctionContext) => {
  const [basePath, axiosRequestConfig = {}] = queryKey as [
    string,
    AxiosRequestConfig & { path?: string }
  ]

  const { path, ...axiosParams } = axiosRequestConfig

  try {
    const data = axiosInstance({
      url: `${basePath}${path ? (path.startsWith('/') ? path : `/${path}`) : ''}`,
      method: 'get',
      ...axiosParams
    })
    return Promise.resolve(data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      queryFn: defaultQueryFn
    },
    mutations: {
      retry: 0
    }
  }
})
