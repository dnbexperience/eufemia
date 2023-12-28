import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import OrganizationNumber from '../OrganizationNumber'

describe('Field.OrganizationNumber', () => {
  it('should have Norwegian mask', async () => {
    render(<OrganizationNumber />)

    const element = document.querySelector('input')
    await userEvent.type(element, '123456789')
    expect(element.value).toBe('123 456 789')
  })

  it('should have medium width', () => {
    render(<OrganizationNumber />)

    const element = document.querySelector(
      '.dnb-forms-field-block__contents'
    )
    expect(element.className).toContain(
      'dnb-forms-field-block__contents--width-medium'
    )
  })

  it('should have disabled autocomplete', () => {
    render(<OrganizationNumber />)

    const element = document.querySelector('input')
    expect(element.autocomplete).toBe('off')
  })

  it('should link for and label', () => {
    render(<OrganizationNumber />)

    const labelElement = document.querySelector('label')
    const inputElement = document.querySelector('input')

    expect(inputElement.getAttribute('id')).toBe(
      labelElement.getAttribute('for')
    )
  })

  it('should have default label', () => {
    render(<OrganizationNumber />)

    const element = document.querySelector('label')
    expect(element.textContent).toBe('Organisasjonsnummer')
  })

  it('should have numeric input mode', () => {
    render(<OrganizationNumber />)

    const input = document.querySelector('.dnb-input__input')
    expect(input).toHaveAttribute('inputmode')
    expect(input.getAttribute('inputmode')).toBe('numeric')
  })
})
