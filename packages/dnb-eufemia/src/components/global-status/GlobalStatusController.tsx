/**
 * Web GlobalStatus Component
 */

import React, { useRef } from 'react'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import useMountEffect from '../../shared/helpers/useMountEffect'
import GlobalStatusProvider from './GlobalStatusProvider'
import { removeUndefinedProps } from '../../shared/component-helper'
import type {
  GlobalStatusAddProps,
  GlobalStatusInterceptorProps,
} from './GlobalStatus'

type WindowWithProvider = Window & {
  GlobalStatusProvider?: typeof GlobalStatusProvider
}

export class GlobalStatusInterceptor {
  provider: ReturnType<typeof GlobalStatusProvider.init>
  statusId: string | undefined

  constructor(props: GlobalStatusInterceptorProps) {
    let GSP: typeof GlobalStatusProvider | null = null
    try {
      GSP = GlobalStatusProvider
    } catch (e) {
      // do nothing
    }
    if (!GSP && typeof window !== 'undefined') {
      GSP = (window as WindowWithProvider).GlobalStatusProvider
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

function initProvider(id: string) {
  let GSP: typeof GlobalStatusProvider | null = null
  try {
    GSP = GlobalStatusProvider
  } catch (e) {
    // do nothing
  }
  if (!GSP && typeof window !== 'undefined') {
    GSP = (window as WindowWithProvider).GlobalStatusProvider
  }
  return GSP.init(id)
}

type GlobalStatusControllerProps = {
  id?: string
  statusId?: string
  removeOnUnmount?: boolean
  [key: string]: unknown
}

const globalStatusControllerDefaultProps: Partial<GlobalStatusControllerProps> =
  {
    id: 'main',
    statusId: null,
    removeOnUnmount: false,
  }

// This is the Update controller
function GlobalStatusController(ownProps: GlobalStatusControllerProps) {
  const props = {
    ...globalStatusControllerDefaultProps,
    ...removeUndefinedProps({ ...ownProps }),
  }

  const providerRef =
    useRef<ReturnType<typeof GlobalStatusProvider.init>>(undefined)
  const statusIdRef = useRef<string | undefined>(undefined)
  const prevPropsRef = useRef<GlobalStatusControllerProps | undefined>(
    undefined
  )
  const removeOnUnmountRef = useRef(props.removeOnUnmount)
  removeOnUnmountRef.current = props.removeOnUnmount

  // Initialize provider (constructor equivalent)
  if (!providerRef.current) {
    providerRef.current = initProvider(props.id)
    prevPropsRef.current = ownProps
  }

  // getDerivedStateFromProps equivalent: update provider when props change
  if (prevPropsRef.current !== ownProps) {
    providerRef.current?.update(statusIdRef.current, props)
    prevPropsRef.current = ownProps
  }

  // componentDidMount + componentWillUnmount
  useMountEffect(() => {
    const { statusId } = providerRef.current.add(props)
    statusIdRef.current = statusId

    return () => {
      if (providerRef.current && removeOnUnmountRef.current) {
        providerRef.current.remove(statusIdRef.current)
        /**
         * For now, do not unbind, because of re-render issues
         */
        // providerRef.current.unbind()
        // providerRef.current = null
      }
    }
  })

  return null
}

const MemoizedGlobalStatusController = React.memo(
  GlobalStatusController
) as React.MemoExoticComponent<typeof GlobalStatusController> & {
  Remove: typeof MemoizedGlobalStatusRemove
  Update: typeof MemoizedGlobalStatusController
}

type GlobalStatusRemovePropsLocal = {
  id?: string
  statusId?: string
  [key: string]: unknown
}

const globalStatusRemoveDefaultProps: Partial<GlobalStatusRemovePropsLocal> =
  {
    id: 'main',
  }

function GlobalStatusRemove(ownProps: GlobalStatusRemovePropsLocal) {
  const props = {
    ...globalStatusRemoveDefaultProps,
    ...removeUndefinedProps({ ...ownProps }),
  }

  const providerRef =
    useRef<ReturnType<typeof GlobalStatusProvider.init>>(undefined)
  const prevPropsRef = useRef<GlobalStatusRemovePropsLocal | undefined>(
    undefined
  )

  // Initialize provider
  if (!providerRef.current) {
    providerRef.current = initProvider(props.id)
    prevPropsRef.current = ownProps
  }

  // getDerivedStateFromProps equivalent
  if (prevPropsRef.current !== ownProps) {
    providerRef.current?.update(props.statusId, props)
    prevPropsRef.current = ownProps
  }

  // componentDidMount
  useMountEffect(() => {
    providerRef.current.remove(props.statusId, props)
  })

  return null
}

const MemoizedGlobalStatusRemove = React.memo(GlobalStatusRemove)

MemoizedGlobalStatusController.Remove = MemoizedGlobalStatusRemove
MemoizedGlobalStatusController.Update = MemoizedGlobalStatusController

withComponentMarkers(MemoizedGlobalStatusController, {
  _supportsSpacingProps: true,
})

export default MemoizedGlobalStatusController
export { MemoizedGlobalStatusRemove as GlobalStatusRemove }
