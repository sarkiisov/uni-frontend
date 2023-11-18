/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  ActionIcon, Badge, Box, Group, Modal, SimpleGrid, Stack, Text, useMantineTheme
} from '@mantine/core'
import {
  Link, MessageCircle, Star
} from 'lucide-react'
import { useRef } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { showNotification, getErrorMessage } from '@/utils'
import { matchesQuery } from '../queries'
import { Connection } from '../types'
import { MarkConnection, UserCard } from '../components'
import { MARK_CONNECTION_ERRORS } from '../utils'
import { queryClient } from '@/core'
import { markConnection } from '../api/markConnection'

export const MatchesPage = () => {
  const { data } = useQuery<Connection[]>(matchesQuery())

  const [opened, { open, close }] = useDisclosure(false)

  const markConnectionMutation = useMutation({
    mutationFn: markConnection,
    onSuccess: () => {
      showNotification({
        message: 'Оценка сохранена',
        type: 'SUCCESS'
      })

      queryClient.invalidateQueries({
        queryKey: matchesQuery().queryKey
      })
    },
    onError: (error: Error) => {
      showNotification({
        message: getErrorMessage(error, MARK_CONNECTION_ERRORS),
        type: 'ERROR'
      })
    }
  })

  const markConnectionProb = useRef<number | null>(null)
  const markConnectionId = useRef<number | null>(null)

  const handleMarkButtonClick = ({ uniConnectionId, prob }: {
    uniConnectionId: number
    prob: number
  }) => {
    markConnectionId.current = uniConnectionId
    markConnectionProb.current = prob
    open()
  }

  const handleSaveButtonClick = async (prob: number) => {
    const uniConnectionId = markConnectionId.current
    if (!uniConnectionId || !prob) return
    await markConnectionMutation.mutateAsync({
      uniConnectionId,
      prob
    })

    close()
  }

  const theme = useMantineTheme()

  const handleTelegramButtonClick = (tgAccount: string) => {
    window.open(`https://t.me/${tgAccount}`, '_blank')?.focus()
  }

  return (
    <>
      <Modal title="Оценка пользователя" opened={opened} onClose={close}>
        <MarkConnection
          defaultValue={markConnectionProb.current ?? 0}
          loading={markConnectionMutation.isLoading}
          onSubmit={handleSaveButtonClick}
        />
      </Modal>
      <Stack>
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
                            onClick={() => handleMarkButtonClick({
                              uniConnectionId: connection.id,
                              prob: Number(connection.prob)
                            })}
                            disabled={!connection.markable}
                            color="yellow"
                            size={36}
                            radius={18}
                            loading={
                              markConnectionMutation.isLoading &&
                              markConnectionMutation.variables?.uniConnectionId === connection.id
                            }
                          >
                            <Star
                              fill={typeof connection.prob === 'number' ? theme.white : 'none'}
                              size={24}
                            />
                          </ActionIcon>
                          <ActionIcon
                            disabled={!user.tgAccount}
                            onClick={() => handleTelegramButtonClick(user.tgAccount)}
                            size={36}
                            color="blue"
                            radius={18}
                          >
                            <MessageCircle size={24} />
                          </ActionIcon>
                        </Group>
                      </Group>
                    )}
                  />
                )
              })}
            </SimpleGrid>
          )
          : <Text my="md" c="dimmed" ta="center">Здесь отображаются пары</Text>}
      </Stack>
    </>
  )
}
