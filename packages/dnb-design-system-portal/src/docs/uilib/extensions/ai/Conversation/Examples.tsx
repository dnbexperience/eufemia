import { useMemo, useState } from 'react'
import { Button, Flex, P } from '@dnb/eufemia/src'
import {
  Conversation,
  Message,
  useConversation,
  useConversationVisibility,
} from '@dnb/eufemia/src/extensions/ai'
import { createConversationVirtualization } from '@dnb/eufemia/src/extensions/ai/Virtualization'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import type { AiConversationItem } from '@dnb/eufemia/src/extensions/ai'

const driver = createConversationVirtualization({
  estimateSize: 100,
  overscan: 5,
})

function Controls() {
  const { scrollToMessage, scrollToEnd } = useConversation(
    'virtual-chat-demo'
  )
  const { currentTurnId } = useConversationVisibility('virtual-chat-demo')
  return (
    <Flex.Stack>
      <Flex.Horizontal>
        <Button onClick={() => scrollToMessage('history-100')}>
          Go to message 100
        </Button>
        <Button onClick={scrollToEnd}>Go to latest</Button>
      </Flex.Horizontal>
      <P>Current turn: {currentTurnId ?? 'none'}</P>
    </Flex.Stack>
  )
}

function VirtualizedDemo() {
  const [virtualized, setVirtualized] = useState(true)
  const [first, setFirst] = useState(0)
  const [count, setCount] = useState(1000)
  const [extra, setExtra] = useState('')
  const [mode, setMode] = useState<'turn' | 'end'>('end')
  const items = useMemo<Array<AiConversationItem>>(
    () =>
      Array.from({ length: count - first }, (_, index) => {
        const number = index + first
        const from = number % 2 === 0 ? 'user' : 'assistant'
        return {
          id: 'history-' + number,
          from,
          render: () => (
            <Message from={from} name={from === 'user' ? 'You' : 'Aino'}>
              Message {number}.{' '}
              {'A longer reply with details. '.repeat(
                (((number % 4) + 4) % 4) + 1
              )}
              {number === count - 1 && extra}
              <Button variant="tertiary" onClick={() => null}>
                Action {number}
              </Button>
            </Message>
          ),
        }
      }),
    [first, count, extra]
  )
  return (
    <div>
      <Flex.Stack>
        <Flex.Horizontal>
          <Button
            onClick={() => {
              setCount((value) => value + 2)
              setExtra('')
            }}
          >
            Append turn
          </Button>
          <Button
            onClick={() =>
              setExtra(
                (value) =>
                  value + ' Streaming response content.'.repeat(10)
              )
            }
          >
            Extend latest reply
          </Button>
          <Button onClick={() => setFirst((value) => value - 20)}>
            Prepend history
          </Button>
          <Button
            onClick={() => {
              setFirst(0)
              setCount(2)
              setExtra('')
            }}
          >
            Short transcript
          </Button>
          <Button
            onClick={() =>
              setMode((value) => (value === 'end' ? 'turn' : 'end'))
            }
          >
            Mode: {mode}
          </Button>
          <Button onClick={() => setVirtualized((value) => !value)}>
            {virtualized
              ? 'Show full transcript'
              : 'Virtualize transcript'}
          </Button>
        </Flex.Horizontal>
        <Controls />
        <Conversation
          key={String(virtualized)}
          id="virtual-chat-demo"
          items={items}
          renderDriver={virtualized ? driver : undefined}
          scrollBehavior={mode}
          aria-live="off"
          style={{ height: '25rem' }}
        />
      </Flex.Stack>
    </div>
  )
}

export default function VirtualizedExample() {
  return (
    <ComponentBox
      data-visual-test="ai-virtualized-conversation"
      scope={{ VirtualizedDemo }}
    >
      <VirtualizedDemo />
    </ComponentBox>
  )
}
