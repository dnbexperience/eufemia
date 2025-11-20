/**
 * Input Test
 *
 */

import React from 'react'
import { axeComponent, loadScss, wait } from '../../../core/jest/jestSetup'
import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

    expect(document.querySelector('input').value).toBe(newValue)
  })

  it('gets valid ref element', () => {
    let ref: React.RefObject<HTMLInputElement>

    function MockComponent() {
      ref = React.useRef()
      return <Input {...props} innerRef={ref} />
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

    render(<Input {...props} innerRef={refFn} />)

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
          onChange={({ value }) => {
            setValue(value)
          }}
        />
      )
    }

    render(<Controlled />)

    expect(document.querySelector('input').value).toBe(
      format(initialValue)
    )

    const newValue = '12345678'
    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
    })

    expect(document.querySelector('input').value).toBe(format(newValue))
  })

  it('value can be manipulated during onChange', () => {
    render(
      <Input
        onChange={({ value }) => {
          return String(value).toUpperCase()
        }}
      />
    )

    const newValue = 'new value'
    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
    })

    expect(document.querySelector('input').value).toBe('NEW VALUE')
  })

  it('value will not change when returning false onChange', () => {
    render(
      <Input
        onChange={() => {
          return false
        }}
      />
    )

    const newValue = 'new value'
    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
    })

    expect(document.querySelector('input').value).toBe('')
  })

  it('events gets emitted correctly: "onChange" and "onKeyDown"', () => {
    const initValue = 'init value'
    const newValue = 'new value'
    const emptyValue = null // gets emitted also on values as null

    const onChange = jest.fn()
    const onKeyDown = jest.fn() // additional native event test

    render(
      <Input
        {...props}
        value={initValue}
        onChange={onChange}
        onKeyDown={onKeyDown} // additional native event test
      />
    )

    expect(document.querySelector('input').value).toBe(initValue)

    fireEvent.change(document.querySelector('input'), {
      target: { value: newValue },
    })
    expect(onChange.mock.calls.length).toBe(1)
    expect(document.querySelector('input').value).toBe(newValue)

    fireEvent.change(document.querySelector('input'), {
      target: { value: emptyValue },
    })
    expect(onChange.mock.calls.length).toBe(2)
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
    expect(document.querySelector('input').value).toBe(String(zeroValue))
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
    expect(document.querySelector('input').value).toBe('children')
  })

  it('has correct size attribute (chars length) on input by int number', () => {
    render(<Input size={2} />)
    expect(document.querySelector('input').getAttribute('size')).toBe('2')
  })

  it('has correct size attribute (chars length) on input by using inputAttributes', () => {
    render(<Input inputAttributes={{ size: 2 }} />)
    expect(document.querySelector('input').getAttribute('size')).toBe('2')
  })

  it('has correct size attribute (chars length) on input by using inputAttributes and a JSON object', () => {
    render(<Input inputAttributes='{"size": "2"}' />)
    expect(document.querySelector('input').getAttribute('size')).toBe('2')
  })

  it('has to have a prop value like value', () => {
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

  it('has to have a label value as defined in the prop', () => {
    render(<Input {...props} label="label" />)
    expect(document.querySelector('label').textContent).toBe('label')
  })

  it('has to have a status value as defined in the prop', () => {
    render(<Input {...props} status="status" statusState="error" />)
    expect(
      document.querySelector('.dnb-form-status__text').textContent
    ).toBe('status')
  })

  it('shows form-status with correct classes', () => {
    render(
      <Input
        value="value"
        status="status text"
        statusState="warn"
        statusProps={{ stretch: true }}
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

  it('should not expose the value as an html attribute', async () => {
    render(<Input />)

    const input = document.querySelector('input')

    await userEvent.type(input, 'foo')
    expect(input).not.toHaveAttribute('value')
    expect(input).toHaveValue('foo')

    await userEvent.type(input, ' bar')
    expect(input).not.toHaveAttribute('value')
    expect(input).toHaveValue('foo bar')
  })

  it('should not expose the value as an html attribute when initially provided', async () => {
    render(<Input value="foo" />)

    const input = document.querySelector('input')

    expect(input).not.toHaveAttribute('foo')
    expect(input).toHaveValue('foo')

    await userEvent.type(input, ' bar')
    expect(input).not.toHaveAttribute('foo bar')
    expect(input).toHaveValue('foo bar')
  })

  it('should call onSubmit event handler on enter key press', () => {
    const onSubmit = jest.fn()
    render(
      <Input
        id="input-id"
        value="value"
        type="search"
        onSubmit={onSubmit}
      />
    )

    expect(document.querySelector('input').value).toBe('value')

    fireEvent.keyDown(document.querySelector('input'), {
      key: 'Enter',
      keyCode: 13, // enter
    })
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit.mock.calls[0][0].value).toBe('value')
  })

  it('should call onSubmit event handler on submit button click', () => {
    const onSubmit = jest.fn()
    render(
      <Input
        id="input-id"
        value="value"
        type="search"
        onSubmit={onSubmit}
      />
    )

    expect(document.querySelector('input').value).toBe('value')

    const submitButton = document.querySelector('.dnb-button')
    fireEvent.click(submitButton)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit.mock.calls[0][0].value).toBe('value')
  })

  it('should call onSubmitFocus event handler on submit button focus', () => {
    const onSubmitFocus = jest.fn()
    render(
      <Input
        id="input-id"
        value="value"
        type="search"
        onSubmitFocus={onSubmitFocus}
      />
    )

    expect(document.querySelector('input').value).toBe('value')

    const submitButton = document.querySelector('.dnb-button')
    fireEvent.focus(submitButton)

    expect(onSubmitFocus).toHaveBeenCalledTimes(1)
    expect(onSubmitFocus.mock.calls[0][0].value).toBe('value')
  })

  it('should call onSubmitBlur event handler on submit button blur', () => {
    const onSubmitBlur = jest.fn()
    render(
      <Input
        id="input-id"
        value="value"
        type="search"
        onSubmitBlur={onSubmitBlur}
      />
    )

    expect(document.querySelector('input').value).toBe('value')

    const submitButton = document.querySelector('.dnb-button')
    fireEvent.blur(submitButton)

    expect(onSubmitBlur).toHaveBeenCalledTimes(1)
    expect(onSubmitBlur.mock.calls[0][0].value).toBe('value')
  })
})

describe('Input with clear button', () => {
  it('should have the button', () => {
    render(<Input clear={true} />)
    expect(document.querySelector('.dnb-input--clear')).toBeInTheDocument()
  })

  it('should clear the value on press', () => {
    render(<Input id="input-id" clear={true} value="value" />)

    expect(document.querySelector('input').value).toBe('value')

    const clearButton = document.querySelector(
      'button#input-id-clear-button'
    )
    fireEvent.click(clearButton)

    expect(document.querySelector('input').value).toBe('')
  })

  it('should have a disabled clear button when no value is given', () => {
    render(<Input id="input-id" clear={true} value="value" />)

    expect(document.querySelector('input').value).toBe('value')

    const clearButton = document.querySelector(
      'button#input-id-clear-button'
    )
    fireEvent.click(clearButton)

    expect(document.querySelector('input').value).toBe('')
    expect(clearButton.getAttribute('aria-hidden')).toBe('true')
    expect(clearButton).toHaveAttribute('disabled')
  })

  it('should have a disabled clear button when initially empty value is given', () => {
    render(<Input id="input-id" clear={true} />)

    expect(document.querySelector('input').value).toBe('')

    const clearButton = document.querySelector(
      'button#input-id-clear-button'
    )

    expect(document.querySelector('input').value).toBe('')
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
      <Provider formElement={{ labelDirection: 'vertical' }}>
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

    rerender(<Input clear={true} icon="bell" iconPosition="right" />)

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
    render(<Input clear={true} icon="bell" iconPosition="right" />)
    expect(
      document.querySelector('.dnb-input--clear')
    ).not.toBeInTheDocument()
    expect(
      document.querySelector('.dnb-input__icon').querySelector('svg')
    ).toBeInTheDocument()
    expect(global.console.log).toHaveBeenCalledTimes(1)
    expect(global.console.log).toHaveBeenCalledWith(
      expect.stringContaining('Eufemia'),
      `You cannot have a clear button and iconPosition="right"`
    )
  })

  it('should render innerElement', () => {
    const CustomComponent = () => <div>custom element</div>
    render(<Input innerElement={<CustomComponent />} icon="bell" />)

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

  it('should emit onClear event on clear button click', () => {
    const onClear = jest.fn()
    const onChange = jest.fn()

    render(
      <Input value="123" clear onClear={onClear} onChange={onChange} />
    )

    fireEvent.click(document.querySelector('.dnb-input__clear-button'))

    expect(onClear).toHaveBeenCalledTimes(1)
    expect(onClear).toHaveBeenCalledWith(
      expect.objectContaining({ value: '', previousValue: '123' })
    )
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: '' })
    )
  })

  it('should omit input shell classes when omitInputShellClass is true', () => {
    render(<Input omitInputShellClass value="value" />)

    const wrapper = document.querySelector('.dnb-input')
    // Should not render shell or border elements/classes
    expect(
      wrapper.querySelector('.dnb-input__shell')
    ).not.toBeInTheDocument()
    expect(
      wrapper.querySelector('.dnb-input__border')
    ).not.toBeInTheDocument()
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
