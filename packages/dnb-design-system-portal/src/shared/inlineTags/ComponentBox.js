/**
 * Inline Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import CodeBlock from './CodeBlock'
import styled from '@emotion/styled'
import { getComponents } from 'dnb-ui-lib/src/components'

const ComponentBox = ({ children, scope = {}, ...rest }) => {
  return (
    <CodeBlock
      scope={{ ...getComponents(), styled, React, ...scope }}
      {...rest}
    >
      {children}
    </CodeBlock>
  )
}
ComponentBox.propTypes = {
  children: PropTypes.node.isRequired,
  scope: PropTypes.object
}
ComponentBox.defaultProps = {
  scope: {}
}

export default ComponentBox
