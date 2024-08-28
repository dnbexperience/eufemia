import React, { useCallback, useContext, useReducer, useRef } from 'react'
import SectionContainerContext from './SectionContainerContext'
import SectionContext from '../SectionContext'
import { ContainerMode } from './SectionContainer'

export type Props = {
  containerMode?: ContainerMode
  children: React.ReactNode
}

function SectionContainerProvider(props: Props) {
  const [, forceUpdate] = useReducer(() => ({}), {})

  const { containerMode, children } = props

  const sectionContext = useContext(SectionContext)

  const containerModeRef = useRef<ContainerMode>(containerMode)
  const validateFieldsInitiallyRef = useRef(
    sectionContext?.props?.validateFieldsInitially
  )

  const switchContainerMode = useCallback((mode: ContainerMode) => {
    containerModeRef.current = mode
    if (mode === 'view') {
      validateFieldsInitiallyRef.current = true
    }
    forceUpdate()
  }, [])

  return (
    <SectionContainerContext.Provider
      value={{
        containerMode: containerModeRef.current,
        validateFieldsInitially: validateFieldsInitiallyRef.current,
        switchContainerMode,
      }}
    >
      {children}
    </SectionContainerContext.Provider>
  )
}

export default SectionContainerProvider
