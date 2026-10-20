import { render } from '@testing-library/react'
import { expectTypeOf } from 'vitest'
import type {
  AiMessageProps,
  AiPromptInputProps,
  AiSourcesProps,
  AiTaskProps,
} from '..'

import { axeComponent } from '../../../core/test-utils/testSetup'
import Provider from '../../../shared/Provider'
import Avatar from '../../../components/Avatar'
import { copy } from '../../../icons'
import { Action, Actions, Message, MessageIndicator, Response } from '..'

describe('Ai.Message', () => {
  it('renders an assistant bubble by default', () => {
    render(<Message>Hello</Message>)

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
    render(<Message from="user">Hi</Message>)
    expect(document.querySelector('.dnb-ai-message')).toHaveClass(
      'dnb-ai-message--user'
    )
  })

  it('renders the plain variant', () => {
    render(<Message variant="plain">Hi</Message>)
    expect(document.querySelector('.dnb-ai-message')).toHaveClass(
      'dnb-ai-message--plain'
    )
  })

  it('renders a header with name, timestamp and a hidden avatar', () => {
    render(
      <Message
        name="Aino"
        timestamp="15:24"
        avatar={<Avatar hasLabel>A</Avatar>}
      >
        Hi
      </Message>
    )

    expect(
      document.querySelector('.dnb-ai-message__meta')
    ).toHaveTextContent('Aino - 15:24')
    expect(
      document.querySelector('.dnb-ai-message__avatar')
    ).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders the AI-generated tag translated', () => {
    const { rerender } = render(<Message aiGenerated>Hi</Message>)
    expect(
      document.querySelector('.dnb-ai-message__tag')
    ).toHaveTextContent('KI-generert')

    rerender(
      <Provider locale="en-GB">
        <Message aiGenerated>Hi</Message>
      </Provider>
    )
    expect(
      document.querySelector('.dnb-ai-message__tag')
    ).toHaveTextContent('AI-generated')
  })

  it('renders actions below the content', () => {
    render(
      <Message
        actions={
          <Actions>
            <Action icon={copy} label="Copy" />
          </Actions>
        }
      >
        Hi
      </Message>
    )

    expect(
      document.querySelector(
        '.dnb-ai-message__content + .dnb-ai-message__actions .dnb-ai-actions'
      )
    ).toBeInTheDocument()
  })

  it('composes markdown inside a message', () => {
    expectTypeOf<AiMessageProps>().not.toHaveProperty('message')
    expectTypeOf<AiSourcesProps>().not.toHaveProperty('message')
    expectTypeOf<AiTaskProps>().not.toHaveProperty('part')
    expectTypeOf<AiPromptInputProps>().not.toHaveProperty('status')
    expectTypeOf<AiPromptInputProps['isBusy']>().toEqualTypeOf<
      boolean | undefined
    >()
    expectTypeOf<AiTaskProps['status']>().toEqualTypeOf<
      'running' | 'awaiting' | 'done' | 'error' | 'canceled' | undefined
    >()

    render(
      <Message>
        <Response>Some **bold</Response>
      </Message>
    )
    expect(document.querySelector('.dnb-ai-message')).toHaveClass(
      'dnb-ai-message--assistant'
    )
    expect(
      document.querySelector('.dnb-ai-response strong')
    ).toHaveTextContent('bold')
  })

  it('leaves the streaming policy to the response', () => {
    render(
      <Message>
        <Response parseIncompleteMarkdown={false}>2 **x</Response>
      </Message>
    )
    expect(document.querySelector('strong')).toBeNull()
  })

  it('renders user text as written with line breaks', () => {
    render(<Message from="user">{'Is **this** bold?\nNext line'}</Message>)
    expect(document.querySelector('.dnb-ai-message')).toHaveClass(
      'dnb-ai-message--user'
    )
    expect(document.querySelector('strong')).toBeNull()
    expect(
      document.querySelector('.dnb-ai-message__text').textContent
    ).toBe('Is **this** bold?\nNext line')
  })

  it('supports spacing props and forwards attributes', () => {
    render(
      <Message top="large" className="custom" id="message-1">
        Hi
      </Message>
    )

    const element = document.querySelector('.dnb-ai-message')
    expect(element).toHaveClass('dnb-space__top--large', 'custom')
    expect(element).toHaveAttribute('id', 'message-1')
  })

  it('should validate with ARIA rules', async () => {
    const result = render(
      <>
        <Message from="user" name="You" timestamp="15:23">
          Hi
        </Message>
        <Message
          name="Aino"
          timestamp="15:24"
          avatar={<Avatar hasLabel>A</Avatar>}
          aiGenerated
          actions={
            <Actions>
              <Action icon={copy} label="Copy" />
            </Actions>
          }
        >
          Hello
        </Message>
      </>
    )

    expect(await axeComponent(result)).toHaveNoViolations()
  })
})

describe('Ai.MessageIndicator', () => {
  it('renders a status with a translated label', () => {
    render(<MessageIndicator name="Aino" />)

    const element = document.querySelector('.dnb-ai-message-indicator')
    expect(element).toHaveClass('dnb-ai-message--assistant')
    expect(element.querySelector('[role="status"]')).toHaveTextContent(
      'Skriver svar …'
    )
    expect(
      element.querySelector('.dnb-ai-message-indicator__dots')
    ).toHaveAttribute('aria-hidden', 'true')
    expect(
      element.querySelectorAll('.dnb-dots-indicator__dot')
    ).toHaveLength(3)
    expect(element.querySelectorAll('[role="status"]')).toHaveLength(1)
  })

  it('supports a custom label', () => {
    render(<MessageIndicator label="Thinking" />)
    expect(document.querySelector('[role="status"]')).toHaveTextContent(
      'Thinking'
    )
  })

  it('should validate with ARIA rules', async () => {
    const result = render(<MessageIndicator name="Aino" />)
    expect(await axeComponent(result)).toHaveNoViolations()
  })
})

describe('Ai.Action', () => {
  it('renders a tertiary icon button with label', () => {
    const onClick = vi.fn()
    render(
      <Actions aria-label="Message actions" role="group">
        <Action icon={copy} label="Copy" onClick={onClick} />
      </Actions>
    )

    const button = document.querySelector('button')
    expect(button).toHaveClass('dnb-button--tertiary')
    expect(button).toHaveClass('dnb-button--size-small')
    expect(
      button.querySelector('.dnb-button__bounding')
    ).toBeInTheDocument()
    expect(button).not.toHaveAttribute('aria-pressed')
    expect(button).toHaveAccessibleName('Copy')

    button.click()
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('exposes controlled feedback selection without changing its label', () => {
    const { rerender } = render(
      <Action icon={copy} label="Good answer" selected={false} />
    )
    const button = document.querySelector('button')

    expect(button).toHaveAttribute('aria-pressed', 'false')
    expect(button).not.toHaveClass('dnb-button--selected')

    rerender(<Action icon={copy} label="Good answer" selected />)

    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(button).toHaveClass('dnb-button--selected')
    expect(button).toHaveAccessibleName('Good answer')
  })

  it('retains explicit button options and disabled behavior', () => {
    const onClick = vi.fn()
    render(
      <Action
        icon={copy}
        label="Good answer"
        size="medium"
        disabled
        selected
        onClick={onClick}
      />
    )
    const button = document.querySelector('button')

    expect(button).toHaveClass('dnb-button--size-medium')
    button.click()
    expect(onClick).not.toHaveBeenCalled()
  })

  it('forwards an explicit pressed state without changing selected styles', () => {
    render(
      <Action
        icon={copy}
        label="Good answer"
        selected
        aria-pressed="mixed"
      />
    )

    expect(document.querySelector('button')).toHaveAttribute(
      'aria-pressed',
      'mixed'
    )
    expect(document.querySelector('button')).toHaveClass(
      'dnb-button--selected'
    )
  })

  it('validates feedback actions with ARIA rules', async () => {
    const result = render(
      <Actions role="group" aria-label="Answer feedback">
        <Action icon={copy} label="Good answer" selected />
      </Actions>
    )

    expect(await axeComponent(result)).toHaveNoViolations()
  })
})
