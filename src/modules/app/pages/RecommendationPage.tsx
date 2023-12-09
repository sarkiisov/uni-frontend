/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  ActionIcon, Badge, Box, Center, Group, Stack, Text
} from '@mantine/core'
import { X, Link, HeartHandshake } from 'lucide-react'
import { useState } from 'react'
import Confetti from 'react-confetti/dist/types/Confetti'
import { recommendationQuery } from '../queries'
import { Connection } from '../types'
import { UserCard } from '../components'
import { likeConnection } from '../api/likeConnection'
import { showNotification, getErrorMessage } from '@/utils'
import { LIKE_CONNECTION_ERRORS } from '../utils'
import { queryClient } from '@/core'
import { SizedConfetti } from '@/components'

export const RecomendationPage = () => {
  const [showConfetti, setShowConfetti] = useState(false)

  const handleConfettiComplete = (confetti?: Confetti) => {
    setShowConfetti(false)

    confetti?.reset()
  }

  const likeConnectionMutation = useMutation({
    mutationFn: likeConnection,
    onSuccess: (data) => {
      if (data.match) {
        setShowConfetti(true)
      }

      queryClient.invalidateQueries({
        queryKey: recommendationQuery().queryKey
      })
    },
    onError: (error: Error) => {
      showNotification({
        message: getErrorMessage(error, LIKE_CONNECTION_ERRORS),
        type: 'ERROR'
      })
    }
  })

  const { data } = useQuery<Connection>(recommendationQuery())

  const user = data?.user2

  const predictedPercent = Math.round((data?.probPredicted ?? 0) * 100)

  const handleButtonClick = (like: boolean) => {
    const uniConnectionId = data?.id
    if (!uniConnectionId) return
    likeConnectionMutation.mutate({
      uniConnectionId,
      like
    })
  }

  return (
    <>
      <SizedConfetti
        numberOfPieces={showConfetti ? 200 : 0}
        onConfettiComplete={handleConfettiComplete}
      />
      <Center>
        <Stack w={400} gap="md">
          {data
            ? (
              <>
                <UserCard user={user} />
                <Group m="0 auto" gap="lg">
                  <ActionIcon
                    onClick={() => handleButtonClick(false)}
                    color="gray"
                    size={48}
                    radius={24}
                    loading={likeConnectionMutation.isLoading}
                  >
                    <X size={32} />
                  </ActionIcon>
                  <Box>
                    <Badge
                      size="lg"
                      h={48}
                      fw={500}
                      fz="md"
                      leftSection={<Link size="1rem" />}
                    >
                      {`${predictedPercent}%`}
                    </Badge>
                  </Box>
                  <ActionIcon
                    onClick={() => handleButtonClick(true)}
                    size={48}
                    color="red"
                    radius={24}
                    loading={likeConnectionMutation.isLoading}
                  >
                    <HeartHandshake size={32} />
                  </ActionIcon>
                </Group>
              </>
            )
            : <Text my="md" c="dimmed" ta="center">На данный момент вы просмотрели все рекомендации</Text>}
        </Stack>
      </Center>
    </>
  )
}
