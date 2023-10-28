import { BoxProps } from '@mantine/core'

type CarouselAvatar = {
  id: number
  src: string
}

export type AvatarCarouselProps = BoxProps & {
  avatars: CarouselAvatar[]
  initialSlideIndex?: number
  children?: (avatar: CarouselAvatar, index: number) => React.ReactNode
}
