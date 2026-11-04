import { useEffect, useState } from 'react'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { AgentAction } from '@dnb/eufemia/src/extensions/ai'
import type { AiAgentActionStatus } from '@dnb/eufemia/src/extensions/ai'
import '@dnb/eufemia/src/extensions/ai/style'
import { Avatar, Button, Flex } from '@dnb/eufemia/src'
import { Provider } from '@dnb/eufemia/src/shared'
import { solve } from '@dnb/eufemia/src/icons'
import spotifyAvatar from './spotify-avatar.svg?url'

const scope = { AgentAction, spotifyAvatar, solve }

export function States() {
  return (
    <ComponentBox scope={scope}>
      <Provider locale="en-GB">
        <Flex.Stack>
          <AgentAction
            actionLabel="Paying"
            announce={false}
            progress={35}
            targetVisual={
              <Avatar size="small" src={spotifyAvatar} alt="" hasLabel />
            }
          >
            Spotify Premium
          </AgentAction>
          <AgentAction
            actionLabel="Paying"
            announce={false}
            progress={65}
            agentAvatar={
              <Avatar
                size="small"
                icon={solve}
                variant="tertiary"
                hasLabel
              />
            }
            targetVisual={
              <Avatar size="small" src={spotifyAvatar} alt="" hasLabel />
            }
          >
            Spotify Premium
          </AgentAction>
          <AgentAction announce={false}>Generating a graph…</AgentAction>
          <AgentAction status="done" announce={false}>
            Spotify Premium paid.
          </AgentAction>
          <AgentAction status="error" announce={false}>
            Payment failed. Please try again.
          </AgentAction>
          <AgentAction status="canceled" announce={false}>
            Graph generation canceled.
          </AgentAction>
        </Flex.Stack>
      </Provider>
    </ComponentBox>
  )
}

export function KnownProgress() {
  return (
    <ComponentBox scope={scope}>
      {() => {
        const PaymentDemo = () => {
          const [progress, setProgress] = useState(0)
          const [status, setStatus] =
            useState<AiAgentActionStatus>('running')
          const [undoUntil, setUndoUntil] = useState<number>()

          useEffect(() => {
            if (status !== 'running') {
              return undefined
            }
            const started = Date.now()
            const interval = setInterval(() => {
              const value = Math.min(100, (Date.now() - started) / 22)
              setProgress(value)
              if (value === 100) {
                // Simulate a confirmed result with a 20-second reversal window.
                clearInterval(interval)
                setUndoUntil(Date.now() + 20000)
                setStatus('done')
              }
            }, 110)
            return () => clearInterval(interval)
          }, [status])

          return (
            <Provider locale="en-GB">
              <Flex.Stack>
                <AgentAction
                  actionLabel="Paying"
                  progress={progress}
                  status={status}
                  targetVisual={
                    <Avatar
                      size="small"
                      src={spotifyAvatar}
                      alt=""
                      hasLabel
                    />
                  }
                  undoUntil={undoUntil}
                  onUndo={() => setStatus('canceled')}
                >
                  {status === 'running'
                    ? 'Spotify Premium'
                    : status === 'done'
                      ? 'Spotify Premium paid.'
                      : 'Payment reversed.'}
                </AgentAction>
                <Button
                  variant="secondary"
                  disabled={status === 'running'}
                  onClick={() => {
                    setProgress(0)
                    setUndoUntil(undefined)
                    setStatus('running')
                  }}
                >
                  Replay payment
                </Button>
              </Flex.Stack>
            </Provider>
          )
        }
        return <PaymentDemo />
      }}
    </ComponentBox>
  )
}

export function UnknownProgress() {
  return (
    <ComponentBox scope={scope}>
      {() => {
        const GraphDemo = () => {
          const [status, setStatus] =
            useState<AiAgentActionStatus>('running')
          return (
            <Provider locale="en-GB">
              <Flex.Stack>
                <AgentAction status={status}>
                  {status === 'running'
                    ? 'Generating a graph…'
                    : status === 'done'
                      ? 'Graph generated.'
                      : 'Graph generation canceled.'}
                </AgentAction>
                <Flex.Horizontal>
                  <Button
                    disabled={status !== 'running'}
                    onClick={() => setStatus('done')}
                  >
                    Complete graph
                  </Button>
                  <Button
                    variant="secondary"
                    disabled={status !== 'running'}
                    onClick={() => setStatus('canceled')}
                  >
                    Cancel graph
                  </Button>
                  <Button
                    variant="tertiary"
                    icon={false}
                    disabled={status === 'running'}
                    onClick={() => setStatus('running')}
                  >
                    Restart graph
                  </Button>
                </Flex.Horizontal>
              </Flex.Stack>
            </Provider>
          )
        }
        return <GraphDemo />
      }}
    </ComponentBox>
  )
}

export function PendingUndo() {
  return (
    <ComponentBox scope={scope}>
      {() => {
        const UndoDemo = () => {
          const [pending, setPending] = useState(false)
          const [reversed, setReversed] = useState(false)
          const [undoUntil, setUndoUntil] = useState<number>()
          return (
            <Provider locale="en-GB">
              <Flex.Stack>
                <AgentAction
                  status={reversed ? 'canceled' : 'done'}
                  undoDisabled={pending}
                  undoUntil={undoUntil}
                  onUndo={() => setPending(true)}
                >
                  {reversed
                    ? 'Payment reversed.'
                    : pending
                      ? 'Reversing payment…'
                      : 'Spotify Premium paid.'}
                </AgentAction>
                <Flex.Horizontal>
                  <Button
                    disabled={!pending}
                    onClick={() => {
                      setPending(false)
                      setReversed(true)
                    }}
                  >
                    Confirm reversal
                  </Button>
                  <Button onClick={() => setUndoUntil(Date.now() + 20000)}>
                    Add Undo deadline
                  </Button>
                  <Button
                    onClick={() => {
                      setPending(false)
                      setReversed(false)
                      setUndoUntil(undefined)
                    }}
                  >
                    Reset payment
                  </Button>
                </Flex.Horizontal>
              </Flex.Stack>
            </Provider>
          )
        }
        return <UndoDemo />
      }}
    </ComponentBox>
  )
}

export function HistoricalActions() {
  return (
    <ComponentBox scope={scope}>
      <Provider locale="en-GB">
        <Flex.Stack>
          <AgentAction status="done" announce={false}>
            Earlier payment completed.
          </AgentAction>
          <AgentAction status="canceled" announce={false}>
            Earlier graph generation canceled.
          </AgentAction>
        </Flex.Stack>
      </Provider>
    </ComponentBox>
  )
}
