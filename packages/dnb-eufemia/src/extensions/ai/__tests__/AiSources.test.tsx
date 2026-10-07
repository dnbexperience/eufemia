import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { AiMessageData } from '../types'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Provider from '../../../shared/Provider'
import * as Ai from '..'

const sources = [
  { url: 'https://www.dnb.no/kort', title: 'Block a card' },
  { url: 'https://www.dnb.no/' },
]

const getToggle = () =>
  document.querySelector<HTMLButtonElement>('.dnb-ai-collapsible__toggle')

describe('Ai.Sources', () => {
  it('renders a collapsed toggle with the number of sources', () => {
    render(<Ai.Sources sources={sources} />)

    expect(getToggle()).toHaveTextContent('Kilder (2)')
    expect(getToggle()).toHaveAttribute('aria-expanded', 'false')
    expect(document.querySelector('a')).toBeNull()
  })

  it('lists the sources as links when opened', async () => {
    render(<Ai.Sources sources={sources} />)

    await userEvent.click(getToggle())

    expect(getToggle()).toHaveAttribute('aria-expanded', 'true')
    expect(getToggle()).toHaveClass('dnb-ai-collapsible__toggle--open')

    const list = document.getElementById(
      getToggle().getAttribute('aria-controls')
    )
    const links = list.querySelectorAll('a')
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveAttribute('href', 'https://www.dnb.no/kort')
    expect(links[0]).toHaveAttribute('target', '_blank')
    expect(links[0]).toHaveTextContent('Block a card')
    expect(links[1]).toHaveTextContent('https://www.dnb.no/')
  })

  it('lists the source-url parts of a message', () => {
    const message: AiMessageData = {
      id: '1',
      role: 'assistant',
      parts: [
        { type: 'text', text: 'Hi' },
        {
          type: 'source-url',
          sourceId: 'a',
          url: 'https://www.dnb.no/',
          title: 'DNB',
        },
      ],
    }
    render(
      <Provider locale="en-GB">
        <Ai.Sources message={message} />
      </Provider>
    )

    expect(getToggle()).toHaveTextContent('Sources (1)')
  })

  it('leaves out unsafe URLs', () => {
    const { rerender } = render(
      <Ai.Sources
        sources={[
          { url: 'javascript:alert(1)' },
          { url: 'https://www.dnb.no/' },
        ]}
      />
    )
    expect(getToggle()).toHaveTextContent('Kilder (1)')

    rerender(<Ai.Sources sources={[{ url: 'javascript:alert(1)' }]} />)
    expect(document.querySelector('.dnb-ai-sources')).toBeNull()
  })

  it('leaves out backslash network-path sources', () => {
    render(
      <Ai.Sources
        sources={[
          { url: String.raw`\\evil.example/path`, title: 'Source' },
        ]}
      />
    )

    expect(document.querySelector('.dnb-ai-sources')).toBeNull()
  })

  it('renders nothing without sources', () => {
    render(<Ai.Sources sources={[]} />)
    expect(document.querySelector('.dnb-ai-sources')).toBeNull()
  })

  it('is rendered by Ai.Message for a message', () => {
    const message: AiMessageData = {
      id: '1',
      role: 'assistant',
      parts: [
        { type: 'text', text: 'Hi', state: 'done' },
        { type: 'source-url', sourceId: 'a', url: 'https://www.dnb.no/' },
      ],
    }
    render(<Ai.Message message={message} />)

    expect(
      document.querySelector('.dnb-ai-message__content + .dnb-ai-sources')
    ).toBeInTheDocument()
  })

  it('supports spacing props and forwards attributes', () => {
    render(
      <Ai.Sources
        sources={sources}
        top="large"
        className="custom"
        id="s"
      />
    )

    const element = document.querySelector('.dnb-ai-sources')
    expect(element).toHaveClass('dnb-space__top--large', 'custom')
    expect(element).toHaveAttribute('id', 's')
  })

  it('should validate with ARIA rules', async () => {
    const result = render(<Ai.Sources sources={sources} />)
    expect(await axeComponent(result)).toHaveNoViolations()

    await userEvent.click(getToggle())
    expect(await axeComponent(result)).toHaveNoViolations()
  })
})
