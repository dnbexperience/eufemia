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
  <ComponentBox
    hideCode
    data-visual-test="array-selection-checkbox-nesting-logic"
  >
    <Form.Handler onSubmit={console.log}>
      <Card stack>
        <Field.ArraySelection
          label="Make a selection"
          path="/mySelection"
          required
        >
          <Field.Option value="nothing" title="Nothing" />

          <Field.Option value="showInput" title="Show an input" />
          <Form.Visibility
            visibleWhen={{
              path: '/mySelection',
              hasValue: (value) => {
                return Array.isArray(value)
                  ? value.includes('showInput')
                  : false
              },
            }}
            animate
            compensateForGap="auto" // makes animation smooth
          >
            <Section variant="info" innerSpace>
              <Field.String placeholder="Enter some value" required />
            </Section>
          </Form.Visibility>

          <Field.Option
            value="showAdditionalOption"
            title="Show additional option"
          />
          <Form.Visibility
            visibleWhen={{
              path: '/mySelection',
              hasValue: (value) => {
                return Array.isArray(value)
                  ? value.includes('showAdditionalOption')
                  : false
              },
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
                hasValue: (value) => {
                  return Array.isArray(value)
                    ? value.includes('showMeMore')
                    : false
                },
              }}
            >
              <Section variant="info" innerSpace>
                <Field.String placeholder="Enter more info" required />
              </Section>
            </Form.Visibility>
          </Form.Visibility>
        </Field.ArraySelection>
      </Card>

      <Form.SubmitButton />
    </Form.Handler>
  </ComponentBox>
)

export const CheckboxWithDataPath = () => {
  return (
    <ComponentBox>
      <Form.Handler
        data={{
          myDataPath: [
            { title: 'Foo!', value: 'foo' },
            { title: 'Bar!', value: 'bar' },
            { title: 'Baz!', value: 'baz' },
          ],
        }}
      >
        <Field.ArraySelection
          label="Populated by dataPath"
          dataPath="/myDataPath"
        />
      </Form.Handler>
    </ComponentBox>
  )
}

export const CheckboxWithData = () => {
  return (
    <ComponentBox>
      <Field.ArraySelection
        label="Populated by data"
        data={[
          { title: 'Foo!', value: 'foo' },
          { title: 'Bar!', value: 'bar' },
          { title: 'Baz!', value: 'baz' },
        ]}
      />
    </ComponentBox>
  )
}

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

export const CheckboxButtonEmpty = () => (
  <ComponentBox data-visual-test="array-selection-checkbox-button">
    <Field.ArraySelection
      variant="checkbox-button"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Fooo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
    </Field.ArraySelection>
  </ComponentBox>
)

export const CheckboxButtonHorizontalOptionsLayout = () => (
  <ComponentBox data-visual-test="array-selection-checkbox-button-options-horizontal">
    <Field.ArraySelection
      label="Label text"
      value={['bar']}
      variant="checkbox-button"
      optionsLayout="horizontal"
      onChange={(values) => console.log('onChange', values)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
      <Field.Option value="baz" title="Bazz!" />
      <Field.Option value="qux" title="Quxx!" />
      <Field.Option value="quux" title="Quuux!" />
      <Field.Option value="quuz" title="Quuuuz!" />
      <Field.Option value="corge" title="Corge!" />
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
            visibleWhen={{
              path: '/mySelection',
              hasValue: (value) => {
                return Array.isArray(value)
                  ? value.includes('showInput')
                  : false
              },
            }}
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
              hasValue: (value) => {
                return Array.isArray(value)
                  ? value.includes('showAdditionalOption')
                  : false
              },
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
                hasValue: (value) => {
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

export const ButtonWithDataPath = () => {
  return (
    <ComponentBox>
      <Form.Handler
        data={{
          myDataPath: [
            { title: 'Foo!', value: 'foo' },
            { title: 'Bar!', value: 'bar' },
            { title: 'Baz!', value: 'baz' },
          ],
        }}
      >
        <Field.ArraySelection
          variant="button"
          label="Populated by dataPath"
          dataPath="/myDataPath"
        />
      </Form.Handler>
    </ComponentBox>
  )
}

export const ButtonWithData = () => {
  return (
    <ComponentBox>
      <Field.ArraySelection
        variant="button"
        label="Populated by data"
        data={[
          { title: 'Foo!', value: 'foo' },
          { title: 'Bar!', value: 'bar' },
          { title: 'Baz!', value: 'baz' },
        ]}
      />
    </ComponentBox>
  )
}
