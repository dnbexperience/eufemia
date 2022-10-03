/**
 * Component Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import { act, fireEvent, render } from '@testing-library/react'
import { wait } from '@testing-library/user-event/dist/utils'
import OriginalTooltip from '../Tooltip'
import Anchor from '../../../elements/Anchor'
import { TooltipProps } from '../types'

global.ResizeObserver = class {
  constructor() {
    //
  }
  disconnect() {
    //
  }
  observe() {
    //
  }
  unobserve() {
    //
  }
}

const defaultProps = {
  id: 'tooltip',
  showDelay: 0,
  hideDelay: 0,
}

beforeEach(() => {
  document.body.innerHTML = ''
})

describe('Tooltip', () => {
  const Tooltip = (props: TooltipProps = {}) => (
    <OriginalTooltip
      id="tooltip"
      showDelay={0}
      hideDelay={0}
      noAnimation
      targetElement={<button>Button</button>}
      {...props}
    >
      With snake_case props
    </OriginalTooltip>
  )

  it('supports snake_case props', () => {
    render(<Tooltip active skipPortal />)

    expect(document.body.querySelector('.dnb-tooltip').textContent).toBe(
      'With snake_case props'
    )
  })

  it('should have aria-hidden attribute', async () => {
    render(<Tooltip active />)

    const getMainElem = () => document.body.querySelector('.dnb-tooltip')

    expect(getMainElem().getAttribute('aria-hidden')).toBe('true')
  })

  it('should set size class', () => {
    render(
      <Tooltip active size="large">
        Tooltip
      </Tooltip>
    )

    expect(
      Array.from(document.querySelector('.dnb-tooltip').classList)
    ).toEqual(expect.arrayContaining(['dnb-tooltip--large']))
  })

  it('should set fixed position class', () => {
    render(
      <Tooltip active fixedPosition>
        Tooltip
      </Tooltip>
    )

    expect(
      Array.from(document.querySelector('.dnb-tooltip').classList)
    ).toEqual(expect.arrayContaining(['dnb-tooltip--fixed']))
  })

  it('should set position class', () => {
    render(
      <Tooltip active position="right">
        Tooltip
      </Tooltip>
    )

    expect(
      Array.from(document.querySelector('.dnb-tooltip__arrow').classList)
    ).toEqual(
      expect.arrayContaining([
        'dnb-tooltip__arrow__arrow--center',
        'dnb-tooltip__arrow__position--right',
      ])
    )
  })

  it('should set arrow class', () => {
    render(
      <Tooltip active arrow="right">
        Tooltip
      </Tooltip>
    )

    expect(
      Array.from(document.querySelector('.dnb-tooltip__arrow').classList)
    ).toEqual(
      expect.arrayContaining([
        'dnb-tooltip__arrow__arrow--right',
        'dnb-tooltip__arrow__position--top',
      ])
    )
  })

  describe('with targetSelector', () => {
    const Tooltip = (props: TooltipProps) => (
      <>
        <button id="button-id">Button</button>
        <OriginalTooltip
          {...defaultProps}
          {...props}
          targetSelector="#button-id"
        >
          Text
        </OriginalTooltip>
      </>
    )

    it('should validate with ARIA rules as a tooltip', async () => {
      const Component = render(<Tooltip active />)
      expect(await axeComponent(Component)).toHaveNoViolations()
    })

    it('should merge style prop', () => {
      render(
        <>
          <a className="anchor" href="/">
            anchor
          </a>

          {/**
           * The ignore is only temporary
           * and will be removed when rebasing with this PR https://github.com/dnbexperience/eufemia/pull/1590
           *
           * eslint-disable-line @typescript-eslint/ban-ts-comment
           * @ts-ignore */}
          <Tooltip active style={{ zIndex: 10 }} targetSelector=".anchor">
            Tooltip
          </Tooltip>
        </>
      )

      expect(
        document.querySelector('.dnb-tooltip').getAttribute('style')
      ).toBe('z-index: 10; left: 0px; top: 0px;')
    })
  })

  describe('with targetElement', () => {
    const Tooltip = (props: TooltipProps = {}) => (
      <OriginalTooltip
        {...defaultProps}
        {...props}
        targetElement={<button>Button</button>}
      >
        Text
      </OriginalTooltip>
    )

    it('creates a React Portal', () => {
      render(<Tooltip active />)

      expect(
        document.body.querySelectorAll('.dnb-tooltip__portal')
      ).toHaveLength(1)
      expect(document.body.querySelectorAll('.dnb-tooltip')).toHaveLength(
        1
      )
    })

    it('will skip React Portal when skipPortal is true', () => {
      render(<Tooltip active skipPortal />)

      expect(
        document.body.querySelectorAll('.dnb-tooltip__portal')
      ).toHaveLength(0)
    })

    it('should show when active prop is true', () => {
      const Tooltip = () => {
        const [active, setActive] = React.useState(false)

        return (
          <OriginalTooltip
            active={active}
            noAnimation
            targetElement={
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
          </OriginalTooltip>
        )
      }

      render(<Tooltip />)

      const getMainElem = () => document.body.querySelector('.dnb-tooltip')
      const buttonElem = document.querySelector('button')

      fireEvent.mouseEnter(buttonElem)

      expect(getMainElem().classList.contains('dnb-tooltip--active')).toBe(
        true
      )

      fireEvent.mouseLeave(buttonElem)
      fireEvent.mouseEnter(buttonElem)

      expect(getMainElem().classList.contains('dnb-tooltip--active')).toBe(
        true
      )

      fireEvent.mouseLeave(buttonElem)

      expect(getMainElem().classList.contains('dnb-tooltip--active')).toBe(
        false
      )
      expect(getMainElem().classList.contains('dnb-tooltip--hide')).toBe(
        true
      )
    })

    it('should set animate_position class', () => {
      render(<Tooltip animatePosition active />)

      const getMainElem = () => document.body.querySelector('.dnb-tooltip')

      expect(Array.from(getMainElem().classList)).toEqual(
        expect.arrayContaining([
          'dnb-tooltip',
          'dnb-tooltip--active',
          'dnb-tooltip--animate_position',
        ])
      )
    })

    it('should set fixed class', () => {
      render(<Tooltip fixedPosition active />)

      const getMainElem = () => document.body.querySelector('.dnb-tooltip')

      expect(Array.from(getMainElem().classList)).toEqual(
        expect.arrayContaining([
          'dnb-tooltip',
          'dnb-tooltip--active',
          'dnb-tooltip--fixed',
        ])
      )
    })

    describe('and group', () => {
      const commonProps: TooltipProps = {
        group: 'unique-name',
        noAnimation: true,
      }

      const GroupTooltip = (props) => {
        return (
          <>
            <OriginalTooltip
              targetElement={<button id="a">Button A</button>}
              {...commonProps}
              {...props}
            >
              Tooltip A
            </OriginalTooltip>

            <OriginalTooltip
              targetElement={<button id="b">Button B</button>}
              {...commonProps}
              {...props}
            >
              Tooltip B
            </OriginalTooltip>
          </>
        )
      }

      it('should only have one tooltip', () => {
        render(<GroupTooltip />)

        const allElements = () =>
          document.body.querySelectorAll('.dnb-tooltip')
        const getMainElem = () => allElements()[0]
        const buttonA = document.querySelector('button#a')
        const buttonB = document.querySelector('button#b')

        expect(allElements()).toHaveLength(0)

        fireEvent.mouseEnter(buttonA)

        expect(getMainElem().textContent).toBe('Tooltip A')
        expect(
          getMainElem().classList.contains('dnb-tooltip--active')
        ).toBe(true)

        fireEvent.mouseEnter(buttonB)

        expect(getMainElem().textContent).toBe('Tooltip B')
        expect(
          getMainElem().classList.contains('dnb-tooltip--active')
        ).toBe(true)

        fireEvent.mouseLeave(buttonB)

        expect(getMainElem().classList.contains('dnb-tooltip--hide')).toBe(
          true
        )
      })
    })

    it('should validate with ARIA rules as a tooltip', async () => {
      const Component = render(<Tooltip active />)
      expect(await axeComponent(Component)).toHaveNoViolations()
    })
  })

  describe('Anchor with tooltip', () => {
    it('has to be in the DOM so aria-describedby is valid', () => {
      render(
        <Anchor href="/url" target="_blank" lang="en-GB">
          text
        </Anchor>
      )

      const id = document
        .querySelector('a')
        .getAttribute('aria-describedby')
      expect(document.body.querySelectorAll('#' + id).length).toBe(1)
    })

    it('has to be visible on hover', async () => {
      render(
        <Anchor href="/url" target="_blank" lang="en-GB">
          text
        </Anchor>
      )

      await act(async () => {
        // hover
        document
          .querySelector('a')
          .dispatchEvent(new MouseEvent('mouseenter'))

        await wait(100)

        const id = document
          .querySelector('a')
          .getAttribute('aria-describedby')
        expect(
          document.body
            .querySelector('#' + id)
            .parentElement.classList.contains('dnb-tooltip--active')
        ).toBe(true)

        // leave hover
        document
          .querySelector('a')
          .dispatchEvent(new MouseEvent('mouseleave'))

        await wait(600)

        expect(
          document.body
            .querySelector('#' + id)
            .parentElement.classList.contains('dnb-tooltip--active')
        ).toBe(false)
      })
    })

    it('has to be visible on focus event dispatch', async () => {
      render(
        <Anchor href="/url" target="_blank" lang="en-GB">
          text
        </Anchor>
      )

      await act(async () => {
        document.documentElement.setAttribute(
          'data-whatintent',
          'keyboard'
        )
        const inst = document.querySelector('a')
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
