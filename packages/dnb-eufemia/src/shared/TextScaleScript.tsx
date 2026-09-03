/**
 * Opt-in text-scale helpers.
 *
 * `TextScaleHeadScript` runs synchronously in the document head before paint.
 * `TextScaleClient` is a client-rendering fallback that runs in a layout effect.
 */

import useIsomorphicLayoutEffect from './helpers/useIsomorphicLayoutEffect'
import { applyTextScale, getTextScaleScript } from './TextScaleScriptUtils'

export { applyTextScale, getTextScaleScript } from './TextScaleScriptUtils'

export function TextScaleHeadScript({ nonce }: { nonce?: string } = {}) {
  return (
    <script
      nonce={nonce}
      dangerouslySetInnerHTML={{
        __html: getTextScaleScript(),
      }}
    />
  )
}

/**
 * Client-rendering fallback. This runs before React paints, but cannot prevent
 * a flash when hydrating server-rendered HTML. Prefer `TextScaleHeadScript`.
 */
export function TextScaleClient() {
  useIsomorphicLayoutEffect(() => applyTextScale(), [])
  return null
}
