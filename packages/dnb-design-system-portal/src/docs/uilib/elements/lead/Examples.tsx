/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import Anchor from '@dnb/eufemia/src/components/Anchor'
import Lead from '@dnb/eufemia/src/elements/Lead'

export function LeadExamples() {
  return (
    <ComponentBox>
      <div>
        <Lead>Default lead</Lead>
        <Lead>
          Lead with <Anchor href="/">Anchor / Text Link</Anchor> looks
          great!
        </Lead>
      </div>
    </ComponentBox>
  )
}
