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

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  @media (max-width: 40em), (max-height: 55em) {
    height: auto;
  }

  &.fade-out .card-wrapper {
    animation: fade-out 400ms linear 1 0ms forwards;
  }
  .main-menu__back {
    opacity: 1;
    transition: opacity 180ms;
  }
  &.fade-out .main-menu__back {
    opacity: 0;
  }

  @keyframes fade-out {
    0% {
      opacity: 1;
      transform: scale3d(1, 1, 1) translate3d(0, 0, 0);
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      transform: scale3d(0.9, 0.9, 1) translate3d(0, -8%, 0);
    }
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
  z-index: 2;
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
    background-color: var(--color-emerald-green);
  }

  /* hide content if shown as overlay menu */
  .content-wrapper {
    display: none !important;
  }
`

export default class MainMenu extends PureComponent {
  static propTypes = {
    enableOverlay: PropTypes.bool,
    onToggleOverlay: PropTypes.func
  }
  static defaultProps = {
    enableOverlay: false,
    onToggleOverlay: null
  }
  constructor(props) {
    super(props)
    this._ref = React.createRef()
  }
  state = { hide: null }
  closeMenuHandler = () => {
    this.setState({ hide: true })
    this.timeoutId = setTimeout(() => {
      if (this.props.onToggleOverlay) {
        this.props.onToggleOverlay(false)
      }
    }, 220)
  }
  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', this.onKeyDownHandler)
    }
  }
  componentDidMount() {
    if (this._ref.current) {
      this._ref.current.focus()
    }
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', this.onKeyDownHandler)
    }
  }
  onKeyDownHandler = e => {
    switch (keycode(e)) {
      case 'esc':
        this.closeMenuHandler()
        break
    }
  }
  render() {
    return (
      <>
        <Global styles={toggleGlobalStyle} />
        <MainWrapper
          className={classnames(
            this.props.enableOverlay ? 'is-overlay' : null,
            this.state.hide ? 'fade-out' : null
          )}
        >
          {(this.props.enableOverlay && (
            <Toolbar>
              <Button
                variant="secondary"
                class="main-menu__back dnb-always-focus"
                on_click={this.closeMenuHandler}
                icon="close"
                icon_position="left"
                text="Close"
                title="Close Main Menu"
                innerRef={this._ref}
              />
            </Toolbar>
          )) || (
            <LogoWrapper>
              <Logo size="48" />
              Eufemia
            </LogoWrapper>
          )}
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
              onClick={this.closeMenuHandler}
            />
            <Card
              url="/uilib/"
              title="UI Library"
              about="Buttons, dropdowns, input fields, components etc."
              icon={UilibSvg}
              onClick={this.closeMenuHandler}
            />
            <Card
              url="/quickguide-designer/"
              title="Quick Guide - Designers"
              about="Eufemia for designers - design guidelines and resources"
              icon={QuickguideDesignerSvg}
              onClick={this.closeMenuHandler}
            />
            <Card
              url="/icons/"
              title="Icon Library"
              about="An overview of our most used icons"
              icon={IconsSvg}
              onClick={this.closeMenuHandler}
            />
            <Card
              url="/brand/"
              title="Brand"
              about="Brand guidelines - typography, colors etc."
              icon={BrandSvg}
              onClick={this.closeMenuHandler}
            />
            <Card
              url="/principles/"
              title="Design Principles"
              about="DNB, Eufemia and UI design principles"
              icon={PrinciplesSvg}
              onClick={this.closeMenuHandler}
            />
          </CardsWrapper>
        </MainWrapper>
      </>
    )
  }
}
