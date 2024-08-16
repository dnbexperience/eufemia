/**
 * Web Copy Component
 */

import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import type { CopyAllProps } from './types'
import {
  runIOSSelectionFix,
  useCopyWithNotice,
} from '../number-format/NumberUtils'
import { hasSelectedText, IS_IOS, warn } from '../../shared/helpers'
import { convertJsxToString } from '../../shared/component-helper'

let hasiOSFix = false

const Copy = ({
  children,
  className = null,
  disabled,
  showCursor = true,
  ...props
}: CopyAllProps) => {
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
    onClick: onClickHandler,
  }

  return (
    <span
      className={classnames('dnb-copy', showCursor && 'cursor', className)}
      ref={disabled ? undefined : ref}
      {...props}
      {...params}
    >
      {children}
    </span>
  )
}
Copy.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  showCursor: PropTypes.bool,
}
Copy.defaultProps = {
  className: null,
  showCursor: true,
}

export default Copy
