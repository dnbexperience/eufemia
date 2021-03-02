import React from 'react'
import { Context } from '@dnb/eufemia/src/shared'
import { ToggleButton, Skeleton } from '@dnb/eufemia/src/components'

export default function PortalSkeleton() {
  const { update, skeleton } = React.useContext(Context)

  return (
    <Skeleton.Exclude>
      <ToggleButton
        top
        checked={skeleton}
        on_change={({ checked }) => {
          setSkeletonEnabled(checked)
          update({ skeleton: checked })
        }}
      >
        Toggle Portal Skeletons
      </ToggleButton>
    </Skeleton.Exclude>
  )
}

function setSkeletonEnabled(skeleton) {
  try {
    window.localStorage.setItem(
      'skeleton-enabled',
      skeleton ? true : false
    )
  } catch (e) {
    //
  }
}
