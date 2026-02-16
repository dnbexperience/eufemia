/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { bell_medium as Bell, question } from '@dnb/eufemia/src/icons'
import { Button, IconPrimary, Section } from '@dnb/eufemia/src'
import { VisibilityByTheme, Theme } from '@dnb/eufemia/src/shared'

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
    <Button
      text="Disabled button with href"
      href="/uilib/components/button/demos"
      target="_blank"
      disabled
    />
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
      text="Tertiary button error"
      icon="chevron_right"
      variant="tertiary"
      status="error"
      left
      data-visual-test="button-error-tertiary"
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

export const ButtonHasDarkBackground = () => (
  <ComponentBox hideCode scope={{ Theme }}>
    <Section innerSpace="1rem" backgroundColor="var(--sb-color-purple)">
      <Theme.Provider darkBackground>
        <Button data-visual-test="button-primary-on-dark" right>
          Primary button
        </Button>
        <Button
          data-visual-test="button-secondary-on-dark"
          right
          variant="secondary"
        >
          Secondary button
        </Button>
        <Button
          data-visual-test="button-tertiary-on-dark"
          variant="tertiary"
          icon_position="left"
          icon="chevron_left"
        >
          Tertiary button
        </Button>
      </Theme.Provider>
    </Section>
  </ComponentBox>
)

export const SvgInButton = () => (
  <ComponentBox hideCode>
    {() => {
      const Svg = () => (
        <svg
          width="56"
          height="15"
          viewBox="0 0 56 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Vipps" // NB: Ensure you add an `aria-label` on the SVG for accessibility reasons.
        >
          <path
            d="M2.79605 0.279297L5.1727 7.22283L7.50274 0.279297H10.2522L6.15132 10.5781H4.10088L0 0.279297H2.79605Z"
            fill="#FF5B24"
          />
          <path
            d="M16.4506 8.94732C18.1748 8.94732 19.1534 8.1085 20.0854 6.89688C20.598 6.24447 21.2504 6.10466 21.7165 6.47747C22.1825 6.85028 22.2291 7.54929 21.7165 8.2017C20.365 9.97254 18.6408 11.0444 16.4506 11.0444C14.0739 11.0444 11.9769 9.73953 10.5322 7.45609C10.1128 6.85028 10.206 6.19787 10.672 5.87166C11.1381 5.54545 11.8371 5.68526 12.2565 6.33767C13.2817 7.8755 14.6797 8.94732 16.4506 8.94732ZM19.666 3.21541C19.666 4.05422 19.0136 4.61344 18.268 4.61344C17.5224 4.61344 16.87 4.05422 16.87 3.21541C16.87 2.37659 17.5224 1.81738 18.268 1.81738C19.0136 1.81738 19.666 2.42319 19.666 3.21541Z"
            fill="#FF5B24"
          />
          <path
            d="M26.2368 0.279605V1.67763C26.9358 0.699013 28.0076 0 29.592 0C31.5959 0 33.9259 1.67763 33.9259 5.2659C33.9259 9.04057 31.6891 10.858 29.359 10.858C28.1474 10.858 27.029 10.392 26.1902 9.22697V14.1667H23.6737V0.279605H26.2368ZM26.2368 5.4057C26.2368 7.50274 27.4484 8.62116 28.7998 8.62116C30.1046 8.62116 31.4094 7.59594 31.4094 5.4057C31.4094 3.26206 30.1046 2.23684 28.7998 2.23684C27.495 2.23684 26.2368 3.21546 26.2368 5.4057Z"
            fill="#FF5B24"
          />
          <path
            d="M38.3524 0.279605V1.67763C39.0514 0.699013 40.1232 0 41.7076 0C43.7115 0 46.0415 1.67763 46.0415 5.2659C46.0415 9.04057 43.8047 10.858 41.4746 10.858C40.263 10.858 39.1446 10.392 38.3058 9.22697V14.1667H35.7893V0.279605H38.3524ZM38.3524 5.4057C38.3524 7.50274 39.564 8.62116 40.9154 8.62116C42.2202 8.62116 43.5251 7.59594 43.5251 5.4057C43.5251 3.26206 42.2202 2.23684 40.9154 2.23684C39.564 2.23684 38.3524 3.21546 38.3524 5.4057Z"
            fill="#FF5B24"
          />
          <path
            d="M51.4003 0C53.4974 0 54.9886 0.978619 55.641 3.40186L53.3576 3.77467C53.311 2.56305 52.5653 2.14364 51.4469 2.14364C50.6081 2.14364 49.9557 2.51645 49.9557 3.12226C49.9557 3.58827 50.2819 4.05428 51.2605 4.24068L52.9847 4.56689C54.6624 4.89309 55.5944 6.01151 55.5944 7.50274C55.5944 9.73958 53.5906 10.858 51.6799 10.858C49.6761 10.858 47.4392 9.83278 47.113 7.31634L49.3965 6.94353C49.5363 8.24835 50.3285 8.71436 51.6333 8.71436C52.6119 8.71436 53.2644 8.34156 53.2644 7.73574C53.2644 7.17653 52.9381 6.75713 51.8663 6.57072L50.2819 6.29112C48.6043 5.96491 47.579 4.79989 47.579 3.30866C47.6256 0.978618 49.7227 0 51.4003 0Z"
            fill="#FF5B24"
          />
        </svg>
      )

      return (
        <Button variant="secondary">
          Button with SVG <Svg />
        </Button>
      )
    }}
  </ComponentBox>
)
