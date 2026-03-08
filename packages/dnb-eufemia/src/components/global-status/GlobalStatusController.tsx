/**
 * Web GlobalStatus Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import GlobalStatusProvider from './GlobalStatusProvider'
import type {
  GlobalStatusAddProps,
  GlobalStatusInterceptorProps,
} from './GlobalStatus'

export class GlobalStatusInterceptor {
  provider: ReturnType<typeof GlobalStatusProvider.init>
  statusId: string | undefined

  constructor(props: GlobalStatusInterceptorProps) {
    let GSP: typeof GlobalStatusProvider | null = null
    try {
      GSP = GlobalStatusProvider
    } catch (e) {
      // do noting
    }
    if (!GSP && typeof window !== 'undefined') {
      GSP = (window as Record<string, any>).GlobalStatusProvider
    }

    this.provider = GSP.init(props.id || 'main', (provider) => {
      const { statusId } = provider.add(props)

      // current status id
      this.statusId = statusId
    })

    return this
  }
  add(props: Partial<GlobalStatusAddProps>) {
    return this.provider.add({ statusId: this.statusId, ...props })
  }
  update(props: Record<string, unknown>) {
    return this.provider.update(this.statusId, props)
  }
  remove() {
    return this.provider.remove(this.statusId)
  }
}

type GlobalStatusControllerProps = {
  id?: string
  statusId?: string
  removeOnUnmount?: boolean
  [key: string]: unknown
}

type GlobalStatusControllerState = {
  provider?: ReturnType<typeof GlobalStatusProvider.init>
  statusId?: string
  _props?: GlobalStatusControllerProps
}

// This is the Update controller
class GlobalStatusController extends React.PureComponent<
  GlobalStatusControllerProps,
  GlobalStatusControllerState
> {
  static Remove: typeof GlobalStatusRemove
  static Update: typeof GlobalStatusController

  static defaultProps = {
    id: 'main',
    statusId: null,
    removeOnUnmount: false,
  }

  static getDerivedStateFromProps(
    props: GlobalStatusControllerProps,
    state: GlobalStatusControllerState
  ) {
    if (state._props !== props) {
      state.provider?.update(state.statusId, props)
      state._props = props
    }

    return state
  }

  state: GlobalStatusControllerState = {}

  constructor(props: GlobalStatusControllerProps) {
    super(props)

    let GSP: typeof GlobalStatusProvider | null = null
    try {
      GSP = GlobalStatusProvider
    } catch (e) {
      // do noting
    }
    if (!GSP && typeof window !== 'undefined') {
      GSP = (window as Record<string, any>).GlobalStatusProvider
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

type GlobalStatusRemovePropsLocal = {
  id?: string
  statusId?: string
  [key: string]: unknown
}

type GlobalStatusRemoveState = {
  provider?: ReturnType<typeof GlobalStatusProvider.init>
  _props?: GlobalStatusRemovePropsLocal
}

class GlobalStatusRemove extends React.PureComponent<
  GlobalStatusRemovePropsLocal,
  GlobalStatusRemoveState
> {
  static defaultProps = {
    id: 'main',
  }

  static getDerivedStateFromProps(
    props: GlobalStatusRemovePropsLocal,
    state: GlobalStatusRemoveState
  ) {
    if (state._props !== props) {
      state.provider?.update(props.statusId, props)
    }

    return state
  }

  state: GlobalStatusRemoveState = {}

  constructor(props: GlobalStatusRemovePropsLocal) {
    super(props)

    let GSP: typeof GlobalStatusProvider | null = null
    try {
      GSP = GlobalStatusProvider
    } catch (e) {
      // do noting
    }
    if (!GSP && typeof window !== 'undefined') {
      GSP = (window as Record<string, any>).GlobalStatusProvider
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

withComponentMarkers(GlobalStatusController, {
  _supportsSpacingProps: true,
})

export default GlobalStatusController
export { GlobalStatusRemove }
