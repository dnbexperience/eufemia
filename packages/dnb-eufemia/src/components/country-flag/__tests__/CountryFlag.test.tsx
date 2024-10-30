import React from 'react'
import { render } from '@testing-library/react'
import CountryFlag from '../CountryFlag'
import Provider from '../../../shared/Provider'

describe('CountryFlag', () => {
  it('should use NO as default', () => {
    render(<CountryFlag />)

    const element = document.querySelector('.dnb-country-flag')
    const flag = element.querySelector('.dnb-country-flag__flag')

    expect(element.className).toBe(
      'dnb-space dnb-country-flag dnb-country-flag__size--auto'
    )
    expect(flag.className).toBe('dnb-country-flag__flag fis fi-no')
  })

  it('should use span as the root element', () => {
    render(<CountryFlag />)

    const element = document.querySelector('.dnb-country-flag')

    expect(element.tagName).toBe('SPAN')
  })

  it('should have aria-label', () => {
    render(<CountryFlag />)

    const element = document.querySelector('.dnb-country-flag')
    expect(element.querySelector('.dnb-sr-only').textContent).toBe('Norge')
  })

  it('should set aria-label in given locale', () => {
    render(
      <Provider locale="en-GB">
        <CountryFlag />
      </Provider>
    )

    const element = document.querySelector('.dnb-country-flag')
    expect(element.querySelector('.dnb-sr-only').textContent).toBe(
      'Norway'
    )
  })

  it('should set iso', () => {
    render(<CountryFlag iso="CH" />)

    const element = document.querySelector('.dnb-country-flag')
    const flag = element.querySelector('.dnb-country-flag__flag')

    expect(flag.className).toBe('dnb-country-flag__flag fis fi-ch')
  })

  it('should set size', () => {
    render(<CountryFlag size="large" />)

    const element = document.querySelector('.dnb-country-flag')

    expect(element.className).toBe(
      'dnb-space dnb-country-flag dnb-country-flag__size--large'
    )
  })

  it('should set spacing props', () => {
    render(<CountryFlag top="large" />)

    const element = document.querySelector('.dnb-country-flag')

    expect(element).toHaveClass('dnb-space__top--large')
  })
})
