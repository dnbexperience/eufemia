import { useEffect, useState } from 'react'
import type { ChatStatus, UIMessage } from 'ai'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import * as Ai from '@dnb/eufemia/src/extensions/ai'
import '@dnb/eufemia/src/extensions/ai/style'
import {
  Anchor,
  Avatar,
  Button,
  List,
  NumberFormat,
  P,
} from '@dnb/eufemia/src'
import {
  bank,
  copy,
  pay_from,
  refresh,
  thumbs_down,
  thumbs_up,
  transfer,
} from '@dnb/eufemia/src/icons'

const answer = `## Your spending in March

You spent **12 400 kr**, which is ~~more~~ *less* than [last month](https://www.dnb.no/).

- Groceries: \`4 200 kr\`
- Transport: \`1 100 kr\`
  1. Bus
  2. Train
- [x] Budget created
- [ ] Savings goal

> Tip: Set up a savings agreement at www.dnb.no.

| Category  | Amount |
| :-------- | -----: |
| Groceries |  4 200 |
| Transport |  1 100 |

\`\`\`ts
const total = groceries + transport
\`\`\`
`

export function AiResponseDefault() {
  return (
    <ComponentBox scope={{ answer }} data-visual-test="ai-response">
      <Ai.Response>{answer}</Ai.Response>
    </ComponentBox>
  )
}

export function AiResponseStreaming() {
  return (
    <ComponentBox scope={{ answer }}>
      {() => {
        const StreamingResponse = () => {
          const [length, setLength] = useState(0)

          useEffect(() => {
            if (length >= answer.length) {
              return // stop here
            }
            const timeout = setTimeout(
              () => setLength((current) => current + 3),
              30
            )
            return () => clearTimeout(timeout)
          }, [length])

          return (
            <>
              <Button
                variant="secondary"
                bottom
                onClick={() => setLength(0)}
              >
                Replay
              </Button>
              <Ai.Response>{answer.slice(0, length)}</Ai.Response>
            </>
          )
        }

        return <StreamingResponse />
      }}
    </ComponentBox>
  )
}

export function AiResponseAllowedUrls() {
  return (
    <ComponentBox>
      <Ai.Response allowedLinkPrefixes={['https://www.dnb.no']}>
        {
          'Read more on [dnb.no](https://www.dnb.no/), not on [example.com](https://example.com) or [this](javascript:alert(1)).'
        }
      </Ai.Response>
    </ComponentBox>
  )
}

export function AiResponseComponents() {
  return (
    <ComponentBox>
      {() => {
        const Strong = ({ children }) => (
          <strong style={{ color: 'var(--color-sea-green)' }}>
            {children}
          </strong>
        )

        return (
          <Ai.Response components={{ strong: Strong }}>
            {'This answer uses a **custom** element for **bold** text.'}
          </Ai.Response>
        )
      }}
    </ComponentBox>
  )
}

export function AiMessagePlain() {
  return (
    <ComponentBox data-visual-test="ai-message-plain">
      <Ai.Message
        variant="plain"
        name="Solve"
        timestamp="15:24"
        avatar={
          <Avatar variant="secondary" hasLabel>
            S
          </Avatar>
        }
        aiGenerated
      >
        <Ai.Response>
          {
            'It seems you made **2 transfers** 12.02. Choose the correct one below.'
          }
        </Ai.Response>
      </Ai.Message>
    </ComponentBox>
  )
}

export function AiMessageActions() {
  return (
    <ComponentBox
      data-visual-test="ai-message-actions"
      scope={{ copy, thumbs_up, thumbs_down, refresh }}
    >
      <Ai.Message
        name="Aino"
        actions={
          <Ai.Actions>
            <Ai.Action icon={copy} label="Copy" />
            <Ai.Action icon={thumbs_up} label="Good answer" />
            <Ai.Action icon={thumbs_down} label="Bad answer" />
            <Ai.Action icon={refresh} label="Regenerate" />
          </Ai.Actions>
        }
      >
        Your card is now blocked.
      </Ai.Message>
    </ComponentBox>
  )
}

export function AiLoaderExample() {
  return (
    <ComponentBox data-visual-test="ai-loader">
      <Ai.Loader
        name="Aino"
        avatar={
          <Avatar variant="secondary" hasLabel>
            A
          </Avatar>
        }
      />
    </ComponentBox>
  )
}

// Messages from useChat in @ai-sdk/react
const messages: Array<UIMessage> = [
  {
    id: '1',
    role: 'user',
    parts: [{ type: 'text', text: 'What did I spend on food?' }],
  },
  {
    id: '2',
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: 'You spent **4 200 kr** on groceries in March.',
        state: 'done',
      },
    ],
  },
]

export function AiMessageUIMessage() {
  return (
    <ComponentBox scope={{ messages }}>
      {messages.map((message) => (
        <Ai.Message key={message.id} message={message} />
      ))}
    </ComponentBox>
  )
}

export function AiPromptInputDefault() {
  return (
    <ComponentBox data-visual-test="ai-prompt-input-default">
      <Ai.PromptInput
        characterCounter={111}
        onAttachmentClick={() => null}
        onMicrophoneClick={() => null}
      />
    </ComponentBox>
  )
}

export function AiPromptInputCompact() {
  return (
    <ComponentBox data-visual-test="ai-prompt-input-compact">
      <Ai.PromptInput
        variant="compact"
        placeholder="Start typing here"
        onAttachmentClick={() => null}
        onMicrophoneClick={() => null}
      />
    </ComponentBox>
  )
}

export function AiPromptInputStatus() {
  return (
    <ComponentBox>
      {() => {
        const Chat = () => {
          const [status, setStatus] = useState<
            'ready' | 'submitted' | 'streaming'
          >('ready')

          useEffect(() => {
            if (status === 'ready') {
              return // stop here
            }
            const timeout = setTimeout(() => setStatus('ready'), 4000)
            return () => clearTimeout(timeout)
          }, [status])

          return (
            <Ai.PromptInput
              status={status}
              onSubmit={() => setStatus('streaming')}
              onStop={() => setStatus('ready')}
            />
          )
        }

        return <Chat />
      }}
    </ComponentBox>
  )
}

export function AiPromptInputError() {
  return (
    <ComponentBox>
      <Ai.PromptInput
        status="error"
        textareaProps={{
          status: 'The message could not be sent. Try again.',
        }}
      />
    </ComponentBox>
  )
}

export function AiConversationExample() {
  return (
    <ComponentBox data-visual-test="ai-conversation">
      <Ai.Conversation style={{ height: '24rem' }}>
        <Ai.DateMarker date="2026-02-02" />
        <Ai.Disclaimer>
          <P>
            Aino is a chatbot for customer service. Do not share personal
            information with the chatbot. Read more about{' '}
            <Anchor href="https://www.dnb.no/personvern">
              your privacy
            </Anchor>
            .
          </P>
          <P top>
            Some answers are generated with artificial intelligence and are
            marked with a tag. AI-generated answers can contain errors.
          </P>
        </Ai.Disclaimer>
        <Ai.Message name="Aino" timestamp="14:32">
          Hi, I am Aino, the digital assistant of DNB.
        </Ai.Message>
        <Ai.Message>How can I help you?</Ai.Message>
        <Ai.Message from="user" name="You" timestamp="14:33">
          I see an amount withdrawn from my account that I do not
          recognize. Can you help me find out what it is?
        </Ai.Message>
        <Ai.Message name="Aino" timestamp="14:33" aiGenerated>
          Of course. Choose the transaction you want to know more about,
          and I will show you the details.
        </Ai.Message>
      </Ai.Conversation>
    </ComponentBox>
  )
}

export function AiWelcomeChips() {
  return (
    <ComponentBox data-visual-test="ai-welcome-chips">
      <Ai.Welcome title="Welcome, Peter">
        <Ai.Suggestions>
          <Ai.Suggestion suggestion="Block my Visa card">
            block my visa
          </Ai.Suggestion>
          <Ai.Suggestion suggestion="Help me with Vipps">
            vipps
          </Ai.Suggestion>
          <Ai.Suggestion suggestion="Show my latest transactions">
            transactions
          </Ai.Suggestion>
          <Ai.Suggestion suggestion="Compare my spending with last month">
            compare spending
          </Ai.Suggestion>
        </Ai.Suggestions>
      </Ai.Welcome>
    </ComponentBox>
  )
}

export function AiSuggestionChips() {
  return (
    <ComponentBox data-visual-test="ai-suggestion-chips">
      <Ai.Suggestions>
        <Ai.Suggestion suggestion="Block my Visa card">
          block my visa
        </Ai.Suggestion>
        <Ai.Suggestion suggestion="Show my latest transactions">
          transactions
        </Ai.Suggestion>
      </Ai.Suggestions>
    </ComponentBox>
  )
}

export function AiSuggestionCards() {
  return (
    <ComponentBox data-visual-test="ai-suggestion-cards" scope={{ bank }}>
      <Ai.Suggestions>
        <Ai.Suggestion
          variant="card"
          icon={bank}
          suggestion="Explain my spending this month"
        />
        <Ai.Suggestion
          variant="card"
          icon={bank}
          suggestion="Show my savings goals"
        />
        <Ai.Suggestion
          variant="card"
          icon={bank}
          suggestion="When is my next bill due?"
        />
      </Ai.Suggestions>
    </ComponentBox>
  )
}

export function AiDateMarkerExample() {
  return (
    <ComponentBox data-visual-test="ai-date-marker">
      <Ai.DateMarker date="2026-02-02" />
      <Ai.DateMarker>Today</Ai.DateMarker>
    </ComponentBox>
  )
}

export function AiDisclaimerExample() {
  return (
    <ComponentBox data-visual-test="ai-disclaimer">
      <Ai.Disclaimer>
        <P>
          Aino is a chatbot for customer service. Do not share personal
          information with the chatbot. Read more about{' '}
          <Anchor href="https://www.dnb.no/personvern">
            your privacy
          </Anchor>
          .
        </P>
        <P top>
          Some answers are generated with artificial intelligence and are
          marked with a tag. AI-generated answers can contain errors.
        </P>
      </Ai.Disclaimer>
    </ComponentBox>
  )
}

export function AiSourcesExample() {
  return (
    <ComponentBox data-visual-test="ai-sources">
      <Ai.Message name="Aino" aiGenerated>
        <Ai.Response>
          {'You can block your card in the app under **Cards**.'}
        </Ai.Response>
      </Ai.Message>
      <Ai.Sources
        top="x-small"
        sources={[
          { url: 'https://www.dnb.no/kort', title: 'Cards' },
          { url: 'https://www.dnb.no/hjelp', title: 'Help and contact' },
        ]}
      />
    </ComponentBox>
  )
}

const chatStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  height: '40rem',
} as const

export function AiChatExample() {
  return (
    <ComponentBox
      data-visual-test="ai-chat"
      scope={{ chatStyle, copy, thumbs_up, thumbs_down }}
    >
      {() => {
        const suggestions = [
          { label: 'block my visa', prompt: 'Block my Visa card' },
          { label: 'vipps', prompt: 'Help me with Vipps' },
          { label: 'transactions', prompt: 'Show my latest transactions' },
          {
            label: 'compare spending',
            prompt: 'Compare my spending with last month',
          },
        ]
        const reply =
          'You can block your card in the app under **Cards**. Choose the card and press **Block card**. You can order a new card at the same time.'

        // Simulates useChat from @ai-sdk/react
        const Chat = () => {
          const [messages, setMessages] = useState<Array<UIMessage>>([])
          const [status, setStatus] = useState<ChatStatus>('ready')

          const updateReply = (
            text: string,
            state: 'streaming' | 'done'
          ) => {
            setMessages((current) => {
              const parts: UIMessage['parts'] = [
                { type: 'text', text, state },
              ]
              if (state === 'done') {
                parts.push({
                  type: 'source-url',
                  sourceId: '1',
                  url: 'https://www.dnb.no/kort',
                  title: 'Cards',
                })
              }
              return [
                ...current.slice(0, -1),
                { ...current.at(-1), parts },
              ]
            })
          }

          const send = (text: string) => {
            setMessages((current) => [
              ...current,
              {
                id: String(current.length),
                role: 'user',
                parts: [{ type: 'text', text }],
              },
            ])
            setStatus('submitted')
          }

          const stop = () => {
            const last = messages.at(-1)
            const part = last?.parts[0]
            if (last?.role === 'assistant' && part?.type === 'text') {
              updateReply(part.text, 'done')
            }
            setStatus('ready')
          }

          useEffect(() => {
            if (status === 'submitted') {
              const timeout = setTimeout(() => {
                setMessages((current) => [
                  ...current,
                  {
                    id: String(current.length),
                    role: 'assistant',
                    parts: [
                      { type: 'text', text: '', state: 'streaming' },
                    ],
                  },
                ])
                setStatus('streaming')
              }, 1000)
              return () => clearTimeout(timeout)
            }

            if (status === 'streaming') {
              const part = messages.at(-1).parts[0]
              const length = part.type === 'text' ? part.text.length : 0
              const done = length >= reply.length
              const timeout = setTimeout(() => {
                updateReply(
                  reply.slice(0, length + 4),
                  done ? 'done' : 'streaming'
                )
                if (done) {
                  setStatus('ready')
                }
              }, 30)
              return () => clearTimeout(timeout)
            }

            return undefined
          }, [status, messages])

          return (
            <div style={chatStyle}>
              {messages.length === 0 ? (
                <Ai.Welcome
                  title="Welcome, Peter"
                  style={{ margin: 'auto 0' }}
                >
                  <Ai.Suggestions>
                    {suggestions.map(({ label, prompt }) => (
                      <Ai.Suggestion
                        key={label}
                        suggestion={prompt}
                        onClick={({ suggestion }) => send(suggestion)}
                      >
                        {label}
                      </Ai.Suggestion>
                    ))}
                  </Ai.Suggestions>
                </Ai.Welcome>
              ) : (
                <Ai.Conversation style={{ flex: '1 1 auto' }}>
                  <Ai.DateMarker date={new Date()} />
                  <Ai.Disclaimer>
                    Aino is a chatbot for customer service. Do not share
                    personal information with the chatbot. AI-generated
                    answers can contain errors.
                  </Ai.Disclaimer>

                  {messages.map((message) => {
                    const isAssistant = message.role === 'assistant'
                    const isDone =
                      isAssistant &&
                      !(
                        status === 'streaming' &&
                        message === messages.at(-1)
                      )

                    return (
                      <Ai.Message
                        key={message.id}
                        message={message}
                        name={isAssistant ? 'Aino' : 'You'}
                        aiGenerated={isAssistant}
                        actions={
                          isDone && (
                            <Ai.Actions>
                              <Ai.Action icon={copy} label="Copy" />
                              <Ai.Action
                                icon={thumbs_up}
                                label="Good answer"
                              />
                              <Ai.Action
                                icon={thumbs_down}
                                label="Bad answer"
                              />
                            </Ai.Actions>
                          )
                        }
                      />
                    )
                  })}

                  {status === 'submitted' && <Ai.Loader name="Aino" />}
                </Ai.Conversation>
              )}

              <Ai.PromptInput
                status={status}
                characterCounter={111}
                onSubmit={({ value }) => send(value)}
                onStop={stop}
                onAttachmentClick={() => null}
                onMicrophoneClick={() => null}
              />
            </div>
          )
        }

        return <Chat />
      }}
    </ComponentBox>
  )
}

export function AiChatCompact() {
  return (
    <ComponentBox data-visual-test="ai-chat-compact" scope={{ bank }}>
      <Ai.Welcome title="Hello, Peter">
        <Ai.PromptInput
          variant="compact"
          placeholder="Start typing here"
          onAttachmentClick={() => null}
          onMicrophoneClick={() => null}
        />
        <Ai.Suggestions>
          <Ai.Suggestion
            variant="card"
            icon={bank}
            suggestion="Explain my spending this month"
          />
          <Ai.Suggestion
            variant="card"
            icon={bank}
            suggestion="Show my savings goals"
          />
          <Ai.Suggestion
            variant="card"
            icon={bank}
            suggestion="When is my next bill due?"
          />
        </Ai.Suggestions>
      </Ai.Welcome>
    </ComponentBox>
  )
}

export function AiChatConversation() {
  return (
    <ComponentBox
      data-visual-test="ai-chat-conversation"
      scope={{ chatStyle, transfer, pay_from }}
    >
      <div style={chatStyle}>
        <Ai.Conversation style={{ flex: '1 1 auto' }}>
          <Ai.Message
            from="user"
            name="You"
            timestamp="15:23"
            avatar={<Avatar hasLabel>P</Avatar>}
          >
            Hi, I need the payment confirmation for a transfer I made from
            my salary account 12.02
          </Ai.Message>

          <Ai.Message
            name="Aino"
            timestamp="15:24"
            avatar={
              <Avatar variant="secondary" hasLabel>
                A
              </Avatar>
            }
          >
            Hi, it seems you made 2 transfers 12.02. I have provided both
            for you below. Just click the correct one and you will be able
            to get to the payment confirmation.
          </Ai.Message>

          <Ai.Message variant="plain">
            <List.Container>
              <List.Item.Action icon={transfer}>
                <List.Cell.Title>
                  <List.Cell.Title.Overline>
                    (xxxx.xx.xxxxx)
                  </List.Cell.Title.Overline>
                  Intro Aksel
                </List.Cell.Title>
                <List.Cell.End>
                  <NumberFormat.Currency value={-888888} />
                </List.Cell.End>
              </List.Item.Action>
              <List.Item.Action icon={pay_from}>
                <List.Cell.Title>
                  <List.Cell.Title.Overline>
                    (xxxx.xx.xxxxx)
                  </List.Cell.Title.Overline>
                  Kim Olsen
                </List.Cell.Title>
                <List.Cell.End>
                  <NumberFormat.Currency value={-888888} />
                </List.Cell.End>
              </List.Item.Action>
            </List.Container>
          </Ai.Message>
        </Ai.Conversation>

        <Ai.PromptInput
          characterCounter={111}
          onAttachmentClick={() => null}
          onMicrophoneClick={() => null}
        />
      </div>
    </ComponentBox>
  )
}

export function AiToolStates() {
  return (
    <ComponentBox data-visual-test="ai-tool-states">
      <Ai.Tool
        title="Looking up your transactions"
        state="input-available"
      />
      <Ai.Tool
        top
        title="Looking up your transactions"
        state="output-available"
      />
      <Ai.Tool
        top
        title="Blocking your card"
        state="output-error"
        errorText="The card could not be blocked. Try again later."
      />
      <Ai.Tool top title="Blocking your card" state="output-denied" />
    </ComponentBox>
  )
}

const reasoning = `The customer asks about **food** in March.

1. Find the transactions for groceries.
2. Add up the amounts.`

export function AiReasoningStreaming() {
  return (
    <ComponentBox scope={{ reasoning }}>
      {() => {
        const StreamingReasoning = () => {
          const [length, setLength] = useState(0)
          const [replays, setReplays] = useState(0)
          const isStreaming = length < reasoning.length

          useEffect(() => {
            if (!isStreaming) {
              return // stop here
            }
            const timeout = setTimeout(
              () => setLength((current) => current + 2),
              40
            )
            return () => clearTimeout(timeout)
          }, [length, isStreaming])

          return (
            <>
              <Button
                variant="secondary"
                bottom
                onClick={() => {
                  setLength(0)
                  setReplays((current) => current + 1)
                }}
              >
                Replay
              </Button>
              <Ai.Reasoning key={replays} isStreaming={isStreaming}>
                {reasoning.slice(0, length)}
              </Ai.Reasoning>
            </>
          )
        }

        return <StreamingReasoning />
      }}
    </ComponentBox>
  )
}

export function AiReasoningDone() {
  return (
    <ComponentBox data-visual-test="ai-reasoning" scope={{ reasoning }}>
      <Ai.Reasoning>{reasoning}</Ai.Reasoning>
    </ComponentBox>
  )
}

export function AiShimmerExample() {
  return (
    <ComponentBox>
      <Ai.Shimmer>Looking up your transactions …</Ai.Shimmer>
    </ComponentBox>
  )
}
