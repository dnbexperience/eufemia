/**
 * List all component parts
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

export default class AllParts extends React.Component {
  static propTypes = {
    parts: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired
  }
  render() {
    const { parts, children } = this.props
    return (
      <Wrapper>
        {children}
        {parts.map((Component, i) => (
          <Component key={`c${i}`} hideTabs={true} />
        ))}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  .wrapped-item {
    padding: 1rem;

    border-top: 1px solid var(--color-outline-grey);
    background: var(--color-light-grey);
  }
`
