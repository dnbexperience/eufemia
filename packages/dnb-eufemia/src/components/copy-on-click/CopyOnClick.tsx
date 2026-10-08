/**
 * Web CopyOnClick Component
 */

import { useCallback, useEffect, useRef } from 'react'
import { clsx } from 'clsx'
import type { CopyOnClickAllProps } from './types'
import { runIOSSelectionFix } from '../number-format/NumberUtils'
import { hasSelectedText, IS_IOS, warn } from '../../shared/helpers'
import { convertJsxToString } from '../../shared/component-helper'
import { useTranslation } from '../../shared'
import { Span } from '../../elements'
import Tooltip from '../Tooltip'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import useCopyToClipboard from './useCopyToClipboard'
import CopyOnClickButton from './CopyOnClickButton'

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
  const { active, hasCopied, copy } = useCopyToClipboard()

  useEffect(() => {
    if (IS_IOS) {
      runIOSSelectionFix()
    }
  }, [])

  const {
    CopyOnClick: { clipboardCopy },
  } = useTranslation()

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
        warn('CopyOnClick: Failed to select and copy content:', e)
      }
    }
  }, [children, copyContent, copy])

  const params = {
    onClick: disabled ? undefined : onClickHandler,
  }
  const message = tooltipContent ?? clipboardCopy

  return (
    <Span
      className={clsx(
        'dnb-copy-on-click',
        showCursor && !disabled && 'dnb-copy-on-click--cursor',
        className
      )}
      {...props}
      {...params}
      ref={ref}
    >
      {children}
      {hasCopied && (
        <Tooltip open={active} targetElement={ref}>
          {message}
        </Tooltip>
      )}
    </Span>
  )
}

CopyOnClick.Button = CopyOnClickButton

withComponentMarkers(CopyOnClick, {
  _supportsSpacingProps: true,
})

export default CopyOnClick
