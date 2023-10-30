/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  ActionIcon, Badge, Box, Group, Modal, SimpleGrid, Stack, Text
} from '@mantine/core'
import {
  Link, MessageCircle, Star
} from 'lucide-react'
import { showNotification } from '@mantine/notifications'
import { useRef } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { matchesQuery } from '../queries'
import { Connection } from '../types'
import { MarkConnection, UserCard } from '../components'
import { getErrorMessage } from '@/utils/error'
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
        message: 'Оценка сохранена'
      })

      queryClient.invalidateQueries({
        queryKey: matchesQuery().queryKey
      })
    },
    onError: (error: Error) => {
      showNotification({
        message: getErrorMessage(MARK_CONNECTION_ERRORS, error)
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

  const handleTelegramButtonClick = (tgAccount: string) => {
    window.location.href = `https://t.me/${tgAccount}`
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
              {data.map((item) => {
                const user = item?.user2

                const predictedPercent = Math.round((item?.probPredicted ?? 0) * 100)

                return (
                  <UserCard
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
                              uniConnectionId: item.id,
                              prob: Number(item.prob)
                            })}
                            color="yellow"
                            size={36}
                            radius={18}
                            loading={
                              markConnectionMutation.isLoading &&
                              markConnectionMutation.variables?.uniConnectionId === item.id
                            }
                          >
                            <Star size={24} />
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
