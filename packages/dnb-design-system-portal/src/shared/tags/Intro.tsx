/**
 * Inline Tag
 *
 */

import React from 'react'
import { Global, css } from '@emotion/react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { Anchor, Button, Space } from '@dnb/eufemia/src'
import { wrapperStyle, innerStyle, footerStyle } from './Intro.module.scss'
import { startPageTransition } from './Transition'
import { Link } from './Anchor'

const ref = React.createRef<HTMLDivElement>()
const Intro = ({ children = undefined }) => {
  React.useEffect(() => {
    const onKeyDownHandler = (e) => {
      if (/textarea|input/i.test(document.activeElement.tagName)) {
        return
      }
      startPageTransition()
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
    <div className={wrapperStyle}>
      <div ref={ref} className={innerStyle}>
        {children}
      </div>
    </div>
  )
}
Intro.propTypes = {
  children: PropTypes.node.isRequired,
}

export const IntroFooter = ({ href = undefined, text = undefined }) => (
  <Space top no_collapse className={footerStyle}>
    <Global
      styles={css`
        .dnb-app-content {
          margin-left: 0;
        }
      `}
    />
    <Button href={href} text={text} icon="chevron_right" element={Link} />
    <Button
      href="/uilib/getting-started"
      variant="secondary"
      text="Cancel"
      icon="close"
      icon_position="left"
      element={Link}
    />
  </Space>
)
IntroFooter.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export const Next = (props) => (
  <>
    <div className="dnb-section dnb-section--spacing">
      <Anchor {...props} />
    </div>
  </>
)

export default Intro
