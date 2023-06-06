/**
 * Component Test
 *
 */

import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import {
  mount,
  fakeProps,
  toJson,
  axeComponent,
  loadScss,
} from '../../../core/jest/jestSetup'
import FormRow from '../../form-row/FormRow'
import Component from '../Textarea'
import userEvent from '@testing-library/user-event'

const props = {
  ...fakeProps(require.resolve('../Textarea'), {
    all: true,
    optional: true,
  }),
  id: 'textarea',
  label: null,
  status: null, // to make sure we don't get aria-details
  textarea_element: null,
  disabled: false,
}

describe('Textarea component', () => {
  // compare the snapshot
  it('have to match snapshot', () => {
    const Comp = mount(<Component {...props} value="test" />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has correct state after "focus" trigger', () => {
    render(
      <Component {...props} value={null}>
        {null}
      </Component>
    )
    fireEvent.focus(document.querySelector('textarea'))

    expect(
      document
        .querySelector('.dnb-textarea')
        .classList.contains('dnb-textarea--focus')
    ).toBe(true)
  })

  it('has correct state after "change" trigger', () => {
    render(
      <Component {...props} value={null}>
        {null}
      </Component>
    )
    expect(
      document
        .querySelector('.dnb-textarea')
        .classList.contains('dnb-textarea--has-content')
    ).toBe(false)

    const value = 'new value'

    fireEvent.change(document.querySelector('textarea'), {
      target: { value },
    })

    expect(
      document
        .querySelector('.dnb-textarea')
        .classList.contains('dnb-textarea--has-content')
    ).toBe(true)
    expect(document.querySelector('textarea').value).toBe(value)
  })

  // // make sure getDerivedStateFromProps works
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
    expect(document.querySelector('textarea').value).toBe(initValue)

    rerender(
      <Component {...props} value={emptyValue}>
        {null}
      </Component>
    )
    expect(document.querySelector('textarea').value).toBe('')
  })

  it('events gets emmited correctly: "on_change" and "on_key_down"', () => {
    const initValue = 'init value'
    const newValue = 'new value'

    const on_change = jest.fn()
    const on_key_down = jest.fn() // additional native event test

    render(
      <Component
        {...props}
        value={initValue}
        on_change={on_change}
        on_key_down={on_key_down} // additional native event test
      />
    )

    expect(document.querySelector('textarea').value).toBe(initValue)

    userEvent.type(document.querySelector('textarea'), newValue)

    expect(on_change.mock.calls.length).toBe(9)
    expect(document.querySelector('textarea').value).toBe(
      initValue + newValue
    )

    // additional native event test
    fireEvent.keyDown(document.querySelector('textarea'), {
      keyCode: 84, // space,
      key: 'Space',
    })
    expect(on_key_down.mock.calls.length).toBe(10)
    expect(on_key_down.mock.calls[0][0].rows).toBe(1)
  })

  it('supports null as value', () => {
    render(<Component {...props} value={null} />)

    expect(document.querySelector('textarea').value).toBe('')
  })

  it('has correct state after setting "value" prop using placeholder (set by getDerivedStateFromProps)', () => {
    const { rerender } = render(<Component placeholder="Placeholder" />)

    const newValue = 'new value'
    const emptyValue = null
    const zeroValue = '0'

    rerender(<Component value={newValue} />)
    expect(document.querySelector('textarea').value).toBe(newValue)

    rerender(<Component value={emptyValue} />)
    expect(document.querySelector('textarea').value).toBe('')

    rerender(<Component value={zeroValue} />)
    expect(document.querySelector('textarea').value).toBe(
      String(zeroValue)
    )
  })

  it('uses children as the value', () => {
    render(<Component>children</Component>)
    expect(document.querySelector('textarea').value).toBe('children')
  })

  it('has correct size attribute (chars length) on textarea by using textarea_attributes', () => {
    render(<Component textarea_attributes={{ size: 2 }} />)
    expect(document.querySelector('textarea').getAttribute('size')).toBe(
      '2'
    )
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
    expect(document.querySelector('textarea').value).toBe(value)
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

  it('has a disabled attribute, once we set disabled to true', () => {
    const { rerender } = render(<Component />)
    rerender(<Component disabled={true} />)
    expect(
      document.querySelector('textarea').hasAttribute('disabled')
    ).toBe(true)
  })

  it('will correctly auto resize if prop autoresize is used', () => {
    render(
      <Component rows={1} autoresize={true} autoresize_max_rows={4} />
    )

    const elem = document.querySelector('textarea')

    const style = {
      lineHeight: String(1.5 * 16),
    } as CSSStyleDeclaration

    jest.spyOn(window, 'getComputedStyle').mockImplementation(() => style)

    jest
      .spyOn(elem, 'scrollHeight', 'get')
      .mockImplementation(() => 1.5 * 16)
    userEvent.type(elem, 'a')
    expect(elem.style.height).toBe('24px')

    jest
      .spyOn(elem, 'scrollHeight', 'get')
      .mockImplementation(() => 1.5 * 32)
    userEvent.type(elem, 'a')
    expect(elem.style.height).toBe('48px')

    jest
      .spyOn(elem, 'scrollHeight', 'get')
      .mockImplementation(() => 1.5 * 2000)
    userEvent.type(elem, 'a')
    expect(elem.style.height).toBe('96px')
  })

  it('should support spacing props', () => {
    render(<Component top="2rem" />)

    const element = document.querySelector('.dnb-textarea')

    expect(Array.from(element.classList)).toEqual([
      'dnb-textarea',
      'dnb-textarea--virgin',
      'dnb-form-component',
      'dnb-space__top--large',
    ])
  })

  it('should inherit FormRow vertical label', () => {
    render(
      <FormRow vertical>
        <Component label="Label" />
      </FormRow>
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
    const LabelComp = mount(<label htmlFor="textarea">text</label>)
    const TextareaComp = mount(
      <Component {...props} id="textarea" value="some value" />
    )
    expect(
      await axeComponent(LabelComp, TextareaComp)
    ).toHaveNoViolations()
  })
})

describe('Textarea scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/deps.scss'))
    expect(scss).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-textarea-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
