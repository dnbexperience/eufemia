/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

export const DefinitionListExample = () => (
  <ComponentBox hideCode useRender data-visual-test="lists-dl">
    {
      /* jsx */ `
// import { Dl, Dt, Dd } from '@dnb/eufemia/elements'
render(<Dl>
  <Dt>Term</Dt>
  <Dd>Description</Dd>
  <Dt>Term</Dt>
  <Dd>Description 1</Dd>
  <Dd>Description 2</Dd>
  <Dd>Description 3</Dd>
  <dl className="dnb-dl">
  <Dt>Sub Term</Dt>
  <Dd>Sub Description</Dd>
  </dl>
  </Dl>)
  `
    }
  </ComponentBox>
)

export const DefinitionListHorizontalExample = () => (
  <ComponentBox hideCode useRender data-visual-test="lists-dl-horizontal">
    {
      /* jsx */ `
// import { Dl, Dt, Dd } from '@dnb/eufemia/elements'
render(<Dl direction="horizontal">
  <Dl.Item>
    <Dt>Term</Dt>
    <Dd>Description</Dd>
  </Dl.Item>
  <Dl.Item>
    <Dt>A term with several words</Dt>
    <Dd>Description with several words lorem nulla mi posuere cubilia vel vulputate</Dd>
  </Dl.Item>
</Dl>)
  `
    }
  </ComponentBox>
)
