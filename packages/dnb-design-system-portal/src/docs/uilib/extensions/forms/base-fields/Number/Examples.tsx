import React from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia/src'
import { Field, Form, FormError } from '@dnb/eufemia/src/extensions/forms'

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Field.Number
        label="Label text"
        placeholder="Enter a number..."
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Field.Number
        label="Label text"
        defaultValue={420000.25}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndDescription = () => {
  return (
    <ComponentBox data-visual-test="number-label-description">
      <Form.Card>
        <Field.Number
          label="Label text"
          labelDescription="Description text on the next line"
          placeholder="Enter a text..."
        />
        <Field.Number
          label="Label text"
          labelDescription="Description text on the same line"
          labelDescriptionSameLine
          placeholder="Enter a text..."
        />
      </Form.Card>
    </ComponentBox>
  )
}

export const WithStatus = () => {
  return (
    <ComponentBox data-visual-test="number-status">
      <Form.Card>
        <Field.Number
          label="Label text"
          placeholder="Enter a number..."
          width="large"
          warning="Short warning."
          required
        />
        <Field.Number
          label="Label text"
          defaultValue={420000}
          width="large"
          info="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et."
          required
        />
        <Field.Number
          label="Label text"
          value={1234}
          width="small"
          warning="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et. Velit incididunt exercitation est magna ex irure dolore nisi eiusmod ea exercitation."
          required
        />
      </Form.Card>
    </ComponentBox>
  )
}

export const HorizontalLayout = () => {
  return (
    <ComponentBox data-visual-test="number-horizontal-layout">
      <Form.Card>
        <Field.Provider
          layout="horizontal"
          layoutOptions={{
            width: 'medium', // can be a rem value
          }}
          required
        >
          <Field.Number
            label="Label text"
            defaultValue={420000}
            step={10000}
            showStepControls
          />
          <Field.Number
            label="Label with a long text that will wrap"
            placeholder="Enter a number..."
            info="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et."
          />
          <Field.Number
            label="Label with a long text that will wrap"
            placeholder="Enter a number..."
            size="large"
            width="stretch"
          />
        </Field.Provider>
      </Form.Card>
    </ComponentBox>
  )
}

export const ExclusiveMinMax = () => {
  return (
    <ComponentBox>
      <Field.Number
        defaultValue={1000}
        label="Label text"
        allowNegative={false}
        required
        exclusiveMinimum={900}
        exclusiveMaximum={1000}
        validateInitially
      />
    </ComponentBox>
  )
}

export const PrefixAndSuffix = () => {
  return (
    <ComponentBox>
      <Flex.Stack>
        <Field.Number
          defaultValue={1234}
          label="With prefix"
          prefix="prefix "
          onChange={(value) => console.log('onChange', value)}
        />
        <Field.Number
          defaultValue={1}
          label="With suffix (function)"
          suffix={(value) => (value === 1 ? ' year' : ' years')}
          onChange={(value) => console.log('onChange', value)}
        />
      </Flex.Stack>
    </ComponentBox>
  )
}

export const Alignment = () => {
  return (
    <ComponentBox>
      <Flex.Stack>
        <Field.Number
          align="center"
          label="Center aligned (default)"
          defaultValue={10}
          onChange={(value) => console.log('onChange', value)}
        />
        <Field.Number
          align="left"
          label="Left aligned"
          defaultValue={10}
          onChange={(value) => console.log('onChange', value)}
        />
        <Field.Number
          align="right"
          label="Right aligned"
          defaultValue={10}
          onChange={(value) => console.log('onChange', value)}
        />
      </Flex.Stack>
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.Number
        defaultValue={12345}
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

export const Widths = () => {
  return (
    <ComponentBox hideCode data-visual-test="number-widths">
      <Flex.Stack>
        <Form.SubHeading>Without step controls</Form.SubHeading>

        <Field.Number
          label="Default width (property omitted)"
          defaultValue={1234}
        />
        <Field.Number label="Small" defaultValue={1234} width="small" />
        <Field.Number
          label="Medium (and medium size)"
          defaultValue={1234}
          width="medium"
          size="medium"
        />
        <Field.Number
          label="Large (and large size)"
          defaultValue={1234}
          width="large"
          size="large"
        />
        <Field.Number
          label="Stretch"
          defaultValue={1234}
          width="stretch"
        />
        <Form.SubHeading>With step controls</Form.SubHeading>
        <Field.Number
          showStepControls
          label="Default width (property omitted)"
          defaultValue={1234}
        />
        <Field.Number
          showStepControls
          label="Small"
          defaultValue={1234}
          width="small"
        />
        <Field.Number
          showStepControls
          label="Medium (and medium size)"
          defaultValue={1234}
          width="medium"
          size="medium"
        />
        <Field.Number
          showStepControls
          label="Large (and large size)"
          defaultValue={1234}
          width="large"
          size="large"
        />
        <Field.Number
          showStepControls
          label="Stretch"
          defaultValue={1234}
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
        defaultValue={135}
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const ValidateRequired = () => {
  return (
    <ComponentBox>
      <Field.Number
        defaultValue={123}
        label="Label text"
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
        defaultValue={300}
        label="Enter a number below 250 and blur to trigger error"
        onChange={(value) => console.log('onChange', value)}
        minimum={250}
      />
    </ComponentBox>
  )
}

export const AllowNegative = () => {
  return (
    <ComponentBox>
      <Field.Number allowNegative={false} />
    </ComponentBox>
  )
}

export const DisallowLeadingZeroes = () => {
  return (
    <ComponentBox>
      <Field.Number disallowLeadingZeroes />
    </ComponentBox>
  )
}

export const Percentage = () => {
  return (
    <ComponentBox>
      <Field.Number
        percent
        defaultValue={80}
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
        label="Enter a number above 250 and blur to trigger error"
        defaultValue={200}
        maximum={250}
        errorMessages={{
          maximum: "You can't enter a number THAR large.. Max 250!",
        }}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const WithStepControls = () => (
  <ComponentBox data-visual-test="number-input-step-controls">
    <Field.Number
      label="Label text"
      showStepControls
      minimum={0}
      maximum={100}
      step={10}
      defaultValue={50}
    />
  </ComponentBox>
)

export const WithStepControlsError = () => (
  <ComponentBox data-visual-test="number-input-step-controls-error">
    <Field.Number
      label="Label text"
      showStepControls
      maximum={100}
      defaultValue={150}
      error={new Error('You done messed up, A-a-ron!')}
    />
  </ComponentBox>
)

export const WithStepControlsDisabled = () => (
  <ComponentBox data-visual-test="number-input-step-controls-disabled">
    <Field.Number label="Label text" showStepControls disabled />
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
                label="Label text"
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

export const ConditionalInfo = () => {
  return (
    <ComponentBox scope={{ FormError }}>
      {() => {
        return (
          <Form.Handler
            defaultData={{
              maximum: 4,
              amount: 5,
            }}
            onSubmit={async (data) => {
              console.log('onSubmit', data)
            }}
          >
            <Form.Card>
              <Field.Number
                label="Maximum for amount"
                labelDescription={
                  <>Defines the maximum amount possible to be entered.</>
                }
                path="/maximum"
                required
                info={(
                  maximum,
                  { conditionally, getValueByPath, getFieldByPath },
                ) => {
                  return conditionally(() => {
                    if (maximum < getValueByPath('/amount')) {
                      const { props, id } = getFieldByPath('/amount')
                      const anchor = props?.label && (
                        <Anchor
                          href={'#' + id + '-label'}
                          onClick={(event) => {
                            event.preventDefault()
                            const el = document.getElementById(
                              id + '-label',
                            )
                            el?.scrollIntoView()
                          }}
                        >
                          {props.label}
                        </Anchor>
                      )

                      return (
                        anchor && (
                          <>
                            Remember to adjust the {anchor} to be {maximum}{' '}
                            or lower.
                          </>
                        )
                      )
                    }
                  })
                }}
              />
              <Field.Number
                label="Amount"
                labelDescription={
                  <>Should be same or lower than maximum.</>
                }
                path="/amount"
                required
                onBlurValidator={(amount: number, { connectWithPath }) => {
                  const maximum = connectWithPath('/maximum').getValue()

                  if (amount > maximum) {
                    return new FormError('NumberField.errorMaximum', {
                      messageValues: {
                        maximum: String(maximum),
                      },
                    })
                  }
                }}
              />
            </Form.Card>

            <Form.SubmitButton />
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}
