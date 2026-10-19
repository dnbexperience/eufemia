import { render } from '@testing-library/react'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Provider from '../../../shared/Provider'
import Avatar from '../../../components/Avatar'
import { aino } from '../../../icons'
import { DateMarker, Suggestion, Suggestions, Welcome } from '..'

describe('Ai.Welcome', () => {
  it('renders a heading and content', () => {
    render(
      <Welcome title="Hello, Peter">
        <Suggestions>
          <Suggestion suggestion="Block my card" />
        </Suggestions>
      </Welcome>
    )

    const heading = document.querySelector('h2')
    expect(heading).toHaveTextContent('Hello, Peter')
    expect(heading).toHaveClass('dnb-ai-welcome__title', 'dnb-h--large')
    expect(
      document.querySelector('.dnb-ai-welcome .dnb-ai-suggestions')
    ).toBeInTheDocument()
  })

  it('renders a greeting with a decorative avatar before the heading', () => {
    render(
      <Welcome
        greeting="Hi Matthias"
        avatar={<Avatar size="small" icon={aino} aria-hidden />}
        title="Where do you want to start today?"
      />
    )
    const greeting = document.querySelector('.dnb-ai-welcome__greeting')
    expect(greeting).toHaveTextContent('Hi Matthias')
    expect(greeting.nextElementSibling).toBe(document.querySelector('h2'))
    expect(
      greeting.querySelector('.dnb-ai-welcome__avatar')
    ).toHaveAttribute('aria-hidden', 'true')
    expect(document.querySelector('h2')).toHaveAccessibleName(
      'Where do you want to start today?'
    )
  })

  it('supports a greeting without an avatar and omits an unused avatar', () => {
    const { rerender } = render(
      <Welcome greeting="Hello" title="Start here" />
    )
    expect(
      document.querySelector('.dnb-ai-welcome__greeting')
    ).toHaveTextContent('Hello')
    expect(document.querySelector('.dnb-ai-welcome__avatar')).toBeNull()
    rerender(<Welcome avatar={<span>Unused</span>} title="Start here" />)
    expect(document.querySelector('.dnb-ai-welcome__greeting')).toBeNull()
    expect(
      document.querySelector('.dnb-ai-welcome')
    ).not.toHaveTextContent('Unused')
  })

  it('supports a heading level', () => {
    render(<Welcome title="Hello" level={1} />)
    expect(document.querySelector('h1')).toHaveTextContent('Hello')
  })

  it('supports spacing props and forwards attributes', () => {
    render(<Welcome title="Hi" top="large" className="custom" id="w" />)

    const element = document.querySelector('.dnb-ai-welcome')
    expect(element).toHaveClass('dnb-space__top--large', 'custom')
    expect(element).toHaveAttribute('id', 'w')
  })

  it('should validate with ARIA rules', async () => {
    const result = render(
      <Welcome
        greeting="Hi Matthias"
        avatar={<Avatar size="small" icon={aino} aria-hidden />}
        title="Where do you want to start today?"
      >
        <Suggestions>
          <Suggestion suggestion="Make a transfer" />
        </Suggestions>
      </Welcome>
    )
    expect(await axeComponent(result)).toHaveNoViolations()
  })
})

describe('Ai.DateMarker', () => {
  it('renders the date with the weekday and a line', () => {
    render(<DateMarker date="2026-02-02" />)

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
        <DateMarker date="2026-02-02" />
      </Provider>
    )
    expect(
      document.querySelector('.dnb-ai-date-marker__date')
    ).toHaveTextContent('Monday, 2 February 2026')
  })

  it('shows children instead of the date', () => {
    render(<DateMarker>Today</DateMarker>)
    expect(
      document.querySelector('.dnb-ai-date-marker__date')
    ).toHaveTextContent('Today')
  })

  it('supports spacing props and forwards attributes', () => {
    render(<DateMarker top="large" className="custom" id="d" />)

    const element = document.querySelector('.dnb-ai-date-marker')
    expect(element).toHaveClass('dnb-space__top--large', 'custom')
    expect(element).toHaveAttribute('id', 'd')
  })

  it('should validate with ARIA rules', async () => {
    const result = render(<DateMarker date="2026-02-02" />)
    expect(await axeComponent(result)).toHaveNoViolations()
  })
})
