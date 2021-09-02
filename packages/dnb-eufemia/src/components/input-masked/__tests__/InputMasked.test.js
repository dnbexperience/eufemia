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
        value="1000000"
        number_mask={{
          prefix: 'NOK ',
          suffix: ',- kr.',
        }}
      />
    )

    expect(Comp.find('input').instance().value).toBe('NOK 1 000 000,- kr.')
  })

  it('gets valid ref element', () => {
    const ref = React.createRef()
    mount(<Component {...props} inner_ref={ref} />)

    expect(ref.current instanceof window.HTMLInputElement).toBe(true)
    expect(ref.current.id).toBe(props.id)
  })
})

describe('InputMasked component as number', () => {
  it('should create a "number_mask" accordingly the defined properties', () => {
    const Comp = mount(<Component value="12345.678" as_number />)

    expect(Comp.find('input').instance().value).toBe('12 345,678')
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

  it('should append a coma when entering a dot', () => {
    const Comp = mount(<Component as_number />)

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

    pressDotAndUseItAsComa()
    pressDotAndUseItAsComa() // try a second time

    expect(Comp.find('input').instance().value).toBe('12 345,')
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

  it('should react to locale change', () => {
    const Comp = mount(
      <Component as_number value="12345.678" locale="en-GB" />
    )

    expect(Comp.find('input').instance().value).toBe('12 345.678')

    Comp.setProps({ locale: 'nb-NO' })

    expect(Comp.find('input').instance().value).toBe('12 345,678')
  })

  it('should inherit locale from provider', () => {
    const Comp = mount(
      <Provider locale="en-GB">
        <Component as_number value="12345.678" />
      </Provider>
    )

    expect(Comp.find('input').instance().value).toBe('12 345.678')

    // Change the provider locale
    Comp.setProps({ locale: 'nb-NO' })

    expect(Comp.find('input').instance().value).toBe('12 345,678')
  })
})

describe('InputMasked component as currency', () => {
  it('should create a "currency_mask" accordingly the defined properties', () => {
    const Comp = mount(<Component value="12345.678" as_currency />)

    expect(Comp.find('input').instance().value).toBe('12 345,68 kr')
  })

  it('should merge "currency_mask" properties', () => {
    const Comp = mount(
      <Component
        value="12345.678"
        as_currency
        currency_mask={{ decimalLimit: 1 }}
      />
    )

    expect(Comp.find('input').instance().value).toBe('12 345,7 kr')
  })

  it('should use given currency', () => {
    const Comp = mount(<Component value="12345.678" as_currency="USD" />)

    expect(Comp.find('input').instance().value).toBe('12 345,68 $')
  })

  it('should have correct decimals', () => {
    const Comp = mount(<Component value="12345.6" as_currency="NOK" />)

    expect(Comp.find('input').instance().value).toBe('12 345,60 kr')

    Comp.setProps({ value: 12345.7 })

    expect(Comp.find('input').instance().value).toBe('12 345,70 kr')

    Comp.setProps({ value: 12345.01 })

    expect(Comp.find('input').instance().value).toBe('12 345,01 kr')

    Comp.setProps({ value: '12345.016' })

    expect(Comp.find('input').instance().value).toBe('12 345,02 kr')

    Comp.setProps({ value: '12345.016' })
    Comp.setProps({ number_format: { omit_rounding: true } })

    expect(Comp.find('input').instance().value).toBe('12 345,01 kr')
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
    expect(Comp.find('input').instance().value).toBe('12 345,678 kr')
  })

  it('should react to locale change', () => {
    const Comp = mount(
      <Component as_currency value="12345.678" locale="en-GB" />
    )

    expect(Comp.find('input').instance().value).toBe('12 345.68 NOK')

    Comp.setProps({ locale: 'nb-NO' })

    expect(Comp.find('input').instance().value).toBe('12 345,68 kr')
  })

  it('should inherit locale from provider', () => {
    const Comp = mount(
      <Provider locale="en-GB">
        <Component as_currency value="12345.678" />
      </Provider>
    )

    expect(Comp.find('input').instance().value).toBe('12 345.68 NOK')

    // Change the provider locale
    Comp.setProps({ locale: 'nb-NO' })

    expect(Comp.find('input').instance().value).toBe('12 345,68 kr')
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
