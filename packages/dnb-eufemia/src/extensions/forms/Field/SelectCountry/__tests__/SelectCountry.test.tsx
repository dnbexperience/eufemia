import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { Props } from '..'
import { Provider } from '../../../../../shared'
import { Field, Form, FieldBlock, Value } from '../../..'
import userEvent from '@testing-library/user-event'

describe('Field.SelectCountry', () => {
  it('should render with props', () => {
    const props: Props = {}
    render(<Field.SelectCountry {...props} />)
    expect(document.querySelector('input')).toBeInTheDocument()
  })

  it('should return correct value onChange event', () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    const onFocus = jest.fn()

    render(
      <Field.SelectCountry
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    )

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-country input'
    )
    const firstItemElement = () =>
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
    expect(inputElement).toHaveValue('')

    fireEvent.focus(inputElement)
    fireEvent.change(inputElement, { target: { value: 'Norge' } })
    fireEvent.click(firstItemElement())

    const firstEventValues = [
      'NO',
      {
        cdc: '47',
        continent: 'Europe',
        i18n: {
          en: 'Norway',
          nb: 'Norge',
        },
        iso: 'NO',
        regions: ['Scandinavia', 'Nordic'],
        name: 'Norge',
      },
    ]
    expect(onChange).toHaveBeenLastCalledWith(...firstEventValues)
    expect(inputElement).toHaveValue('Norge')

    fireEvent.blur(inputElement)
    fireEvent.focus(inputElement)

    expect(onFocus).toHaveBeenLastCalledWith(...firstEventValues)
    expect(onBlur).toHaveBeenLastCalledWith(...firstEventValues)

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
      name: 'Danmark',
    })
    expect(inputElement).toHaveValue('Danmark')
  })

  it('should select matching country on type change to support autofill', async () => {
    const onChange = jest.fn()

    render(<Field.SelectCountry onChange={onChange} />)

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

    expect(inputElement).toHaveValue('Sverige')
    expect(liElements()).toHaveLength(2)
    expect(selectedItemElement().textContent).toBe('Sverige')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith('SE', {
      cdc: '46',
      continent: 'Europe',
      i18n: { en: 'Sweden', nb: 'Sverige' },
      iso: 'SE',
      regions: ['Scandinavia', 'Nordic'],
      name: 'Sverige',
    })
  })

  it('should filter countries list with given filterCountries', () => {
    render(
      <Field.SelectCountry
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
    render(<Field.SelectCountry />)

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
    render(<Field.SelectCountry countries="Scandinavia" />)

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

  it('should show only Scandinavian countries and filterCountries at the same time', () => {
    render(
      <Field.SelectCountry
        countries="Scandinavia"
        filterCountries={({ iso }) => iso !== 'DK'}
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
    expect(liElements).toHaveLength(2)
    expect(liElements[0].textContent).toBe('Norge')
    expect(liElements[1].textContent).toBe('Sverige')
  })

  it('should sort prioritized countries on top', () => {
    render(<Field.SelectCountry countries="Prioritized" />)

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
        <Field.SelectCountry required />
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

  it('should use value from path', () => {
    render(
      <Form.Handler defaultData={{ country: 'NO' }}>
        <Field.SelectCountry path="/country" />
      </Form.Handler>
    )

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-country input'
    )

    expect(inputElement.value).toBe('Norge')
  })

  it('should execute validateInitially if required', () => {
    const { rerender } = render(
      <Field.SelectCountry required validateInitially />
    )

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()

    rerender(<Field.SelectCountry validateInitially />)

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()
  })

  it('should change locale', async () => {
    const { rerender } = render(
      <Provider>
        <Field.SelectCountry value="NO" />
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
        <Field.SelectCountry value="NO" />
      </Provider>
    )

    fireEvent.mouseDown(inputElement)

    await waitFor(() => {
      expect(inputElement.value).toBe('Norway')
      expect(selectedItemElement().textContent).toBe('Norway')
    })

    rerender(
      <Provider locale="nb-NO">
        <Field.SelectCountry value="DK" />
      </Provider>
    )

    fireEvent.mouseDown(inputElement)

    expect(inputElement.value).toBe('Danmark')
    expect(selectedItemElement().textContent).toBe('Danmark')
  })

  it('renders error', () => {
    const errorMessage = new Error('Error message')
    render(<Field.SelectCountry error={errorMessage} />)

    const element = document.querySelector('.dnb-form-status')
    expect(element).toHaveTextContent('Error message')

    const input = document.querySelector('.dnb-autocomplete__input')
    expect(input).toHaveClass('dnb-input__status--error')
  })

  it('shows error style in FieldBlock', () => {
    const errorMessage = new Error('Error message')
    render(
      <FieldBlock>
        <Field.SelectCountry error={errorMessage} />
      </FieldBlock>
    )

    const input = document.querySelector('.dnb-autocomplete__input')
    expect(input).toHaveClass('dnb-input__status--error')
  })

  it('should support "transformIn" and "transformOut"', async () => {
    const transformOut = jest.fn((value, country) => {
      if (value) {
        return `${country.name} (${value})`
      }
    })
    const transformIn = jest.fn((value) => {
      return String(value).match(/\((.*)\)/)?.[1]
    })
    const valueTransformIn = jest.fn((value) => {
      return String(value).match(/\((.*)\)/)?.[1]
    })

    const onSubmit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.SelectCountry
          path="/country"
          transformIn={transformIn}
          transformOut={transformOut}
          defaultValue="NO"
        />

        <Value.SelectCountry
          path="/country"
          transformIn={valueTransformIn}
        />
      </Form.Handler>
    )

    const NO = {
      cdc: '47',
      continent: 'Europe',
      i18n: { en: 'Norway', nb: 'Norge' },
      iso: 'NO',
      name: 'Norge',
      regions: ['Scandinavia', 'Nordic'],
    }

    const CH = {
      cdc: '41',
      continent: 'Europe',
      i18n: { en: 'Switzerland', nb: 'Sveits' },
      iso: 'CH',
      name: 'Sveits',
    }

    expect(transformOut).toHaveBeenCalledTimes(1)
    expect(transformIn).toHaveBeenCalledTimes(4)
    expect(valueTransformIn).toHaveBeenCalledTimes(2)

    const firstItemElement = () =>
      document.querySelectorAll('li.dnb-drawer-list__option')[0]

    const form = document.querySelector('form')
    const input = document.querySelector('input')
    const value = document.querySelector('.dnb-forms-value-block__content')

    fireEvent.submit(form)
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { country: 'Norge (NO)' },
      expect.anything()
    )

    expect(transformOut).toHaveBeenCalledTimes(1)
    expect(transformIn).toHaveBeenCalledTimes(5)
    expect(valueTransformIn).toHaveBeenCalledTimes(3)

    expect(input).toHaveValue('Norge')
    expect(value).toHaveTextContent('Norge')

    await userEvent.type(input, '{Backspace>10}Sveits')
    await waitFor(() => {
      expect(firstItemElement()).toBeInTheDocument()
    })
    await userEvent.click(firstItemElement())

    expect(input).toHaveValue('Sveits')
    expect(value).toHaveTextContent('Sveits')

    expect(transformOut).toHaveBeenCalledTimes(4)
    expect(transformIn).toHaveBeenCalledTimes(8)
    expect(valueTransformIn).toHaveBeenCalledTimes(4)

    fireEvent.submit(form)
    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { country: 'Sveits (CH)' },
      expect.anything()
    )

    expect(transformOut).toHaveBeenCalledTimes(4)
    expect(transformIn).toHaveBeenCalledTimes(9)
    expect(valueTransformIn).toHaveBeenCalledTimes(5)

    expect(transformOut).toHaveBeenNthCalledWith(1, 'NO', NO)
    expect(transformOut).toHaveBeenNthCalledWith(2, 'NO', NO)
    expect(transformOut).toHaveBeenNthCalledWith(3, 'CH', CH)
    expect(transformOut).toHaveBeenNthCalledWith(4, 'CH', CH)

    expect(transformIn).toHaveBeenNthCalledWith(1, undefined)
    expect(transformIn).toHaveBeenNthCalledWith(2, undefined)
    expect(transformIn).toHaveBeenNthCalledWith(3, 'Norge (NO)')
    expect(transformIn).toHaveBeenNthCalledWith(4, 'Norge (NO)')
    expect(transformIn).toHaveBeenNthCalledWith(5, 'Norge (NO)')
    expect(transformIn).toHaveBeenNthCalledWith(6, 'Norge (NO)')
    expect(transformIn).toHaveBeenNthCalledWith(7, 'Sveits (CH)')
    expect(transformIn).toHaveBeenNthCalledWith(8, 'Sveits (CH)')
    expect(transformIn).toHaveBeenNthCalledWith(9, 'Sveits (CH)')

    expect(valueTransformIn).toHaveBeenNthCalledWith(1, undefined)
    expect(valueTransformIn).toHaveBeenNthCalledWith(2, 'Norge (NO)')
    expect(valueTransformIn).toHaveBeenNthCalledWith(3, 'Norge (NO)')
    expect(valueTransformIn).toHaveBeenNthCalledWith(4, 'Sveits (CH)')
    expect(valueTransformIn).toHaveBeenNthCalledWith(5, 'Sveits (CH)')
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(
        <Field.SelectCountry required validateInitially />
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(<Field.SelectCountry required />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(<Field.SelectCountry required validateInitially />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })
})
