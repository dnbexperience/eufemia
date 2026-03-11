import React, { useContext } from 'react'
import IterateItemContext from '../IterateItemContext'
import { EditContainerWithoutToolbar, AllProps } from '../EditContainer'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

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

export default withComponentMarkers(AnimatedContainer, {
  _supportsSpacingProps: true,
})
