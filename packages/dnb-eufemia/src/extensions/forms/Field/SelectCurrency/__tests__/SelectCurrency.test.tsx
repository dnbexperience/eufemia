import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Props } from '../SelectCurrency'
import { Provider } from '../../../../../shared'
import DataContext from '../../../DataContext/Context'
import DrawerListProvider from '../../../../../fragments/drawer-list/DrawerListProvider'
import { Field, Form, FieldBlock, Value, Iterate } from '../../..'
import { CurrencyISO } from '../../../constants/currencies'

describe('Field.SelectCurrency', () => {
  it('should render with props', () => {
    const props: Props = {}
    render(<Field.SelectCurrency {...props} />)
    expect(document.querySelector('input')).toBeInTheDocument()
  })

  it('should support size', () => {
    render(<Field.SelectCurrency size="large" />)

    const autocompleteElement: HTMLInputElement = document.querySelector(
      '.dnb-autocomplete'
    )
    expect(autocompleteElement.classList).toContain(
      'dnb-autocomplete--large'
    )

    const selectCurrencyElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-currency'
    )
    expect(selectCurrencyElement.classList).toContain(
      'dnb-forms-field-block--label-height-large'
    )
  })

  it('should return correct value onChange event', () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    const onFocus = jest.fn()

    render(
      <Field.SelectCurrency
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    )

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-currency input'
    )
    const firstItemElement = () =>
      document.querySelectorAll('li.dnb-drawer-list__option')[0]
    expect(inputElement).toHaveValue('')

    fireEvent.focus(inputElement)
    fireEvent.change(inputElement, {
      target: { value: 'Norsk krone (NOK)' },
    })
    fireEvent.click(firstItemElement())

    const firstEventValues = [
      'NOK',
      {
        continent: 'Europe',
        iso: 'NOK',
        name: 'Norsk krone',
        decimals: 2,
        i18n: {
          en: 'Norwegian krone',
          nb: 'Norsk krone',
        },
        regions: ['Scandinavia', 'Nordic'],
        search: {
          en: ['Norway'],
          nb: ['Norge'],
        },
      },
    ]
    expect(onChange).toHaveBeenLastCalledWith(...firstEventValues)
    expect(inputElement).toHaveValue('Norsk krone (NOK)')

    fireEvent.blur(inputElement)
    fireEvent.focus(inputElement)

    expect(onFocus).toHaveBeenLastCalledWith(...firstEventValues)
    expect(onBlur).toHaveBeenLastCalledWith(...firstEventValues)

    fireEvent.change(inputElement, { target: { value: 'Dan' } })
    fireEvent.click(firstItemElement())

    expect(onChange).toHaveBeenLastCalledWith('DKK', {
      continent: 'Europe',
      iso: 'DKK',
      name: 'Dansk krone',
      decimals: 2,
      i18n: {
        en: 'Danish krone',
        nb: 'Dansk krone',
      },
      regions: ['Scandinavia', 'Nordic'],
      search: {
        en: ['Denmark'],
        nb: ['Danmark'],
      },
    })
    expect(inputElement).toHaveValue('Dansk krone (DKK)')
  })

  it('should select matching currency on type change to support autofill', async () => {
    const onChange = jest.fn()

    render(<Field.SelectCurrency onChange={onChange} />)

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-currency input'
    )
    const liElements = () =>
      document.querySelectorAll('li:not([aria-hidden])')
    const selectedItemElement = () =>
      document.querySelector(
        '.dnb-drawer-list__option.dnb-drawer-list__option--selected'
      )

    fireEvent.focus(inputElement)
    fireEvent.change(inputElement, {
      target: { value: 'svens' },
      nativeEvent: undefined,
    })

    expect(inputElement).toHaveValue('Svensk krone (SEK)')
    expect(liElements()).toHaveLength(2)
    expect(selectedItemElement().textContent).toBe('Svensk kroneSEK')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith('SEK', {
      continent: 'Europe',
      iso: 'SEK',
      name: 'Svensk krone',
      decimals: 2,
      i18n: {
        en: 'Swedish krona',
        nb: 'Svensk krone',
      },
      regions: ['Scandinavia', 'Nordic'],
      search: {
        en: ['Sweden'],
        nb: ['Sverige'],
      },
    })
  })

  it('should filter currencies list with given filterCurrencies', () => {
    render(
      <Field.SelectCurrency
        filterCurrencies={({ regions }) =>
          regions?.includes('Scandinavia')
        }
      />
    )

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-currency input'
    )

    // open
    fireEvent.focus(inputElement)

    const liElements = document.querySelectorAll('li:not([aria-hidden])')
    expect(liElements).toHaveLength(4)
    expect(liElements[0].textContent).toBe('Norsk kroneNOK')
    expect(liElements[1].textContent).toBe('Svensk kroneSEK')
    expect(liElements[2].textContent).toBe('Dansk kroneDKK')
    expect(liElements[3].textContent).toBe('EuroEUR')

    expect(
      document.querySelector('li.dnb-drawer-list__option--selected')
    ).not.toBeInTheDocument()
  })

  it('should by default sort prioritized currencies on top', () => {
    render(<Field.SelectCurrency />)

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-currency input'
    )

    // open
    fireEvent.focus(inputElement)

    const liElements = document.querySelectorAll('li:not([aria-hidden])')
    expect(liElements.length).toBeGreaterThan(42)
    expect(liElements[0].textContent).toBe('Norsk kroneNOK')
    expect(liElements[1].textContent).toBe('Svensk kroneSEK')
    expect(liElements[2].textContent).toBe('Dansk kroneDKK')
    expect(liElements[3].textContent).toBe('EuroEUR')
    expect(liElements[4].textContent).toBe('Amerikansk dollarUSD')
    expect(liElements[5].textContent).toBe('Australsk dollarAUD')
  })

  it('should sort "XCD" as last when locale nb-NO', () => {
    render(
      <Form.Handler>
        <Field.SelectCurrency />
      </Form.Handler>
    )

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-currency input'
    )

    // open
    fireEvent.focus(inputElement)

    {
      const liElements = document.querySelectorAll('li:not([aria-hidden])')
      expect(liElements[liElements.length - 1].textContent).toBe(
        'Ungarsk forintHUF'
      )
    }
  })

  it('should sort "ZMW" as last when locale en-GB', () => {
    render(
      <Form.Handler locale="en-GB">
        <Field.SelectCurrency />
      </Form.Handler>
    )

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-currency input'
    )

    // open
    fireEvent.focus(inputElement)

    {
      const liElements = document.querySelectorAll('li:not([aria-hidden])')
      expect(liElements[liElements.length - 1].textContent).toBe(
        'United Arab Emirates dirhamAED'
      )
    }
  })

  it('should show only Scandinavian currencies', () => {
    render(<Field.SelectCurrency currencies="Scandinavia" />)

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-currency input'
    )

    // open
    fireEvent.focus(inputElement)

    const liElements = document.querySelectorAll('li:not([aria-hidden])')
    expect(liElements).toHaveLength(4)
    expect(liElements[0].textContent).toBe('Dansk kroneDKK')
    expect(liElements[1].textContent).toBe('EuroEUR')
    expect(liElements[2].textContent).toBe('Norsk kroneNOK')
    expect(liElements[3].textContent).toBe('Svensk kroneSEK')
  })

  it('should show only Scandinavian currencies and filterCurrencies at the same time', () => {
    render(
      <Field.SelectCurrency
        currencies="Scandinavia"
        filterCurrencies={({ iso }) => iso !== 'DKK'}
      />
    )

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-currency input'
    )

    // open
    fireEvent.focus(inputElement)

    const liElements = document.querySelectorAll('li:not([aria-hidden])')
    expect(liElements).toHaveLength(3)
    expect(liElements[0].textContent).toBe('EuroEUR')
    expect(liElements[1].textContent).toBe('Norsk kroneNOK')
    expect(liElements[2].textContent).toBe('Svensk kroneSEK')
  })

  it('should sort prioritized currencies on top', () => {
    render(<Field.SelectCurrency currencies="Prioritized" />)

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-currency input'
    )

    // open
    fireEvent.focus(inputElement)

    const liElements = document.querySelectorAll('li:not([aria-hidden])')
    expect(liElements.length).toBeGreaterThan(42)
    expect(liElements[0].textContent).toBe('Norsk kroneNOK')
    expect(liElements[1].textContent).toBe('Svensk kroneSEK')
    expect(liElements[2].textContent).toBe('Dansk kroneDKK')
    expect(liElements[3].textContent).toBe('EuroEUR')
    expect(liElements[4].textContent).toBe('Amerikansk dollarUSD')
    expect(liElements[5].textContent).toBe('Australsk dollarAUD')
  })

  it('should validate when required', () => {
    render(
      <Form.Handler>
        <Field.SelectCurrency required />
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
      <Form.Handler defaultData={{ currency: 'NOK' }}>
        <Field.SelectCurrency path="/currency" />
      </Form.Handler>
    )

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-currency input'
    )

    expect(inputElement.value).toBe('Norsk krone (NOK)')
  })

  it('should use value from itemPath inside iterate', () => {
    render(
      <Form.Handler
        defaultData={{ items: [{ currency: 'NOK' }, { currency: 'DKK' }] }}
      >
        <Iterate.Array path="/items">
          <Field.SelectCurrency itemPath="/currency" />
        </Iterate.Array>
      </Form.Handler>
    )

    const [norway, denmark] = Array.from(
      document.querySelectorAll('.dnb-forms-field-select-currency')
    )

    expect(norway.querySelector('input')).toHaveValue('Norsk krone (NOK)')
    expect(denmark.querySelector('input')).toHaveValue('Dansk krone (DKK)')
  })

  it('should execute validateInitially if required', () => {
    const { rerender } = render(
      <Field.SelectCurrency required validateInitially />
    )

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()

    rerender(<Field.SelectCurrency validateInitially />)

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()
  })

  it('should change locale', async () => {
    const { rerender } = render(
      <Provider>
        <Field.SelectCurrency value="NOK" />
      </Provider>
    )

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-currency input'
    )

    fireEvent.mouseDown(inputElement)

    const selectedItemElement = () =>
      document.querySelector(
        '.dnb-drawer-list__option.dnb-drawer-list__option--selected'
      )

    expect(inputElement.value).toBe('Norsk krone (NOK)')
    expect(selectedItemElement().textContent).toBe('Norsk kroneNOK')

    rerender(
      <Provider locale="en-GB">
        <Field.SelectCurrency value="NOK" />
      </Provider>
    )

    fireEvent.mouseDown(inputElement)

    await waitFor(() => {
      expect(inputElement.value).toBe('Norwegian krone (NOK)')
      expect(selectedItemElement().textContent).toBe('Norwegian kroneNOK')
    })

    rerender(
      <Provider locale="nb-NO">
        <Field.SelectCurrency value="DKK" />
      </Provider>
    )

    fireEvent.mouseDown(inputElement)

    expect(inputElement.value).toBe('Dansk krone (DKK)')
    expect(selectedItemElement().textContent).toBe('Dansk kroneDKK')
  })

  it('should search for "Norge" and "Norway" with en-GB locale', async () => {
    const { rerender } = render(
      <Provider locale="nb-NO">
        <Field.SelectCurrency />
      </Provider>
    )

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-currency input'
    )

    {
      await userEvent.type(inputElement, 'Norge')

      await waitFor(() => {
        const liElements = document.querySelectorAll(
          'li:not([aria-hidden])'
        )
        expect(liElements.length).toBeGreaterThan(0)
      })

      const liElements = document.querySelectorAll('li:not([aria-hidden])')
      expect(liElements).toHaveLength(2)

      const hasNOK = Array.from(liElements).some((element) =>
        element.textContent.includes('Norsk krone')
      )
      expect(hasNOK).toBe(true)
    }

    rerender(
      <Provider locale="en-GB">
        <Field.SelectCurrency />
      </Provider>
    )

    {
      await userEvent.clear(inputElement)
      await userEvent.type(inputElement, 'Norway')

      await waitFor(() => {
        const liElements = document.querySelectorAll(
          'li:not([aria-hidden])'
        )
        expect(liElements.length).toBeGreaterThan(0)
      })

      const liElements = document.querySelectorAll('li:not([aria-hidden])')
      expect(liElements).toHaveLength(2)

      const hasNOK = Array.from(liElements).some((element) =>
        element.textContent.includes('Norwegian krone')
      )
      expect(hasNOK).toBe(true)
    }
  })

  it('should search for "Tyskland" and "Frankrike" to get "Euro"', async () => {
    render(<Field.SelectCurrency />)

    const inputElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-select-currency input'
    )

    {
      // First search for "Tyskland" (German for Germany)
      await userEvent.type(inputElement, 'Tyskland')

      await waitFor(() => {
        const liElements = document.querySelectorAll(
          'li:not([aria-hidden])'
        )
        expect(liElements.length).toBeGreaterThan(0)
      })

      const liElements = document.querySelectorAll('li:not([aria-hidden])')
      expect(liElements).toHaveLength(2)

      const hasEuro = Array.from(liElements).some((element) =>
        element.textContent.includes('Euro')
      )
      expect(hasEuro).toBe(true)
    }

    {
      // Clear and search for "Frankrike"
      await userEvent.clear(inputElement)

      await waitFor(() => {
        const liElements = document.querySelectorAll(
          'li:not([aria-hidden])'
        )
        expect(liElements.length).toBeGreaterThan(40)
      })

      await userEvent.type(inputElement, 'Frankrike')

      await waitFor(() => {
        const liElements = document.querySelectorAll(
          'li:not([aria-hidden])'
        )
        expect(liElements.length).toBeGreaterThan(0)
      })

      const liElements = document.querySelectorAll('li:not([aria-hidden])')
      expect(liElements).toHaveLength(2)

      const hasEuro = Array.from(liElements).some((element) =>
        element.textContent.includes('Euro')
      )
      expect(hasEuro).toBe(true)
    }
  })

  it('renders error', () => {
    const errorMessage = new Error('Error message')
    render(<Field.SelectCurrency error={errorMessage} />)

    const element = document.querySelector('.dnb-form-status')
    expect(element).toHaveTextContent('Error message')

    const input = document.querySelector('.dnb-autocomplete__input')
    expect(input).toHaveClass('dnb-input__status--error')
  })

  it('shows error style in FieldBlock', () => {
    const errorMessage = new Error('Error message')
    render(
      <FieldBlock>
        <Field.SelectCurrency error={errorMessage} />
      </FieldBlock>
    )

    const input = document.querySelector('.dnb-autocomplete__input')
    expect(input).toHaveClass('dnb-input__status--error')
  })

  it('should support "transformIn" and "transformOut"', async () => {
    const transformOut = jest.fn((value, currency) => {
      if (value) {
        return `${currency.name} (${value})`
      }
    })
    const transformIn = jest.fn((external) => {
      return String(external).match(/\((.*)\)/)?.[1] || external
    })
    const valueTransformIn = jest.fn((internal) => {
      return String(internal).match(/\((.*)\)/)?.[1]
    })

    const onSubmit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.SelectCurrency
          path="/currency"
          transformIn={transformIn}
          transformOut={transformOut}
          defaultValue="NOK"
        />

        <Value.SelectCurrency
          path="/currency"
          transformIn={valueTransformIn}
        />
      </Form.Handler>
    )

    const NOK = {
      continent: 'Europe',
      iso: 'NOK',
      name: 'Norsk krone',
      decimals: 2,
      i18n: {
        en: 'Norwegian krone',
        nb: 'Norsk krone',
      },
      regions: ['Scandinavia', 'Nordic'],
      search: {
        en: ['Norway'],
        nb: ['Norge'],
      },
    }

    const CHF = {
      continent: 'Europe',
      iso: 'CHF',
      name: 'Sveitsisk franc',
      decimals: 2,
      i18n: {
        en: 'Swiss franc',
        nb: 'Sveitsisk franc',
      },
      search: {
        en: ['Switzerland'],
        nb: ['Sveits'],
      },
    }

    expect(transformOut).toHaveBeenCalledTimes(1)
    expect(transformIn).toHaveBeenCalledTimes(3)
    expect(valueTransformIn).toHaveBeenCalledTimes(2)

    const firstItemElement = () =>
      document.querySelectorAll('li.dnb-drawer-list__option')[0]

    const form = document.querySelector('form')
    const input = document.querySelector('input')
    const value = document.querySelector('.dnb-forms-value-block__content')

    fireEvent.submit(form)
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { currency: 'Norsk krone (NOK)' },
      expect.anything()
    )

    expect(transformOut).toHaveBeenCalledTimes(1)
    expect(transformIn).toHaveBeenCalledTimes(4)
    expect(valueTransformIn).toHaveBeenCalledTimes(3)

    expect(input).toHaveValue('Norsk krone (NOK)')
    expect(value).toHaveTextContent('Norsk krone (NOK)')

    await userEvent.type(input, '{Backspace>19}Sveitsisk franc')
    await waitFor(() => {
      expect(firstItemElement()).toBeInTheDocument()
    })
    await userEvent.click(firstItemElement())

    expect(input).toHaveValue('Sveitsisk franc (CHF)')
    expect(value).toHaveTextContent('Sveitsisk franc (CHF)')

    expect(transformOut).toHaveBeenCalledTimes(4)
    expect(transformIn).toHaveBeenCalledTimes(6)
    expect(valueTransformIn).toHaveBeenCalledTimes(4)

    fireEvent.submit(form)
    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { currency: 'Sveitsisk franc (CHF)' },
      expect.anything()
    )

    expect(transformOut).toHaveBeenCalledTimes(4)
    expect(transformIn).toHaveBeenCalledTimes(7)
    expect(valueTransformIn).toHaveBeenCalledTimes(5)

    expect(transformOut).toHaveBeenNthCalledWith(1, 'NOK', NOK)
    expect(transformOut).toHaveBeenNthCalledWith(2, 'NOK', NOK)
    expect(transformOut).toHaveBeenNthCalledWith(3, 'CHF', CHF)
    expect(transformOut).toHaveBeenNthCalledWith(4, 'CHF', CHF)

    expect(transformIn).toHaveBeenNthCalledWith(1, 'NOK')
    expect(transformIn).toHaveBeenNthCalledWith(2, 'NOK')
    expect(transformIn).toHaveBeenNthCalledWith(3, 'Norsk krone (NOK)')
    expect(transformIn).toHaveBeenNthCalledWith(4, 'Norsk krone (NOK)')
    expect(transformIn).toHaveBeenNthCalledWith(5, 'Norsk krone (NOK)')
    expect(transformIn).toHaveBeenNthCalledWith(6, 'Sveitsisk franc (CHF)')
    expect(transformIn).toHaveBeenNthCalledWith(7, 'Sveitsisk franc (CHF)')

    expect(valueTransformIn).toHaveBeenNthCalledWith(1, undefined)
    expect(valueTransformIn).toHaveBeenNthCalledWith(
      2,
      'Norsk krone (NOK)'
    )
    expect(valueTransformIn).toHaveBeenNthCalledWith(
      3,
      'Norsk krone (NOK)'
    )
    expect(valueTransformIn).toHaveBeenNthCalledWith(
      4,
      'Sveitsisk franc (CHF)'
    )
    expect(valueTransformIn).toHaveBeenNthCalledWith(
      5,
      'Sveitsisk franc (CHF)'
    )
  })

  it('should support "transformIn" and "transformOut" when value is given by the data context', async () => {
    const transformOut = jest.fn((value, currency) => {
      if (value) {
        return `${currency.name} (${value})`
      }
    })
    const transformIn = jest.fn((external) => {
      return String(external).match(/\((.*)\)/)?.[1] as CurrencyISO
    })
    const valueTransformIn = jest.fn((internal) => {
      return String(internal).match(/\((.*)\)/)?.[1]
    })

    const onSubmit = jest.fn()

    render(
      <Form.Handler
        onSubmit={onSubmit}
        defaultData={{ currency: 'Norsk krone (NOK)' }}
      >
        <Field.SelectCurrency
          path="/currency"
          transformIn={transformIn}
          transformOut={transformOut}
        />

        <Value.SelectCurrency
          path="/currency"
          transformIn={valueTransformIn}
        />
      </Form.Handler>
    )

    const NOK = {
      continent: 'Europe',
      iso: 'NOK',
      name: 'Norsk krone',
      decimals: 2,
      i18n: {
        en: 'Norwegian krone',
        nb: 'Norsk krone',
      },
      regions: ['Scandinavia', 'Nordic'],
      search: {
        en: ['Norway'],
        nb: ['Norge'],
      },
    }

    const CHF = {
      continent: 'Europe',
      iso: 'CHF',
      name: 'Sveitsisk franc',
      decimals: 2,
      i18n: {
        en: 'Swiss franc',
        nb: 'Sveitsisk franc',
      },
      search: {
        en: ['Switzerland'],
        nb: ['Sveits'],
      },
    }

    expect(transformOut).toHaveBeenCalledTimes(0)
    expect(transformIn).toHaveBeenCalledTimes(2)
    expect(valueTransformIn).toHaveBeenCalledTimes(1)

    const firstItemElement = () =>
      document.querySelectorAll('li.dnb-drawer-list__option')[0]

    const form = document.querySelector('form')
    const input = document.querySelector('input')
    const value = document.querySelector('.dnb-forms-value-block__content')

    fireEvent.submit(form)
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { currency: 'Norsk krone (NOK)' },
      expect.anything()
    )

    expect(transformOut).toHaveBeenCalledTimes(0)
    expect(transformIn).toHaveBeenCalledTimes(3)
    expect(valueTransformIn).toHaveBeenCalledTimes(2)

    expect(input).toHaveValue('Norsk krone (NOK)')
    expect(value).toHaveTextContent('Norsk krone (NOK)')

    await userEvent.type(input, '{Backspace>19}Sveitsisk franc')
    await waitFor(() => {
      expect(firstItemElement()).toBeInTheDocument()
    })
    await userEvent.click(firstItemElement())

    expect(input).toHaveValue('Sveitsisk franc (CHF)')
    expect(value).toHaveTextContent('Sveitsisk franc (CHF)')

    expect(transformOut).toHaveBeenCalledTimes(3)
    expect(transformIn).toHaveBeenCalledTimes(5)
    expect(valueTransformIn).toHaveBeenCalledTimes(3)

    fireEvent.submit(form)
    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { currency: 'Sveitsisk franc (CHF)' },
      expect.anything()
    )

    expect(transformOut).toHaveBeenCalledTimes(3)
    expect(transformIn).toHaveBeenCalledTimes(6)
    expect(valueTransformIn).toHaveBeenCalledTimes(4)

    expect(transformOut).toHaveBeenNthCalledWith(1, 'NOK', NOK)
    expect(transformOut).toHaveBeenNthCalledWith(2, 'CHF', CHF)
    expect(transformOut).toHaveBeenNthCalledWith(3, 'CHF', CHF)

    expect(transformIn).toHaveBeenNthCalledWith(1, 'Norsk krone (NOK)')
    expect(transformIn).toHaveBeenNthCalledWith(2, 'Norsk krone (NOK)')
    expect(transformIn).toHaveBeenNthCalledWith(3, 'Norsk krone (NOK)')
    expect(transformIn).toHaveBeenNthCalledWith(4, 'Norsk krone (NOK)')
    expect(transformIn).toHaveBeenNthCalledWith(5, 'Sveitsisk franc (CHF)')
    expect(transformIn).toHaveBeenNthCalledWith(6, 'Sveitsisk franc (CHF)')

    expect(valueTransformIn).toHaveBeenNthCalledWith(
      1,
      'Norsk krone (NOK)'
    )
    expect(valueTransformIn).toHaveBeenNthCalledWith(
      2,
      'Norsk krone (NOK)'
    )
    expect(valueTransformIn).toHaveBeenNthCalledWith(
      3,
      'Sveitsisk franc (CHF)'
    )
    expect(valueTransformIn).toHaveBeenNthCalledWith(
      4,
      'Sveitsisk franc (CHF)'
    )
  })

  it('should store "displayValue" in data context', async () => {
    let dataContext = null

    render(
      <Form.Handler locale="en-GB">
        <Field.SelectCurrency path="/currency" defaultValue="NOK" />
        <DataContext.Consumer>
          {(context) => {
            dataContext = context
            return null
          }}
        </DataContext.Consumer>
      </Form.Handler>
    )

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/currency': {
        type: 'field',
        value: 'Norwegian krone',
      },
    })

    // Open like user would do, but without a delay
    DrawerListProvider['blurDelay'] = 0
    await userEvent.tab()
    await userEvent.keyboard('{ArrowDown>2}')
    await userEvent.keyboard('{Enter}')
    DrawerListProvider['blurDelay'] = 201

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/currency': {
        type: 'field',
        value: 'Danish krone',
      },
    })
  })

  it('should support "defaultValue" with "itemPath" inside a PushContainer with without opening the drawer', async () => {
    render(
      <Form.Handler>
        <Iterate.PushContainer path="/persons">
          <Field.SelectCurrency itemPath="/" defaultValue="NOK" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    expect(
      document.querySelector('.dnb-drawer-list__option')
    ).not.toBeInTheDocument()
  })

  it('should render autoComplete when provided', () => {
    render(<Field.SelectCurrency autoComplete="transaction-currency" />)
    expect(
      document.querySelector('input').getAttribute('autocomplete')
    ).toBe('transaction-currency')
  })

  it('should select whole input value on click', async () => {
    render(<Field.SelectCurrency defaultValue="NOK" noAnimation />)

    const input: HTMLInputElement = document.querySelector(
      '.dnb-autocomplete input'
    )

    await userEvent.click(input)

    await waitFor(() => {
      expect(input.selectionStart).toBe(0)
      expect(input.selectionEnd).toBe(17)
    })
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(
        <Field.SelectCurrency required validateInitially />
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(<Field.SelectCurrency required />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(<Field.SelectCurrency required validateInitially />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })
})
