import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { Provider } from '../../../shared'
import TextCounter from '../TextCounter'

describe('TextCounter', () => {
  it('renders without provider', () => {
    render(<TextCounter text="test" max={10} />)

    const element = document.querySelector('.dnb-text-counter')
    expect(element).toBeInTheDocument()
  })

  it('displays the correct count when variant is not specified', () => {
    render(<TextCounter text="test" max={10} />)

    const element = document.querySelector('.dnb-text-counter__message')
    expect(element).toHaveTextContent('4 av 10 tegn gjenstår')
  })

  it('displays the correct count for variant "down"', () => {
    render(<TextCounter variant="down" text="test" max={10} />)

    const element = document.querySelector('.dnb-text-counter__message')
    expect(element).toHaveTextContent('6 av 10 tegn gjenstår')
  })

  it('displays the correct count for variant "up"', () => {
    render(<TextCounter variant="up" text="test" max={10} />)

    const element = document.querySelector('.dnb-text-counter__message')
    expect(element).toHaveTextContent('Du har brukt 4 av 10 tegn')
  })

  it('does disable aria-live when bypassAriaLive', () => {
    const { rerender } = render(<TextCounter text="test" max={10} />)

    const aria = document.querySelector('.dnb-aria-live')
    expect(aria).toHaveAttribute('aria-live', 'polite')

    rerender(<TextCounter text="test" max={10} bypassAriaLive={true} />)

    expect(aria).toHaveAttribute('aria-live', 'off')
  })

  it('handles empty text correctly', () => {
    render(<TextCounter text="" max={10} />)

    const element = document.querySelector('.dnb-text-counter__message')
    expect(element).toHaveTextContent('0 av 10 tegn gjenstår')
  })

  it('handles text length exceeding max correctly', () => {
    render(<TextCounter text="this is a long text" max={10} />)

    const element = document.querySelector('.dnb-text-counter__message')
    expect(element).toHaveTextContent('10 av 10 tegn gjenstår')
  })

  it('handles negative max correctly', () => {
    render(<TextCounter text="test" max={-10} />)

    const element = document.querySelector('.dnb-text-counter__message')
    expect(element).toHaveTextContent('')
  })

  it('updates correctly when props change', () => {
    const { rerender } = render(<TextCounter text="test" max={10} />)

    const element = document.querySelector('.dnb-text-counter__message')
    expect(element).toHaveTextContent('4 av 10 tegn gjenstår')

    rerender(<TextCounter text="testing" max={10} />)

    expect(element).toHaveTextContent('7 av 10 tegn gjenstår')
  })

  it('supports lang and locale props', () => {
    const { rerender } = render(
      <Provider>
        <TextCounter text="test" max={10} lang="en-GB" />
      </Provider>
    )

    const element = document.querySelector('.dnb-text-counter__message')

    expect(element).toHaveTextContent('4 of 10 characters remaining')

    rerender(
      <Provider>
        <TextCounter text="test" max={10} locale="en-GB" />
      </Provider>
    )

    expect(element).toHaveTextContent('4 of 10 characters remaining')

    rerender(
      <Provider locale="en-GB">
        <TextCounter text="test" max={10} />
      </Provider>
    )

    expect(element).toHaveTextContent('4 of 10 characters remaining')

    rerender(
      <Provider locale="nb-NO">
        <TextCounter text="test" max={10} />
      </Provider>
    )

    expect(element).toHaveTextContent('4 av 10 tegn gjenstår')
  })

  it('should render AriaLive message', async () => {
    const { rerender } = render(
      <TextCounter bypassAriaLive={true} max={8} text="" />
    )

    const counter = document.querySelector('.dnb-text-counter__message')
    const ariaLive = document.querySelector('.dnb-aria-live')

    expect(counter).toHaveTextContent('0 av 8 tegn gjenstår')
    expect(ariaLive).toHaveTextContent('')

    rerender(<TextCounter bypassAriaLive={false} max={8} text="foo" />)

    expect(counter).toHaveTextContent('3 av 8 tegn gjenstår')

    await waitFor(() => {
      expect(ariaLive).toHaveTextContent('3 av 8 tegn gjenstår')
    })

    rerender(
      <TextCounter
        bypassAriaLive={true}
        max={8}
        text="foo bar baz"
        lang="en-GB"
      />
    )

    expect(counter).toHaveTextContent('8 of 8 characters remaining')

    await waitFor(() => {
      expect(ariaLive).toHaveTextContent('')
    })
  })

  it('supports spacing props', () => {
    render(<TextCounter text="test" max={10} top="large" />)

    const element = document.querySelector('.dnb-text-counter')
    expect(element).toHaveClass('dnb-space__top--large')
  })
})
