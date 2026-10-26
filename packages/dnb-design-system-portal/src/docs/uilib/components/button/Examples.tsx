/**
 * UI lib Component Example
 *
 */

import ComponentBox from '../../../../shared/tags/ComponentBox'
import { bell_medium as Bell, question } from '@dnb/eufemia/src/icons'
import { Button, Flex, IconPrimary, P, Section } from '@dnb/eufemia/src'
import { VippsLogo } from '@dnb/eufemia/src/extensions/vipps-wallet-button/VippsWalletButton'

export const ButtonVariants = () => (
  <ComponentBox hideCode>
    <Flex.Container gap="medium" align="center">
      <Button text="Primary" />
      <Button text="Secondary" variant="secondary" />
      <Button text="Tertiary" variant="tertiary" icon="chevron_right" />
    </Flex.Container>
  </ComponentBox>
)

export const ButtonPrimary = () => (
  <ComponentBox hideCode>
    <Button
      text="Primary button with text only"
      data-visual-test="button-primary"
    />
  </ComponentBox>
)

export const ButtonSecondary = () => (
  <ComponentBox hideCode>
    <Button variant="secondary" data-visual-test="button-secondary">
      Secondary button with text only
    </Button>
  </ComponentBox>
)

export const ButtonDisabled = () => (
  <ComponentBox hideCode data-visual-test="button-disabled">
    <Flex.Horizontal layoutEngine="css" gap="medium" align="center">
      <Button text="Primary" disabled />
      <Button text="Secondary" variant="secondary" disabled />
      <Button
        text="Tertiary"
        variant="tertiary"
        icon="chevron_right"
        disabled
      />
      <Button title="Open calendar" icon="calendar" disabled />
      <Button
        text="Link button"
        href="/uilib/components/button/demos"
        target="_blank"
        disabled
      />
    </Flex.Horizontal>
  </ComponentBox>
)

export const ButtonErrorState = () => (
  <ComponentBox
    hideCode
    scope={{ question }}
    data-visual-test="button-error"
  >
    <Flex.Horizontal layoutEngine="css" gap="medium" align="center">
      <Button
        text="Primary"
        status="error"
        data-visual-test="button-error-primary"
      />
      <Button
        text="Secondary"
        variant="secondary"
        status="error"
        data-visual-test="button-error-secondary"
      />
      <Button
        text="Tertiary"
        icon="chevron_right"
        variant="tertiary"
        status="error"
        data-visual-test="button-error-tertiary"
      />
      <Button
        title="Primary icon button error"
        variant="primary"
        icon={question}
        size="default"
        status="error"
      />
      <Button
        title="Secondary icon button error"
        icon={question}
        size="default"
        status="error"
      />
    </Flex.Horizontal>
  </ComponentBox>
)

export const ButtonPrimaryWithIcon = () => (
  <ComponentBox hideCode>
    <Button text="Primary button with icon" icon="chevron_right" />
  </ComponentBox>
)

export const ButtonPrimaryWithIconLeft = () => (
  <ComponentBox hideCode>
    <Button iconPosition="left" icon="chevron_left">
      Primary button with icon on left
    </Button>
  </ComponentBox>
)

export const ButtonTertiary = () => (
  <ComponentBox hideCode data-visual-test="button-tertiary-all">
    <Flex.Horizontal layoutEngine="css" gap="medium" align="center">
      <Button
        variant="tertiary"
        text="Back"
        iconPosition="left"
        icon="chevron_left"
        data-visual-test="button-tertiary"
      />
      <Button
        variant="tertiary"
        text={<span>Previous step</span>}
        iconPosition="left"
        icon="chevron_left"
      />
    </Flex.Horizontal>
  </ComponentBox>
)

export const ButtonTertiaryTop = () => (
  <ComponentBox hideCode data-visual-test="button-tertiary-top">
    <Flex.Horizontal layoutEngine="css" gap="large" align="center">
      <Flex.Stack
        layoutEngine="css"
        element="div"
        gap="x-small"
        align="center"
      >
        <P size="small">Default</P>
        <Button
          variant="tertiary"
          iconPosition="top"
          icon="close"
          text="Close"
        />
      </Flex.Stack>
      <Flex.Stack
        layoutEngine="css"
        element="div"
        gap="x-small"
        align="center"
      >
        <P size="small">Large</P>
        <Button
          variant="tertiary"
          iconPosition="top"
          icon="close"
          text="Close"
          size="large"
        />
      </Flex.Stack>
    </Flex.Horizontal>
  </ComponentBox>
)

export const ButtonCustomContent = () => (
  <ComponentBox hideCode data-visual-test="button-custom-content">
    <Button
      icon="close"
      iconPosition="right"
      text="Button with custom content"
      customContent={<IconPrimary icon="check" right="small" />}
    />
  </ComponentBox>
)

export const ButtonTertiaryWrap = () => (
  <ComponentBox hideCode data-visual-test="button-tertiary-wrap">
    <div style={{ maxWidth: '20rem' }}>
      <Button
        wrap
        variant="tertiary"
        text="Back to the overview of your accounts and recent transactions"
        icon="chevron_left"
        iconPosition="left"
      />
    </div>
  </ComponentBox>
)

export const ButtonAnchor = () => (
  <ComponentBox hideCode data-visual-test="button-anchor">
    <Flex.Horizontal layoutEngine="css" gap="medium" align="center">
      <Button
        text="View accounts"
        href="/uilib/components/button/demos"
        iconPosition="right"
        icon="chevron_right"
      />
      <Button
        variant="secondary"
        text="Open in a new tab"
        href="/uilib/components/button/demos"
        target="_blank"
      />
      <Button
        href="/uilib/components/button/demos"
        title="Go to the Button documentation"
        icon="chevron_right"
        size="default"
      />
    </Flex.Horizontal>
  </ComponentBox>
)

export const ButtonIcon = () => (
  <ComponentBox
    hideCode
    scope={{ question }}
    data-visual-test="button-icons"
  >
    <Flex.Horizontal layoutEngine="css" gap="large" align="center">
      <Flex.Stack
        layoutEngine="css"
        element="div"
        gap="x-small"
        align="center"
      >
        <P size="small">Disabled</P>
        <Button title="Open calendar" icon="calendar" disabled />
      </Flex.Stack>
      <Flex.Stack
        layoutEngine="css"
        element="div"
        gap="x-small"
        align="center"
      >
        <P size="small">Default</P>
        <Button
          title="Open calendar"
          icon="calendar"
          data-visual-test="button-icon"
        />
      </Flex.Stack>
      <Flex.Stack
        layoutEngine="css"
        element="div"
        gap="x-small"
        align="center"
      >
        <P size="small">Small</P>
        <Button title="Add item" icon="add" size="small" />
      </Flex.Stack>
      <Flex.Stack
        layoutEngine="css"
        element="div"
        gap="x-small"
        align="center"
      >
        <P size="small">Large</P>
        <Button title="Help" icon={question} size="large" />
      </Flex.Stack>
      <Flex.Stack
        layoutEngine="css"
        element="div"
        gap="x-small"
        align="center"
      >
        <P size="small">Error</P>
        <Button title="Help" icon={question} status="error" />
      </Flex.Stack>
      <Flex.Stack
        layoutEngine="css"
        element="div"
        gap="x-small"
        align="center"
      >
        <P size="small">Tertiary</P>
        <Button
          title="Help"
          size="large"
          icon={question}
          variant="tertiary"
          data-visual-test="button-icon-tertiary"
        />
      </Flex.Stack>
    </Flex.Horizontal>
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

export const PrimaryButtonSizes = () => (
  <ComponentBox hideCode>
    <Flex.Horizontal layoutEngine="css" gap="medium" align="center">
      <Button text="Default" />
      <Button text="Large" size="large" />
      <Button text="Default with icon" icon="chevron_right" />
      <Button text="Large with icon" size="large" icon="chevron_right" />
    </Flex.Horizontal>
  </ComponentBox>
)

export const SecondaryButtonSizes = () => (
  <ComponentBox hideCode>
    <Flex.Horizontal layoutEngine="css" gap="medium" align="center">
      <Button text="Default" variant="secondary" />
      <Button text="Large" size="large" variant="secondary" />
      <Button
        text="Default with icon"
        icon="chevron_right"
        variant="secondary"
      />
      <Button
        text="Large with icon"
        size="large"
        icon="chevron_right"
        variant="secondary"
      />
    </Flex.Horizontal>
  </ComponentBox>
)

export const TertiaryButtonSizes = () => (
  <ComponentBox hideCode>
    <Flex.Horizontal layoutEngine="css" gap="medium" align="center">
      <Button text="Default" icon="chevron_right" variant="tertiary" />
      <Button
        text="Large"
        size="large"
        icon="chevron_right"
        variant="tertiary"
      />
      <Button
        text="Notifications"
        icon="bell"
        iconPosition="top"
        variant="tertiary"
      />
    </Flex.Horizontal>
  </ComponentBox>
)

export const IconButtonSizes = () => (
  <ComponentBox hideCode>
    <Flex.Horizontal layoutEngine="css" gap="large" align="center">
      <Flex.Stack
        layoutEngine="css"
        element="div"
        gap="x-small"
        align="center"
      >
        <P size="small">Small</P>
        <Button title="Add item" icon="add" size="small" />
      </Flex.Stack>
      <Flex.Stack
        layoutEngine="css"
        element="div"
        gap="x-small"
        align="center"
      >
        <P size="small">Medium (default)</P>
        <Button title="Add item" icon="add" size="medium" />
      </Flex.Stack>
      <Flex.Stack
        layoutEngine="css"
        element="div"
        gap="x-small"
        align="center"
      >
        <P size="small">Default</P>
        <Button title="Add item" icon="add" size="default" />
      </Flex.Stack>
      <Flex.Stack
        layoutEngine="css"
        element="div"
        gap="x-small"
        align="center"
      >
        <P size="small">Large</P>
        <Button title="Add item" icon="add" size="large" />
      </Flex.Stack>
    </Flex.Horizontal>
  </ComponentBox>
)

export const TertiaryButtonAlignment = () => {
  return (
    <ComponentBox data-visual-test="button-tertiary-alignment">
      <Flex.Stack layoutEngine="css" element="div" gap="small">
        <div>
          <span className="dnb-p">text</span>{' '}
          <Button text="right" variant="tertiary" icon="chevron_right" />
          <Button
            text="left"
            variant="tertiary"
            iconPosition="left"
            icon="chevron_left"
          />
        </div>
        <div>
          <Button
            text="right medium"
            variant="tertiary"
            icon="chevron_right"
            iconSize="medium"
          />
          <Button
            text="left medium"
            variant="tertiary"
            iconPosition="left"
            icon="chevron_left"
            iconSize="medium"
          />
        </div>
        <div>
          <Button
            text="right large"
            variant="tertiary"
            icon="chevron_right"
            iconSize="large"
          />
          <Button
            text="left large"
            variant="tertiary"
            iconPosition="left"
            icon="chevron_left"
            iconSize="large"
          />
        </div>
        <div>
          <Button title="Next" variant="tertiary" icon="chevron_right" />
          <Button
            title="Next"
            variant="tertiary"
            icon="chevron_right"
            iconSize="medium"
          />
          <Button
            title="Next"
            variant="tertiary"
            icon="chevron_right"
            iconSize="large"
          />{' '}
          <span className="dnb-p">text</span>
        </div>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const ButtonOnDarkSurface = () => (
  <ComponentBox hideCode>
    <Section innerSpace={{ block: true }} surface="dark">
      <Flex.Horizontal
        layoutEngine="css"
        gap="medium"
        align="center"
        style={{ backgroundColor: 'inherit' }}
      >
        <Button data-visual-test="button-primary-on-dark">
          Primary button
        </Button>
        <Button
          data-visual-test="button-secondary-on-dark"
          variant="secondary"
        >
          Secondary button
        </Button>
        <Button
          data-visual-test="button-tertiary-on-dark"
          variant="tertiary"
          iconPosition="left"
          icon="chevron_left"
        >
          Tertiary button
        </Button>
        <Button
          data-visual-test="button-tertiary-icon-on-dark"
          variant="tertiary"
          icon="bell"
          title="Notifications"
        />
      </Flex.Horizontal>
    </Section>
  </ComponentBox>
)

export const SvgInButton = () => (
  <ComponentBox hideCode scope={{ VippsLogo }}>
    {() => {
      return (
        <Button variant="secondary">
          Button with SVG <VippsLogo />
        </Button>
      )
    }}
  </ComponentBox>
)
