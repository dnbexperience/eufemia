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
import Component from '../Button'
import IconPrimary from '../../IconPrimary'
import { fireEvent, render } from '@testing-library/react'

const props = fakeProps(require.resolve('../Button'), {
  optional: true,
})
props.id = 'button'
props.variant = 'primary'
props.icon = 'question'
props.title = 'This is a button title'
props.size = null
props.status = null
props.element = null
props.tooltip = null
props.to = null
props.custom_content = null
props.text = null
props.icon_position = 'right'
props.global_status_id = 'main'

beforeAll(() => {
  jest.spyOn(global.console, 'log')
})

describe('Button component', () => {
  it('have to match default button snapshot', () => {
    const Comp = mount(<Component {...props} href={null} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('have to match href="..." snapshot', () => {
    const Comp = mount(<Component {...props} href="https://url" />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has a button tag', () => {
    const title = 'title'
    render(<Component {...props} title={title} href={null} />)
    const button = document.querySelector('button')

    expect(button.getAttribute('title')).toBe(title)
  })

  it('icon only has to have some extra classes', () => {
    render(<Component icon="question" />)
    const button = document.querySelector('button')

    // size "medium" and has icon
    expect(button.classList.contains('dnb-button--size-medium')).toBe(true)
    // has icon class, but not has text
    expect(button.classList.contains('dnb-button--has-icon')).toBe(true)
    expect(button.classList.contains('dnb-button--has-text')).toBe(false)
  })

  it('has size set to medium when button size is default', () => {
    render(<Component icon="question" size="default" />)
    const button = document.querySelector('button')
    const icon = document.querySelector('.dnb-icon')
    expect(button.classList.contains('dnb-button--icon-size-medium')).toBe(
      true
    )
    expect(icon.classList.contains('dnb-icon--medium')).toBe(true)
  })

  it('has medium icon if button size is large', () => {
    render(<Component text="Button" size="large" icon="question" />)
    const button = document.querySelector('button')
    const icon = document.querySelector('.dnb-icon')
    // size "large
    expect(button.classList.contains('dnb-button--size-large')).toBe(true)
    expect(icon.classList.contains('dnb-icon--default')).toBe(true)
  })

  it('has to have a bounding tag if property is set', () => {
    render(<Component bounding={true} />)
    const bounding = document.querySelector('.dnb-button__bounding')
    expect(bounding !== null).toBe(true)
  })

  it('has a anchor tag', () => {
    render(<Component {...props} href="https://url" icon={null} />)
    expect(document.querySelector('a') !== null).toBe(true)
    expect(document.querySelector('svg') !== null).toBe(false)
  })

  it('has a anchor tag and includes a launch icon', () => {
    render(
      <Component
        {...props}
        href="https://url"
        target="_blank"
        icon={null}
      />
    )
    expect(document.querySelector('svg') !== undefined).toBe(true)
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const { rerender } = render(<Component />)
    expect(document.querySelector('button').hasAttribute('disabled')).toBe(
      false
    )
    rerender(<Component disabled />)

    expect(document.querySelector('button').hasAttribute('disabled')).toBe(
      true
    )
  })

  it('should be able to omit button type', () => {
    render(<Component type="" />)
    expect(document.querySelector('button').hasAttribute('type')).toBe(
      false
    )
  })

  it('should use span element if defined', () => {
    render(<Component element="span" />)
    expect(document.querySelector('.dnb-button').tagName).toBe('SPAN')
    expect(
      document.querySelector('.dnb-button').getAttribute('type')
    ).toBe('button')
  })

  it('has "on_click" event which will trigger on a click', () => {
    const my_event = jest.fn()
    const myEvent = jest.fn()
    render(<Component on_click={my_event} onClick={myEvent} />)
    const button = document.querySelector('button')
    fireEvent.click(button)
    expect(my_event.mock.calls.length).toBe(1)
    expect(myEvent.mock.calls.length).toBe(1)
  })

  it('has set innerRef if ref was given', () => {
    const ref = React.createRef()
    expect(ref.current).toBe(null)
    render(<Component {...props} innerRef={ref} />)
    expect(ref.current).not.toBe(null)
    expect(typeof ref.current).toBe('object')
  })

  it('has type of button', () => {
    render(<Component />)
    const button = document.querySelector('button')
    expect(button.getAttribute('type')).toBe('button')
  })

  it('has alignment helper with aria-hidden', () => {
    const text = 'Button'
    const { rerender } = render(<Component text={text} />)

    expect(
      document
        .querySelector('.dnb-button__alignment')
        .getAttribute('aria-hidden')
    ).toBe('true')
    expect(document.querySelector('.dnb-button__text').textContent).toBe(
      text
    )

    rerender(<Component icon="bell" />)

    expect(
      document
        .querySelector('.dnb-button__alignment')
        .getAttribute('aria-hidden')
    ).toBe('true')
    expect(document.querySelector('.dnb-button__text') === null).toBe(true)
  })

  it('should validate with ARIA rules as a button', async () => {
    const Comp = render(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should validate with ARIA rules as a anchor', async () => {
    const Comp = render(<Component {...props} href="https://url" />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('has variant set to primary as default', () => {
    render(<Component />)
    const button = document.querySelector('button')
    expect(button.classList.contains('dnb-button--primary')).toBe(true)
  })

  it('has variant set to primary when only setting text', () => {
    render(<Component text="Button" />)
    const button = document.querySelector('button')
    expect(button.classList.contains('dnb-button--primary')).toBe(true)
  })

  it('has variant set to secondary when only setting icon', () => {
    render(<Component icon="question" />)
    const button = document.querySelector('button')
    expect(button.classList.contains('dnb-button--secondary')).toBe(true)
  })

  it('has variant tertiary', () => {
    render(<Component text="Button" variant="tertiary" icon="question" />)
    const button = document.querySelector('button')
    expect(button.classList.contains('dnb-button--tertiary')).toBe(true)
  })

  it('has variant unstyled', () => {
    render(<Component text="Button" variant="unstyled" />)
    const button = document.querySelector('button')
    expect(button.classList.contains('dnb-button--unstyled')).toBe(true)
  })

  it('will replace icon with icon component', () => {
    const { rerender } = render(
      <Component
        icon={<span className="dnb-icon custom-icon">icon</span>}
      />
    )
    expect(document.querySelector('.custom-icon') !== null).toBe(true)

    rerender(
      <Component
        icon={
          <IconPrimary icon="bell" className="custom-icon-component" />
        }
      />
    )

    expect(document.querySelector('.custom-icon') !== null).toBe(false)
    expect(document.querySelector('.custom-icon-component') !== null).toBe(
      true
    )
  })

  it('will only have attached event listener if one is given', () => {
    const on_click = jest.fn()
    const { rerender } = render(
      <Component text="Button" on_click={on_click} />
    )
    const button = document.querySelector('button')

    button.onClickHandler = on_click

    fireEvent.click(button)
    fireEvent.click(button)

    expect(on_click).toHaveBeenCalledTimes(2)
    expect(button.onClickHandler).toHaveBeenCalledTimes(2)

    rerender(<Component text="Button" onClick={undefined} />)

    fireEvent.click(button)

    // still 2
    expect(on_click).toHaveBeenCalledTimes(2)
    expect(button.onClickHandler).toHaveBeenCalledTimes(2)
  })

  it('will warn when tertiary is used without an icon', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    render(<Component text="Button" variant="tertiary" />)
    expect(global.console.log).toBeCalled()
  })

  it('has no size when only setting text', () => {
    render(<Component text="Button" />)
    expect(
      document.querySelector('.dnb-button--size-medium') !== null
    ).toBe(false)
    expect(
      document.querySelector('.dnb-button--size-large') !== null
    ).toBe(false)
  })
})

describe('Button scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-button.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-button-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})
