import React, { useCallback, useReducer, useRef } from 'react'
import SectionContainerContext from './SectionContainerContext'
import { ContainerMode } from './SectionContainer'

export type Props = {
  validateInitially?: boolean
  containerMode?: ContainerMode
  children: React.ReactNode
}

function SectionContainerProvider(props: Props) {
  const [, forceUpdate] = useReducer(() => ({}), {})

  const { validateInitially, containerMode, children } = props

  const containerModeRef = useRef<ContainerMode>(
    containerMode === 'auto' ? 'view' : containerMode
  )

  const switchContainerMode = useCallback((mode: ContainerMode) => {
    containerModeRef.current = mode
    forceUpdate()
  }, [])

  return (
    <SectionContainerContext.Provider
      value={{
        validateInitially,
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
