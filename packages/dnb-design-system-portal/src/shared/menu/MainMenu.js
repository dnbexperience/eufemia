/**
 * Main Menu
 *
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectGlobal, css } from 'react-emotion'
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

injectGlobal`
  @media (min-width: 640px) {
    body[data-overlay-active='true'] {
      overflow: hidden;
    }
  }
`

const sectionsStyle = css`
  display: flex;
  flex-flow: row wrap;
  flex-direction: row;
  justify-content: stretch;
  height: 100%;

  a,
  a:hover {
    color: black;
    padding: 0;
    border: none;
  }
`

const mainMenuStyle = css`
  width: 100vw;
  height: calc(100vh - 4em); /* minus StickyMenuBar */
  @media (min-width: 640px) {
    &.is-overlay {
      display: none;
      position: fixed;
      z-index: 3; /* one more than Wrapper */
      top: 0;
      left: 0;

      /* we dont use z-index for now, as its not required */
      ${'' /* z-index: 100; */};
    }
  }
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

const toolbarStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 4em;

  background-color: #fff;
`

export default class MainMenu extends Component {
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
      <div
        css={mainMenuStyle}
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
        <div css={sectionsStyle}>
          <Card
            url="/uilib/"
            title="UI Library"
            icon={UilibSvg}
            customStyle={oceanGreen}
            onClick={this.closeMenuHandler}
          />
          <Card
            url="/quickguide-designer/"
            title="Quick Guide - Designers"
            icon={QuickguideDesignerSvg}
            customStyle={mintGreen}
            onClick={this.closeMenuHandler}
          />
          <Card
            url="/quickguide-developer/"
            title="Quick Guide - Developers"
            icon={QuickguideDeveloperSvg}
            customStyle={summerGreen}
            onClick={this.closeMenuHandler}
          />
          <Card
            url="/icons/"
            title="Icon Library"
            icon={IconsSvg}
            customStyle={oceanGreen}
            onClick={this.closeMenuHandler}
          />
          <Card
            url="/brand/"
            title="Brand"
            icon={BrandSvg}
            customStyle={emeraldGreen}
            onClick={this.closeMenuHandler}
          />
          <Card
            url="/principles/"
            title="Design Principles"
            icon={PrinciplesSvg}
            customStyle={seaGreen}
            onClick={this.closeMenuHandler}
          />
        </div>
      </div>
    )
  }
}

const oceanGreen = css`
  background-color: rgb(0, 52, 62);
`

const emeraldGreen = css`
  background-color: rgb(20, 85, 90);
`

const seaGreen = css`
  background-color: rgb(0, 114, 114);
`

const mintGreen = css`
  background-color: rgb(165, 225, 210);
`

const summerGreen = css`
  background-color: rgb(40, 180, 130);
`
