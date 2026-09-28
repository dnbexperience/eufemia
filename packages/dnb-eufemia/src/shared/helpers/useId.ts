import { useId as reactUseId, useMemo } from 'react'

export default function useId(customId?: string) {
  const id = reactUseId()
  return useMemo(
    // React has used ":r1:" (19.0), "«r1»" (19.1) and "_r_1_" (19.2) so far, so we
    // keep what a CSS identifier allows instead of stripping the delimiters we know of
    () => customId ?? `id-${id.replace(/[^a-zA-Z0-9-]/g, '')}`,
    [customId, id]
  )
}
