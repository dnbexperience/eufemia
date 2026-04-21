import React, { useContext } from 'react'
import IterateItemContext from '../IterateItemContext'
import type { IterateEditContainerAllProps } from '../EditContainer'
import { EditContainerWithoutToolbar } from '../EditContainer'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

function AnimatedContainer(props: IterateEditContainerAllProps) {
  const iterateItemContext = useContext(IterateItemContext)
  const { isNew } = iterateItemContext ?? {}

  return (
    <EditContainerWithoutToolbar
      open={!isNew ? true : undefined}
      {...props}
    />
  )
}

withComponentMarkers(AnimatedContainer, {
  _supportsSpacingProps: true,
})

export default AnimatedContainer
