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
    const Comp = mount(<Component {...props} title={title} href={null} />)
    expect(Comp.find('button').exists()).toBe(true)
    expect(Comp.find('button').props().title).toBe(title)
  })

  it('icon only has to have some extra classes', () => {
    const Comp = mount(<Component icon="question" />)

    // size "medium"
    expect(Comp.find('.dnb-button--size-medium').exists()).toBe(true)

    // has icon class, but not has text
    expect(Comp.find('.dnb-button--has-icon').exists()).toBe(true)
    expect(Comp.find('.dnb-button--has-text').exists()).toBe(false)
  })

  it('has size set to medium when button size is default', () => {
    const Comp = mount(<Component icon="question" size="default" />)
    expect(Comp.find('.dnb-button--icon-size-medium').exists()).toBe(true)
    expect(Comp.find('.dnb-icon--medium').exists()).toBe(true)
  })

  it('has medium icon if button size is large', () => {
    const Comp = mount(
      <Component text="Button" size="large" icon="question" />
    )

    // size "large
    expect(Comp.find('.dnb-button--size-large').exists()).toBe(true)
    expect(Comp.find('.dnb-icon--default').exists()).toBe(true)
  })

  it('has to have a bounding tag if property is set', () => {
    const Comp = mount(<Component bounding={true} />)
    expect(Comp.find('.dnb-button__bounding').exists()).toBe(true)
  })

  it('has a anchor tag', () => {
    const Comp = mount(
      <Component {...props} href="https://url" icon={null} />
    )
    expect(Comp.find('a').exists()).toBe(true)
    expect(Comp.find('svg').exists()).toBe(false)
  })

  it('has a anchor tag and includes a launch icon', () => {
    const Comp = mount(
      <Component
        {...props}
        href="https://url"
        target="_blank"
        icon={null}
      />
    )
    expect(Comp.find('svg').exists()).toBe(true)
  })

  it('has a disabled attribute, once we set disabled to true', () => {
    const Comp = mount(<Component />)
    Comp.setProps({
      disabled: true,
    })
    expect(Comp.find('button').instance().hasAttribute('disabled')).toBe(
      true
    )
  })

  it('should be able to omit button type', () => {
    const Comp = mount(<Component type="" />)
    expect(Comp.find('button').instance().hasAttribute('type')).toBe(false)
  })

  it('has "on_click" event which will trigger on a click', () => {
    const my_event = jest.fn()
    const myEvent = jest.fn()
    const Comp = mount(<Component on_click={my_event} onClick={myEvent} />)
    Comp.simulate('click')
    expect(my_event.mock.calls.length).toBe(1)
    expect(myEvent.mock.calls.length).toBe(1)
  })

  it('has set innerRef if ref was given', () => {
    const ref = React.createRef()
    expect(ref.current).toBe(null)
    mount(<Component {...props} innerRef={ref} />)
    expect(ref.current).not.toBe(null)
    expect(typeof ref.current).toBe('object')
  })

  it('has type of button', () => {
    const Comp = mount(<Component />)
    expect(Comp.find('button').instance().getAttribute('type')).toBe(
      'button'
    )
  })

  it('has alignment helper with aria-hidden', () => {
    const Comp = mount(<Component text="Button" />)
    expect(
      Comp.find('.dnb-button__alignment')
        .instance()
        .getAttribute('aria-hidden')
    ).toBe('true')
    expect(Comp.find('.dnb-button__text').text()).toBe('Button')

    Comp.setProps({ text: undefined, icon: 'bell' })

    expect(
      Comp.find('.dnb-button__alignment')
        .instance()
        .getAttribute('aria-hidden')
    ).toBe('true')
    expect(Comp.exists('.dnb-button__text')).toBe(false)
  })

  it('should validate with ARIA rules as a button', async () => {
    const Comp = mount(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should validate with ARIA rules as a anchor', async () => {
    const Comp = mount(<Component {...props} href="https://url" />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('has variant set to primary as default', () => {
    const Comp = mount(<Component />)
    expect(Comp.find('.dnb-button--primary').exists()).toBe(true)
  })

  it('has variant set to primary when only setting text', () => {
    const Comp = mount(<Component text="Button" />)
    expect(Comp.find('.dnb-button--primary').exists()).toBe(true)
  })

  it('has variant set to secondary when only setting icon', () => {
    const Comp = mount(<Component icon="question" />)
    expect(Comp.find('.dnb-button--secondary').exists()).toBe(true)
  })

  it('has variant tertiary', () => {
    const Comp = mount(
      <Component text="Button" variant="tertiary" icon="question" />
    )
    expect(Comp.find('.dnb-button--tertiary').exists()).toBe(true)
  })

  it('has variant unstyled', () => {
    const Comp = mount(<Component text="Button" variant="unstyled" />)
    expect(Comp.find('.dnb-button--unstyled').exists()).toBe(true)
  })

  it('will replace icon with icon component', () => {
    const Comp = mount(
      <Component
        icon={<span className="dnb-icon custom-icon">icon</span>}
      />
    )
    expect(Comp.find('.custom-icon').exists()).toBe(true)

    Comp.setProps({
      icon: <IconPrimary icon="bell" className="custom-icon-component" />,
    })

    expect(Comp.find('.custom-icon').exists()).toBe(false)
    expect(Comp.find('.custom-icon-component').exists()).toBe(true)
  })

  it('will only have attached event listener if one is given', () => {
    const on_click = jest.fn()
    const Comp = mount(<Component text="Button" on_click={on_click} />)

    Comp.instance().onClickHandler = on_click

    const button = Comp.find('button')

    button.simulate('click')
    button.simulate('click')

    expect(on_click).toHaveBeenCalledTimes(2)
    expect(Comp.instance().onClickHandler).toHaveBeenCalledTimes(2)

    Comp.setProps({
      on_click: undefined,
    })

    button.simulate('click')

    // still 2
    expect(on_click).toHaveBeenCalledTimes(2)
    expect(Comp.instance().onClickHandler).toHaveBeenCalledTimes(2)
  })

  it('will warn when tertiary is used without an icon', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    mount(<Component text="Button" variant="tertiary" />)
    expect(global.console.log).toBeCalled()
  })

  it('has no size when only setting text', () => {
    const Comp = mount(<Component text="Button" />)
    expect(Comp.find('.dnb-button--size-medium').exists()).toBe(false)
    expect(Comp.find('.dnb-button--size-large').exists()).toBe(false)
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
