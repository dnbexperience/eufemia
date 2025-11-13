import React, { useCallback, useReducer, useRef } from 'react'
import SectionContainerContext from './SectionContainerContext'
import { ContainerMode } from './SectionContainer'

export type Props = {
  validateInitially?: boolean
  containerMode?: ContainerMode
  editable?: boolean
  children: React.ReactNode
}

function SectionContainerProvider(props: Props) {
  const [, forceUpdate] = useReducer(() => ({}), {})

  const {
    validateInitially,
    containerMode,
    editable = true,
    children,
  } = props

  const containerModeRef = useRef<ContainerMode>(
    editable === false
      ? 'view'
      : containerMode === 'auto'
      ? 'view'
      : containerMode
  )

  const switchContainerMode = useCallback(
    (mode: ContainerMode) => {
      if (!editable) {
        return
      }
      containerModeRef.current = mode
      forceUpdate()
    },
    [editable]
  )

  return (
    <SectionContainerContext.Provider
      value={{
        validateInitially,
        containerMode:
          editable === false ? 'view' : containerModeRef.current,
        initialContainerMode: editable === false ? 'view' : containerMode,
        switchContainerMode,
        editable,
      }}
    >
      {children}
    </SectionContainerContext.Provider>
  )
}

export default SectionContainerProvider
