/**
 * UI lib Component Example
 *
 */

import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  CopyOnClick,
  Drawer,
  Flex,
  NumberFormat,
  P,
} from '@dnb/eufemia/src'

export const Default = () => {
  return (
    <ComponentBox data-visual-test="copy-on-click-default">
      <P>
        <CopyOnClick>
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
        <CopyOnClick showCursor={false}>
          Praesent nunc ipsum, convallis eget convallis gravida, vehicula
          vitae metus.
        </CopyOnClick>
      </P>
    </ComponentBox>
  )
}

export const CopyContent = () => {
  return (
    <ComponentBox>
      <P>
        <CopyOnClick copyContent="content to copy">
          content to display
        </CopyOnClick>
      </P>
    </ComponentBox>
  )
}

export const CopyTextContent = () => {
  return (
    <ComponentBox>
      <P>
        <CopyOnClick>
          <NumberFormat.Currency value={1234567.89} currency="NOK" />
        </CopyOnClick>
      </P>
    </ComponentBox>
  )
}

export const CustomTooltipMessage = () => {
  return (
    <ComponentBox>
      <P>
        <CopyOnClick tooltipContent="Custom message">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum. Praesent nunc ipsum, convallis
          eget convallis gravida, vehicula vitae metus.
        </CopyOnClick>
      </P>
    </ComponentBox>
  )
}

export const InsideDrawer = () => {
  return (
    <ComponentBox data-visual-test="copy-on-click-inside-drawer">
      <Drawer open>
        <CopyOnClick>I'm inside the drawer</CopyOnClick>
      </Drawer>
    </ComponentBox>
  )
}

export const CopyButton = () => {
  return (
    <ComponentBox>
      <Flex.Horizontal align="center" gap="x-small">
        <CopyOnClick copyContent="70321369861">7032 1369 861</CopyOnClick>
        <CopyOnClick.Button
          copyContent="70321369861"
          title="Copy account number"
        />
      </Flex.Horizontal>
    </ComponentBox>
  )
}
