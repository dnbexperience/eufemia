/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'

import { GlobalError } from '@dnb/eufemia/src'

export const GlobalError404Example = () => (
  <ComponentBox data-visual-test="global-error-404">
    <GlobalError status="404" />
  </ComponentBox>
)

export const GlobalError500Example = () => (
  <ComponentBox data-visual-test="global-error-500">
    <GlobalError status="500" />
  </ComponentBox>
)
