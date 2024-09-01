import React, { useCallback, useReducer, useRef } from 'react'
import SectionContainerContext from './SectionContainerContext'
import { ContainerMode } from './SectionContainer'

export type Props = {
  containerMode?: ContainerMode
  children: React.ReactNode
}

function SectionContainerProvider(props: Props) {
  const [, forceUpdate] = useReducer(() => ({}), {})

  const { containerMode, children } = props

  const containerModeRef = useRef<ContainerMode>(
    containerMode === 'openWhenFieldValidationError'
      ? 'view'
      : containerMode
  )

  const switchContainerMode = useCallback((mode: ContainerMode) => {
    containerModeRef.current = mode
    forceUpdate()
  }, [])

  return (
    <SectionContainerContext.Provider
      value={{
        containerMode: containerModeRef.current,
        initialContainerMode: containerMode,
        switchContainerMode,
      }}
    >
      {children}
    </SectionContainerContext.Provider>
  )
}

export default SectionContainerProvider
