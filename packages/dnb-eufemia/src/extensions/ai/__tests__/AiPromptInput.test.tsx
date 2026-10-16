import { useState } from 'react'
import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Provider from '../../../shared/Provider'
import { PromptInput } from '..'
import { bank } from '../../../icons'

const getTextarea = () => document.querySelector('textarea')
const getSubmit = () =>
  document.querySelector<HTMLButtonElement>('.dnb-ai-prompt-input__submit')

describe('PromptInput', () => {
  it('uses isBusy to show stop until the operation ends', () => {
    const onStop = vi.fn()
    const { rerender } = render(
      <PromptInput isBusy onStop={onStop} value="Next" />
    )
    const stop = document.querySelector<HTMLButtonElement>(
      '.dnb-ai-prompt-input__stop'
    )
    expect(stop).toBeInTheDocument()
    stop.click()
    expect(onStop).toHaveBeenCalledTimes(1)
    rerender(<PromptInput isBusy={false} onStop={onStop} value="Next" />)
    expect(document.querySelector('.dnb-ai-prompt-input__stop')).toBeNull()
    expect(
      document.querySelector('button[type="submit"]')
    ).not.toBeDisabled()
  })

  it('renders a form with a labeled textarea and a send button', () => {
    render(<PromptInput />)

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
        <PromptInput
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
    render(<PromptInput onSubmit={onSubmit} />)

    await userEvent.type(getTextarea(), '  Hello  {Enter}')

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'Hello' })
    )
    expect(getTextarea()).toHaveValue('')
  })

  it('adds a new line on Shift+Enter', async () => {
    const onSubmit = vi.fn()
    render(<PromptInput onSubmit={onSubmit} />)

    await userEvent.type(getTextarea(), 'a{Shift>}{Enter}{/Shift}b')

    expect(onSubmit).not.toHaveBeenCalled()
    expect(getTextarea()).toHaveValue('a\nb')
  })

  it('does not submit while composing text', () => {
    const onSubmit = vi.fn()
    render(<PromptInput value="Hei" onSubmit={onSubmit} />)

    fireEvent.keyDown(getTextarea(), { key: 'Enter', isComposing: true })

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits with the send button', async () => {
    const onSubmit = vi.fn()
    render(<PromptInput onSubmit={onSubmit} />)

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
    render(<PromptInput onSubmit={onSubmit} />)

    await userEvent.type(getTextarea(), '   {Enter}')

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('supports a controlled value', async () => {
    const onSubmit = vi.fn()
    const Controlled = () => {
      const [value, setValue] = useState('Hi')
      return (
        <PromptInput
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
    render(<PromptInput value="Hi" onSubmit={vi.fn()} />)

    await userEvent.type(getTextarea(), '{Enter}')

    expect(getTextarea()).toHaveValue('Hi')
  })

  it('shows a stop button while busy when onStop is given', async () => {
    const onStop = vi.fn()
    const onSubmit = vi.fn()
    const { rerender } = render(
      <PromptInput
        isBusy
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

    rerender(<PromptInput isBusy value="Next" onSubmit={onSubmit} />)
    expect(getSubmit()).toBeDisabled()

    rerender(<PromptInput isBusy={false} value="Next" />)
    expect(getSubmit()).not.toBeDisabled()
  })

  it('only renders the attachment and microphone buttons when callbacks are given', async () => {
    const { rerender } = render(<PromptInput />)
    expect(document.querySelectorAll('button')).toHaveLength(1)

    const onAttachmentClick = vi.fn()
    const onMicrophoneClick = vi.fn()
    rerender(
      <PromptInput
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
      <PromptInput
        variant="compact"
        isBusy
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

  it('shows the assistant icon and microphone without a send button when compact and empty', async () => {
    render(<PromptInput variant="compact" onMicrophoneClick={vi.fn()} />)
    expect(
      document.querySelector('.dnb-ai-prompt-input__icon')
    ).toHaveAttribute('aria-hidden', 'true')
    expect(getSubmit()).toBeNull()
    await userEvent.type(getTextarea(), 'Hello')
    expect(getSubmit()).toHaveAccessibleName('Send')
    await userEvent.clear(getTextarea())
    expect(getSubmit()).toBeNull()
  })

  it('supports a custom compact icon and a flat surface', () => {
    const { rerender } = render(
      <PromptInput variant="compact" dropShadow={false} icon={bank} />
    )
    expect(document.querySelector('form')).not.toHaveClass(
      'dnb-ai-prompt-input--drop-shadow'
    )
    expect(
      document.querySelector('.dnb-ai-prompt-input__icon')
    ).toBeInTheDocument()
    rerender(<PromptInput variant="compact" icon={null} />)
    expect(document.querySelector('.dnb-ai-prompt-input__icon')).toBeNull()
    expect(document.querySelector('form')).toHaveClass(
      'dnb-ai-prompt-input--drop-shadow'
    )
  })

  it('keeps the stop button available when compact and empty', () => {
    render(<PromptInput variant="compact" isBusy onStop={vi.fn()} />)
    expect(
      document.querySelector('.dnb-ai-prompt-input__stop')
    ).toHaveAccessibleName('Stopp')
  })

  it('returns focus to the compact textarea when stopping removes the button', async () => {
    const Demo = () => {
      const [busy, setBusy] = useState(true)
      return (
        <PromptInput
          variant="compact"
          isBusy={busy}
          onStop={() => setBusy(false)}
        />
      )
    }
    render(<Demo />)
    const stop = document.querySelector<HTMLButtonElement>(
      '.dnb-ai-prompt-input__stop'
    )
    stop.focus()
    await userEvent.keyboard('{Enter}')
    expect(document.querySelector('.dnb-ai-prompt-input__stop')).toBeNull()
    expect(getTextarea()).toHaveFocus()
  })

  it('returns focus to the compact input after sending clears its value', async () => {
    render(<PromptInput variant="compact" />)
    await userEvent.type(getTextarea(), 'Hello')
    await userEvent.click(getSubmit())
    expect(getTextarea()).toHaveValue('')
    expect(getTextarea()).toHaveFocus()
    expect(getSubmit()).toBeNull()
  })

  it('renders removable context above the input without submitting', async () => {
    const onRemove = vi.fn()
    const onSubmit = vi.fn()
    render(
      <PromptInput value="Hello" onSubmit={onSubmit}>
        <button type="button" onClick={onRemove}>
          Remove reference
        </button>
      </PromptInput>
    )
    const context = document.querySelector('.dnb-ai-prompt-input__context')
    expect(context.nextElementSibling).toHaveClass(
      'dnb-ai-prompt-input__field'
    )
    await userEvent.click(context.querySelector('button'))
    expect(onRemove).toHaveBeenCalledTimes(1)
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('renders a short character counter with a text for screen readers', async () => {
    render(
      <Provider locale="nb-NO">
        <PromptInput characterCounter={111} />
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
      <PromptInput
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
    render(<PromptInput />)
    expect(
      getSubmit().querySelector('[data-testid="arrow up icon"]')
    ).toBeInTheDocument()
  })

  it('disables the input and buttons', () => {
    render(<PromptInput value="Hi" disabled onAttachmentClick={vi.fn()} />)

    expect(getTextarea()).toBeDisabled()
    document.querySelectorAll('button').forEach((button) => {
      expect(button).toBeDisabled()
    })
  })

  it('disables Stop as well as the input while disabled and busy', async () => {
    const onStop = vi.fn()
    render(<PromptInput disabled isBusy onStop={onStop} />)
    const stop = document.querySelector<HTMLButtonElement>(
      '.dnb-ai-prompt-input__stop'
    )
    expect(stop).toBeDisabled()
    await userEvent.click(stop)
    expect(onStop).not.toHaveBeenCalled()
  })

  it('forwards textareaProps', () => {
    render(
      <PromptInput textareaProps={{ status: 'Something went wrong' }} />
    )
    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      'Something went wrong'
    )
  })

  it('keeps its textarea behavior when forwarding classes and handlers', async () => {
    const onChange = vi.fn()
    const onKeyDown = vi.fn()
    const onSubmit = vi.fn()
    render(
      <PromptInput
        onSubmit={onSubmit}
        textareaProps={{ className: 'custom', onChange, onKeyDown }}
      />
    )

    expect(document.querySelector('.dnb-textarea')).toHaveClass(
      'dnb-ai-prompt-input__textarea',
      'custom'
    )
    await userEvent.type(getTextarea(), 'Hello{Enter}')
    expect(onChange).toHaveBeenCalled()
    expect(onKeyDown).toHaveBeenCalled()
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ value: 'Hello' })
    )
  })

  it('tracks textarea focus without treating toolbar focus as input focus', async () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    render(
      <PromptInput
        onAttachmentClick={vi.fn()}
        textareaProps={{ onFocus, onBlur }}
      />
    )
    const form = document.querySelector('form')
    await userEvent.click(getTextarea())
    expect(form).toHaveClass('dnb-ai-prompt-input--focus')
    expect(onFocus).toHaveBeenCalledOnce()
    await userEvent.click(
      document.querySelector('.dnb-ai-prompt-input__icon-button')
    )
    expect(form).not.toHaveClass('dnb-ai-prompt-input--focus')
    expect(onBlur).toHaveBeenCalledOnce()
  })

  it('supports spacing props and forwards attributes', () => {
    render(<PromptInput top="large" className="custom" id="prompt" />)

    const form = document.querySelector('form')
    expect(form).toHaveClass('dnb-space__top--large', 'custom')
    expect(form).toHaveAttribute('id', 'prompt')
  })

  it('should validate with ARIA rules', async () => {
    const result = render(
      <>
        <PromptInput
          characterCounter={111}
          onAttachmentClick={vi.fn()}
          onMicrophoneClick={vi.fn()}
        />
        <PromptInput
          variant="compact"
          onAttachmentClick={vi.fn()}
          onMicrophoneClick={vi.fn()}
        />
      </>
    )
    expect(await axeComponent(result)).toHaveNoViolations()
  })
})
