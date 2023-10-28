import { Image, Input } from '@mantine/core'
import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel'
import {
  useCallback, useEffect, useState
} from 'react'
import { AvatarCarouselProps } from './types'

export const AvatarCarousel = ({
  avatars,
  initialSlideIndex,
  children,
  ...props
}: AvatarCarouselProps) => {
  const TRANSITION_DURATION = 200

  const [embla, setEmbla] = useState<Embla | null>(null)
  const [slideIndex, setSlideIndex] = useState(initialSlideIndex ?? 0)

  const updateSlideIndex = useCallback((embla: Embla) => {
    setSlideIndex(embla.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (embla) {
      embla.on('select', updateSlideIndex)
      embla.on('reInit', updateSlideIndex)
    }

    return () => {
      if (embla) {
        embla.off('select', updateSlideIndex)
        embla.off('reInit', updateSlideIndex)
      }
    }
  }, [embla, updateSlideIndex])

  useAnimationOffsetEffect(embla, TRANSITION_DURATION)

  return (
    <>
      <Input type="hidden" data-autofocus />
      <Carousel
        initialSlide={initialSlideIndex}
        getEmblaApi={setEmbla}
        withIndicators
        pos="relative"
        loop
        {...props}
      >
        {avatars.map((avatar) => (
          <Carousel.Slide key={avatar.id}>
            <Image src={avatar.src} />
          </Carousel.Slide>
        ))}
      </Carousel>
      {(children)
        ? children(avatars[slideIndex], slideIndex)
        : null}
    </>
  )
}
