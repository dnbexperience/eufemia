import React from 'react'
import { Flex, Section } from '../../../../../components'
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
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option value="foo" title="Foo!" />
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
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option value="foo" title="Foo!" />
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
          label="Make a selection"
          path="/mySelection"
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

export function SelectionRadioList() {
  return (
    <Flex.Stack>
      <Field.Selection
        variant="radio-list"
        label="Medium label"
        labelSize="medium"
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option label="First" value="first" />
        <Field.Option label="Second" value="second" />
        <Field.Option label="Third" value="third" />
      </Field.Selection>

      <Field.Selection
        width="medium"
        variant="radio-list"
        label="medium"
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option label="First" value="first" />
        <Field.Option label="Second" value="second" />
        <Field.Option label="Third" value="third" />
      </Field.Selection>

      <Field.Selection
        width="small"
        variant="radio-list"
        label="small"
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option label="First" value="first" />
        <Field.Option label="Second" value="second" />
        <Field.Option label="Third" value="third" />
      </Field.Selection>

      <Field.Selection
        width="stretch"
        variant="radio-list"
        label="stretch"
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option label="First" value="first" />
        <Field.Option label="Second" value="second" />
        <Field.Option label="Third" value="third" />
      </Field.Selection>
    </Flex.Stack>
  )
}

export function SelectionAutocompleteAriaRequired() {
  return (
    <Field.Selection
      label="Label"
      variant="autocomplete"
      required
      validateInitially
      autocompleteProps={{ opened: true }}
    >
      <Field.Option value="foo">Foo</Field.Option>
      <Field.Option value="bar">Bar</Field.Option>
    </Field.Selection>
  )
}

export function SelectionButtonsAriaRequired() {
  return (
    <Field.Selection
      required
      variant="button"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  )
}

export function SelectionAriaRequired() {
  return (
    <Field.Selection
      label="Label"
      variant="dropdown"
      required
      validateInitially
    >
      <Field.Option value="foo">Foo</Field.Option>
      <Field.Option value="bar">Bar</Field.Option>
    </Field.Selection>
  )
}
