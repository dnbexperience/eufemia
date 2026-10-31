import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Provider from '../../../shared/Provider'
import enUS from '../constants/locales/en-US'
import { Message, Response, Task } from '..'

const getStatus = () => document.querySelector('.dnb-ai-task__status')

describe('Ai.Task', () => {
  it('uses an explicit display status', () => {
    const { rerender } = render(<Task title="Checking" status="done" />)
    expect(document.querySelector('.dnb-ai-task')).toHaveClass(
      'dnb-ai-task--done'
    )
    rerender(<Task title="Checking" status="awaiting" />)
    expect(getStatus()).toHaveTextContent('Venter på bekreftelse')
  })

  it('shows a running task with a title', () => {
    render(<Task title="Looking up your transactions" />)

    expect(document.querySelector('.dnb-ai-task')).toHaveClass(
      'dnb-ai-task--running'
    )
    expect(getStatus()).toHaveTextContent('Looking up your transactions')
    expect(getStatus()).toHaveTextContent('Pågår')
    expect(
      document.querySelector('.dnb-ai-task__icon .dnb-progress-indicator')
    ).toBeInTheDocument()
    expect(document.querySelector('.dnb-ai-task__icon')).toHaveAttribute(
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
    render(<Task title="Checking your card" status={status} />)
    expect(document.querySelector('.dnb-ai-task')).toHaveClass(
      'dnb-ai-task--' + status
    )
    expect(getStatus()).toHaveTextContent(label)
  })

  it('shows error text only for an error', () => {
    const { rerender } = render(
      <Task title="Card" status="error" errorText="Try again" />
    )
    expect(
      document.querySelector('.dnb-ai-task__error')
    ).toHaveTextContent('Try again')
    rerender(<Task title="Card" status="running" errorText="Try again" />)
    expect(document.querySelector('.dnb-ai-task__error')).toBeNull()
  })

  it('translates the state', () => {
    render(
      <Provider locale="en-GB">
        <Task title="Card" status="done" />
      </Provider>
    )
    expect(getStatus()).toHaveTextContent('Completed')
  })

  it('uses American spelling in en-US', () => {
    render(
      <Provider locale="en-US" translations={enUS}>
        <Task title="Card" status="canceled" />
      </Provider>
    )
    expect(getStatus()).toHaveTextContent('Canceled')
  })

  it('supports spacing props and forwards attributes', () => {
    render(<Task title="Hi" top="large" className="custom" id="t" />)

    const element = document.querySelector('.dnb-ai-task')
    expect(element).toHaveClass('dnb-space__top--large', 'custom')
    expect(element).toHaveAttribute('id', 't')
  })

  it('should validate with ARIA rules', async () => {
    const result = render(
      <>
        <Task title="Looking up" />
        <Task title="Done" status="done" />
        <Task title="Error" status="error" errorText="Failed" />
      </>
    )
    expect(await axeComponent(result)).toHaveNoViolations()
  })
})

describe('Ai.Message with tasks', () => {
  it('renders composed tasks and results in order', () => {
    render(
      <Message>
        <Response>Let me check.</Response>
        <Task title="Looking up your cards" status="done">
          Your card is active.
        </Task>
        <Task title="Blocking your card" status="awaiting" />
      </Message>
    )
    const children = document.querySelector(
      '.dnb-ai-message__content'
    ).children
    expect(children[0]).toHaveClass('dnb-ai-response')
    expect(children[1]).toHaveClass('dnb-ai-task--done')
    expect(children[1]).toHaveTextContent('Your card is active.')
    expect(children[2]).toHaveClass('dnb-ai-task--awaiting')
  })
})
