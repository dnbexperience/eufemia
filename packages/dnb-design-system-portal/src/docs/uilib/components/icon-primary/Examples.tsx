/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

import { IconPrimary } from '@dnb/eufemia/src'

export const IconPrimaryDefaultExample = () => (
  <ComponentBox>
    <IconPrimary icon="question" title="Give icons a title" />
    <IconPrimary
      icon="question_medium"
      title="Size defined in name"
      aria-hidden
    />
  </ComponentBox>
)

export const IconPrimaryFixedSizeExample = () => (
  <ComponentBox>
    <IconPrimary icon="question" size="64" title="I'm not responsive!" />
  </ComponentBox>
)
