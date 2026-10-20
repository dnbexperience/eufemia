import { useRef, useState } from 'react'
import { Button, Card, Flex, H2, P } from '@dnb/eufemia/src'
import ComponentBox from '../../../../shared/tags/ComponentBox'

export const ImageCard = () => (
  <ComponentBox hideCode data-visual-test="card-media-image">
    <Card.Info innerSpace={0}>
      <Flex.Horizontal
        layoutEngine="css"
        gap={false}
        align="stretch"
        style={{
          flexDirection: 'row-reverse',
          overflow: 'hidden',
          borderRadius: 'var(--rounded-corner)',
        }}
      >
        <Flex.Item grow shrink style={{ flexBasis: '18rem', minWidth: 0 }}>
          <img
            src="/media/card/savings.webp"
            alt=""
            width="688"
            height="408"
            loading="lazy"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              minHeight: '12.75rem',
              objectFit: 'cover',
            }}
          />
        </Flex.Item>
        <Flex.Item grow shrink style={{ flexBasis: '18rem', minWidth: 0 }}>
          <Flex.Stack
            layoutEngine="css"
            gap="small"
            justify="center"
            innerSpace={{
              small: 'small',
              medium: 'large',
              large: 'large',
            }}
            style={{ height: '100%' }}
          >
            <Flex.Stack gap="xx-small">
              <H2 size="large">Spar til noe uventet</H2>
              <P>Du vet aldri når du trenger litt ekstra penger.</P>
            </Flex.Stack>
            <Flex.Item alignSelf="flex-start">
              <Button href="#info-card-layout">Start sparing</Button>
            </Flex.Item>
          </Flex.Stack>
        </Flex.Item>
      </Flex.Horizontal>
    </Card.Info>
  </ComponentBox>
)

export const CenteredImageCard = () => (
  <ComponentBox hideCode data-visual-test="card-media-centered">
    <Card.Info innerSpace={0} gap={false} style={{ maxWidth: '21.5rem' }}>
      <img
        src="/media/card/savings.webp"
        alt=""
        width="688"
        height="408"
        loading="lazy"
        style={{
          display: 'block',
          width: '100%',
          height: '6.5rem',
          objectFit: 'cover',
          borderRadius: 'var(--rounded-corner) var(--rounded-corner) 0 0',
        }}
      />
      <Flex.Stack
        align="center"
        gap="small"
        innerSpace="small"
        style={{ textAlign: 'center' }}
      >
        <Flex.Stack gap="xx-small" align="center">
          <H2 size="large">Spar til noe uventet</H2>
          <P>Du vet aldri når du trenger litt ekstra penger.</P>
        </Flex.Stack>
        <Flex.Item alignSelf="center">
          <Button href="#info-card-layout">Start sparing</Button>
        </Flex.Item>
      </Flex.Stack>
    </Card.Info>
  </ComponentBox>
)

export const VideoCard = () => (
  <ComponentBox hideCode data-visual-test="card-media-video">
    {() => {
      const Example = () => {
        const videoRef = useRef<HTMLVideoElement>(null)
        const [failed, setFailed] = useState(false)
        const [dismissed, setDismissed] = useState(false)
        return !dismissed ? (
          <Card.Info innerSpace={0}>
            <Card.Info.CloseButton
              title="Dismiss video card"
              onClick={() => {
                videoRef.current?.pause()
                document.getElementById('full-media-with-video')?.focus()
                setDismissed(true)
              }}
            />
            <Flex.Stack
              layoutEngine="css"
              gap={false}
              justify="flex-end"
              style={{
                position: 'relative',
                minHeight: '21.5rem',
                overflow: 'hidden',
                color: 'var(--token-color-text-neutral-ondark)',
                backgroundColor: 'black',
                borderRadius: 'var(--rounded-corner)',
              }}
            >
              <img
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                src="/media/card/savings-poster.webp"
                width="752"
                height="416"
                alt=""
                loading="lazy"
              />
              <video
                ref={videoRef}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  visibility: failed ? 'hidden' : undefined,
                }}
                src="/media/card/savings-loop.mp4"
                poster="/media/card/savings-poster.webp"
                preload="none"
                muted
                loop
                playsInline
                aria-hidden="true"
                onPlaying={() => setFailed(false)}
                onError={() => {
                  setFailed(true)
                }}
              />
              <Card.Info.MediaButton
                videoRef={videoRef}
                playTitle="Play background video"
                pauseTitle="Pause background video"
              />
              <Card.Info.Overlay
                align="center"
                style={{ marginTop: '9.75rem', textAlign: 'center' }}
              >
                <Flex.Stack gap="xx-small" align="center">
                  <H2 size="x-large">Spar til noe uventet</H2>
                  <P>Du vet aldri når du trenger litt ekstra penger.</P>
                </Flex.Stack>
                <Flex.Item alignSelf="center">
                  <Button href="#info-card-layout">Start sparing</Button>
                </Flex.Item>
                {failed && (
                  <P role="status" size="small">
                    Videoen kunne ikke spilles av. Du kan fortsatt lese om
                    sparing.
                  </P>
                )}
              </Card.Info.Overlay>
            </Flex.Stack>
          </Card.Info>
        ) : null
      }

      return <Example />
    }}
  </ComponentBox>
)

export const MediaReplacement = () => (
  <ComponentBox hideCode data-visual-test="card-media-replacement">
    {() => {
      const Example = () => {
        const videoRef = useRef<HTMLVideoElement>(null)
        const [generation, setGeneration] = useState(0)
        return (
          <Flex.Stack>
            <Card.Info innerSpace={0}>
              <video
                key={generation}
                data-generation={generation}
                ref={videoRef}
                src="/media/card/savings-loop.mp4"
                muted
                loop
                playsInline
                aria-hidden="true"
                style={{ width: '100%' }}
              />
              <Card.Info.MediaButton
                videoRef={videoRef}
                playTitle="Play background video"
                pauseTitle="Pause background video"
              />
            </Card.Info>
            <Button onClick={() => setGeneration((value) => value + 1)}>
              Replace video
            </Button>
          </Flex.Stack>
        )
      }
      return <Example />
    }}
  </ComponentBox>
)
