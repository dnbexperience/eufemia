/**
 * Inline Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import CodeBlock from './CodeBlock'
import { getComponents } from 'dnb-ui-lib/src/components'

const ComponentBox = ({ children, ...rest }) => {
  return (
    <CodeBlock scope={getComponents()} hidePreview {...rest}>
      {children}
    </CodeBlock>
  )
}
ComponentBox.propTypes = {
  children: PropTypes.node.isRequired
}

export default ComponentBox
