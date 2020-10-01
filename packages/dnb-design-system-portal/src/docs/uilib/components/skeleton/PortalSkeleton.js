import React from 'react'
import { Context } from 'dnb-ui-lib/src/shared'
import { ToggleButton, Skeleton } from 'dnb-ui-lib/src/components'
import { setSkeletonEnabled } from '../../../../core/portalProviders'

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
