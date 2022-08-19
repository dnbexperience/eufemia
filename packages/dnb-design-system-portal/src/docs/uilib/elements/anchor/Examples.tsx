/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

export const AnchorExampleInSection = () =>
  !global.IS_TEST ? null : (
    <ComponentBox data-visual-test="anchor-in-section">
      {
        /* jsx */ `
<Section spacing style_type="emerald-green">
  <Anchor
    className="dnb-anchor--no-underline"
    href="https://dnb.no/"
  >
    Anchor in Section without underline
  </Anchor>
</Section>
   `
      }
    </ComponentBox>
  )
