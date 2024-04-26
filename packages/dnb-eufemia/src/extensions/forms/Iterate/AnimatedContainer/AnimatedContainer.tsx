import React, { useContext } from 'react'
import IterateElementContext from '../IterateElementContext'
import { EditContainerWithoutToolbar, AllProps } from '../EditContainer'

function AnimatedContainer(props: AllProps) {
  const iterateElementContext = useContext(IterateElementContext)
  const { isNew } = iterateElementContext ?? {}

  return (
    <EditContainerWithoutToolbar
      open={!isNew ? true : undefined}
      {...props}
    />
  )
}

AnimatedContainer._supportsSpacingProps = true
export default AnimatedContainer
