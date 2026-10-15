import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Provider from '../../../shared/Provider'
import { ActivityText, Message, Reasoning, Response } from '..'

const getToggle = () =>
  document.querySelector<HTMLButtonElement>('.dnb-ai-collapsible__toggle')
const getContent = () =>
  document.querySelector('.dnb-ai-reasoning__content')

describe('Ai.ActivityText', () => {
  it('renders the text', () => {
    render(<ActivityText>Thinking</ActivityText>)
    expect(
      document.querySelector('span.dnb-ai-activity-text')
    ).toHaveTextContent('Thinking')
  })

  it('supports spacing props and forwards attributes', () => {
    render(
      <ActivityText left="small" className="custom" id="s">
        Hi
      </ActivityText>
    )

    const element = document.querySelector('.dnb-ai-activity-text')
    expect(element).toHaveClass('dnb-space__left--small', 'custom')
    expect(element).toHaveAttribute('id', 's')
  })
})

describe('Ai.Reasoning', () => {
  it('is open with activity text while streaming', () => {
    render(<Reasoning isStreaming>{'Looking at **March**'}</Reasoning>)

    expect(getToggle()).toHaveAttribute('aria-expanded', 'true')
    expect(
      getToggle().querySelector('.dnb-ai-activity-text')
    ).toHaveTextContent('Tenker …')
    expect(getContent().querySelector('strong')).toHaveTextContent('March')
  })

  it('closes when the streaming is done', () => {
    const { rerender } = render(
      <Reasoning isStreaming>Thinking about it</Reasoning>
    )

    rerender(<Reasoning isStreaming={false}>Thinking about it</Reasoning>)

    expect(getToggle()).toHaveAttribute('aria-expanded', 'false')
    expect(getToggle()).toHaveTextContent('Tankeprosess')
    expect(getToggle().querySelector('.dnb-ai-activity-text')).toBeNull()
  })

  it('stays as the user left it', async () => {
    const { rerender } = render(
      <Reasoning isStreaming>Thinking about it</Reasoning>
    )

    await userEvent.click(getToggle())
    await userEvent.click(getToggle())
    rerender(<Reasoning isStreaming={false}>Thinking about it</Reasoning>)

    expect(getToggle()).toHaveAttribute('aria-expanded', 'true')
  })

  it('can be opened when done', async () => {
    render(<Reasoning>Thinking about it</Reasoning>)

    expect(getToggle()).toHaveAttribute('aria-expanded', 'false')
    expect(getContent()).toBeNull()

    await userEvent.click(getToggle())

    expect(getToggle()).toHaveAttribute('aria-expanded', 'true')
    expect(
      document.getElementById(getToggle().getAttribute('aria-controls'))
    ).toHaveTextContent('Thinking about it')
  })

  it('uses explicit text and streaming state', () => {
    render(
      <Provider locale="en-GB">
        <Reasoning isStreaming>Step one</Reasoning>
      </Provider>
    )
    expect(getToggle()).toHaveTextContent('Thinking …')
    expect(getContent()).toHaveTextContent('Step one')
  })

  it('composes reasoning before the response', () => {
    render(
      <Message>
        <Reasoning>Checking the account</Reasoning>
        <Response parseIncompleteMarkdown={false}>
          You have 100 kr.
        </Response>
      </Message>
    )
    const children = document.querySelector(
      '.dnb-ai-message__content'
    ).children
    expect(children[0]).toHaveClass('dnb-ai-reasoning')
    expect(children[1]).toHaveClass('dnb-ai-response')
  })

  it('supports spacing props and forwards attributes', () => {
    render(
      <Reasoning top="large" className="custom" id="r">
        Hi
      </Reasoning>
    )

    const element = document.querySelector('.dnb-ai-reasoning')
    expect(element).toHaveClass('dnb-space__top--large', 'custom')
    expect(element).toHaveAttribute('id', 'r')
  })

  it('should validate with ARIA rules', async () => {
    const result = render(
      <>
        <Reasoning isStreaming>Thinking about it</Reasoning>
        <Reasoning>Thought about it</Reasoning>
      </>
    )
    expect(await axeComponent(result)).toHaveNoViolations()
  })
})
