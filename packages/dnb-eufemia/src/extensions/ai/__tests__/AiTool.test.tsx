import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Provider from '../../../shared/Provider'
import enUS from '../constants/locales/en-US'
import { Message, Response, Tool } from '..'

const getStatus = () => document.querySelector('.dnb-ai-tool__status')

describe('Ai.Tool', () => {
  it('uses an explicit display status', () => {
    const { rerender } = render(<Tool title="Checking" status="done" />)
    expect(document.querySelector('.dnb-ai-tool')).toHaveClass(
      'dnb-ai-tool--done'
    )
    rerender(<Tool title="Checking" status="awaiting" />)
    expect(getStatus()).toHaveTextContent('Venter på bekreftelse')
  })

  it('shows a running tool with a title', () => {
    render(<Tool title="Looking up your transactions" />)

    expect(document.querySelector('.dnb-ai-tool')).toHaveClass(
      'dnb-ai-tool--running'
    )
    expect(getStatus()).toHaveTextContent(
      'Looking up your transactions' + 'Pågår'
    )
    expect(
      document.querySelector('.dnb-ai-tool__icon .dnb-progress-indicator')
    ).toBeInTheDocument()
    expect(document.querySelector('.dnb-ai-tool__icon')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
  })

  it.each([
    ['running', 'Pågår'],
    ['awaiting', 'Venter på bekreftelse'],
    ['done', 'Fullført'],
    ['error', 'Feilet'],
    ['canceled', 'Avbrutt'],
  ] as const)('shows the %s status', (status, label) => {
    render(<Tool title="Checking your card" status={status} />)
    expect(document.querySelector('.dnb-ai-tool')).toHaveClass(
      'dnb-ai-tool--' + status
    )
    expect(getStatus()).toHaveTextContent(label)
  })

  it('shows error text only for an error', () => {
    const { rerender } = render(
      <Tool title="Card" status="error" errorText="Try again" />
    )
    expect(
      document.querySelector('.dnb-ai-tool__error')
    ).toHaveTextContent('Try again')
    rerender(<Tool title="Card" status="running" errorText="Try again" />)
    expect(document.querySelector('.dnb-ai-tool__error')).toBeNull()
  })

  it('translates the state', () => {
    render(
      <Provider locale="en-GB">
        <Tool title="Card" status="done" />
      </Provider>
    )
    expect(getStatus()).toHaveTextContent('Completed')
  })

  it('uses American spelling in en-US', () => {
    render(
      <Provider locale="en-US" translations={enUS}>
        <Tool title="Card" status="canceled" />
      </Provider>
    )
    expect(getStatus()).toHaveTextContent('Canceled')
  })

  it('supports spacing props and forwards attributes', () => {
    render(<Tool title="Hi" top="large" className="custom" id="t" />)

    const element = document.querySelector('.dnb-ai-tool')
    expect(element).toHaveClass('dnb-space__top--large', 'custom')
    expect(element).toHaveAttribute('id', 't')
  })

  it('should validate with ARIA rules', async () => {
    const result = render(
      <>
        <Tool title="Looking up" />
        <Tool title="Done" status="done" />
        <Tool title="Error" status="error" errorText="Failed" />
      </>
    )
    expect(await axeComponent(result)).toHaveNoViolations()
  })
})

describe('Ai.Message with tools', () => {
  it('renders composed tools and results in order', () => {
    render(
      <Message>
        <Response>Let me check.</Response>
        <Tool title="Looking up your cards" status="done">
          Your card is active.
        </Tool>
        <Tool title="Blocking your card" status="awaiting" />
      </Message>
    )
    const children = document.querySelector(
      '.dnb-ai-message__content'
    ).children
    expect(children[0]).toHaveClass('dnb-ai-response')
    expect(children[1]).toHaveClass('dnb-ai-tool--done')
    expect(children[1]).toHaveTextContent('Your card is active.')
    expect(children[2]).toHaveClass('dnb-ai-tool--awaiting')
  })
})
