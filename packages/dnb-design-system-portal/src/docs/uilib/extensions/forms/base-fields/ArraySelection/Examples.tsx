import { Card, Section } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'

// Checkbox

export const CheckboxEmpty = () => (
  <ComponentBox>
    <Field.ArraySelection
      onFocus={(value) => console.log('onFocus', value)}
      onBlur={(value) => console.log('onBlur', value)}
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Fooo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const CheckboxLabel = () => (
  <ComponentBox data-visual-test="array-selection-checkbox-options-vertical">
    <Field.ArraySelection
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Fooo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const CheckboxOptionSelected = () => (
  <ComponentBox>
    <Field.ArraySelection
      value={['bar']}
      onChange={(values) => console.log('onChange', values)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const CheckboxHorizontalLayout = () => (
  <ComponentBox data-visual-test="array-selection-checkbox-horizontal-layout">
    <Field.ArraySelection
      label="Label text"
      value={['bar']}
      layout="horizontal"
      onChange={(values) => console.log('onChange', values)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const CheckboxHorizontalOptionsLayout = () => (
  <ComponentBox data-visual-test="array-selection-checkbox-options-horizontal">
    <Field.ArraySelection
      label="Label text"
      value={['bar']}
      optionsLayout="horizontal"
      onChange={(values) => console.log('onChange', values)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const CheckboxHorizontalLayoutAndHorizontalOptionsLayout = () => (
  <ComponentBox data-visual-test="array-selection-checkbox-horizontal">
    <Field.ArraySelection
      label="Label text"
      value={['bar']}
      layout="horizontal"
      optionsLayout="horizontal"
      onChange={(values) => console.log('onChange', values)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const CheckboxDisabled = () => (
  <ComponentBox>
    <Field.ArraySelection
      value={['bar']}
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      disabled
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const CheckboxInfo = () => (
  <ComponentBox>
    <Field.ArraySelection
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      info="FYI"
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const CheckboxWarning = () => (
  <ComponentBox>
    <Field.ArraySelection
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      warning="I'm warning you..."
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const CheckboxError = () => (
  <ComponentBox>
    <Field.ArraySelection
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      error={new Error('This is what is wrong...')}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const CheckboxWithHelp = () => (
  <ComponentBox data-visual-test="array-selection-checkbox-help">
    <Field.ArraySelection
      label="Label text"
      help={{ title: 'Help title', content: 'Help content' }}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const CheckboxNestingWithLogic = () => (
  <ComponentBox data-visual-test="array-selection-checkbox-nesting-logic">
    <Form.Handler>
      <Card stack>
        <Field.ArraySelection label="Make a selection" path="/mySelection">
          <Field.Option value="nothing" title="Nothing" />

          <Field.Option value="showInput" title="Show an input" />
          <Form.Visibility
            animate
            visibleWhen={{
              path: '/mySelection',
              withValue: (value) => {
                return Array.isArray(value)
                  ? value.includes('showInput')
                  : false
              },
            }}
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
              withValue: (value) => {
                return Array.isArray(value)
                  ? value.includes('showAdditionalOption')
                  : false
              },
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
                withValue: (value) => {
                  return Array.isArray(value)
                    ? value.includes('showMeMore')
                    : false
                },
              }}
            >
              <Section variant="info" innerSpace>
                <Field.String placeholder="Enter more info" />
              </Section>
            </Form.Visibility>
          </Form.Visibility>
        </Field.ArraySelection>
      </Card>
    </Form.Handler>
  </ComponentBox>
)

// Button

export const ButtonEmpty = () => (
  <ComponentBox>
    <Field.ArraySelection
      variant="button"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Fooo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const ButtonLabel = () => (
  <ComponentBox data-visual-test="array-selection-button-options-vertical">
    <Field.ArraySelection
      variant="button"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Fooo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const ButtonOptionSelected = () => (
  <ComponentBox>
    <Field.ArraySelection
      variant="button"
      value={['bar']}
      onChange={(values) => console.log('onChange', values)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const ButtonHorizontalLayout = () => (
  <ComponentBox data-visual-test="array-selection-button-horizontal-layout">
    <Field.ArraySelection
      variant="button"
      label="Label text"
      value={['bar']}
      layout="horizontal"
      onChange={(values) => console.log('onChange', values)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const ButtonHorizontalOptionsLayout = () => (
  <ComponentBox data-visual-test="array-selection-button-horizontal">
    <Field.ArraySelection
      variant="button"
      label="Label text"
      value={['bar']}
      optionsLayout="horizontal"
      onChange={(values) => console.log('onChange', values)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const ButtonHorizontalLayoutAndHorizontalOptionsLayout = () => (
  <ComponentBox data-visual-test="array-selection-button-options-horizontal">
    <Field.ArraySelection
      variant="button"
      label="Label text"
      value={['bar']}
      layout="horizontal"
      optionsLayout="horizontal"
      onChange={(values) => console.log('onChange', values)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const ButtonDisabled = () => (
  <ComponentBox>
    <Field.ArraySelection
      variant="button"
      value={['bar']}
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      disabled
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const ButtonInfo = () => (
  <ComponentBox>
    <Field.ArraySelection
      variant="button"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      info="FYI"
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const ButtonWarning = () => (
  <ComponentBox>
    <Field.ArraySelection
      variant="button"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      warning="I'm warning you..."
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const ButtonError = () => (
  <ComponentBox>
    <Field.ArraySelection
      variant="button"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      error={new Error('This is what is wrong...')}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const ButtonWithHelp = () => (
  <ComponentBox data-visual-test="array-selection-button-help">
    <Field.ArraySelection
      variant="button"
      label="Label text"
      help={{ title: 'Help title', content: 'Help content' }}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const ButtonNestingWithLogic = () => (
  <ComponentBox data-visual-test="array-selection-button-nesting-logic">
    <Form.Handler>
      <Card stack>
        <Field.ArraySelection
          variant="button"
          label="Make a selection"
          path="/mySelection"
        >
          <Field.Option value="nothing" title="Nothing" />

          <Field.Option value="showInput" title="Show an input" />
          <Form.Visibility
            animate
            visibleWhen={{
              path: '/mySelection',
              withValue: (value) => {
                return Array.isArray(value)
                  ? value.includes('showInput')
                  : false
              },
            }}
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
              withValue: (value) => {
                return Array.isArray(value)
                  ? value.includes('showAdditionalOption')
                  : false
              },
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
                withValue: (value) => {
                  return Array.isArray(value)
                    ? value.includes('showMeMore')
                    : false
                },
              }}
            >
              <Section variant="info" innerSpace>
                <Field.String placeholder="Enter more info" />
              </Section>
            </Form.Visibility>
          </Form.Visibility>
        </Field.ArraySelection>
      </Card>
    </Form.Handler>
  </ComponentBox>
)
