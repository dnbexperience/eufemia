import { useId as reactUseId, useMemo } from 'react'

export default function useId(customId?: string) {
  const id = reactUseId()
  return useMemo(
    // React 19.0 returns ":r1:", 19.1 "«r1»" and 19.2+ "_r_1_"
    () => customId ?? `id-${id.replace(/[:_«»]/g, '')}`,
    [customId, id]
  )
}
