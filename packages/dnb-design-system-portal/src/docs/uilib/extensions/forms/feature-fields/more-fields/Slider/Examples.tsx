import { Flex, HelpButton, P } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Field, Form, Value } from '@dnb/eufemia/src/extensions/forms'

export const BasicUsage = () => {
  return (
    <ComponentBox>
      <Form.Handler
        defaultData={{
          myValue: 50,
        }}
      >
        <Field.Slider label="Slider" path="/myValue" />
      </Form.Handler>
    </ComponentBox>
  )
}

export const WithStepper = () => {
  return (
    <ComponentBox>
      <Form.Handler
        defaultData={{
          myValue: 50,
        }}
      >
        <Flex.Stack>
          <Field.Currency
            label="Stepper"
            path="/myValue"
            width="medium"
            decimalLimit={0}
            showStepControls
          />
          <Field.Slider label="Slider" path="/myValue" width="large" />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const SyncWithInput = () => {
  return (
    <ComponentBox>
      <Form.Handler
        defaultData={{
          firstValue: 10,
          secondValue: 60,
        }}
      >
        <Flex.Stack>
          <Field.Composition width="large">
            <Field.Currency
              label="First value"
              path="/firstValue"
              decimalLimit={0}
            />
            <Field.Currency
              label="Second value"
              path="/secondValue"
              decimalLimit={0}
            />
          </Field.Composition>

          <Field.Composition width="large">
            <Field.Slider label="First slider" path="/firstValue" />
            <Field.Slider label="Second slider" path="/secondValue" />
          </Field.Composition>
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const MultiThumb = () => {
  return (
    <ComponentBox>
      <Form.Handler
        defaultData={{
          firstValue: 10,
          secondValue: 60,
        }}
      >
        <Flex.Stack>
          <Field.Composition width="large">
            <Field.Currency
              label="First value"
              path="/firstValue"
              decimalLimit={0}
            />
            <Field.Currency
              label="Second value"
              path="/secondValue"
              decimalLimit={0}
            />
          </Field.Composition>

          <Field.Slider
            label="My slider"
            paths={['/firstValue', '/secondValue']}
            multiThumbBehavior="push"
            width="large"
          />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const PathValues = () => {
  return (
    <ComponentBox>
      <Form.Handler
        defaultData={{
          currentValue: 1000,
          min: 0,
          max: 10000,
          step: 10,
        }}
      >
        <Flex.Stack>
          <Flex.Horizontal align="center">
            <P>
              Max value (
              <Value.Currency path="/max" decimals={0} inline />)
            </P>

            <HelpButton>Help text</HelpButton>

            <Field.Currency
              path="/currentValue"
              width="stretch"
              decimalLimit={0}
            />
          </Flex.Horizontal>

          <Field.Slider
            path="/currentValue"
            min="/min"
            max="/max"
            step="/step"
          />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Form.Handler
        defaultData={{
          myValue: 50,
        }}
      >
        <Field.Slider
          label="Slider"
          help={{
            title: 'Help is available',
            content:
              'Take the time to help other people without expecting a reward or gratitude is definitely important in living an optimistic life.',
          }}
          path="/myValue"
        />
      </Form.Handler>
    </ComponentBox>
  )
}
