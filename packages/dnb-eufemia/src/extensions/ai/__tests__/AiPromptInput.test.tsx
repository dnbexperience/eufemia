import { useState } from 'react'
import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Provider from '../../../shared/Provider'
import * as Ai from '..'

const getTextarea = () => document.querySelector('textarea')
const getSubmit = () =>
  document.querySelector<HTMLButtonElement>('.dnb-ai-prompt-input__submit')

describe('Ai.PromptInput', () => {
  it('renders a form with a labeled textarea and a send button', () => {
    render(<Ai.PromptInput />)

    const form = document.querySelector('form.dnb-ai-prompt-input')
    expect(form).toHaveClass('dnb-ai-prompt-input--default')
    expect(getTextarea()).toHaveAccessibleName('Melding')
    expect(getTextarea()).toHaveAttribute(
      'aria-placeholder',
      'Skriv en melding'
    )
    expect(getSubmit()).toHaveAttribute('type', 'submit')
    expect(getSubmit()).toHaveTextContent('Send')
  })

  it('translates texts', () => {
    render(
      <Provider locale="en-GB">
        <Ai.PromptInput
          onAttachmentClick={vi.fn()}
          onMicrophoneClick={vi.fn()}
        />
      </Provider>
    )

    expect(getTextarea()).toHaveAccessibleName('Message')
    expect(getTextarea()).toHaveAttribute(
      'aria-placeholder',
      'Write a message'
    )
    const buttons = document.querySelectorAll('button')
    expect(buttons[0]).toHaveAccessibleName('Add attachment')
    expect(buttons[1]).toHaveAccessibleName('Use microphone')
  })

  it('submits the trimmed text on Enter and clears it', async () => {
    const onSubmit = vi.fn()
    render(<Ai.PromptInput onSubmit={onSubmit} />)

    await userEvent.type(getTextarea(), '  Hello  {Enter}')

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'Hello' })
    )
    expect(getTextarea()).toHaveValue('')
  })

  it('adds a new line on Shift+Enter', async () => {
    const onSubmit = vi.fn()
    render(<Ai.PromptInput onSubmit={onSubmit} />)

    await userEvent.type(getTextarea(), 'a{Shift>}{Enter}{/Shift}b')

    expect(onSubmit).not.toHaveBeenCalled()
    expect(getTextarea()).toHaveValue('a\nb')
  })

  it('does not submit while composing text', () => {
    const onSubmit = vi.fn()
    render(<Ai.PromptInput value="Hei" onSubmit={onSubmit} />)

    fireEvent.keyDown(getTextarea(), { key: 'Enter', isComposing: true })

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits with the send button', async () => {
    const onSubmit = vi.fn()
    render(<Ai.PromptInput onSubmit={onSubmit} />)

    expect(getSubmit()).toBeDisabled()

    await userEvent.type(getTextarea(), 'Hello')
    expect(getSubmit()).not.toBeDisabled()
    await userEvent.click(getSubmit())

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'Hello' })
    )
  })

  it('does not submit empty text', async () => {
    const onSubmit = vi.fn()
    render(<Ai.PromptInput onSubmit={onSubmit} />)

    await userEvent.type(getTextarea(), '   {Enter}')

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('supports a controlled value', async () => {
    const onSubmit = vi.fn()
    const Controlled = () => {
      const [value, setValue] = useState('Hi')
      return (
        <Ai.PromptInput
          value={value}
          onChange={({ value }) => setValue(value)}
          onSubmit={(event) => {
            onSubmit(event)
            setValue('')
          }}
        />
      )
    }
    render(<Controlled />)

    expect(getTextarea()).toHaveValue('Hi')

    await userEvent.type(getTextarea(), ' there{Enter}')

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'Hi there' })
    )
    expect(getTextarea()).toHaveValue('')
  })

  it('keeps a controlled value after submit', async () => {
    render(<Ai.PromptInput value="Hi" onSubmit={vi.fn()} />)

    await userEvent.type(getTextarea(), '{Enter}')

    expect(getTextarea()).toHaveValue('Hi')
  })

  it('shows a stop button while busy when onStop is given', async () => {
    const onStop = vi.fn()
    const onSubmit = vi.fn()
    const { rerender } = render(
      <Ai.PromptInput
        status="streaming"
        value="Next"
        onStop={onStop}
        onSubmit={onSubmit}
      />
    )

    const stop = document.querySelector('.dnb-ai-prompt-input__stop')
    expect(stop).toHaveAttribute('type', 'button')
    expect(stop).toHaveTextContent('Stopp')
    expect(getSubmit()).toBeNull()

    await userEvent.click(stop)
    expect(onStop).toHaveBeenCalledTimes(1)

    await userEvent.type(getTextarea(), '{Enter}')
    expect(onSubmit).not.toHaveBeenCalled()

    rerender(
      <Ai.PromptInput
        status="submitted"
        value="Next"
        onSubmit={onSubmit}
      />
    )
    expect(getSubmit()).toBeDisabled()

    rerender(<Ai.PromptInput status="ready" value="Next" />)
    expect(getSubmit()).not.toBeDisabled()
  })

  it('only renders the attachment and microphone buttons when callbacks are given', async () => {
    const { rerender } = render(<Ai.PromptInput />)
    expect(document.querySelectorAll('button')).toHaveLength(1)

    const onAttachmentClick = vi.fn()
    const onMicrophoneClick = vi.fn()
    rerender(
      <Ai.PromptInput
        onAttachmentClick={onAttachmentClick}
        onMicrophoneClick={onMicrophoneClick}
      />
    )

    const buttons = document.querySelectorAll('button')
    expect(buttons).toHaveLength(3)
    expect(buttons[0]).toHaveAttribute('type', 'button')

    await userEvent.click(buttons[0])
    await userEvent.click(buttons[1])
    expect(onAttachmentClick).toHaveBeenCalledTimes(1)
    expect(onMicrophoneClick).toHaveBeenCalledTimes(1)
  })

  it('renders the compact variant with icon buttons', () => {
    render(
      <Ai.PromptInput
        variant="compact"
        status="streaming"
        onStop={vi.fn()}
        onAttachmentClick={vi.fn()}
      />
    )

    expect(document.querySelector('form')).toHaveClass(
      'dnb-ai-prompt-input--compact'
    )
    expect(
      document.querySelector('.dnb-ai-prompt-input__toolbar')
    ).toBeNull()
    expect(
      document.querySelector('.dnb-ai-prompt-input__stop')
    ).toHaveAccessibleName('Stopp')
  })

  it('renders a short character counter with a text for screen readers', async () => {
    render(
      <Provider locale="nb-NO">
        <Ai.PromptInput characterCounter={111} />
      </Provider>
    )

    const counter = document.querySelector('.dnb-ai-prompt-input__counter')
    expect(counter.querySelector('[aria-hidden]')).toHaveTextContent(
      '0/111'
    )
    expect(
      counter.querySelector('.dnb-text-counter.dnb-sr-only')
    ).toHaveTextContent('Du har brukt 0 av 111 tegn.')

    await userEvent.type(getTextarea(), 'Hei')
    expect(counter.querySelector('[aria-hidden]')).toHaveTextContent(
      '3/111'
    )
  })

  it('does not submit text longer than the character counter', async () => {
    const onSubmit = vi.fn()
    render(
      <Ai.PromptInput
        characterCounter={3}
        value="Hello"
        onSubmit={onSubmit}
      />
    )

    expect(
      document.querySelector('.dnb-ai-prompt-input__counter')
    ).toHaveClass('dnb-ai-prompt-input__counter--exceeded')
    expect(getSubmit()).toBeDisabled()

    await userEvent.type(getTextarea(), '{Enter}')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('shows an arrow on the send button', () => {
    render(<Ai.PromptInput />)
    expect(
      getSubmit().querySelector('[data-testid="arrow up icon"]')
    ).toBeInTheDocument()
  })

  it('disables the input and buttons', () => {
    render(
      <Ai.PromptInput value="Hi" disabled onAttachmentClick={vi.fn()} />
    )

    expect(getTextarea()).toBeDisabled()
    document.querySelectorAll('button').forEach((button) => {
      expect(button).toBeDisabled()
    })
  })

  it('forwards textareaProps', () => {
    render(
      <Ai.PromptInput textareaProps={{ status: 'Something went wrong' }} />
    )
    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      'Something went wrong'
    )
  })

  it('supports spacing props and forwards attributes', () => {
    render(<Ai.PromptInput top="large" className="custom" id="prompt" />)

    const form = document.querySelector('form')
    expect(form).toHaveClass('dnb-space__top--large', 'custom')
    expect(form).toHaveAttribute('id', 'prompt')
  })

  it('should validate with ARIA rules', async () => {
    const result = render(
      <>
        <Ai.PromptInput
          characterCounter={111}
          onAttachmentClick={vi.fn()}
          onMicrophoneClick={vi.fn()}
        />
        <Ai.PromptInput
          variant="compact"
          onAttachmentClick={vi.fn()}
          onMicrophoneClick={vi.fn()}
        />
      </>
    )
    expect(await axeComponent(result)).toHaveNoViolations()
  })
})
