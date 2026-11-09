/**
 * UI lib Component Example
 *
 */

import ComponentBox from '../../../../shared/tags/ComponentBox'
import { useState } from 'react'
import { Chip, CountryFlag, Flex, P } from '@dnb/eufemia/src'

export const ChipDefault = () => (
  <ComponentBox data-visual-test="chip-default">
    <Chip.Group label="Category" values={['housing']}>
      <Chip text="Housing" value="housing" />
      <Chip text="Cars" value="cars" />
      <Chip text="Travel" value="travel" />
    </Chip.Group>
  </ComponentBox>
)

export const ChipAddRemove = () => (
  <ComponentBox data-visual-test="chip-add-remove">
    <Chip.Group label="Interests" variant="add-remove" values={['funds']}>
      <Chip text="Funds" value="funds" />
      <Chip text="Stocks" value="stocks" />
      <Chip text="Savings" value="savings" />
    </Chip.Group>
  </ComponentBox>
)

export const ChipCheckbox = () => (
  <ComponentBox data-visual-test="chip-checkbox">
    <Chip.Group label="Account types" variant="checkbox" values={['bsu']}>
      <Chip text="BSU" value="bsu" />
      <Chip text="Savings" value="savings" />
      <Chip text="Current account" value="current" />
    </Chip.Group>
  </ComponentBox>
)

export const ChipRadio = () => (
  <ComponentBox data-visual-test="chip-radio">
    <Chip.Group label="Period" variant="radio" value="month">
      <Chip text="Week" value="week" />
      <Chip text="Month" value="month" />
      <Chip text="Year" value="year" />
    </Chip.Group>
  </ComponentBox>
)

export const ChipIcon = () => (
  <ComponentBox data-visual-test="chip-icon">
    <Chip.Group label="Destination" values={['norway']}>
      <Chip text="Housing" value="housing" icon="home" />
      <Chip
        text="Norway"
        value="norway"
        leftComponent={<CountryFlag iso="NO" size="small" aria-hidden />}
      />
      <Chip
        text="Sweden"
        value="sweden"
        leftComponent={<CountryFlag iso="SE" size="small" aria-hidden />}
      />
    </Chip.Group>
  </ComponentBox>
)

export const ChipDisabled = () => (
  <ComponentBox data-visual-test="chip-disabled">
    <Flex.Stack>
      <Chip.Group label="Default" disabled values={['b']}>
        <Chip text="Chip" value="a" />
        <Chip text="Chip" value="b" />
      </Chip.Group>
      <Chip.Group
        label="Add or remove"
        variant="add-remove"
        disabled
        values={['b']}
      >
        <Chip text="Chip" value="a" />
        <Chip text="Chip" value="b" />
      </Chip.Group>
      <Chip.Group
        label="Checkbox"
        variant="checkbox"
        disabled
        values={['b']}
      >
        <Chip text="Chip" value="a" />
        <Chip text="Chip" value="b" />
      </Chip.Group>
      <Chip.Group label="Radio" variant="radio" disabled value="b">
        <Chip text="Chip" value="a" />
        <Chip text="Chip" value="b" />
      </Chip.Group>
    </Flex.Stack>
  </ComponentBox>
)

export const ChipStatus = () => (
  <ComponentBox data-visual-test="chip-status">
    <Flex.Stack>
      <Chip.Group
        label="Account types"
        variant="checkbox"
        status="Choose at least one account type"
        values={['bsu']}
      >
        <Chip text="BSU" value="bsu" status="error" />
        <Chip text="Savings" value="savings" status="error" />
      </Chip.Group>
      <Chip.Group label="Period" variant="radio" value="month">
        <Chip text="Week" value="week" status="error" />
        <Chip text="Month" value="month" status="error" />
      </Chip.Group>
    </Flex.Stack>
  </ComponentBox>
)

export const ChipControlled = () => (
  <ComponentBox>
    {() => {
      const Example = () => {
        const [values, setValues] = useState(['housing'])

        return (
          <Flex.Stack>
            <Chip.Group
              label="Category"
              values={values}
              onChange={({ values }) => setValues(values as string[])}
            >
              <Chip text="Housing" value="housing" />
              <Chip text="Cars" value="cars" />
              <Chip text="Travel" value="travel" />
            </Chip.Group>

            <P>Selected: {values.join(', ') || 'none'}</P>
          </Flex.Stack>
        )
      }

      return <Example />
    }}
  </ComponentBox>
)

export const ChipStandalone = () => (
  <ComponentBox data-visual-test="chip-standalone">
    <Chip text="Show closed accounts" value="closed" />
  </ComponentBox>
)
