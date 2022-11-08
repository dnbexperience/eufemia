/**
 * Inline Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { Link } from '@dnb/eufemia/src/elements'
import { Button, Space } from '@dnb/eufemia/src/components'
import { wrapperStyle, innerStyle, footerStyle } from './Intro.module.scss'

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
Intro.defaultProps = {}

export const IntroFooter = ({ href, text }) => (
  <Space top no_collapse className={footerStyle}>
    <Button href={href} text={text} icon="chevron_right" />
    <Button
      href="/uilib/getting-started"
      variant="secondary"
      text="Cancel"
      icon="close"
      icon_position="left"
    />
  </Space>
)
IntroFooter.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}
IntroFooter.defaultProps = {}

export const Next = (props) => (
  <>
    {/* <Hr /> */}
    <div className="dnb-section dnb-section--spacing">
      <Link {...props} />
    </div>
  </>
)

export default Intro
