/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import { bell_medium as Bell, question } from '@dnb/eufemia/src/icons'

export const ButtonPrimary = () => (
  <ComponentBox>
    {() => /* jsx */ `
<Button
  text="Primary button with text only"
  on_click={() => {
    console.log('on_click')
  }}
  data-visual-test="button-primary"
/>
`}
  </ComponentBox>
)

export const ButtonSecondary = () => (
  <ComponentBox>
    {() => /* jsx */ `
<Button
  variant="secondary"
  onClick={() => {
    console.log('onClick')
  }}
  data-visual-test="button-secondary"
>
  Secondary button with text only
</Button>
`}
  </ComponentBox>
)

export const ButtonDisabledPrimary = () => (
  <ComponentBox>
    {() => /* jsx */ `
<Button
  text="Disabled primary button"
  disabled
/>
`}
  </ComponentBox>
)

export const ButtonDisabledSecondary = () => (
  <ComponentBox>
    {() => /* jsx */ `
<Button
  text="Disabled secondary button"
  variant="secondary"
  disabled
/>
`}
  </ComponentBox>
)

export const ButtonPrimaryWithIcon = () => (
  <ComponentBox>
    {() => /* jsx */ `
<Button
  text="Primary button with icon"
  icon="chevron_right"
/>
`}
  </ComponentBox>
)

export const ButtonPrimaryWithIconLeft = () => (
  <ComponentBox>
    {() => /* jsx */ `
<Button
  icon_position="left"
  icon="chevron_left"
>
  Primary button with icon on left
</Button>
`}
  </ComponentBox>
)

export const ButtonTertiary = () => (
  <ComponentBox data-visual-test="button-tertiary-all">
    {() => /* jsx */ `
<Button
  variant="tertiary"
  text="Tertiary button with icon on left"
  icon_position="left"
  icon="chevron_left"
  data-visual-test="button-tertiary"
/>
<Button
  variant="tertiary"
  text={<span>Text inside additional span</span>}
  icon_position="left"
  icon="chevron_left"
  left
/>
<Button
  variant="tertiary"
  size="large"
  text="Large tertiary button"
  icon="chevron_right"
  left
/>
`}
  </ComponentBox>
)

export const ButtonTertiaryTop = () => (
  <ComponentBox data-visual-test="button-tertiary-top">
    {() => /* jsx */ `
<Button
  variant="tertiary"
  icon_position="top"
  icon="close"
  text="Button text"
  right="large"
/>
<Button
  variant="tertiary"
  icon_position="top"
  icon="close"
  size="large"
  text="Button text"
/>
`}
  </ComponentBox>
)

export const ButtonCustomContent = () => (
  <ComponentBox data-visual-test="button-custom-content">
    {() => /* jsx */ `
<Button
  icon="close"
  icon_position="right"
  text="Button with custom content"
  custom_content={<IconPrimary icon="check" right="small" />}
/>
`}
  </ComponentBox>
)

export const ButtonTertiaryWrap = () => (
  <ComponentBox data-visual-test="button-tertiary-wrap">
    {() => /* jsx */ `
<Button
  wrap
  variant="tertiary"
  text="A long text where wrap is enabled magnis rutrum netus neque ridiculus euismod sit dictum laoreet libero"
  icon="chevron_left"
  icon_position="left"
/>
`}
  </ComponentBox>
)

export const ButtonAnchor = () => (
  <ComponentBox data-visual-test="button-anchor">
    {() => /* jsx */ `
<Button
  text="Primary with href"
  href="/uilib/components/button/demos"
  icon_position="right"
  icon="chevron_right"
  on_click={({ event }) => {
    event.preventDefault()
  }}
/>
<Button
  variant="secondary"
  text="Secondary with href"
  href="/uilib/components/button/demos"
  target="_blank"
/>
<Button
  href="/uilib/components/button/demos"
  title="This is a link"
  icon="chevron_right"
  size="default"
/>
`}
  </ComponentBox>
)

export const ButtonSignal = () => (
  <ComponentBox scope={{ Bell }}>
    {() => /* jsx */ `
<Button
  variant="signal"
  text="Signal Button"
  icon={Bell}
  data-visual-test="button-signal"
/>
`}
  </ComponentBox>
)

export const ButtonSignalLarge = () => (
  <ComponentBox scope={{ Bell }}>
    {() => /* jsx */ `
<Button
  variant="signal"
  text="Large Signal Button"
  icon={<Bell />}
  size="large"
  icon_size="medium"
/>
`}
  </ComponentBox>
)

export const ButtonIcon = () => (
  <ComponentBox scope={{ question }}>
    {() => /* jsx */ `
<Button
  title="Disabled Icon only Button"
  icon="calendar"
  disabled
/>
<Button title="Button with Icon only" icon="calendar" data-visual-test="button-icon" />
<Button
  title="Small sized button with default Icon"
  icon="add"
  icon_size="default"
  size="small"
/>
<Button
  title="Default sized Button with medium Icon"
  icon="calendar"
  size="default"
/>
<Button
  title="Button with custom, Secondary Icon only"
  icon={question}
/>
<Button
  title="Button with status"
  icon={question}
  status="error"
/>
`}
  </ComponentBox>
)

export const TertiaryWithNoIcon = () => {
  if (!(typeof window !== 'undefined' && window.IS_TEST)) {
    return <></>
  }
  return (
    <ComponentBox
      title="Tertiary button with no icon"
      data-visual-test="button-tertiary-no-icon"
    >
      {() => /* jsx */ `
<Button text="Tertiary button with no icon" variant="tertiary" />
`}
    </ComponentBox>
  )
}
