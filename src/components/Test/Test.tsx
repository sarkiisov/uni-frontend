import { useQuery } from '@tanstack/react-query'

export const Test = () => {
  const { data } = useQuery(['questions'])

  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}
