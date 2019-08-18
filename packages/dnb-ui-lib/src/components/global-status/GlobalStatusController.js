/**
 * Web GlobalStatus Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import GlobalStatusProvider from './GlobalStatusProvider'
import { isTrue } from '../../shared/component-helper'

class GlobalStatusController extends PureComponent {
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

    this.provider = GSP.Factory(props.id)
    const { status_id } = this.provider.add(props)

    // current status id
    this.internal_status_id = props.status_id || status_id
  }

  componentWillUnmount() {
    if (this.provider && isTrue(this.props.remove_on_unmount)) {
      this.provider.remove(this.internal_status_id)
      // this.provider.unbind()
      // this.provider = null
    }
  }

  render() {
    return <></>
  }
}

class GlobalStatusRemove extends PureComponent {
  static propTypes = {
    id: PropTypes.string, // Provider id
    status_id: PropTypes.string // Status Item id
  }
  static defaultProps = {
    id: 'main',
    status_id: null
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
    this.provider = GSP.Factory(props.id)

    if (props.status_id) {
      this.provider.remove(props.status_id)
    }
  }

  render() {
    return <></>
  }
}

export default GlobalStatusController
export { GlobalStatusRemove }

GlobalStatusController.Remove = GlobalStatusRemove
