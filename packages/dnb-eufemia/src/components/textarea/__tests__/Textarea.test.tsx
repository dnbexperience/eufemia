/**
 * Textarea Test
 *
 */

import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import Textarea, { TextareaProps } from '../Textarea'
import userEvent from '@testing-library/user-event'
import { Provider } from '../../../shared'

const props: TextareaProps = {
  id: 'textarea',
  label: null,
  status: null, // to make sure we don't get aria-details
  textarea_element: null,
  disabled: false,
}

describe('Textarea component', () => {
  it('has correct state after "focus" trigger', () => {
    render(
      <Textarea {...props} value={null}>
        {null}
      </Textarea>
    )
    fireEvent.focus(document.querySelector('textarea'))

    expect(document.querySelector('.dnb-textarea').classList).toContain(
      'dnb-textarea--focus'
    )
  })

  it('has correct state after "change" trigger', () => {
    render(
      <Textarea {...props} value={null}>
        {null}
      </Textarea>
    )
    expect(
      document.querySelector('.dnb-textarea').classList
    ).not.toContain('dnb-textarea--has-content')

    const value = 'new value'

    fireEvent.change(document.querySelector('textarea'), {
      target: { value },
    })

    expect(document.querySelector('.dnb-textarea').classList).toContain(
      'dnb-textarea--has-content'
    )
    expect(document.querySelector('textarea').value).toBe(value)
  })

  // // make sure getDerivedStateFromProps works
  it('has correct state after changing "value" prop (set by getDerivedStateFromProps)', () => {
    const { rerender } = render(
      <Textarea {...props} value={null}>
        {null}
      </Textarea>
    )
    const initValue = 'new prop value'
    const emptyValue = null

    rerender(
      <Textarea {...props} value={initValue}>
        {null}
      </Textarea>
    )
    expect(document.querySelector('textarea').value).toBe(initValue)

    rerender(
      <Textarea {...props} value={emptyValue}>
        {null}
      </Textarea>
    )
    expect(document.querySelector('textarea').value).toBe('')
  })

  it('events gets emitted correctly: "on_change" and "on_key_down"', async () => {
    const initValue = 'init value'
    const newValue = 'new value'

    const on_change = jest.fn()
    const on_key_down = jest.fn() // additional native event test

    render(
      <Textarea
        {...props}
        value={initValue}
        on_change={on_change}
        on_key_down={on_key_down} // additional native event test
      />
    )

    expect(document.querySelector('textarea').value).toBe(initValue)
    userEvent.type(document.querySelector('textarea'), newValue)
    await waitFor(() => {
      expect(on_change.mock.calls.length).toBe(9)
      expect(document.querySelector('textarea').value).toBe(
        initValue + newValue
      )
    })

    // additional native event test
    fireEvent.keyDown(document.querySelector('textarea'), {
      keyCode: 84, // space,
      key: 'Space',
    })
    await waitFor(() => {
      expect(on_key_down.mock.calls.length).toBe(10)
      expect(on_key_down.mock.calls[0][0].rows).toBe(1)
    })
  })

  it('supports null as value', () => {
    render(<Textarea {...props} value={null} />)

    expect(document.querySelector('textarea').value).toBe('')
  })

  it('has correct state after setting "value" prop using placeholder (set by getDerivedStateFromProps)', () => {
    const { rerender } = render(<Textarea placeholder="Placeholder" />)

    const newValue = 'new value'
    const emptyValue = null
    const zeroValue = '0'

    rerender(<Textarea value={newValue} />)
    expect(document.querySelector('textarea').value).toBe(newValue)

    rerender(<Textarea value={emptyValue} />)
    expect(document.querySelector('textarea').value).toBe('')

    rerender(<Textarea value={zeroValue} />)
    expect(document.querySelector('textarea').value).toBe(
      String(zeroValue)
    )
  })

  it('uses children as the value', () => {
    render(<Textarea>children</Textarea>)
    expect(document.querySelector('textarea').value).toBe('children')
  })

  it('has correct size attribute (chars length) on textarea by using textarea_attributes', () => {
    render(<Textarea textarea_attributes={{ size: 2 }} />)
    expect(document.querySelector('textarea').getAttribute('size')).toBe(
      '2'
    )
  })

  it('has to to have a prop value like value', () => {
    const { rerender } = render(
      <Textarea {...props} value={null}>
        {null}
      </Textarea>
    )
    const value = 'new value'
    rerender(
      <Textarea {...props} value={value}>
        {null}
      </Textarea>
    )
    expect(document.querySelector('textarea').value).toBe(value)
  })

  it('has to to have a label value as defined in the prop', () => {
    render(<Textarea {...props} label="label" />)
    expect(document.querySelector('label').textContent).toBe('label')
  })

  it('has to to have a status value as defined in the prop', () => {
    render(<Textarea {...props} status="status" status_state="error" />)
    expect(
      document.querySelector('.dnb-form-status__text').textContent
    ).toBe('status')
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const { rerender } = render(<Textarea />)
    rerender(<Textarea disabled={true} />)
    expect(document.querySelector('textarea')).toHaveAttribute('disabled')
  })

  it('will correctly auto resize if prop autoresize is used', async () => {
    render(<Textarea rows={1} autoresize={true} autoresize_max_rows={4} />)

    const elem = document.querySelector('textarea')

    const style = {
      lineHeight: String(1.5 * 16),
    } as CSSStyleDeclaration

    jest.spyOn(window, 'getComputedStyle').mockImplementation(() => style)

    jest
      .spyOn(elem, 'scrollHeight', 'get')
      .mockImplementation(() => 1.5 * 16)
    userEvent.type(elem, 'a')
    await waitFor(() => {
      expect(elem.style.height).toBe('24px')
    })

    jest
      .spyOn(elem, 'scrollHeight', 'get')
      .mockImplementation(() => 1.5 * 32)
    userEvent.type(elem, 'a')
    await waitFor(() => {
      expect(elem.style.height).toBe('48px')
    })

    jest
      .spyOn(elem, 'scrollHeight', 'get')
      .mockImplementation(() => 1.5 * 2000)
    userEvent.type(elem, 'a')
    await waitFor(() => {
      expect(elem.style.height).toBe('96px')
    })
  })

  it('should support spacing props', () => {
    render(<Textarea top="2rem" />)

    const element = document.querySelector('.dnb-textarea')

    expect(Array.from(element.classList)).toEqual([
      'dnb-textarea',
      'dnb-textarea--virgin',
      'dnb-form-component',
      'dnb-space__top--large',
    ])
  })

  it('should inherit formElement vertical label', () => {
    render(
      <Provider formElement={{ label_direction: 'vertical' }}>
        <Textarea label="Label" />
      </Provider>
    )

    const element = document.querySelector('.dnb-textarea')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
    expect(Array.from(element.classList)).toEqual([
      'dnb-textarea',
      'dnb-textarea--virgin',
      'dnb-form-component',
      'dnb-textarea--vertical',
    ])
  })

  it('should validate with ARIA rules as a textarea with a label', async () => {
    const Comp = render(
      <>
        <label htmlFor="textarea">text</label>
        <Textarea {...props} id="textarea" value="some value" />
      </>
    )

    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('gets valid ref element', () => {
    let ref: React.RefObject<HTMLTextAreaElement>

    function MockComponent() {
      ref = React.useRef()
      return <Textarea {...props} inner_ref={ref} />
    }

    render(<MockComponent />)

    expect(ref.current.classList).toContain('dnb-textarea__textarea')
    expect(ref.current.tagName).toBe('TEXTAREA')
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it('gets valid element when ref is function', () => {
    const ref: React.MutableRefObject<HTMLTextAreaElement> =
      React.createRef()

    const refFn = (elem: HTMLTextAreaElement) => {
      ref.current = elem
    }

    render(<Textarea id="unique" inner_ref={refFn} />)

    expect(ref.current.getAttribute('id')).toBe('unique')
    expect(ref.current.classList).toContain('dnb-textarea__textarea')
    expect(ref.current.tagName).toBe('TEXTAREA')
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it('should render characterCounter', async () => {
    const { rerender } = render(
      <Textarea characterCounter={{ max: 8 }} value="foo" />
    )

    const counter = document.querySelector('.dnb-text-counter__message')
    const textarea = document.querySelector('textarea')
    const ariaLive = document.querySelector('.dnb-aria-live')

    expect(counter).toHaveTextContent('3 av 8 tegn gjenstår')
    expect(ariaLive).toHaveTextContent('')

    await userEvent.type(textarea, 'bar')

    expect(counter).toHaveTextContent('6 av 8 tegn gjenstår')
    expect(ariaLive).toHaveTextContent('6 av 8 tegn gjenstår')

    rerender(
      <Textarea characterCounter={{ max: 8 }} value="foo" lang="en-GB" />
    )

    expect(counter).toHaveTextContent('6 of 8 characters remaining')

    await userEvent.type(textarea, 'baz')

    expect(ariaLive).toHaveTextContent('8 of 8 characters remaining')

    rerender(
      <Textarea
        characterCounter={{ max: 8, variant: 'up' }}
        value="foo"
        lang="en-GB"
      />
    )

    expect(counter).toHaveTextContent('You have used 8 of 8 characters')
  })
})

describe('Textarea scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-textarea-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
