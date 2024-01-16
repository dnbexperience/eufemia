import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { fireEvent, render, waitFor } from '@testing-library/react'
import SelectCountry, { Props } from '..'
import { Provider } from '../../../../../shared'
import { Form, FormError } from '../../..'

describe('Field.SelectCountry', () => {
  it('should render with props', () => {
    const props: Props = {}
    render(<SelectCountry {...props} />)
  })

  it('should return correct value onChange event', () => {
    const onChange = jest.fn()

    render(<SelectCountry onChange={onChange} />)

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-country input'
    )
    const firstItemElement = () =>
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
    expect(inputElement.value).toEqual('')

    fireEvent.focus(inputElement)
    fireEvent.change(inputElement, { target: { value: 'Norg' } })
    fireEvent.click(firstItemElement())

    expect(onChange).toHaveBeenLastCalledWith('NO', {
      cdc: '47',
      continent: 'Europe',
      i18n: {
        en: 'Norway',
        nb: 'Norge',
      },
      iso: 'NO',
      regions: ['Scandinavia', 'Nordic'],
    })
    expect(inputElement.value).toEqual('Norge')

    fireEvent.focus(inputElement)
    fireEvent.change(inputElement, { target: { value: 'Dan' } })
    fireEvent.click(firstItemElement())

    expect(onChange).toHaveBeenLastCalledWith('DK', {
      cdc: '45',
      continent: 'Europe',
      i18n: {
        en: 'Denmark',
        nb: 'Danmark',
      },
      iso: 'DK',
      regions: ['Scandinavia', 'Nordic'],
    })
    expect(inputElement.value).toEqual('Danmark')
  })

  it('should select matching country on type change to support autofill', async () => {
    const onChange = jest.fn()

    render(<SelectCountry onChange={onChange} />)

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-country input'
    )
    const liElements = () =>
      document.querySelectorAll('li:not([aria-hidden])')
    const selectedItemElement = () =>
      document.querySelector(
        '.dnb-drawer-list__option.dnb-drawer-list__option--selected'
      )

    fireEvent.focus(inputElement)
    fireEvent.change(inputElement, {
      target: { value: 'sver' },
      nativeEvent: undefined,
    })

    expect(inputElement.value).toEqual('Sverige')
    expect(liElements()).toHaveLength(2)
    expect(selectedItemElement().textContent).toBe('Sverige')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith('SE', {
      cdc: '46',
      continent: 'Europe',
      i18n: { en: 'Sweden', nb: 'Sverige' },
      iso: 'SE',
      regions: ['Scandinavia', 'Nordic'],
    })
  })

  it('should filter countries list with given filterCountries', () => {
    render(
      <SelectCountry
        filterCountries={({ regions }) => regions?.includes('Scandinavia')}
      />
    )

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-country input'
    )

    // open
    fireEvent.focus(inputElement)
    fireEvent.keyDown(inputElement, {
      key: 'Enter',
      keyCode: 13,
    })

    const liElements = document.querySelectorAll('li:not([aria-hidden])')
    expect(liElements).toHaveLength(3)
    expect(liElements[0].textContent).toBe('Norge')
    expect(liElements[1].textContent).toBe('Sverige')
    expect(liElements[2].textContent).toBe('Danmark')

    expect(
      document.querySelector('li.dnb-drawer-list__option--selected')
    ).not.toBeInTheDocument()
  })

  it('should by default sort prioritized countries on top', () => {
    render(<SelectCountry />)

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-country input'
    )

    // open
    fireEvent.focus(inputElement)
    fireEvent.keyDown(inputElement, {
      key: 'Enter',
      keyCode: 13,
    })

    const liElements = document.querySelectorAll('li:not([aria-hidden])')
    expect(liElements.length).toBeGreaterThan(200)
    expect(liElements[0].textContent).toBe('Norge')
    expect(liElements[1].textContent).toBe('Sverige')
    expect(liElements[2].textContent).toBe('Danmark')
    expect(liElements[3].textContent).toBe('Finland')
    expect(liElements[4].textContent).toBe('Afghanistan')
  })

  it('should show only Scandinavian countries', () => {
    render(<SelectCountry countries="Scandinavia" />)

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-country input'
    )

    // open
    fireEvent.focus(inputElement)
    fireEvent.keyDown(inputElement, {
      key: 'Enter',
      keyCode: 13,
    })

    const liElements = document.querySelectorAll('li:not([aria-hidden])')
    expect(liElements).toHaveLength(3)
    expect(liElements[0].textContent).toBe('Danmark')
    expect(liElements[1].textContent).toBe('Norge')
    expect(liElements[2].textContent).toBe('Sverige')
  })

  it('should sort prioritized countries on top', () => {
    render(<SelectCountry countries="Prioritized" />)

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-country input'
    )

    // open
    fireEvent.focus(inputElement)
    fireEvent.keyDown(inputElement, {
      key: 'Enter',
      keyCode: 13,
    })

    const liElements = document.querySelectorAll('li:not([aria-hidden])')
    expect(liElements.length).toBeGreaterThan(200)
    expect(liElements[0].textContent).toBe('Norge')
    expect(liElements[1].textContent).toBe('Sverige')
    expect(liElements[2].textContent).toBe('Danmark')
    expect(liElements[3].textContent).toBe('Finland')
    expect(liElements[4].textContent).toBe('Afghanistan')
  })

  it('should validate when required', () => {
    render(
      <Form.Handler>
        <SelectCountry required />
        <Form.SubmitButton />
      </Form.Handler>
    )

    const buttonElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-submit-button'
    )

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()

    fireEvent.click(buttonElement)

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()
  })

  it('should execute validateInitially if required', () => {
    const { rerender } = render(
      <SelectCountry required validateInitially />
    )

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()

    rerender(<SelectCountry validateInitially />)

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()
  })

  it('should change locale', async () => {
    const { rerender } = render(
      <Provider>
        <SelectCountry value="NO" />
      </Provider>
    )

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-country input'
    )

    fireEvent.mouseDown(inputElement)

    const selectedItemElement = () =>
      document.querySelector(
        '.dnb-drawer-list__option.dnb-drawer-list__option--selected'
      )

    expect(inputElement.value).toBe('Norge')
    expect(selectedItemElement().textContent).toBe('Norge')

    rerender(
      <Provider locale="en-GB">
        <SelectCountry value="NO" />
      </Provider>
    )

    fireEvent.mouseDown(inputElement)

    await waitFor(() => {
      expect(inputElement.value).toBe('Norway')
      expect(selectedItemElement().textContent).toBe('Norway')
    })

    rerender(
      <Provider locale="nb-NO">
        <SelectCountry value="DK" />
      </Provider>
    )

    fireEvent.mouseDown(inputElement)

    expect(inputElement.value).toBe('Danmark')
    expect(selectedItemElement().textContent).toBe('Danmark')
  })

  it('shold display read border on dropdown', () => {
    const errorMessage = new FormError('Error message')
    render(<SelectCountry error={errorMessage} />)

    const input = document.querySelector('.dnb-autocomplete__input')
    expect(input).toHaveClass('dnb-input__status--error')

    const element = document.querySelector('.dnb-form-status')
    expect(element).toHaveTextContent('Error message')
  })

  it('should validate with ARIA rules', async () => {
    const result = render(<SelectCountry value="DK" />)

    expect(await axeComponent(result)).toHaveNoViolations()
  })
})
