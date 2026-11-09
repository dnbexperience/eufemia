import { Fragment, useEffect, useRef, useState } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { useChatSimulation } from './useChatSimulation'
import ReplyAnnouncement from './ReplyAnnouncement'
import type { DemoMessage, Transaction } from './useChatSimulation'
import styled from '@emotion/styled'
import referenceAvatar from './assets/dnb-reference.svg'
import {
  Action,
  Actions,
  ActivityText,
  Conversation,
  Confirmation,
  DateMarker,
  Info,
  Message,
  MessageIndicator,
  PromptInput,
  Response,
  Sources,
  Suggestion,
  Suggestions,
  Task,
  Welcome,
  useConversation,
  useConversationScrollState,
  useConversationVisibility,
} from '@dnb/eufemia/src/extensions/chat'
import '@dnb/eufemia/src/extensions/chat/style'
import {
  ToggleButton,
  AriaLive,
  Flex,
  Anchor,
  Avatar,
  Button,
  CopyOnClick,
  Dialog,
  List,
  NumberFormat,
  P,
} from '@dnb/eufemia/src'
import { Provider } from '@dnb/eufemia/src/shared'
import {
  add,
  aino,
  customer_service,
  bank,
  card,
  close,
  microphone,
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

export function ChatResponseDefault() {
  return (
    <ComponentBox scope={{ answer }} data-visual-test="ai-response">
      <Response>{answer}</Response>
    </ComponentBox>
  )
}

export function ChatResponseOverflowTable() {
  return (
    <ComponentBox data-visual-test="ai-response-overflow-table">
      <div style={{ maxWidth: '18rem' }}>
        <Response parseIncompleteMarkdown={false}>
          {[
            '| Category | This month | Last month | Difference |',
            '| :-- | --: | --: | --: |',
            '| Groceries | 4 200 kr | 3 900 kr | 300 kr |',
            '| Transport | 1 100 kr | 1 300 kr | -200 kr |',
          ].join('\n')}
        </Response>
      </div>
    </ComponentBox>
  )
}

export function ChatResponseStreaming() {
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
              <Response>{answer.slice(0, length)}</Response>
            </>
          )
        }

        return <StreamingResponse />
      }}
    </ComponentBox>
  )
}

export function ChatResponseImagePolicy() {
  return (
    <ComponentBox data-visual-test="ai-response-image-policy">
      <Response>
        {'![Untrusted image](https://untrusted.example/pixel.png)'}
      </Response>
    </ComponentBox>
  )
}

export function ChatResponseAllowedUrls() {
  return (
    <ComponentBox>
      <Response allowedLinkPrefixes={['https://www.dnb.no']}>
        {
          'Read more on [dnb.no](https://www.dnb.no/), not on [example.com](https://example.com) or [this](javascript:alert(1)).'
        }
      </Response>
    </ComponentBox>
  )
}

const currencyResponse =
  'You spent **12 400,50 kr** and received a refund of **−250,00 NOK**.\n\n| Item | Amount |\n|---|---:|\n| Travel | EUR 199,95 |\n| Books | GBP 25 |\n\nBare numbers like 12345 and ambiguous symbols like $100 stay as text.\n\nPrefix amounts followed by words, such as **EUR 1,5** millones and NOK 150 payable today, also stay as text.'

export function ChatResponseCurrencies() {
  return (
    <ComponentBox
      data-visual-test="ai-response-currencies"
      scope={{ currencyResponse }}
    >
      <Provider locale="nb-NO">
        <Response parseIncompleteMarkdown={false}>
          {currencyResponse}
        </Response>
      </Provider>
    </ComponentBox>
  )
}

export function ChatResponseCurrencyLocale() {
  return (
    <ComponentBox data-visual-test="ai-response-currency-locale">
      <Provider locale="nb-NO">
        <Response
          parseIncompleteMarkdown={false}
          currencyFormatting={{ locale: 'en-GB' }}
        >
          {'The total is USD 1,234.50; the fee is EUR 99.95.'}
        </Response>
      </Provider>
    </ComponentBox>
  )
}

const responseAmount = { value: 1500000000, currency: 'NOK' }

export function ChatResponseStructuredAmount() {
  return (
    <ComponentBox
      data-visual-test="ai-response-structured-amount"
      scope={{ responseAmount }}
    >
      <Provider locale="nb-NO">
        <Message from="assistant">
          <Response currencyFormatting={false}>
            {'The confirmed amount is:'}
          </Response>
          <P>
            <NumberFormat.Currency
              value={responseAmount.value}
              currency={responseAmount.currency}
              decimals={0}
            />
          </P>
        </Message>
      </Provider>
    </ComponentBox>
  )
}

export function ChatResponseCurrencyStreaming() {
  return (
    <ComponentBox data-visual-test="ai-response-currency-streaming">
      {() => {
        const StreamingAmount = () => {
          const text =
            'Your balance is NOK 12 400,50. The refund is 250,00 kr.'
          const [length, setLength] = useState(0)
          useEffect(() => {
            if (length >= text.length) {
              return undefined
            }
            const timeout = setTimeout(() => setLength(length + 1), 100)
            return () => clearTimeout(timeout)
          }, [length, text])
          return (
            <Provider locale="nb-NO">
              <Button
                variant="secondary"
                bottom
                onClick={() => setLength(0)}
              >
                Replay
              </Button>
              <Response parseIncompleteMarkdown={length < text.length}>
                {text.slice(0, length)}
              </Response>
            </Provider>
          )
        }
        return <StreamingAmount />
      }}
    </ComponentBox>
  )
}

export function ChatResponseComponents() {
  return (
    <ComponentBox>
      {() => {
        const Strong = ({ children }) => (
          <strong style={{ color: 'var(--color-sea-green)' }}>
            {children}
          </strong>
        )

        return (
          <Response components={{ strong: Strong }}>
            {'This answer uses a **custom** element for **bold** text.'}
          </Response>
        )
      }}
    </ComponentBox>
  )
}

export function ChatMessagePlain() {
  return (
    <ComponentBox data-visual-test="ai-message-plain">
      <Message
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
        <Response>
          {
            'It seems you made **2 transfers** 12.02. Choose the correct one below.'
          }
        </Response>
      </Message>
    </ComponentBox>
  )
}

export function ChatMessageActions() {
  return (
    <ComponentBox
      data-visual-test="ai-message-actions"
      scope={{ thumbs_up, thumbs_down }}
    >
      {() => {
        const Feedback = () => {
          const [feedback, setFeedback] = useState<
            'positive' | 'negative' | null
          >(null)

          return (
            <Message
              name="Aino"
              actions={
                <Actions role="group" aria-label="Answer feedback">
                  <CopyOnClick.Button
                    size="small"
                    iconSize="default"
                    bounding
                    copyContent="Your card is now blocked."
                    title="Copy answer"
                    tooltip="Copy answer"
                  />
                  <Action
                    icon={thumbs_up}
                    label="Good answer"
                    selected={feedback === 'positive'}
                    onClick={() =>
                      setFeedback(
                        feedback === 'positive' ? null : 'positive'
                      )
                    }
                  />
                  <Action
                    icon={thumbs_down}
                    label="Bad answer"
                    selected={feedback === 'negative'}
                    onClick={() =>
                      setFeedback(
                        feedback === 'negative' ? null : 'negative'
                      )
                    }
                  />
                </Actions>
              }
            >
              Your card is now blocked.
            </Message>
          )
        }

        return <Feedback />
      }}
    </ComponentBox>
  )
}

export function ChatMessageIndicatorExample() {
  return (
    <ComponentBox data-visual-test="ai-message-indicator">
      <MessageIndicator
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

export function ChatMessageComposition() {
  return (
    <ComponentBox>
      <Message from="user">What did I spend on food?</Message>
      <Message>
        <Task title="Checking your transactions" status="done" />
        <Response parseIncompleteMarkdown={false}>
          You spent **4 200 kr** on groceries in March.
        </Response>
        <Sources
          sources={[
            {
              url: 'https://www.dnb.no/privat/dagligbank',
              title: 'Everyday banking',
            },
          ]}
        />
      </Message>
    </ComponentBox>
  )
}

export function ChatPromptInputDefault() {
  return (
    <ComponentBox data-visual-test="ai-prompt-input-default">
      <PromptInput characterCounter={111} />
    </ComponentBox>
  )
}

export function ChatPromptInputCompact() {
  return (
    <ComponentBox data-visual-test="ai-prompt-input-compact">
      <PromptInput variant="compact" placeholder="Ask Aino" />
    </ComponentBox>
  )
}

export function ChatPromptInputInline() {
  return (
    <ComponentBox data-visual-test="ai-prompt-input-inline">
      <PromptInput
        variant="compact"
        dropShadow={false}
        placeholder="Ask Aino"
      />
    </ComponentBox>
  )
}

export function ChatPromptInputCustomActions() {
  return (
    <ComponentBox
      data-visual-test="ai-prompt-input-custom"
      scope={{ add, microphone, close }}
    >
      {() => {
        const CustomActions = () => {
          const [value, setValue] = useState('')
          const [hasAttachment, setHasAttachment] = useState(false)
          return (
            <PromptInput
              icon={null}
              value={value}
              onChange={({ value }) => setValue(value)}
              onSubmit={() => setValue('')}
              startActions={
                <Button
                  type="button"
                  variant="tertiary"
                  bounding
                  icon={add}
                  iconSize="default"
                  aria-label="Add attachment"
                  tooltip="Add attachment"
                  disabled={hasAttachment}
                  onClick={() => setHasAttachment(true)}
                />
              }
              endActions={
                <Button
                  type="button"
                  variant="tertiary"
                  bounding
                  icon={microphone}
                  iconSize="default"
                  aria-label="Use microphone"
                  tooltip="Use microphone"
                  onClick={() => setValue('Show my latest transactions')}
                />
              }
            >
              {hasAttachment && (
                <Button
                  type="button"
                  variant="tertiary"
                  bounding
                  icon={close}
                  iconSize="default"
                  text="Budget.pdf"
                  aria-label="Remove Budget.pdf"
                  onClick={() => setHasAttachment(false)}
                />
              )}
            </PromptInput>
          )
        }
        return <CustomActions />
      }}
    </ComponentBox>
  )
}

export function ChatPromptInputCustomActionsCompact() {
  return (
    <ComponentBox
      data-visual-test="ai-prompt-input-custom-compact"
      scope={{ add, microphone, close }}
    >
      {() => {
        const CustomActions = () => {
          const [value, setValue] = useState('')
          const [hasAttachment, setHasAttachment] = useState(false)
          return (
            <PromptInput
              variant="compact"
              icon={null}
              value={value}
              onChange={({ value }) => setValue(value)}
              onSubmit={() => setValue('')}
              startActions={
                <Button
                  type="button"
                  variant="tertiary"
                  bounding
                  icon={add}
                  iconSize="default"
                  aria-label="Add attachment"
                  tooltip="Add attachment"
                  disabled={hasAttachment}
                  onClick={() => setHasAttachment(true)}
                />
              }
              endActions={
                <Button
                  type="button"
                  variant="tertiary"
                  bounding
                  icon={microphone}
                  iconSize="default"
                  aria-label="Use microphone"
                  tooltip="Use microphone"
                  onClick={() => setValue('Show my latest transactions')}
                />
              }
            >
              {hasAttachment && (
                <Button
                  type="button"
                  variant="tertiary"
                  bounding
                  icon={close}
                  iconSize="default"
                  text="Budget.pdf"
                  aria-label="Remove Budget.pdf"
                  onClick={() => setHasAttachment(false)}
                />
              )}
            </PromptInput>
          )
        }
        return <CustomActions />
      }}
    </ComponentBox>
  )
}

export function ChatPromptInputContext() {
  return (
    <ComponentBox
      data-visual-test="ai-prompt-input-context"
      scope={{ add, close, referenceAvatar }}
    >
      {() => {
        const ContextChip = styled.div`
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0.5rem;
          background: var(--token-color-background-neutral-subtle);
          border: 0.0625rem solid var(--token-color-stroke-neutral-subtle);
          border-radius: 0.5rem;
        `
        const InputWithContext = () => {
          const [hasReference, setHasReference] = useState(true)
          const [value, setValue] = useState(
            'Add the companies from the attached document to my watchlist.'
          )
          return (
            <PromptInput
              dropShadow
              value={value}
              onChange={({ value }) => setValue(value)}
              onSubmit={() => setValue('')}
              startActions={
                <Button
                  type="button"
                  variant="tertiary"
                  size="small"
                  icon={add}
                  iconSize="default"
                  aria-label="Add reference"
                  tooltip="Add reference"
                  disabled={hasReference}
                  onClick={() => setHasReference(true)}
                />
              }
            >
              {hasReference && (
                <ContextChip>
                  <Avatar size="small" src={referenceAvatar} aria-hidden />
                  <span>dnb.no/...Insurance</span>
                  <Button
                    type="button"
                    variant="tertiary"
                    size="small"
                    icon={close}
                    iconSize="default"
                    aria-label="Remove reference"
                    onClick={() => setHasReference(false)}
                  />
                </ContextChip>
              )}
            </PromptInput>
          )
        }
        return <InputWithContext />
      }}
    </ComponentBox>
  )
}

export function ChatPromptInputBusy() {
  return (
    <ComponentBox data-visual-test="ai-prompt-input-busy">
      {() => {
        const ChatDemo = () => {
          const [isBusy, setIsBusy] = useState(false)

          useEffect(() => {
            if (!isBusy) {
              return // stop here
            }
            const timeout = setTimeout(() => setIsBusy(false), 4000)
            return () => clearTimeout(timeout)
          }, [isBusy])

          return (
            <PromptInput
              variant="compact"
              isBusy={isBusy}
              onSubmit={() => setIsBusy(true)}
              onStop={() => setIsBusy(false)}
            />
          )
        }

        return <ChatDemo />
      }}
    </ComponentBox>
  )
}

export function ChatPromptInputBusyDefault() {
  return (
    <ComponentBox data-visual-test="ai-prompt-input-busy-default">
      {() => {
        const ChatDemo = () => {
          const [isBusy, setIsBusy] = useState(false)

          useEffect(() => {
            if (!isBusy) {
              return // stop here
            }
            const timeout = setTimeout(() => setIsBusy(false), 4000)
            return () => clearTimeout(timeout)
          }, [isBusy])

          return (
            <PromptInput
              isBusy={isBusy}
              onSubmit={() => setIsBusy(true)}
              onStop={() => setIsBusy(false)}
            />
          )
        }

        return <ChatDemo />
      }}
    </ComponentBox>
  )
}

export function ChatPromptInputError() {
  return (
    <ComponentBox data-visual-test="ai-prompt-input-error">
      <PromptInput
        textareaProps={{
          status: 'The message could not be sent. Try again.',
        }}
      />
    </ComponentBox>
  )
}

export function ChatPromptInputDisabled() {
  return (
    <ComponentBox data-visual-test="ai-prompt-input-disabled">
      <PromptInput
        disabled
        value="Message unavailable"
        startActions={
          <Button
            type="button"
            variant="tertiary"
            size="small"
            text="Add reference"
            disabled
          />
        }
      />
    </ComponentBox>
  )
}

export function ChatConversationExample() {
  return (
    <ComponentBox data-visual-test="ai-conversation">
      <Conversation style={{ height: '24rem' }}>
        <DateMarker date="2026-02-02" />
        <Info>
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
        </Info>
        <Message name="Aino" timestamp="14:32">
          Hi, I am Aino, the digital assistant of DNB.
        </Message>
        <Message>How can I help you?</Message>
        <Message from="user" name="You" timestamp="14:33">
          I see an amount withdrawn from my account that I do not
          recognize. Can you help me find out what it is?
        </Message>
        <Message name="Aino" timestamp="14:33" aiGenerated>
          Of course. Choose the transaction you want to know more about,
          and I will show you the details.
        </Message>
      </Conversation>
    </ComponentBox>
  )
}

export function ChatWelcomeChips() {
  return (
    <ComponentBox data-visual-test="ai-welcome-chips" scope={{ aino }}>
      <Welcome
        greeting="Hi Matthias"
        avatar={<Avatar size="small" icon={aino} hasLabel />}
        title="Where do you want to start today?"
      >
        <Suggestions>
          <Suggestion suggestion="Make a transfer" />
          <Suggestion suggestion="Look at my spendings" />
          <Suggestion suggestion="Pay a bill" />
        </Suggestions>
      </Welcome>
    </ComponentBox>
  )
}

export function ChatWelcomeLongLabels() {
  return (
    <ComponentBox
      data-visual-test="ai-welcome-long-labels"
      scope={{ aino }}
    >
      <Welcome
        style={{ width: '13.75rem', maxWidth: '100%' }}
        greeting="Hei Matthias"
        avatar={<Avatar size="small" icon={aino} hasLabel />}
        title="Hva vil du gjøre i dag?"
      >
        <Suggestions>
          <Suggestion suggestion="Vis betalingsoppdragsoversikten" />
          <Suggestion suggestion="Hjelp meg å forstå forbruket mitt denne måneden" />
        </Suggestions>
      </Welcome>
    </ComponentBox>
  )
}

export function ChatSuggestionChips() {
  return (
    <ComponentBox data-visual-test="ai-suggestion-chips">
      <Suggestions>
        <Suggestion suggestion="Block my Visa card">
          block my visa
        </Suggestion>
        <Suggestion suggestion="Show my latest transactions">
          transactions
        </Suggestion>
      </Suggestions>
    </ComponentBox>
  )
}

export function ChatDateMarkerExample() {
  return (
    <ComponentBox data-visual-test="ai-date-marker">
      <DateMarker date="2026-02-02" />
      <DateMarker>Today</DateMarker>
    </ComponentBox>
  )
}

export function ChatInfoExample() {
  return (
    <ComponentBox data-visual-test="ai-info">
      <Info>
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
      </Info>
    </ComponentBox>
  )
}

export function ChatSourcesExample() {
  return (
    <ComponentBox data-visual-test="ai-sources">
      <Message name="Aino" aiGenerated>
        <Response>
          {'You can block your card in the app under **Cards**.'}
        </Response>
      </Message>
      <Sources
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

function DemoMessageContent({ message }: { message: DemoMessage }) {
  if (message.role === 'user') {
    return (
      <span style={{ whiteSpace: 'pre-wrap' }}>{getText(message)}</span>
    )
  }

  return (
    <>
      {message.parts.map((part, index) => {
        switch (part.type) {
          case 'text':
            return (
              <Response
                key={index}
                parseIncompleteMarkdown={part.isStreaming}
              >
                {part.text}
              </Response>
            )
          case 'tool':
            return (
              <Task
                key={index}
                title={part.title}
                status={part.status}
                errorText={part.errorText}
              />
            )
          default:
            return null
        }
      })}
      <Sources
        sources={message.parts.flatMap((part) =>
          part.type === 'source'
            ? [{ url: part.url, title: part.title }]
            : []
        )}
      />
    </>
  )
}

function getText(message: DemoMessage) {
  return message.parts
    .map((part) => (part.type === 'text' ? part.text : ''))
    .filter(Boolean)
    .join('\n\n')
}

// The transactions from a finished getTransactions tool
function getTransactions(message: DemoMessage) {
  const part = message.parts.find(
    (part) => part.type === 'tool' && part.name === 'getTransactions'
  )
  if (part?.type === 'tool' && part.status === 'done') {
    return (part.output as { transactions: Array<Transaction> })
      .transactions
  }
  return undefined
}

export function HumanSupportChat() {
  return (
    <ComponentBox
      data-visual-test="chat-human-support"
      scope={{ customer_service }}
    >
      {() => {
        const SupportChat = () => {
          const [messages, setMessages] = useState<
            Array<{ id: string; from: 'user' | 'assistant'; text: string }>
          >([
            {
              id: 'welcome',
              from: 'assistant' as const,
              text: 'Hi! My name is Sara. How can I help you today?',
            },
          ])

          return (
            <Flex.Stack>
              <Conversation
                label="Chat with customer support"
                scrollBehavior="end"
                style={{ height: '16rem' }}
              >
                {messages.map((message) => (
                  <Message
                    key={message.id}
                    from={message.from}
                    name={
                      message.from === 'user'
                        ? 'You'
                        : 'Sara, customer support'
                    }
                    avatar={
                      message.from === 'assistant' ? (
                        <Avatar icon={customer_service} hasLabel />
                      ) : undefined
                    }
                  >
                    {message.text}
                  </Message>
                ))}
              </Conversation>
              <PromptInput
                label="Message to customer support"
                placeholder="Write a message to Sara"
                onSubmit={({ value }) =>
                  setMessages((current) => [
                    ...current,
                    {
                      id: String(current.length),
                      from: 'user',
                      text: value,
                    },
                  ])
                }
              />
              <P size="small">
                This local demo adds your messages. A support adviser is
                not connected.
              </P>
            </Flex.Stack>
          )
        }

        return <SupportChat />
      }}
    </ComponentBox>
  )
}

export function ChatExample() {
  return (
    <ComponentBox
      data-visual-test="ai-chat"
      scope={{
        useChatSimulation,
        ReplyAnnouncement,
        DemoMessageContent,
        chatStyle,
        ChatLayout,
        getText,
        getTransactions,
        aino,
        add,
        bank,
        card,
        loan,
        pay_from,
        refresh,
        thumbs_down,
        thumbs_up,
        transfer,
      }}
    >
      {() => {
        const primarySuggestions = [
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
        const ainoAvatar = <Avatar size="small" icon={aino} hasLabel />

        const BankingAssistant = () => {
          const [chatStarted, setChatStarted] = useState(false)
          const [draft, setDraft] = useState('')
          const promptRef = useRef<HTMLTextAreaElement>(null)
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
            <Provider locale="en-GB">
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

                    <Button
                      variant="tertiary"
                      icon={add}
                      iconPosition="left"
                      onClick={() => {
                        setMessages([])
                        setFeedback({})
                        setDraft('')
                        setChatStarted(true)
                        promptRef.current?.focus()
                      }}
                    >
                      New chat
                    </Button>
                  </Flex.Horizontal>

                  {!chatStarted && messages.length === 0 ? (
                    <Welcome
                      greeting="Hello, Peter"
                      avatar={<Avatar size="small" icon={aino} hasLabel />}
                      title="Where do you want to start today?"
                      style={{ margin: 'auto 0' }}
                    >
                      <Suggestions>
                        {primarySuggestions.map(({ icon, prompt }) => (
                          <Suggestion
                            key={prompt}
                            icon={icon}
                            suggestion={prompt}
                            onClick={({ suggestion }) => {
                              send(suggestion)
                              promptRef.current?.focus()
                            }}
                          />
                        ))}
                      </Suggestions>
                      <Suggestions>
                        {suggestionChips.map(({ icon, label, prompt }) => (
                          <Suggestion
                            key={label}
                            icon={icon}
                            suggestion={prompt}
                            onClick={({ suggestion }) => {
                              send(suggestion)
                              promptRef.current?.focus()
                            }}
                          >
                            {label}
                          </Suggestion>
                        ))}
                      </Suggestions>
                    </Welcome>
                  ) : (
                    <Conversation
                      id="banking-chat"
                      aria-live="off"
                      scrollBehavior="end"
                      style={{ flex: '1 1 auto' }}
                    >
                      <DateMarker date={new Date()} />
                      <Info>
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
                      </Info>

                      {messages.map((message, index) => {
                        const isAssistant = message.role === 'assistant'
                        const isLast = index === messages.length - 1
                        const isDone = !(isLast && status === 'streaming')
                        const transactions = getTransactions(message)

                        const actions = isAssistant && isDone && (
                          <Actions>
                            <CopyOnClick.Button
                              size="small"
                              iconSize="default"
                              bounding
                              copyContent={getText(message)}
                              title="Copy response"
                              tooltip="Copy response"
                            />
                            <Action
                              icon={thumbs_up}
                              label="Good answer"
                              selected={feedback[message.id] === true}
                              onClick={() =>
                                setFeedback((all) => ({
                                  ...all,
                                  [message.id]:
                                    all[message.id] === true
                                      ? undefined
                                      : true,
                                }))
                              }
                            />
                            <Action
                              icon={thumbs_down}
                              label="Bad answer"
                              selected={feedback[message.id] === false}
                              onClick={() =>
                                setFeedback((all) => ({
                                  ...all,
                                  [message.id]:
                                    all[message.id] === false
                                      ? undefined
                                      : false,
                                }))
                              }
                            />
                            {isLast && (
                              <Action
                                icon={refresh}
                                label="Regenerate"
                                onClick={() => {
                                  regenerate()
                                  promptRef.current?.focus()
                                }}
                              />
                            )}
                          </Actions>
                        )

                        return (
                          <Fragment key={message.id}>
                            <Message
                              id={message.id}
                              from={message.role}
                              aria-label={isAssistant ? 'Aino' : 'You'}
                              grouped={
                                isAssistant &&
                                messages[index - 1]?.role === 'assistant'
                              }
                              avatar={isAssistant ? ainoAvatar : undefined}
                              aiGenerated={isAssistant}
                              actions={transactions ? undefined : actions}
                            >
                              <DemoMessageContent message={message} />
                              {message.stopped && (
                                <P size="small">Reply stopped.</P>
                              )}
                            </Message>

                            {transactions && (
                              <Message variant="plain" actions={actions}>
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
                              </Message>
                            )}
                          </Fragment>
                        )
                      })}

                      {status === 'submitted' && (
                        <MessageIndicator
                          name="Aino"
                          avatar={ainoAvatar}
                        />
                      )}
                    </Conversation>
                  )}
                  <ReplyAnnouncement
                    isBusy={status !== 'ready'}
                    messageId={
                      messages.at(-1)?.role === 'assistant'
                        ? messages.at(-1).id
                        : undefined
                    }
                    outcome={
                      messages.at(-1)?.stopped
                        ? 'Reply stopped.'
                        : undefined
                    }
                  />

                  <PromptInput
                    value={draft}
                    textareaProps={{ ref: promptRef }}
                    onChange={({ value }) => setDraft(value)}
                    isBusy={
                      status === 'submitted' || status === 'streaming'
                    }
                    characterCounter={200}
                    onSubmit={({ value }) => {
                      send(value)
                      setDraft('')
                    }}
                    onStop={stop}
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
          const { scrollToMessage } = useConversation('banking-chat')
          const { currentTurnId } =
            useConversationVisibility('banking-chat')

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

export function ChatWindow() {
  return (
    <ComponentBox
      data-visual-test="ai-chat-window"
      scope={{ aino, customer_service }}
    >
      <Dialog
        restoreFocusTo={() =>
          document.getElementById('ai-chat-window-trigger')
        }
        trigger={(props) => (
          <Button {...props} id="ai-chat-window-trigger">
            Open chat window
          </Button>
        )}
        minWidth="23rem"
        maxWidth="23rem"
        title="Chat with DNB"
      >
        <Flex.Stack
          gap="small"
          style={{ height: 'min(38rem, 65dvh)', minHeight: '18rem' }}
        >
          <Conversation
            scrollBehavior="end"
            aria-live="off"
            style={{ flex: '1 1 auto' }}
          >
            <Message from="user">Can I speak to a person?</Message>
            <Message
              aria-label="Aino"
              avatar={<Avatar size="small" icon={aino} hasLabel />}
            >
              I will connect you to customer service.
            </Message>
            <Message
              aria-label="Maria, customer service"
              avatar={
                <Avatar size="small" icon={customer_service} hasLabel />
              }
            >
              Hello, I am Maria from DNB. How can I help?
            </Message>
          </Conversation>
          <Suggestions aria-label="Suggested replies">
            <Suggestion suggestion="Help with a payment" />
            <Suggestion suggestion="Help with my card" />
          </Suggestions>
          <PromptInput
            style={
              {
                '--ai-prompt-input-radius': 'var(--token-radius-lg)',
              } as React.CSSProperties
            }
          />
        </Flex.Stack>
      </Dialog>
    </ComponentBox>
  )
}

export function ChatMessageDesign() {
  return (
    <ComponentBox
      data-visual-test="ai-message-design"
      scope={{ aino, customer_service }}
    >
      <Conversation
        scrollBehavior="end"
        style={{ height: '24rem', maxWidth: '23rem' }}
      >
        <Message from="user">Chatmessage from the user.</Message>
        <Message
          aria-label="Aino"
          avatar={<Avatar size="small" icon={aino} hasLabel />}
        >
          Chatmessage from a bot.
          <br />
          Beep-bop.
        </Message>
        <Message
          grouped
          avatar={<Avatar size="small" icon={aino} hasLabel />}
        >
          <Response>More information from the same bot.</Response>
        </Message>
        <Message from="user">
          Thanks. This longer message wraps before reaching the opposite
          edge of the conversation.
        </Message>
        <Message
          avatar={<Avatar size="small" icon={customer_service} hasLabel />}
        >
          Hello from customer service.
        </Message>
      </Conversation>
    </ComponentBox>
  )
}

export function ChatCompact() {
  return (
    <ComponentBox
      data-visual-test="ai-chat-compact"
      scope={{ bank, aino }}
    >
      <Welcome
        greeting="Hello, Peter"
        avatar={<Avatar size="small" icon={aino} hasLabel />}
        title="Where do you want to start today?"
      >
        <Suggestions>
          <Suggestion
            icon={bank}
            suggestion="Explain my spending this month"
          />
          <Suggestion icon={bank} suggestion="Show my savings goals" />
          <Suggestion icon={bank} suggestion="When is my next bill due?" />
        </Suggestions>
        <PromptInput variant="compact" placeholder="Start typing here" />
      </Welcome>
    </ComponentBox>
  )
}

export function ChatConversation() {
  return (
    <ComponentBox
      data-visual-test="ai-chat-conversation"
      scope={{ chatStyle, transfer, pay_from }}
    >
      <div style={chatStyle}>
        <Conversation style={{ flex: '1 1 auto' }}>
          <Message
            from="user"
            name="You"
            timestamp="15:23"
            avatar={<Avatar hasLabel>P</Avatar>}
          >
            Hi, I need the payment confirmation for a transfer I made from
            my salary account 12.02
          </Message>

          <Message
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
          </Message>

          <Message variant="plain">
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
          </Message>
        </Conversation>

        <PromptInput characterCounter={111} />
      </div>
    </ComponentBox>
  )
}

export function ChatTaskStates() {
  return (
    <ComponentBox data-visual-test="ai-task-states">
      <Task title="Looking up your transactions" status="running" />
      <Task top title="Blocking your card" status="awaiting" />
      <Task top title="Looking up your transactions" status="done">
        <P space={0}>Your latest transactions are ready.</P>
      </Task>
      <Task
        top
        title="Blocking your card"
        status="error"
        errorText="The card could not be blocked. Try again later."
      />
      <Task top title="Blocking your card" status="canceled" />
    </ComponentBox>
  )
}

export function ChatConfirmationStates() {
  return (
    <ComponentBox data-visual-test="ai-confirmation-states">
      <Provider locale="en-GB">
        <Flex.Vertical gap="medium" style={{ maxWidth: '32.6875rem' }}>
          {(['pending', 'required', 'confirmed', 'expired'] as const).map(
            (status) => (
              <Confirmation
                key={status}
                title="Share history?"
                status={status}
                onConfirm={() => null}
                onDecline={() => null}
              >
                Do you want to give the customer advisor access to this
                conversation’s history?
              </Confirmation>
            )
          )}
        </Flex.Vertical>
      </Provider>
    </ComponentBox>
  )
}

export function ChatConfirmationInteractive() {
  return (
    <ComponentBox data-visual-test="ai-confirmation-interactive">
      {() => {
        const Decision = () => {
          const [status, setStatus] = useState<
            'required' | 'confirmed' | 'declined'
          >('required')

          return (
            <>
              <Confirmation
                title="Add these companies to your watchlist?"
                status={status}
                onConfirm={() => setStatus('confirmed')}
                onDecline={() => setStatus('declined')}
                confirmLabel="Add to watchlist"
                declineLabel="Keep current list"
              >
                Review the companies from the attached document before
                continuing.
              </Confirmation>
              <Button top onClick={() => setStatus('required')}>
                Reset decision
              </Button>
            </>
          )
        }

        return <Decision />
      }}
    </ComponentBox>
  )
}

export function ChatConfirmationExpiry() {
  return (
    <ComponentBox data-visual-test="ai-confirmation-expiry">
      {() => {
        const TimedDecision = () => {
          const [status, setStatus] = useState<
            'expired' | 'required' | 'confirmed' | 'declined'
          >('expired')
          const startRef = useRef<HTMLButtonElement>(null)
          const [deadline, setDeadline] = useState<number>(null)
          const [now, setNow] = useState(Date.now())
          useEffect(() => {
            if (status !== 'required' || deadline === null) {
              return undefined
            }
            const update = () => {
              const time = Date.now()
              setNow(time)
              if (time >= deadline) {
                const focused = document.activeElement
                if (
                  focused instanceof HTMLElement &&
                  focused.closest(
                    '[data-visual-test="ai-confirmation-expiry"]'
                  ) &&
                  !focused.closest('.dnb-ai-confirmation')
                ) {
                  startRef.current?.focus()
                }
                setStatus('expired')
              }
            }
            const interval = setInterval(update, 1000)
            update()
            return () => clearInterval(interval)
          }, [status, deadline])
          return (
            <>
              <Flex.Horizontal bottom>
                <Button
                  ref={startRef}
                  onClick={() => {
                    setNow(Date.now())
                    setDeadline(Date.now() + 60000)
                    setStatus('required')
                  }}
                >
                  {status === 'required'
                    ? 'Restart request'
                    : 'Start a request'}
                </Button>
                {status === 'required' && deadline !== null && (
                  <>
                    <Button
                      onClick={() => setDeadline(Date.now() + 60000)}
                    >
                      Extend by one minute
                    </Button>
                    <Button
                      onClick={() => {
                        setDeadline(null)
                        startRef.current?.focus()
                      }}
                    >
                      Turn off time limit
                    </Button>
                  </>
                )}
              </Flex.Horizontal>
              <Confirmation
                title="Continue with this request?"
                status={status}
                onConfirm={() => setStatus('confirmed')}
                onDecline={() => setStatus('declined')}
              >
                {status === 'required' && deadline !== null
                  ? 'You have ' +
                    Math.max(0, Math.ceil((deadline - now) / 1000)) +
                    ' seconds. Extend or turn off the limit if you need more time.'
                  : 'Review the request before continuing.'}
              </Confirmation>
              <AriaLive>
                {status === 'required' &&
                deadline !== null &&
                deadline - now <= 30000
                  ? 'This request expires soon. Extend or turn off the time limit using the buttons above.'
                  : ''}
              </AriaLive>
            </>
          )
        }

        return <TimedDecision />
      }}
    </ComponentBox>
  )
}

export function ChatActivityTextExample() {
  return (
    <ComponentBox>
      <ActivityText>Looking up your transactions …</ActivityText>
    </ComponentBox>
  )
}

export function ChatActivityTextAnnouncement() {
  return (
    <ComponentBox>
      {() => {
        const Activity = () => {
          const [text, setText] = useState('Ready')
          return (
            <>
              <AriaLive variant="content" atomic>
                <ActivityText>{text}</ActivityText>
              </AriaLive>
              <Button
                top
                onClick={() =>
                  setText(
                    text === 'Ready'
                      ? 'Looking up your transactions …'
                      : 'Ready'
                  )
                }
              >
                Change activity
              </Button>
            </>
          )
        }
        return <Activity />
      }}
    </ComponentBox>
  )
}

export function ChatAnnouncements() {
  return (
    <ComponentBox
      data-visual-test="ai-chat-announcements"
      scope={{
        useChatSimulation,
        DemoMessageContent,
        ReplyAnnouncement,
      }}
    >
      {() => {
        const ChatDemo = () => {
          const { messages, status, sendMessage, stop } =
            useChatSimulation()
          const isBusy = status !== 'ready'
          const reply = messages.at(-1)
          return (
            <>
              <Conversation aria-live="off" style={{ height: '18rem' }}>
                {messages.map((message) => (
                  <Message
                    key={message.id}
                    id={message.id}
                    from={message.role}
                  >
                    <DemoMessageContent message={message} />
                    {message.stopped && <P size="small">Reply stopped.</P>}
                  </Message>
                ))}
              </Conversation>
              <ReplyAnnouncement
                isBusy={isBusy}
                messageId={
                  reply?.role === 'assistant' ? reply.id : undefined
                }
                outcome={reply?.stopped ? 'Reply stopped.' : undefined}
              />
              <PromptInput
                isBusy={isBusy}
                onSubmit={({ value }) => {
                  sendMessage({ text: value })
                }}
                onStop={() => {
                  stop()
                }}
              />
            </>
          )
        }
        return <ChatDemo />
      }}
    </ComponentBox>
  )
}

export function ChatConversationReading() {
  return (
    <ComponentBox data-visual-test="ai-conversation-reading">
      {() => {
        const UnreadState = () => {
          const { hasUnreadMessages } =
            useConversationScrollState('reading-chat')
          return <P>Unread messages: {hasUnreadMessages ? 'yes' : 'no'}</P>
        }
        const Reading = () => {
          const [messages, setMessages] = useState(
            Array.from({ length: 12 }, (_, index) => ({
              id: 'reading-' + index,
              from: index % 2 ? ('assistant' as const) : ('user' as const),
              text: (
                'Message ' +
                index +
                '. Read earlier messages while the reply grows. '
              ).repeat(4),
            }))
          )
          return (
            <>
              <Flex.Horizontal bottom>
                <Button
                  onClick={() =>
                    setMessages((current) =>
                      current.map((message, index) =>
                        index === current.length - 1
                          ? {
                              ...message,
                              text:
                                message.text +
                                ' More reply content.'.repeat(12),
                            }
                          : message
                      )
                    )
                  }
                >
                  Extend reply
                </Button>
                <Button
                  onClick={() =>
                    setMessages((current) => [
                      ...current,
                      {
                        id: 'reading-' + current.length,
                        from: 'assistant',
                        text: 'A new message from customer service.',
                      },
                    ])
                  }
                >
                  Receive message
                </Button>
              </Flex.Horizontal>
              <UnreadState />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  height: '28rem',
                }}
              >
                <Conversation
                  id="reading-chat"
                  scrollBehavior="end"
                  aria-live="off"
                  style={{ flex: '1 1 auto' }}
                >
                  {messages.map((message) => (
                    <Message
                      key={message.id}
                      id={message.id}
                      from={message.from}
                      actions={
                        message.from === 'assistant' && (
                          <Button size="small">Reply details</Button>
                        )
                      }
                    >
                      {message.text}
                    </Message>
                  ))}
                </Conversation>
                <PromptInput
                  onSubmit={({ value }) =>
                    setMessages((current) => [
                      ...current,
                      {
                        id: 'reading-' + current.length,
                        from: 'user',
                        text: value,
                      },
                      {
                        id: 'reading-' + (current.length + 1),
                        from: 'assistant',
                        text: 'Your next reply starts here.',
                      },
                    ])
                  }
                />
              </div>
            </>
          )
        }
        return <Reading />
      }}
    </ComponentBox>
  )
}

export function ChatConversationScrollBehavior() {
  return (
    <ComponentBox
      scope={{ useChatSimulation, chatStyle, DemoMessageContent }}
    >
      {() => {
        const ChatDemo = () => {
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

              <Conversation
                scrollBehavior={scrollBehavior}
                style={{ flex: '1 1 auto' }}
              >
                {messages.map((message) => (
                  <Message
                    key={message.id}
                    id={message.id}
                    from={message.role}
                  >
                    <DemoMessageContent message={message} />
                  </Message>
                ))}
                {status === 'submitted' && <MessageIndicator />}
              </Conversation>

              <PromptInput
                variant="compact"
                placeholder="Try: Compare my spending"
                isBusy={status === 'submitted' || status === 'streaming'}
                onSubmit={({ value }) => sendMessage({ text: value })}
                onStop={stop}
              />
            </div>
          )
        }

        return <ChatDemo />
      }}
    </ComponentBox>
  )
}

const scrollerReply =
  'You can do it in the app under Cards. Choose the card, and follow the steps. It only takes a minute, and you get a confirmation when it is done.'

export function ChatScrollerPeek() {
  return (
    <ComponentBox scope={{ scrollerReply }}>
      {() => {
        const ChatDemo = () => {
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

              <Conversation
                style={
                  {
                    height: '18rem',
                    '--ai-conversation-peek': peek,
                  } as React.CSSProperties
                }
              >
                {Array.from({ length: count }, (_, index) => (
                  <Fragment key={index}>
                    <Message from="user">Question {index + 1}</Message>
                    <Message>{scrollerReply}</Message>
                  </Fragment>
                ))}
              </Conversation>
            </>
          )
        }

        return <ChatDemo />
      }}
    </ComponentBox>
  )
}

export function ChatScrollerOpening() {
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

              <Conversation
                key={scrollBehavior}
                scrollBehavior={scrollBehavior}
                style={{ height: '18rem' }}
              >
                {['How do I block my card?', 'Can I order a new one?'].map(
                  (question) => (
                    <Fragment key={question}>
                      <Message from="user">{question}</Message>
                      <Message>
                        <P>{scrollerReply}</P>
                        <P top>{scrollerReply}</P>
                      </Message>
                    </Fragment>
                  )
                )}
              </Conversation>
            </>
          )
        }

        return <SavedChat />
      }}
    </ComponentBox>
  )
}

export function ChatScrollerHistory() {
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

              <Conversation style={{ height: '18rem' }}>
                {turns.map((turn) => (
                  <Fragment key={turn}>
                    <Message from="user">Question {turn}</Message>
                    <Message>{scrollerReply}</Message>
                  </Fragment>
                ))}
              </Conversation>
            </>
          )
        }

        return <History />
      }}
    </ComponentBox>
  )
}

export function ChatScrollerOutline() {
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
          const { scrollToMessage } = useConversation('outline-chat')
          const { currentTurnId } =
            useConversationVisibility('outline-chat')

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
            <Conversation id="outline-chat" style={{ height: '18rem' }}>
              {questions.map(({ id, text }) => (
                <Fragment key={id}>
                  <Message from="user" id={id}>
                    {text}
                  </Message>
                  <Message>{scrollerReply}</Message>
                </Fragment>
              ))}
            </Conversation>
          </>
        )
      }}
    </ComponentBox>
  )
}

export function ChatScrollerScrollState() {
  return (
    <ComponentBox scope={{ scrollerReply }}>
      {() => {
        const Toolbar = () => {
          const { scrollToStart, scrollToEnd } =
            useConversation('state-chat')
          const { isAtStart, isAtEnd } =
            useConversationScrollState('state-chat')

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
            <Conversation id="state-chat" style={{ height: '18rem' }}>
              {Array.from({ length: 4 }, (_, index) => (
                <Fragment key={index}>
                  <Message from="user">Question {index + 1}</Message>
                  <Message>{scrollerReply}</Message>
                </Fragment>
              ))}
            </Conversation>
          </>
        )
      }}
    </ComponentBox>
  )
}

export function ChatScrollerAnimation() {
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

        const ChatDemo = () => {
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

              <Conversation
                className={`my-chat--${animation}`}
                style={{ height: '18rem' }}
              >
                {Array.from({ length: count }, (_, index) => (
                  <Fragment key={index}>
                    <Message from="user">Question {index + 1}</Message>
                    <Message>{scrollerReply}</Message>
                  </Fragment>
                ))}
              </Conversation>
            </>
          )
        }

        return <ChatDemo />
      }}
    </ComponentBox>
  )
}

export function ChatScrollerLongConversation() {
  return (
    <ComponentBox scope={{ scrollerReply }}>
      {() => {
        const turns = Array.from({ length: 500 }, (_, index) => ({
          id: `question-${index + 1}`,
          number: index + 1,
        }))

        const Toolbar = () => {
          const { scrollToStart, scrollToMessage, scrollToEnd } =
            useConversation('long-chat')
          const { currentTurnId } = useConversationVisibility('long-chat')

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
            <Conversation id="long-chat" style={{ height: '24rem' }}>
              {turns.map(({ id, number }) => (
                <Fragment key={id}>
                  <Message from="user" id={id}>
                    Question {number}
                  </Message>
                  <Message>{scrollerReply}</Message>
                </Fragment>
              ))}
            </Conversation>
          </>
        )
      }}
    </ComponentBox>
  )
}
