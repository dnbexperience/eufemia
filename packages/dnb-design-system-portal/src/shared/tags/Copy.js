/**
 * Copy Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styled from '@emotion/styled'
import {
  IS_IOS,
  // copyToClipboard,
  hasSelectedText
} from 'dnb-ui-lib/src/shared/helpers'
import {
  convertJsxToString,
  warn
} from 'dnb-ui-lib/src/shared/component-helper'
import {
  copyNumber,
  runIOSSelectionFix
} from 'dnb-ui-lib/src/components/Number'

// we may use this one, but for now, we just keep the build in mdx support
// import ReactMarkdown from 'react-markdown'

const StyledSpan = styled.span`
  cursor: copy;
`

let hasiOSFix = false

const Copy = ({ children, className, ...rest }) => {
  const ref = React.useRef()

  React.useEffect(() => {
    if (IS_IOS) {
      if (!hasiOSFix) {
        hasiOSFix = true
        runIOSSelectionFix()
      }
    }
  }, [])

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

          // copyToClipboard(str)
          copyNumber(str) // use copyNumber only to use the nice effect / animation
        }
      } catch (e) {
        warn(e)
      }
    }
  }

  // const onMouseDownHandler = () => {
  //   if (hasSelectedText()) {
  //     try {
  //       const selection = window.getSelection()
  //       selection.removeAllRanges()
  //     } catch (e) {
  //       warn(e)
  //     }
  //   }
  // }

  const params = {
    onClick: onClickHandler
    // onMouseDown: onMouseDownHandler,
    // onTouchStart: onMouseDownHandler
  }

  return (
    <StyledSpan
      className={classnames('dnb-copy', className)}
      ref={ref}
      {...rest}
      {...params}
    >
      {children}
    </StyledSpan>
  )
}
Copy.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}
Copy.defaultProps = {
  className: null
}

export default Copy
