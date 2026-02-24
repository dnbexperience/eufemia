import React from 'react'
import { makeUniqueId } from '../component-helper'

export default function useId(customId?: string) {
  const id = React.useId()
  return React.useMemo(
    () =>
      customId ??
      id?.replace(/_/, 'id-').replace(/_/g, '') ??
      makeUniqueId(),
    [customId, id]
  )
}
