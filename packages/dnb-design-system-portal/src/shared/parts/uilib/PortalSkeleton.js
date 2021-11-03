import React from 'react'
import { Context } from '@dnb/eufemia/src/shared'
import { Switch } from '@dnb/eufemia/src/components'

export default function PortalSkeleton({ enabled, ...props }) {
  const { update, skeleton } = React.useContext(Context)

  return (
    <Switch
      top
      label="Toggle Portal Skeletons"
      checked={skeleton || enabled}
      on_change={({ checked }) => {
        setSkeletonEnabled(checked)
        update({ skeleton: checked })
      }}
      {...props}
      skeleton={false}
    />
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
