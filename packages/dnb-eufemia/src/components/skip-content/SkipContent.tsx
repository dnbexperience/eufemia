import React from 'react'
import classnames from 'classnames'
import Button, { ButtonProps } from '../button/Button'
import HeightAnimation from '../height-animation/HeightAnimation'
import { applyPageFocus } from '../../shared/helpers'

export interface SkipContentProps {
  /**
   * Define an existing `Section` id to focus when the inner button got pressed.
   * Required
   */
  selector: string

  /**
   * Define a clear message describing the choices the users has.
   * Optional
   */
  text?: React.ReactNode

  /**
   * Defines the delay after the enter key has been pressed
   * Defaults to 400
   */
  focusDelay?: number
}

export type SkipContentAllProps = SkipContentProps & ButtonProps

interface FocusEvent<T = Element> extends React.SyntheticEvent<T> {
  target: EventTarget & T
}

const SkipContent = (localProps: SkipContentAllProps) => {
  const {
    selector,
    text,
    children,
    className,
    focusDelay = 400,
    ...props
  } = localProps

  React.useEffect(
    () => () => {
      clearTimeout(timeout.current)
    },
    []
  )

  const [visible, setVisible] = React.useState(false)
  const [keepReturnActive, setKeepReturnActive] = React.useState(false)
  const ref = React.useRef<HTMLElement>()
  const timeout = React.useRef<NodeJS.Timeout>()

  const classes = classnames(
    'dnb-skip-content',
    visible && 'dnb-skip-content--visible',
    keepReturnActive && 'dnb-skip-content__return--active',
    className
  )
  const returnSelector = selector.replace(/^(\.|#)/, '')
  const returnId = `${returnSelector}--alias`

  return (
    <span
      className={classes}
      ref={ref}
      onFocus={handleFocus}
      id={returnId}
    >
      <>
        {!visible && (
          <button className="dnb-sr-only" onKeyUp={handleKeyUp}>
            {text || children}
          </button>
        )}
        <HeightAnimation open={visible}>
          <Button
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

  function handleBlur() {
    setVisible(false)
  }

  function handleClick() {
    setVisible(false)

    // Scroll to the element at first
    const element = document.querySelector(selector)
    element?.scrollIntoView?.({ behavior: 'smooth' })
    element?.classList.add('dnb-skip-content__focus')

    // Delay the focus, so the UX is smoother
    timeout.current = setTimeout(() => {
      applyPageFocus(selector)

      // Tell the linked return component, it should stay active (if it gets focused as well)
      document
        .querySelector(`#${returnSelector}--alias--alias`)
        ?.classList.add('dnb-skip-content__return--active')
    }, focusDelay)
  }

  function handleFocus(e: FocusEvent) {
    if (e.target.tagName === 'SPAN') {
      setFocus()
    }
  }

  function handleKeyUp(e: React.KeyboardEvent) {
    if (e.key === 'Tab') {
      setFocus()
    }
  }

  function setFocus() {
    setVisible(true)

    // Wait one frame, so ref is set
    window.requestAnimationFrame(() => {
      const element = ref.current?.querySelector(
        '.dnb-button'
      ) as HTMLElement
      element?.focus()
    })

    // Ensure the __return button stays active
    if (ref.current?.getAttribute('class').includes('__return--active')) {
      setKeepReturnActive(true)
    }
  }
}

export type SkipContentReturnProps = SkipContentAllProps

const SkipContentReturn = (localProps: SkipContentReturnProps) => {
  const { selector, className, ...props } = localProps

  const classes = classnames('dnb-skip-content__return', className)

  return (
    <SkipContent
      selector={`${selector}--alias`}
      className={classes}
      {...props}
    />
  )
}

SkipContent.Return = SkipContentReturn

SkipContent._supportsSpacingProps = true

export default SkipContent
