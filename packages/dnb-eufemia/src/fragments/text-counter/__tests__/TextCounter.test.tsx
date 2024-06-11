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

    const element = document.querySelector('.dnb-text-counter')
    expect(element).toHaveTextContent('6 av 10 tegn gjenstår')
  })

  it('displays the correct count for variant "down"', () => {
    render(<TextCounter variant="down" text="test" max={10} />)

    const element = document.querySelector('.dnb-text-counter')
    expect(element).toHaveTextContent('6 av 10 tegn gjenstår')
  })

  it('displays the correct count for variant "up"', () => {
    render(<TextCounter variant="up" text="test" max={10} />)

    const element = document.querySelector('.dnb-text-counter')
    expect(element).toHaveTextContent('Du har brukt 4 av 10 tegn')
  })

  it('handles empty text correctly', () => {
    render(<TextCounter text="" max={10} />)

    const element = document.querySelector('.dnb-text-counter')
    expect(element).toHaveTextContent('0 av 10 tegn gjenstår')
  })

  it('handles text length exceeding max correctly in down variant', () => {
    render(
      <TextCounter text="this is a long text" max={10} variant="down" />
    )

    const element = document.querySelector('.dnb-text-counter')
    expect(element).toHaveTextContent('9 tegn over grensen på 10.')
  })

  it('handles negative max correctly in down variant', () => {
    render(<TextCounter text="test" max={-10} variant="down" />)

    const element = document.querySelector('.dnb-text-counter')
    expect(element).toHaveTextContent('')
  })

  it('handles text length exceeding max correctly in up variant', () => {
    render(
      <TextCounter text="this is a long text" max={10} variant="up" />
    )

    const element = document.querySelector('.dnb-text-counter')
    expect(element.textContent).toBe('9 tegn over grensen på 10.')
  })

  it('handles negative max correctly in up variant', () => {
    render(<TextCounter text="test" max={-10} variant="up" />)

    const element = document.querySelector('.dnb-text-counter')
    expect(element).toHaveTextContent('')
  })

  it('updates correctly when props change', () => {
    const { rerender } = render(<TextCounter text="test" max={10} />)

    const element = document.querySelector('.dnb-text-counter')
    expect(element).toHaveTextContent('6 av 10 tegn gjenstår')

    rerender(<TextCounter text="testing" max={10} />)

    expect(element).toHaveTextContent('3 av 10 tegn gjenstår')
  })

  it('supports lang and locale props', () => {
    const { rerender } = render(
      <Provider>
        <TextCounter text="test" max={10} lang="en-GB" />
      </Provider>
    )

    const element = document.querySelector('.dnb-text-counter')

    expect(element).toHaveTextContent('6 of 10 characters remaining')

    rerender(
      <Provider>
        <TextCounter text="test" max={10} locale="en-GB" />
      </Provider>
    )

    expect(element).toHaveTextContent('6 of 10 characters remaining')

    rerender(
      <Provider locale="en-GB">
        <TextCounter text="test" max={10} />
      </Provider>
    )

    expect(element).toHaveTextContent('6 of 10 characters remaining')

    rerender(
      <Provider locale="nb-NO">
        <TextCounter text="test" max={10} />
      </Provider>
    )

    expect(element).toHaveTextContent('6 av 10 tegn gjenstår')
  })

  it('should have exceeded class when text lengths exceeds the max', () => {
    const { rerender } = render(<TextCounter text="test" max={4} />)

    const element = document.querySelector('.dnb-text-counter')
    expect(element).not.toHaveClass('dnb-text-counter--exceeded')
    expect(element).toHaveTextContent('0 av 4 tegn gjenstår')

    rerender(<TextCounter text="testing" max={4} />)

    expect(element).toHaveClass('dnb-text-counter--exceeded')
    expect(element).toHaveTextContent('3 tegn over grensen på 4.')

    rerender(<TextCounter text="testing" max={4} variant="up" />)

    expect(element).toHaveClass('dnb-text-counter--exceeded')
    expect(element).toHaveTextContent('3 tegn over grensen på 4.')
  })

  it('should have empty AriaLive message before a text change is made', () => {
    const { rerender } = render(<TextCounter text="test" max={10} />)

    const aria = document.querySelector('.dnb-aria-live')
    expect(aria).toHaveAttribute('aria-live', 'polite')

    rerender(<TextCounter text="test" max={10} />)

    expect(aria).toHaveAttribute('aria-live', 'polite')
    expect(aria).toHaveTextContent('')
  })

  it('should render AriaLive message', async () => {
    const { rerender } = render(<TextCounter max={8} text="" />)

    const counter = document.querySelector('.dnb-text-counter')
    const ariaLive = document.querySelector('.dnb-aria-live')

    expect(counter).toHaveTextContent('8 av 8 tegn gjenstår')
    expect(ariaLive).toHaveTextContent('')

    rerender(<TextCounter max={8} text="foo" />)

    expect(counter).toHaveTextContent('5 av 8 tegn gjenstår')

    await waitFor(() => {
      expect(ariaLive).toHaveTextContent('5 av 8 tegn gjenstår')
    })

    rerender(<TextCounter max={8} text="foo bar baz" lang="en-GB" />)

    expect(counter).toHaveTextContent('3 characters over the limit of 8.')

    await waitFor(() => {
      expect(ariaLive).toHaveTextContent('')
    })
  })

  it('supports spacing props', () => {
    render(<TextCounter text="test" max={10} top="large" />)

    const element = document.querySelector('.dnb-text-counter')
    expect(element).toHaveClass('dnb-space__top--large')
  })

  it('supports accept custom class', () => {
    render(<TextCounter text="test" max={10} className="custom-class" />)

    const element = document.querySelector('.dnb-text-counter')
    expect(element).toHaveClass('custom-class')
  })

  it('should have paragraph element', () => {
    render(<TextCounter text="test" max={10} />)

    const element = document.querySelector('.dnb-text-counter')
    expect(element.tagName).toBe('P')
  })
})
