import React from 'react'
import classnames from 'classnames'
import Button, { ButtonProps } from '../button/Button'
import HeightAnimation from '../height-animation/HeightAnimation'
import { applyPageFocus } from '../../shared/helpers'

export interface SkipContentProps {
  /**
   * Define an existing HTML element selector to focus when the inner button got pressed.
   * Required
   */
  selector: string

  /**
   * Define a clear message describing the choices the users has.
   * Optional
   */
  text?: React.ReactNode
}

export type SkipContentAllProps = SkipContentProps & ButtonProps

const SkipContent = (localProps: SkipContentAllProps) => {
  const { children, text, selector, className, ...props } = localProps

  const [visible, setVisible] = React.useState(false)
  const ref = React.useRef<HTMLElement>()

  const classes = classnames(
    'dnb-skip-content',
    visible && 'dnb-skip-content--visible',
    className
  )

  return (
    <span className={classes} ref={ref}>
      {!visible && (
        <button className="dnb-sr-only" aria-hidden onKeyUp={handleKeyUp}>
          {text || children}
        </button>
      )}
      <HeightAnimation open={visible}>
        <Button
          variant="secondary"
          onClick={handleClick}
          onBlur={handleBlur}
          {...(props as Record<string, unknown>)}
        >
          {text || children}
        </Button>
      </HeightAnimation>
    </span>
  )

  function handleBlur() {
    setVisible(false)
  }

  function handleClick() {
    applyPageFocus(selector)
    setVisible(false)
  }

  function handleKeyUp(e: React.KeyboardEvent) {
    if (e.key === 'Tab') {
      setVisible(true)

      // Wait one frame, so ref is set
      window.requestAnimationFrame(() => {
        const buttonElem = ref.current?.querySelector(
          '.dnb-button'
        ) as HTMLButtonElement
        buttonElem?.focus()
      })
    }
  }
}

export default SkipContent
