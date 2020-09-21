/**
 * Inline Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import CodeBlock from './CodeBlock'
import styled from '@emotion/styled'
import { getComponents } from 'dnb-ui-lib/src/components/lib'
import { getFragments } from 'dnb-ui-lib/src/fragments/lib'
import { getElements } from 'dnb-ui-lib/src/elements/lib'

const ComponentBox = ({ children, hideOnTest, scope = {}, ...rest }) => {
  if (hideOnTest && typeof window !== 'undefined' && window.IS_TEST) {
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
        TestWrapper,
        ...scope
      }}
      {...rest}
      // addToSearchIndex={({ title, hash, location }) => {
      //   if (hash !== 'demos') {
      //     console.log('>', title, hash, location.pathname)
      //   }
      // }}
    >
      {children}
    </CodeBlock>
  )
}
ComponentBox.propTypes = {
  children: PropTypes.node.isRequired,
  hideOnTest: PropTypes.bool,
  scope: PropTypes.object
}
ComponentBox.defaultProps = {
  hideOnTest: false,
  scope: {}
}

export default ComponentBox

export const TestWrapper = ({ children, ...props }) => {
  document.documentElement.setAttribute('data-dnb-test', true)
  return (
    <div data-dnb-test-wrapper {...props}>
      {children}
    </div>
  )
}
TestWrapper.propTypes = {
  children: PropTypes.node.isRequired
}
