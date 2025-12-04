/**
 * InputMasked Test
 *
 */

import React from 'react'
import { loadScss, wait } from '../../../core/jest/jestSetup'
import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InputMasked, { InputMaskedProps } from '../InputMasked'
import Provider from '../../../shared/Provider'
import * as helpers from '../../../shared/helpers'

const props: InputMaskedProps = {
  id: 'input-masked',
}

beforeEach(() => {
  // Use this because of the correctCaretPosition
  window.requestAnimationFrame = jest.fn((callback) => {
    return setTimeout(callback, 0)
  })
})

describe('InputMasked component', () => {
  it('should format "numberMask" accordingly the defined properties', () => {
    render(
      <InputMasked
        value="1234.56"
        numberMask={{
          prefix: 'NOK ',
          suffix: ',- kr',
        }}
      />
    )

    expect(document.querySelector('input').value).toBe('NOK 1 234,- kr')
  })

  it('should support inline styling', () => {
    render(<InputMasked value="1234.56" style={{ color: 'red' }} />)

    expect(document.querySelector('input').getAttribute('style')).toBe(
      'color: red;'
    )
  })

  it('gets valid ref element', () => {
    let ref: React.RefObject<HTMLInputElement>

    function MockComponent() {
      ref = React.useRef()
      return <InputMasked {...props} innerRef={ref} />
    }

    render(<MockComponent />)

    expect(ref.current instanceof HTMLInputElement).toBe(true)
    expect(ref.current.id).toBe(props.id)
    expect(ref.current.tagName).toBe('INPUT')
  })

  it('gets valid element when ref is function', () => {
    const ref: React.MutableRefObject<HTMLInputElement> = React.createRef()

    const refFn = (elem: HTMLInputElement) => {
      ref.current = elem
    }

    render(<InputMasked {...props} innerRef={refFn} />)

    expect(ref.current instanceof HTMLInputElement).toBe(true)
    expect(ref.current.id).toBe(props.id)
    expect(ref.current.tagName).toBe('INPUT')
  })

  it('event "onChange" gets emitted with correct value #1', async () => {
    const initValue = 'NOK 1234,5 kr'
    const newValue = 'NOK 123456789,0 kr'

    const onChange = jest.fn()

    render(
      <InputMasked
        value={initValue}
        numberMask={{
          prefix: 'NOK ',
          suffix: ',- kr',
          allowDecimal: true,
        }}
        onChange={onChange}
      />
    )

    expect(document.querySelector('input').value).toBe('NOK 1 234,5,- kr')

    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
    })

    expect(document.querySelector('input').value).toBe(
      'NOK 1 234 567 890,,- kr'
    )

    expect(
      onChange.mock.calls[onChange.mock.calls.length - 1][0].value
    ).toBe('NOK 123 456 789,0,- kr')
    expect(
      onChange.mock.calls[onChange.mock.calls.length - 1][0].numberValue
    ).toBe(123456789)
  })

  it('event "onChange" gets emitted with correct value #2', async () => {
    const newValue = 'NOK 123456789,678 kr'

    const onChange = jest.fn()

    render(
      <InputMasked
        value="12345.678"
        numberMask={{ allowDecimal: true }}
        onChange={onChange}
      />
    )

    expect(document.querySelector('input').value).toBe('12 345,67')

    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
    })

    expect(document.querySelector('input').value).toBe('123 456 789,67')

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(
      onChange.mock.calls[onChange.mock.calls.length - 1][0].value
    ).toBe('123 456 789,67')
    expect(
      onChange.mock.calls[onChange.mock.calls.length - 1][0].numberValue
    ).toBe(123456789.67)
  })

  it('event "onChange" gets emitted with correct value #3', async () => {
    const newValue = 'NOK 123456789,678 kr'

    const onChange = jest.fn()

    render(
      <InputMasked
        value="12345.678"
        numberMask={{
          thousandsSeparatorSymbol: ' ',
          decimalSymbol: ',',
          allowDecimal: true,
        }}
        onChange={onChange}
      />
    )

    expect(document.querySelector('input').value).toBe('12 345,67')

    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
    })

    expect(document.querySelector('input').value).toBe('123 456 789,67')

    expect(
      onChange.mock.calls[onChange.mock.calls.length - 1][0].value
    ).toBe('123 456 789,67')
    expect(
      onChange.mock.calls[onChange.mock.calls.length - 1][0].numberValue
    ).toBe(123456789.67)
  })

  it('should allow leading zero when removing first letter', () => {
    const onChange = jest.fn()

    const prefix = 'NOK '
    const suffix = ' kr'

    const EditValue = () => {
      const [value, setValue] = React.useState(10000.01)

      return (
        <InputMasked
          {...props}
          value={value}
          numberMask={{
            prefix,
            suffix,
            allowDecimal: true,
          }}
          onChange={(...params) => {
            const { numberValue } = params[0]
            setValue(numberValue)
            onChange(...params)
          }}
        />
      )
    }

    render(<EditValue />)

    expect(document.querySelector('input').value).toBe('NOK 10 000,01 kr')

    fireEvent.change(document.querySelector('input'), {
      target: { value: prefix + '0012,01' + suffix },
    })

    expect(onChange.mock.calls[0][0].value).toBe('NOK 0 012,01 kr')
    expect(onChange.mock.calls[0][0].numberValue).toBe(12.01)
    expect(document.querySelector('input').value).toBe('NOK 0 012,01 kr')
  })

  it('should handle minus values', () => {
    const onChange = jest.fn()

    const EditValue = () => {
      const [value, setValue] = React.useState(-0.1)

      return (
        <InputMasked
          {...props}
          value={value}
          numberMask={{
            allowDecimal: true,
          }}
          onChange={(...params) => {
            const { numberValue } = params[0]
            setValue(numberValue)
            onChange(...params)
          }}
        />
      )
    }

    render(<EditValue />)

    expect(document.querySelector('input').value).toBe('-0,1')

    fireEvent.change(document.querySelector('input'), {
      target: { value: '-' },
    })

    expect(onChange.mock.calls[0][0].numberValue).toBe(-0)
    expect(document.querySelector('input').value).toBe('-​')

    fireEvent.change(document.querySelector('input'), {
      target: { value: '-0' },
    })

    expect(onChange.mock.calls[0][0].numberValue).toBe(-0)
    expect(document.querySelector('input').value).toBe('-0')
  })

  it('should update value when initial value was an empty string', () => {
    const { rerender } = render(<InputMasked value="" numberMask />)

    expect(document.querySelector('input').value).toBe('')

    rerender(<InputMasked value={1234} numberMask />)

    expect(document.querySelector('input').value).toBe('1 234')
  })

  it('should update value when value has leading zero', () => {
    const { rerender } = render(
      <InputMasked
        value={0.1}
        numberMask={{
          allowDecimal: true,
        }}
      />
    )

    expect(document.querySelector('input').value).toBe('0,1')

    rerender(
      <InputMasked
        value={1234}
        numberMask={{
          allowDecimal: true,
        }}
      />
    )

    expect(document.querySelector('input').value).toBe('1 234')
  })

  it('should accept custom mask only', () => {
    const onKeyDown = jest.fn()
    const preventDefault = jest.fn()
    const newValue = '010203 12345'

    const { rerender } = render(
      <InputMasked
        value="11020312345"
        onKeyDown={onKeyDown}
        mask={() => [
          /[0-9]/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          ' ',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]}
      />
    )

    expect(document.querySelector('input').value).toBe('110203 12345')

    fireEvent.keyDown(document.querySelector('input'), {
      key: '0',
      keyCode: 48, // zero
      target: {
        value: newValue,
        selectionStart: 0, // set it to be a leading zero
      },
      preventDefault,
    })

    expect(preventDefault).toHaveBeenCalledTimes(0)
    expect(onKeyDown).toHaveBeenCalledTimes(1)
    expect(onKeyDown.mock.calls[0][0].value).toBe('010203 12345')

    rerender(
      <InputMasked
        value="11020312345"
        onKeyDown={onKeyDown}
        mask={() => [
          /[0-9]/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          ' ',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]}
        maskOptions={{ disallowLeadingZeroes: true }}
      />
    )

    fireEvent.keyDown(document.querySelector('input'), {
      key: '0',
      keyCode: 48, // zero
      target: {
        value: newValue,
        selectionStart: 0, // set it to be a leading zero
      },
      preventDefault,
    })

    expect(onKeyDown).toHaveBeenCalledTimes(2)
  })

  it('should accept provider props with custom mask', () => {
    render(
      <Provider value={{ InputMasked: { value: '00020300000' } }}>
        <InputMasked
          value="11020312345"
          mask={() => [
            /[0-9]/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ]}
        />
      </Provider>
    )

    expect(document.querySelector('input').value).toBe('110203 12345')
  })

  it('should ignore mask types from provider, when custom mask is used', () => {
    render(
      <Provider
        value={{
          InputMasked: {
            asNumber: true,
            asCurrency: true,
            asPercent: true,
            numberMask: {},
            currencyMask: {},
          },
        }}
      >
        <InputMasked
          value="123"
          mask={() => [/\d/, ' ', /\d/, ' ', /\d/]}
        />
      </Provider>
    )

    expect(document.querySelector('input').value).toBe('1 2 3')
  })

  it('should show placeholder with both value null and undefined', () => {
    const { rerender } = render(
      <InputMasked placeholder="AA" value={undefined} />
    )

    expect(
      document.querySelector('.dnb-input__placeholder').textContent
    ).toBe('AA')

    rerender(<InputMasked placeholder="BB" value={null} />)

    expect(
      document.querySelector('.dnb-input__placeholder').textContent
    ).toBe('BB')

    rerender(<InputMasked placeholder="CC" value="" />)

    expect(
      document.querySelector('.dnb-input__placeholder').textContent
    ).toBe('CC')

    rerender(<InputMasked placeholder="CC" value="new-value" />)

    expect(
      document.querySelector('.dnb-input__placeholder')
    ).not.toBeInTheDocument()
  })

  it('should set caret position before suffix', async () => {
    render(
      <InputMasked
        showMask
        numberMask={{
          suffix: ' kr',
          allowDecimal: true,
        }}
      />
    )

    const setSelectionRange = jest.fn()
    const focus = ({ value }) => {
      fireEvent.focus(document.querySelector('input'), {
        target: {
          value,
          selectionStart: value.indexOf('kr'), // set it where the mask starts
          selectionEnd: value.indexOf('kr'), // set it where the mask starts
          setSelectionRange,
        },
      })
    }

    focus({ value: '​ kr' })
    expect(document.querySelector('input').value).toBe(
      '​ kr' // includes a hidden space: invisibleSpace
    )

    await wait(2) // because of the delayed requestAnimationFrame

    expect(setSelectionRange).toHaveBeenCalledTimes(1)
    expect(setSelectionRange).toHaveBeenCalledWith(0, 0)

    render(
      <InputMasked
        showMask
        numberMask={{
          prefix: 'Prefix ',
          suffix: ' kr',
          allowDecimal: true,
        }}
      />
    )

    focus({ value: 'Prefix​  kr' })
    expect(document.querySelector('input').value).toBe(
      'Prefix​  kr' // includes a hidden space: invisibleSpace
    )

    await wait(2) // because of the delayed requestAnimationFrame

    expect(setSelectionRange).toHaveBeenCalledTimes(2)
    expect(setSelectionRange).toHaveBeenCalledWith(8, 8)
  })

  it('should move caret position on delete key', () => {
    render(
      <InputMasked
        value={123456}
        showMask
        numberMask={{
          suffix: ' kr',
          prefix: 'NOK ',
          allowDecimal: true,
        }}
      />
    )

    const setSelectionRange = jest.fn()
    const preventDefault = jest.fn()

    const simulate = ({ name, value, selectionPosition, keyCode }) => {
      fireEvent[name](document.querySelector('input'), {
        target: {
          value,
          selectionStart: selectionPosition,
          selectionEnd: selectionPosition,
          setSelectionRange,
        },
        preventDefault,
        keyCode,
      })
    }

    const element = document.querySelector('input')

    expect(element.value).toBe(
      'NOK 123 456 kr' // includes a hidden space: invisibleSpace
    )

    const selectionPosition = 7
    const value = element.value

    // test "delete" key
    simulate({
      name: 'keyDown',
      value,
      selectionPosition,
      keyCode: 46, // delete
    })
    expect(setSelectionRange).toHaveBeenCalledTimes(1)
    expect(setSelectionRange).toHaveBeenCalledWith(
      selectionPosition + 1,
      selectionPosition + 1
    )
  })

  it('should set correct integerLimit during typing', () => {
    const onChange = jest.fn()
    const MockComponent = () => {
      const [controlledValue, setControlledValue] = React.useState(123456)

      const handleChange = (props) => {
        setControlledValue(props.numberValue)
        onChange(props)
      }

      return (
        <InputMasked
          value={controlledValue}
          numberMask={{ integerLimit: 4 }}
          onChange={handleChange}
        />
      )
    }

    render(<MockComponent />)

    const element = document.querySelector('input')

    expect(element.value).toBe('1 234')

    fireEvent.change(element, { target: { value: '123' } })

    expect(element.value).toBe('123')

    fireEvent.change(element, { target: { value: '12 345' } })

    expect(element.value).toBe('1 234')
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  describe('disallowLeadingZeroes', () => {
    it('should prevent leading zero', () => {
      const newValue = 'NOK 1 234,56 kr'

      const onKeyDown = jest.fn()
      const preventDefault = jest.fn()

      const { rerender } = render(
        <InputMasked
          {...props}
          value={1234.56}
          numberMask={{
            prefix: 'NOK ',
            suffix: ',- kr',
            allowDecimal: true,
          }}
          onKeyDown={onKeyDown}
        />
      )

      expect(document.querySelector('input').value).toBe(
        'NOK 1 234,56,- kr'
      )

      fireEvent.keyDown(document.querySelector('input'), {
        key: '0',
        keyCode: 48, // zero
        target: {
          value: newValue,
          selectionStart: 5, // can be wherever, but not 4
        },
        preventDefault,
      })
      expect(preventDefault).toHaveBeenCalledTimes(0)
      expect(onKeyDown).toHaveBeenCalledTimes(1)
      expect(onKeyDown.mock.calls[0][0].value).toBe('NOK 1 234,56 kr')
      expect(onKeyDown.mock.calls[0][0].numberValue).toBe(1234.56)

      fireEvent.keyDown(document.querySelector('input'), {
        key: '0',
        keyCode: 48, // zero
        target: {
          value: newValue,
          selectionStart: 4, // set it to be a leading zero
        },
        preventDefault,
      })
      expect(preventDefault).toHaveBeenCalledTimes(0)
      expect(onKeyDown).toHaveBeenCalledTimes(2)

      rerender(
        <InputMasked
          {...props}
          value={1234.56}
          numberMask={{
            disallowLeadingZeroes: true,
          }}
          onKeyDown={onKeyDown}
        />
      )

      fireEvent.keyDown(document.querySelector('input'), {
        key: '0',
        keyCode: 48, // zero
        target: {
          value: newValue,
          selectionStart: 4, // set it to be a leading zero
        },
        preventDefault,
      })
      expect(onKeyDown.mock.calls[1][0].value).toBe('NOK 1 234,56 kr')
      expect(onKeyDown.mock.calls[1][0].numberValue).toBe(1234.56)

      rerender(
        <InputMasked
          {...props}
          value={1234.56}
          numberMask={{
            disallowLeadingZeroes: false,
            allowDecimal: false,
          }}
          onKeyDown={onKeyDown}
        />
      )

      fireEvent.keyDown(document.querySelector('input'), {
        key: ',',
        keyCode: 188, // comma
        target: {
          value: '',
          selectionStart: 0, // set it to be a leading zero
        },
        preventDefault,
      })
      expect(onKeyDown).toHaveBeenCalledTimes(4)
    })

    it('should allow 0 as value', async () => {
      const onChange = jest.fn()

      render(
        <InputMasked
          {...props}
          numberMask={{
            allowDecimal: true,
            disallowLeadingZeroes: true,
          }}
          onChange={onChange}
        />
      )

      const input = document.querySelector('input')

      await userEvent.type(input, '0')

      expect(input).toHaveValue('0')
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({ numberValue: 0, value: '0' })
      )

      await userEvent.keyboard('10')

      expect(input).toHaveValue('10')
      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChange).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({ numberValue: 1, value: '1' })
      )
      expect(onChange).toHaveBeenNthCalledWith(
        3,
        expect.objectContaining({ numberValue: 10, value: '10' })
      )

      await userEvent.keyboard('{Backspace>4}')

      expect(input).toHaveValue('')
      expect(onChange).toHaveBeenCalledTimes(5)
      expect(onChange).toHaveBeenNthCalledWith(
        4,
        expect.objectContaining({ numberValue: 1, value: '1' })
      )
      expect(onChange).toHaveBeenNthCalledWith(
        5,
        expect.objectContaining({ numberValue: 0, value: '' })
      )

      await userEvent.keyboard('0.1')

      expect(input).toHaveValue('0,1')
      expect(onChange).toHaveBeenCalledTimes(7)
      expect(onChange).toHaveBeenNthCalledWith(
        6,
        expect.objectContaining({ numberValue: 0, value: '0' })
      )
      expect(onChange).toHaveBeenNthCalledWith(
        7,
        expect.objectContaining({ numberValue: 0.1, value: '0,1' })
      )
    })

    it('should allow 0 as value when the input is blurred', async () => {
      const onChange = jest.fn()

      render(
        <InputMasked
          {...props}
          numberMask={{
            disallowLeadingZeroes: true,
          }}
          onChange={onChange}
        />
      )

      const input = document.querySelector('input')

      await userEvent.type(input, '0')

      expect(input).toHaveValue('0')

      fireEvent.blur(input)

      expect(input).toHaveValue('0')
    })

    it('should remove leading zero when the input is blurred', async () => {
      const onChange = jest.fn()

      render(
        <InputMasked
          {...props}
          numberMask={{
            disallowLeadingZeroes: true,
          }}
          onChange={onChange}
        />
      )

      const input = document.querySelector('input')

      await userEvent.type(input, '100123')

      expect(input).toHaveValue('100 123')

      await userEvent.keyboard('[ArrowLeft>6]{Backspace}')

      expect(input).toHaveValue('00 123')

      fireEvent.blur(input)

      expect(input).toHaveValue('123')
    })

    it('should remove leading zero with minus when the input is blurred', async () => {
      const onChange = jest.fn()
      const onBlur = jest.fn()

      render(
        <InputMasked
          {...props}
          numberMask={{
            disallowLeadingZeroes: true,
          }}
          onChange={onChange}
          onBlur={onBlur}
        />
      )

      const input = document.querySelector('input')

      await userEvent.type(input, '-100123')

      expect(input).toHaveValue('-100 123')

      await userEvent.keyboard('[ArrowLeft>6]{Backspace}')

      expect(input).toHaveValue('-00 123')

      fireEvent.blur(input)

      expect(input).toHaveValue('-123')
      expect(onChange).toHaveBeenCalledTimes(8)
      expect(onChange).toHaveBeenNthCalledWith(
        8,
        expect.objectContaining({ numberValue: -123, value: '-00 123' })
      )
      expect(onBlur).toHaveBeenCalledTimes(1)
      expect(onBlur).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({ numberValue: -123, value: '-123' })
      )
    })

    it('should not remove leading zeroes when deleting front number', async () => {
      const onChange = jest.fn()

      render(
        <InputMasked
          {...props}
          numberMask={{
            allowDecimal: true,
            disallowLeadingZeroes: true,
          }}
          onChange={onChange}
        />
      )

      const input = document.querySelector('input')

      await userEvent.type(input, '1000')

      expect(input).toHaveValue('1 000')
      expect(onChange).toHaveBeenCalledTimes(4)
      expect(onChange).toHaveBeenNthCalledWith(
        4,
        expect.objectContaining({ numberValue: 1000, value: '1 000' })
      )

      await userEvent.keyboard('[ArrowLeft>4]{Backspace}')

      expect(input).toHaveValue('000')
      expect(onChange).toHaveBeenCalledTimes(5)
      expect(onChange).toHaveBeenNthCalledWith(
        5,
        expect.objectContaining({ numberValue: 0, value: '000' })
      )

      await userEvent.keyboard('[ArrowRight>2]1')
      expect(input).toHaveValue('10')
      expect(onChange).toHaveBeenCalledTimes(6)
      expect(onChange).toHaveBeenNthCalledWith(
        6,
        expect.objectContaining({ numberValue: 10, value: '10' })
      )
    })

    it('should not set leading zero when entering decimal separator', () => {
      const onKeyDown = jest.fn()
      const preventDefault = jest.fn()

      const { rerender } = render(
        <InputMasked
          numberMask={{
            suffix: ' kr',
            allowDecimal: true,
          }}
          onKeyDown={onKeyDown}
        />
      )

      const keyCode = 188 // comma
      fireEvent.keyDown(document.querySelector('input'), {
        keyCode,
        target: {
          value: '',
        },
        preventDefault,
      })
      expect(preventDefault).toHaveBeenCalledTimes(0)
      expect(onKeyDown).toHaveBeenCalledTimes(1)

      rerender(
        <InputMasked
          numberMask={{
            disallowLeadingZeroes: true,
          }}
          onKeyDown={onKeyDown}
        />
      )

      fireEvent.keyDown(document.querySelector('input'), {
        key: '0',
        keyCode: 48, // zero
        target: {
          value: '0 kr',
        },
        preventDefault,
      })

      expect(onKeyDown).toHaveBeenCalledTimes(2)
      expect(onKeyDown.mock.calls[1][0].value).toBe('0 kr')
    })
  })
})

describe('InputMasked component with currencyMask', () => {
  it('should accept only a string', () => {
    render(<InputMasked {...props} value="1234" currencyMask="NOK" />)

    expect(document.querySelector('input').value).toBe('1 234 NOK')
  })

  it('should accept the currency inside a object property', () => {
    render(
      <InputMasked
        {...props}
        value="1234"
        currencyMask={{
          currency: 'NOK',
        }}
      />
    )

    expect(document.querySelector('input').value).toBe('1 234 NOK')
  })

  it('should not show mask if placeholder is set', () => {
    const placeholderText = 'Placeholder-text'

    render(
      <InputMasked placeholder={placeholderText} currencyMask="NOK" />
    )

    const elem = document.querySelector('.dnb-input')
    const inputElem = elem.querySelector('input')
    const placeholderElem = elem.querySelector('.dnb-input__placeholder')

    expect(inputElem.value).toBe('')
    expect(inputElem.getAttribute('aria-placeholder')).toBe(
      placeholderText
    )
    expect(placeholderElem.textContent).toBe(placeholderText)

    expect(placeholderElem.getAttribute('role')).toBe('presentation')
    expect(placeholderElem.getAttribute('aria-hidden')).toBe('true')

    fireEvent.change(inputElem, { target: { value: '20,02' } })

    expect(inputElem.value).toBe('20,02 NOK')
    expect(inputElem.getAttribute('aria-placeholder')).toBe(
      placeholderText
    )

    expect(
      document.querySelector('.dnb-input__placeholder')
    ).not.toBeInTheDocument()
  })

  it('should change data-input-state based on focus state', () => {
    render(<InputMasked />)

    const elem = document.querySelector('.dnb-input')
    const inputElem = elem.querySelector('input')

    expect(elem.getAttribute('data-input-state')).toBe('virgin')

    fireEvent.focus(inputElem)

    expect(elem.getAttribute('data-input-state')).toBe('focus')

    fireEvent.blur(inputElem)

    expect(elem.getAttribute('data-input-state')).toBe('initial')
  })

  it('should handle zero after decimal', () => {
    const Input = () => {
      const [value, setValue] = React.useState('20.0')
      return (
        <InputMasked
          value={value}
          currencyMask
          onChange={({ numberValue }) => {
            setValue(numberValue)
          }}
        />
      )
    }
    render(<Input />)

    expect(document.querySelector('input').value).toBe('20,0 kr')

    fireEvent.change(document.querySelector('input'), {
      target: { value: '20,02' },
    })

    expect(document.querySelector('input').value).toBe('20,02 kr')

    fireEvent.change(document.querySelector('input'), {
      target: { value: '20,0' },
    })

    expect(document.querySelector('input').value).toBe('20,0 kr')
  })

  it('can change value to be empty', () => {
    const BasicMask = () => {
      const [floatval, setState] = React.useState(123)

      return (
        <InputMasked
          {...props}
          value={floatval}
          currencyMask="NOK"
          onChange={({ numberValue }) => {
            setState(numberValue)
          }}
        />
      )
    }

    render(<BasicMask />)

    expect(document.querySelector('input').value).toBe('123 NOK')

    fireEvent.change(document.querySelector('input'), {
      target: { value: '1234' },
    })

    expect(document.querySelector('input').value).toBe('1 234 NOK')

    fireEvent.change(document.querySelector('input'), {
      target: { value: '' },
    })

    fireEvent.keyDown(document.querySelector('input'), {
      keyCode: 8,
    })

    expect(document.querySelector('input').value).toBe('')
  })

  it('should set correct integerLimit', () => {
    render(
      <InputMasked
        value={12345678.912345}
        currencyMask={{ integerLimit: 4 }}
      />
    )

    expect(document.querySelector('input').value).toBe('1 234,91 kr')
  })
})

describe('InputMasked component asPercent', () => {
  it('should create a "numberMask" with a % suffix', () => {
    const { rerender } = render(
      <InputMasked value="12345.678" asPercent />
    )

    expect(document.querySelector('input').value).toBe('12 345 %')

    rerender(<InputMasked value="12345.123" asPercent />)

    expect(document.querySelector('input').value).toBe('12 345 %')
  })

  it('should merge "numberMask" properties', () => {
    render(
      <InputMasked
        value="12345.678"
        asPercent
        numberMask={{ decimalLimit: 1 }}
      />
    )

    expect(document.querySelector('input').value).toBe('12 345,6 %')
  })

  it('should react to locale change', () => {
    const { rerender } = render(
      <InputMasked
        asPercent
        numberMask={{ allowDecimal: true, decimalLimit: 3 }}
        value="12345.678"
        locale="en-GB"
      />
    )

    expect(document.querySelector('input').value).toBe('12,345.678%')

    rerender(
      <InputMasked
        asPercent
        numberMask={{ allowDecimal: true, decimalLimit: 3 }}
        value="12345.678"
        locale="nb-NO"
      />
    )

    expect(document.querySelector('input').value).toBe('12 345,678 %')
  })
})

describe('InputMasked component without any properties', () => {
  it('defaults to number mask', () => {
    const newValue = '1'

    render(<InputMasked />)

    expect(document.querySelector('input').value).toBe('')

    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
    })

    expect(document.querySelector('input').value).toBe(newValue)
  })
})

describe('InputMasked component asNumber', () => {
  it('should create a "numberMask" accordingly the defined properties', () => {
    const { rerender } = render(<InputMasked value="12345.678" asNumber />)

    expect(document.querySelector('input').value).toBe('12 345')

    rerender(<InputMasked value="12345.123" asNumber />)

    expect(document.querySelector('input').value).toBe('12 345')
  })

  it('should merge "numberMask" properties', () => {
    render(
      <InputMasked
        value="12345.678"
        asNumber
        numberMask={{ decimalLimit: 1 }}
      />
    )

    expect(document.querySelector('input').value).toBe('12 345,6')
  })

  it('will not overwrite decimalSymbol when undefined was given', () => {
    const { rerender } = render(
      <InputMasked
        value={12345.678}
        asNumber
        numberMask={{
          thousandsSeparatorSymbol: '|',
          decimalSymbol: ':',
          allowDecimal: true,
        }}
      />
    )

    expect(document.querySelector('input').value).toBe('12|345:67')

    rerender(
      <InputMasked
        value={12345.678}
        asNumber
        numberMask={{
          thousandsSeparatorSymbol: undefined,
          decimalSymbol: undefined,
          allowDecimal: true,
        }}
      />
    )

    expect(document.querySelector('input').value).toBe('12 345,67')
  })

  it('should merge "maskOptions" properties', () => {
    render(
      <InputMasked
        value="12345.678"
        asNumber
        maskOptions={{ decimalLimit: 1 }}
      />
    )

    expect(document.querySelector('input').value).toBe('12 345,6')
  })

  it('event "onChange" gets emitted with correct value', async () => {
    const newValue = 'NOK 123456789,678 kr'

    const onChange = jest.fn()

    render(
      <InputMasked
        value="12345.678"
        asNumber
        maskOptions={{ decimalLimit: 1 }}
        onChange={onChange}
      />
    )

    expect(document.querySelector('input').value).toBe('12 345,6')

    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
    })

    expect(document.querySelector('input').value).toBe('123 456 789,6')

    expect(
      onChange.mock.calls[onChange.mock.calls.length - 1][0].value
    ).toBe('123 456 789,6')
    expect(
      onChange.mock.calls[onChange.mock.calls.length - 1][0].numberValue
    ).toBe(123456789.6)
  })

  it('should append a comma when entering a dot', () => {
    render(<InputMasked asNumber maskOptions={{ allowDecimal: true }} />)

    const setSelectionRange = jest.fn()

    const elem = document.querySelector('input')

    const pressDotAndUseItAsComma = ({ value }) => {
      const keyCode = 190 // dot
      fireEvent.keyDown(document.querySelector('input'), {
        keyCode,
        target: {
          value,
          selectionStart: 6,
          setSelectionRange,
        },
      })
    }

    pressDotAndUseItAsComma({ value: '12 345' })

    expect(elem.value).toBe('12 345,')

    // try a second time from the same cursor position
    pressDotAndUseItAsComma({ value: '12 345,' })

    expect(elem.value).toBe('12 345,')
    expect(setSelectionRange).toHaveBeenCalledTimes(1)
    expect(setSelectionRange).toHaveBeenCalledWith(7, 7)
  })

  it('should prevent a comma when decimalLimit=0', () => {
    render(<InputMasked asNumber maskOptions={{ decimalLimit: 0 }} />)

    const preventDefault = jest.fn()
    const event = { preventDefault }

    const newValue = '12 345'

    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
      ...event,
    })

    const pressDotAndUseItAsComma = () => {
      const keyCode = 188 // comma
      fireEvent.keyDown(document.querySelector('input'), {
        keyCode,
        ...event,
      })
    }

    pressDotAndUseItAsComma()
    pressDotAndUseItAsComma() // try a second time

    expect(document.querySelector('input').value).toBe('12 345')
  })

  it('should prevent a comma by default', () => {
    render(<InputMasked asNumber />)

    const preventDefault = jest.fn()
    const event = { preventDefault }

    const newValue = '12 345'
    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
    })

    const pressDotAndUseItAsComma = () => {
      const keyCode = 188 // comma
      fireEvent.keyDown(document.querySelector('input'), {
        keyCode,
        ...event,
      })
    }

    pressDotAndUseItAsComma()
    pressDotAndUseItAsComma() // try a second time

    expect(document.querySelector('input').value).toBe('12 345')
  })

  it('should react to locale change', () => {
    const { rerender } = render(
      <InputMasked
        asNumber
        maskOptions={{ allowDecimal: true, decimalLimit: 3 }}
        value="12345.678"
        locale="en-GB"
      />
    )

    expect(document.querySelector('input').value).toBe('12,345.678')

    rerender(
      <InputMasked
        asNumber
        maskOptions={{ allowDecimal: true, decimalLimit: 3 }}
        value="12345.678"
        locale="nb-NO"
      />
    )

    expect(document.querySelector('input').value).toBe('12 345,678')
  })

  it('should inherit locale from provider', () => {
    const { rerender } = render(
      <Provider locale="en-GB">
        <InputMasked
          asNumber
          maskOptions={{ decimalLimit: 3 }}
          value="12345.678"
        />
      </Provider>
    )

    expect(document.querySelector('input').value).toBe('12,345.678')

    // Change the provider locale
    rerender(
      <Provider locale="nb-NO">
        <InputMasked
          asNumber
          maskOptions={{ decimalLimit: 3 }}
          value="12345.678"
        />
      </Provider>
    )

    expect(document.querySelector('input').value).toBe('12 345,678')
  })

  it('should set correct integerLimit', () => {
    const { rerender } = render(
      <InputMasked
        value={12345678.912345}
        asNumber
        numberMask={{ integerLimit: 4, decimalLimit: 4 }}
        locale="en-GB"
      />
    )

    expect(document.querySelector('input').value).toBe('1,234.9123')

    rerender(
      <InputMasked
        value={12345678.912345}
        asNumber
        numberMask={{ integerLimit: 4, decimalLimit: 4 }}
        locale="nb-NO"
      />
    )

    expect(document.querySelector('input').value).toBe('1 234,9123')
  })
})

describe('InputMasked component asCurrency', () => {
  it('should create a "currencyMask" accordingly the defined properties', () => {
    render(<InputMasked value="12345.678" asCurrency />)

    expect(document.querySelector('input').value).toBe('12 345,67 kr')
  })

  it('should merge "currencyMask" properties', () => {
    render(
      <InputMasked
        value="12345.678"
        asCurrency
        currencyMask={{ decimalLimit: 1 }}
      />
    )

    expect(document.querySelector('input').value).toBe('12 345,6 kr')
  })

  it('should merge "maskOptions" properties', () => {
    render(
      <InputMasked
        value="12345.678"
        asCurrency
        maskOptions={{ decimalLimit: 1 }}
      />
    )

    expect(document.querySelector('input').value).toBe('12 345,6 kr')
  })

  it('should omit decimals when allowDecimal=false', () => {
    render(
      <InputMasked
        value="12345.678"
        asCurrency
        maskOptions={{ allowDecimal: false }}
      />
    )

    expect(document.querySelector('input').value).toBe('12 345 kr')
  })

  it('should set correct integerLimit', () => {
    const { rerender } = render(
      <InputMasked
        value={12345678.9124}
        asCurrency
        currencyMask={{ integerLimit: 4, decimalLimit: 3 }}
        locale="en-GB"
      />
    )

    expect(document.querySelector('input').value).toBe('1,234.912 NOK')

    rerender(
      <InputMasked
        value={12345678.9124}
        asCurrency
        currencyMask={{ integerLimit: 4, decimalLimit: 3 }}
        locale="nb-NO"
      />
    )

    expect(document.querySelector('input').value).toBe('1 234,912 kr')
  })

  it('should set correct integerLimit during typing', () => {
    const onChange = jest.fn()
    const MockComponent = () => {
      const [controlledValue, setControlledValue] =
        React.useState(123456.1234)

      const handleChange = (props) => {
        setControlledValue(props.numberValue)
        onChange(props)
      }

      return (
        <InputMasked
          value={controlledValue}
          asCurrency
          currencyMask={{ integerLimit: 4, decimalLimit: 3 }}
          onChange={handleChange}
        />
      )
    }

    render(<MockComponent />)

    const element = document.querySelector('input')

    expect(element.value).toBe('1 234,123 kr')

    fireEvent.change(element, { target: { value: '123,123' } })

    expect(element.value).toBe('123,123 kr')

    fireEvent.change(element, { target: { value: '1 234,123' } })

    expect(element.value).toBe('1 234,123 kr')
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('event "onChange" gets emitted with correct value', async () => {
    const newValue = 'NOK 123456789,678 kr'

    const onChange = jest.fn()

    const { rerender } = render(
      <InputMasked value="12345.678" asCurrency onChange={onChange} />
    )

    expect(document.querySelector('input').value).toBe('12 345,67 kr')

    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
    })

    expect(document.querySelector('input').value).toBe('123 456 789,67 kr')

    expect(
      onChange.mock.calls[onChange.mock.calls.length - 1][0].value
    ).toBe('123 456 789,67 kr')
    expect(
      onChange.mock.calls[onChange.mock.calls.length - 1][0].numberValue
    ).toBe(123456789.67)

    rerender(
      <InputMasked
        value="12345.678"
        asCurrency
        onChange={onChange}
        maskOptions={{ decimalLimit: 1 }}
      />
    )

    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
    })

    expect(document.querySelector('input').value).toBe('123 456 789,6 kr')

    expect(
      onChange.mock.calls[onChange.mock.calls.length - 1][0].value
    ).toBe('123 456 789,6 kr')
    expect(
      onChange.mock.calls[onChange.mock.calls.length - 1][0].numberValue
    ).toBe(123456789.6)
  })

  it('event "onChange" gets emitted with correct value with en locale', async () => {
    const onChange = jest.fn()

    render(
      <InputMasked
        locale="en"
        value="12345.678"
        asCurrency
        onChange={onChange}
      />
    )

    expect(document.querySelector('input').value).toBe('12,345.67 NOK')

    const newValue = 'NOK 123 456 789.678 kr'
    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
    })

    expect(document.querySelector('input').value).toBe(
      '123,456,789.67 NOK'
    )

    expect(
      onChange.mock.calls[onChange.mock.calls.length - 1][0].value
    ).toBe('123,456,789.67 NOK')
    expect(
      onChange.mock.calls[onChange.mock.calls.length - 1][0].numberValue
    ).toBe(123456789.67)
  })

  it('should use given currency', () => {
    render(<InputMasked value="12345.678" asCurrency="USD" />)

    expect(document.querySelector('input').value).toBe('12 345,67 $')
  })

  it('should have correct decimals', () => {
    const { rerender } = render(
      <InputMasked value="12345.6" asCurrency="NOK" />
    )

    expect(document.querySelector('input').value).toBe('12 345,6 kr')

    rerender(<InputMasked value={12345.7} asCurrency="NOK" />)

    expect(document.querySelector('input').value).toBe('12 345,7 kr')

    rerender(<InputMasked value={12345.01} asCurrency="NOK" />)

    expect(document.querySelector('input').value).toBe('12 345,01 kr')

    rerender(<InputMasked value="12345.016" asCurrency="NOK" />)

    expect(document.querySelector('input').value).toBe('12 345,01 kr')

    rerender(
      <InputMasked value="12345.016" asCurrency="NOK" numberFormat={{}} />
    )

    expect(document.querySelector('input').value).toBe('12 345,02 kr')
  })

  it('should not append a comma when entering a dot', () => {
    render(<InputMasked asCurrency />)

    const preventDefault = jest.fn()
    const event = { preventDefault }

    const newValue = '12 345,67 kr'
    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
    })

    const pressDotAndUseItAsComma = () => {
      const keyCode = 188 // comma
      fireEvent.keyDown(document.querySelector('input'), {
        keyCode,
        ...event,
      })
    }

    pressDotAndUseItAsComma() // try a first time, without success
    pressDotAndUseItAsComma() // try a second time, without success

    expect(document.querySelector('input').value).toBe('12 345,67 kr')
  })

  it('should prevent a comma when decimalLimit=0', () => {
    render(<InputMasked asCurrency currencyMask={{ decimalLimit: 0 }} />)

    const preventDefault = jest.fn()
    const event = { preventDefault }

    const newValue = '12 345'

    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
      ...event,
    })

    const pressDotAndUseItAsComma = () => {
      const keyCode = 188 // comma
      fireEvent.keyDown(document.querySelector('input'), {
        keyCode,
        ...event,
      })
    }

    pressDotAndUseItAsComma()
    pressDotAndUseItAsComma() // try a second time

    expect(document.querySelector('input').value).toBe('12 345 kr')
  })

  it('should inherit currencyMask from provider', () => {
    const { rerender } = render(
      <Provider
        locale="en-GB"
        InputMasked={{
          currencyMask: {
            decimalLimit: 1,
          },
        }}
      >
        <InputMasked asCurrency value="12345.678" />
      </Provider>
    )

    expect(document.querySelector('input').value).toBe('12,345.6 NOK')

    rerender(
      <Provider
        locale="en-GB"
        InputMasked={{
          currencyMask: {
            decimalLimit: 2,
          },
          numberFormat: {},
        }}
      >
        <InputMasked asCurrency value="12345.678" />
      </Provider>
    )

    expect(document.querySelector('input').value).toBe('12,345.68 NOK')
  })

  it('should react to locale change', () => {
    const { rerender } = render(
      <InputMasked asCurrency value="12345.678" locale="en-GB" />
    )

    expect(document.querySelector('input').value).toBe('12,345.67 NOK')

    rerender(<InputMasked asCurrency value="12345.678" locale="nb-NO" />)

    expect(document.querySelector('input').value).toBe('12 345,67 kr')
  })

  it('should inherit locale from provider', () => {
    const { rerender } = render(
      <Provider locale="en-GB">
        <InputMasked asCurrency value="12345.678" />
      </Provider>
    )

    expect(document.querySelector('input').value).toBe('12,345.67 NOK')

    // Change the provider locale
    rerender(
      <Provider locale="nb-NO">
        <InputMasked asCurrency value="12345.678" />
      </Provider>
    )

    expect(document.querySelector('input').value).toBe('12 345,67 kr')
  })

  it('should handle decimal values less than 1', () => {
    const MockComponent = () => {
      const [value, setState] = React.useState(1.5)

      return (
        <>
          <InputMasked
            value={value}
            numberMask={{
              disallowLeadingZeroes: true,
              allowNegative: false,
              allowDecimal: true,
            }}
          />

          <button
            onClick={() => {
              setState(value - 0.4)
            }}
          />
        </>
      )
    }

    render(<MockComponent />)

    const element = document.querySelector('input')
    const button = document.querySelector('button')

    expect(element.value).toBe('1,5')

    fireEvent.click(button) // 1,1
    fireEvent.click(button) // 0,7
    fireEvent.click(button) // 0,3

    expect(element.value).toBe('0,30')
  })

  it('should handle "integerLimit" with minus and less or more integers than set as a limit', () => {
    const MockComponent = () => {
      const [value, setState] = React.useState(-500.555)

      return (
        <>
          <InputMasked
            value={value}
            numberMask={{
              integerLimit: 4,
              decimalLimit: 2,
              allowDecimal: true,
            }}
          />

          <button
            onClick={() => {
              setState(value * 10)
            }}
          />
        </>
      )
    }

    render(<MockComponent />)

    const element = document.querySelector('input')
    const button = document.querySelector('button')

    expect(element.value).toBe('-500,55')

    fireEvent.click(button)

    expect(element.value).toBe('-5 005,55')

    fireEvent.click(button)

    expect(element.value).toBe('-5 005,5')

    fireEvent.click(button)

    expect(element.value).toBe('-5 005')
  })

  it('should handle negative (minus) value updates', () => {
    const MockComponent = () => {
      const [value, setState] = React.useState(-1.5)

      return (
        <>
          <InputMasked
            value={value}
            asNumber
            numberMask={{
              allowDecimal: true,
            }}
          />

          <button
            onClick={() => {
              setState(value + 1)
            }}
          />
        </>
      )
    }

    render(<MockComponent />)

    const element = document.querySelector('input')
    const button = document.querySelector('button')

    expect(element.value).toBe('-1,5')

    fireEvent.click(button)

    expect(element.value).toBe('-0,5')

    fireEvent.click(button)

    expect(element.value).toBe('0,5')
  })

  it('should change both value and locale', () => {
    const { rerender } = render(
      <InputMasked locale="en-GB" asCurrency value="12345.678" />
    )

    expect(document.querySelector('input').value).toBe('12,345.67 NOK')

    // Change the provider locale
    rerender(<InputMasked locale="nb-NO" asCurrency value="12345.678" />)

    expect(document.querySelector('input').value).toBe('12 345,67 kr')

    rerender(<InputMasked locale="nb-NO" asCurrency value="12345.123" />)

    expect(document.querySelector('input').value).toBe('12 345,12 kr')
  })

  it('should support spacing props', () => {
    render(<InputMasked top="2rem" />)

    const element = document.querySelector('.dnb-input')

    expect(Array.from(element.classList)).toEqual([
      'dnb-input',
      'dnb-input__border--tokens',
      'dnb-form-component',
      'dnb-space__top--large',
      'dnb-input-masked',
      'dnb-input--text',
    ])
  })

  it('should inherit formElement vertical label', () => {
    render(
      <Provider formElement={{ labelDirection: 'vertical' }}>
        <InputMasked label="Label" />
      </Provider>
    )

    const element = document.querySelector('.dnb-input')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual([
      'class',
      'data-input-state',
      'data-has-content',
    ])
    expect(Array.from(element.classList)).toEqual([
      'dnb-input',
      'dnb-input__border--tokens',
      'dnb-form-component',
      'dnb-input-masked',
      'dnb-input--text',
      'dnb-input--vertical',
    ])
  })
})

describe('InputMasked with custom mask', () => {
  it('should set correct cursor position on focus', async () => {
    render(
      <InputMasked value={12} mask={[/\d/, /\d/, '–', '–', /\d/, /\d/]} />
    )

    const element = document.querySelector('input')

    const preventDefault = jest.fn()

    fireEvent.focus(element, {
      target: {
        selectionStart: 6,
      },
      preventDefault,
    })

    element.setSelectionRange = jest.fn()

    await waitFor(() => {
      expect(element.setSelectionRange).toHaveBeenCalledTimes(1)
      expect(element.setSelectionRange).toHaveBeenNthCalledWith(1, 4, 4)
    })
  })

  it('should set correct cursor position on mouseDown', async () => {
    render(
      <InputMasked value={12} mask={[/\d/, /\d/, '–', '–', /\d/, /\d/]} />
    )

    const input = document.querySelector('input')

    const preventDefault = jest.fn()

    fireEvent.focus(input)
    fireEvent.mouseDown(input, {
      target: {
        selectionStart: 6,
      },
      preventDefault,
    })

    input.setSelectionRange = jest.fn()

    await waitFor(() => {
      expect(input.setSelectionRange).toHaveBeenCalledTimes(2)
      expect(input.setSelectionRange).toHaveBeenNthCalledWith(2, 4, 4)

      expect(input.value).toBe('12––​​')
    })
  })

  it('should set correct cursor position on mouseUp', async () => {
    render(
      <InputMasked value={12} mask={[/\d/, /\d/, '–', '–', /\d/, /\d/]} />
    )

    const input = document.querySelector('input')

    const preventDefault = jest.fn()

    fireEvent.focus(input)
    fireEvent.mouseUp(input, {
      target: {
        selectionStart: 6,
      },
      preventDefault,
    })

    input.setSelectionRange = jest.fn()

    await waitFor(() => {
      expect(input.setSelectionRange).toHaveBeenCalledTimes(2)
      expect(input.setSelectionRange).toHaveBeenNthCalledWith(2, 4, 4)

      expect(input.value).toBe('12––​​')
    })
  })

  it('should set target.runCorrectCaretPosition on focus event', () => {
    render(
      <InputMasked value={12} mask={[/\d/, /\d/, '–', '–', /\d/, /\d/]} />
    )

    const input = document.querySelector('input')

    expect(input['runCorrectCaretPosition']).toBeType('undefined')

    fireEvent.focus(input)

    expect(input['runCorrectCaretPosition']).toBeType('function')
  })

  it('should set correct cursor position when navigating using keyboard', async () => {
    render(<InputMasked value="1" mask={[/\d/, ' ', /\d/]} />)

    const input = document.querySelector('input')

    {
      expect(document.body).toHaveFocus()

      await userEvent.tab()

      expect(input).toHaveFocus()
      expect(input).toHaveValue('1 ​')

      await userEvent.keyboard('{ArrowRight}2') // Remove selection

      expect(input).toHaveValue('1 2')
    }
  })

  it('should show placeholder chars when showMask is true', () => {
    render(
      <InputMasked
        showMask
        placeholderChar="_"
        mask={[
          '0',
          '0',
          /[4]/, // have to start with 4
          /[5-7]/, // can be 5,6 or 7
          ' ',
          /[49]/, // have to start with 4 or 9
          /\d/,
          ' ',
          /\d/,
          /\d/,
          ' ',
          /\d/,
          /\d/,
          ' ',
          /\d/,
          /\d/,
        ]}
      />
    )

    expect(document.querySelector('input').value).toBe('00__ __ __ __ __')
  })

  it('should handle leading zeros gracefully', async () => {
    const onChange = jest.fn()

    render(
      <InputMasked
        mask={[/\d/, ' ', /\d/, ' ', /\d/, ',', /\d/, /\d/]}
        onChange={onChange}
      />
    )

    const input = document.querySelector('input')

    {
      await userEvent.type(input, '123,56')
      const last = onChange.mock.calls.length - 1
      expect(onChange.mock.calls[last][0].value).toBe('1 2 3,56')
      expect(onChange.mock.calls[last][0].cleanedValue).toBe('123.56')
      expect(onChange.mock.calls[last][0].numberValue).toBe(123.56)
    }

    {
      await userEvent.type(
        input,
        '{backspace}{backspace}{backspace}{backspace}'
      )
      const last = onChange.mock.calls.length - 1
      expect(onChange.mock.calls[last][0].value).toBe('1 ​ ​,​​')
      expect(onChange.mock.calls[last][0].cleanedValue).toBe('1.')
      expect(onChange.mock.calls[last][0].numberValue).toBe(1)
    }

    {
      await userEvent.type(
        input,
        '{backspace}{backspace}{backspace}{backspace}{backspace}'
      )
      const last = onChange.mock.calls.length - 1
      expect(onChange.mock.calls[last][0].value).toBe('')
      expect(onChange.mock.calls[last][0].cleanedValue).toBe('')
      expect(onChange.mock.calls[last][0].numberValue).toBe(0)
    }

    {
      await userEvent.type(input, '0')
      const last = onChange.mock.calls.length - 1
      expect(onChange.mock.calls[last][0].value).toBe('0 ​ ​,​​')
      expect(onChange.mock.calls[last][0].cleanedValue).toBe('0.')
      expect(onChange.mock.calls[last][0].numberValue).toBe(0)
    }

    {
      await userEvent.clear(input)
      await userEvent.type(input, '00000')
      const last = onChange.mock.calls.length - 1
      expect(onChange.mock.calls[last][0].value).toBe('0 0 0,00')
      expect(onChange.mock.calls[last][0].cleanedValue).toBe('000.00')
      expect(onChange.mock.calls[last][0].numberValue).toBe(0)
    }

    {
      await userEvent.clear(input)
      await userEvent.type(input, '000')
      const last = onChange.mock.calls.length - 1
      expect(onChange.mock.calls[last][0].value).toBe('0 0 0,​​')
      expect(onChange.mock.calls[last][0].cleanedValue).toBe('000.')
      expect(onChange.mock.calls[last][0].numberValue).toBe(0)
    }

    {
      await userEvent.clear(input)
      await userEvent.type(input, '045,67')
      const last = onChange.mock.calls.length - 1
      expect(onChange.mock.calls[last][0].value).toBe('0 4 5,67')
      expect(onChange.mock.calls[last][0].cleanedValue).toBe('045.67')
      expect(onChange.mock.calls[last][0].numberValue).toBe(45.67)
    }

    {
      await userEvent.clear(input)
      await userEvent.type(input, 'abc')
      const last = onChange.mock.calls.length - 1
      expect(onChange.mock.calls[last][0].value).toBe('')
      expect(onChange.mock.calls[last][0].cleanedValue).toBe('')
      expect(onChange.mock.calls[last][0].numberValue).toBe(0)
    }

    expect(onChange).toHaveBeenCalledTimes(34)

    await userEvent.clear(input)
  })
})

describe('inputmode', () => {
  it('should be undefined with no props', () => {
    render(<InputMasked />)

    expect(
      document.querySelector('input').hasAttribute('inputmode')
    ).toBeFalsy()
  })

  it('should be numeric with a numberMask', () => {
    const onKeyDown = jest.fn()

    render(<InputMasked {...props} numberMask onKeyDown={onKeyDown} />)

    expect(document.querySelector('input')).toHaveAttribute(
      'inputmode',
      'numeric'
    )
  })

  it('should be decimal with a currencyMask', () => {
    const onKeyDown = jest.fn()

    render(<InputMasked {...props} currencyMask onKeyDown={onKeyDown} />)

    expect(document.querySelector('input')).toHaveAttribute(
      'inputmode',
      'decimal'
    )
  })

  it('should be numeric with asPercent', () => {
    const onKeyDown = jest.fn()

    render(<InputMasked {...props} asPercent onKeyDown={onKeyDown} />)

    expect(document.querySelector('input')).toHaveAttribute(
      'inputmode',
      'numeric'
    )
  })

  it('should use numeric with no decimal and no negative/minus', () => {
    const onKeyDown = jest.fn()

    render(
      <InputMasked
        numberMask
        onKeyDown={onKeyDown}
        maskOptions={{ allowNegative: false }}
      />
    )

    expect(document.querySelector('input')).toHaveAttribute(
      'inputmode',
      'numeric'
    )
  })

  it('should use decimal with allowDecimal and no allowNegative', () => {
    const onKeyDown = jest.fn()

    render(
      <InputMasked
        numberMask
        onKeyDown={onKeyDown}
        maskOptions={{ allowDecimal: true, allowNegative: false }}
      />
    )

    expect(document.querySelector('input')).toHaveAttribute(
      'inputmode',
      'decimal'
    )
  })

  it('should use decimal with allowDecimal and allowNegative', () => {
    const onKeyDown = jest.fn()

    render(
      <InputMasked
        numberMask
        onKeyDown={onKeyDown}
        maskOptions={{ allowDecimal: true, allowNegative: true }}
      />
    )

    expect(document.querySelector('input')).toHaveAttribute(
      'inputmode',
      'decimal'
    )
  })

  it('should set custom inputMode', () => {
    const onKeyDown = jest.fn()

    render(
      <InputMasked
        numberMask
        onKeyDown={onKeyDown}
        maskOptions={{ allowDecimal: true, allowNegative: true }}
        inputMode="tel"
      />
    )

    expect(document.querySelector('input')).toHaveAttribute(
      'inputmode',
      'tel'
    )
  })

  it('on iOS should remove "inputmode" when allowNegative is set', () => {
    Object.defineProperty(helpers, 'IS_IOS', {
      value: true,
    })

    const onKeyDown = jest.fn()
    const preventDefault = jest.fn()

    render(
      <InputMasked
        value={1234.5}
        numberMask
        onKeyDown={onKeyDown}
        maskOptions={{ allowNegative: true }}
      />
    )

    expect(document.querySelector('input')).not.toHaveAttribute(
      'inputmode'
    )
    expect(document.querySelector('input').getAttribute('type')).toBe(
      'text'
    )

    Object.defineProperty(helpers, 'IS_IOS', {
      value: false,
    })

    fireEvent.keyDown(document.querySelector('input'), {
      key: ',',
      keyCode: 229, // unidentified, while 188 would have worked fine
      target: {
        value: '1234.5',
      },
      preventDefault,
    })

    expect(onKeyDown).toHaveBeenCalledTimes(1)
    expect(preventDefault).toHaveBeenCalledTimes(0)
    expect(document.querySelector('input').value).toBe('1234.5')
  })

  it('should set type of number on focus when device is iOS (InputModeNumber)', async () => {
    Object.defineProperty(helpers, 'IS_IOS', {
      value: true,
    })

    render(<InputMasked value={1234.5} currencyMask />)

    const inputElement = document.querySelector('input')

    expect(inputElement.selectionStart).toBe(10)
    expect(inputElement.selectionEnd).toBe(10)

    fireEvent.mouseEnter(inputElement)

    expect(inputElement).toHaveAttribute('type', 'number')
    expect(inputElement).toHaveAttribute('placeholder', '1 234,5 kr')
    expect(inputElement.value).toBe('')
    expect(inputElement.selectionStart).toBe(null)
    expect(inputElement.selectionEnd).toBe(null)

    await waitFor(() => {
      expect(inputElement).toHaveAttribute('type', 'text')
      expect(inputElement.value).toBe('1 234,5 kr')
    })

    expect(inputElement).toHaveAttribute('type', 'text')
    expect(inputElement).toHaveAttribute('placeholder', '')
    expect(inputElement.value).toBe('1 234,5 kr')
    expect(inputElement.selectionStart).toBe(10)
    expect(inputElement.selectionEnd).toBe(10)

    await userEvent.type(inputElement, '{Backspace>7}')
    fireEvent.blur(inputElement)

    fireEvent.mouseEnter(inputElement)

    expect(inputElement).toHaveAttribute('type', 'number')

    await waitFor(() => {
      expect(inputElement).toHaveAttribute('type', 'text')
      expect(inputElement.value).toBe('')
    })

    Object.defineProperty(helpers, 'IS_IOS', {
      value: false,
    })
  })

  it('should set type of number on label press when device is iOS (InputModeNumber)', async () => {
    Object.defineProperty(helpers, 'IS_IOS', {
      value: true,
    })

    render(<InputMasked label="Label" value={1234.5} currencyMask />)

    const inputElement = document.querySelector('input')
    const labelElement = document.querySelector('label')

    fireEvent.mouseDown(labelElement)

    expect(inputElement).toHaveAttribute('type', 'number')

    await waitFor(() => {
      expect(inputElement).toHaveAttribute('type', 'text')
    })

    expect(inputElement).toHaveAttribute('type', 'text')

    await userEvent.type(inputElement, '{Backspace>7}')
    fireEvent.blur(inputElement)

    fireEvent.mouseDown(labelElement)

    expect(inputElement).toHaveAttribute('type', 'number')

    await waitFor(() => {
      expect(inputElement).toHaveAttribute('type', 'text')
    })

    Object.defineProperty(helpers, 'IS_IOS', {
      value: false,
    })
  })

  it('should not set type of number on iOS, when inputMode is given (InputModeNumber)', async () => {
    Object.defineProperty(helpers, 'IS_IOS', {
      value: true,
    })

    render(<InputMasked value={1234.5} currencyMask inputMode="numeric" />)

    const inputElement = document.querySelector('input')

    expect(inputElement.selectionStart).toBe(10)
    expect(inputElement.selectionEnd).toBe(10)

    fireEvent.mouseEnter(inputElement)

    expect(inputElement).toHaveAttribute('inputmode', 'numeric')
    expect(inputElement).toHaveAttribute('type', 'text')

    await waitFor(() => {
      expect(inputElement).toHaveAttribute('type', 'text')
    })

    Object.defineProperty(helpers, 'IS_IOS', {
      value: false,
    })
  })

  it('should not set type of number on focus when device is not iOS', () => {
    render(<InputMasked value={1234.5} currencyMask />)

    const inputElement = document.querySelector('input')

    fireEvent.mouseEnter(inputElement)

    expect(inputElement).toHaveAttribute('type', 'text')
  })
})

describe('controlled', () => {
  it('should correctly update with new value from outside', async () => {
    const MockComponent = (props) => {
      const [value, setValue] = React.useState('')
      return (
        <>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
          <InputMasked
            asNumber
            value={value}
            numberMask={{ decimalLimit: 2 }}
            {...props}
          />
        </>
      )
    }

    const { rerender } = render(<MockComponent locale="en-GB" />)

    const [nativeInput, inputMasked] = Array.from(
      document.querySelectorAll('input')
    )

    expect(inputMasked).toHaveValue('')

    await userEvent.type(nativeInput, '1.00')

    expect(nativeInput).toHaveValue('1.00')
    expect(inputMasked).toHaveValue('1.00')

    rerender(<MockComponent locale="nb-NO" />)

    await userEvent.type(nativeInput, '{Backspace>4}1.00')
    expect(nativeInput).toHaveValue('1.00')
    expect(inputMasked).toHaveValue('1,00')

    await userEvent.type(nativeInput, '{Backspace>4}1,00')
    expect(nativeInput).toHaveValue('1,00')
    expect(inputMasked).toHaveValue('1,00')
  })
})

describe('InputMasked scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })
})
