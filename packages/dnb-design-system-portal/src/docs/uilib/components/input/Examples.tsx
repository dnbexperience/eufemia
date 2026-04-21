/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { HelpButton, Input, Flex, FormLabel, Lead } from '@dnb/eufemia/src'
import { Field, FieldBlock, Form } from '@dnb/eufemia/src/extensions/forms'

export const InputExampleDefault = () => (
  <ComponentBox data-visual-test="input-placeholder">
    <Input label="Label" placeholder="Placeholder text" />
  </ComponentBox>
)

export const InputExampleSearch = () => (
  <ComponentBox data-visual-test="input-search">
    <Input
      label="Search"
      type="search"
      placeholder="Search text placeholder"
      onChange={({ value }) => {
        console.log('onChange', value)
      }}
      onSubmit={({ value }) => {
        console.log('Submit:', value)
      }}
    />
  </ComponentBox>
)

export const InputExampleMedium = () => (
  <ComponentBox data-visual-test="input-medium">
    <Input
      size="medium"
      type="search"
      stretch={true}
      value="Medium search value"
      onChange={({ value }) => {
        console.log('onChange', value)
      }}
    />
  </ComponentBox>
)

export const InputExampleWithIcon = () => (
  <ComponentBox data-visual-test="input-icon">
    <Input
      label="Input with icon"
      placeholder="Input"
      icon="check"
      bottom
    />
    <Input
      label="Input with icon"
      labelSrOnly
      placeholder="Input with a placeholder"
      iconPosition="right"
      icon="check"
      align="right"
    />
  </ComponentBox>
)

export const InputExampleDisabled = () => (
  <ComponentBox data-visual-test="input-disabled">
    <Input
      disabled
      label="Disabled input"
      placeholder="Disabled Input with a placeholder"
    />
  </ComponentBox>
)

export const InputExampleFormStatus = () => (
  <ComponentBox>
    <Flex.Vertical>
      <section data-visual-test="input-error">
        <Input
          label="With FormStatus"
          status="You have to fill in this field"
          value="Input value with error"
        />
      </section>
      <section data-visual-test="input-error-button">
        <Input
          label="With button"
          status="You have to fill in this field"
          value="Input value with error"
          type="search"
        />
      </section>
    </Flex.Vertical>
  </ComponentBox>
)

export const InputExampleSuffix = () => (
  <ComponentBox>
    <Input
      label={<Lead>Fødselsnummer</Lead>}
      autocomplete="on"
      placeholder="Placeholder text"
      suffix={
        <HelpButton title="Info" size="large">
          Some content
        </HelpButton>
      }
      onChange={({ value }) => {
        console.log('onChange', value)
      }}
    />
  </ComponentBox>
)

export const InputExampleStretched = () => (
  <ComponentBox data-visual-test="input-stretch">
    <FieldBlock
      label="Long label labwl Adipiscing mauris dis proin nec"
      forId="input-id"
    >
      <Input
        id="input-id"
        value="I stretch ..."
        stretch
        status="Status message"
        statusState="warning"
      />
    </FieldBlock>
  </ComponentBox>
)

export const InputExampleNumbers = () => (
  <ComponentBox>
    <Input
      label="Label"
      autocomplete="on"
      placeholder="Placeholder text"
      status="Numbers are using DNB Mono (monospace)"
      statusState="information"
      value="1234567890"
      onChange={({ value }) => {
        console.log('onChange', value)
        return String(value).toUpperCase()
      }}
    />
  </ComponentBox>
)

export const InputExampleSubmit = () => (
  <ComponentBox>
    <Form.Handler
      onSubmit={(event) => {
        console.log(event)
      }}
    >
      <FormLabel forId="search">Label</FormLabel>
      <Flex.Horizontal align="baseline">
        <Input
          id="search"
          type="search"
          value="Input ..."
          selectAll={true}
          onSubmit={(event) => {
            console.log('Input.onSubmit', event)
          }}
          onChange={({ value }) => {
            console.log('onChange:', value)
          }}
        />
        <Form.SubmitButton />
      </Flex.Horizontal>
    </Form.Handler>
  </ComponentBox>
)

export const InputExampleClear = () => (
  <ComponentBox data-visual-test="input-clear">
    <Flex.Vertical>
      <Input showClearButton={true} value="Value ..." size="medium" />
      <Input showClearButton={true} value="Value ..." type="search" />
      <Input
        showClearButton={true}
        value="Value ..."
        icon="loupe"
        type="search"
      />
    </Flex.Vertical>
  </ComponentBox>
)

export const InputScreenshotTests = () => {
  return (
    <ComponentBox data-visual-test="input-align">
      <FieldBlock label="Left aligned">
        <Flex.Vertical>
          <Input value="Plain" />
          <Input value="Search" type="search" />
          <Input value="Search" size="medium" type="search" />
          <Input value="Search" size="large" type="search" />
          <Input
            value="Value Eu pretium sit magnis suscipit cursus dis proin rutrum elementum"
            icon="calendar"
          />
          <Input
            placeholder="Placeholder Eu pretium sit magnis suscipit cursus dis proin rutrum elementum"
            iconPosition="right"
            icon="calendar"
          />
          <Input size="medium" value="Value" icon="calendar" />
          <Input
            size="medium"
            placeholder="Placeholder"
            iconPosition="right"
            icon="calendar"
          />
          <Input size="large" value="Value" icon="calendar" />
          <Input
            size="large"
            placeholder="Placeholder"
            iconPosition="right"
            icon="calendar"
          />
        </Flex.Vertical>
      </FieldBlock>
      <FieldBlock top label="Right aligned">
        <Flex.Vertical>
          <Input value="Plain" align="right" />
          <Input value="Search" type="search" align="right" />
          <Input
            value="Search"
            size="medium"
            type="search"
            align="right"
          />
          <Input value="Search" size="large" type="search" align="right" />
          <Input
            value="Value Eu pretium sit magnis suscipit cursus dis proin rutrum elementum"
            icon="calendar"
            align="right"
          />
          <Input
            placeholder="Placeholder Eu pretium sit magnis suscipit cursus dis proin rutrum elementum"
            iconPosition="right"
            icon="calendar"
            align="right"
          />
          <Input
            size="medium"
            value="Value"
            icon="calendar"
            align="right"
          />
          <Input
            size="medium"
            placeholder="Placeholder"
            iconPosition="right"
            icon="calendar"
            align="right"
          />
          <Input
            size="large"
            value="Value"
            icon="calendar"
            align="right"
          />
          <Input
            size="large"
            placeholder="Placeholder"
            iconPosition="right"
            icon="calendar"
            align="right"
          />
        </Flex.Vertical>
      </FieldBlock>
    </ComponentBox>
  )
}

export const CurrencyField = () => {
  return (
    <ComponentBox hideCode>
      <Field.Currency
        label="Amount"
        value={1234}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}
