/**
 * Component Test
 *
 */

import React from 'react'
import { axeComponent, loadScss, wait } from '../../../core/jest/jestSetup'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import OriginalTooltip from '../Tooltip'
import Anchor from '../../anchor/Anchor'
import NumberFormat from '../../number-format/NumberFormat'
import Popover, * as PopoverModule from '../../popover/Popover'
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
        'dnb-tooltip__arrow__placement--right',
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
        'dnb-tooltip__arrow__placement--top',
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
      render(<Tooltip keepInDOM />)

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

    it('renders tooltip content from tooltip prop without children', async () => {
      render(<Tooltip active tooltip="Tooltip prop content" />)

      await waitFor(() => {
        expect(getMainElem()).toHaveTextContent('Tooltip prop content')
      })
    })

    describe('skipPortal', () => {
      it('will skip React Portal', () => {
        render(<Tooltip skipPortal active />)

        expect(
          document.body.querySelectorAll('.dnb-tooltip__portal')
        ).toHaveLength(0)
      })

      it('will not have aria-hidden', () => {
        render(<Tooltip skipPortal active />)

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

        await waitFor(() => {
          expect(getMainElem().classList).toContain('dnb-tooltip--active')
        })

        expect(getMainElem().classList).toContain('dnb-tooltip--active')

        fireEvent.mouseLeave(getMainElem())

        await waitFor(() => {
          expect(getMainElem().classList).not.toContain(
            'dnb-tooltip--active'
          )
        })
      })

      it('remains active when forceActive is true', async () => {
        render(<Tooltip forceActive active={false} />)

        await waitFor(() => {
          expect(getMainElem().classList).toContain('dnb-tooltip--active')
        })
      })
    })

    describe('keepInDOM', () => {
      it('should remove tooltip from DOM when inactive by default', async () => {
        const { rerender } = render(<Tooltip active />)

        await waitFor(() => document.querySelector('.dnb-tooltip'), {
          timeout: 3000,
        })

        rerender(<Tooltip active={false} />)

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-tooltip')
          ).not.toBeInTheDocument()
        })
      })

      it('should keep tooltip in DOM when keepInDOM is true even when inactive', async () => {
        const { rerender } = render(<Tooltip keepInDOM active />)

        const tooltipElement = await waitFor(
          () => document.querySelector('.dnb-tooltip'),
          { timeout: 3000 }
        )
        expect(tooltipElement).toBeInTheDocument()

        rerender(<Tooltip keepInDOM active={false} />)

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-tooltip')
          ).toBeInTheDocument()
        })
      })

      it('should keep inline tooltip when keepInDOM is true and skipPortal is true', async () => {
        const { rerender } = render(
          <Tooltip keepInDOM skipPortal={true} active />
        )

        const tooltipElement = await waitFor(
          () => document.querySelector('.dnb-tooltip'),
          { timeout: 3000 }
        )
        expect(tooltipElement).toBeInTheDocument()

        rerender(<Tooltip keepInDOM skipPortal={true} active={false} />)

        expect(document.querySelector('.dnb-tooltip')).toBeInTheDocument()
        expect(
          document.body.querySelector('.dnb-tooltip__portal')
        ).not.toBeInTheDocument()
      })

      it('should unmount inline tooltip when keepInDOM is false and skipPortal is true', async () => {
        const { rerender } = render(
          <Tooltip keepInDOM={false} skipPortal={true} active />
        )

        await waitFor(() => document.querySelector('.dnb-tooltip'), {
          timeout: 3000,
        })

        rerender(
          <Tooltip keepInDOM={false} skipPortal={true} active={false} />
        )

        await waitFor(() => {
          expect(
            document.querySelector('.dnb-tooltip')
          ).not.toBeInTheDocument()
        })
      })
    })

    describe('aria-describedby fallback', () => {
      it('does not set aria-describedby when tooltip is inactive', () => {
        render(
          <Tooltip showDelay={0} hideDelay={0}>
            Tooltip content
          </Tooltip>
        )

        const buttonElem = document.querySelector('button')
        const describedById = buttonElem.getAttribute('aria-describedby')

        expect(describedById).toBeNull()
      })

      it('uses span element for AriaLive to avoid DOM nesting issues', () => {
        render(
          <Tooltip showDelay={0} hideDelay={0} active>
            Tooltip content
          </Tooltip>
        )

        const buttonElem = document.querySelector('button')
        const describedById = buttonElem.getAttribute('aria-describedby')

        // When active, aria-describedby points to the tooltip id
        expect(describedById).toBeTruthy()
        const tooltipElement = document.getElementById(describedById)
        expect(tooltipElement).toBeInTheDocument()
        expect(tooltipElement.parentElement).toHaveClass('dnb-tooltip')

        // AriaLive should use span instead of section to avoid nesting issues in <p> tags
        const ariaLiveSpan = document.querySelector('.dnb-aria-live')
        expect(ariaLiveSpan).toBeInTheDocument()
        expect(ariaLiveSpan.tagName.toLowerCase()).toBe('span')
      })

      it('switches aria-describedby to the tooltip content when it becomes active', async () => {
        render(<Tooltip {...defaultProps}>Tooltip content</Tooltip>)

        const buttonElem = document.querySelector('button')
        fireEvent.mouseEnter(buttonElem)

        await waitFor(() => {
          const describedById =
            buttonElem.getAttribute('aria-describedby') || ''
          const tooltipContent = document.getElementById(describedById)
          expect(tooltipContent).toBeInTheDocument()
          expect(tooltipContent?.parentElement).toHaveClass('dnb-tooltip')
        })
      })

      it('announces tooltip content via AriaLive when tooltip becomes active', async () => {
        render(
          <Tooltip showDelay={0} hideDelay={0}>
            Copied
          </Tooltip>
        )

        const buttonElem = document.querySelector('button')

        // When tooltip is inactive, aria-describedby should not be set
        expect(buttonElem.getAttribute('aria-describedby')).toBeNull()

        // Find AriaLive element (it doesn't have an id anymore)
        const ariaLiveElement = document.querySelector('.dnb-aria-live')

        expect(ariaLiveElement).toBeInTheDocument()
        expect(ariaLiveElement).toHaveAttribute('aria-live', 'polite')

        // When tooltip is inactive, AriaLive shows null
        expect(ariaLiveElement).toHaveTextContent('')

        // Activate the tooltip
        fireEvent.mouseEnter(buttonElem)

        // Wait for tooltip to become active
        await waitFor(() => {
          // aria-describedby should now point to the tooltip id
          const describedById = buttonElem.getAttribute('aria-describedby')
          expect(describedById).toBeTruthy()
          const tooltipElement = document.getElementById(describedById)
          expect(tooltipElement).toBeInTheDocument()
        })

        // Wait for AriaLive to show content
        await waitFor(() => {
          expect(ariaLiveElement).toHaveTextContent('Copied')
        })

        // Verify aria-live attributes are set for screen reader announcement
        expect(ariaLiveElement).toHaveAttribute('aria-live', 'polite')
        expect(ariaLiveElement).toHaveAttribute('aria-atomic', 'true')
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
        expect(Array.from(portalRoot.classList)).toEqual(
          expect.arrayContaining([
            'dnb-tooltip__portal',
            'dnb-popover__portal',
          ])
        )
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

      await waitFor(() => {
        expect(getMainElem().classList).toContain('dnb-tooltip--active')
      })

      fireEvent.mouseLeave(buttonElem)
      fireEvent.mouseEnter(buttonElem)

      expect(getMainElem().classList).toContain('dnb-tooltip--active')

      fireEvent.mouseLeave(buttonElem)

      await waitFor(() => {
        const classList = getMainElem().classList
        expect(classList).not.toContain('dnb-tooltip--active')
        expect(classList).toContain('dnb-tooltip--hide')
      })
    })

    it('should stay visible when mouse enters the Tooltip', async () => {
      render(<Tooltip />)

      const buttonElem = document.querySelector('button')

      fireEvent.mouseEnter(buttonElem)
      await wait(100)

      fireEvent.mouseLeave(buttonElem)

      // Prevent it from hiding
      fireEvent.mouseEnter(getMainElem())

      await waitFor(() => {
        expect(getMainElem().classList).toContain('dnb-tooltip--active')
      })

      fireEvent.mouseLeave(getMainElem())

      await waitFor(() => {
        expect(getMainElem().classList).not.toContain(
          'dnb-tooltip--active'
        )
      })
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
      await waitFor(() => {
        expect(getMainElem().classList).toContain('dnb-tooltip--active')
      })

      fireEvent.mouseEnter(buttonElem)
      await waitFor(() => {
        expect(getMainElem().classList).toContain('dnb-tooltip--active')
      })
      expect(getMainElem().classList).not.toContain('dnb-tooltip--hide')
    })

    it('should ignore DOM events when active initially is false (controlled)', async () => {
      render(<Tooltip active={false} />)

      const buttonElem = document.querySelector('button')

      // Initially not active due to controlled prop
      expect(document.querySelector('.dnb-tooltip')).toBeNull()

      // DOM events should not change visibility when controlled
      fireEvent.mouseEnter(buttonElem)
      await waitFor(() => {
        expect(document.querySelector('.dnb-tooltip')).toBeNull()
      })

      fireEvent.mouseLeave(buttonElem)
      await waitFor(() => {
        expect(document.querySelector('.dnb-tooltip')).toBeNull()
      })
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

      it('should set aria-describedby even when omitDescribedBy is true (prop is ignored)', () => {
        render(
          <Tooltip active showDelay={0} omitDescribedBy>
            Tooltip content
          </Tooltip>
        )

        const buttonElem = document.querySelector('button')
        const ariaDescribedBy = buttonElem.getAttribute('aria-describedby')

        // omitDescribedBy is no longer handled in TooltipWithEvents
        expect(ariaDescribedBy).toBeTruthy()
        expect(ariaDescribedBy).toContain('tooltip')
      })

      it('should set aria-describedby even when omitDescribedBy is true with targetSelector (prop is ignored)', () => {
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

        // omitDescribedBy is no longer handled in TooltipWithEvents
        expect(ariaDescribedBy).toBeTruthy()
      })

      it('should combine existing aria-describedby with tooltip id when omitDescribedBy is true (prop is ignored)', () => {
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

        // omitDescribedBy is no longer handled, so aria-describedby includes both
        expect(ariaDescribedBy).toContain('existing-id')
        expect(ariaDescribedBy).toContain('tooltip')
      })
    })
  })

  describe('NumberFormat with tooltip', () => {
    it('will get wrapped with dnb-tooltip__wrapper', async () => {
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

      fireEvent.mouseEnter(wrapperElement)

      const tooltipElement = await waitFor(() => {
        const node = document.querySelector(
          '.dnb-tooltip'
        ) as HTMLElement | null
        if (!node) {
          throw new Error('Tooltip not rendered')
        }
        return node
      })
      expect(Array.from(tooltipElement.classList)).toEqual(
        expect.arrayContaining(['dnb-tooltip', 'custom-class'])
      )

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

      await waitFor(() => {
        expect(getMainElem().classList).toContain('dnb-tooltip--active')
      })

      const wrapperElement = document.querySelector(
        '.dnb-tooltip__wrapper'
      )
      const id = wrapperElement.getAttribute('aria-describedby')

      expect(
        document.body.querySelector('#' + id).parentElement.classList
      ).toContain('dnb-tooltip--active')
    })
  })

  describe('positioning and viewport gutter', () => {
    const widthAttr = 'data-tooltip-test-width'
    const heightAttr = 'data-tooltip-test-height'
    const originalOffsetWidth = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'offsetWidth'
    )
    const originalOffsetHeight = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      'offsetHeight'
    )

    const getAttrValue = (
      element: HTMLElement,
      attr: string
    ): number | null => {
      const value =
        typeof element.getAttribute === 'function'
          ? element.getAttribute(attr)
          : null
      if (!value) {
        return null
      }
      const parsed = parseFloat(value)
      return Number.isNaN(parsed) ? null : parsed
    }

    beforeAll(() => {
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
        configurable: true,
        get(this: HTMLElement) {
          const attrValue = getAttrValue(this, widthAttr)
          if (attrValue !== null) {
            return attrValue
          }
          return originalOffsetWidth?.get
            ? originalOffsetWidth.get.call(this)
            : 0
        },
      })

      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
        configurable: true,
        get(this: HTMLElement) {
          const attrValue = getAttrValue(this, heightAttr)
          if (attrValue !== null) {
            return attrValue
          }
          return originalOffsetHeight?.get
            ? originalOffsetHeight.get.call(this)
            : 0
        },
      })
    })

    afterAll(() => {
      if (originalOffsetWidth) {
        Object.defineProperty(
          HTMLElement.prototype,
          'offsetWidth',
          originalOffsetWidth
        )
      }
      if (originalOffsetHeight) {
        Object.defineProperty(
          HTMLElement.prototype,
          'offsetHeight',
          originalOffsetHeight
        )
      }
    })

    it('repositions tooltip to maintain viewport gutter on resize', async () => {
      const originalInnerWidth = window.innerWidth
      const setInnerWidth = (value: number) =>
        Object.defineProperty(window, 'innerWidth', {
          configurable: true,
          value,
        })
      setInnerWidth(500)

      const target = document.createElement('button')
      document.body.appendChild(target)
      const originalBodyRect = document.body.getBoundingClientRect.bind(
        document.body
      )
      document.body.getBoundingClientRect = () => ({
        width: window.innerWidth,
        height: 0,
        top: 0,
        left: 0,
        right: window.innerWidth,
        bottom: 0,
        x: 0,
        y: 0,
        toJSON() {
          return ''
        },
      })

      const rect = {
        width: 80,
        height: 20,
        top: 30,
        left: 40,
      }
      target.getBoundingClientRect = () => ({
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
        right: rect.left + rect.width,
        bottom: rect.top + rect.height,
        x: rect.left,
        y: rect.top,
        toJSON() {
          return ''
        },
      })
      Object.defineProperty(target, 'offsetWidth', {
        configurable: true,
        value: rect.width,
      })
      Object.defineProperty(target, 'offsetHeight', {
        configurable: true,
        value: rect.height,
      })

      try {
        render(
          <Popover
            baseClassName="dnb-tooltip"
            open
            focusOnOpen={false}
            restoreFocus={false}
            preventClose={false}
            hideCloseButton
            disableFocusTrap
            hideDelay={0}
            targetElement={target}
            triggerOffset={16}
            arrowEdgeOffset={4}
            placement="bottom"
            arrowPosition="center"
            alignOnTarget="center"
            id="tooltip-gutter"
            data-tooltip-test-width="120"
            data-tooltip-test-height="40"
          >
            Tooltip content
          </Popover>
        )

        await waitFor(() =>
          expect(document.querySelector('.dnb-tooltip')).toHaveStyle(
            'left: 20px;'
          )
        )

        await act(async () => {
          setInnerWidth(120)
          window.dispatchEvent(new Event('resize'))
        })

        await waitFor(() =>
          expect(document.querySelector('.dnb-tooltip')).toHaveStyle(
            'left: 16px;'
          )
        )
      } finally {
        setInnerWidth(originalInnerWidth)
        document.body.getBoundingClientRect = originalBodyRect
        document.body.removeChild(target)
      }
    })
  })

  it('passes triggerOffset down to Popover when positioning the tooltip', () => {
    const collectedOffsets: Array<number | undefined> = []
    const originalPopover = PopoverModule.default
    const spy = jest
      .spyOn(PopoverModule, 'default')
      .mockImplementation((props) => {
        if (
          typeof props.className === 'string' &&
          props.className.includes('dnb-tooltip')
        ) {
          collectedOffsets.push(props.triggerOffset)
        }
        return originalPopover(props)
      })

    try {
      render(
        <OriginalTooltip
          id="tooltip-offset"
          {...defaultProps}
          active
          triggerOffset={20}
          targetElement={<button />}
        >
          Offset tooltip
        </OriginalTooltip>
      )

      expect(collectedOffsets).toContain(20)
    } finally {
      spy.mockRestore()
    }
  })

  describe('Anchor with tooltip', () => {
    it('has to be in the DOM so aria-describedby is valid', async () => {
      render(
        <Anchor href="/url" target="_blank" lang="en-GB">
          text
        </Anchor>
      )

      const anchorElement = document.querySelector('a')

      // When tooltip is inactive, aria-describedby is not set
      expect(anchorElement.getAttribute('aria-describedby')).toBeNull()

      // Activate the tooltip
      fireEvent.mouseEnter(anchorElement)

      // Wait for tooltip to become active
      await waitFor(() => {
        const id = anchorElement.getAttribute('aria-describedby')
        expect(id).toBeTruthy()
        // Verify the element with that id exists in the DOM
        expect(document.body.querySelectorAll('#' + id).length).toBe(1)
      })
    })

    it('has to be visible on hover', async () => {
      render(
        <Anchor href="/url" target="_blank" lang="en-GB">
          text
        </Anchor>
      )

      fireEvent.mouseEnter(document.querySelector('a'))

      await waitFor(() =>
        expect(document.querySelector('.dnb-tooltip')).toHaveClass(
          'dnb-tooltip--active'
        )
      )

      fireEvent.mouseLeave(document.querySelector('a'))

      await waitFor(() =>
        expect(document.querySelector('.dnb-tooltip')).toBeNull()
      )
    })

    it('has to be visible on focus event dispatch', async () => {
      render(
        <Anchor href="/url" target="_blank" lang="en-GB">
          text
        </Anchor>
      )

      const element = document.querySelector('a')
      fireEvent.focus(element)

      await waitFor(() => {
        expect(getMainElem().classList).toContain('dnb-tooltip--active')
      })

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
