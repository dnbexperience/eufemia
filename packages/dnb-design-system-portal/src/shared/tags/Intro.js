/**
 * Inline Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import styled from '@emotion/styled'
import {
  Link
  // Hr
} from '@dnb/eufemia/src/elements'
import { Button, Space } from '@dnb/eufemia/src/components'

const ref = React.createRef()
const Intro = ({ children }) => {
  React.useEffect(() => {
    const onKeyDownHandler = (e) => {
      if (/textarea|input/i.test(document.activeElement.tagName)) {
        return
      }
      try {
        if (e.key === 'ArrowRight' && ref && ref.current) {
          const elem = ref.current.querySelector('a[href*="/intro"]')
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
      <Inner ref={ref}>{children}</Inner>
    </Wrapper>
  )
}
Intro.propTypes = {
  children: PropTypes.node.isRequired
}
Intro.defaultProps = {}

export const IntroFooter = ({ href, text }) => (
  <Footer top no_collapse>
    <Button href={href} text={text} icon="chevron_right" />
    <Button
      href="/uilib/getting-started"
      variant="secondary"
      text="Cancel"
      icon="close"
      icon_position="left"
    />
  </Footer>
)
IntroFooter.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}
IntroFooter.defaultProps = {}

const Footer = styled(Space)`
  display: flex;
  justify-content: space-between;
`

const Wrapper = styled.div`
  margin: 10vh 10vw;

  .dnb-spacing & blockquote h2 {
    margin: 0.5rem 1rem 0 0;
  }

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
export const Next = (props) => (
  <>
    {/* <Hr /> */}
    <div className="dnb-section dnb-section--spacing">
      <Link {...props} />
    </div>
  </>
)

export default Intro
