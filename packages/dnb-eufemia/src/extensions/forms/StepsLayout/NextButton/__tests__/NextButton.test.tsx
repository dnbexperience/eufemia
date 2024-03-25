import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import NextButton from '../NextButton'
import { Provider } from '../../../../../shared'
import StepsContext from '../../StepsContext'

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
        <NextButton />
      </StepsContext.Provider>
    )

    const button = document.querySelector('.dnb-forms-next-button')

    fireEvent.click(button)

    expect(handlePrevious).toHaveBeenCalledTimes(0)
    expect(handleNext).toHaveBeenCalledTimes(1)
  })
})
