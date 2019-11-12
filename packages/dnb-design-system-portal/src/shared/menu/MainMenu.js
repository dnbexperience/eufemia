/**
 * Main Menu
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { css, Global } from '@emotion/core'
import Head from 'react-helmet'
import styled from '@emotion/styled'
import classnames from 'classnames'
import Card, { focusRing } from './Card'
import keycode from 'keycode'
import {
  UilibSvg,
  BrandSvg,
  IconsSvg,
  PrinciplesSvg,
  QuickguideDesignerSvg,
  DesignSystemSvg
} from './MainMenuGraphics'
import { Logo, Button } from 'dnb-ui-lib/src'
// import { buildVersion } from '../../../package.json'
import { version as buildVersion } from '../../../version.json'
import { MainMenuContext } from './MainMenuContext'
import {
  setPageFocusElement,
  applyPageFocus
} from 'dnb-ui-lib/src/shared/helpers'

class MainWrapper extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
  }
  componentDidUpdate(prevProps) {
    if (this.props.isOpen && !prevProps.isOpen) {
      applyPageFocus('mainmenu')
    }
  }
  componentWillUnmount() {
    applyPageFocus('content')
  }
  render() {
    const { className, ...rest } = this.props
    return (
      <MainWrapperStyled
        tabIndex="-1"
        className={classnames('main-menu', 'dnb-no-focus', className)}
        {...rest}
      >
        {this.props.children}
      </MainWrapperStyled>
    )
  }
}

const MainWrapperStyled = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  @media (max-width: 40em), (max-height: 55em) {
    height: auto;
  }

  &.is-overlay {
    position: absolute;
    z-index: 201; /* one more than sticky Bar = styled.div */
    top: 0;
    left: 0;
    @media (min-height: 55em) {
      position: fixed;
      height: 100%;
    }
  }

  html[data-whatinput='keyboard'] & .close-button:focus {
    ${focusRing}
  }

  background-color: transparent;
  transition: background-color ease-out 0.8s;

  &.is-open&:not(.is-closing),
  &:not(.is-overlay) {
    background-color: var(--color-emerald-green);
  }

  /* IE11 fix */
  @media screen and (-ms-high-contrast: none) {
    background-color: #14555a;
  }
`

const LogoWrapper = styled.div`
  position: absolute;
  z-index: 4;
  top: 5vh;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  color: var(--color-white);

  .dnb-logo {
    margin-right: 1rem;
    color: inherit;
  }

  /* IE11 fix */
  @media screen and (-ms-high-contrast: none) {
    width: auto;
    left: 48%;
    color: #fff;
  }
`

const CardsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex-direction: row;

  max-width: 60rem;

  @media (max-width: 40em), (max-height: 55em) {
    margin-top: 14vh;
  }
`

const Toolbar = styled.div`
  position: absolute;
  z-index: 4;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 16vh;

  opacity: 0;
  animation: toolbar-fade-in 800ms ease-out 1 0.6s forwards;

  @keyframes toolbar-fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

const LastUpadted = styled.span`
  display: block;
  font-size: var(--font-size-small);
`

const customBodyStyle = css`
  body {
    transition: background-color ease-out 1.2s;
    background-color: var(--color-emerald-green);
  }
`
const toggleContent = css`
  /* hide content if shown as overlay menu */
  .dnb-skip-link,
  .sticky-menu,
  .content-wrapper {
    display: none !important;
  }
`

export default class MainMenu extends PureComponent {
  static propTypes = {
    enableOverlay: PropTypes.bool
  }
  static defaultProps = {
    enableOverlay: false
  }
  static contextType = MainMenuContext
  constructor(props) {
    super(props)
    setPageFocusElement('a.current-card', 'mainmenu')
  }
  componentDidMount() {
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', this.onKeyDownHandler)
    }
  }
  componentWillUnmount() {
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', this.onKeyDownHandler)
    }
  }
  onKeyDownHandler = e => {
    switch (keycode(e)) {
      case 'esc':
        if (this.context.isOpen) {
          this.context.closeMenu()
        }
        break
    }
  }

  render() {
    const { closeMenu, isOpen, isClosing, isActive } = this.context
    const { enableOverlay } = this.props
    return (
      (isActive || !enableOverlay) && (
        <MainWrapper
          className={classnames(
            enableOverlay && 'is-overlay',
            isOpen && 'is-open',
            isClosing && 'is-closing'
          )}
          {...{ isOpen }}
        >
          <Head>
            <title>Eufemia - DNB Design System</title>
          </Head>
          <h1 className="dnb-sr-only">Welcome to Eufemia</h1>
          {
            <>
              <Global styles={customBodyStyle} />
              {isOpen && !isClosing && <Global styles={toggleContent} />}
              {(enableOverlay && (
                <Toolbar className={classnames(isClosing && 'is-closing')}>
                  {isOpen && !isClosing && (
                    <Button
                      variant="secondary"
                      className="close-button dnb-always-focus"
                      on_click={closeMenu}
                      icon="close"
                      icon_position="left"
                      text="Close"
                      aria-label="Close Main Menu"
                    />
                  )}
                </Toolbar>
              )) ||
                (!enableOverlay && (
                  <LogoWrapper aria-hidden>
                    <Logo size="48" />
                    Eufemia
                  </LogoWrapper>
                ))}
              <CardsWrapper
                // id="portal-main-menu"
                aria-labelledby="toggle-main-menu"
              >
                <Card
                  url="/design-system/"
                  title="About Eufemia"
                  about={
                    <>
                      Change log, contact, etc.
                      <LastUpadted title="Last Change log update">
                        Updated: {buildVersion}
                      </LastUpadted>
                    </>
                  }
                  icon={DesignSystemSvg}
                />
                <Card
                  url="/uilib/"
                  title="UI Library"
                  about="Buttons, dropdowns, input fields, components etc."
                  icon={UilibSvg}
                />
                <Card
                  url="/quickguide-designer/"
                  title="Quick Guide - Designers"
                  about="Eufemia for designers - design guidelines and resources"
                  icon={QuickguideDesignerSvg}
                />
                <Card
                  url="/icons/"
                  title="Icon Library"
                  about="An overview of our most used icons"
                  icon={IconsSvg}
                />
                <Card
                  url="/brand/"
                  title="Brand"
                  about="Brand guidelines - typography, colors etc."
                  icon={BrandSvg}
                />
                <Card
                  url="/principles/"
                  title="Design Principles"
                  about="DNB, Eufemia and UI design principles"
                  icon={PrinciplesSvg}
                />
              </CardsWrapper>
            </>
          }
        </MainWrapper>
      )
    )
  }
}
