import React, { useContext } from 'react'
import IterateItemContext from '../IterateItemContext'
import { EditContainerWithoutToolbar, AllProps } from '../EditContainer'

function AnimatedContainer(props: AllProps) {
  const iterateElementContext = useContext(IterateItemContext)
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
