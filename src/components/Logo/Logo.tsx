import { Group } from '@mantine/core'
import { LogoProps } from './types'

import { ReactComponent as UniText } from '@/assets/uni-text.svg'
import { ReactComponent as UniFigure } from '@/assets/uni-figure.svg'

export const Logo = ({ withText }: LogoProps) => (
  <Group justify="center" gap="md">
    <UniFigure />
    {withText && <UniText />}
    <UniText />
  </Group>
)
