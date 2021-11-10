/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

export const TooltipExampleDefault = () => (
  <ComponentBox data-visual-test="tooltip-hover">
    {`
<Button tooltip="Tooltip" text="Hover" />
`}
  </ComponentBox>
)

export const TooltipExampleActive = () => (
  <ComponentBox data-visual-test="tooltip-active">
    {`
<Button tooltip={<Tooltip active>Tooltip</Tooltip>} text="Active" />
`}
  </ComponentBox>
)

export const TooltipExampleLinked = () => (
  <ComponentBox>
    {`
<button className="target-1">Show the Tooltip</button>
<Tooltip id="unique" active target_selector=".target-1">Tooltip</Tooltip>
`}
  </ComponentBox>
)

export const TooltipExampleAnimation = () => (
  <ComponentBox>
    {`
<Tooltip
  animate_position
  group="animate_position"
  hide_delay={1e3}
  target_element={<Span role="text" right>Top</Span>}
>
  Tooltip 1
</Tooltip>
<Tooltip
  animate_position
  group="animate_position"
  position="bottom"
  size="large"
  target_element={<Span role="text">Bottom</Span>}
>
  Tooltip 2
</Tooltip>
`}
  </ComponentBox>
)

export const TooltipExampleNumberFormat = () => (
  <ComponentBox>
    {`
<NumberFormat tooltip="Tooltip">1234</NumberFormat>
`}
  </ComponentBox>
)

export const TooltipExampleNumberFormatWrapped = () => (
  <ComponentBox>
    {`
<Tooltip
  target_element={<NumberFormat>1234</NumberFormat>}
>
  Tooltip
</Tooltip>
`}
  </ComponentBox>
)
