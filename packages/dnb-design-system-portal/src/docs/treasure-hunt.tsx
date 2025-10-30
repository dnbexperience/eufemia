import React from 'react'
import { usePortalHead } from '../core/PortalHead'
import {
  VisuallyHidden,
  H1,
  H2,
  H3,
  P,
  Li,
  Ol,
  Anchor,
  Button,
  AriaLive,
  Flex,
  Dialog,
  Section,
} from '@dnb/eufemia/src'

type RoomId = 'start' | 'b' | 'c' | 'treasure'

type Choice = {
  id: string
  label: string
  next?: RoomId
  explode?: boolean
  hint: string
}

function getChoices(room: RoomId): Choice[] {
  if (room === 'start') {
    return [
      {
        id: 'north',
        label: 'Go north',
        explode: true,
        hint: 'You hear hissing fuses to the north. Proceeding may be dangerous.',
      },
      {
        id: 'east',
        label: 'Go east',
        next: 'b',
        hint: 'You hear a calm breeze and distant chimes to the east. Sounds safe.',
      },
      {
        id: 'south',
        label: 'Go south',
        explode: true,
        hint: 'A faint ticking comes from the south. Probably a trap.',
      },
      {
        id: 'west',
        label: 'Go west',
        next: 'c',
        hint: 'Soft footsteps echo from the west. It might be a path.',
      },
    ]
  }
  if (room === 'b') {
    return [
      {
        id: 'north',
        label: 'Go north',
        next: 'treasure',
        hint: 'The air smells of old coins and cedar chests. The treasure could be north.',
      },
      {
        id: 'east',
        label: 'Go east',
        explode: true,
        hint: 'You hear crackling sparks to the east. Not a good sign.',
      },
      {
        id: 'back',
        label: 'Go back',
        next: 'start',
        hint: 'The way back is clear and quiet.',
      },
    ]
  }
  if (room === 'c') {
    return [
      {
        id: 'south',
        label: 'Go south',
        explode: true,
        hint: 'Low rumbles come from the south. That path sounds unstable.',
      },
      {
        id: 'east',
        label: 'Go east',
        next: 'start',
        hint: 'You hear your own steps behind you. East returns to the entry.',
      },
      {
        id: 'north',
        label: 'Go north',
        next: 'b',
        hint: 'A bell rings once in the distance. North might bring you closer.',
      },
    ]
  }
  return []
}

function getRoomDescription(room: RoomId): string {
  if (room === 'start') {
    return 'You are at the labyrinth entrance. East and west seem promising. North and south feel risky.'
  }
  if (room === 'b') {
    return 'A corridor with a faint breeze. The air to the north smells like old coins.'
  }
  if (room === 'c') {
    return 'Echoing steps and a distant bell. West felt safe, and north might lead onward.'
  }
  if (room === 'treasure') {
    return 'This chamber shimmers with treasure and cedar scents. A warm glow fills the room.'
  }
  return ''
}

export default function TreasureHuntPage() {
  usePortalHead({
    title: 'Audio Treasure Hunt',
    description:
      'A small screen reader friendly treasure hunt with safe and explosive paths.',
  })

  const [room, setRoom] = React.useState<RoomId>('start')
  const [moves, setMoves] = React.useState<string[]>([])
  const [message, setMessage] = React.useState<string>('')
  const [alert, setAlert] = React.useState<string>('')
  const [exploded, setExploded] = React.useState<boolean>(false)
  const explosionTimer = React.useRef<number | null>(null)

  const choices = React.useMemo(() => getChoices(room), [room])
  const isTreasure = room === 'treasure'

  function resetGame() {
    setRoom('start')
    setMoves([])
    setMessage(getRoomDescription('start'))
    setAlert('')
  }

  function onChoose(choice: Choice) {
    setAlert('')
    setMessage('')

    setMoves((prev) => [...prev, choice.label])

    if (choice.explode) {
      setAlert('Boom! That path exploded. Try another route.')
      setExploded(true)
      if (explosionTimer.current) {
        clearTimeout(explosionTimer.current)
      }
      explosionTimer.current = window.setTimeout(() => {
        setExploded(false)
      }, 1600)
      // Stay in the same room on explosion
      return
    }
    if (choice.next === 'treasure') {
      setRoom('treasure')
      setMessage(
        `You found the treasure! Congratulations! ${getRoomDescription(
          'treasure',
        )}`,
      )
      return
    }
    if (choice.next) {
      const nextRoom = choice.next
      setRoom(nextRoom)
      setMessage(
        `You move ${choice.label.replace('Go ', '')}. ${getRoomDescription(
          nextRoom,
        )}`,
      )
    }
  }

  React.useEffect(() => {
    return () => {
      if (explosionTimer.current) {
        clearTimeout(explosionTimer.current)
      }
    }
  }, [])

  return (
    <Flex.Stack innerSpace="large">
      <Anchor href="#game" aria-current="page" className="dnb-skip-link">
        Skip to game area
      </Anchor>
      <section
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
          role="img"
          style={{ display: 'block' }}
        >
          <defs>
            <pattern
              id="paper"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <rect width="10" height="10" fill="var(--color-white)" />
              <path
                d="M0 0 L10 10 M10 0 L0 10"
                stroke="var(--color-mint-green-30)"
                strokeOpacity="0.05"
              />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100" height="100" fill="url(#paper)" />
          {/* Dashed path */}
          <path
            d="M10,85 C20,70 35,75 45,60 C55,45 70,50 80,35"
            fill="none"
            stroke="var(--color-sea-green)"
            strokeOpacity="0.2"
            strokeWidth="1.5"
            strokeDasharray="2 3"
          />
          {/* Waypoints */}
          <circle
            cx="10"
            cy="85"
            r="2"
            fill="var(--color-emerald-green)"
            fillOpacity="0.25"
          />
          <circle
            cx="45"
            cy="60"
            r="2"
            fill="var(--color-emerald-green)"
            fillOpacity="0.25"
          />
          <circle
            cx="80"
            cy="35"
            r="2"
            fill="var(--color-emerald-green)"
            fillOpacity="0.25"
          />
          {/* Treasure X */}
          <g opacity="0.25" transform="translate(80 20)">
            <line
              x1="-4"
              y1="-4"
              x2="4"
              y2="4"
              stroke="var(--color-fire-red)"
              strokeWidth="2"
            />
            <line
              x1="-4"
              y1="4"
              x2="4"
              y2="-4"
              stroke="var(--color-fire-red)"
              strokeWidth="2"
            />
          </g>
        </svg>
      </section>

      <header
        aria-label="Site header"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <H1>Treasure Hunt</H1>
      </header>

      <nav aria-label="Game navigation">
        <Button on_click={resetGame} aria-describedby="reset-hint">
          Start game
        </Button>
        <VisuallyHidden id="reset-hint">
          Resets your progress and returns you to the labyrinth entrance.
        </VisuallyHidden>
      </nav>

      <main
        id="game"
        aria-label="Game area"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <H2>{isTreasure ? 'Treasure Room' : 'Labyrinth'}</H2>

        {!isTreasure && (
          <P proseMaxWidth={60}>
            Find the treasure by choosing the safe paths. Some routes may
            explode. Listen to the subtle audio hints provided to screen
            readers for guidance.
          </P>
        )}

        {/* Live regions for feedback */}
        <AriaLive priority="low">{message}</AriaLive>
        <AriaLive priority="high">{alert}</AriaLive>

        {isTreasure && (
          <section
            aria-hidden
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 999,
            }}
          >
            <Dialog openState omitTriggerButton fullscreen>
              <Flex.Horizontal justify="center">
                <H2 top="large" bottom="large">
                  You found the treasure!
                </H2>
                <span
                  aria-hidden
                  style={{ fontSize: '60vw', lineHeight: 1 }}
                >
                  🏆
                </span>
                <VisuallyHidden>Treasure found</VisuallyHidden>
              </Flex.Horizontal>
            </Dialog>
          </section>
        )}

        {exploded && (
          <section
            aria-hidden
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.05)',
              pointerEvents: 'none',
              zIndex: 1000,
            }}
          >
            <span aria-hidden style={{ fontSize: '60vw', lineHeight: 1 }}>
              💥
            </span>
            <VisuallyHidden>Explosion!</VisuallyHidden>
          </section>
        )}

        {!isTreasure ? (
          <Section
            aria-label="Available directions"
            backgroundColor="light-3"
            innerSpace={{ top: 'medium', bottom: 'medium' }}
            top="large"
          >
            <H3 bottom>Choose your path</H3>
            {(() => {
              const labels: Record<string, string> = {
                north: 'Go north',
                east: 'Go east',
                south: 'Go south',
                west: 'Go west',
                back: 'Go back',
              }
              const byId: Record<string, Choice> = Object.fromEntries(
                choices.map((c) => [c.id, c]),
              )
              const order: Array<keyof typeof labels> = [
                'north',
                'east',
                'south',
                'west',
                'back',
              ]
              return order.map((id) => {
                const available = Boolean(byId[id])
                const choice: Choice =
                  byId[id] ||
                  ({
                    id,
                    label: labels[id],
                    hint: 'Not available from here',
                  } as Choice)
                const hintId = `hint-${room}-${choice.id}`
                return (
                  <React.Fragment key={id}>
                    <Button
                      on_click={() => onChoose(choice)}
                      aria-describedby={hintId}
                      disabled={!available}
                      tabIndex={-1}
                      style={{ opacity: 0.05 }}
                    >
                      {choice.label}
                    </Button>
                    <VisuallyHidden id={hintId}>
                      {choice.hint}
                    </VisuallyHidden>
                  </React.Fragment>
                )
              })
            })()}

            <VisuallyHidden element="section" aria-label="Secret map">
              <H3>Secret map</H3>
              <P>Optimal route: Go east, then go north.</P>
            </VisuallyHidden>
          </Section>
        ) : (
          <Section
            top
            aria-label="Treasure"
            backgroundColor="light-3"
            innerSpace={{ top: 'medium', bottom: 'medium' }}
          >
            <P proseMaxWidth={65}>
              The chest creaks open to reveal a trove of coins and a note
              that reads: “Well done!”.
            </P>
            <P>
              <Button
                on_click={resetGame}
                aria-describedby="play-again-hint"
                disabled
                style={{ opacity: 0.05 }}
              >
                Play again
              </Button>
              <VisuallyHidden id="play-again-hint">
                Start a new round from the labyrinth entrance.
              </VisuallyHidden>
            </P>
          </Section>
        )}

        {/* Invisible map description to aid screen reader navigation */}
        <VisuallyHidden focusable element="section" aria-label="Text map">
          <H3>Textual map</H3>
          <P proseMaxWidth={65}>
            From the entrance, east or west are promising. North and south
            seem hazardous. If you go east, north smells like coins. If you
            go west, returning east leads back; north moves you closer.
          </P>
        </VisuallyHidden>

        {/* Simple move log for context */}
        <Section
          top="large"
          aria-label="Your moves"
          backgroundColor="light-3"
          innerSpace={{ top: 'medium', bottom: 'medium' }}
        >
          <H3>Path taken</H3>
          {moves.length === 0 ? (
            <P>No moves yet.</P>
          ) : (
            <Ol>
              {moves.map((m, i) => (
                <Li key={`${m}-${i}`}>{m}</Li>
              ))}
            </Ol>
          )}
        </Section>
      </main>

      <footer
        aria-label="Site footer"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <P>Have fun and explore safely.</P>
      </footer>
    </Flex.Stack>
  )
}
