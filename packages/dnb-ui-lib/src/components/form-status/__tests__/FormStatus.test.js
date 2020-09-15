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
  loadScss
} from '../../../core/jest/jestSetup'
import Component from '../FormStatus'
import Input from '../../Input'

const props = fakeProps(require.resolve('../FormStatus'), {
  optional: true,
  all: true
})
props.id = 'form-status'
props.text = 'text'
props.state = 'error'
props.status = null
props.global_status_id = 'main'
props.hidden = false
props.icon = 'exclamation'

describe('FormStatus component', () => {
  const Comp = mount(<Component {...props} />)

  it('have to match snapshot', () => {
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should validate with ARIA rules', async () => {
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('should set correact max-width', () => {
    const Comp = mount(
      <Input status="Long status pulvinar per ad varius nostra faucibus enim ante posuere in" />
    )

    // mock call the setMaxWidth since document.getElementById is not an option
    const instance = Comp.find('FormStatus').instance()
    instance.setMaxWidth({
      offsetWidth: 64 // pixels
    })

    // now, setMaxWidth should have set an inline style with an "max-width as rem"
    expect(
      Comp.find('.dnb-form-status').instance().getAttribute('style')
    ).toBe('max-width: 6rem;') // 4rem + 2rem
  })

  it('should have correact attributes once the "hidden" prop changes', async () => {
    const Comp = mount(<Component {...props} hidden />)
    expect(Comp.exists('[aria-hidden]')).toBe(true)
    // Deprecated: use the GlobalStatus and aria-live
    // expect(Comp.exists('[aria-live="assertive"]')).toBe(false)
    Comp.setProps({
      hidden: false
    })
    // Deprecated: use the GlobalStatus and aria-live
    // expect(Comp.exists('[aria-live="assertive"]')).toBe(true)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  it('has to to have a text value as defined in the prop', () => {
    expect(Comp.find('.dnb-form-status--text').text()).toBe(props.text)
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
