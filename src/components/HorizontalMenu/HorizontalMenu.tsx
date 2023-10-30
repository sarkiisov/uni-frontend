import {
  Card, Flex, Group, ActionIcon
} from '@mantine/core'
import { useLocation, useNavigate } from 'react-router-dom'
import { HorizontalMenuProps } from './types'

export const HorizontalMenu = ({ items, ...props }: HorizontalMenuProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const isActiveItem = (path: string) => location.pathname.includes(path)

  return (
    <Flex justify="center" {...props}>
      <Card p={0}>
        <Group align="center" gap={0}>
          {items.map((item) => (
            <ActionIcon
              radius={0}
              w={80}
              variant={isActiveItem(item.to) ? 'light' : 'transparent'}
              key={item.to}
              size="48"
              onClick={() => navigate(item.to)}
            >
              <item.icon />
            </ActionIcon>
          ))}
        </Group>
      </Card>
    </Flex>
  )
}
