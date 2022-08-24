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

export const DefinitionListInlineExample = () => (
  <ComponentBox hideCode useRender data-visual-test="lists-dl-inline">
    {
      /* jsx */ `
// import { Dl, Dt, Dd } from '@dnb/eufemia/elements'
const StyledDl = styled(Dl)\`
  display: grid;
  grid-gap: 0.5rem 1rem;
  grid-template-columns: minmax(4rem, auto) 1fr;
  
  &.dnb-dl > dt,
  &.dnb-dl > dd {
    margin: 0;
  }
\`
render(<StyledDl>
  <Dt>Term</Dt>
  <Dd>Description</Dd>
  <Dt>Very long term</Dt>
  <Dd>Description</Dd>
</StyledDl>)
  `
    }
  </ComponentBox>
)
