/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia/src'

const longText =
  'What’s the best thing about Switzerland? I’m not sure, but the flag is a big plus. 🇨🇭'

const shortText = 'Switzerland 🇨🇭'

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

export const TooltipExampleAlignArrowLeftLongText = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-align-arrow-left-long-text"
    scope={{ longText }}
  >
    <Button className="target-align-arrow-left-long-text">
      Align & arrow tooltip left
    </Button>
    <Tooltip
      id="unique-align-arrow-left-long-text"
      targetSelector=".target-align-arrow-left-long-text"
      align="left"
      arrow="left"
    >
      {longText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleAlignArrowRightLongText = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-align-arrow-right-long-text"
    scope={{ longText }}
  >
    <Button className="target-align-arrow-right-long-text">
      Align & arrow tooltip right
    </Button>
    <Tooltip
      id="unique-align-arrow-right-long-text"
      targetSelector=".target-align-arrow-right-long-text"
      align="right"
      arrow="right"
    >
      {longText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleAlignLeftArrowRightLongText = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-align-left-arrow-right-long-text"
    scope={{ longText }}
  >
    <Button className="target-align-left-arrow-right-long-text">
      Align left & arrow right
    </Button>
    <Tooltip
      id="unique-align-left-arrow-right-long-text"
      targetSelector=".target-align-left-arrow-right-long-text"
      align="left"
      arrow="right"
    >
      {longText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleAlignRightArrowLeftLongText = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-align-right-arrow-left-long-text"
    scope={{ longText }}
  >
    <Button className="target-align-right-arrow-left-long-text">
      Align right & arrow left
    </Button>
    <Tooltip
      id="unique-align-right-arrow-left-long-text"
      targetSelector=".target-align-right-arrow-left-long-text"
      align="right"
      arrow="left"
    >
      {longText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleAlignLeftLongText = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-align-left-long-text"
    scope={{ longText }}
  >
    <Button className="target-align-left-long-text">
      Align tooltip left
    </Button>
    <Tooltip
      id="unique-align-left-long-text"
      targetSelector=".target-align-left-long-text"
      align="left"
    >
      {longText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleAlignRightLongText = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-align-right-long-text"
    scope={{ longText }}
  >
    <Button className="target-align-right-long-text">
      Align tooltip right
    </Button>
    <Tooltip
      id="unique-align-right-long-text"
      targetSelector=".target-align-right-long-text"
      align="right"
    >
      {longText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleAlignArrowCenterLongText = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-align-center-long-text"
    scope={{ longText }}
  >
    <Button className="target-align-center-long-text">
      Align tooltip center
    </Button>
    <Tooltip
      id="unique-align-center-long-text"
      targetSelector=".target-align-center-long-text"
      align="center"
      arrow="center"
    >
      {longText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleArrowLeftLongText = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-arrow-left-long-text"
    scope={{ longText }}
  >
    <Button className="target-arrow-left-long-text">
      Arrow tooltip left
    </Button>
    <Tooltip
      id="unique-arrow-left-long-text"
      targetSelector=".target-arrow-left-long-text"
      arrow="left"
    >
      {longText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleArrowRightLongText = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-arrow-right-long-text"
    scope={{ longText }}
  >
    <Button className="target-arrow-right-long-text">
      Arrow tooltip right
    </Button>
    <Tooltip
      id="unique-arrow-right-long-text"
      targetSelector=".target-arrow-right-long-text"
      arrow="right"
    >
      {longText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExamplePositionRightLongText = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-position-right-long-text"
    scope={{ longText }}
  >
    <Button className="target-position-right-long-text">
      Position tooltip right
    </Button>
    <Tooltip
      id="unique-position-right-long-text"
      targetSelector=".target-position-right-long-text"
      position="right"
    >
      {longText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExamplePositionLeftLongText = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-position-left-long-text"
    scope={{ longText }}
  >
    <Button className="target-position-left-long-text">
      Position tooltip left
    </Button>
    <Tooltip
      id="unique-position-left-long-text"
      targetSelector=".target-position-left-long-text"
      position="left"
    >
      {longText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExamplePositionBottomLongText = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-position-bottom-long-text"
    scope={{ longText }}
  >
    <Button className="target-position-bottom-long-text">
      Position tooltip bottom
    </Button>
    <Tooltip
      id="unique-position-bottom-long-text"
      targetSelector=".target-position-bottom-long-text"
      position="bottom"
    >
      {longText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleAlignArrowLeft = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-align-arrow-left"
    scope={{ shortText }}
  >
    <Button className="target-align-arrow-left">
      Align & arrow tooltip left
    </Button>
    <Tooltip
      id="unique-align-arrow-left"
      targetSelector=".target-align-arrow-left"
      align="left"
      arrow="left"
    >
      {shortText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleAlignArrowRight = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-align-arrow-right"
    scope={{ shortText }}
  >
    <Button className="target-align-arrow-right">
      Align & arrow tooltip right
    </Button>
    <Tooltip
      id="unique-align-arrow-right"
      targetSelector=".target-align-arrow-right"
      align="right"
      arrow="right"
    >
      {shortText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleAlignLeftArrowRight = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-align-left-arrow-right"
    scope={{ shortText }}
  >
    <Button className="target-align-left-arrow-right">
      Align left & arrow right
    </Button>
    <Tooltip
      id="unique-align-left-arrow-right"
      targetSelector=".target-align-left-arrow-right"
      align="left"
      arrow="right"
    >
      {shortText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleAlignRightArrowLeft = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-align-right-arrow-left"
    scope={{ shortText }}
  >
    <Button className="target-align-right-arrow-left">
      Align right & arrow left
    </Button>
    <Tooltip
      id="unique-align-right-arrow-left"
      targetSelector=".target-align-right-arrow-left"
      align="right"
      arrow="left"
    >
      {shortText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleAlignLeft = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-align-left"
    scope={{ shortText }}
  >
    <Button className="target-align-left">Align tooltip left</Button>
    <Tooltip
      id="unique-align-left"
      targetSelector=".target-align-left"
      align="left"
    >
      {shortText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleAlignRight = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-align-right"
    scope={{ shortText }}
  >
    <Button className="target-align-right">Align tooltip right</Button>
    <Tooltip
      id="unique-align-right"
      targetSelector=".target-align-right"
      align="right"
    >
      {shortText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleAlignArrowCenter = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-align-center"
    scope={{ shortText }}
  >
    <Button className="target-align-center">Align tooltip center</Button>
    <Tooltip
      id="unique-align-center"
      targetSelector=".target-align-center"
      align="center"
      arrow="center"
    >
      {shortText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleArrowLeft = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-arrow-left"
    scope={{ shortText }}
  >
    <Button className="target-arrow-left">Arrow tooltip left</Button>
    <Tooltip
      id="unique-arrow-left"
      targetSelector=".target-arrow-left"
      arrow="left"
    >
      {shortText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExampleArrowRight = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-arrow-right"
    scope={{ shortText }}
  >
    <Button className="target-arrow-right">Arrow tooltip right</Button>
    <Tooltip
      id="unique-arrow-right"
      targetSelector=".target-arrow-right"
      arrow="right"
    >
      {shortText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExamplePositionRight = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-position-right"
    scope={{ shortText }}
  >
    <Button className="target-position-right">
      Position tooltip right
    </Button>
    <Tooltip
      id="unique-position-right"
      targetSelector=".target-position-right"
      position="right"
    >
      {shortText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExamplePositionLeft = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-position-left"
    scope={{ shortText }}
  >
    <Button className="target-position-left">Position tooltip left</Button>
    <Tooltip
      id="unique-position-left"
      targetSelector=".target-position-left"
      position="left"
    >
      {shortText}
    </Tooltip>
  </ComponentBox>
)

export const TooltipExamplePositionBottom = () => (
  <ComponentBox
    data-visual-test="tooltip-hover-position-bottom"
    scope={{ shortText }}
  >
    <Button className="target-position-bottom">
      Position tooltip bottom
    </Button>
    <Tooltip
      id="unique-position-bottom"
      targetSelector=".target-position-bottom"
      position="bottom"
    >
      {shortText}
    </Tooltip>
  </ComponentBox>
)
