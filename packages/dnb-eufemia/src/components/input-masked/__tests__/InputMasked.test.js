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

const snapshotProps = {
  ...fakeProps(require.resolve('../InputMasked'), {
    optional: true,
  }),
  id: 'input-masked',
  mask: [/[a-z]/],
  show_mask: true,
  disabled: false,
  pipe: null,
  locale: null,
  as_number: null,
  as_currency: null,
  as_percent: null,
  number_format: null,
  number_mask: null,
  currency_mask: null,
  inner_ref: null,
}

const props = {
  id: 'input-masked',
}

describe('InputMasked component', () => {
  // compare the snapshot
  it('have to match type="text" snapshot', () => {
    const Comp = mount(
      <Component {...snapshotProps} type="text" value="test" />
    )
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should format "number_mask" accordingly the defined properties', () => {
    const Comp = mount(
      <Component
        value="1234.56"
        number_mask={{
          prefix: 'NOK ',
          suffix: ',- kr',
        }}
      />
    )

    expect(Comp.find('input').instance().value).toBe('NOK 1 234,- kr')
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

    expect(Comp.find('input').instance().value).toBe('NOK 1 234,5,- kr')

    Comp.find('input').simulate('change', {
      target: { value: newValue },
    })

    expect(Comp.find('input').instance().value).toBe(
      'NOK 123 456 789,0,- kr'
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

    expect(Comp.find('input').instance().value).toBe('123 456 789,67')

    expect(on_change).toBeCalledTimes(1)
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

    expect(Comp.find('input').instance().value).toBe('123 456 789,67')

    expect(on_change.mock.calls[0][0].value).toBe(newValue)
    expect(on_change.mock.calls[0][0].numberValue).toBe(123456789.678)
  })

  it('should prevent leading zero by default', () => {
    const newValue = 'NOK 1 234,56 kr'

    const onKeyDown = jest.fn()
    const preventDefault = jest.fn()

    const Comp = mount(
      <Component
        {...props}
        value={1234.56}
        number_mask={{
          prefix: 'NOK ',
          suffix: ',- kr',
          allowDecimal: true,
        }}
        on_key_down={onKeyDown}
      />
    )

    expect(Comp.find('input').instance().value).toBe('NOK 1 234,56,- kr')

    Comp.find('input').simulate('keydown', {
      key: '0',
      keyCode: 48, // zero
      target: {
        value: newValue,
        selectionStart: 5, // can be where ever, but not 4
      },
      preventDefault,
    })
    expect(preventDefault).toHaveBeenCalledTimes(0)
    expect(onKeyDown.mock.calls[0][0].value).toBe('NOK 1 234,56 kr')
    expect(onKeyDown.mock.calls[0][0].numberValue).toBe(1234.56)

    Comp.find('input').simulate('keydown', {
      key: '0',
      keyCode: 48, // zero
      target: {
        value: newValue,
        selectionStart: 4, // set it to be a leading zero
      },
      preventDefault,
    })
    expect(preventDefault).toHaveBeenCalledTimes(1)
    expect(onKeyDown).toHaveBeenCalledTimes(1)

    Comp.setProps({
      number_mask: {
        allowLeadingZeroes: true,
      },
    })

    Comp.find('input').simulate('keydown', {
      key: '0',
      keyCode: 48, // zero
      target: {
        value: newValue,
        selectionStart: 4, // set it to be a leading zero
      },
      preventDefault,
    })
    expect(preventDefault).toHaveBeenCalledTimes(1)
    expect(onKeyDown.mock.calls[1][0].value).toBe('NOK 1 234,56 kr')
    expect(onKeyDown.mock.calls[1][0].numberValue).toBe(1234.56)

    Comp.setProps({
      number_mask: {
        allowLeadingZeroes: false,
        allowDecimal: false,
      },
    })

    Comp.find('input').simulate('keydown', {
      key: ',',
      keyCode: 188, // coma
      target: {
        value: '',
        selectionStart: 0, // set it to be a leading zero
      },
      preventDefault,
    })
    expect(preventDefault).toHaveBeenCalledTimes(2)
    expect(onKeyDown).toHaveBeenCalledTimes(2)
  })

  it('should allow leading zero when removing first letter', () => {
    const onChange = jest.fn()

    const prefix = 'NOK '
    const suffix = ' kr'

    const EditValue = () => {
      const [value, setValue] = React.useState(10000.01)

      return (
        <Component
          {...props}
          value={value}
          number_mask={{
            prefix,
            suffix,
            allowDecimal: true,
          }}
          on_change={(...params) => {
            const { numberValue } = params[0]
            setValue(numberValue)
            onChange(...params)
          }}
        />
      )
    }

    const Comp = mount(<EditValue />)

    expect(Comp.find('input').instance().value).toBe('NOK 10 000,01 kr')

    Comp.find('input').simulate('change', {
      target: {
        value: prefix + '0012,01' + suffix,
      },
    })

    expect(onChange.mock.calls[0][0].value).toBe('NOK 0012,01 kr')
    expect(onChange.mock.calls[0][0].numberValue).toBe(12.01)
    expect(Comp.find('input').instance().value).toBe('NOK 0 012,01 kr')
  })

  it('should update value when value has leading zero', () => {
    const Comp = mount(
      <Component
        value={0.1}
        number_mask={{
          allowDecimal: true,
        }}
      />
    )

    expect(Comp.find('input').instance().value).toBe('0,1')

    Comp.setProps({ value: 1234 })

    expect(Comp.find('input').instance().value).toBe('1 234')
  })

  it('should not set leading zero when entering decimal separator', () => {
    const onKeyDown = jest.fn()
    const preventDefault = jest.fn()

    const Comp = mount(
      <Component
        number_mask={{
          suffix: ' kr',
          allowDecimal: true,
        }}
        on_key_down={onKeyDown}
      />
    )

    const keyCode = 188 // coma
    Comp.find('input').simulate('keydown', {
      keyCode,
      target: {
        value: '',
      },
      preventDefault,
    })
    expect(preventDefault).toHaveBeenCalledTimes(1)
    expect(onKeyDown).toHaveBeenCalledTimes(0)

    Comp.setProps({
      number_mask: {
        allowLeadingZeroes: true,
      },
    })

    Comp.find('input').simulate('keydown', {
      key: '0',
      keyCode: 48, // zero
      target: {
        value: '0 kr',
      },
      preventDefault,
    })
    expect(onKeyDown.mock.calls[0][0].value).toBe('0 kr')
    expect(onKeyDown).toHaveBeenCalledTimes(1)
    expect(preventDefault).toHaveBeenCalledTimes(1)
  })

  it('should set caret position before suffix', async () => {
    const Comp = mount(
      <Component
        show_mask
        number_mask={{
          suffix: ' kr',
          allowDecimal: true,
        }}
      />
    )

    const setSelectionRange = jest.fn()
    const wait = (t) => new Promise((r) => setTimeout(r, t))
    const focus = ({ comp = Comp, value }) => {
      comp.find('input').simulate('focus', {
        target: {
          value,
          selectionStart: value.indexOf('kr'), // set it where the mask starts
          selectionEnd: value.indexOf('kr'), // set it where the mask starts
          setSelectionRange,
        },
      })
    }

    focus({ value: '​ kr' })
    expect(Comp.find('input').instance().value).toBe(
      '​ kr' // includes a hidden space: unvisibleSpace
    )

    await wait(2)

    expect(setSelectionRange).toBeCalledTimes(1)
    expect(setSelectionRange).toHaveBeenCalledWith(0, 0)

    const CompWithPrefix = mount(
      <Component
        show_mask
        number_mask={{
          prefix: 'Prefix ',
          suffix: ' kr',
          allowDecimal: true,
        }}
      />
    )

    focus({ comp: CompWithPrefix, value: 'Prefix​  kr' })
    expect(CompWithPrefix.find('input').instance().value).toBe(
      'Prefix ​ kr' // includes a hidden space: unvisibleSpace
    )

    await wait(2)

    expect(setSelectionRange).toBeCalledTimes(2)
    expect(setSelectionRange).toHaveBeenCalledWith(8, 8)
  })
})

describe('InputMasked component with currency_mask', () => {
  it('should axcept only a string', () => {
    const Comp = mount(
      <Component {...props} value="1234" currency_mask="NOK" />
    )

    expect(Comp.find('input').instance().value).toBe('1 234 NOK')
  })

  it('should axcept the currency inside a objecnt property', () => {
    const Comp = mount(
      <Component
        {...props}
        value="1234"
        currency_mask={{
          currency: 'NOK',
        }}
      />
    )

    expect(Comp.find('input').instance().value).toBe('1 234 NOK')
  })

  it('should not show mask if placeholder is set', () => {
    const Comp = mount(
      <Component
        {...props}
        placeholder="Placeholder-text"
        currency_mask="NOK"
      />
    )

    expect(Comp.find('TextMask').props().showMask).toBe(false)
  })

  it('can change value to be empty', () => {
    const BasicMask = () => {
      const [floatval, setState] = React.useState(123)

      return (
        <Component
          {...props}
          value={floatval}
          currency_mask="NOK"
          on_change={({ numberValue }) => {
            setState(numberValue)
          }}
        />
      )
    }

    const Comp = mount(<BasicMask />)

    expect(Comp.find('input').instance().value).toBe('123 NOK')

    Comp.find('input').simulate('change', {
      target: { value: '1234' },
    })

    expect(Comp.find('input').instance().value).toBe('1 234 NOK')

    Comp.find('input').simulate('change', {
      target: { value: '' },
    })

    Comp.find('input').simulate('keydown', {
      keyCode: 8, // backspace
    })

    expect(Comp.find('input').instance().value).toBe('')
  })
})

describe('InputMasked component as_percent', () => {
  it('should create a "number_mask" with a % suffix', () => {
    const Comp = mount(<Component value="12345.678" as_percent />)

    expect(Comp.find('input').instance().value).toBe('12 345 %')

    Comp.setProps({ value: '12345.123' })

    expect(Comp.find('input').instance().value).toBe('12 345 %')
  })

  it('should merge "number_mask" properties', () => {
    const Comp = mount(
      <Component
        value="12345.678"
        as_percent
        number_mask={{ decimalLimit: 1 }}
      />
    )

    expect(Comp.find('input').instance().value).toBe('12 345,6 %')
  })

  it('should set inputmode to numeric or decimal', () => {
    const Comp = mount(<Component value="12345.678" as_percent />)

    expect(Comp.find('input').instance().getAttribute('inputMode')).toBe(
      'numeric'
    )

    Comp.setProps({ number_mask: { decimalLimit: 1 } })

    expect(Comp.find('input').instance().getAttribute('inputMode')).toBe(
      'decimal'
    )

    Comp.setProps({
      number_mask: { allowDecimal: false, decimalLimit: 1 },
    })

    expect(Comp.find('input').instance().getAttribute('inputMode')).toBe(
      'numeric'
    )
  })

  it('should react to locale change', () => {
    const Comp = mount(
      <Component
        as_percent
        number_mask={{ allowDecimal: true, decimalLimit: 3 }}
        value="12345.678"
        locale="en-GB"
      />
    )

    expect(Comp.find('input').instance().value).toBe('12 345.678%')

    Comp.setProps({ locale: 'nb-NO' })

    expect(Comp.find('input').instance().value).toBe('12 345,678 %')
  })
})

describe('InputMasked component as_number', () => {
  it('should create a "number_mask" accordingly the defined properties', () => {
    const Comp = mount(<Component value="12345.678" as_number />)

    expect(Comp.find('input').instance().value).toBe('12 345')

    Comp.setProps({ value: '12345.123' })

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

  it('should merge "mask_options" properties', () => {
    const Comp = mount(
      <Component
        value="12345.678"
        as_number
        mask_options={{ decimalLimit: 1 }}
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
        mask_options={{ decimalLimit: 1 }}
        on_change={on_change}
      />
    )

    expect(Comp.find('input').instance().value).toBe('12 345,6')

    Comp.find('input').simulate('change', {
      target: { value: newValue },
    })

    expect(Comp.find('input').instance().value).toBe('123 456 789,6')

    expect(on_change.mock.calls[0][0].value).toBe(newValue)
    expect(on_change.mock.calls[0][0].numberValue).toBe(123456789.678)
  })

  it('should append a coma when entering a dot', () => {
    const Comp = mount(
      <Component as_number mask_options={{ allowDecimal: true }} />
    )

    const setSelectionRange = jest.fn()

    const elem = Comp.find('input').instance()

    const pressDotAndUseItAsComa = ({ value }) => {
      const keyCode = 190 // dot
      Comp.find('input').simulate('keydown', {
        keyCode,
        target: {
          value,
          selectionStart: 6,
          setSelectionRange,
        },
      })
    }

    pressDotAndUseItAsComa({ value: '12 345' })

    expect(elem.value).toBe('12 345,')

    // try a second time from the same cursor position
    pressDotAndUseItAsComa({ value: '12 345,' })

    expect(elem.value).toBe('12 345,')
    expect(setSelectionRange).toBeCalledTimes(1)
    expect(setSelectionRange).toHaveBeenCalledWith(7, 7)
  })

  it('should prevent a coma when decimalLimit=0', () => {
    const Comp = mount(
      <Component as_number mask_options={{ decimalLimit: 0 }} />
    )

    const preventDefault = jest.fn()
    const event = { preventDefault }

    const newValue = '12 345'
    Comp.find('input').simulate('change', {
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

  it('should prevent a coma by default', () => {
    const Comp = mount(<Component as_number />)

    const preventDefault = jest.fn()
    const event = { preventDefault }

    const newValue = '12 345'
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

    pressDotAndUseItAsComa()
    pressDotAndUseItAsComa() // try a second time

    expect(preventDefault).toBeCalledTimes(2)
    expect(Comp.find('input').instance().value).toBe('12 345')
  })

  it('should react to locale change', () => {
    const Comp = mount(
      <Component
        as_number
        mask_options={{ allowDecimal: true, decimalLimit: 3 }}
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
          mask_options={{ decimalLimit: 3 }}
          value="12345.678"
        />
      </Provider>
    )

    expect(Comp.find('input').instance().value).toBe('12 345.678')

    // Change the provider locale
    Comp.setProps({ locale: 'nb-NO' })

    expect(Comp.find('input').instance().value).toBe('12 345,678')
  })

  it('should set inputmode to numeric or decimal', () => {
    const Comp = mount(<Component value="12345" as_number />)

    expect(Comp.find('input').instance().getAttribute('inputMode')).toBe(
      'numeric'
    )

    Comp.setProps({ number_mask: { decimalLimit: 1 } })

    expect(Comp.find('input').instance().getAttribute('inputMode')).toBe(
      'decimal'
    )

    Comp.setProps({
      mask_options: { allowDecimal: false, decimalLimit: 1 },
    })

    expect(Comp.find('input').instance().getAttribute('inputMode')).toBe(
      'numeric'
    )
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

  it('should merge "mask_options" properties', () => {
    const Comp = mount(
      <Component
        value="12345.678"
        as_currency
        mask_options={{ decimalLimit: 1 }}
      />
    )

    expect(Comp.find('input').instance().value).toBe('12 345,6 kr')
  })

  it('should omit decimals when allowDecimal=false', () => {
    const Comp = mount(
      <Component
        value="12345.678"
        as_currency
        mask_options={{ allowDecimal: false }}
      />
    )

    expect(Comp.find('input').instance().value).toBe('12 345 kr')
  })

  it('event "on_change" gets emmited with correct value', () => {
    const newValue = 'NOK 123456789,678 kr'

    const on_change = jest.fn()

    const Comp = mount(
      <Component value="12345.678" as_currency on_change={on_change} />
    )

    expect(Comp.find('input').instance().value).toBe('12 345,67 kr')

    Comp.find('input').simulate('change', {
      target: { value: newValue },
    })

    expect(Comp.find('input').instance().value).toBe('123 456 789,67 kr')

    expect(on_change.mock.calls[0][0].value).toBe(newValue)
    expect(on_change.mock.calls[0][0].numberValue).toBe(123456789.678)

    Comp.setProps({ mask_options: { decimalLimit: 1 } })

    Comp.find('input').simulate('change', {
      target: { value: newValue },
    })

    expect(Comp.find('input').instance().value).toBe('123 456 789,6 kr')

    expect(on_change.mock.calls[0][0].value).toBe(newValue)
    expect(on_change.mock.calls[0][0].numberValue).toBe(123456789.678)
  })

  it('event "on_change" gets emmited with correct value with en locale', () => {
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

    const newValue = 'NOK 123 456 789.678 kr'
    Comp.find('input').simulate('change', {
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

    expect(Comp.find('input').instance().value).toBe('12 345,6 kr')

    Comp.setProps({ value: 12345.7 })

    expect(Comp.find('input').instance().value).toBe('12 345,7 kr')

    Comp.setProps({ value: 12345.01 })

    expect(Comp.find('input').instance().value).toBe('12 345,01 kr')

    Comp.setProps({ value: '12345.016' })

    expect(Comp.find('input').instance().value).toBe('12 345,01 kr')

    Comp.setProps({
      number_format: { omit_rounding: false },
    })

    expect(Comp.find('input').instance().value).toBe('12 345,02 kr')
  })

  it('should not append a coma when entering a dot', () => {
    const Comp = mount(<Component as_currency />)

    const preventDefault = jest.fn()
    const event = { preventDefault }

    const newValue = '12 345,67 kr'
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

  it('should change both value and locale', () => {
    const Comp = mount(
      <Component locale="en-GB" as_currency value="12345.678" />
    )

    expect(Comp.find('input').instance().value).toBe('12 345.67 NOK')

    // Change the provider locale
    Comp.setProps({ locale: 'nb-NO' })

    expect(Comp.find('input').instance().value).toBe('12 345,67 kr')

    Comp.setProps({ value: '12345.123' })

    expect(Comp.find('input').instance().value).toBe('12 345,12 kr')
  })

  it('should set inputmode to numeric or decimal', () => {
    const Comp = mount(<Component value="12345" as_currency />)

    expect(Comp.find('input').instance().getAttribute('inputMode')).toBe(
      'decimal'
    )

    Comp.setProps({
      number_mask: { allowDecimal: false, decimalLimit: 1 },
    })

    expect(Comp.find('input').instance().getAttribute('inputMode')).toBe(
      'numeric'
    )
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
