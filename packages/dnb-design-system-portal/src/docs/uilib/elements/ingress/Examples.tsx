/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import Anchor from '@dnb/eufemia/src/components/Anchor'
import Ingress from '@dnb/eufemia/src/elements/Ingress'

export function IngressExamples() {
  return (
    <ComponentBox>
      <div>
        <Ingress>Default ingress</Ingress>
        <Ingress>
          Ingress with <Anchor href="/">Anchor / Text Link</Anchor> looks
          great!
        </Ingress>
      </div>
    </ComponentBox>
  )
}
