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

  /* center on not mobile view */
  &:not(.show-as-overlay) {
    @media (min-width: 640px) {
      height: calc(100vh - 8rem);
    }
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

const CardsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex-direction: row;

  max-width: 60rem;

  /* plus StickyMenuBar */
  margin-top: 4.5rem;
`

const toggleGlobalStyle = css`
  body {
    background-color: var(--color-emerald-green);
  }

  /* hide if shown as  */
  .content-wrapper {
    display: none !important;
  }

  :not(.is-overlay) {
    .sticky-menu {
      position: relative;

      @media (min-height: 45rem) {
        height: auto;
        margin-top: 2rem;
        ${'' /* @media (min-width: 640px) {
        } */}

        border-bottom: none !important;
        background-color: transparent;

        .toggle-grid {
          display: none;
        }

        .dnb-logo,
        .logo-slogan,
        .logo-slogan a {
          color: var(--color-white) !important;
        }

        .dnb-logo {
          svg {
            height: 4rem;
          }
        }
      }
    }
    .sticky-inner {
      max-width: 60rem;
      padding: 0 0.5rem;
    }
  }

  /* disable scrolling on no mobile view */
  @media (min-width: 640px) and (min-height: 45rem) {
    :not(.is-overlay) {
      overflow: hidden;
    }
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
  height: 4em;

  :not(.is-overlay) & {
    @media (max-height: 45rem) {
      background-color: var(--color-ocean-green);
      border-bottom: 1px solid var(--color-summer-green);
    }
  }
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
            this.props.setAsOverlay ? 'show-as-overlay' : null,
            this.props.enableOverlay ? 'is-overlay' : null,
            this.state.hide ? 'fade-out' : null
          )}
        >
          <Toolbar>
            {this.props.enableOverlay && (
              <Button
                variant="secondary"
                class="main-menu__back dnb-always-focus"
                on_click={this.closeMenuHandler}
                icon="chevron-left"
                icon_position="left"
                text="BACK"
                title="Hide Main Menu"
                innerRef={this._ref}
              />
            )}
          </Toolbar>
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
