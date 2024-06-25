import React from 'react'
import { Card, Section } from '../../../../../components'
import { Field, Form } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/Selection',
}

export function Selection() {
  return (
    <Card stack>
      <Field.Selection
        label="Label"
        required
        validateInitially
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Selection>

      <Field.Selection
        label="Label"
        required
        validateInitially
        variant="radio"
        layout="horizontal"
        optionsLayout="horizontal"
        // error={new Error('This is what is wrong...')}
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option
          value="foo"
          title="Foo!"
          // error={new Error('This is what is wrong...')}
        />
        <Field.Option value="bar" title="Baar!" />
      </Field.Selection>

      <Field.Selection
        label="Label"
        required
        validateInitially
        variant="button"
        layout="horizontal"
        optionsLayout="horizontal"
        value="foo"
        // error={new Error('This is what is wrong...')}
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option
          value="foo"
          title="Foo!"
          // error={new Error('This is what is wrong...')}
        />
        <Field.Option value="bar" title="Baar!" />
      </Field.Selection>
    </Card>
  )
}

export function Autocomplete() {
  return (
    <Card stack>
      <Field.Selection
        label="Label"
        required
        variant="autocomplete"
        validateInitially
        onChange={(value) => console.log('onChange', value)}
        autocompleteProps={{
          showSubmitButton: true,
          submitButtonTitle: 'Custom title',
        }}
        help={{
          title: 'Title',
          content: 'Content',
        }}
      >
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Selection>
    </Card>
  )
}

export function HelpButton() {
  return (
    <Card stack>
      <Field.Selection
        label="Label"
        variant="button"
        // variant="radio"
        help={{
          title: 'Title',
          content: 'Content',
        }}
      >
        <Field.Option
          value="foo"
          title="Foo!"
          help={{
            title: 'Title',
            content: 'Content',
          }}
        />
        <Field.Option
          value="bar"
          title="Baar!"
          help={{
            title: 'Title',
            content: 'Content',
          }}
        />
      </Field.Selection>
    </Card>
  )
}

export function NestingWithLogic() {
  return (
    <Form.Handler>
      <Card stack>
        <Field.Selection
          variant="radio"
          // variant="button"
          label="Make a selection"
          path="/mySelection"
          // defaultValue="showAdditionalOption"
          defaultValue="showInput"
        >
          <Field.Option value="nothing" title="Nothing" />

          <Field.Option value="showInput" title="Show an input" />
          <Form.Visibility
            animate
            visibleWhen={{ path: '/mySelection', hasValue: 'showInput' }}
            compensateForGap="auto"
          >
            <Section variant="info" innerSpace>
              <Field.String placeholder="Enter some value" />
            </Section>
          </Form.Visibility>

          <Field.Option
            value="showAdditionalOption"
            title="Show additional option"
          />
          <Form.Visibility
            animate
            visibleWhen={{
              path: '/mySelection',
              withValue: (value) =>
                value === 'showAdditionalOption' || value === 'showMeMore',
            }}
            compensateForGap="auto"
          >
            <Field.Option
              value="showMeMore"
              title="Show even more"
              bottom="x-small"
            />
            <Form.Visibility
              animate
              visibleWhen={{
                path: '/mySelection',
                hasValue: 'showMeMore',
              }}
            >
              <Section variant="info" innerSpace>
                <Field.String placeholder="Enter more info" />
              </Section>
            </Form.Visibility>
          </Form.Visibility>
        </Field.Selection>
      </Card>
    </Form.Handler>
  )
}
