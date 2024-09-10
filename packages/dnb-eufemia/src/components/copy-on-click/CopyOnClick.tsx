/**
 * Web CopyOnClick Component
 */

import React, { useCallback, useEffect, useRef } from 'react'
import classnames from 'classnames'
import type { CopyOnClickAllProps } from './types'
import {
  runIOSSelectionFix,
  copyWithEffect,
} from '../number-format/NumberUtils'
import { hasSelectedText, IS_IOS, warn } from '../../shared/helpers'
import { convertJsxToString } from '../../shared/component-helper'
import { useTranslation } from '../../shared'
import { Span } from '../../elements'

const CopyOnClick = ({
  children,
  className = null,
  disabled,
  showCursor = true,
  copyContent = null,
  ...props
}: CopyOnClickAllProps) => {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (IS_IOS) {
      runIOSSelectionFix()
    }
  }, [])

  const {
    CopyOnClick: { clipboard_copy },
  } = useTranslation()

  const copy = useCallback(
    (value: string, positionElement: HTMLElement) => {
      copyWithEffect(value, clipboard_copy, positionElement) // use copyWithNotice only to use the nice effect / animation
    },
    [clipboard_copy]
  )

  const onClickHandler = useCallback(() => {
    if (!hasSelectedText()) {
      try {
        const str = convertJsxToString(copyContent || children)

        if (str) {
          const selection = window.getSelection()
          const range = document.createRange()
          range.selectNodeContents(ref.current)
          selection.removeAllRanges()
          selection.addRange(range)

          copy(str, ref.current)
        }
      } catch (e) {
        warn(e)
      }
    }
  }, [children, copyContent, copy])

  const params = {
    onClick: disabled ? undefined : onClickHandler,
  }

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
    </Span>
  )
}

CopyOnClick._supportsSpacingProps = true
export default CopyOnClick
