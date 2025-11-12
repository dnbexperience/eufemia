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

    expect(qS('.dnb-tooltip__portal')).toHaveLength(2)
    expect(qS('.dnb-tooltip')).toHaveLength(2)

    fireEvent.click(document.querySelector('#toggle'))

    expect(qS('.dnb-tooltip__portal')).toHaveLength(0)
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
        targetElement={<button>Button</button>}
        {...defaultProps}
        {...props}
      />
    )

    it('should not set style when not active', () => {
      render(<Tooltip />)

      expect(
        document.querySelector('.dnb-tooltip').getAttribute('style')
      ).toBeNull()
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

    describe('portalRootClass', () => {
      it('should apply portalRootClass to the portal root element', () => {
        render(<Tooltip active portalRootClass="custom-portal-class" />)

        const portalRoot = document.querySelector(
          '.dnb-tooltip__portal.custom-portal-class'
        )
        expect(portalRoot).toBeInTheDocument()
      })

      it('should not affect styling when not provided', () => {
        render(<Tooltip active />)

        const portalRoot = document.querySelector('.dnb-tooltip__portal')
        expect(portalRoot.classList.length).toBe(1) // Only has 'dnb-tooltip__portal'
      })

      it('should work with multiple class names', () => {
        render(
          <Tooltip active portalRootClass="class-one class-two custom" />
        )

        const portalRoot = document.querySelector(
          '.dnb-tooltip__portal.class-one'
        )
        expect(portalRoot).toBeInTheDocument()
        expect(portalRoot.classList).toContain('class-two')
        expect(portalRoot.classList).toContain('custom')
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

    it('should not register click or mousedown on the target', () => {
      const originalAdd = HTMLElement.prototype.addEventListener
      const calls: Array<{
        self: EventTarget
        type: string
      }> = []

      const spy = jest
        .spyOn(HTMLElement.prototype, 'addEventListener')
        .mockImplementation(function (
          this: EventTarget,
          type: string,
          listener: EventListenerOrEventListenerObject,
          options?: boolean | AddEventListenerOptions
        ) {
          calls.push({ self: this, type })
          return originalAdd.call(this, type, listener, options)
        })

      try {
        render(<Tooltip />)

        const button = document.querySelector('button')
        const targetCalls = calls.filter((c) => c.self === button)
        const hasClickOrMouseDown = targetCalls.some(
          (c) => c.type === 'click' || c.type === 'mousedown'
        )

        expect(hasClickOrMouseDown).toBe(false)
      } finally {
        spy.mockRestore()
      }
    })

    it('should validate with ARIA rules as a tooltip', async () => {
      const Component = render(<Tooltip active />)
      expect(await axeComponent(Component)).toHaveNoViolations()
    })

    it('should ignore DOM events when active initially is true (controlled)', async () => {
      render(<Tooltip active />)

      const buttonElem = document.querySelector('button')

      // Initially active due to controlled prop
      expect(getMainElem().classList).toContain('dnb-tooltip--active')

      // DOM events should not change visibility when controlled
      fireEvent.mouseLeave(buttonElem)
      await wait(1)
      expect(getMainElem().classList).toContain('dnb-tooltip--active')

      fireEvent.mouseEnter(buttonElem)
      await wait(1)
      expect(getMainElem().classList).toContain('dnb-tooltip--active')
      expect(getMainElem().classList).not.toContain('dnb-tooltip--hide')
    })

    it('should ignore DOM events when active initially is false (controlled)', async () => {
      render(<Tooltip active={false} />)

      const buttonElem = document.querySelector('button')

      // Initially not active due to controlled prop
      expect(getMainElem().classList).not.toContain('dnb-tooltip--active')
      expect(getMainElem().classList).not.toContain('dnb-tooltip--hide')

      // DOM events should not change visibility when controlled
      fireEvent.mouseEnter(buttonElem)
      await wait(1)
      expect(getMainElem().classList).not.toContain('dnb-tooltip--active')

      fireEvent.mouseLeave(buttonElem)
      await wait(1)
      expect(getMainElem().classList).not.toContain('dnb-tooltip--active')
      expect(getMainElem().classList).not.toContain('dnb-tooltip--hide')
    })

    describe('omitDescribedBy', () => {
      it('should set aria-describedby on target element by default', () => {
        render(
          <Tooltip active showDelay={0}>
            Tooltip content
          </Tooltip>
        )

        const buttonElem = document.querySelector('button')
        const ariaDescribedBy = buttonElem.getAttribute('aria-describedby')

        expect(ariaDescribedBy).toBeTruthy()
        expect(ariaDescribedBy).toContain('tooltip')
      })

      it('should not set aria-describedby when omitDescribedBy is true', () => {
        render(
          <Tooltip active showDelay={0} omitDescribedBy>
            Tooltip content
          </Tooltip>
        )

        const buttonElem = document.querySelector('button')
        const ariaDescribedBy = buttonElem.getAttribute('aria-describedby')

        expect(ariaDescribedBy).toBeNull()
      })

      it('should not set aria-describedby when omitDescribedBy is true with targetSelector', () => {
        render(
          <>
            <button id="test-button">Button</button>
            <OriginalTooltip
              {...defaultProps}
              active
              showDelay={0}
              omitDescribedBy
              targetSelector="#test-button"
            >
              Tooltip content
            </OriginalTooltip>
          </>
        )

        const buttonElem = document.querySelector('#test-button')
        const ariaDescribedBy = buttonElem.getAttribute('aria-describedby')

        expect(ariaDescribedBy).toBeNull()
      })

      it('should preserve existing aria-describedby when omitDescribedBy is true', () => {
        const buttonWithAria = (
          <button aria-describedby="existing-id">Button</button>
        )

        render(
          <Tooltip
            active
            showDelay={0}
            omitDescribedBy
            targetElement={buttonWithAria}
          >
            Tooltip content
          </Tooltip>
        )

        const buttonElem = document.querySelector('button')
        const ariaDescribedBy =
          buttonElem?.getAttribute('aria-describedby')

        expect(ariaDescribedBy).toBe('existing-id')
      })
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
