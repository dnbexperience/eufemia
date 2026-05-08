import { useId as reactUseId, useMemo } from 'react'

export default function useId(customId?: string) {
  const id = reactUseId()
  return useMemo(
    () => customId ?? id.replace(/_/, 'id-').replace(/_/g, ''),
    [customId, id]
  )
}
