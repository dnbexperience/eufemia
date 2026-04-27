import React, { useContext } from 'react'
import { Context } from '@dnb/eufemia/src/shared'
import { Switch } from '@dnb/eufemia/src/components'

export default function PortalSkeleton({
  enabled,
  label = 'Toggle Portal Skeletons',
  ...props
}) {
  const { update, skeleton } = useContext(Context)

  return (
    <Switch
      label={label}
      checked={skeleton || enabled}
      onChange={({ checked }) => {
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
      String(skeleton ? true : false)
    )
  } catch (e) {
    //
  }
}
