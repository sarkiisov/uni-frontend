import {
  Button, Group, Slider, Stack, Text
} from '@mantine/core'
import { useState } from 'react'
import { MarkConnectionProps } from './types'

export const MarkConnection = ({ loading, defaultValue, onSubmit }: MarkConnectionProps) => {
  const [value, setValue] = useState(defaultValue ?? 0)

  const handleButtonClick = () => {
    onSubmit(value)
  }

  const getPercentLabel = (value: number) => `${Math.round(value * 100)}%`

  return (
    <Stack mt="md">
      <Slider
        style={{ zIndex: 10000 }}
        min={0}
        max={1}
        step={0.01}
        value={value}
        onChange={setValue}
        label={getPercentLabel}
      />
      <Group justify="space-between" mt="md">
        <Text>Текущая оценка: {getPercentLabel(value)}</Text>
        <Button loading={loading} onClick={handleButtonClick}>Сохранить</Button>
      </Group>
    </Stack>
  )
}
