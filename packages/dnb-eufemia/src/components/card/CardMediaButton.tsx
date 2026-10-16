import { useContext, useEffect, useRef, useState } from 'react'
import type { MouseEvent, RefObject } from 'react'
import { clsx } from 'clsx'
import Button from '../button/Button'
import type { ButtonProps } from '../button/Button'
import type { ButtonClickEvent } from '../button/types'
import Icon from '../icon/Icon'
import play from '../../icons/dnb/play'
import pause from '../../icons/dnb/pause'
import Context from '../../shared/Context'
import useMediaQuery from '../../shared/useMediaQuery'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type CardMediaButtonProps = Omit<
  ButtonProps,
  'href' | 'type' | 'icon' | 'transitionState' | 'onClick'
> & {
  /** Stable ref attached to the video element. Replacement elements are detected after commits. */
  videoRef: RefObject<HTMLVideoElement | null>
  /** Autoplay muted video unless reduced motion is enabled. Defaults to true. */
  autoPlay?: boolean
  /** Override the translated play label. */
  playTitle?: string
  /** Override the translated pause label. */
  pauseTitle?: string
  /** Runs before toggling playback. Return false to cancel. */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void | boolean
}

const playbackIcon = Icon.transition({
  play: (props) =>
    play({
      ...props,
      style: { ...props?.style, translate: '0.0625rem 0' },
    }),
  pause,
})

function CardMediaButton(props: CardMediaButtonProps) {
  const context = useContext(Context)
  const {
    videoRef,
    autoPlay = true,
    playTitle,
    pauseTitle,
    onClick,
    className,
    title,
    ...rest
  } = props
  const [playing, setPlaying] = useState(false)
  const allowMotion = useMediaQuery({
    query: '(prefers-reduced-motion: no-preference)',
  })
  const translations = context.getTranslation(props).Card
  const binding = useRef<{
    video: HTMLVideoElement | null
    allowMotion: boolean
    autoPlay: boolean
    cleanup: () => void
  }>(undefined)

  // Ref values change during commit, so inspect the element after every render.
  useEffect(() => {
    const video = videoRef.current
    const previous = binding.current
    if (
      previous?.video === video &&
      previous.allowMotion === allowMotion &&
      previous.autoPlay === autoPlay
    ) {
      return
    }
    previous?.cleanup()
    const events = ['play', 'pause', 'ended', 'emptied', 'error'] as const
    const update = () =>
      setPlaying(
        Boolean(video && !video.paused && !video.ended && !video.error)
      )
    events.forEach((event) => video?.addEventListener(event, update))
    binding.current = {
      video,
      allowMotion,
      autoPlay,
      cleanup: () => {
        events.forEach((event) =>
          video?.removeEventListener(event, update)
        )
      },
    }
    update()

    if (!video) {
      return
    }
    if (!allowMotion) {
      video.pause()
    } else if (autoPlay && video.muted) {
      // Autoplay may be blocked. Keep the manual control available.
      video.play().catch(() => undefined)
    }
  })

  useEffect(
    () => () => {
      binding.current?.cleanup()
      binding.current = undefined
    },
    []
  )

  return (
    <Button
      variant="tertiary"
      bounding
      title={
        title ??
        (playing
          ? (pauseTitle ?? translations.pauseTitle)
          : (playTitle ?? translations.playTitle))
      }
      space={0}
      {...rest}
      className={clsx('dnb-card__media-button', className)}
      type="button"
      icon={
        <Icon
          icon={playbackIcon}
          transitionState={playing ? 'pause' : 'play'}
          size="default"
          style={{ width: '1rem', height: '1rem' }}
        />
      }
      onClick={({ event }: ButtonClickEvent) => {
        if (
          onClick?.(event as MouseEvent<HTMLButtonElement>) === false ||
          event.defaultPrevented
        ) {
          return
        }
        const video = videoRef.current
        if (!video) {
          return
        }
        if (video.paused) {
          video.play().catch(() => undefined)
        } else {
          video.pause()
        }
      }}
    />
  )
}

withComponentMarkers(CardMediaButton, { _supportsSpacingProps: true })

export default CardMediaButton
