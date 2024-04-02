import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import PreviousButton from '../PreviousButton'
import StepsContext from '../../Context/StepsContext'
import { Provider } from '../../../../../shared'

describe('PreviousButton', () => {
  it('should have default text', () => {
    render(<PreviousButton />)

    const button = document.querySelector('.dnb-forms-previous-button')

    expect(button).toHaveTextContent('Tilbake')
  })

  it('should use en-GB text', () => {
    render(
      <Provider locale="en-GB">
        <PreviousButton />
      </Provider>
    )

    const button = document.querySelector('.dnb-forms-previous-button')

    expect(button).toHaveTextContent('Back')
  })

  it('should support custom text', () => {
    render(<PreviousButton text="Custom" />)

    const button = document.querySelector('.dnb-forms-previous-button')

    expect(button).toHaveTextContent('Custom')
  })

  it('should be tertiary variant', () => {
    render(<PreviousButton />)

    const button = document.querySelector('.dnb-forms-previous-button')

    expect(button).toHaveClass('dnb-button--tertiary')
  })

  it('should have chevron left icon', () => {
    render(<PreviousButton />)

    const button = document.querySelector('.dnb-forms-previous-button')

    expect(button.querySelector('.dnb-icon')).toHaveAttribute(
      'data-testid',
      'chevron left icon'
    )
  })

  it('should be disabled when activeIndex is 0', () => {
    const { rerender } = render(
      <StepsContext.Provider
        value={{
          activeIndex: 1,
          handlePrevious: () => null,
          handleNext: () => null,
          setActiveIndex: () => null,
        }}
      >
        <PreviousButton />
      </StepsContext.Provider>
    )

    const button = document.querySelector('.dnb-forms-previous-button')

    expect(button).not.toBeDisabled()

    rerender(
      <StepsContext.Provider
        value={{
          activeIndex: 0,
          handlePrevious: () => null,
          handleNext: () => null,
          setActiveIndex: () => null,
        }}
      >
        <PreviousButton />
      </StepsContext.Provider>
    )

    expect(button).toBeDisabled()
  })

  it('should handle handlePrevious event', () => {
    const handlePrevious = jest.fn()
    const handleNext = jest.fn()
    const setActiveIndex = jest.fn()

    render(
      <StepsContext.Provider
        value={{
          activeIndex: 1,
          handlePrevious,
          handleNext,
          setActiveIndex,
        }}
      >
        <PreviousButton />
      </StepsContext.Provider>
    )

    const button = document.querySelector('.dnb-forms-previous-button')

    fireEvent.click(button)

    expect(handlePrevious).toHaveBeenCalledTimes(1)
    expect(handleNext).toHaveBeenCalledTimes(0)
  })
})
