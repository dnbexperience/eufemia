/**
 * Inline Tag
 *
 */

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import styled from '@emotion/styled'
import {
  Link
  // Hr
} from 'dnb-ui-lib/src/elements'

const onKeyDownHandler = e => {
  try {
    if (e.key === 'ArrowRight') {
      const elem = document.querySelector('a[href*="/intro"]:last-of-type')
      const href = elem.getAttribute('href')
      navigate(href)
    }
    if (e.key === 'ArrowLeft') {
      window.history.back()
    }
  } catch (e) {
    console.log(e)
  }
}

const Intro = ({ children }) => {
  useEffect(() => {
    try {
      document.addEventListener('keydown', onKeyDownHandler)
    } catch (e) {
      console.log(e)
    }
    return () => {
      document.removeEventListener('keydown', onKeyDownHandler)
    }
  }, [])
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
  margin: 10vh 10vw;

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
