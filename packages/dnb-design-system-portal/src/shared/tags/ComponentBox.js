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

const ComponentBox = ({ children, scope = {}, ...rest }) => {
  return (
    <CodeBlock
      scope={{
        ...getComponents(),
        ...getElements(),
        useEffect,
        useState,
        styled,
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
  scope: PropTypes.object
}
ComponentBox.defaultProps = {
  scope: {}
}

export default ComponentBox
