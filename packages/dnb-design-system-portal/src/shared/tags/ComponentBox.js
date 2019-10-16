/**
 * Inline Tag
 *
 */

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import CodeBlock from './CodeBlock'
import styled from '@emotion/styled'
import { getComponents } from 'dnb-ui-lib/src/components/lib'
import { getElements } from 'dnb-ui-lib/src/elements/lib'

const ComponentBox = ({ children, hideOnTest, scope = {}, ...rest }) => {
  if (hideOnTest && typeof window !== 'undefined' && window.IS_TEST) {
    return <></>
  }
  return (
    <CodeBlock
      scope={{
        ...getComponents(),
        ...getElements(),
        useEffect,
        useState,
        styled,
        TestWrapper,
        ...scope
      }}
      {...rest}
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
