/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { bell_medium as Bell, question } from '@dnb/eufemia/src/icons'
import { Button, IconPrimary } from '@dnb/eufemia/src'
import { VisibilityByTheme } from '@dnb/eufemia/src/shared'

export const ButtonPrimary = () => (
  <ComponentBox>
    <Button
      text="Primary button with text only"
      on_click={() => {
        console.log('on_click')
      }}
      data-visual-test="button-primary"
    />
  </ComponentBox>
)

export const ButtonSecondary = () => (
  <ComponentBox>
    <Button
      variant="secondary"
      onClick={() => {
        console.log('onClick')
      }}
      data-visual-test="button-secondary"
    >
      Secondary button with text only
    </Button>
  </ComponentBox>
)

export const ButtonDisabled = () => (
  <ComponentBox data-visual-test="button-disabled">
    <Button text="Disabled primary button" disabled right />
    <Button
      text="Disabled secondary button"
      variant="secondary"
      disabled
      right
    />
    <Button
      text="Disabled tertiary button"
      variant="tertiary"
      disabled
      right
    />
    <Button title="Disabled Icon Button" icon="calendar" disabled right />
  </ComponentBox>
)

export const ButtonErrorState = () => (
  <ComponentBox scope={{ question }} data-visual-test="button-error">
    <Button
      text="Primary button error"
      status="error"
      data-visual-test="button-error-primary"
    />
    <Button
      text="Secondary button error"
      variant="secondary"
      status="error"
      left
      data-visual-test="button-error-secondary"
    />
    <Button
      title="Primary icon button error"
      variant="primary"
      icon={question}
      size="default"
      status="error"
      left
    />
    <Button
      title="Secondary icon button error"
      icon={question}
      size="default"
      status="error"
      left
    />
  </ComponentBox>
)

export const ButtonPrimaryWithIcon = () => (
  <ComponentBox>
    <Button text="Primary button with icon" icon="chevron_right" />
  </ComponentBox>
)

export const ButtonPrimaryWithIconLeft = () => (
  <ComponentBox>
    <Button icon_position="left" icon="chevron_left">
      Primary button with icon on left
    </Button>
  </ComponentBox>
)

export const ButtonTertiary = () => (
  <ComponentBox data-visual-test="button-tertiary-all">
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
  </ComponentBox>
)

export const ButtonTertiaryTop = () => (
  <ComponentBox data-visual-test="button-tertiary-top">
    <Button
      variant="tertiary"
      icon_position="top"
      icon="close"
      text="Button text"
    />
    <Button
      variant="tertiary"
      icon_position="top"
      icon="close"
      text="Large button"
      size="large"
    />
  </ComponentBox>
)

export const ButtonCustomContent = () => (
  <ComponentBox data-visual-test="button-custom-content">
    <Button
      icon="close"
      icon_position="right"
      text="Button with custom content"
      custom_content={<IconPrimary icon="check" right="small" />}
    />
  </ComponentBox>
)

export const ButtonTertiaryWrap = () => (
  <ComponentBox data-visual-test="button-tertiary-wrap">
    <Button
      wrap
      variant="tertiary"
      text="A long text where wrap is enabled magnis rutrum netus neque ridiculus euismod sit dictum laoreet libero"
      icon="chevron_left"
      icon_position="left"
    />
  </ComponentBox>
)

export const ButtonAnchor = () => (
  <ComponentBox data-visual-test="button-anchor">
    <Button
      text="Primary with href"
      href="/uilib/components/button/demos"
      icon_position="right"
      icon="chevron_right"
      on_click={({ event }) => {
        event.preventDefault()
      }}
      right
    />
    <Button
      variant="secondary"
      text="Secondary with href"
      href="/uilib/components/button/demos"
      target="_blank"
      right
    />
    <Button
      href="/uilib/components/button/demos"
      title="This is a link"
      icon="chevron_right"
      size="default"
      right
    />
  </ComponentBox>
)

export const ButtonSignal = () => (
  <ComponentBox scope={{ Bell }}>
    <Button
      variant="signal"
      text="Signal Button"
      icon={Bell}
      data-visual-test="button-signal"
    />
  </ComponentBox>
)

export const ButtonSignalLarge = () => (
  <ComponentBox scope={{ Bell }}>
    <Button
      variant="signal"
      text="Large Signal Button"
      icon={<Bell />}
      size="large"
      icon_size="medium"
    />
  </ComponentBox>
)

export const ButtonIcon = () => (
  <ComponentBox
    scope={{ question, VisibilityByTheme }}
    data-visual-test="button-icons"
  >
    <Button
      title="Disabled Icon only Button"
      icon="calendar"
      disabled
      right
    />
    <Button
      title="Button with Icon only"
      icon="calendar"
      data-visual-test="button-icon"
    />
    <Button title="Small sized icon button" icon="add" size="small" left />
    <Button
      title="Large sized icon button"
      icon={question}
      size="large"
      left
    />
    <Button
      title="Icon button with status"
      icon={question}
      status="error"
      left
    />
    <VisibilityByTheme visible="sbanken">
      <Button
        title="Tertiary icon button"
        size="large"
        icon={question}
        variant="tertiary"
        data-visual-test="button-icon-tertiary"
      />
    </VisibilityByTheme>
  </ComponentBox>
)

export const TertiaryWithNoIcon = () => {
  return (
    <ComponentBox data-visual-test="button-tertiary-no-icon">
      <Button text="Tertiary button with no icon" variant="tertiary" />
    </ComponentBox>
  )
}

export const UnstyledVariant = () => {
  return (
    <ComponentBox data-visual-test="button-unstyled">
      <Button
        text="Unstyled button with icon"
        icon="bell"
        variant="unstyled"
      />
    </ComponentBox>
  )
}

export const ButtonStretch = () => {
  return (
    <ComponentBox scope={{ Bell }}>
      <Button
        text="A stretched button"
        icon={<Bell />}
        size="large"
        data-visual-test="button-stretch"
      />
    </ComponentBox>
  )
}

export const PrimaryButtonSizes = () => {
  return (
    <ComponentBox scope={{ Bell }} hideCode>
      <Button
        text="Default button"
        on_click={() => {
          console.log('on_click')
        }}
      />
      <Button
        text="Large button"
        on_click={() => {
          console.log('on_click')
        }}
        size="large"
        left
      />
      <Button
        text="Default button icon"
        on_click={() => {
          console.log('on_click')
        }}
        icon="chevron_right"
        left
      />
      <Button
        text="Large button icon"
        on_click={() => {
          console.log('on_click')
        }}
        size="large"
        icon="chevron_right"
        left
      />
    </ComponentBox>
  )
}

export const SecondaryButtonSizes = () => {
  return (
    <ComponentBox scope={{ Bell }} hideCode>
      <Button
        text="Default button"
        on_click={() => {
          console.log('on_click')
        }}
        variant="secondary"
      />
      <Button
        text="Large button"
        on_click={() => {
          console.log('on_click')
        }}
        size="large"
        variant="secondary"
        left
      />
      <Button
        text="Default button icon"
        on_click={() => {
          console.log('on_click')
        }}
        icon="chevron_right"
        variant="secondary"
        left
      />
      <Button
        text="Large button icon"
        on_click={() => {
          console.log('on_click')
        }}
        size="large"
        icon="chevron_right"
        variant="secondary"
        left
      />
    </ComponentBox>
  )
}

export const TertiaryButtonSizes = () => {
  return (
    <ComponentBox scope={{ Bell }} hideCode>
      <Button
        text="Default button"
        on_click={() => {
          console.log('on_click')
        }}
        icon="chevron_right"
        variant="tertiary"
      />
      <Button
        text="Button large"
        on_click={() => {
          console.log('on_click')
        }}
        icon="chevron_right"
        variant="tertiary"
        size="large"
        left
      />
      <Button
        text="Button text"
        on_click={() => {
          console.log('on_click')
        }}
        icon="bell"
        icon_position="top"
        variant="tertiary"
        left
      />
    </ComponentBox>
  )
}

export const SignalButtonSizes = () => {
  return (
    <ComponentBox scope={{ Bell }} hideCode>
      <Button
        text="Default button"
        on_click={() => {
          console.log('on_click')
        }}
        variant="signal"
      />
      <Button
        text="Large button"
        on_click={() => {
          console.log('on_click')
        }}
        size="large"
        variant="signal"
        left
      />
      <Button
        text="Default button icon"
        on_click={() => {
          console.log('on_click')
        }}
        icon="chevron_right"
        variant="signal"
        left
      />
      <Button
        text="Large button icon"
        on_click={() => {
          console.log('on_click')
        }}
        size="large"
        icon="chevron_right"
        variant="signal"
        left
      />
    </ComponentBox>
  )
}

export const IconButtonSizes = () => {
  return (
    <ComponentBox hideCode>
      <Button
        title="Small sized button with add icon"
        icon="add"
        size="small"
      />
      <Button
        title="Medium sized button with add icon (default)"
        icon="add"
        size="medium"
        left
      />
      <Button
        title="Default sized button with add icon (not default)"
        icon="add"
        size="default"
        left
      />
      <Button
        title="Large sized button with add icon"
        icon="add"
        size="large"
        left
      />
    </ComponentBox>
  )
}

export const TertiaryButtonAlignment = () => {
  return (
    <ComponentBox data-visual-test="button-tertiary-alignment">
      <span className="dnb-p">text</span>{' '}
      <Button text="right" variant="tertiary" icon="chevron_right" />
      <Button
        text="left"
        variant="tertiary"
        icon_position="left"
        icon="chevron_left"
      />
      <br />
      <Button
        text="right medium"
        variant="tertiary"
        icon="chevron_right"
        icon_size="medium"
      />
      <Button
        text="left medium"
        variant="tertiary"
        icon_position="left"
        icon="chevron_left"
        icon_size="medium"
      />
      <br />
      <Button
        text="right large"
        variant="tertiary"
        icon="chevron_right"
        icon_size="large"
      />
      <Button
        text="left large"
        variant="tertiary"
        icon_position="left"
        icon="chevron_left"
        icon_size="large"
      />
      <br />
      <Button variant="tertiary" icon="chevron_right" />
      <Button variant="tertiary" icon="chevron_right" icon_size="medium" />
      <Button
        variant="tertiary"
        icon="chevron_right"
        icon_size="large"
      />{' '}
      <span className="dnb-p">text</span>
    </ComponentBox>
  )
}
