import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Slider, Grid, Flex } from '@dnb/eufemia/src'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'
import React from 'react'

export const Empty = () => {
  return (
    <ComponentBox data-visual-test="number-input">
      <Field.Number
        onFocus={(value) => console.log('onFocus', value)}
        onBlur={(value) => console.log('onBlur', value)}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Field.Number
        placeholder="Enter a number"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Field.Number
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Field.Number
        value={420000.25}
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Alignment = () => {
  return (
    <ComponentBox>
      <Field.Number
        align="center"
        label="Center aligned (default)"
        value={10}
        onChange={(value) => console.log('onChange', value)}
      />
      <Field.Number
        align="left"
        label="Left aligned"
        value={10}
        onChange={(value) => console.log('onChange', value)}
      />
      <Field.Number
        align="right"
        label="Right aligned"
        value={10}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.Number
        value={12345}
        label="Label text"
        help={{
          title: 'Help is available',
          content:
            'Here is what a team can do for you. . . . It allows you to help others do their best.',
        }}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const HorizontalLayout = () => {
  return (
    <ComponentBox>
      <Field.Number
        value={420000}
        label="Label text"
        layout="horizontal"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Widths = () => {
  return (
    <ComponentBox hideCode data-visual-test="number-widths">
      <Flex.Stack>
        <Form.SubHeading>Without step controls</Form.SubHeading>

        <Field.Number
          label="Default width (property omitted)"
          value={1234}
        />
        <Field.Number label="Small" value={1234} width="small" />
        <Field.Number
          label="Medium (and medium size)"
          value={1234}
          width="medium"
          size="medium"
        />
        <Field.Number
          label="Large (and large size)"
          value={1234}
          width="large"
          size="large"
        />
        <Field.Number label="Stretch" value={1234} width="stretch" />
        <Form.SubHeading>With step controls</Form.SubHeading>
        <Field.Number
          showStepControls
          label="Default width (property omitted)"
          value={1234}
        />
        <Field.Number
          showStepControls
          label="Small"
          value={1234}
          width="small"
        />
        <Field.Number
          showStepControls
          label="Medium (and medium size)"
          value={1234}
          width="medium"
          size="medium"
        />
        <Field.Number
          showStepControls
          label="Large (and large size)"
          value={1234}
          width="large"
          size="large"
        />
        <Field.Number
          showStepControls
          label="Stretch"
          value={1234}
          width="stretch"
        />
      </Flex.Stack>
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox>
      <Field.Number
        value={135}
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const Info = () => {
  return (
    <ComponentBox>
      <Field.Number
        value={135}
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        info="Useful information (?)"
      />
    </ComponentBox>
  )
}

export const Warning = () => {
  return (
    <ComponentBox>
      <Field.Number
        value={135}
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        warning="I'm warning you..."
      />
    </ComponentBox>
  )
}

export const WithError = () => {
  return (
    <ComponentBox>
      <Field.Number
        value={135}
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidateRequired = () => {
  return (
    <ComponentBox>
      <Field.Number
        value={123}
        label="Remove and blur field"
        onChange={(value) => console.log('onChange', value)}
        required
      />
    </ComponentBox>
  )
}

export const ValidateMinimum = () => {
  return (
    <ComponentBox>
      <Field.Number
        value={300}
        label="Enter a number below 250 and blur to trigger error"
        onChange={(value) => console.log('onChange', value)}
        minimum={250}
      />
    </ComponentBox>
  )
}

export const Percentage = () => {
  return (
    <ComponentBox>
      <Field.Number
        percent
        value={80}
        label="Percentage"
        onChange={(value) => console.log('onChange', value)}
        minimum={90}
      />
    </ComponentBox>
  )
}

export const ValidateMaximumCustomError = () => {
  return (
    <ComponentBox>
      <Field.Number
        value={200}
        label="Enter a number above 250 and blur to trigger error"
        onChange={(value) => console.log('onChange', value)}
        maximum={250}
        errorMessages={{
          maximum: "You can't enter a number THAR large.. Max 250!",
        }}
      />
    </ComponentBox>
  )
}

export const WithStepControls = () => (
  <ComponentBox data-visual-test="number-input-step-controls">
    <Field.Number
      showStepControls
      minimum={0}
      maximum={100}
      step={10}
      value={50}
    />
  </ComponentBox>
)

export const WithStepControlsError = () => (
  <ComponentBox data-visual-test="number-input-step-controls-error">
    <Field.Number
      showStepControls
      maximum={100}
      value={150}
      error={new Error('You done messed up, A-a-ron!')}
    />
  </ComponentBox>
)

export const WithStepControlsDisabled = () => (
  <ComponentBox data-visual-test="number-input-step-controls-disabled">
    <Field.Number showStepControls disabled />
  </ComponentBox>
)

export const WithSlider = () => (
  <ComponentBox hideCode>
    {() => {
      const Component = () => {
        const [value, setValue] = React.useState(50000)
        const settings = {
          min: 0,
          max: 100000,
          step: 1000,
        }
        return (
          <Grid.Container>
            <Grid.Item
              span={{
                small: [1, 12],
                medium: [1, 4],
                large: [1, 3],
              }}
            >
              <Field.Number
                showStepControls
                minimum={settings.min}
                maximum={settings.max}
                step={settings.step}
                value={value}
                onChange={(value) => setValue(value)}
                width="stretch"
                bottom="small"
              />
              <Slider
                min={settings.min}
                max={settings.max}
                step={settings.step}
                value={value}
                onChange={({ value }) =>
                  setValue(parseFloat(String(value)))
                }
                hideButtons
                tooltip
              />
            </Grid.Item>
          </Grid.Container>
        )
      }
      return <Component />
    }}
  </ComponentBox>
)
