/**
 * Main Menu
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import classnames from 'classnames'
import Card from './Card'
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
import { buildVersion } from '../../../package.json'
import { MainMenuConsumer, MainMenuContext } from './MainMenuContext'
import {
  setPageFocusElement,
  applyPageFocus
} from 'dnb-ui-lib/src/shared/tools'

class MainWrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  constructor(props) {
    super(props)
    this._focusRef = React.createRef()
  }

  componentDidMount() {
    setPageFocusElement(this._focusRef.current, 'mainmenu')
    applyPageFocus('mainmenu')
  }

  render() {
    return (
      <MainWrapperStyled {...this.props} ref={this._focusRef}>
        {this.props.children}
      </MainWrapperStyled>
    )
  }
}

const MainWrapperStyled = styled.div`
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
    height: 100%;
  }

  background-color: transparent;
  transition: background-color ease-out 0.4s;

  &.is-open&:not(.is-closing),
  &:not(.is-overlay) {
    background-color: var(--color-emerald-green);
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
`

const LastUpadted = styled.span`
  display: block;
  font-size: var(--font-size-small);
`

const toggleGlobalStyle = css`
  body {
    transition: background-color ease-out 1.2s;
    background-color: var(--color-emerald-green);
  }

  /* hide content if shown as overlay menu */
  .content-wrapper {
    ${'' /* display: none !important; */}
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
  componentDidMount() {
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', this.onKeyDownHandler)
    }
  }
  componentWillUnmount() {
    this.closeMenuHandler = null
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', this.onKeyDownHandler)
    }
  }
  onKeyDownHandler = e => {
    switch (keycode(e)) {
      case 'esc':
        if (this.closeMenuHandler) {
          this.closeMenuHandler()
        }
        break
    }
  }
  render() {
    const { enableOverlay } = this.props
    return (
      <MainMenuConsumer>
        {({ closeMenu, isOpen, isClosing, isActive }) => {
          this.closeMenuHandler = closeMenu
          return (
            (isActive || !enableOverlay) && (
              <MainWrapper
                className={classnames(
                  enableOverlay && 'is-overlay',
                  isOpen && 'is-open',
                  isClosing && 'is-closing'
                )}
              >
                {
                  <>
                    {enableOverlay && (
                      <Global styles={toggleGlobalStyle} />
                    )}
                    {(enableOverlay && (
                      <Toolbar>
                        {isOpen && !isClosing && (
                          <Button
                            variant="secondary"
                            class="dnb-always-focus"
                            on_click={closeMenu}
                            icon="close"
                            icon_position="left"
                            text="Close"
                            title="Close Main Menu"
                            // innerRef={this._focusRef}
                          />
                        )}
                      </Toolbar>
                    )) ||
                      (!enableOverlay && (
                        <LogoWrapper>
                          <Logo size="48" />
                          Eufemia
                        </LogoWrapper>
                      ))}
                    <CardsWrapper>
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
        }}
      </MainMenuConsumer>
    )
  }
}
