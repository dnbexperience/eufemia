/**
 * Web CopyOnClick Component
 */

import React, { useCallback, useRef } from 'react'
import classnames from 'classnames'
import type { CopyOnClickAllProps } from './types'
import {
  copyToClipboard,
  hasSelectedText,
  warn,
} from '../../shared/helpers'
import { convertJsxToString } from '../../shared/component-helper'
import { useTranslation } from '../../shared'
import { Span } from '../../elements'
import Tooltip from '../Tooltip'

const CopyOnClick = ({
  children,
  className = null,
  disabled = false,
  showCursor = true,
  copyContent = null,
  tooltipContent = null,
  ...props
}: CopyOnClickAllProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const [active, setActive] = React.useState(false)

  const {
    CopyOnClick: { clipboard_copy },
  } = useTranslation()

  const copy = useCallback(async (str: string) => {
    const clear = () => clearInterval(timeoutRef.current)
    clear()

    try {
      const success = await copyToClipboard(str)
      if (success === true) {
        setActive(true)

        timeoutRef.current = setTimeout(() => setActive(false), 2000)
      }
    } catch (e) {
      warn(e)
    }

    return () => clear()
  }, [])

  const onClickHandler = useCallback(() => {
    if (!hasSelectedText()) {
      try {
        const str =
          convertJsxToString(copyContent || children) ||
          ref.current?.textContent

        if (str) {
          const selection = window.getSelection()
          const range = document.createRange()
          range.selectNodeContents(ref.current)
          selection.removeAllRanges()
          selection.addRange(range)

          copy(str)
        }
      } catch (e) {
        warn(e)
      }
    }
  }, [children, copyContent, copy])

  const params = {
    onClick: disabled ? undefined : onClickHandler,
  }
  const message = tooltipContent ?? clipboard_copy

  return (
    <Span
      className={classnames(
        'dnb-copy-on-click',
        showCursor && !disabled && 'dnb-copy-on-click--cursor',
        className
      )}
      ref={ref}
      {...props}
      {...params}
    >
      {children}
      <Tooltip active={active} targetElement={ref}>
        {message}
      </Tooltip>
    </Span>
  )
}

CopyOnClick._supportsSpacingProps = true
export default CopyOnClick
