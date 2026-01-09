import React, { useCallback, useReducer, useRef } from 'react'
import SectionContainerContext from './SectionContainerContext'
import type { ContainerMode } from './SectionContainer'

export type Props = {
  validateInitially?: boolean
  containerMode?: ContainerMode
  disableEditing?: boolean
  children: React.ReactNode
}

function SectionContainerProvider(props: Props) {
  const [, forceUpdate] = useReducer(() => ({}), {})

  const {
    validateInitially,
    containerMode,
    disableEditing = false,
    children,
  } = props

  const containerModeRef = useRef<ContainerMode>(
    disableEditing === true
      ? 'view'
      : containerMode === 'auto'
      ? 'view'
      : containerMode
  )

  const switchContainerMode = useCallback(
    (mode: ContainerMode) => {
      if (disableEditing) {
        return
      }
      containerModeRef.current = mode
      forceUpdate()
    },
    [disableEditing]
  )

  return (
    <SectionContainerContext.Provider
      value={{
        validateInitially,
        containerMode:
          disableEditing === true ? 'view' : containerModeRef.current,
        initialContainerMode:
          disableEditing === true ? 'view' : containerMode,
        switchContainerMode,
        disableEditing,
      }}
    >
      {children}
    </SectionContainerContext.Provider>
  )
}

export default SectionContainerProvider
