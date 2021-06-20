/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  toJson,
  axeComponent,
  loadScss,
} from '../../../core/jest/jestSetup'
import Tooltip from '../Tooltip'
import Anchor from '../../../elements/Anchor'

global.ResizeObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

const defaultProps = {
  target_element: null,
  id: 'tooltip',
}

describe('Tooltip component with target_element', () => {
  const Component = (props = {}) => (
    <Tooltip
      {...defaultProps}
      {...props}
      target_element={<button>Button</button>}
    >
      Text
    </Tooltip>
  )
  it('have to match default tooltip snapshot', () => {
    const Comp = mount(<Component />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('should validate with ARIA rules as a tooltip', async () => {
    const Comp = mount(<Component />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Tooltip component with target', () => {
  const Component = (props = {}) => (
    <>
      <button id="button">Button</button>
      <Tooltip {...defaultProps} {...props} target="#button">
        Text
      </Tooltip>
    </>
  )

  it('has to be in the DOM so aria-describedby is valid', () => {
    const Comp = mount(
      <Anchor href="/url" target="_blank" lang="en-GB">
        text
      </Anchor>
    )

    const id = Comp.find('a').instance().getAttribute('aria-describedby')
    expect(document.body.querySelectorAll('#' + id).length).toBe(1)
  })

  it('has to be visible on hover', async () => {
    const Comp = mount(
      <Anchor href="/url" target="_blank" lang="en-GB">
        text
      </Anchor>
    )

    // hover
    Comp.find('a').instance().dispatchEvent(new MouseEvent('mouseenter'))

    await wait(100)

    const id = Comp.find('a').instance().getAttribute('aria-describedby')
    expect(
      document.body
        .querySelector('#' + id)
        .parentElement.classList.contains('dnb-tooltip--active')
    ).toBe(true)

    // leave hover
    Comp.find('a').instance().dispatchEvent(new MouseEvent('mouseleave'))

    await wait(600)

    expect(
      document.body
        .querySelector('#' + id)
        .parentElement.classList.contains('dnb-tooltip--active')
    ).toBe(false)
  })

  it('has to be visible on focus event dispatch', async () => {
    const Comp = mount(
      <Anchor href="/url" target="_blank" lang="en-GB">
        text
      </Anchor>
    )

    document.documentElement.setAttribute('data-whatintent', 'keyboard')
    const inst = Comp.find('a').instance()
    inst.dispatchEvent(new Event('focus'))

    await wait(400) // because of visibility delay

    const id = inst.getAttribute('aria-describedby')
    expect(
      document.body
        .querySelector('#' + id)
        .parentElement.classList.contains('dnb-tooltip--active')
    ).toBe(true)
  })

  it('should validate with ARIA rules as a tooltip', async () => {
    const Comp = mount(<Component />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Tooltip scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-tooltip.scss'))
    expect(scss).toMatchSnapshot()
  })
  it('have to match default theme snapshot', () => {
    const scss = loadScss(
      require.resolve('../style/themes/dnb-tooltip-theme-ui.scss')
    )
    expect(scss).toMatchSnapshot()
  })
})

const wait = (t) => new Promise((r) => setTimeout(r, t))
