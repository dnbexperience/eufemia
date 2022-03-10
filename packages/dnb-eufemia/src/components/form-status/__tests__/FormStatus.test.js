/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  axeComponent,
  toJson,
  loadScss,
  attachToBody,
} from '../../../core/jest/jestSetup'
import Component from '../FormStatus'
import Input from '../../Input'

const props = fakeProps(require.resolve('../FormStatus'), {
  optional: true,
  all: true,
})
props.id = 'form-status'
props.text = 'text'
props.state = 'error'
props.status = null
props.global_status_id = 'main'
props.hidden = false
props.icon = 'exclamation'

describe('FormStatus component', () => {
  it('have to match snapshot', () => {
    const Comp = mount(<Component {...props} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should validate with ARIA rules', async () => {
    const Comp = mount(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should set correct max-width', () => {
    const Comp = mount(
      <Input
        style={{ width: '10rem' }}
        status="Long status pulvinar per ad varius nostra faucibus enim ante posuere in"
      />,
      { attachTo: attachToBody() }
    )

    expect(
      Comp.find('.dnb-input__input').instance().getAttribute('style')
    ).toBe('width: 10rem;')
    expect(
      Comp.find('.dnb-form-status').instance().getAttribute('style')
    ).toContain('max-width: 30rem;')
  })

  it('should re-calculate max-width', () => {
    const Comp = mount(
      <Input style={{ width: '10rem' }} status="status message" />,
      {
        attachTo: attachToBody(),
      }
    )

    expect(
      Comp.find('.dnb-form-status').instance().getAttribute('style')
    ).toBe('max-width: 30rem;')

    Comp.setProps({
      status_props: { text: 'change width to 35rem' },
      style: { width: '35rem' },
    })

    expect(
      Comp.find('.dnb-form-status').instance().getAttribute('style')
    ).toBe('max-width: 35rem; height: auto;')

    Comp.setProps({
      status_props: { text: 'change width to 40rem' },
      style: { width: '40rem' },
    })

    expect(
      Comp.find('.dnb-form-status').instance().getAttribute('style')
    ).toBe('max-width: 40rem; height: auto;')

    Comp.setProps({
      style: { width: '10rem' },
    })

    window.dispatchEvent(new Event('resize'))

    expect(
      Comp.find('.dnb-form-status').instance().getAttribute('style')
    ).toBe('max-width: 30rem; height: auto;')
  })

  it('should set correct id', () => {
    const Comp = mount(<Input id="custom-id" status="status text" />)

    expect(
      Comp.find('.dnb-form-status').instance().getAttribute('id')
    ).toBe('custom-id-form-status')
    expect(
      Comp.find('.dnb-form-status__text').instance().getAttribute('id')
    ).toBe('custom-id-status')
  })

  it('should be modifiable with status_prop', () => {
    const Comp = mount(
      <Input
        status="status message"
        status_props={{
          variant: 'outlined',
        }}
      />
    )
    expect(
      Comp.find('.dnb-form-status')
        .instance()
        .classList.contains('dnb-form-status__variant--outlined')
    ).toBe(true)
  })

  it('should update children when they change', () => {
    const Comp = mount(<Component>content</Component>)

    Comp.setProps({ children: 'content-a' })

    expect(Comp.find('.dnb-form-status').instance().textContent).toBe(
      'content-a'
    )

    Comp.setProps({ children: 'content-b' })

    expect(Comp.find('.dnb-form-status').instance().textContent).toBe(
      'content-b'
    )
  })

  it('should have correct attributes once the "hidden" prop changes', async () => {
    const Comp = mount(<Component {...props} hidden />)
    expect(Comp.exists('[aria-hidden]')).toBe(true)
    // Deprecated: use the GlobalStatus and aria-live
    // expect(Comp.exists('[aria-live="assertive"]')).toBe(false)
    Comp.setProps({
      hidden: false,
    })
    // Deprecated: use the GlobalStatus and aria-live
    // expect(Comp.exists('[aria-live="assertive"]')).toBe(true)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('has to to have a text value as defined in the prop', () => {
    const Comp = mount(<Component {...props} />)
    expect(Comp.find('.dnb-form-status__text').text()).toBe(props.text)
  })
})

describe('FormStatus scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-form-status.scss'))
    expect(scss).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-form-status-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})

describe('FormStatus role', () => {
  it('should have role alert', () => {
    const Comp = mount(<Component text="status text" />)

    expect(
      Comp.find('.dnb-form-status').instance().getAttribute('role')
    ).toBe('alert')
  })

  it('should have role status when state is info', () => {
    const Comp = mount(<Component text="status text" state="info" />)

    expect(
      Comp.find('.dnb-form-status').instance().getAttribute('role')
    ).toBe('status')
  })

  it('should be able to override role', () => {
    const Comp = mount(<Component role="none" text="status text" />)

    expect(
      Comp.find('.dnb-form-status').instance().getAttribute('role')
    ).not.toBe('alert')
    expect(
      Comp.find('.dnb-form-status').instance().getAttribute('role')
    ).toBe('none')
  })
})
