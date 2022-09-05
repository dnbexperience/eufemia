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
  attachToBody,
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
  id: 'tooltip',
  show_delay: 0,
  hide_delay: 0,
}

beforeEach(() => {
  document.body.innerHTML = ''
})

describe('Tooltip', () => {
  describe('with target', () => {
    const Component = (props = {}) => (
      <>
        <button id="button-id">Button</button>
        <Tooltip {...defaultProps} {...props} target_selector="#button-id">
          Text
        </Tooltip>
      </>
    )

    it('creates a React Portal', () => {
      mount(<Component active />, {
        attachTo: attachToBody(),
      })

      expect(
        document.body.querySelectorAll('.dnb-tooltip__portal')
      ).toHaveLength(1)
      expect(document.body.querySelectorAll('.dnb-tooltip')).toHaveLength(
        1
      )
    })

    it('will skip React Portal when skip_portal is true', () => {
      const Comp = mount(<Component active skip_portal />, {
        attachTo: attachToBody(),
      })

      expect(
        document.body.querySelectorAll('.dnb-tooltip__portal')
      ).toHaveLength(0)

      expect(toJson(Comp.find('.dnb-tooltip'))).toMatchSnapshot()
    })

    it('should validate with ARIA rules as a tooltip', async () => {
      const Comp = mount(<Component active />)
      expect(await axeComponent(Comp)).toHaveNoViolations()
    })
  })

  describe('with target_element', () => {
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
      const Comp = mount(<Component active />)
      expect(toJson(Comp)).toMatchSnapshot()
    })

    it('should validate with ARIA rules as a tooltip', async () => {
      const Comp = mount(<Component active />)
      expect(await axeComponent(Comp)).toHaveNoViolations()
    })

    it('should show when active prop is true', async () => {
      const Component = () => {
        const [active, setActive] = React.useState(false)

        return (
          <Tooltip
            active={active}
            show_delay={1}
            hide_delay={1}
            target_element={
              <button
                onMouseEnter={() => {
                  setActive(true)
                }}
                onMouseLeave={() => {
                  setActive(false)
                }}
              >
                Text
              </button>
            }
          >
            Tooltip
          </Tooltip>
        )
      }

      const Comp = mount(<Component />)

      const mainElem = document.body.querySelector('.dnb-tooltip')

      Comp.find('button').simulate('mouseenter')

      expect(mainElem.classList.contains('dnb-tooltip--active')).toBe(true)

      Comp.find('button').simulate('mouseleave')
      Comp.find('button').simulate('mouseenter')

      await wait(2)

      expect(mainElem.classList.contains('dnb-tooltip--active')).toBe(true)

      Comp.find('button').simulate('mouseleave')

      await wait(2)

      expect(mainElem.classList.contains('dnb-tooltip--hide')).toBe(true)
    })
  })

  describe('Anchor with tooltip', () => {
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
