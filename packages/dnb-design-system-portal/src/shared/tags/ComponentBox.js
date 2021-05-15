/**
 * Inline Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import CodeBlock from './CodeBlock'
import styled from '@emotion/styled'
import { getComponents } from '@dnb/eufemia/src/components/lib'
import { getFragments } from '@dnb/eufemia/src/fragments/lib'
import { getElements } from '@dnb/eufemia/src/elements/lib'

const ComponentBox = ({ children, hideOnTest, scope = {}, ...rest }) => {
  if (hideOnTest && global.IS_TEST) {
    return <></>
  }
  return (
    <CodeBlock
      scope={{
        ...getComponents(),
        ...getFragments(),
        ...getElements(),
        styled,
        React,
        // TestWrapper,// Not used as of now
        ...scope,
      }}
      {...rest}
    >
      {typeof children === 'function' ? children() : children}
    </CodeBlock>
  )
}
ComponentBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
    .isRequired,
  hideOnTest: PropTypes.bool,
  scope: PropTypes.object,
}
ComponentBox.defaultProps = {
  hideOnTest: false,
  scope: {},
}

export default ComponentBox
