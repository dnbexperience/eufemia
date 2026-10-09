import { useEffect, useId, useState } from 'react'
import type { AiToolStatus } from '@dnb/eufemia/src/extensions/ai/types'

export type DemoPart =
  | { type: 'text' | 'reasoning'; text: string; isStreaming?: boolean }
  | {
      type: 'tool'
      name: string
      title: string
      status: AiToolStatus
      output?: unknown
      errorText?: string
    }
  | { type: 'source'; url: string; title: string }

export type DemoMessage = {
  id: string
  role: 'user' | 'assistant'
  parts: Array<DemoPart>
}

type ScriptStep =
  | { type: 'reasoning' | 'text'; text: string }
  | {
      type: 'tool'
      name: string
      title: string
      output?: unknown
      errorText?: string
    }
  | { type: 'source'; url: string; title: string }

type Turn = {
  id: number
  prompt: string
  script: Array<ScriptStep>
  step: number
  length: number
  stopped: boolean
}

export type Transaction = {
  name: string
  account: string
  date: string
  amount: number
}

const transactions: Array<Transaction> = [
  {
    name: 'Rema 1000',
    account: 'Brukskonto',
    date: '02.10',
    amount: -342.5,
  },
  { name: 'Ruter', account: 'Brukskonto', date: '01.10', amount: -40 },
  {
    name: 'Lønn DNB',
    account: 'Lønnskonto',
    date: '30.09',
    amount: 38500,
  },
  {
    name: 'Kim Olsen',
    account: 'Brukskonto',
    date: '28.09',
    amount: -888,
  },
]

function createScript(prompt: string): Array<ScriptStep> {
  if (/confirmation/i.test(prompt)) {
    const name = prompt.match(/for (.+)$/i)?.[1] ?? 'the payment'
    return [
      {
        type: 'tool',
        name: 'getPaymentConfirmation',
        title: 'Finding the payment confirmation',
        output: { name },
      },
      {
        type: 'text',
        text: `Here is the payment confirmation for **${name}**:\n\n| | |\n| :-- | :-- |\n| Status | Completed |\n| Reference | 2026-1002-4471 |\n\nYou can download it as a PDF in the app under **Payments**.`,
      },
    ]
  }

  if (/block|visa|card/i.test(prompt)) {
    return [
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
        type: 'source',
        url: 'https://www.dnb.no/privat/kort',
        title: 'Cards at DNB',
      },
    ]
  }

  if (/spend|compare|budget/i.test(prompt)) {
    return [
      {
        type: 'reasoning',
        text: 'The customer asks about spending. I compare this month with last month, grouped by category.',
      },
      {
        type: 'tool',
        name: 'getSpending',
        title: 'Comparing your spending',
      },
      {
        type: 'text',
        text: 'Here is your spending this month compared with last month:\n\n| Category | This month | Last month |\n| :-- | --: | --: |\n| Groceries | 4 200 kr | 3 900 kr |\n| Transport | 1 100 kr | 1 300 kr |\n| Restaurants | 850 kr | 1 200 kr |\n\nIn total you spent **6 150 kr**, which is **250 kr less** than last month.',
      },
      {
        type: 'source',
        url: 'https://www.dnb.no/privat/dagligbank',
        title: 'Everyday banking',
      },
    ]
  }

  if (/transaction|payment|transfer/i.test(prompt)) {
    return [
      {
        type: 'tool',
        name: 'getTransactions',
        title: 'Looking up your transactions',
        output: { transactions },
      },
      {
        type: 'text',
        text: 'Here are your latest transactions. Choose one to see the details or the payment confirmation.',
      },
    ]
  }

  if (/loan|mortgage/i.test(prompt)) {
    return [
      {
        type: 'reasoning',
        text: 'The customer asks about loans. I check the current offers.',
      },
      {
        type: 'tool',
        name: 'getLoanOffers',
        title: 'Checking loan offers',
        errorText: 'The loan service is not available right now.',
      },
      {
        type: 'text',
        text: 'Sorry, I could not check the loan offers right now. Please try again later, or read more about [mortgages at DNB](https://www.dnb.no/privat/boliglan).',
      },
    ]
  }

  return [
    {
      type: 'text',
      text: 'I am **Aino**, your digital banking assistant. I can help you with:\n\n- Blocking a card\n- Your latest transactions\n- Comparing your spending\n- Loan offers\n\nWhat would you like to do?',
    },
  ]
}

/**
 * Simulates a chat with scripted replies, so the demo works without a server.
 */
export function useChatSimulation() {
  const prefix = useId()
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
      delay = step.errorText ? 1500 : 1200
    } else if (step.type === 'source') {
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
    const script = createScript(text)
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

  let status: 'ready' | 'submitted' | 'streaming' = 'ready'
  if (last && !last.stopped && last.step < last.script.length) {
    status = last.step === -1 ? 'submitted' : 'streaming'
  }

  const messages: Array<DemoMessage> = turns.flatMap((turn) => {
    const user: DemoMessage = {
      id: prefix + turn.id + '-user',
      role: 'user',
      parts: [{ type: 'text', text: turn.prompt }],
    }
    if (turn.step === -1) {
      return [user]
    }
    return [
      user,
      {
        id: prefix + turn.id + '-assistant',
        role: 'assistant',
        parts: toParts(turn),
      },
    ]
  })

  // The simulation only supports clearing the messages
  const setMessages = (messages: Array<DemoMessage>) => {
    if (messages.length === 0) {
      setTurns([])
    }
  }

  return { messages, status, sendMessage, stop, regenerate, setMessages }
}

function toParts(turn: Turn): DemoMessage['parts'] {
  const parts: DemoMessage['parts'] = []

  turn.script.forEach((step, index) => {
    const isCurrent = index === turn.step
    if (index > turn.step) {
      return // stop here
    }

    if (step.type === 'source') {
      parts.push(step)
      return // stop here
    }

    if (step.type === 'tool') {
      // A tool that was stopped while running is left out
      if (isCurrent && turn.stopped) {
        return // stop here
      }
      parts.push({
        type: 'tool',
        name: step.name,
        title: step.title,
        status: isCurrent ? 'running' : step.errorText ? 'error' : 'done',
        errorText: isCurrent ? undefined : step.errorText,
        output: isCurrent ? undefined : step.output,
      })
      return // stop here
    }

    const isStreaming = isCurrent && !turn.stopped
    parts.push({
      type: step.type,
      text: isCurrent ? step.text.slice(0, turn.length) : step.text,
      isStreaming,
    })
  })

  return parts
}
