/**
 * Input Test
 *
 */

import React from 'react'
import { axeComponent, loadScss, wait } from '../../../core/jest/jestSetup'
import { fireEvent, render } from '@testing-library/react'
import Input, { InputProps } from '../Input'
import { format } from '../../number-format/NumberUtils'
import { Provider } from '../../../shared'

const props: InputProps = {
  id: 'input',
  status: null, // to make sure we don't get aria-details
  suffix: null, // to make sure we don't get aria-details
  type: 'text',
}

const log = global.console.log
afterEach(() => {
  global.console.log = log
})

describe('Input component', () => {
  it('has correct state after "focus" trigger', () => {
    render(
      <Input {...props} value={null}>
        {null}
      </Input>
    )

    fireEvent.focus(document.querySelector('input'))

    expect(
      document.querySelector('.dnb-input').getAttribute('data-input-state')
    ).toBe('focus')
  })

  it('has correct state after "change" trigger', () => {
    render(
      <Input {...props} value={null}>
        {null}
      </Input>
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

  it('gets valid ref element', () => {
    let ref: React.RefObject<HTMLInputElement>

    function MockComponent() {
      ref = React.useRef()
      return <Input {...props} inner_ref={ref} />
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

    render(<Input {...props} inner_ref={refFn} />)

    expect(ref.current instanceof HTMLInputElement).toBe(true)
    expect(ref.current.id).toBe(props.id)
    expect(ref.current.tagName).toBe('INPUT')
  })

  it('should support inline styling', () => {
    render(<Input value={1234.56} style={{ color: 'red' }} />)

    expect(document.querySelector('input').getAttribute('style')).toBe(
      'color: red;'
    )
  })

  it('value should be controllable from outside', () => {
    const initialValue = '1234'
    const Controlled = () => {
      const [value, setValue] = React.useState(initialValue)
      return (
        <Input
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
      <Input
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
      <Input
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

  it('events gets emitted correctly: "on_change" and "onKeyDown"', () => {
    const initValue = 'init value'
    const newValue = 'new value'
    const emptyValue = null // gets emitted also on values as null

    const on_change = jest.fn()
    const onKeyDown = jest.fn() // additional native event test

    render(
      <Input
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
      keyCode: 84, // space
    })
    expect(onKeyDown.mock.calls.length).toBe(1)
  })

  // make sure getDerivedStateFromProps works
  it('has correct state after changing "value" prop (set by getDerivedStateFromProps)', () => {
    const { rerender } = render(
      <Input {...props} value={null}>
        {null}
      </Input>
    )

    const initValue = 'new prop value'
    const emptyValue = null

    rerender(
      <Input {...props} value={initValue}>
        {null}
      </Input>
    )
    expect(document.querySelector('input').value).toBe(initValue)

    rerender(
      <Input {...props} value={emptyValue}>
        {null}
      </Input>
    )
    expect(document.querySelector('input').value).toBe('')
  })

  it('should show placeholder with both value null and undefined', () => {
    const { rerender } = render(
      <Input value={undefined} placeholder="AA" />
    )

    expect(
      document.querySelector('.dnb-input__placeholder').textContent
    ).toBe('AA')

    rerender(<Input placeholder="BB" value={null} />)

    expect(
      document.querySelector('.dnb-input__placeholder').textContent
    ).toBe('BB')

    rerender(<Input placeholder="CC" value="" />)

    expect(
      document.querySelector('.dnb-input__placeholder').textContent
    ).toBe('CC')

    rerender(<Input placeholder="CC" value="new-value" />)

    expect(
      document.querySelector('.dnb-input__placeholder')
    ).not.toBeInTheDocument()
  })

  it('has correct state after setting "value" prop using placeholder (set by getDerivedStateFromProps)', () => {
    const { rerender } = render(<Input placeholder="Placeholder" />)

    const newValue = 'new value'
    const emptyValue = null
    const zeroValue = 0

    rerender(<Input placeholder="Placeholder" value={newValue} />)
    expect(document.querySelector('input').value).toBe(newValue)

    rerender(<Input placeholder="Placeholder" value={emptyValue} />)
    expect(document.querySelector('input').value).toBe('')

    rerender(<Input placeholder="Placeholder" value={zeroValue} />)
    expect(document.querySelector('input').getAttribute('value')).toBe(
      String(zeroValue)
    )
  })

  it('uses aria-placeholder and label for when placeholder is set', () => {
    const { rerender } = render(
      <Input id="unique" placeholder="Placeholder" label="Label-text" />
    )

    expect(document.querySelector('label').getAttribute('for')).toContain(
      'unique'
    )
    expect(
      document.querySelector('input').getAttribute('aria-placeholder')
    ).toContain('Placeholder')

    rerender(
      <Input
        id="unique"
        placeholder="Placeholder-text"
        label={undefined}
      />
    )

    expect(document.querySelector('label')).not.toBeInTheDocument()
    expect(
      document.querySelector('input').getAttribute('aria-placeholder')
    ).toContain('Placeholder-text')
    expect(document.querySelector('input')).not.toHaveAttribute(
      'aria-labelledby'
    )

    rerender(
      <Input id="unique" placeholder={undefined} label={undefined} />
    )

    expect(document.querySelector('label')).not.toBeInTheDocument()
    expect(document.querySelector('input')).not.toHaveAttribute(
      'aria-placeholder'
    )
    expect(document.querySelector('input')).not.toHaveAttribute(
      'aria-labelledby'
    )
  })

  it('placeholder prop should accept React Element', () => {
    const Placeholder = ({ children }) => <span>{children}</span>

    const { rerender } = render(
      <Input placeholder={<Placeholder>Placeholder</Placeholder>} />
    )

    expect(
      document.querySelector('input').getAttribute('aria-placeholder')
    ).toContain('Placeholder')
    expect(
      document.querySelector('.dnb-input__placeholder')
    ).toHaveTextContent('Placeholder')

    rerender(
      <Input placeholder={<Placeholder>Placeholder-text</Placeholder>} />
    )

    expect(
      document.querySelector('input').getAttribute('aria-placeholder')
    ).toContain('Placeholder-text')
    expect(
      document.querySelector('.dnb-input__placeholder')
    ).toHaveTextContent('Placeholder-text')

    rerender(
      <Input id="unique" placeholder={undefined} label={undefined} />
    )

    expect(document.querySelector('input')).not.toHaveAttribute(
      'aria-placeholder'
    )
    expect(document.querySelector('.dnb-input__placeholder')).toBeNull()
  })

  it('has correct medium input size', () => {
    render(<Input size="medium" />)
    expect(
      document.querySelector('.dnb-input--medium')
    ).toBeInTheDocument()
  })

  it('will select the whole input when selectall is set', async () => {
    render(<Input selectall={true} value="1234" />)

    const select = jest.fn()
    document.querySelector('input').select = select

    fireEvent.focus(document.querySelector('input'))

    expect(select).toHaveBeenCalledTimes(0)

    await wait(1)

    expect(select).toHaveBeenCalledTimes(1)
  })

  it('uses children as the value', () => {
    render(<Input>children</Input>)
    expect(document.querySelector('input').getAttribute('value')).toBe(
      'children'
    )
  })

  it('has correct size attribute (chars length) on input by int number', () => {
    render(<Input size={2} />)
    expect(document.querySelector('input').getAttribute('size')).toBe('2')
  })

  it('has correct size attribute (chars length) on input by using input_attributes', () => {
    render(<Input input_attributes={{ size: 2 }} />)
    expect(document.querySelector('input').getAttribute('size')).toBe('2')
  })

  it('has correct size attribute (chars length) on input by using input_attributes and a JSON object', () => {
    render(<Input input_attributes='{"size": "2"}' />)
    expect(document.querySelector('input').getAttribute('size')).toBe('2')
  })

  it('has to to have a prop value like value', () => {
    const { rerender } = render(
      <Input {...props} value={null}>
        {null}
      </Input>
    )

    const value = 'new value'
    rerender(
      <Input {...props} value={value}>
        {null}
      </Input>
    )
    expect(document.querySelector('input').value).toBe(value)
  })

  it('has to to have a label value as defined in the prop', () => {
    render(<Input {...props} label="label" />)
    expect(document.querySelector('label').textContent).toBe('label')
  })

  it('has to to have a status value as defined in the prop', () => {
    render(<Input {...props} status="status" status_state="error" />)
    expect(
      document.querySelector('.dnb-form-status__text').textContent
    ).toBe('status')
  })

  it('shows form-status with correct classes', () => {
    render(
      <Input
        value="value"
        status="status text"
        status_state="warn"
        status_props={{ stretch: true }}
      />
    )

    expect(document.querySelector('.dnb-form-status')).toHaveClass(
      'dnb-form-status--warn dnb-form-status__size--default dnb-form-status--stretch dnb-form-status--has-content dnb-form-status--has-content'
    )
    expect(document.querySelector('.dnb-form-status')).toHaveClass(
      'dnb-height-animation--is-visible dnb-height-animation--is-in-dom'
    )
  })

  it('has a disabled attribute and class when disabled', () => {
    const { rerender } = render(<Input />)

    rerender(<Input disabled={true} />)

    expect(document.querySelector('input')).toHaveAttribute('disabled')
    expect(document.querySelector('.dnb-input')).toHaveClass(
      'dnb-input--disabled'
    )
  })

  it('has a submit button on prop type="search"', () => {
    render(
      <Input {...props} type="search" value={null} aria-describedby="id">
        {null}
      </Input>
    )

    expect(
      document
        .querySelector('.dnb-input__input')
        .getAttribute('aria-describedby')
    ).toBe('id input-submit-button')

    const Button = document.querySelector('button')
    expect(Button).toBeInTheDocument()

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
      <Input
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
})

describe('Input with clear button', () => {
  it('should have the button', () => {
    render(<Input clear={true} />)
    expect(document.querySelector('.dnb-input--clear')).toBeInTheDocument()
  })

  it('should clear the value on press', () => {
    render(<Input id="input-id" clear={true} value="value" />)

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
    render(<Input id="input-id" clear={true} value="value" />)

    expect(document.querySelector('input').getAttribute('value')).toBe(
      'value'
    )

    const clearButton = document.querySelector(
      'button#input-id-clear-button'
    )
    fireEvent.click(clearButton)

    expect(document.querySelector('input').getAttribute('value')).toBe('')
    expect(clearButton.getAttribute('aria-hidden')).toBe('true')
    expect(clearButton).toHaveAttribute('disabled')
  })

  it('should have a disabled clear button when initially empty value is given', () => {
    render(<Input id="input-id" clear={true} />)

    expect(document.querySelector('input').getAttribute('value')).toBe('')

    const clearButton = document.querySelector(
      'button#input-id-clear-button'
    )

    expect(document.querySelector('input').getAttribute('value')).toBe('')
    expect(clearButton.getAttribute('aria-hidden')).toBe('true')
    expect(clearButton).toHaveAttribute('disabled')
  })

  it('should set focus on input when clear button is pressed', () => {
    render(<Input id="input-id" clear={true} value="value" />)

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
    render(<Input top="2rem" />)

    const element = document.querySelector('.dnb-input')

    expect(Array.from(element.classList)).toEqual([
      'dnb-input',
      'dnb-input__border--tokens',
      'dnb-form-component',
      'dnb-space__top--large',
      'dnb-input--text',
    ])
  })

  it('should inherit formElement vertical label', () => {
    render(
      <Provider formElement={{ label_direction: 'vertical' }}>
        <Input label="Label" />
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
      'dnb-input--text',
      'dnb-input--vertical',
    ])
  })

  it('should support icon', () => {
    const { rerender } = render(<Input clear={true} icon="bell" />)
    expect(
      document.querySelector('.dnb-input__icon').querySelector('svg')
    ).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-icon--default')
    ).toBeInTheDocument()
    expect(
      document.querySelector('.dnb-input--icon-position-right')
    ).not.toBeInTheDocument()

    rerender(<Input clear={true} icon="bell" icon_position="right" />)

    expect(
      document.querySelector('.dnb-input--icon-position-right')
    ).toBeInTheDocument()

    expect(
      document
        .querySelector('.dnb-input')
        .querySelector('.dnb-input__input ~ .dnb-input__icon')
        .querySelector('svg')
    ).toBeInTheDocument()
  })

  it('should warn about clear button and right icon position', () => {
    global.console.log = jest.fn()
    render(<Input clear={true} icon="bell" icon_position="right" />)
    expect(
      document.querySelector('.dnb-input--clear')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-input__icon').querySelector('svg')
    ).toBeInTheDocument()
    expect(global.console.log).toHaveBeenCalledTimes(1)
    expect(global.console.log).toHaveBeenCalledWith(
      expect.stringContaining('Eufemia'),
      `You can not have a clear button and icon_position="right"`
    )
  })

  it('should render inner_element', () => {
    const CustomComponent = () => <div>custom element</div>
    render(<Input inner_element={<CustomComponent />} icon="bell" />)

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
    ).toBeInTheDocument()
  })

  it('should emit on_clear event on clear button click', () => {
    const on_clear = jest.fn()
    const on_change = jest.fn()

    render(
      <Input value="123" clear on_clear={on_clear} on_change={on_change} />
    )

    fireEvent.click(document.querySelector('.dnb-input__clear-button'))

    expect(on_clear).toHaveBeenCalledTimes(1)
    expect(on_clear).toHaveBeenCalledWith(
      expect.objectContaining({ value: '', previousValue: '123' })
    )
    expect(on_change).toHaveBeenCalledTimes(1)
    expect(on_change).toHaveBeenCalledWith(
      expect.objectContaining({ value: '' })
    )
  })
})

describe('Input ARIA', () => {
  it('should validate with ARIA rules as a search input with a label', async () => {
    const Comp = render(
      <>
        <label htmlFor="input">text</label>
        <Input
          {...props}
          id="input"
          type="search"
          autocomplete="off"
          value="some value"
        />
      </>
    )

    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should validate with ARIA rules as a input with a label', async () => {
    const Comp = render(
      <>
        <label htmlFor="input">text</label>
        <Input {...props} id="input" value="some value" />
      </>
    )
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Input scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-input-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
