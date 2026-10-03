import { fireEvent, render } from '@testing-library/react'
import NextButton from '../NextButton'
import { Provider } from '../../../../../shared'
import WizardContext from '../../Context/WizardContext'

describe('NextButton', () => {
  it('should have default text', () => {
    render(<NextButton />)

    const button = document.querySelector('.dnb-forms-next-button')

    expect(button).toHaveTextContent('Neste')
  })

  it('should use en-GB text', () => {
    render(
      <Provider locale="en-GB">
        <NextButton />
      </Provider>
    )

    const button = document.querySelector('.dnb-forms-next-button')

    expect(button).toHaveTextContent('Next')
  })

  it('should support custom text', () => {
    render(<NextButton text="Custom" />)

    const button = document.querySelector('.dnb-forms-next-button')

    expect(button).toHaveTextContent('Custom')
  })

  it('should be primary variant', () => {
    render(<NextButton />)

    const button = document.querySelector('.dnb-forms-next-button')

    expect(button).toHaveClass('dnb-button--primary')
  })

  it('should have chevron left icon', () => {
    render(<NextButton />)

    const button = document.querySelector('.dnb-forms-next-button')

    expect(button.querySelector('.dnb-icon')).toHaveAttribute(
      'data-testid',
      'chevron right icon'
    )
  })

  it('should handle handlePrevious event', () => {
    const handlePrevious = vi.fn()
    const handleNext = vi.fn()
    const setActiveIndex = vi.fn()
    const setFormError = vi.fn()

    render(
      <WizardContext
        value={{
          activeIndex: 1,
          handlePrevious,
          handleNext,
          setActiveIndex,
          setFormError,
        }}
      >
        <NextButton />
      </WizardContext>
    )

    const button = document.querySelector('.dnb-forms-next-button')

    fireEvent.click(button)

    expect(handlePrevious).toHaveBeenCalledTimes(0)
    expect(handleNext).toHaveBeenCalledTimes(1)
  })

  it('should keep navigating when an onClick is given', () => {
    const handleNext = vi.fn()
    const onClick = vi.fn()

    render(
      <WizardContext value={{ handleNext }}>
        <NextButton onClick={onClick} />
      </WizardContext>
    )

    fireEvent.click(document.querySelector('.dnb-forms-next-button'))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(handleNext).toHaveBeenCalledTimes(1)
  })

  it('should stay on the step when the given onClick returns false', () => {
    const handleNext = vi.fn()
    const onClick = vi.fn(() => false)

    render(
      <WizardContext value={{ handleNext }}>
        <NextButton onClick={onClick} />
      </WizardContext>
    )

    fireEvent.click(document.querySelector('.dnb-forms-next-button'))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(handleNext).not.toHaveBeenCalled()
  })

  it('should keep its own className when a className is given', () => {
    render(<NextButton className="custom" />)

    expect(document.querySelector('button')).toHaveClass(
      'dnb-forms-next-button',
      'custom'
    )
  })
})
