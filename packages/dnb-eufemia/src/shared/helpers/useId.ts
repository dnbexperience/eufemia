import { useId as reactUseId, useMemo } from 'react'
import { makeUniqueId } from '../component-helper'

export default function useId(customId?: string) {
  const id = reactUseId()
  return useMemo(
    () =>
      customId ??
      id?.replace(/_/, 'id-').replace(/_/g, '') ??
      makeUniqueId(),
    [customId, id]
  )
}
