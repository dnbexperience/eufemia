/**
 * Inline Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  Link
  // Hr
} from 'dnb-ui-lib/src/elements'

const Intro = ({ children }) => {
  return (
    <Wrapper>
      <Inner>{children}</Inner>
    </Wrapper>
  )
}
Intro.propTypes = {
  children: PropTypes.node.isRequired
}
Intro.defaultProps = {}

const Wrapper = styled.div`
  margin: 10vh 15vw;

  ${'' /* a[href*='/intro/'] {
    display: block;
    color: red;
  } */}
  ${'' /* .dnb-hr:last-of-type {
    color: red;
  } */}
`
const Inner = styled.div`
  ${'' /* transform: scale(1.2); */}
  margin-bottom: 4rem;
  width: 70vw;
  min-height: 50vh;
`
export const Next = props => (
  <>
    {/* <Hr /> */}
    <div className="dnb-section dnb-section--spacing">
      <Link {...props} />
    </div>
  </>
)

export default Intro
