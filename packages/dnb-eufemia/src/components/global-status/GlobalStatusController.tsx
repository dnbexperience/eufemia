/**
 * Web GlobalStatus Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import GlobalStatusProvider from './GlobalStatusProvider'

export class GlobalStatusInterceptor {
  provider: any
  statusId: string | undefined

  constructor(props: any) {
    let GSP: any = null
    try {
      GSP = GlobalStatusProvider
    } catch (e) {
      // do noting
    }
    if (!GSP && typeof window !== 'undefined') {
      GSP = (window as any).GlobalStatusProvider
    }

    this.provider = GSP.init(props.id || 'main', (provider) => {
      const { statusId } = provider.add(props)

      // current status id
      this.statusId = statusId
    })

    return this
  }
  add(props: any) {
    return this.provider.add({ statusId: this.statusId, ...props })
  }
  update(props: any) {
    return this.provider.update(this.statusId, props)
  }
  remove() {
    return this.provider.remove(this.statusId)
  }
}

// This is the Update controller
class GlobalStatusController extends React.PureComponent<any, any> {
  static Remove: typeof GlobalStatusRemove
  static Update: typeof GlobalStatusController

  static defaultProps = {
    id: 'main',
    statusId: null,
    removeOnUnmount: false,
  }

  static getDerivedStateFromProps(props: any, state: any) {
    if (state._props !== props) {
      state.provider.update(state.statusId, props)
      state._props = props
    }

    return state
  }

  state: any = {}

  constructor(props: any) {
    super(props)

    let GSP: any = null
    try {
      GSP = GlobalStatusProvider
    } catch (e) {
      // do noting
    }
    if (!GSP && typeof window !== 'undefined') {
      GSP = (window as any).GlobalStatusProvider
    }

    this.state.provider = GSP.init(props.id)
    this.state._props = props

    return this
  }

  componentDidMount() {
    const { statusId } = this.state.provider.add(this.props)

    // current status id
    this.setState({ statusId })
  }

  componentWillUnmount() {
    if (this.state.provider && this.props.removeOnUnmount) {
      this.state.provider.remove(this.state.statusId)
      /**
       * For now, do not unbind, because of re-render issues
       */
      // this.state.provider.unbind()
      // this.state.provider = null
    }
  }

  render() {
    return null
  }
}

class GlobalStatusRemove extends React.PureComponent<any, any> {
  static defaultProps = {
    id: 'main',
  }

  static getDerivedStateFromProps(props: any, state: any) {
    if (state._props !== props) {
      state.provider.update(props.statusId, props)
    }

    return state
  }

  state: any = {}

  constructor(props: any) {
    super(props)

    let GSP: any = null
    try {
      GSP = GlobalStatusProvider
    } catch (e) {
      // do noting
    }
    if (!GSP && typeof window !== 'undefined') {
      GSP = (window as any).GlobalStatusProvider
    }
    this.state.provider = GSP.init(props.id)
    this.state._props = props
  }

  componentDidMount() {
    this.state.provider.remove(this.props.statusId, this.props)
  }

  render() {
    return null
  }
}

GlobalStatusController.Remove = GlobalStatusRemove
GlobalStatusController.Update = GlobalStatusController
;(GlobalStatusController as any)._supportsSpacingProps = true

export default GlobalStatusController
export { GlobalStatusRemove }
