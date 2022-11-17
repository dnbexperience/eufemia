/**
 * Page Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import classnames from 'classnames'
import StickyMenuBar from '../menu/StickyMenuBar'
import packageJson from '../../../package.json'
import {
  SidebarMenuProvider,
  SidebarMenuContext,
} from '../menu/SidebarMenuContext'
import ToggleGrid, { GridActivator } from '../menu/ToggleGrid'
import {
  setPageFocusElement,
  scrollToLocationHashId,
} from '@dnb/eufemia/src/shared/helpers'
import { Logo, GlobalStatus } from '@dnb/eufemia/src/components'
import { P } from '@dnb/eufemia/src/elements'
import './PortalStyle.scss'
import {
  portalStyle,
  mainStyle,
  footerStyle,
  contentStyle,
  wrapperStyle,
  fullscreenStyle,
} from './Layout.module.scss'
import Sidebar from '../menu/SidebarMenu'

export function scrollToAnimation() {
  // if url hash is defined, scroll to the id
  scrollToLocationHashId({
    offset: 100,
    delay: 100,
    onCompletion: (elem) => {
      try {
        // elem.classList.add('focus')// run link-attention-focus animation
        elem.parentElement.classList.add('focus') // run parent-attention-focus animation
      } catch (e) {
        //
      }
    },
  })
}

class Layout extends React.PureComponent {
  static propTypes = {
    fullscreen: PropTypes.bool,
    hideSidebar: PropTypes.bool,
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
  }

  static defaultProps = {
    fullscreen: false,
    hideSidebar: false,
  }

  constructor(props) {
    super(props)
    this._mainRef = React.createRef()
    this.state = { fullscreen: props.fullscreen }
  }

  componentDidMount() {
    // gets applied on "onRouteUpdate"
    setPageFocusElement('.dnb-app-content h1:nth-of-type(1)', 'content')

    scrollToAnimation()
  }

  skipToContentHandler = (event) => {
    // because we want to avoid that the hash get's set (#dnb-app-content)
    // we prevent the default and set it manually. The DOM elements have tabIndex="-1" and className="dnb-no-focus" in place
    try {
      event.preventDefault()
      const elem = this._mainRef.current
      elem.setAttribute('tabindex', '-1')
      elem.focus()
      elem.removeAttribute('tabindex') // don't keep tabindex arround, Chrome fucks up the selection / focus feature
    } catch (e) {
      console.warn(e)
    }
  }

  isFullscreen() {
    const { fullscreen, location } = this.props
    return (
      fullscreen ||
      (typeof location !== 'undefined' &&
        /fullscreen/.test(location.search))
    )
  }

  render() {
    const { children, location, hideSidebar } = this.props

    const fs = this.state.fullscreen || this.isFullscreen()

    return (
      <div className={classnames(portalStyle, fs && fullscreenStyle)}>
        <a
          className="dnb-skip-link"
          href="#dnb-app-content"
          onClick={this.skipToContentHandler}
        >
          Skip to content
        </a>

        <SidebarMenuProvider>
          {!fs && <StickyMenuBar />}

          <div className={wrapperStyle}>
            {!fs && !hideSidebar && (
              <Sidebar location={location} showAll={false} />
            )}

            <Content key="content" fullscreen={fs}>
              <MainContent key="main" ref={this._mainRef}>
                <GlobalStatus id="main-status" />

                <div key="grid" className="dev-grid">
                  {children}
                </div>
              </MainContent>

              <Footer />
            </Content>

            {fs && <ToggleGrid hidden />}
          </div>
        </SidebarMenuProvider>

        <GridActivator />
      </div>
    )
  }
}

const Content = ({ fullscreen = false, className = null, children }) => {
  const { isOpen, isClosing } = React.useContext(SidebarMenuContext)

  if (isOpen || isClosing) {
    return null
  }

  return (
    <div
      className={classnames(
        contentStyle,
        'dnb-app-content',
        fullscreen && 'fullscreen-page',
        className
      )}
    >
      {children}
    </div>
  )
}
Content.propTypes = {
  fullscreen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
Content.defaultProps = {
  className: null,
}

const MainContent = React.forwardRef((props, ref) => (
  <main
    ref={ref}
    role="main"
    id="dnb-app-content"
    className={classnames(mainStyle, 'dnb-no-focus', 'dnb-spacing')}
    {...props}
  />
))

const Footer = () => {
  return (
    <footer className={footerStyle}>
      <P>
        <small>
          Package release: {packageJson.releaseVersion} <br />
          Portal update: {packageJson.buildVersion}
        </small>
      </P>

      <Logo height="40" color="white" />

      <Link
        to="/license"
        className="dnb-anchor dnb-anchor--contrast dnb-anchor--no-underline"
      >
        Copyright (c) 2018-present DNB.no
      </Link>
    </footer>
  )
}

export default Layout
