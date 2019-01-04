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
  QuickguideDeveloperSvg
} from './Graphics'
import { Button } from 'dnb-ui-lib/src'

const MainWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  z-index: 3; /* one more than Wrapper */

  width: 100vw;

  /* minus StickyMenuBar */
  height: calc(100vh - 4rem);

  /* plus StickyMenuBar */
  margin-top: 4rem;

  background-color: var(--color-emerald-green);

  &.show-as-overlay {
    display: block;
  }

  &.fade-out a {
    animation: fade-out 200ms linear 1 0ms forwards;
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
    100% {
      opacity: 0;
      transform: scale3d(0.9, 0.9, 1) translate3d(0, -8%, 0);
    }
  }
`

const CardsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex-direction: row;

  /* minus StickyMenuBar */
  max-height: calc(100vh - 4rem);
`

const toolbarStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 4em;
`

export default class MainMenu extends PureComponent {
  static propTypes = {
    setAsOverlay: PropTypes.bool,
    enableOverlay: PropTypes.bool,
    onToggleOverlay: PropTypes.func
  }
  static defaultProps = {
    setAsOverlay: false,
    enableOverlay: false,
    onToggleOverlay: null
  }
  constructor(props) {
    super(props)
    this._ref = React.createRef()
  }
  changeBodyDataState = state => {
    if (typeof document !== 'undefined')
      document
        .querySelector('body')
        .setAttribute('data-overlay-active', state ? 'true' : 'false')
  }
  // toggleMenuHandler = () => {
  //   if (this.props.onToggleOverlay) {
  //     this.props.onToggleOverlay()
  //   }
  // }
  state = { hide: null }
  closeMenuHandler = () => {
    this.setState({ hide: true })
    this.changeBodyDataState(false)
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
    if (!this.state.hide) this.changeBodyDataState(true)
    return (
      <>
        <Global
          styles={css`
            @media (min-width: 640px) {
              body[data-overlay-active='true'] {
                overflow: hidden;
              }
            }
          `}
        />
        <MainWrapper
          className={classnames(
            this.props.setAsOverlay ? 'show-as-overlay' : null,
            this.props.enableOverlay ? 'is-overlay' : null,
            this.state.hide ? 'fade-out' : null
          )}
        >
          <div css={toolbarStyle}>
            {this.props.enableOverlay && (
              <Button
                className="main-menu__back dnb-always-focus"
                on_click={this.closeMenuHandler}
                icon="chevron-left"
                icon_position="left"
                text="BACK"
                title="Back"
                innerRef={this._ref}
              />
            )}
          </div>
          <CardsWrapper>
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
              url="/quickguide-developer/"
              title="Quick Guide - Developers"
              about="Eufemia for developers"
              icon={QuickguideDeveloperSvg}
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
              about="Brand guidelines - typography, colors etc. (most relevant for print media)"
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
