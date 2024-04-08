/**
 * Component Test
 *
 */

import React from 'react'
import { axeComponent, loadScss, wait } from '../../../core/jest/jestSetup'
import { fireEvent, render } from '@testing-library/react'
import OriginalTooltip from '../Tooltip'
import Anchor from '../../anchor/Anchor'
import NumberFormat from '../../number-format/NumberFormat'
import { TooltipAllProps } from '../types'

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

const defaultProps: TooltipAllProps = {
  showDelay: 1,
  hideDelay: 1,
}

beforeEach(() => {
  globalThis.IS_TEST = false
})

describe('Tooltip', () => {
  const Tooltip = (props: TooltipAllProps = {}) => (
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
    const Tooltip = (props: TooltipAllProps) => (
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
    const Tooltip = (props: TooltipAllProps = {}) => (
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
      ).not.toBeInTheDocument()
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

        expect(getMainElem()).not.toHaveAttribute('aria-hidden')
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

        expect(getMainElem().classList).toContain('dnb-tooltip--active')

        fireEvent.mouseLeave(getMainElem())

        await wait(1)

        expect(getMainElem().classList).not.toContain(
          'dnb-tooltip--active'
        )
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

      expect(getMainElem().classList).toContain('dnb-tooltip--active')

      fireEvent.mouseLeave(buttonElem)
      fireEvent.mouseEnter(buttonElem)

      expect(getMainElem().classList).toContain('dnb-tooltip--active')

      fireEvent.mouseLeave(buttonElem)

      await wait(1)

      const classList = getMainElem().classList
      expect(classList).not.toContain('dnb-tooltip--active')
      expect(classList).toContain('dnb-tooltip--hide')
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

      expect(getMainElem().classList).toContain('dnb-tooltip--active')

      fireEvent.mouseLeave(getMainElem())

      await wait(1)

      expect(getMainElem().classList).not.toContain('dnb-tooltip--active')
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
      expect(wrapperElement.getAttribute('tabindex')).toBe('0')
      expect(Array.from(wrapperElement.classList)).toEqual([
        'dnb-tooltip__wrapper',
        'dnb-tab-focus',
      ])

      const tooltipElement = document.querySelector('.dnb-tooltip')
      expect(Array.from(tooltipElement.classList)).toEqual([
        'dnb-tooltip',
        'custom-class',
      ])

      const id = wrapperElement.getAttribute('aria-describedby')
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
        document.body.querySelector('#' + id).parentElement.classList
      ).toContain('dnb-tooltip--active')
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
        document.body.querySelector('#' + id).parentElement.classList
      ).toContain('dnb-tooltip--active')
    })
  })
})

describe('Tooltip scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-tooltip-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})
