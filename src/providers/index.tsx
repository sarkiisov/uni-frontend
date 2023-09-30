import { MantineProvider } from './mantine'
import { QueryProvider } from './query'

export const RootProvider = ({ children }: React.PropsWithChildren) => (
  <QueryProvider>
    <MantineProvider>
      {children}
    </MantineProvider>
  </QueryProvider>
)
