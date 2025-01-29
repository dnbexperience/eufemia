import React from 'react'
import { Section } from '../../../../../components'
import { Field, Form } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/Selection',
}

export function Selection() {
  return (
    <Form.Card>
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
    </Form.Card>
  )
}

export function Autocomplete() {
  return (
    <Form.Card>
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
    </Form.Card>
  )
}

export function HelpButton() {
  return (
    <Form.Card>
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
    </Form.Card>
  )
}

export function NestingWithLogic() {
  return (
    <Form.Handler>
      <Form.Card>
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
            visibleWhen={{ path: '/mySelection', hasValue: 'showInput' }}
            animate
            compensateForGap="auto" // makes animation smooth
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
            visibleWhen={{
              path: '/mySelection',
              hasValue: (value) =>
                value === 'showAdditionalOption' || value === 'showMeMore',
            }}
            animate
            compensateForGap="auto" // makes animation smooth
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
      </Form.Card>
    </Form.Handler>
  )
}

export function TransformSelection() {
  return (
    <Form.Card>
      <Field.Selection
        label="Label"
        value="bar"
        transformSelection={({ title }) => {
          return title
        }}
      >
        <Field.Option value="foo" title="Foo!" text="Additional text" />
        <Field.Option value="bar" title="Baar!" text="Additional text" />
      </Field.Selection>
    </Form.Card>
  )
}
