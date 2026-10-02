import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { UIMessage } from 'ai'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Provider from '../../../shared/Provider'
import * as Ai from '..'

const getToggle = () =>
  document.querySelector<HTMLButtonElement>('.dnb-ai-collapsible__toggle')
const getContent = () =>
  document.querySelector('.dnb-ai-reasoning__content')

describe('Ai.Shimmer', () => {
  it('renders the text', () => {
    render(<Ai.Shimmer>Thinking</Ai.Shimmer>)
    expect(
      document.querySelector('span.dnb-ai-shimmer')
    ).toHaveTextContent('Thinking')
  })

  it('supports spacing props and forwards attributes', () => {
    render(
      <Ai.Shimmer left="small" className="custom" id="s">
        Hi
      </Ai.Shimmer>
    )

    const element = document.querySelector('.dnb-ai-shimmer')
    expect(element).toHaveClass('dnb-space__left--small', 'custom')
    expect(element).toHaveAttribute('id', 's')
  })
})

describe('Ai.Reasoning', () => {
  it('is open with a shimmer while streaming', () => {
    render(
      <Ai.Reasoning isStreaming>{'Looking at **March**'}</Ai.Reasoning>
    )

    expect(getToggle()).toHaveAttribute('aria-expanded', 'true')
    expect(getToggle().querySelector('.dnb-ai-shimmer')).toHaveTextContent(
      'Tenker …'
    )
    expect(getContent().querySelector('strong')).toHaveTextContent('March')
  })

  it('closes when the streaming is done', () => {
    const { rerender } = render(
      <Ai.Reasoning isStreaming>Thinking about it</Ai.Reasoning>
    )

    rerender(
      <Ai.Reasoning isStreaming={false}>Thinking about it</Ai.Reasoning>
    )

    expect(getToggle()).toHaveAttribute('aria-expanded', 'false')
    expect(getToggle()).toHaveTextContent('Tankeprosess')
    expect(getToggle().querySelector('.dnb-ai-shimmer')).toBeNull()
  })

  it('stays as the user left it', async () => {
    const { rerender } = render(
      <Ai.Reasoning isStreaming>Thinking about it</Ai.Reasoning>
    )

    await userEvent.click(getToggle())
    await userEvent.click(getToggle())
    rerender(
      <Ai.Reasoning isStreaming={false}>Thinking about it</Ai.Reasoning>
    )

    expect(getToggle()).toHaveAttribute('aria-expanded', 'true')
  })

  it('can be opened when done', async () => {
    render(<Ai.Reasoning>Thinking about it</Ai.Reasoning>)

    expect(getToggle()).toHaveAttribute('aria-expanded', 'false')
    expect(getContent()).toBeNull()

    await userEvent.click(getToggle())

    expect(getToggle()).toHaveAttribute('aria-expanded', 'true')
    expect(
      document.getElementById(getToggle().getAttribute('aria-controls'))
    ).toHaveTextContent('Thinking about it')
  })

  it('uses the text and state of a reasoning part', () => {
    render(
      <Provider locale="en-GB">
        <Ai.Reasoning
          part={{
            type: 'reasoning',
            text: 'Step one',
            state: 'streaming',
          }}
        />
      </Provider>
    )

    expect(getToggle()).toHaveTextContent('Thinking …')
    expect(getContent()).toHaveTextContent('Step one')
  })

  it('is rendered by Ai.Message in order', () => {
    const message: UIMessage = {
      id: '1',
      role: 'assistant',
      parts: [
        { type: 'reasoning', text: 'Checking the account', state: 'done' },
        { type: 'text', text: 'You have 100 kr.', state: 'done' },
      ],
    }
    render(<Ai.Message message={message} />)

    const children = document.querySelector(
      '.dnb-ai-message__content'
    ).children
    expect(children[0]).toHaveClass('dnb-ai-reasoning')
    expect(children[1]).toHaveClass('dnb-ai-response')
  })

  it('supports spacing props and forwards attributes', () => {
    render(
      <Ai.Reasoning top="large" className="custom" id="r">
        Hi
      </Ai.Reasoning>
    )

    const element = document.querySelector('.dnb-ai-reasoning')
    expect(element).toHaveClass('dnb-space__top--large', 'custom')
    expect(element).toHaveAttribute('id', 'r')
  })

  it('should validate with ARIA rules', async () => {
    const result = render(
      <>
        <Ai.Reasoning isStreaming>Thinking about it</Ai.Reasoning>
        <Ai.Reasoning>Thought about it</Ai.Reasoning>
      </>
    )
    expect(await axeComponent(result)).toHaveNoViolations()
  })
})
