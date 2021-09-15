/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  toJson,
  loadScss,
} from '../../../core/jest/jestSetup'
import Component from '../InputMasked'
import Provider from '../../../shared/Provider'

const props = {
  ...fakeProps(require.resolve('../InputMasked'), {
    optional: true,
  }),
  mask: [/[a-z]/],
  show_mask: true,
  disabled: false,
  pipe: null,
  locale: null,
  as_number: null,
  as_currency: null,
}
props.id = 'input-masked'

describe('InputMasked component', () => {
  // compare the snapshot
  it('have to match type="text" snapshot', () => {
    const Comp = mount(<Component {...props} type="text" value="test" />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should format "number_mask" accordingly the defined properties', () => {
    const Comp = mount(
      <Component
        value="1000000.0"
        number_mask={{
          prefix: 'NOK ',
          suffix: ',- kr',
        }}
      />
    )

    expect(Comp.find('input').instance().value).toBe('NOK 1 000 000,- kr')
  })

  it('gets valid ref element', () => {
    const ref = React.createRef()
    mount(<Component {...props} inner_ref={ref} />)

    expect(ref.current instanceof window.HTMLInputElement).toBe(true)
    expect(ref.current.id).toBe(props.id)
  })

  it('event "on_change" gets emmited with correct value', () => {
    const initValue = 'NOK 1234,5 kr'
    const newValue = 'NOK 123456789,0 kr'

    const on_change = jest.fn()

    const Comp = mount(
      <Component
        {...props}
        value={initValue}
        number_mask={{
          prefix: 'NOK ',
          suffix: ',- kr',
          allowDecimal: true,
        }}
        on_change={on_change}
      />
    )

    expect(Comp.find('input').instance().value).toBe(
      'NOK placeholder_char placeholder_charplaceholder_charplaceholder_char,placeholder_char,- kr'
    )

    Comp.find('input').simulate('change', {
      target: { value: newValue },
    })

    Comp.find('input')
      .props()
      .onChange({
        target: { value: newValue },
      })

    expect(Comp.find('input').instance().value).toBe(
      'NOK placeholder_charplaceholder_charplaceholder_char placeholder_charplaceholder_charplaceholder_char placeholder_charplaceholder_charplaceholder_char,placeholder_char,- kr'
    )

    expect(on_change.mock.calls[0][0].value).toBe(newValue)
    expect(on_change.mock.calls[0][0].numberValue).toBe(123456789)
  })

  it('event "on_change" gets emmited with correct value', () => {
    const newValue = 'NOK 123456789,678 kr'

    const on_change = jest.fn()

    const Comp = mount(
      <Component
        value="12345.678"
        number_mask={{ allowDecimal: true }}
        on_change={on_change}
      />
    )

    expect(Comp.find('input').instance().value).toBe('12 345,67')

    Comp.find('input').simulate('change', {
      target: { value: newValue },
    })

    // This ensures that text-mask actually does its job
    Comp.find('input')
      .props()
      .onChange({
        target: { value: newValue },
      })

    expect(Comp.find('input').instance().value).toBe('123 456 789,67')

    expect(on_change.mock.calls[0][0].value).toBe(newValue)
    expect(on_change.mock.calls[0][0].numberValue).toBe(123456789.678)
  })

  it('event "on_change" gets emmited with correct value', () => {
    const newValue = 'NOK 123456789,678 kr'

    const on_change = jest.fn()

    const Comp = mount(
      <Component
        value="12345.678"
        number_mask={{
          thousandsSeparatorSymbol: ' ',
          decimalSymbol: ',',
          allowDecimal: true,
        }}
        on_change={on_change}
      />
    )

    expect(Comp.find('input').instance().value).toBe('12 345,67')

    Comp.find('input').simulate('change', {
      target: { value: newValue },
    })

    // This ensures that text-mask actually does its job
    Comp.find('input')
      .props()
      .onChange({
        target: { value: newValue },
      })

    expect(Comp.find('input').instance().value).toBe('123 456 789,67')

    expect(on_change.mock.calls[0][0].value).toBe(newValue)
    expect(on_change.mock.calls[0][0].numberValue).toBe(123456789.678)
  })
})

describe('InputMasked component as_number', () => {
  it('should create a "number_mask" accordingly the defined properties', () => {
    const Comp = mount(<Component value="12345.678" as_number />)

    expect(Comp.find('input').instance().value).toBe('12 345')

    Comp.setProps({ value: '12345,123' })

    expect(Comp.find('input').instance().value).toBe('12 345')
  })

  it('should merge "number_mask" properties', () => {
    const Comp = mount(
      <Component
        value="12345.678"
        as_number
        number_mask={{ decimalLimit: 1 }}
      />
    )

    expect(Comp.find('input').instance().value).toBe('12 345,6')
  })

  it('event "on_change" gets emmited with correct value', () => {
    const newValue = 'NOK 123456789,678 kr'

    const on_change = jest.fn()

    const Comp = mount(
      <Component
        value="12345.678"
        as_number
        number_mask={{ decimalLimit: 1 }}
        on_change={on_change}
      />
    )

    expect(Comp.find('input').instance().value).toBe('12 345,6')

    Comp.find('input').simulate('change', {
      target: { value: newValue },
    })

    // This ensures that text-mask actually does its job
    Comp.find('input')
      .props()
      .onChange({
        target: { value: newValue },
      })

    expect(Comp.find('input').instance().value).toBe('123 456 789,6')

    expect(on_change.mock.calls[0][0].value).toBe(newValue)
    expect(on_change.mock.calls[0][0].numberValue).toBe(123456789.678)
  })

  it('should append a coma when entering a dot', () => {
    const Comp = mount(
      <Component as_number number_mask={{ allowDecimal: true }} />
    )

    const newValue = '12345'
    Comp.find('input').simulate('change', {
      target: { value: newValue },
    })

    // This ensures that text-mask actually does its job
    Comp.find('input')
      .props()
      .onChange({
        target: { value: newValue },
      })

    const pressDotAndUseItAsComa = () => {
      const keyCode = 190 // dot
      Comp.find('input').simulate('keydown', {
        keyCode,
      })
    }

    const elem = Comp.find('input').instance()

    expect(elem.selectionStart).toBe(6)

    pressDotAndUseItAsComa()

    expect(elem.value).toBe('12 345,')

    // set the cursor one position back
    elem.setSelectionRange(
      elem.selectionStart - 1,
      elem.selectionStart - 1
    )

    // try a second time
    pressDotAndUseItAsComa()

    // but this time we expect the cursor to have moved after the decimal symbol
    expect(elem.selectionStart).toBe(7)
  })

  it('should prevent a coma when decimalLimit=0', () => {
    const Comp = mount(
      <Component as_number number_mask={{ decimalLimit: 0 }} />
    )

    const preventDefault = jest.fn()
    const event = { preventDefault }

    const newValue = '12345'
    Comp.find('input').simulate('change', {
      target: { value: newValue },
    })

    // This ensures that text-mask actually does its job
    Comp.find('input')
      .props()
      .onChange({
        target: { value: newValue },
        ...event,
      })

    const pressDotAndUseItAsComa = () => {
      const keyCode = 188 // coma
      Comp.find('input').simulate('keydown', {
        keyCode,
        ...event,
      })
    }

    pressDotAndUseItAsComa()
    pressDotAndUseItAsComa() // try a second time

    expect(preventDefault).toBeCalledTimes(2)
    expect(Comp.find('input').instance().value).toBe('12 345')
  })

  it('should prevent a coma when allowDecimal=false', () => {
    const Comp = mount(<Component as_number />)

    const preventDefault = jest.fn()
    const event = { preventDefault }

    const newValue = '12345'
    Comp.find('input').simulate('change', {
      target: { value: newValue },
    })

    // This ensures that text-mask actually does its job
    Comp.find('input')
      .props()
      .onChange({
        target: { value: newValue },
        ...event,
      })

    const pressDotAndUseItAsComa = () => {
      const keyCode = 188 // coma
      Comp.find('input').simulate('keydown', {
        keyCode,
        ...event,
      })
    }

    pressDotAndUseItAsComa()
    pressDotAndUseItAsComa() // try a second time

    expect(preventDefault).toBeCalledTimes(2)
    expect(Comp.find('input').instance().value).toBe('12 345')
  })

  it('should react to locale change', () => {
    const Comp = mount(
      <Component
        as_number
        number_mask={{ allowDecimal: true, decimalLimit: 3 }}
        value="12345.678"
        locale="en-GB"
      />
    )

    expect(Comp.find('input').instance().value).toBe('12 345.678')

    Comp.setProps({ locale: 'nb-NO' })

    expect(Comp.find('input').instance().value).toBe('12 345,678')
  })

  it('should inherit locale from provider', () => {
    const Comp = mount(
      <Provider locale="en-GB">
        <Component
          as_number
          number_mask={{ decimalLimit: 3 }}
          value="12345.678"
        />
      </Provider>
    )

    expect(Comp.find('input').instance().value).toBe('12 345.678')

    // Change the provider locale
    Comp.setProps({ locale: 'nb-NO' })

    expect(Comp.find('input').instance().value).toBe('12 345,678')
  })
})

describe('InputMasked component as_currency', () => {
  it('should create a "currency_mask" accordingly the defined properties', () => {
    const Comp = mount(<Component value="12345.678" as_currency />)

    expect(Comp.find('input').instance().value).toBe('12 345,67 kr')
  })

  it('should merge "currency_mask" properties', () => {
    const Comp = mount(
      <Component
        value="12345.678"
        as_currency
        currency_mask={{ decimalLimit: 1 }}
      />
    )

    expect(Comp.find('input').instance().value).toBe('12 345,6 kr')
  })

  it('should omit decimals when allowDecimal=false', () => {
    const Comp = mount(
      <Component
        value="12345.678"
        as_currency
        currency_mask={{ allowDecimal: false }}
      />
    )

    expect(Comp.find('input').instance().value).toBe('12 345 kr')
  })

  it('event "on_change" gets emmited with correct value', () => {
    const newValue = 'NOK 123456789,678 kr'

    const on_change = jest.fn()

    const Comp = mount(
      <Component
        value="12345.678"
        as_currency
        on_change={on_change}
        // currency_mask={{ decimalLimit: 1 }}
      />
    )

    expect(Comp.find('input').instance().value).toBe('12 345,67 kr')

    Comp.find('input').simulate('change', {
      target: { value: newValue },
    })

    // This ensures that text-mask actually does its job
    Comp.find('input')
      .props()
      .onChange({
        target: { value: newValue },
      })

    expect(Comp.find('input').instance().value).toBe('123 456 789,67 kr')

    expect(on_change.mock.calls[0][0].value).toBe(newValue)
    expect(on_change.mock.calls[0][0].numberValue).toBe(123456789.678)

    Comp.setProps({ currency_mask: { decimalLimit: 1 } })

    Comp.find('input').simulate('change', {
      target: { value: newValue },
    })

    // This ensures that text-mask actually does its job
    Comp.find('input')
      .props()
      .onChange({
        target: { value: newValue },
      })

    expect(Comp.find('input').instance().value).toBe('123 456 789,6 kr')

    expect(on_change.mock.calls[0][0].value).toBe(newValue)
    expect(on_change.mock.calls[0][0].numberValue).toBe(123456789.678)
  })

  it('event "on_change" gets emmited with correct value with en locale', () => {
    const newValue = 'NOK 123456789.678 kr'

    const on_change = jest.fn()

    const Comp = mount(
      <Component
        locale="en"
        value="12345.678"
        as_currency
        on_change={on_change}
      />
    )

    expect(Comp.find('input').instance().value).toBe('12 345.67 NOK')

    Comp.find('input').simulate('change', {
      target: { value: newValue },
    })

    // This ensures that text-mask actually does its job
    Comp.find('input')
      .props()
      .onChange({
        target: { value: newValue },
      })

    expect(Comp.find('input').instance().value).toBe('123 456 789.67 NOK')

    expect(on_change.mock.calls[0][0].value).toBe(newValue)
    expect(on_change.mock.calls[0][0].numberValue).toBe(123456789.678)
  })

  it('should use given currency', () => {
    const Comp = mount(<Component value="12345.678" as_currency="USD" />)

    expect(Comp.find('input').instance().value).toBe('12 345,67 $')
  })

  it('should have correct decimals', () => {
    const Comp = mount(<Component value="12345.6" as_currency="NOK" />)

    expect(Comp.find('input').instance().value).toBe('12 345,60 kr')

    Comp.setProps({ value: 12345.7 })

    expect(Comp.find('input').instance().value).toBe('12 345,70 kr')

    Comp.setProps({ value: 12345.01 })

    expect(Comp.find('input').instance().value).toBe('12 345,01 kr')

    Comp.setProps({ value: '12345.016' })

    expect(Comp.find('input').instance().value).toBe('12 345,01 kr')

    Comp.setProps({ value: '12345.016' })
    Comp.setProps({ number_format: { omit_rounding: false } })

    expect(Comp.find('input').instance().value).toBe('12 345,02 kr')
  })

  it('should not append a coma when entering a dot', () => {
    const Comp = mount(<Component as_currency />)

    const preventDefault = jest.fn()
    const event = { preventDefault }

    const newValue = '12345,678'
    Comp.find('input').simulate('change', {
      target: { value: newValue },
    })

    const pressDotAndUseItAsComa = () => {
      const keyCode = 188 // coma
      Comp.find('input').simulate('keydown', {
        keyCode,
        ...event,
      })
    }

    pressDotAndUseItAsComa() // try a first time, without success
    pressDotAndUseItAsComa() // try a second time, without success

    expect(preventDefault).toBeCalledTimes(2)
    expect(Comp.find('input').instance().value).toBe('12 345,67 kr')
  })

  it('should move cursor on backspace or delete key', () => {
    const Comp = mount(<Component as_currency />)

    const preventDefault = jest.fn()
    const event = { preventDefault }

    const newValue = '12345,678'
    Comp.find('input').simulate('change', {
      target: { value: newValue },
    })

    const elem = Comp.find('input').instance()

    // set the cursor one position back
    elem.setSelectionRange(6, 6)

    Comp.find('input').simulate('keydown', {
      keyCode: 46, // delete
      ...event,
    })

    // but this time we expect the cursor to have moved after the decimal symbol
    expect(elem.selectionStart).toBe(7)

    expect(preventDefault).toBeCalledTimes(1)
    expect(Comp.find('input').instance().value).toBe('12 345,67 kr')

    Comp.find('input').simulate('keydown', {
      keyCode: 8, // backspace
      ...event,
    })

    // but this time we expect the cursor to have moved after the decimal symbol
    expect(elem.selectionStart).toBe(6)

    expect(preventDefault).toBeCalledTimes(2)
    expect(Comp.find('input').instance().value).toBe('12 345,67 kr')
  })

  it('should inherit currency_mask from provider', () => {
    const Comp = mount(
      <Provider
        locale="en-GB"
        InputMasked={{
          currency_mask: {
            decimalLimit: 1,
          },
        }}
      >
        <Component as_currency value="12345.678" />
      </Provider>
    )

    expect(Comp.find('input').instance().value).toBe('12 345.6 NOK')

    Comp.setProps({
      InputMasked: {
        currency_mask: {
          decimalLimit: 2,
        },
        number_format: {
          omit_rounding: false,
        },
      },
    })

    expect(Comp.find('input').instance().value).toBe('12 345.68 NOK')
  })

  it('should react to locale change', () => {
    const Comp = mount(
      <Component as_currency value="12345.678" locale="en-GB" />
    )

    expect(Comp.find('input').instance().value).toBe('12 345.67 NOK')

    Comp.setProps({ locale: 'nb-NO' })

    expect(Comp.find('input').instance().value).toBe('12 345,67 kr')
  })

  it('should inherit locale from provider', () => {
    const Comp = mount(
      <Provider locale="en-GB">
        <Component as_currency value="12345.678" />
      </Provider>
    )

    expect(Comp.find('input').instance().value).toBe('12 345.67 NOK')

    // Change the provider locale
    Comp.setProps({ locale: 'nb-NO' })

    expect(Comp.find('input').instance().value).toBe('12 345,67 kr')
  })
})

describe('InputMasked scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/dnb-input-masked.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
