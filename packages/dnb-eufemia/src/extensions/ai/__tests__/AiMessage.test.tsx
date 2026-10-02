import { render } from '@testing-library/react'
import type { UIMessage } from 'ai'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Provider from '../../../shared/Provider'
import Avatar from '../../../components/Avatar'
import { copy } from '../../../icons'
import * as Ai from '..'

describe('Ai.Message', () => {
  it('renders an assistant bubble by default', () => {
    render(<Ai.Message>Hello</Ai.Message>)

    const element = document.querySelector('.dnb-ai-message')
    expect(element).toHaveClass(
      'dnb-ai-message--assistant',
      'dnb-ai-message--bubble'
    )
    expect(
      element.querySelector('.dnb-ai-message__content')
    ).toHaveTextContent('Hello')
    expect(element.querySelector('.dnb-ai-message__header')).toBeNull()
  })

  it('renders a user message', () => {
    render(<Ai.Message from="user">Hi</Ai.Message>)
    expect(document.querySelector('.dnb-ai-message')).toHaveClass(
      'dnb-ai-message--user'
    )
  })

  it('renders the plain variant', () => {
    render(<Ai.Message variant="plain">Hi</Ai.Message>)
    expect(document.querySelector('.dnb-ai-message')).toHaveClass(
      'dnb-ai-message--plain'
    )
  })

  it('renders a header with name, timestamp and a hidden avatar', () => {
    render(
      <Ai.Message
        name="Aino"
        timestamp="15:24"
        avatar={<Avatar hasLabel>A</Avatar>}
      >
        Hi
      </Ai.Message>
    )

    expect(
      document.querySelector('.dnb-ai-message__meta')
    ).toHaveTextContent('Aino - 15:24')
    expect(
      document.querySelector('.dnb-ai-message__avatar')
    ).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders the AI-generated tag translated', () => {
    const { rerender } = render(<Ai.Message aiGenerated>Hi</Ai.Message>)
    expect(
      document.querySelector('.dnb-ai-message__tag')
    ).toHaveTextContent('KI-generert')

    rerender(
      <Provider locale="en-GB">
        <Ai.Message aiGenerated>Hi</Ai.Message>
      </Provider>
    )
    expect(
      document.querySelector('.dnb-ai-message__tag')
    ).toHaveTextContent('AI-generated')
  })

  it('renders actions below the content', () => {
    render(
      <Ai.Message
        actions={
          <Ai.Actions>
            <Ai.Action icon={copy} label="Copy" />
          </Ai.Actions>
        }
      >
        Hi
      </Ai.Message>
    )

    expect(
      document.querySelector(
        '.dnb-ai-message__content + .dnb-ai-message__actions .dnb-ai-actions'
      )
    ).toBeInTheDocument()
  })

  it('renders assistant text parts of a UIMessage as markdown', () => {
    const message: UIMessage = {
      id: '1',
      role: 'assistant',
      parts: [
        { type: 'step-start' },
        { type: 'text', text: 'Some **bold', state: 'streaming' },
      ],
    }
    render(<Ai.Message message={message} />)

    expect(document.querySelector('.dnb-ai-message')).toHaveClass(
      'dnb-ai-message--assistant'
    )
    expect(
      document.querySelector('.dnb-ai-response strong')
    ).toHaveTextContent('bold')
  })

  it('does not repair finished UIMessage text', () => {
    const message: UIMessage = {
      id: '1',
      role: 'assistant',
      parts: [{ type: 'text', text: '2 **x', state: 'done' }],
    }
    render(<Ai.Message message={message} />)

    expect(document.querySelector('strong')).toBeNull()
  })

  it('renders user text parts of a UIMessage as written', () => {
    const message: UIMessage = {
      id: '1',
      role: 'user',
      parts: [{ type: 'text', text: 'Is **this** bold?' }],
    }
    render(<Ai.Message message={message} />)

    expect(document.querySelector('.dnb-ai-message')).toHaveClass(
      'dnb-ai-message--user'
    )
    expect(document.querySelector('strong')).toBeNull()
    expect(
      document.querySelector('.dnb-ai-message__text')
    ).toHaveTextContent('Is **this** bold?')
  })

  it('supports spacing props and forwards attributes', () => {
    render(
      <Ai.Message top="large" className="custom" id="message-1">
        Hi
      </Ai.Message>
    )

    const element = document.querySelector('.dnb-ai-message')
    expect(element).toHaveClass('dnb-space__top--large', 'custom')
    expect(element).toHaveAttribute('id', 'message-1')
  })

  it('should validate with ARIA rules', async () => {
    const result = render(
      <>
        <Ai.Message from="user" name="You" timestamp="15:23">
          Hi
        </Ai.Message>
        <Ai.Message
          name="Aino"
          timestamp="15:24"
          avatar={<Avatar hasLabel>A</Avatar>}
          aiGenerated
          actions={
            <Ai.Actions>
              <Ai.Action icon={copy} label="Copy" />
            </Ai.Actions>
          }
        >
          Hello
        </Ai.Message>
      </>
    )

    expect(await axeComponent(result)).toHaveNoViolations()
  })
})

describe('Ai.Loader', () => {
  it('renders a status with a translated label', () => {
    render(<Ai.Loader name="Aino" />)

    const element = document.querySelector('.dnb-ai-loader')
    expect(element).toHaveClass('dnb-ai-message--assistant')
    expect(element.querySelector('[role="status"]')).toHaveTextContent(
      'Skriver svar …'
    )
    expect(element.querySelector('.dnb-ai-loader__dots')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
  })

  it('supports a custom label', () => {
    render(<Ai.Loader label="Thinking" />)
    expect(document.querySelector('[role="status"]')).toHaveTextContent(
      'Thinking'
    )
  })

  it('should validate with ARIA rules', async () => {
    const result = render(<Ai.Loader name="Aino" />)
    expect(await axeComponent(result)).toHaveNoViolations()
  })
})

describe('Ai.Action', () => {
  it('renders a tertiary icon button with label', () => {
    const onClick = vi.fn()
    render(
      <Ai.Actions aria-label="Message actions" role="group">
        <Ai.Action icon={copy} label="Copy" onClick={onClick} />
      </Ai.Actions>
    )

    const button = document.querySelector('button')
    expect(button).toHaveClass('dnb-button--tertiary')
    expect(button).toHaveAccessibleName('Copy')

    button.click()
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
