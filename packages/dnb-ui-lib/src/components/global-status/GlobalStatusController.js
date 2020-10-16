/**
 * Web GlobalStatus Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import GlobalStatusProvider from './GlobalStatusProvider'
import { isTrue } from '../../shared/component-helper'

// This is the Update controller
class GlobalStatusController extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string, // Provider id
    status_id: PropTypes.string, // Status Item id
    remove_on_unmount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ])
  }
  static defaultProps = {
    id: 'main',
    status_id: null,
    remove_on_unmount: false
  }

  constructor(props) {
    super(props)

    let GSP = null
    try {
      GSP = GlobalStatusProvider
    } catch (e) {
      // do noting
    }
    if (!GSP && typeof window !== 'undefined') {
      GSP = window.GlobalStatusProvider
    }

    this.provider = GSP.init(props.id, (provider) => {
      const { status_id } = provider.add(props)

      // current status id
      this.internal_status_id = props.status_id || status_id
    })

    return this
  }

  remove(props) {
    this.provider.remove(this.internal_status_id, props)
  }

  componentWillUnmount() {
    if (this.provider && isTrue(this.props.remove_on_unmount)) {
      this.provider.remove(this.internal_status_id)
      /**
       * For now, do not unbind, because of re-render issues
       */
      // this.provider.unbind()
      // this.provider = null
    }
  }

  render() {
    return null
  }
}

class GlobalStatusRemove extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string, // Provider id
    status_id: PropTypes.string // Status Item id
  }
  static defaultProps = {
    id: 'main',
    status_id: 'status-main'
  }

  constructor(props) {
    super(props)

    let GSP = null
    try {
      GSP = GlobalStatusProvider
    } catch (e) {
      // do noting
    }
    if (!GSP && typeof window !== 'undefined') {
      GSP = window.GlobalStatusProvider
    }
    this.provider = GSP.init(props.id, (provider) => {
      provider.remove(props.status_id, props)
    })
  }

  render() {
    return null
  }
}

class GlobalStatusUpdate extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string, // Provider id
    status_id: PropTypes.string // Status Item id
  }
  static defaultProps = {
    id: 'main',
    status_id: null // do not use 'status-main' here!
  }

  constructor(props) {
    super(props)

    let GSP = null
    try {
      GSP = GlobalStatusProvider
    } catch (e) {
      // do noting
    }
    if (!GSP && typeof window !== 'undefined') {
      GSP = window.GlobalStatusProvider
    }
    this.provider = GSP.init(props.id, (provider) => {
      provider.update(props.status_id, props)
    })
  }

  render() {
    return null
  }
}

GlobalStatusController.Remove = GlobalStatusRemove
GlobalStatusController.Update = GlobalStatusUpdate

export default GlobalStatusController
export { GlobalStatusRemove, GlobalStatusUpdate }
