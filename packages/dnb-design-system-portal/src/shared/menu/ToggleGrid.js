/**
 * ToggleGrid
 *
 */

import React, { Component } from 'react'
import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import { FormLabel, Switch } from 'dnb-ui-lib/src'
import { gridStyle } from '../parts/PortalStyle'

const globalStyle = css`
  .dev-grid,
  .dev-grid-first > div:first-of-type {
    ${gridStyle({ rgb: '220, 220, 220', a: 0.8 })};

    /* stylelint-disable no-descending-specificity */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    p > a,
    p > code,
    p > small {
      background-color: rgba(255, 255, 122, 0.35);
      :only-child {
        background-color: rgba(0, 200, 200, 0.25);
      }
    }
    /* stylelint-enable */

    ${'' /* code {
      display: block;
      margin: 0 0 1rem 0;
      background-color: rgba(0, 200, 200, 0.25);
    } */}
  }
`

const ToggleWrapper = styled.span`
  .dnb-form-label {
    margin-right: 0.5rem;
  }
  @media (max-width: 50em) {
    display: none;
  }
`

export default class ToggleGrid extends Component {
  state = {
    showGrid: null
  }

  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      this.state.showGrid = parseFloat(
        window.localStorage.getItem('showGrid')
      )
        ? true
        : false
    }
  }
  toggleGrid = () => {
    this.showGrid(!this.state.showGrid)
    this.setState({ showGrid: !this.state.showGrid })
  }
  showGrid = showGrid => {
    if (typeof document !== 'undefined') {
      if (showGrid) {
        document.documentElement.setAttribute('dev-grid', true)
      } else {
        document.documentElement.removeAttribute('dev-grid')
      }
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('showGrid', showGrid ? 1 : 0)
      }
    }
  }
  componentDidMount() {
    if (this.state.showGrid) {
      this.showGrid(true)
    }
  }

  render() {
    const { showGrid } = this.state
    return (
      <ToggleWrapper className="toggle-grid" {...this.props}>
        {showGrid && <Global styles={globalStyle} />}
        <FormLabel for_id="switch-grid" text="Grid" />
        <Switch
          id="switch-grid"
          checked={showGrid}
          on_change={({ checked }) => this.toggleGrid(checked)}
        />
      </ToggleWrapper>
    )
  }
}
