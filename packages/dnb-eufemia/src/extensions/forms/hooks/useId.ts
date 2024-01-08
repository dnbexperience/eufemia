import React from 'react'
import { makeUniqueId } from '../../../shared/component-helper'

export default function useId(customId?: string) {
  const id = React?.useId?.()
  return React.useMemo(
    () => customId ?? id ?? makeUniqueId(),
    [customId, id]
  )
}
