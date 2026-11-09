import { useState } from 'react'
import {
  Avatar,
  Chip,
  CountryFlag,
  Flex,
  HelpButton,
  P,
  Section,
} from '@dnb/eufemia/src'
import type { ChipValue } from '@dnb/eufemia/src/components/Chip'
import { savings_account } from '@dnb/eufemia/src/icons'
import ComponentBox from '../../../../shared/tags/ComponentBox'

export const MultipleSelection = () => (
  <ComponentBox data-visual-test="chip-multiple">
    {() => {
      const Example = () => {
        const [values, setValues] = useState<ChipValue[]>(['savings'])

        return (
          <Flex.Stack>
            <Chip.Group
              selectionMode="multiple"
              label="Account filters"
              name="filters"
              values={values}
              onChange={({ values }) => setValues(values)}
            >
              {['savings', 'funds', 'loans'].map((value) => (
                <Chip key={value} value={value}>
                  {value === 'savings'
                    ? 'Savings'
                    : value === 'funds'
                      ? 'Funds'
                      : 'Loans'}
                </Chip>
              ))}
            </Chip.Group>
            <P>Selected: {values.join(', ') || 'None'}</P>
          </Flex.Stack>
        )
      }

      return <Example />
    }}
  </ComponentBox>
)

export const SingleSelection = () => (
  <ComponentBox data-visual-test="chip-radio-group">
    <Chip.Group
      label="Account type"
      name="account"
      variant="radio"
      value="savings"
      onChange={({ value }) => console.log(value)}
    >
      <Chip value="savings">Savings</Chip>
      <Chip value="funds">Funds</Chip>
      <Chip value="loans" disabled>
        Loans
      </Chip>
      <Chip value="all">All accounts</Chip>
    </Chip.Group>
  </ComponentBox>
)

export const Variants = () => (
  <ComponentBox
    data-visual-test="chip-variants"
    scope={{ savings_account }}
  >
    <Flex.Container gap="x-small" role="group" aria-label="Chip variants">
      <Chip>Default</Chip>
      <Chip variant="addable">Add or remove</Chip>
      <Chip variant="checkbox">Checkbox</Chip>
      <Chip icon={savings_account}>Savings</Chip>
    </Flex.Container>
  </ComponentBox>
)

export const Groups = () => (
  <ComponentBox data-visual-test="chip-groups">
    <Flex.Stack>
      <Chip.Group label="View" value="overview">
        <Chip value="overview">Overview</Chip>
        <Chip value="details">Details</Chip>
      </Chip.Group>
      <Chip.Group
        selectionMode="multiple"
        variant="checkbox"
        label="Notifications"
        values={['email']}
        layoutDirection="column"
        suffix="Choose all that apply"
        status="Choose at least two channels"
      >
        <Chip value="email">Email</Chip>
        <Chip value="sms">SMS</Chip>
      </Chip.Group>
      <Chip.Group
        label="Account (read only)"
        variant="radio"
        value="savings"
        readOnly
      >
        <Chip value="savings">Savings</Chip>
        <Chip value="funds">Funds</Chip>
      </Chip.Group>
    </Flex.Stack>
  </ComponentBox>
)

export const Tooltips = () => (
  <ComponentBox
    data-visual-test="chip-tooltips"
    scope={{ savings_account }}
  >
    <Flex.Container gap="x-small" role="group" aria-label="Chip tooltips">
      <Chip tooltip="Show accounts that earn interest">Savings</Chip>
      <Chip icon={savings_account} labelSrOnly tooltip="Savings accounts">
        Savings accounts
      </Chip>
      <Chip
        variant="radio"
        icon="bell"
        labelSrOnly
        tooltip="Notifications"
      >
        Notifications
      </Chip>
    </Flex.Container>
  </ComponentBox>
)

export const Sizes = () => (
  <ComponentBox data-visual-test="chip-sizes">
    <Flex.Stack>
      {(['small', 'medium', 'default', 'large'] as const).map((size) => (
        <Chip.Group
          key={size}
          label={size}
          size={size}
          selectionMode="multiple"
          values={['checkbox', 'radio']}
        >
          <Chip value="default">Default</Chip>
          <Chip value="addable" variant="addable">
            Addable
          </Chip>
          <Chip value="checkbox" variant="checkbox">
            Checkbox
          </Chip>
          <Chip value="radio" variant="radio">
            Radio
          </Chip>
        </Chip.Group>
      ))}
      <Chip.Group label="Individual size override" size="large">
        <Chip value="inherited">Inherited</Chip>
        <Chip value="override" size="small">
          Small
        </Chip>
      </Chip.Group>
    </Flex.Stack>
  </ComponentBox>
)

export const OptionHelp = () => (
  <ComponentBox data-visual-test="chip-option-help">
    <Flex.Stack>
      <Chip.Group label="Account" value={0} variant="radio">
        <Chip
          value={0}
          suffix={
            <HelpButton size="small" title="About savings">
              Savings accounts earn interest on your balance.
            </HelpButton>
          }
        >
          Savings
        </Chip>
        <Chip
          value={1}
          suffix={
            <HelpButton size="small" title="About funds">
              Funds let you invest for the long term.
            </HelpButton>
          }
        >
          Funds
        </Chip>
      </Chip.Group>
      <Chip.Group
        label="Filters"
        selectionMode="multiple"
        variant="checkbox"
      >
        <Chip
          value="active"
          suffix={
            <HelpButton size="small" title="About active accounts">
              Show accounts that are currently in use.
            </HelpButton>
          }
        >
          Active accounts
        </Chip>
      </Chip.Group>
    </Flex.Stack>
  </ComponentBox>
)

export const GroupAppearances = () => (
  <ComponentBox hideCode data-visual-test="chip-group-appearances">
    <Flex.Stack>
      {(['default', 'addable', 'checkbox', 'radio'] as const).map(
        (variant) => (
          <Flex.Stack key={variant} gap="small">
            <Chip.Group
              variant={variant}
              value="selected"
              label={`${variant}: single`}
            >
              <Chip value="selected">Selected</Chip>
              <Chip value="available">Available</Chip>
              <Chip value="loading" skeleton>
                Loading
              </Chip>
            </Chip.Group>
            <Chip.Group
              variant={variant}
              selectionMode="multiple"
              values={['selected']}
              label={`${variant}: multiple`}
            >
              <Chip value="selected">Selected</Chip>
              <Chip value="available">Available</Chip>
              <Chip value="loading" skeleton>
                Loading
              </Chip>
            </Chip.Group>
          </Flex.Stack>
        )
      )}
    </Flex.Stack>
  </ComponentBox>
)

export const States = () => (
  <ComponentBox hideCode data-visual-test="chip-states">
    <Flex.Stack gap="small">
      {(['default', 'addable', 'radio', 'checkbox'] as const).map(
        (variant) => (
          <Flex.Container
            key={variant}
            gap="x-small"
            role="group"
            aria-label={`${variant} states`}
          >
            <Chip variant={variant}>Chip</Chip>
            <Chip variant={variant} checked>
              Chip
            </Chip>
            <Chip variant={variant} disabled>
              Chip
            </Chip>
            <Chip variant={variant} disabled checked>
              Chip
            </Chip>
            <Chip variant={variant} readOnly>
              Read-only
            </Chip>
            <Chip variant={variant} readOnly checked>
              Read-only
            </Chip>
          </Flex.Container>
        )
      )}
    </Flex.Stack>
  </ComponentBox>
)

export const FlagsAndLogos = () => (
  <ComponentBox
    data-visual-test="chip-flags-and-logos"
    scope={{ Avatar, CountryFlag }}
  >
    <Flex.Stack>
      {[false, true].map((checked) => (
        <Flex.Container key={String(checked)} gap="x-small">
          <Chip
            checked={checked}
            icon={<CountryFlag iso="US" size="small" />}
          >
            United States
          </Chip>
          <Chip
            variant="addable"
            checked={checked}
            icon={
              <Avatar
                src="/images/avatars/dnb.svg"
                alt=""
                hasLabel
                style={{ width: '1rem', height: '1rem' }}
              />
            }
          >
            DNB
          </Chip>
          <Chip
            variant="checkbox"
            checked={checked}
            icon={<CountryFlag iso="NO" size="small" />}
          >
            Norway
          </Chip>
          <Chip
            variant="radio"
            checked={checked}
            icon={
              <Avatar
                src="/images/avatars/dnb.svg"
                alt=""
                hasLabel
                style={{ width: '1rem', height: '1rem' }}
              />
            }
          >
            DNB
          </Chip>
        </Flex.Container>
      ))}
    </Flex.Stack>
  </ComponentBox>
)

export const Error = () => (
  <ComponentBox data-visual-test="chip-error">
    <Flex.Stack>
      <Chip.Group
        label="Accounts"
        variant="checkbox"
        selectionMode="multiple"
        values={['savings']}
        status="Select at least two accounts"
      >
        <Chip value="savings">Savings</Chip>
        <Chip value="funds">Funds</Chip>
      </Chip.Group>
      <Chip.Group
        label="Period"
        variant="radio"
        value="month"
        status="Choose another period"
      >
        <Chip value="month">Month</Chip>
        <Chip value="year">Year</Chip>
      </Chip.Group>
    </Flex.Stack>
  </ComponentBox>
)

export const DarkSurface = () => (
  <ComponentBox data-visual-test="chip-dark-surface">
    <Section surface="dark" innerSpace>
      <Flex.Container gap="x-small">
        <Chip>Default</Chip>
        <Chip variant="addable" checked>
          Selected
        </Chip>
        <Chip variant="checkbox" checked>
          Checkbox
        </Chip>
        <Chip variant="radio" checked>
          Radio
        </Chip>
        <Chip disabled>Disabled</Chip>
        <Chip variant="checkbox" disabled checked>
          Disabled selected
        </Chip>
      </Flex.Container>
    </Section>
  </ComponentBox>
)

export const LongLabels = () => (
  <ComponentBox data-visual-test="chip-long-labels">
    <Flex.Container gap="x-small">
      <Chip variant="checkbox">
        A longer option that wraps when space is limited
      </Chip>
      <Chip variant="radio">
        AnExtremelyLongUnbrokenLabelThatStillNeedsToFitOnASmallScreen
      </Chip>
    </Flex.Container>
  </ComponentBox>
)

export const Skeleton = () => (
  <ComponentBox data-visual-test="chip-skeleton">
    <Flex.Container gap="x-small">
      <Chip skeleton>Loading option</Chip>
      <Chip variant="checkbox" skeleton>
        Loading option
      </Chip>
      <Chip variant="radio" skeleton>
        Loading option
      </Chip>
    </Flex.Container>
  </ComponentBox>
)
