import { useCallback, useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode, SyntheticEvent } from 'react'
import { clsx } from 'clsx'
import type { ButtonProps } from '../button/Button'
import Button from '../button/Button'
import HeightAnimation from '../height-animation/HeightAnimation'
import { applyPageFocus } from '../../shared/helpers'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type SkipContentProps = {
  /**
   * Define an existing HTML element selector to focus when the inner button got pressed.
   */
  selector: string

  /**
   * Define a clear message describing the choices the user has.
   */
  text?: ReactNode

  /**
   * Defines the delay after the enter key has been pressed.
   */
  focusDelay?: number
}

export type SkipContentAllProps = SkipContentProps & ButtonProps

type FocusEvent<T = Element> = {
  target: EventTarget & T
} & SyntheticEvent<T>

const SkipContent = (localProps: SkipContentAllProps) => {
  const {
    selector,
    text,
    children,
    className,
    focusDelay = 400,
    ...props
  } = localProps

  useEffect(
    () => () => {
      clearTimeout(timeout.current)
      clearTimeout(blurTimeout.current)
    },
    []
  )

  const [visible, setVisible] = useState(false)
  const [keepReturnActive, setKeepReturnActive] = useState(false)
  const ref = useRef<HTMLElement>(undefined)
  const timeout = useRef<NodeJS.Timeout>(undefined)
  const blurTimeout = useRef<NodeJS.Timeout>(undefined)

  const classes = clsx(
    'dnb-skip-content',
    visible && 'dnb-skip-content--visible',
    keepReturnActive && 'dnb-skip-content__return--active',
    className
  )
  const returnSelector = selector.replace(/^(\.|#)/, '')
  const returnId = `${returnSelector}--alias`

  const handleBlur = useCallback(() => {
    blurTimeout.current = setTimeout(() => setVisible(false), 0)
  }, [])

  const handleButtonRef = useCallback((element: HTMLElement | null) => {
    element?.focus()
  }, [])

  const handleClick = useCallback(() => {
    // Scroll to the element at first
    const element = document.querySelector<HTMLElement>(selector)
    element?.scrollIntoView?.({ behavior: 'smooth' })

    if (element && !isInteractive(element)) {
      element.classList.add('dnb-skip-content__focus')
    }

    const focusTarget = () => {
      applyPageFocus(selector)

      // Tell the linked return component, it should stay active (if it gets focused as well)
      document
        .querySelector(`#${returnSelector}--alias--alias`)
        ?.classList.add('dnb-skip-content__return--active')
    }

    if (focusDelay === 0) {
      focusTarget()
    } else {
      setVisible(false)
      // Delay the focus, so the UX is smoother
      timeout.current = setTimeout(focusTarget, focusDelay)
    }
  }, [focusDelay, returnSelector, selector])

  const setFocus = useCallback(() => {
    setVisible(true)

    // Ensure the __return button stays active
    if (ref.current?.getAttribute('class').includes('__return--active')) {
      setKeepReturnActive(true)
    }
  }, [])

  const handleFocus = useCallback(
    (e: FocusEvent) => {
      if (e.target.tagName === 'SPAN') {
        setFocus()
      }
    },
    [setFocus]
  )

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setFocus()
        requestAnimationFrame(() => {
          ref.current?.querySelector<HTMLElement>('.dnb-button')?.focus()
        })
      }
    },
    [setFocus]
  )

  return (
    <span
      className={classes}
      ref={ref}
      onFocus={handleFocus}
      id={returnId}
    >
      <>
        <button
          className="dnb-sr-only"
          type="button"
          tabIndex={visible ? -1 : undefined}
          aria-hidden={visible || undefined}
          onKeyUp={handleKeyUp}
        >
          {text || children}
        </button>
        <HeightAnimation open={visible} aria-live="polite">
          <Button
            ref={handleButtonRef}
            wrap
            variant="secondary"
            onClick={handleClick}
            onBlur={handleBlur}
            {...(props as Record<string, unknown>)}
          >
            {text || children}
          </Button>
        </HeightAnimation>
      </>
    </span>
  )
}

function isInteractive(element: HTMLElement) {
  return (
    element.matches('a, button, input, textarea, select, label, menu') ||
    [
      'a',
      'button',
      'input',
      'textarea',
      'select',
      'label',
      'menu',
    ].includes(element.getAttribute('role') || '')
  )
}

export type SkipContentReturnProps = SkipContentAllProps

const SkipContentReturn = (localProps: SkipContentReturnProps) => {
  const { selector, className, ...props } = localProps

  const classes = clsx('dnb-skip-content__return', className)

  return (
    <SkipContent
      selector={`${selector}--alias`}
      className={classes}
      {...props}
    />
  )
}

SkipContent.Return = SkipContentReturn

withComponentMarkers(SkipContent, {
  _supportsSpacingProps: true,
})

export default SkipContent
