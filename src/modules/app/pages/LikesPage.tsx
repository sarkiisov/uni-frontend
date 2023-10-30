/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  ActionIcon, Badge, Box, SimpleGrid, Stack, Group, Text
} from '@mantine/core'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  HeartHandshake, Link, X
} from 'lucide-react'
import { showNotification } from '@mantine/notifications'
import { likesQuery } from '../queries'
import { Connection } from '../types'
import { UserCard } from '../components'
import { likeConnection } from '../api/likeConnection'
import { queryClient } from '@/core'
import { getErrorMessage } from '@/utils/error'
import { LIKE_CONNECTION_ERRORS } from '../utils'

export const LikesPage = () => {
  const likeConnectionMutation = useMutation({
    mutationFn: likeConnection,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: likesQuery().queryKey
      })
    },
    onError: (error: Error) => {
      showNotification({
        message: getErrorMessage(LIKE_CONNECTION_ERRORS, error)
      })
    }
  })

  const { data } = useQuery<Connection[]>(likesQuery())

  const handleButtonClick = (data: { uniConnectionId: number; like: boolean }) => {
    likeConnectionMutation.mutate(data)
  }

  return (
    <Stack>
      {data?.length
        ? (
          <SimpleGrid cols={3}>
            {data.map((connection) => {
              const predictedPercent = Math.round((connection?.probPredicted ?? 0) * 100)

              return (
                <UserCard
                  user={connection.user2}
                  nameProps={{ fz: 'lg' }}
                  actions={(
                    <Group mt="auto" pt="sm" justify="space-between">
                      <Box>
                        <Badge
                          size="lg"
                          h={36}
                          fw={500}
                          fz="md"
                          leftSection={<Link size="1rem" />}
                        >
                          {`${predictedPercent}%`}
                        </Badge>
                      </Box>
                      <Group>
                        <ActionIcon
                          onClick={() => handleButtonClick({
                            uniConnectionId: connection.id,
                            like: false
                          })}
                          color="gray"
                          size={36}
                          radius={18}
                          loading={
                              likeConnectionMutation.isLoading &&
                              likeConnectionMutation.variables?.uniConnectionId === connection.id
                            }
                        >
                          <X size={24} />
                        </ActionIcon>
                        <ActionIcon
                          onClick={() => handleButtonClick({
                            uniConnectionId: connection.id,
                            like: true
                          })}
                          size={36}
                          color="red"
                          radius={18}
                          loading={
                              likeConnectionMutation.isLoading &&
                              likeConnectionMutation.variables?.uniConnectionId === connection.id
                            }
                        >
                          <HeartHandshake size={24} />
                        </ActionIcon>
                      </Group>
                    </Group>
                    )}
                />
              )
            })}
          </SimpleGrid>
        )
        : <Text my="md" c="dimmed" ta="center">Здесь отображаются входящие запросы</Text>}
    </Stack>
  )
}
