/**
 * Page not found
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

export default class PageNotFound extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired
  }
  render() {
    const { pathname } = this.props.location

    return (
      <Center className="dnb-style">
        <Inner>
          <h1>404</h1>
          <h2>We couldn't find that page:</h2>
          <p>
            {`There's not a page at `}
            <code>{pathname}</code>
          </p>
        </Inner>
      </Center>
    )
  }
}

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const Inner = styled.div`
  width: 60vw;
  text-align: center;
  padding-bottom: 4rem;
`
