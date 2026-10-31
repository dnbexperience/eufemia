import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Provider from '../../../shared/Provider'
import { Confirmation } from '..'
import type { AiConfirmationStatus } from '..'

const title = 'Share history?'
const question = 'Do you want to share this conversation with an advisor?'
const getButton = (text: string) =>
  Array.from(document.querySelectorAll('button')).find(
    (button) => button.textContent === text
  )

describe('Ai.Confirmation', () => {
  it('renders a labelled card with the question and translated decisions', () => {
    render(
      <Confirmation title={title} onConfirm={vi.fn()} onDecline={vi.fn()}>
        {question}
      </Confirmation>
    )

    const group = document.querySelector('[role="group"]')
    expect(group).toHaveClass('dnb-card', 'dnb-ai-confirmation--pending')
    expect(group).toHaveAccessibleName(title)
    expect(group).toHaveAccessibleDescription(
      question + ' Venter på bekreftelse'
    )
    expect(getButton('Ja')).toBeEnabled()
    expect(getButton('Nei')).toBeEnabled()
    expect(document.querySelector('h3')).toHaveTextContent(title)
    expect(
      document.querySelector('[aria-live="polite"]')
    ).toBeEmptyDOMElement()
  })

  it('calls the chosen handler without deciding the outcome internally', async () => {
    const onConfirm = vi.fn()
    const onDecline = vi.fn()
    render(
      <Confirmation
        title={title}
        onConfirm={onConfirm}
        onDecline={onDecline}
      >
        {question}
      </Confirmation>
    )

    await userEvent.click(getButton('Ja'))
    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(onConfirm).toHaveBeenCalledWith(
      expect.objectContaining({ event: expect.anything() })
    )
    expect(onDecline).not.toHaveBeenCalled()
    expect(getButton('Ja')).toBeEnabled()

    await userEvent.click(getButton('Nei'))
    expect(onDecline).toHaveBeenCalledTimes(1)
  })

  it.each(['confirmed', 'declined', 'expired'] as const)(
    'disables decisions when %s',
    async (status) => {
      const onConfirm = vi.fn()
      const onDecline = vi.fn()
      render(
        <Confirmation
          title={title}
          status={status}
          onConfirm={onConfirm}
          onDecline={onDecline}
        >
          {question}
        </Confirmation>
      )

      await userEvent.click(getButton('Ja'))
      await userEvent.click(getButton('Nei'))
      expect(getButton('Ja')).toBeDisabled()
      expect(getButton('Nei')).toBeDisabled()
      expect(onConfirm).not.toHaveBeenCalled()
      expect(onDecline).not.toHaveBeenCalled()
    }
  )

  it('shows required and expired labels and the confirmation checkmark', () => {
    const { rerender } = render(
      <Confirmation title={title} status="required" onConfirm={vi.fn()}>
        {question}
      </Confirmation>
    )

    expect(document.querySelector('.dnb-badge')).toHaveTextContent(
      'Påkrevd'
    )
    expect(getButton('Ja').querySelector('.dnb-icon')).toBeInTheDocument()

    rerender(
      <Confirmation title={title} status="expired">
        {question}
      </Confirmation>
    )
    expect(document.querySelector('.dnb-badge')).toHaveTextContent(
      'Utløpt'
    )
    expect(getButton('Ja').querySelector('.dnb-icon')).toBeNull()
  })

  it('does not leave enabled actions without handlers', () => {
    render(<Confirmation title={title}>{question}</Confirmation>)

    expect(getButton('Ja')).toBeDisabled()
    expect(getButton('Nei')).toBeDisabled()
  })

  it('can disable a pending decision while the application saves', () => {
    render(
      <Confirmation
        title={title}
        onConfirm={vi.fn()}
        onDecline={vi.fn()}
        disabled
      >
        {question}
      </Confirmation>
    )

    expect(getButton('Ja')).toBeDisabled()
    expect(getButton('Nei')).toBeDisabled()
  })

  it('does not submit a surrounding form', async () => {
    const onSubmit = vi.fn((event) => event.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Confirmation
          title={title}
          onConfirm={vi.fn()}
          onDecline={vi.fn()}
        >
          {question}
        </Confirmation>
      </form>
    )

    await userEvent.click(getButton('Ja'))
    await userEvent.click(getButton('Nei'))
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('uses unique accessible ids for multiple cards', () => {
    render(
      <>
        <Confirmation title="First">One</Confirmation>
        <Confirmation title="Second">Two</Confirmation>
      </>
    )

    const groups = document.querySelectorAll('[role="group"]')
    expect(groups[0]).toHaveAccessibleName('First')
    expect(groups[1]).toHaveAccessibleName('Second')
    expect(groups[0].getAttribute('aria-labelledby')).not.toBe(
      groups[1].getAttribute('aria-labelledby')
    )
  })

  it('announces state changes but not streamed details', async () => {
    const { rerender } = render(
      <Confirmation title={title}>First</Confirmation>
    )
    const region = document.querySelector('[aria-live="polite"]')

    rerender(<Confirmation title={title}>Updated</Confirmation>)
    expect(region).toBeEmptyDOMElement()

    rerender(
      <Confirmation title={title} status="confirmed">
        Updated
      </Confirmation>
    )
    await waitFor(() =>
      expect(region).toHaveTextContent('Share history? Bekreftet')
    )
  })

  it('can leave announcements to the application', async () => {
    const { rerender } = render(
      <Confirmation title={title} announce={false}>
        {question}
      </Confirmation>
    )
    rerender(
      <Confirmation title={title} status="expired" announce={false}>
        {question}
      </Confirmation>
    )

    await waitFor(() =>
      expect(
        document.querySelector('[aria-live="polite"]')
      ).toBeEmptyDOMElement()
    )
  })

  it('does not replay an old announcement when announcements are enabled again', async () => {
    const { rerender } = render(
      <Confirmation title={title}>{question}</Confirmation>
    )
    const region = document.querySelector('[aria-live="polite"]')

    rerender(
      <Confirmation title={title} status="confirmed">
        {question}
      </Confirmation>
    )
    await waitFor(() => expect(region).toHaveTextContent('Bekreftet'))

    rerender(
      <Confirmation title={title} status="confirmed" announce={false}>
        {question}
      </Confirmation>
    )
    rerender(
      <Confirmation title={title} status="confirmed">
        {question}
      </Confirmation>
    )
    await waitFor(() => expect(region).toBeEmptyDOMElement())
  })

  it('preserves focus elsewhere when the decision expires', async () => {
    const renderDecision = (status: AiConfirmationStatus) => (
      <>
        <Confirmation title={title} status={status} onConfirm={vi.fn()}>
          {question}
        </Confirmation>
        <button>Other action</button>
      </>
    )
    const { rerender } = render(renderDecision('pending'))
    const other = getButton('Other action')
    other.focus()

    rerender(renderDecision('expired'))
    expect(other).toHaveFocus()
  })

  it('uses English button labels from Provider', () => {
    render(
      <Provider locale="en-GB">
        <Confirmation title={title}>{question}</Confirmation>
      </Provider>
    )

    expect(getButton('Yes')).toBeInTheDocument()
    expect(getButton('No')).toBeInTheDocument()
  })

  it.each(['confirmed', 'declined', 'expired'] as const)(
    'keeps focus on the card when %s disables a focused decision',
    async (status) => {
      const { rerender } = render(
        <Confirmation
          title={title}
          onConfirm={vi.fn()}
          onDecline={vi.fn()}
        >
          {question}
        </Confirmation>
      )
      await userEvent.tab()
      expect(getButton('Nei')).toHaveFocus()

      rerender(
        <Confirmation title={title} status={status}>
          {question}
        </Confirmation>
      )
      expect(
        document.querySelector('.dnb-ai-confirmation__body')
      ).toHaveFocus()
    }
  )

  it('inherits English labels and supports application labels and attributes', () => {
    render(
      <Provider locale="en-GB">
        <Confirmation
          title={title}
          status="required"
          confirmLabel="Continue"
          declineLabel="Go back"
          level={2}
          id="decision"
          className="custom"
          top="large"
        >
          {question}
        </Confirmation>
      </Provider>
    )

    expect(document.querySelector('h2')).toHaveTextContent(title)
    expect(document.querySelector('.dnb-badge')).toHaveTextContent(
      'Required'
    )
    expect(getButton('Continue')).toBeInTheDocument()
    expect(getButton('Go back')).toBeInTheDocument()
    expect(document.querySelector('#decision')).toHaveClass(
      'custom',
      'dnb-space__top--large'
    )
  })

  it.each([
    'pending',
    'required',
    'confirmed',
    'declined',
    'expired',
  ] as Array<AiConfirmationStatus>)(
    'validates the %s state with ARIA rules',
    async (status) => {
      const result = render(
        <Confirmation
          title={title}
          status={status}
          onConfirm={vi.fn()}
          onDecline={vi.fn()}
        >
          {question}
        </Confirmation>
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    }
  )
})
