import React, { useContext } from 'react'
import IterateItemContext from '../IterateItemContext'
import { EditContainerWithoutToolbar, AllProps } from '../EditContainer'

function AnimatedContainer(props: AllProps) {
  const iterateItemContext = useContext(IterateItemContext)
  const { isNew } = iterateItemContext ?? {}

  return (
    <EditContainerWithoutToolbar
      open={!isNew ? true : undefined}
      {...props}
    />
  )
}

AnimatedContainer._supportsSpacingProps = true
export default AnimatedContainer
