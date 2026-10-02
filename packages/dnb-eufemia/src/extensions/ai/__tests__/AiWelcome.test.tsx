import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Provider from '../../../shared/Provider'
import * as Ai from '..'

describe('Ai.Welcome', () => {
  it('renders a heading and content', () => {
    render(
      <Ai.Welcome title="Hello, Peter">
        <Ai.Suggestions>
          <Ai.Suggestion suggestion="Block my card" />
        </Ai.Suggestions>
      </Ai.Welcome>
    )

    const heading = document.querySelector('h2')
    expect(heading).toHaveTextContent('Hello, Peter')
    expect(heading).toHaveClass('dnb-ai-welcome__title', 'dnb-h--x-large')
    expect(
      document.querySelector('.dnb-ai-welcome .dnb-ai-suggestions')
    ).toBeInTheDocument()
  })

  it('supports a heading level', () => {
    render(<Ai.Welcome title="Hello" level={1} />)
    expect(document.querySelector('h1')).toHaveTextContent('Hello')
  })

  it('supports spacing props and forwards attributes', () => {
    render(<Ai.Welcome title="Hi" top="large" className="custom" id="w" />)

    const element = document.querySelector('.dnb-ai-welcome')
    expect(element).toHaveClass('dnb-space__top--large', 'custom')
    expect(element).toHaveAttribute('id', 'w')
  })

  it('should validate with ARIA rules', async () => {
    const result = render(<Ai.Welcome title="Hello, Peter" />)
    expect(await axeComponent(result)).toHaveNoViolations()
  })
})

describe('Ai.DateMarker', () => {
  it('renders the date with the weekday and a line', () => {
    render(<Ai.DateMarker date="2026-02-02" />)

    expect(
      document.querySelector('.dnb-ai-date-marker__date')
    ).toHaveTextContent('mandag 2. februar 2026')
    expect(
      document.querySelector('.dnb-ai-date-marker__line')
    ).toBeInTheDocument()
  })

  it('formats the date in the given locale', () => {
    render(
      <Provider locale="en-GB">
        <Ai.DateMarker date="2026-02-02" />
      </Provider>
    )
    expect(
      document.querySelector('.dnb-ai-date-marker__date')
    ).toHaveTextContent('Monday, 2 February 2026')
  })

  it('shows children instead of the date', () => {
    render(<Ai.DateMarker>Today</Ai.DateMarker>)
    expect(
      document.querySelector('.dnb-ai-date-marker__date')
    ).toHaveTextContent('Today')
  })

  it('supports spacing props and forwards attributes', () => {
    render(<Ai.DateMarker top="large" className="custom" id="d" />)

    const element = document.querySelector('.dnb-ai-date-marker')
    expect(element).toHaveClass('dnb-space__top--large', 'custom')
    expect(element).toHaveAttribute('id', 'd')
  })

  it('should validate with ARIA rules', async () => {
    const result = render(<Ai.DateMarker date="2026-02-02" />)
    expect(await axeComponent(result)).toHaveNoViolations()
  })
})

describe('Ai.Disclaimer', () => {
  it('renders the content', () => {
    render(
      <Ai.Disclaimer>AI-generated answers can be wrong.</Ai.Disclaimer>
    )
    expect(document.querySelector('.dnb-ai-disclaimer')).toHaveTextContent(
      'AI-generated answers can be wrong.'
    )
  })

  it('supports spacing props and forwards attributes', () => {
    render(<Ai.Disclaimer top="large" className="custom" id="x" />)

    const element = document.querySelector('.dnb-ai-disclaimer')
    expect(element).toHaveClass('dnb-space__top--large', 'custom')
    expect(element).toHaveAttribute('id', 'x')
  })
})
