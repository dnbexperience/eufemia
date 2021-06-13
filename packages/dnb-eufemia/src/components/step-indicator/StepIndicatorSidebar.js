/**
 * Web StepIndicator Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import StepIndicatorList from './StepIndicatorList'
import { StepIndicatorProvider } from './StepIndicatorContext'
import EventEmitter from '../../shared/EventEmitter'
import { onMediaQueryChange } from '../../shared/MediaQueryUtils'

export default class StepIndicatorSidebar extends React.PureComponent {
  static propTypes = {
    sidebar_id: PropTypes.string.isRequired,
    /** Used for testing */
    internalId: PropTypes.string,
  }
  static defaultProps = {
    internalId: null,
  }

  state = { hasSidebar: true, hideSidebar: false }

  constructor(props) {
    super(props)
    this._eventEmitter = EventEmitter.createInstance(props.sidebar_id)
    this._eventEmitter.set({
      hideSidebar: true,
    })
  }

  componentDidMount() {
    this._mediaQueryListener = onMediaQueryChange(
      {
        min: '0',
        max: 'medium',
      },
      (hideSidebar) => {
        this.setState({
          hideSidebar,
        })
        if (this._eventEmitter) {
          this._eventEmitter.update({
            hideSidebar,
          })
        }
      },
      { runOnInit: true }
    )
  }

  componentWillUnmount() {
    if (this._mediaQueryListener) {
      this._mediaQueryListener()
    }
    if (this._eventEmitter) {
      this._eventEmitter.update({
        hasSidebar: false,
      })
    }
    if (this._eventEmitter) {
      this._eventEmitter.remove()
      this._eventEmitter = null
    }
  }

  render() {
    return (
      <StepIndicatorProvider
        sidebar_id={this.props.internalId || this.props.sidebar_id}
        listAttributes={this.props}
        {...this.state}
      >
        <div
          className={classnames(
            'dnb-step-indicator-v2',
            'dnb-step-indicator__sidebar',
            this.state.hasSidebar &&
              this.state.hideSidebar &&
              'dnb-sr-only'
          )}
        >
          <StepIndicatorList />
        </div>
      </StepIndicatorProvider>
    )
  }
}
