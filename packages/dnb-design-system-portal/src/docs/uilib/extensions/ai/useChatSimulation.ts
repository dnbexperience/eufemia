import { useEffect, useState } from 'react'
import type { ChatStatus, UIMessage } from 'ai'

type ScriptStep =
  | { type: 'reasoning' | 'text'; text: string }
  | { type: 'tool'; name: string; title: string }
  | { type: 'source-url'; url: string; title: string }

type Turn = {
  id: number
  prompt: string
  script: Array<ScriptStep>
  step: number
  length: number
  stopped: boolean
}

const scripts: Array<{ match: RegExp; script: Array<ScriptStep> }> = [
  {
    match: /block|visa|card/i,
    script: [
      {
        type: 'reasoning',
        text: 'The customer wants to block a **Visa card**. I look up the cards first, so I block the right one.',
      },
      { type: 'tool', name: 'getCards', title: 'Looking up your cards' },
      { type: 'tool', name: 'blockCard', title: 'Blocking your card' },
      {
        type: 'text',
        text: 'Your Visa card ending in **1234** is now blocked, so it can no longer be used.\n\n- Order a new card in the app under **Cards**.\n- If the card was stolen, report it to the police.',
      },
      {
        type: 'source-url',
        url: 'https://www.dnb.no/kort',
        title: 'Block a card',
      },
    ],
  },
  {
    match: /spend|transaction|compare/i,
    script: [
      {
        type: 'reasoning',
        text: 'The customer asks about spending. I compare the transactions of this month with last month, grouped by category.',
      },
      {
        type: 'tool',
        name: 'getTransactions',
        title: 'Looking up your transactions',
      },
      {
        type: 'text',
        text: 'Here is your spending this month compared with last month:\n\n| Category | This month | Last month |\n| :-- | --: | --: |\n| Groceries | 4 200 kr | 3 900 kr |\n| Transport | 1 100 kr | 1 300 kr |\n| Restaurants | 850 kr | 1 200 kr |\n\nIn total you spent **6 150 kr**, which is **250 kr less** than last month.',
      },
      {
        type: 'source-url',
        url: 'https://www.dnb.no/',
        title: 'Your accounts',
      },
    ],
  },
]

const fallbackScript: Array<ScriptStep> = [
  {
    type: 'text',
    text: 'I can help you with cards, payments and your spending. Try asking me to **block a card** or to **compare your spending**.',
  },
]

/**
 * Simulates `useChat` from `@ai-sdk/react` with scripted replies,
 * so the demo works without a server.
 */
export function useChatSimulation() {
  const [turns, setTurns] = useState<Array<Turn>>([])
  const last = turns.at(-1)

  const updateLast = (changes: Partial<Turn>) => {
    setTurns((current) => [
      ...current.slice(0, -1),
      { ...current.at(-1), ...changes },
    ])
  }

  useEffect(() => {
    if (!last || last.stopped || last.step >= last.script.length) {
      return undefined // stop here
    }

    const step = last.script[last.step]
    let delay = 30
    let changes: Partial<Turn> = { step: last.step + 1, length: 0 }

    if (last.step === -1) {
      delay = 1000
    } else if (step.type === 'tool') {
      delay = 1200
    } else if (step.type === 'source-url') {
      delay = 0
    } else if (last.length < step.text.length) {
      changes = {
        length: last.length + (step.type === 'reasoning' ? 6 : 3),
      }
    } else if (step.type === 'reasoning') {
      delay = 400
    }

    const timeout = setTimeout(() => updateLast(changes), delay)
    return () => clearTimeout(timeout)
  }, [last])

  const sendMessage = ({ text }: { text: string }) => {
    const script =
      scripts.find(({ match }) => match.test(text))?.script ??
      fallbackScript
    setTurns((current) => [
      ...current,
      {
        id: current.length,
        prompt: text,
        script,
        step: -1,
        length: 0,
        stopped: false,
      },
    ])
  }

  const stop = () => updateLast({ stopped: true })

  const regenerate = () =>
    updateLast({ step: -1, length: 0, stopped: false })

  let status: ChatStatus = 'ready'
  if (last && !last.stopped && last.step < last.script.length) {
    status = last.step === -1 ? 'submitted' : 'streaming'
  }

  const messages: Array<UIMessage> = turns.flatMap((turn) => {
    const user: UIMessage = {
      id: `${turn.id}-user`,
      role: 'user',
      parts: [{ type: 'text', text: turn.prompt }],
    }
    if (turn.step === -1) {
      return [user]
    }
    return [
      user,
      {
        id: `${turn.id}-assistant`,
        role: 'assistant',
        parts: toParts(turn),
      },
    ]
  })

  return { messages, status, sendMessage, stop, regenerate }
}

function toParts(turn: Turn): UIMessage['parts'] {
  const parts: UIMessage['parts'] = []

  turn.script.forEach((step, index) => {
    const isCurrent = index === turn.step
    if (index > turn.step) {
      return // stop here
    }

    if (step.type === 'source-url') {
      parts.push({ type: 'source-url', sourceId: step.url, ...step })
      return // stop here
    }

    if (step.type === 'tool') {
      // A tool that was stopped while running is left out
      if (isCurrent && turn.stopped) {
        return // stop here
      }
      parts.push({
        type: `tool-${step.name}`,
        toolCallId: `${turn.id}-${index}`,
        title: step.title,
        input: {},
        ...(isCurrent
          ? { state: 'input-available' }
          : { state: 'output-available', output: {} }),
      } as UIMessage['parts'][number])
      return // stop here
    }

    const isStreaming = isCurrent && !turn.stopped
    parts.push({
      type: step.type,
      text: isCurrent ? step.text.slice(0, turn.length) : step.text,
      state: isStreaming ? 'streaming' : 'done',
    })
  })

  return parts
}
