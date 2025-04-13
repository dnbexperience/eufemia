/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia/src'

const longText =
  'What’s the best thing about Switzerland? I’m not sure, but the flag is a big plus. 🇨🇭'

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

export const TooltipExampleButtonLongText = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-button-long-text"
    scope={{ longText }}
  >
    <Button tooltip={`${longText} ${longText}`} text="Long Tooltip" />
  </ComponentBox>
)

export const TooltipExampleAlignLeft = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-align-left"
    scope={{ longText }}
  >
    <Button className="target-align-left">Align tooltip left</Button>
    <Tooltip
      id="unique-align-left"
      targetSelector=".target-align-left"
      align="left"
    >
      {longText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleAlignRight = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-align-right"
    scope={{ longText }}
  >
    <Button className="target-align-right">Align tooltip right</Button>
    <Tooltip
      id="unique-align-right"
      targetSelector=".target-align-right"
      align="right"
    >
      {longText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleAlignArrowCenter = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-align-center"
    scope={{ longText }}
  >
    <Button className="target-align-center">Align tooltip center</Button>
    <Tooltip
      id="unique-align-center"
      targetSelector=".target-align-center"
      align="center"
      arrow="center"
    >
      {longText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleArrowLeft = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-arrow-left"
    scope={{ longText }}
  >
    <Button className="target-arrow-left">Arrow tooltip left</Button>
    <Tooltip
      id="unique-arrow-left"
      targetSelector=".target-arrow-left"
      arrow="left"
    >
      {longText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleArrowRight = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-arrow-right"
    scope={{ longText }}
  >
    <Button className="target-arrow-right">Arrow tooltip right</Button>
    <Tooltip
      id="unique-arrow-right"
      targetSelector=".target-arrow-right"
      arrow="right"
    >
      {longText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExamplePositionRight = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-position-right"
    scope={{ longText }}
  >
    <Button className="target-position-right">
      Position tooltip right
    </Button>
    <Tooltip
      id="unique-position-right"
      targetSelector=".target-position-right"
      position="right"
    >
      {longText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExamplePositionBottom = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-position-bottom"
    scope={{ longText }}
  >
    <Button className="target-position-bottom">
      Position tooltip bottom
    </Button>
    <Tooltip
      id="unique-position-bottom"
      targetSelector=".target-position-bottom"
      position="bottom"
    >
      {longText}
    </Tooltip>
  </ComponentBox>
)
