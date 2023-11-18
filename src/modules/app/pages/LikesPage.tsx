/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  ActionIcon, Badge, Box, SimpleGrid, Stack, Group, Text
} from '@mantine/core'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  HeartHandshake, Link, X
} from 'lucide-react'
import { useState } from 'react'
import Confetti from 'react-confetti/dist/types/Confetti'
import { likesQuery } from '../queries'
import { Connection } from '../types'
import { UserCard } from '../components'
import { likeConnection } from '../api/likeConnection'
import { queryClient } from '@/core'
import { showNotification, getErrorMessage } from '@/utils'
import { LIKE_CONNECTION_ERRORS } from '../utils'
import { SizedConfetti } from '@/components'

export const LikesPage = () => {
  const [showConfetti, setShowConfetti] = useState(false)

  const handleConfettiComplate = (confetti?: Confetti) => {
    setShowConfetti(false)

    confetti?.reset()
  }

  const likeConnectionMutation = useMutation({
    mutationFn: likeConnection,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: likesQuery().queryKey
      })

      if (variables.like) {
        setShowConfetti(true)
      }
    },
    onError: (error: Error) => {
      showNotification({
        message: getErrorMessage(error, LIKE_CONNECTION_ERRORS),
        type: 'ERROR'
      })
    }
  })

  const { data } = useQuery<Connection[]>(likesQuery())

  const handleButtonClick = (data: { uniConnectionId: number; like: boolean }) => {
    likeConnectionMutation.mutate(data)
  }

  return (
    <Stack>
      <SizedConfetti
        style={{ pointerEvents: 'none' }}
        numberOfPieces={showConfetti ? 200 : 0}
        gravity={0.2}
        recycle={false}
        onConfettiComplete={handleConfettiComplate}
      />
      {data?.length
        ? (
          <SimpleGrid cols={3}>
            {data.map((connection) => {
              const user = connection?.user2

              const predictedPercent = Math.round((connection?.probPredicted ?? 0) * 100)

              return (
                <UserCard
                  key={user.id}
                  user={user}
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
