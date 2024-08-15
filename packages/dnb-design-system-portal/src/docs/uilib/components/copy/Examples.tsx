/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Copy } from '@dnb/eufemia/src'

export const Default = () => {
  return (
    <ComponentBox>
      <Copy data-visual-test="copy-default">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        cursus pharetra elit in bibendum. Praesent nunc ipsum, convallis
        eget convallis gravida, vehicula vitae metus.
      </Copy>
    </ComponentBox>
  )
}
