/**
 * Component Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import { fireEvent, render } from '@testing-library/react'
import { wait } from '@testing-library/user-event/dist/utils'
import OriginalTooltip from '../Tooltip'
import Anchor from '../../../elements/Anchor'
import NumberFormat from '../../number-format/NumberFormat'
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
  showDelay: 1,
  hideDelay: 1,
}

beforeEach(() => {
  document.body.innerHTML = ''
  globalThis.IS_TEST = false
})

describe('Tooltip', () => {
  const Tooltip = (props: TooltipProps = {}) => (
    <OriginalTooltip
      id="tooltip"
      noAnimation
      targetElement={<button>Button</button>}
      {...defaultProps}
      {...props}
    />
  )

  const getMainElem = () => document.body.querySelector('.dnb-tooltip')

  it('supports snake_case props', () => {
    render(
      <Tooltip skipPortal active>
        With snake_case props
      </Tooltip>
    )

    expect(document.body.querySelector('.dnb-tooltip').textContent).toBe(
      'With snake_case props'
    )
  })

  it('should have aria-hidden attribute', async () => {
    render(<Tooltip active />)

    expect(getMainElem().getAttribute('aria-hidden')).toBe('true')
  })

  it('should have role="tooltip" attribute', async () => {
    render(<Tooltip active />)

    expect(getMainElem().getAttribute('role')).toBe('tooltip')
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

  it('should remove unmounted portal parts', () => {
    const Component = () => {
      const [mounted, setMounted] = React.useState(true)
      const onClickHandler = () => {
        setMounted(!mounted)
      }

      return (
        <>
          <button id="toggle" onClick={onClickHandler}>
            Toggle
          </button>
          {mounted && (
            <>
              <Tooltip active>Tooltip 1</Tooltip>
              <Tooltip active>Tooltip 2</Tooltip>
            </>
          )}
        </>
      )
    }

    render(<Component />)

    const qS = (s: string) => document.querySelectorAll(s)

    expect(qS('.dnb-tooltip__portal')).toHaveLength(1)
    expect(qS('.dnb-tooltip')).toHaveLength(2)

    fireEvent.click(document.querySelector('#toggle'))

    expect(qS('.dnb-tooltip__portal')).toHaveLength(1)
    expect(qS('.dnb-tooltip')).toHaveLength(0)
  })

  it('should remove unmounted group parts', () => {
    const Component = () => {
      const [mounted, setMounted] = React.useState(true)
      const onClickHandler = () => {
        setMounted(!mounted)
      }

      return (
        <>
          <button id="toggle" onClick={onClickHandler}>
            Toggle
          </button>
          {mounted && (
            <>
              <Tooltip active group="unique">
                Tooltip 1
              </Tooltip>
              <Tooltip active group="unique">
                Tooltip 2
              </Tooltip>
            </>
          )}
        </>
      )
    }

    render(<Component />)

    const qS = (s: string) => document.querySelectorAll(s)

    expect(qS('.dnb-tooltip__portal')).toHaveLength(1)
    expect(qS('.dnb-tooltip__group')).toHaveLength(1)
    expect(qS('.dnb-tooltip')).toHaveLength(1)

    fireEvent.click(document.querySelector('#toggle'))

    expect(qS('.dnb-tooltip__portal')).toHaveLength(1)
    expect(qS('.dnb-tooltip__group')).toHaveLength(0)
    expect(qS('.dnb-tooltip')).toHaveLength(0)
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
          id="tooltip"
          {...defaultProps}
          {...props}
          targetSelector="#button-id"
        />
      </>
    )

    it('should validate with ARIA rules as a tooltip', async () => {
      const Component = render(<Tooltip active />)
      expect(await axeComponent(Component)).toHaveNoViolations()
    })

    it('should merge style prop', () => {
      render(
        <Tooltip active style={{ zIndex: 10 }}>
          Tooltip
        </Tooltip>
      )

      expect(
        document.querySelector('.dnb-tooltip').getAttribute('style')
      ).toBe('z-index: 10; left: 0px; top: 0px;')
    })
  })

  describe('with targetElement', () => {
    const Tooltip = (props: TooltipProps = {}) => (
      <OriginalTooltip
        id="tooltip"
        {...defaultProps}
        {...props}
        targetElement={<button>Button</button>}
      />
    )

    it('should not set style when not active', () => {
      render(<Tooltip />)

      expect(
        document.querySelector('.dnb-tooltip').getAttribute('style')
      ).toBeFalsy()
    })

    it('creates a React Portal', () => {
      render(<Tooltip active />)

      expect(
        document.body.querySelectorAll('.dnb-tooltip__portal')
      ).toHaveLength(1)
      expect(document.body.querySelectorAll('.dnb-tooltip')).toHaveLength(
        1
      )
    })

    describe('skipPortal', () => {
      it('will skip React Portal', () => {
        render(<Tooltip skipPortal active />)

        expect(
          document.body.querySelectorAll('.dnb-tooltip__portal')
        ).toHaveLength(0)
      })

      it('will not have aria-hidden', () => {
        render(<OriginalTooltip skipPortal active />)

        expect(getMainElem().getAttribute('aria-hidden')).toBeFalsy()
      })

      it('should stay visible when mouse enters the Tooltip', async () => {
        render(<Tooltip />)

        const buttonElem = document.querySelector('button')

        fireEvent.mouseEnter(buttonElem)
        await wait(100)

        fireEvent.mouseLeave(buttonElem)

        // Prevent it from hiding
        fireEvent.mouseEnter(getMainElem())

        await wait(1)

        expect(
          getMainElem().classList.contains('dnb-tooltip--active')
        ).toBe(true)

        fireEvent.mouseLeave(getMainElem())

        await wait(1)

        expect(
          getMainElem().classList.contains('dnb-tooltip--active')
        ).toBe(false)
      })
    })

    it('should show when active prop is true', async () => {
      const Tooltip = () => {
        const [active, setActive] = React.useState(false)

        return (
          <OriginalTooltip
            {...defaultProps}
            active={active}
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
          />
        )
      }

      render(<Tooltip />)

      const buttonElem = document.querySelector('button')

      fireEvent.mouseEnter(buttonElem)

      await wait(100)

      expect(getMainElem().classList.contains('dnb-tooltip--active')).toBe(
        true
      )

      fireEvent.mouseLeave(buttonElem)
      fireEvent.mouseEnter(buttonElem)

      expect(getMainElem().classList.contains('dnb-tooltip--active')).toBe(
        true
      )

      fireEvent.mouseLeave(buttonElem)

      await wait(1)

      const classList = getMainElem().classList
      expect(classList.contains('dnb-tooltip--active')).toBe(false)
      expect(classList.contains('dnb-tooltip--hide')).toBe(true)
    })

    it('should stay visible when mouse enters the Tooltip', async () => {
      render(<Tooltip />)

      const buttonElem = document.querySelector('button')

      fireEvent.mouseEnter(buttonElem)
      await wait(100)

      fireEvent.mouseLeave(buttonElem)

      // Prevent it from hiding
      fireEvent.mouseEnter(getMainElem())

      await wait(1)

      expect(getMainElem().classList.contains('dnb-tooltip--active')).toBe(
        true
      )

      fireEvent.mouseLeave(getMainElem())

      await wait(1)

      expect(getMainElem().classList.contains('dnb-tooltip--active')).toBe(
        false
      )
    })

    it('should set animate_position class', () => {
      render(<Tooltip animatePosition active />)

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

      const GroupTooltip = (props: TooltipProps) => {
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

      it('should only have one tooltip', async () => {
        render(<GroupTooltip noAnimation={false} {...defaultProps} />)

        const allElements = () =>
          document.body.querySelectorAll('.dnb-tooltip')
        const buttonA = document.querySelector('button#a')
        const buttonB = document.querySelector('button#b')

        expect(allElements()).toHaveLength(0)

        fireEvent.mouseEnter(buttonA)

        await wait(100)

        expect(getMainElem().textContent).toBe('Tooltip A')
        expect(
          getMainElem().classList.contains('dnb-tooltip--active')
        ).toBe(true)

        fireEvent.mouseEnter(buttonB)

        await wait(100)

        expect(getMainElem().textContent).toBe('Tooltip B')
        expect(
          getMainElem().classList.contains('dnb-tooltip--active')
        ).toBe(true)

        fireEvent.mouseLeave(buttonB)

        await wait(1)

        const classList = getMainElem().classList
        expect(classList.contains('dnb-tooltip--active')).toBe(false)
        expect(classList.contains('dnb-tooltip--hide')).toBe(true)
      })
    })

    it('should validate with ARIA rules as a tooltip', async () => {
      const Component = render(<Tooltip active />)
      expect(await axeComponent(Component)).toHaveNoViolations()
    })
  })

  describe('NumberFormat with tooltip', () => {
    it('will get wrapped with dnb-tooltip__wrapper', () => {
      render(
        <NumberFormat
          tooltip={
            <Tooltip {...defaultProps} className="custom-class">
              Tooltip for this NumberFormat
            </Tooltip>
          }
        >
          5678
        </NumberFormat>
      )

      const wrapperElement = document.querySelector(
        '.dnb-tooltip__wrapper'
      )
      const tooltipElement = document.querySelector('.dnb-tooltip')
      const numberFormatElement = wrapperElement.querySelector(
        '.dnb-number-format__visible'
      )
      const id = numberFormatElement.getAttribute('aria-describedby')

      expect(wrapperElement.getAttribute('tabindex')).toBe('0')
      expect(Array.from(wrapperElement.classList)).toEqual([
        'dnb-tooltip__wrapper',
        'dnb-tab-focus',
      ])
      expect(Array.from(tooltipElement.classList)).toEqual([
        'dnb-tooltip',
        'custom-class',
      ])
      expect(document.body.querySelectorAll('#' + id).length).toBe(1)
    })

    it('has to have active class on focus', async () => {
      render(
        <NumberFormat
          tooltip={
            <Tooltip {...defaultProps}>
              Tooltip for this NumberFormat
            </Tooltip>
          }
        >
          1234
        </NumberFormat>
      )

      fireEvent.focus(document.querySelector('.dnb-tooltip__wrapper'))

      await wait(200) // because of visibility delay

      const wrapperElement = document.querySelector(
        '.dnb-tooltip__wrapper'
      )
      const id = wrapperElement.getAttribute('aria-describedby')

      expect(
        document.body
          .querySelector('#' + id)
          .parentElement.classList.contains('dnb-tooltip--active')
      ).toBe(true)
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

      const getContentElement = () => {
        const id = document
          .querySelector('a')
          .getAttribute('aria-describedby')

        return document.body.querySelector('#' + id).parentElement
      }

      fireEvent.mouseEnter(document.querySelector('a'))

      await wait(200)

      expect(Array.from(getContentElement().classList)).toEqual([
        'dnb-tooltip',
        'dnb-tooltip--active',
      ])

      fireEvent.mouseLeave(document.querySelector('a'))

      await wait(600)

      expect(Array.from(getContentElement().classList)).toEqual([
        'dnb-tooltip',
        'dnb-tooltip--hide',
      ])
    })

    it('has to be visible on focus event dispatch', async () => {
      render(
        <Anchor href="/url" target="_blank" lang="en-GB">
          text
        </Anchor>
      )

      const element = document.querySelector('a')
      fireEvent.focus(element)

      await wait(200) // because of visibility delay

      const id = element.getAttribute('aria-describedby')
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
