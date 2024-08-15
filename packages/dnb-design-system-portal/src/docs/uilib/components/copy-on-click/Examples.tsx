/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { CopyOnClick, P } from '@dnb/eufemia/src'

export const Default = () => {
  return (
    <ComponentBox>
      <P>
        <CopyOnClick data-visual-test="copy-default">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum. Praesent nunc ipsum, convallis
          eget convallis gravida, vehicula vitae metus.
        </CopyOnClick>
      </P>
    </ComponentBox>
  )
}

export const CopyCursorHidden = () => {
  return (
    <ComponentBox>
      <P>
        <CopyOnClick data-visual-test="copy-cursor-disabled" showCursor={false}>
          Praesent nunc ipsum, convallis eget convallis gravida, vehicula
          vitae metus.
        </CopyOnClick>
      </P>
    </ComponentBox>
  )
}
