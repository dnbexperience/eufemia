/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  toJson,
  axeComponent,
  loadScss,
} from '../../../core/jest/jestSetup'
import { fireEvent, render } from '@testing-library/react'
import Component from '../Input'
import { format } from '../../number-format/NumberUtils'
import FormRow from '../../form-row/FormRow'

const props = {
  ...fakeProps(require.resolve('../Input'), {
    all: true,
    optional: true,
  }),
  input_element: null,
  disabled: false,
}
props.id = 'input'
props.autocomplete = 'off'
props.label = null
props.submit_button_variant = 'secondary'
props.status = null // to make sure we don't get aria-details
props.suffix = null // to make sure we don't get aria-details
props.type = 'text'

const log = global.console.log
afterEach(() => {
  global.console.log = log
})

describe('Input component', () => {
  // compare the snapshot
  it('have to match type="text" snapshot', () => {
    const Comp = mount(<Component {...props} value="test" />)
    expect(toJson(Comp)).toMatchSnapshot()
  })
  it('have to match type="search" snapshot', () => {
    const Comp = mount(<Component {...props} type="search" value="test" />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has correct state after "focus" trigger', () => {
    render(
      <Component {...props} value={null}>
        {null}
      </Component>
    )

    fireEvent.focus(document.querySelector('input'))

    expect(
      document.querySelector('.dnb-input').getAttribute('data-input-state')
    ).toBe('focus')
  })

  it('has correct state after "change" trigger', () => {
    render(
      <Component {...props} value={null}>
        {null}
      </Component>
    )

    expect(
      document.querySelector('.dnb-input').getAttribute('data-has-content')
    ).toBe('false')

    const newValue = 'new value'
    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
    })

    expect(
      document.querySelector('.dnb-input').getAttribute('data-has-content')
    ).toBe('true')

    expect(document.querySelector('input').getAttribute('value')).toBe(
      newValue
    )
  })

  it('value should be controllable from outside', () => {
    const initialValue = '1234'
    const Controlled = () => {
      const [value, setValue] = React.useState(initialValue)
      return (
        <Component
          value={String(format(value))}
          on_change={({ value }) => {
            setValue(value)
          }}
        />
      )
    }

    render(<Controlled />)

    expect(document.querySelector('input').getAttribute('value')).toBe(
      format(initialValue)
    )

    const newValue = '12345678'
    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
    })

    expect(document.querySelector('input').getAttribute('value')).toBe(
      format(newValue)
    )
  })

  it('value can be manipulated during on_change', () => {
    render(
      <Component
        on_change={({ value }) => {
          return String(value).toUpperCase()
        }}
      />
    )

    const newValue = 'new value'
    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
    })

    expect(document.querySelector('input').getAttribute('value')).toBe(
      'NEW VALUE'
    )
  })

  it('value will not change when returning false on_change', () => {
    render(
      <Component
        on_change={() => {
          return false
        }}
      />
    )

    const newValue = 'new value'
    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
    })

    expect(document.querySelector('input').getAttribute('value')).toBe('')
  })

  it('events gets emmited correctly: "on_change" and "onKeyDown"', () => {
    const initValue = 'init value'
    const newValue = 'new value'
    const emptyValue = null // gets emitted also on values as null

    const on_change = jest.fn()
    const onKeyDown = jest.fn() // additional native event test

    render(
      <Component
        {...props}
        value={initValue}
        on_change={on_change}
        onKeyDown={onKeyDown} // additional native event test
      />
    )

    expect(document.querySelector('input').value).toBe(initValue)

    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
    })
    expect(on_change.mock.calls.length).toBe(1)
    expect(document.querySelector('input').value).toBe(newValue)

    fireEvent.change(document.querySelector('input'), {
      target: { value: emptyValue },
    })
    expect(on_change.mock.calls.length).toBe(2)
    expect(document.querySelector('input').value).toBe('')

    // additional native event test
    fireEvent.keyDown(document.querySelector('input'), {
      key: 'Space',
      keyCode: 84, //space
    })
    expect(onKeyDown.mock.calls.length).toBe(1)
  })

  // make sure getDerivedStateFromProps works
  it('has correct state after changing "value" prop (set by getDerivedStateFromProps)', () => {
    const { rerender } = render(
      <Component {...props} value={null}>
        {null}
      </Component>
    )

    const initValue = 'new prop value'
    const emptyValue = null

    rerender(
      <Component {...props} value={initValue}>
        {null}
      </Component>
    )
    expect(document.querySelector('input').value).toBe(initValue)

    rerender(
      <Component {...props} value={emptyValue}>
        {null}
      </Component>
    )
    expect(document.querySelector('input').value).toBe('')
  })

  it('has correct state after setting "value" prop using placeholder (set by getDerivedStateFromProps)', () => {
    const { rerender } = render(<Component placeholder="Placeholder" />)

    const newValue = 'new value'
    const emptyValue = null
    const zeroValue = 0

    rerender(<Component placeholder="Placeholder" value={newValue} />)
    expect(document.querySelector('input').value).toBe(newValue)

    rerender(<Component placeholder="Placeholder" value={emptyValue} />)
    expect(document.querySelector('input').value).toBe('')

    rerender(<Component placeholder="Placeholder" value={zeroValue} />)
    expect(document.querySelector('input').getAttribute('value')).toBe(
      String(zeroValue)
    )
  })

  it('uses aria-placeholder and label for when placeholder is set', async () => {
    const { rerender } = render(
      <Component
        id="unique"
        placeholder="Placeholder-text"
        label="Label-text"
      />
    )

    expect(document.querySelector('label').getAttribute('for')).toContain(
      'unique'
    )
    expect(
      document.querySelector('input').getAttribute('aria-placeholder')
    ).toContain('Placeholder-text')

    rerender(
      <Component
        id="unique"
        placeholder="Placeholder-text"
        label={undefined}
      />
    )

    expect(document.querySelector('label')).toBeFalsy()
    expect(
      document.querySelector('input').getAttribute('aria-placeholder')
    ).toContain('Placeholder-text')
    expect(
      document.querySelector('input').hasAttribute('aria-labelledby')
    ).toBe(false)

    rerender(
      <Component id="unique" placeholder={undefined} label={undefined} />
    )

    expect(document.querySelector('label')).toBeFalsy()
    expect(
      document.querySelector('input').hasAttribute('aria-placeholder')
    ).toBe(false)
    expect(
      document.querySelector('input').hasAttribute('aria-labelledby')
    ).toBe(false)
  })

  it('has correct medium input size', () => {
    render(<Component size="medium" />)
    expect(document.querySelector('.dnb-input--medium')).toBeTruthy()
  })

  it('will select the whole input when selectall is set', async () => {
    render(<Component selectall={true} value="1234" />)

    const select = jest.fn()
    document.querySelector('input').select = select

    fireEvent.focus(document.querySelector('input'))

    expect(select).toBeCalledTimes(0)

    await wait(1)

    expect(select).toBeCalledTimes(1)
  })

  it('uses children as the value', () => {
    render(<Component>children</Component>)
    expect(document.querySelector('input').getAttribute('value')).toBe(
      'children'
    )
  })

  it('has correct size attribute (chars length) on input by int number', () => {
    render(<Component size={2} />)
    expect(document.querySelector('input').getAttribute('size')).toBe('2')
  })

  it('has correct size attribute (chars length) on input by using input_attributes', () => {
    render(<Component input_attributes={{ size: 2 }} />)
    expect(document.querySelector('input').getAttribute('size')).toBe('2')
  })

  it('has correct size attribute (chars length) on input by using input_attributes and a JSON object', () => {
    render(<Component input_attributes='{"size": "2"}' />)
    expect(document.querySelector('input').getAttribute('size')).toBe('2')
  })

  it('has to to have a prop value like value', () => {
    const { rerender } = render(
      <Component {...props} value={null}>
        {null}
      </Component>
    )

    const value = 'new value'
    rerender(
      <Component {...props} value={value}>
        {null}
      </Component>
    )
    expect(document.querySelector('input').value).toBe(value)
  })

  it('has to to have a label value as defined in the prop', () => {
    render(<Component {...props} label="label" />)
    expect(document.querySelector('label').textContent).toBe('label')
  })

  it('has to to have a status value as defined in the prop', () => {
    render(<Component {...props} status="status" status_state="error" />)
    expect(
      document.querySelector('.dnb-form-status__text').textContent
    ).toBe('status')
  })

  it('shows form-status with correct classes', () => {
    render(
      <Component
        value="value"
        status="status text"
        status_state="warn"
        status_props={{ stretch: true }}
      />
    )

    expect(
      Array.from(document.querySelector('.dnb-form-status').classList)
    ).toEqual([
      'dnb-form-status',
      'dnb-form-status--warn',
      'dnb-form-status__size--default',
      'dnb-form-status--stretch',
      'dnb-form-status--has-content',
    ])
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const { rerender } = render(<Component />)
    rerender(<Component disabled={true} />)
    expect(document.querySelector('input').hasAttribute('disabled')).toBe(
      true
    )
  })

  it('has a submit button on prop type="search"', () => {
    render(
      <Component
        {...props}
        type="search"
        value={null}
        aria-describedby="id"
      >
        {null}
      </Component>
    )

    expect(
      document
        .querySelector('.dnb-input__input')
        .getAttribute('aria-describedby')
    ).toBe('id input-submit-button')

    const Button = document.querySelector('button')
    expect(Button).toBeTruthy()

    fireEvent.focus(Button)
    expect(
      document
        .querySelector('.dnb-input__submit-button')
        .getAttribute('data-input-state')
    ).toBe('focus')
  })

  it('should call on_submit event handler', () => {
    const on_submit = jest.fn()
    render(
      <Component
        id="input-id"
        value="value"
        type="search"
        on_submit={on_submit}
      />
    )

    expect(document.querySelector('input').getAttribute('value')).toBe(
      'value'
    )

    fireEvent.keyDown(document.querySelector('input'), {
      key: 'Enter',
      keyCode: 13, // enter
    })
    expect(on_submit).toHaveBeenCalledTimes(1)
    expect(on_submit.mock.calls[0][0].value).toBe('value')
  })

  it('should validate with ARIA rules as a search input with a label', async () => {
    const LabelComp = mount(<label htmlFor="input">text</label>)
    const InputComp = mount(
      <Component
        {...props}
        id="input"
        type="search"
        autocomplete="off"
        value="some value"
      />
    )
    expect(await axeComponent(LabelComp, InputComp)).toHaveNoViolations()
  })

  it('should validate with ARIA rules as a input with a label', async () => {
    const LabelComp = mount(<label htmlFor="input">text</label>)
    const InputComp = mount(
      <Component {...props} id="input" value="some value" />
    )
    expect(await axeComponent(LabelComp, InputComp)).toHaveNoViolations()
  })
})

describe('Input with clear button', () => {
  it('should have the button', () => {
    render(<Component clear={true} />)
    expect(document.querySelector('.dnb-input--clear')).toBeTruthy()
  })

  it('should clear the value on press', () => {
    render(<Component id="input-id" clear={true} value="value" />)

    expect(document.querySelector('input').getAttribute('value')).toBe(
      'value'
    )

    const clearButton = document.querySelector(
      'button#input-id-clear-button'
    )
    fireEvent.click(clearButton)

    expect(document.querySelector('input').getAttribute('value')).toBe('')
  })

  it('should have a disabled clear button when no value is given', () => {
    render(<Component id="input-id" clear={true} value="value" />)

    expect(document.querySelector('input').getAttribute('value')).toBe(
      'value'
    )

    const clearButton = document.querySelector(
      'button#input-id-clear-button'
    )
    fireEvent.click(clearButton)

    expect(document.querySelector('input').getAttribute('value')).toBe('')
    expect(clearButton.getAttribute('aria-hidden')).toBe('true')
    expect(clearButton.hasAttribute('disabled')).toBe(true)
  })

  it('should have a disabled clear button when initially empty value is given', () => {
    render(<Component id="input-id" clear={true} />)

    expect(document.querySelector('input').getAttribute('value')).toBe('')

    const clearButton = document.querySelector(
      'button#input-id-clear-button'
    )

    expect(document.querySelector('input').getAttribute('value')).toBe('')
    expect(clearButton.getAttribute('aria-hidden')).toBe('true')
    expect(clearButton.hasAttribute('disabled')).toBe(true)
  })

  it('should clear the value on escape key press', () => {
    render(<Component clear={true} value="value" />)

    expect(document.querySelector('input').getAttribute('value')).toBe(
      'value'
    )

    fireEvent.keyDown(document.querySelector('input'), {
      key: 'Escape',
      keyCode: 27, // escape
    })

    expect(document.querySelector('input').getAttribute('value')).toBe('')
  })

  it('should set focus on input when clear button is pressed', () => {
    render(<Component id="input-id" clear={true} value="value" />)

    const clearButton = document.querySelector(
      'button#input-id-clear-button'
    )
    fireEvent.click(clearButton)

    fireEvent.focus(document.querySelector('input'))
    expect(
      document.querySelector('.dnb-input').getAttribute('data-input-state')
    ).toBe('focus')
  })

  it('should support spacing props', () => {
    render(<Component top="2rem" />)

    const element = document.querySelector('.dnb-input')

    expect(Array.from(element.classList)).toEqual([
      'dnb-input',
      'dnb-form-component',
      'dnb-space__top--large',
      'dnb-input--text',
    ])
  })

  it('should inherit FormRow vertical label', () => {
    render(
      <FormRow vertical>
        <Component label="Label" />
      </FormRow>
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
      'dnb-form-component',
      'dnb-input--text',
      'dnb-input--vertical',
    ])
  })

  it('should support icon', () => {
    const { rerender } = render(<Component clear={true} icon="bell" />)
    expect(
      document.querySelector('.dnb-input__icon').querySelector('svg')
    ).toBeTruthy()
    expect(document.querySelector('.dnb-icon--default')).toBeTruthy()
    expect(
      document.querySelector('.dnb-input--icon-position-right')
    ).toBeFalsy()

    rerender(<Component clear={true} icon="bell" icon_position="right" />)

    expect(
      document.querySelector('.dnb-input--icon-position-right')
    ).toBeTruthy()

    expect(
      document
        .querySelector('.dnb-input')
        .querySelector('.dnb-input__input ~ .dnb-input__icon')
        .querySelector('svg')
    ).toBeTruthy()
  })

  it('should warn about clear button and right icon position', () => {
    global.console.log = jest.fn()
    render(<Component clear={true} icon="bell" icon_position="right" />)
    expect(document.querySelector('.dnb-input--clear')).toBeFalsy()
    expect(
      document.querySelector('.dnb-input__icon').querySelector('svg')
    ).toBeTruthy()
    expect(global.console.log).toHaveBeenCalledTimes(1)
    expect(global.console.log).toHaveBeenCalledWith(
      expect.stringContaining('Eufemia'),
      `You can not have a clear button and icon_position="right"`
    )
  })

  it('should render inner_element', () => {
    const CustomComponent = () => <div>custom element</div>
    render(<Component inner_element={<CustomComponent />} icon="bell" />)

    expect(
      document
        .querySelector('.dnb-input')
        .querySelector('.dnb-input__input ~ .dnb-input__inner__element')
        .textContent
    ).toBe('custom element')

    expect(
      document
        .querySelector('.dnb-input')
        .querySelector('.dnb-input__inner__element ~ .dnb-input__icon')
        .querySelector('svg')
    ).toBeTruthy()
  })
})

describe('Input scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-input-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})

const wait = (t) => new Promise((r) => setTimeout(r, t))
