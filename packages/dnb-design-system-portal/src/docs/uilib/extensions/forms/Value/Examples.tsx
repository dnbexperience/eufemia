import React from 'react'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Field, Form, Value } from '@dnb/eufemia/src/extensions/forms'
import { Flex } from '@dnb/eufemia/src'

export const SummaryList = () => {
  return (
    <ComponentBox>
      <Value.SummaryList>
        <Value.String label="Foo" value="value" />
        <Value.Number
          label="Bar"
          value={123}
          help={{ title: 'Help title', content: 'Help content' }}
        />
      </Value.SummaryList>
    </ComponentBox>
  )
}

export const Composition = () => {
  return (
    <ComponentBox>
      <Value.SummaryList>
        <Value.String label="Foo" value="value" />
        <Value.Composition label="Label">
          <Value.String value="value" />
          <Value.Number value={123} />
        </Value.Composition>
      </Value.SummaryList>
    </ComponentBox>
  )
}

export const InheritLabel = () => {
  return (
    <ComponentBox>
      <Form.Handler data={{ myPath: 'My value' }}>
        <Flex.Stack>
          <Value.String path="/myPath" inheritLabel />
          <Field.String path="/myPath" label="Inherited label" />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const InheritVisibility = () => {
  return (
    <ComponentBox>
      <Form.Handler>
        <Flex.Stack>
          <Field.Boolean
            label="Show radio buttons"
            variant="button"
            path="/isVisible"
            defaultValue={true}
          />

          <Form.Visibility pathTrue="/isVisible" animate>
            <Field.Selection
              label="Radio buttons"
              variant="radio"
              path="/myValue"
              defaultValue="foo"
            >
              <Field.Option value="foo" title="Foo" />
              <Field.Option value="bar" title="Bar" />
            </Field.Selection>
          </Form.Visibility>

          <Value.Selection
            path="/myValue"
            inheritLabel
            inheritVisibility
          />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}
