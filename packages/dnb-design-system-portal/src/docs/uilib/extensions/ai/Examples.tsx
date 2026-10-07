import { Fragment, useEffect, useState } from 'react'
import type { AiMessageData } from '@dnb/eufemia/src/extensions/ai/types'
import { copyToClipboard } from '@dnb/eufemia/src/shared/helpers'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { useChatSimulation } from './useChatSimulation'
import type { Transaction } from './useChatSimulation'
import styled from '@emotion/styled'
import svSE from '@dnb/eufemia/src/shared/locales/sv-SE'
import aiSvSE from '@dnb/eufemia/src/extensions/ai/constants/locales/sv-SE'
import daDK from '@dnb/eufemia/src/shared/locales/da-DK'
import aiDaDK from '@dnb/eufemia/src/extensions/ai/constants/locales/da-DK'
import * as Ai from '@dnb/eufemia/src/extensions/ai'
import '@dnb/eufemia/src/extensions/ai/style'
import {
  ToggleButton,
  Flex,
  Anchor,
  Avatar,
  Button,
  List,
  NumberFormat,
  P,
} from '@dnb/eufemia/src'
import { Provider } from '@dnb/eufemia/src/shared'
import {
  add,
  bank,
  card,
  copy,
  loan,
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

const messages: Array<AiMessageData> = [
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

export function AiMessageDataDemo() {
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

// The chat with a list of the questions next to it on wide screens
const ChatLayout = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;

  & > .chat {
    flex: 1 1 auto;
    min-width: 0;
  }

  & > nav {
    flex: 0 0 14rem;
    max-height: 40rem;
    overflow-y: auto;
  }

  @media (max-width: 60em) {
    & > nav {
      display: none;
    }
  }
`

const chatTranslations = {
  'sv-SE': { ...svSE['sv-SE'], ...aiSvSE['sv-SE'] },
  'da-DK': { ...daDK['da-DK'], ...aiDaDK['da-DK'] },
}

function getText(message: AiMessageData) {
  return message.parts
    .map((part) => (part.type === 'text' ? part.text : ''))
    .filter(Boolean)
    .join('\n\n')
}

// The transactions from a finished getTransactions tool
function getTransactions(message: AiMessageData) {
  const part = message.parts.find(
    (part) => part.type === 'tool-getTransactions'
  )
  if (part && 'state' in part && part.state === 'output-available') {
    return (part.output as { transactions: Array<Transaction> })
      .transactions
  }
  return undefined
}

export function AiChatExample() {
  return (
    <ComponentBox
      data-visual-test="ai-chat"
      scope={{
        useChatSimulation,
        chatStyle,
        ChatLayout,
        chatTranslations,
        getText,
        copyToClipboard,
        getTransactions,
        add,
        bank,
        card,
        copy,
        loan,
        pay_from,
        refresh,
        thumbs_down,
        thumbs_up,
        transfer,
      }}
    >
      {() => {
        const suggestionCards = [
          { icon: card, prompt: 'Block my Visa card' },
          { icon: bank, prompt: 'Compare my spending with last month' },
          { icon: transfer, prompt: 'Show my latest transactions' },
        ]
        const suggestionChips = [
          {
            icon: loan,
            label: 'loan offers',
            prompt: 'What loan offers do you have?',
          },
          {
            label: 'what can you do?',
            prompt: 'What can you help me with?',
          },
        ]
        const ainoAvatar = (
          <Avatar variant="secondary" hasLabel>
            A
          </Avatar>
        )

        const BankingAssistant = () => {
          const [locale, setLocale] = useState('en-GB')
          const [feedback, setFeedback] = useState({})

          const {
            messages,
            status,
            sendMessage,
            stop,
            regenerate,
            setMessages,
          } = useChatSimulation()

          const send = (text) => sendMessage({ text })

          const questions = messages.filter(({ role }) => role === 'user')

          return (
            <Provider locale={locale} translations={chatTranslations}>
              <ChatLayout>
                <section className="chat" style={chatStyle}>
                  <Flex.Horizontal align="center" justify="space-between">
                    <Flex.Horizontal align="center" gap="small">
                      {ainoAvatar}
                      <div>
                        <strong>Aino</strong>
                        <P size="small">DNB Banking Assistant</P>
                      </div>
                    </Flex.Horizontal>

                    <Flex.Horizontal align="center" gap="small">
                      <ToggleButton.Group
                        label="Language"
                        labelSrOnly
                        size="small"
                        value={locale}
                        onChange={({ value }) => setLocale(String(value))}
                      >
                        <ToggleButton value="nb-NO" text="NO" />
                        <ToggleButton value="en-GB" text="EN" />
                        <ToggleButton value="sv-SE" text="SV" />
                        <ToggleButton value="da-DK" text="DK" />
                      </ToggleButton.Group>
                      <Button
                        variant="tertiary"
                        icon={add}
                        iconPosition="left"
                        disabled={messages.length === 0}
                        onClick={() => {
                          stop()
                          setMessages([])
                          setFeedback({})
                        }}
                      >
                        New chat
                      </Button>
                    </Flex.Horizontal>
                  </Flex.Horizontal>

                  {messages.length === 0 ? (
                    <Ai.Welcome
                      title="Hello, Peter"
                      style={{ margin: 'auto 0' }}
                    >
                      <Ai.Suggestions>
                        {suggestionCards.map(({ icon, prompt }) => (
                          <Ai.Suggestion
                            key={prompt}
                            variant="card"
                            icon={icon}
                            suggestion={prompt}
                            onClick={({ suggestion }) => send(suggestion)}
                          />
                        ))}
                      </Ai.Suggestions>
                      <Ai.Suggestions>
                        {suggestionChips.map(({ icon, label, prompt }) => (
                          <Ai.Suggestion
                            key={label}
                            icon={icon}
                            suggestion={prompt}
                            onClick={({ suggestion }) => send(suggestion)}
                          >
                            {label}
                          </Ai.Suggestion>
                        ))}
                      </Ai.Suggestions>
                    </Ai.Welcome>
                  ) : (
                    <Ai.Conversation
                      id="banking-chat"
                      scrollBehavior="end"
                      style={{ flex: '1 1 auto' }}
                    >
                      <Ai.DateMarker date={new Date()} />
                      <Ai.Disclaimer>
                        <P>
                          Aino is a chatbot for customer service. Do not
                          share personal information with the chatbot. Read
                          more about{' '}
                          <Anchor href="https://www.dnb.no/personvern">
                            your privacy
                          </Anchor>
                          .
                        </P>
                        <P top>
                          Some answers are generated with artificial
                          intelligence and are marked with a tag.
                          AI-generated answers can contain errors.
                        </P>
                      </Ai.Disclaimer>

                      {messages.map((message, index) => {
                        const isAssistant = message.role === 'assistant'
                        const isLast = index === messages.length - 1
                        const isDone = !(isLast && status === 'streaming')
                        const transactions = getTransactions(message)

                        const actions = isAssistant && isDone && (
                          <Ai.Actions>
                            <Ai.Action
                              icon={copy}
                              label="Copy"
                              onClick={() =>
                                copyToClipboard(getText(message))
                              }
                            />
                            {message.id in feedback ? (
                              <P size="small">Thanks for your feedback!</P>
                            ) : (
                              <>
                                <Ai.Action
                                  icon={thumbs_up}
                                  label="Good answer"
                                  onClick={() =>
                                    setFeedback((all) => ({
                                      ...all,
                                      [message.id]: true,
                                    }))
                                  }
                                />
                                <Ai.Action
                                  icon={thumbs_down}
                                  label="Bad answer"
                                  onClick={() =>
                                    setFeedback((all) => ({
                                      ...all,
                                      [message.id]: false,
                                    }))
                                  }
                                />
                              </>
                            )}
                            {isLast && (
                              <Ai.Action
                                icon={refresh}
                                label="Regenerate"
                                onClick={regenerate}
                              />
                            )}
                          </Ai.Actions>
                        )

                        return (
                          <Fragment key={message.id}>
                            <Ai.Message
                              message={message}
                              name={isAssistant ? 'Aino' : 'You'}
                              avatar={
                                isAssistant ? (
                                  ainoAvatar
                                ) : (
                                  <Avatar hasLabel>P</Avatar>
                                )
                              }
                              aiGenerated={isAssistant}
                              actions={transactions ? undefined : actions}
                            />

                            {transactions && (
                              <Ai.Message
                                variant="plain"
                                actions={actions}
                              >
                                <List.Container>
                                  {transactions.map(
                                    ({ name, account, date, amount }) => (
                                      <List.Item.Action
                                        key={name}
                                        icon={
                                          amount < 0 ? transfer : pay_from
                                        }
                                        onClick={() =>
                                          send(
                                            `Show the payment confirmation for ${name}`
                                          )
                                        }
                                      >
                                        <List.Cell.Title>
                                          <List.Cell.Title.Overline>
                                            {account} · {date}
                                          </List.Cell.Title.Overline>
                                          {name}
                                        </List.Cell.Title>
                                        <List.Cell.End>
                                          <NumberFormat.Currency
                                            value={amount}
                                          />
                                        </List.Cell.End>
                                      </List.Item.Action>
                                    )
                                  )}
                                </List.Container>
                              </Ai.Message>
                            )}
                          </Fragment>
                        )
                      })}

                      {status === 'submitted' && (
                        <Ai.Loader name="Aino" avatar={ainoAvatar} />
                      )}
                    </Ai.Conversation>
                  )}

                  <Ai.PromptInput
                    status={status}
                    characterCounter={200}
                    onSubmit={({ value }) => send(value)}
                    onStop={stop}
                    onAttachmentClick={() => null}
                    onMicrophoneClick={() => null}
                  />
                </section>

                {questions.length > 1 && (
                  <QuestionOverview questions={questions} />
                )}
              </ChatLayout>
            </Provider>
          )
        }

        // Jump between the questions, and see which one you read
        const QuestionOverview = ({ questions }) => {
          const { scrollToMessage } = Ai.useConversation('banking-chat')
          const { currentTurnId } =
            Ai.useConversationVisibility('banking-chat')

          return (
            <nav aria-label="Questions in this chat">
              <P bottom="x-small">
                <strong>Questions</strong>
              </P>
              <List.Container>
                {questions.map((question) => (
                  <List.Item.Action
                    key={question.id}
                    selected={question.id === currentTurnId}
                    aria-current={
                      question.id === currentTurnId ? 'step' : undefined
                    }
                    onClick={() => scrollToMessage(question.id)}
                  >
                    <List.Cell.Title>{getText(question)}</List.Cell.Title>
                  </List.Item.Action>
                ))}
              </List.Container>
            </nav>
          )
        }

        return <BankingAssistant />
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

export function AiConversationScrollBehavior() {
  return (
    <ComponentBox scope={{ useChatSimulation, chatStyle }}>
      {() => {
        const Chat = () => {
          const [scrollBehavior, setScrollBehavior] = useState<
            'turn' | 'end'
          >('turn')
          const { messages, status, sendMessage, stop } =
            useChatSimulation()

          return (
            <div style={{ ...chatStyle, height: '32rem' }}>
              <ToggleButton.Group
                label="Scroll behavior"
                value={scrollBehavior}
                onChange={({ value }) =>
                  setScrollBehavior(value as 'turn' | 'end')
                }
              >
                <ToggleButton value="turn" text="turn" />
                <ToggleButton value="end" text="end" />
              </ToggleButton.Group>

              <Ai.Conversation
                scrollBehavior={scrollBehavior}
                style={{ flex: '1 1 auto' }}
              >
                {messages.map((message) => (
                  <Ai.Message key={message.id} message={message} />
                ))}
                {status === 'submitted' && <Ai.Loader />}
              </Ai.Conversation>

              <Ai.PromptInput
                variant="compact"
                placeholder="Try: Compare my spending"
                status={status}
                onSubmit={({ value }) => sendMessage({ text: value })}
                onStop={stop}
              />
            </div>
          )
        }

        return <Chat />
      }}
    </ComponentBox>
  )
}

const scrollerReply =
  'You can do it in the app under Cards. Choose the card, and follow the steps. It only takes a minute, and you get a confirmation when it is done.'

export function AiScrollerPeek() {
  return (
    <ComponentBox scope={{ scrollerReply }}>
      {() => {
        const Chat = () => {
          const [peek, setPeek] = useState('3rem')
          const [count, setCount] = useState(2)

          return (
            <>
              <Flex.Horizontal align="center" bottom>
                <ToggleButton.Group
                  label="Peek"
                  value={peek}
                  onChange={({ value }) => setPeek(String(value))}
                >
                  <ToggleButton value="0" text="None" />
                  <ToggleButton value="3rem" text="3rem" />
                  <ToggleButton value="6rem" text="6rem" />
                </ToggleButton.Group>
                <Button
                  variant="secondary"
                  onClick={() => setCount((current) => current + 1)}
                >
                  Ask another question
                </Button>
              </Flex.Horizontal>

              <Ai.Conversation
                style={
                  {
                    height: '18rem',
                    '--ai-conversation-peek': peek,
                  } as React.CSSProperties
                }
              >
                {Array.from({ length: count }, (_, index) => (
                  <Fragment key={index}>
                    <Ai.Message from="user">
                      Question {index + 1}
                    </Ai.Message>
                    <Ai.Message>{scrollerReply}</Ai.Message>
                  </Fragment>
                ))}
              </Ai.Conversation>
            </>
          )
        }

        return <Chat />
      }}
    </ComponentBox>
  )
}

export function AiScrollerOpening() {
  return (
    <ComponentBox scope={{ scrollerReply }}>
      {() => {
        const SavedChat = () => {
          const [scrollBehavior, setScrollBehavior] = useState<
            'turn' | 'end'
          >('turn')

          return (
            <>
              <ToggleButton.Group
                label="Scroll behavior"
                value={scrollBehavior}
                onChange={({ value }) =>
                  setScrollBehavior(value as 'turn' | 'end')
                }
                bottom
              >
                <ToggleButton value="turn" text="turn" />
                <ToggleButton value="end" text="end" />
              </ToggleButton.Group>

              <Ai.Conversation
                key={scrollBehavior}
                scrollBehavior={scrollBehavior}
                style={{ height: '18rem' }}
              >
                {['How do I block my card?', 'Can I order a new one?'].map(
                  (question) => (
                    <Fragment key={question}>
                      <Ai.Message from="user">{question}</Ai.Message>
                      <Ai.Message>
                        <P>{scrollerReply}</P>
                        <P top>{scrollerReply}</P>
                      </Ai.Message>
                    </Fragment>
                  )
                )}
              </Ai.Conversation>
            </>
          )
        }

        return <SavedChat />
      }}
    </ComponentBox>
  )
}

export function AiScrollerHistory() {
  return (
    <ComponentBox scope={{ scrollerReply }}>
      {() => {
        const History = () => {
          const [first, setFirst] = useState(5)
          const turns = Array.from(
            { length: 8 - first },
            (_, index) => first + index
          )

          return (
            <>
              <Button
                variant="secondary"
                bottom
                disabled={first === 1}
                onClick={() =>
                  setFirst((current) => Math.max(1, current - 2))
                }
              >
                Load earlier messages
              </Button>

              <Ai.Conversation style={{ height: '18rem' }}>
                {turns.map((turn) => (
                  <Fragment key={turn}>
                    <Ai.Message from="user">Question {turn}</Ai.Message>
                    <Ai.Message>{scrollerReply}</Ai.Message>
                  </Fragment>
                ))}
              </Ai.Conversation>
            </>
          )
        }

        return <History />
      }}
    </ComponentBox>
  )
}

export function AiScrollerOutline() {
  return (
    <ComponentBox scope={{ scrollerReply }}>
      {() => {
        const questions = [
          { id: 'block', text: 'How do I block my card?' },
          { id: 'order', text: 'Can I order a new card?' },
          { id: 'time', text: 'How long does it take?' },
          { id: 'cost', text: 'Does it cost anything?' },
        ]

        const Outline = () => {
          const { scrollToMessage } = Ai.useConversation('outline-chat')
          const { currentTurnId } =
            Ai.useConversationVisibility('outline-chat')

          return (
            <Flex.Horizontal bottom>
              {questions.map(({ id, text }) => (
                <Button
                  key={id}
                  variant={currentTurnId === id ? 'primary' : 'secondary'}
                  size="medium"
                  aria-current={currentTurnId === id ? 'step' : undefined}
                  onClick={() => scrollToMessage(id)}
                >
                  {text}
                </Button>
              ))}
            </Flex.Horizontal>
          )
        }

        return (
          <>
            <Outline />
            <Ai.Conversation id="outline-chat" style={{ height: '18rem' }}>
              {questions.map(({ id, text }) => (
                <Fragment key={id}>
                  <Ai.Message from="user" id={id}>
                    {text}
                  </Ai.Message>
                  <Ai.Message>{scrollerReply}</Ai.Message>
                </Fragment>
              ))}
            </Ai.Conversation>
          </>
        )
      }}
    </ComponentBox>
  )
}

export function AiScrollerScrollState() {
  return (
    <ComponentBox scope={{ scrollerReply }}>
      {() => {
        const Toolbar = () => {
          const { scrollToStart, scrollToEnd } =
            Ai.useConversation('state-chat')
          const { isAtStart, isAtEnd } =
            Ai.useConversationScrollState('state-chat')

          return (
            <Flex.Horizontal bottom>
              <Button
                variant="secondary"
                disabled={isAtStart}
                onClick={scrollToStart}
              >
                Go to start
              </Button>
              <Button
                variant="secondary"
                disabled={isAtEnd}
                onClick={scrollToEnd}
              >
                Go to end
              </Button>
            </Flex.Horizontal>
          )
        }

        return (
          <>
            <Toolbar />
            <Ai.Conversation id="state-chat" style={{ height: '18rem' }}>
              {Array.from({ length: 4 }, (_, index) => (
                <Fragment key={index}>
                  <Ai.Message from="user">Question {index + 1}</Ai.Message>
                  <Ai.Message>{scrollerReply}</Ai.Message>
                </Fragment>
              ))}
            </Ai.Conversation>
          </>
        )
      }}
    </ComponentBox>
  )
}

export function AiScrollerAnimation() {
  return (
    <ComponentBox scope={{ scrollerReply }}>
      {() => {
        const css = `
          @keyframes my-chat-enter {
            from {
              opacity: 0;
              filter: blur(0.5rem);
            }
          }
          .my-chat--blur .dnb-ai-conversation__content > [data-entering] {
            animation: my-chat-enter 600ms ease-out;
          }
        `

        const Chat = () => {
          const [animation, setAnimation] = useState('fade')
          const [count, setCount] = useState(1)

          return (
            <>
              <style>{css}</style>
              <Flex.Horizontal align="center" bottom>
                <ToggleButton.Group
                  label="Animation"
                  value={animation}
                  onChange={({ value }) => setAnimation(String(value))}
                >
                  <ToggleButton value="fade" text="Fade" />
                  <ToggleButton value="blur" text="Blur" />
                </ToggleButton.Group>
                <Button
                  variant="secondary"
                  onClick={() => setCount((current) => current + 1)}
                >
                  Ask another question
                </Button>
              </Flex.Horizontal>

              <Ai.Conversation
                className={`my-chat--${animation}`}
                style={{ height: '18rem' }}
              >
                {Array.from({ length: count }, (_, index) => (
                  <Fragment key={index}>
                    <Ai.Message from="user">
                      Question {index + 1}
                    </Ai.Message>
                    <Ai.Message>{scrollerReply}</Ai.Message>
                  </Fragment>
                ))}
              </Ai.Conversation>
            </>
          )
        }

        return <Chat />
      }}
    </ComponentBox>
  )
}

export function AiScrollerLongConversation() {
  return (
    <ComponentBox scope={{ scrollerReply }}>
      {() => {
        const turns = Array.from({ length: 500 }, (_, index) => ({
          id: `question-${index + 1}`,
          number: index + 1,
        }))

        const Toolbar = () => {
          const { scrollToStart, scrollToMessage, scrollToEnd } =
            Ai.useConversation('long-chat')
          const { currentTurnId } =
            Ai.useConversationVisibility('long-chat')

          return (
            <Flex.Horizontal align="center" bottom>
              <Button variant="secondary" onClick={scrollToStart}>
                Go to start
              </Button>
              <Button
                variant="secondary"
                onClick={() => scrollToMessage('question-250')}
              >
                Go to question 250
              </Button>
              <Button variant="secondary" onClick={scrollToEnd}>
                Go to end
              </Button>
              <span>
                Reading:{' '}
                {currentTurnId?.replace('question-', 'question ') ?? '–'}
              </span>
            </Flex.Horizontal>
          )
        }

        return (
          <>
            <Toolbar />
            <Ai.Conversation id="long-chat" style={{ height: '24rem' }}>
              {turns.map(({ id, number }) => (
                <Fragment key={id}>
                  <Ai.Message from="user" id={id}>
                    Question {number}
                  </Ai.Message>
                  <Ai.Message>{scrollerReply}</Ai.Message>
                </Fragment>
              ))}
            </Ai.Conversation>
          </>
        )
      }}
    </ComponentBox>
  )
}
