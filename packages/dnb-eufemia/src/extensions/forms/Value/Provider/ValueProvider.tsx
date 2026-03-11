import React from 'react'
import ValueProviderContext from './ValueProviderContext'
import type { Path, ValueProps } from '../../types'
import useValueProvider from './useValueProvider'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ValueProviderProps = {
  children: React.ReactNode
  overwriteProps?: {
    [key: Path]: ValueProps
  }
} & ValueProps

function ValueProviderProvider(props: ValueProviderProps) {
  const { children, ...restProps } = props
  const providerValue = useValueProvider(restProps)

  return (
    <ValueProviderContext value={providerValue}>
      {children}
    </ValueProviderContext>
  )
}

withComponentMarkers(ValueProviderProvider, {
  _supportsSpacingProps: 'children',
})

export default ValueProviderProvider
