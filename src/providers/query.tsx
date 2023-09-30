import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/core'

export const QueryProvider = ({ children }: React.PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
)
