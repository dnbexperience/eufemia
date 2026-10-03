import { render } from '@testing-library/react'
import type { ToolUIPart, UIMessage } from 'ai'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Provider from '../../../shared/Provider'
import enUS from '../../../shared/locales/en-US'
import * as Ai from '..'

const toolPart = (part: Partial<ToolUIPart>) =>
  ({
    type: 'tool-blockCard',
    toolCallId: 'call-1',
    input: {},
    state: 'input-available',
    ...part,
  }) as ToolUIPart

const getStatus = () => document.querySelector('.dnb-ai-tool__status')

describe('Ai.Tool', () => {
  it('shows a running tool with a title', () => {
    render(<Ai.Tool title="Looking up your transactions" />)

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

  it('shows the state of a tool part', () => {
    const { rerender } = render(
      <Ai.Tool
        part={toolPart({ state: 'output-available', output: {} })}
      />
    )
    expect(document.querySelector('.dnb-ai-tool')).toHaveClass(
      'dnb-ai-tool--done'
    )
    expect(getStatus()).toHaveTextContent('blockCard' + 'Fullført')

    rerender(
      <Ai.Tool
        part={toolPart({
          state: 'approval-requested',
          approval: { id: 'a' },
        })}
      />
    )
    expect(getStatus()).toHaveTextContent('Venter på bekreftelse')

    rerender(
      <Ai.Tool
        part={toolPart({
          state: 'output-denied',
          approval: { id: 'a', approved: false },
        })}
      />
    )
    expect(document.querySelector('.dnb-ai-tool')).toHaveClass(
      'dnb-ai-tool--canceled'
    )
    expect(getStatus()).toHaveTextContent('Avbrutt')
  })

  it('uses the title and the name of a dynamic tool', () => {
    const { rerender } = render(
      <Ai.Tool part={toolPart({ title: 'Blocking your card' })} />
    )
    expect(getStatus()).toHaveTextContent('Blocking your card')

    rerender(
      <Ai.Tool
        part={{
          type: 'dynamic-tool',
          toolName: 'getBalance',
          toolCallId: '1',
          state: 'input-streaming',
        }}
      />
    )
    expect(getStatus()).toHaveTextContent('getBalance')
  })

  it('shows the error text', () => {
    render(
      <Ai.Tool
        part={toolPart({
          state: 'output-error',
          errorText: 'The card could not be blocked',
        })}
      />
    )

    expect(document.querySelector('.dnb-ai-tool')).toHaveClass(
      'dnb-ai-tool--error'
    )
    expect(
      document.querySelector('.dnb-ai-tool__error')
    ).toHaveTextContent('The card could not be blocked')
  })

  it('translates the state', () => {
    render(
      <Provider locale="en-GB">
        <Ai.Tool title="Card" state="output-available" />
      </Provider>
    )
    expect(getStatus()).toHaveTextContent('Completed')
  })

  it('uses American spelling in en-US', () => {
    render(
      <Provider locale="en-US" translations={enUS}>
        <Ai.Tool title="Card" state="output-denied" />
      </Provider>
    )
    expect(getStatus()).toHaveTextContent('Canceled')
  })

  it('supports spacing props and forwards attributes', () => {
    render(<Ai.Tool title="Hi" top="large" className="custom" id="t" />)

    const element = document.querySelector('.dnb-ai-tool')
    expect(element).toHaveClass('dnb-space__top--large', 'custom')
    expect(element).toHaveAttribute('id', 't')
  })

  it('should validate with ARIA rules', async () => {
    const result = render(
      <>
        <Ai.Tool title="Looking up" />
        <Ai.Tool title="Done" state="output-available" />
        <Ai.Tool title="Error" state="output-error" errorText="Failed" />
      </>
    )
    expect(await axeComponent(result)).toHaveNoViolations()
  })
})

describe('Ai.Message with tool parts', () => {
  it('renders tool parts in order', () => {
    const message: UIMessage = {
      id: '1',
      role: 'assistant',
      parts: [
        { type: 'text', text: 'Let me check.', state: 'done' },
        toolPart({
          toolCallId: 'a',
          state: 'output-available',
          output: {},
          title: 'Looking up your cards',
        }),
        toolPart({
          toolCallId: 'b',
          state: 'approval-requested',
          approval: { id: 'approval-1' },
        }),
      ],
    }
    render(<Ai.Message message={message} />)

    const children = document.querySelector(
      '.dnb-ai-message__content'
    ).children
    expect(children[0]).toHaveClass('dnb-ai-response')
    expect(children[1]).toHaveClass('dnb-ai-tool--done')
    expect(children[2]).toHaveClass('dnb-ai-tool--awaiting')
  })
})
