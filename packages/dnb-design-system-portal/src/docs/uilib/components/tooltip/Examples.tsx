/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia/src'

export const TooltipExampleDefault = () => (
  <ComponentBox data-visual-test="tooltip-hover">
    <Button tooltip="Tooltip" text="Hover" />
  </ComponentBox>
)

export const TooltipExampleActive = () => (
  <ComponentBox>
    <Button tooltip={<Tooltip active>Tooltip</Tooltip>} text="Active" />
  </ComponentBox>
)

export const TooltipExampleLinked = () => (
  <ComponentBox>
    <button className="target-1">Show the Tooltip</button>
    <Tooltip id="unique" active targetSelector=".target-1">
      Tooltip
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleDelay = () => (
  <ComponentBox data-visual-test="tooltip-large">
    <Tooltip
      hideDelay={1e3}
      size="large"
      targetElement={<Span right>Top</Span>}
    >
      Tooltip 1
    </Tooltip>
    <Tooltip position="bottom" targetElement={<Span>Bottom</Span>}>
      Tooltip 2
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleNumberFormat = () => (
  <ComponentBox>
    <NumberFormat tooltip="Tooltip">1234</NumberFormat>
  </ComponentBox>
)

export const TooltipExampleNumberFormatWrapped = () => (
  <ComponentBox>
    <Tooltip targetElement={<NumberFormat>1234</NumberFormat>}>
      Tooltip
    </Tooltip>
  </ComponentBox>
)
