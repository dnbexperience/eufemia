/**
 * Web CopyOnClick Component
 */

import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import type { CopyOnClickAllProps } from './types'
import {
  runIOSSelectionFix,
  useCopyWithNotice,
} from '../number-format/NumberUtils'
import { hasSelectedText, IS_IOS, warn } from '../../shared/helpers'
import { convertJsxToString } from '../../shared/component-helper'

let hasiOSFix = false

const CopyOnClick = ({
  children,
  className = null,
  disabled,
  showCursor = true,
  ...props
}: CopyOnClickAllProps) => {
  const ref = useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    if (IS_IOS) {
      if (!hasiOSFix) {
        hasiOSFix = true
        runIOSSelectionFix()
      }
    }
  }, [])

  const { copy } = useCopyWithNotice()

  const onClickHandler = () => {
    if (!hasSelectedText()) {
      try {
        const str = convertJsxToString(children)

        if (String(str).length > 0) {
          const selection = window.getSelection()
          const range = document.createRange()
          range.selectNodeContents(ref.current)
          selection.removeAllRanges()
          selection.addRange(range)

          copy(str, ref.current) // use copyWithNotice only to use the nice effect / animation
        }
      } catch (e) {
        warn(e)
      }
    }
  }

  const params = {
    onClick: disabled ? undefined : onClickHandler,
  }

  return (
    <span
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
    </span>
  )
}
CopyOnClick.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  showCursor: PropTypes.bool,
}

CopyOnClick.defaultProps = {
  className: null,
  showCursor: true,
}

export default CopyOnClick
