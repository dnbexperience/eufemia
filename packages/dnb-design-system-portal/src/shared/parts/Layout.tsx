/**
 * Page Component
 *
 */

import { useContext, useEffect, useRef, useState } from 'react'
import type { HTMLProps, ReactNode } from 'react'
import Anchor from '../tags/Anchor'
import clsx from 'clsx'
import StickyMenuBar from '../menu/StickyMenuBar'
import { releaseVersion, buildVersion } from '../buildInfo'
import {
  SidebarMenuProvider,
  SidebarMenuContext,
} from '../menu/SidebarMenuContext'
import ToggleGrid, { GridActivator } from '../menu/ToggleGrid'
import { setPageFocusElement } from '@dnb/eufemia/src/shared/helpers'
import { P, Logo, GlobalStatus, Section } from '@dnb/eufemia/src'
import './PortalStyle.scss'
import {
  portalStyle,
  mainStyle,
  footerStyle,
  contentStyle,
  wrapperStyle,
  fullscreenStyle,
} from './Layout.module.scss'
import SidebarMenu from '../menu/SidebarMenu'
import { scrollToAnimation } from './layout-utils'
import { useFullscreenCode } from '../../core/FullscreenCodeContext'

const SIDEBAR_SELECTOR = '#portal-sidebar-menu'
const SIDEBAR_SCROLL_KEY = 'scroll-' + SIDEBAR_SELECTOR

function restoreSidebarScroll() {
  try {
    const el = document.querySelector(SIDEBAR_SELECTOR) as HTMLElement
    if (!el) {
      return // stop here
    }

    const stored = parseFloat(
      sessionStorage.getItem(SIDEBAR_SCROLL_KEY) || '0'
    )
    if (stored) {
      el.style.scrollBehavior = 'auto'
      el.scrollTop = stored
      el.style.scrollBehavior = ''
    }
  } catch {
    // ignore
  }
}

type LayoutProps = {
  fullscreen?: boolean
  hideSidebar?: boolean
  children: ReactNode
  location: Location
}

function Layout(props: LayoutProps) {
  const mainRef = useRef<HTMLElement>(undefined)

  const { fullscreen, location, hideSidebar, children } = props

  // Prop-based and IS_TEST fullscreen are known at SSR time
  const ssrFullscreen = fullscreen || globalThis.IS_TEST

  // URL-based fullscreen is deferred to useEffect to avoid hydration
  // mismatch — the server does not see the ?fullscreen query parameter.
  // An inline script in index.html hides the header/sidebar with CSS
  // before first paint so the user never sees a flash.
  const [urlFullscreen, setUrlFullscreen] = useState(false)

  useEffect(() => {
    if (typeof location !== 'undefined') {
      const isFs = /fullscreen/.test(location.search)
      setUrlFullscreen(isFs)

      // Remove the inline style injected by index.html when quitting
      // fullscreen, so the header and sidebar can reappear.
      if (!isFs) {
        document.getElementById('fullscreen-preload-style')?.remove()
      }
    }
  }, [location])

  const { fullscreenCodeId, savedScrollY } = useFullscreenCode()
  const codeFullscreen = fullscreenCodeId !== null

  const fs = ssrFullscreen || urlFullscreen || codeFullscreen

  // Restore scroll and sidebar position after exiting any fullscreen mode
  const wasFullscreenRef = useRef(false)
  useEffect(() => {
    if (fs) {
      wasFullscreenRef.current = true
    } else if (wasFullscreenRef.current) {
      wasFullscreenRef.current = false
      const scrollTarget = savedScrollY.current
      savedScrollY.current = 0

      // Use double requestAnimationFrame to ensure the DOM has fully
      // settled after the sidebar, header, and footer are re-rendered
      let cancelled = false
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (cancelled) {
            return // stop here
          }

          if (scrollTarget) {
            window.scrollTo({ top: scrollTarget })
          }

          restoreSidebarScroll()
        })
      })
      return () => {
        cancelled = true
      }
    }
  }, [fs, savedScrollY])

  useEffect(() => {
    // gets applied on "onRouteUpdate"
    setPageFocusElement('.dnb-app-content h1:nth-of-type(1)', 'content')

    scrollToAnimation()
  }, [])

  const skipToContentHandler = (event) => {
    // because we want to avoid that the hash get's set (#dnb-app-content)
    // we prevent the default and set it manually. The DOM elements have tabIndex="-1" and className="dnb-no-focus" in place
    try {
      event.preventDefault()
      const elem = mainRef.current
      elem.setAttribute('tabindex', '-1')
      elem.focus()
      elem.addEventListener(
        'blur',
        () => elem.removeAttribute('tabindex'),
        { once: true }
      )
    } catch (e) {
      console.error('Failed to set focus on skip link target:', e)
    }
  }

  return (
    <div className={clsx(portalStyle, fs && fullscreenStyle)}>
      <a
        className="dnb-skip-link"
        href="#dnb-app-content"
        onClick={skipToContentHandler}
      >
        Skip to content
      </a>

      <SidebarMenuProvider>
        {!fs && <StickyMenuBar />}

        <div className={wrapperStyle}>
          {!fs && !hideSidebar && (
            <SidebarMenu location={location} showAll={false} />
          )}

          <Content key="content" fullscreen={fs}>
            <MainContent key="main" mainRef={mainRef}>
              <GlobalStatus id="main-status" />

              <div key="grid" className="dev-grid">
                {children}
              </div>
            </MainContent>

            {!codeFullscreen && <Footer />}
          </Content>

          {fs && <ToggleGrid hidden />}
        </div>
      </SidebarMenuProvider>

      <GridActivator />
    </div>
  )
}

type ContentProps = {
  fullscreen: boolean
} & HTMLProps<HTMLDivElement>

const Content = ({
  fullscreen = false,
  className = null,
  children,
}: ContentProps) => {
  const { isOpen, isClosing } = useContext(SidebarMenuContext)

  if (isOpen || isClosing) {
    return null
  }

  return (
    <div
      className={clsx(
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

const MainContent = ({ mainRef, ...props }) => (
  <main
    ref={mainRef}
    id="dnb-app-content"
    className={clsx(
      mainStyle,
      'dnb-no-focus',
      'dnb-spacing' // used so the portal elements uses their default space
    )}
    {...props}
  />
)

const Footer = () => {
  return (
    <Section element="footer" innerSpace className={footerStyle}>
      <P size="small">
        Package release: {releaseVersion} <br />
        Portal update: {buildVersion}
      </P>

      <Logo height="40" />

      <Anchor to="/license">Copyright (c) 2018-present DNB.no</Anchor>
    </Section>
  )
}

export default Layout
