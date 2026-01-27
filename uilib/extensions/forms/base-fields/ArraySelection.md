---
title: 'Field.ArraySelection'
description: '`Field.ArraySelection` is a component for selecting between a fixed set of options using checkboxes or similar, that will produce a value in the form of an array containing the values of selected options.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.258Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.ArraySelection

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.ArraySelection />)
```

## Description

`Field.ArraySelection` is a component for selecting between a fixed set of options using checkboxes or similar, that will produce a value in the form of an array containing the values of selected options.

Before using this component, ensure there is not a more specific [field component](/uilib/extensions/forms/feature-fields/) available that better suits your needs.

Uses the [Field.Option](/uilib/extensions/forms/base-fields/Option/) pseudo-component to define options.

There is a corresponding [Value.ArraySelection](/uilib/extensions/forms/Value/ArraySelection) component.

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'

render(
  <Field.ArraySelection>
    <Field.Option />
    <Field.Option />
  </Field.ArraySelection>
)
```

You can also use the `dataPath` property to provide the data to the component:

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler
    data={{
      myDataPath: [
        { title: 'Foo!', value: 'foo' },
        { title: 'Bar!', value: 'bar' },
      ],
    }}
  >
    <Field.ArraySelection dataPath="/myDataPath" />
  </Form.Handler>
)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/ArraySelection)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/ArraySelection)

## Demos

### Checkbox variant (default)

```tsx
render(
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
)
```

### Button variant

```tsx
render(
  <Field.ArraySelection
    variant="button"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Fooo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>
)
```

### Button with checkbox variant

```tsx
render(
  <Field.ArraySelection
    variant="checkbox-button"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Fooo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>
)
```

---

### Checkbox variant demos

#### Checkbox label

```tsx
render(
  <Field.ArraySelection
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Fooo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>
)
```

#### Checkbox option selected

```tsx
render(
  <Field.ArraySelection
    value={['bar']}
    onChange={(values) => console.log('onChange', values)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
    <Field.Option value="baz" title="Bazz!" />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>
)
```

#### Checkbox horizontal layout

```tsx
render(
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
)
```

#### Checkbox horizontal options-layout

```tsx
render(
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
)
```

#### Checkbox horizontal layout and horizontal options-layout

```tsx
render(
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
)
```

#### Checkbox with help

```tsx
render(
  <Field.ArraySelection
    label="Label text"
    help={{
      title: 'Help title',
      content: 'Help content',
    }}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.ArraySelection>
)
```

#### Checkbox disabled

```tsx
render(
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
)
```

#### Checkbox disabled options

```tsx
render(
  <Field.ArraySelection
    value={['foo']}
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" disabled />
    <Field.Option value="baz" title="Bazz!" disabled />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>
)
```

#### Checkbox info

```tsx
render(
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
)
```

#### Checkbox warning

```tsx
render(
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
)
```

#### Checkbox error

```tsx
render(
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
)
```

#### Checkbox with nested fields and logic

You can nest other fields and show them based on your desired logic.

```tsx
render(
  <Form.Handler onSubmit={console.log}>
    <Flex.Stack>
      <Form.Card>
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
      </Form.Card>

      <Form.SubmitButton />
    </Flex.Stack>
  </Form.Handler>
)
```

#### Checkbox with a path to populate the data

```tsx
render(
  <Form.Handler
    data={{
      myDataPath: [
        {
          title: 'Foo!',
          value: 'foo',
        },
        {
          title: 'Bar!',
          value: 'bar',
        },
        {
          title: 'Baz!',
          value: 'baz',
        },
      ],
    }}
  >
    <Field.ArraySelection
      label="Populated by dataPath"
      dataPath="/myDataPath"
    />
  </Form.Handler>
)
```

#### Checkbox with the data property

```tsx
render(
  <Field.ArraySelection
    label="Populated by data"
    data={[
      {
        title: 'Foo!',
        value: 'foo',
      },
      {
        title: 'Bar!',
        value: 'bar',
      },
      {
        title: 'Baz!',
        value: 'baz',
      },
    ]}
  />
)
```

---

### Button variant demos

#### Button Label

```tsx
render(
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
)
```

#### Button option selected

```tsx
render(
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
)
```

#### Button horizontal layout

```tsx
render(
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
)
```

#### Button horizontal options-layout

```tsx
render(
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
)
```

#### Button horizontal layout and horizontal options-layout

```tsx
render(
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
)
```

#### Button with help

```tsx
render(
  <Field.ArraySelection
    variant="button"
    label="Label text"
    help={{
      title: 'Help title',
      content: 'Help content',
    }}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.ArraySelection>
)
```

#### Button disabled

```tsx
render(
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
)
```

#### Button disabled options

```tsx
render(
  <Field.ArraySelection
    variant="button"
    value={['foo']}
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" disabled />
    <Field.Option value="baz" title="Bazz!" disabled />
    <Field.Option value="qux" title="Quxx!" />
  </Field.ArraySelection>
)
```

#### Button info

```tsx
render(
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
)
```

#### Button warning

```tsx
render(
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
)
```

#### Button error

```tsx
render(
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
)
```

#### Button with a path to populate the data

```tsx
render(
  <Form.Handler
    data={{
      myDataPath: [
        {
          title: 'Foo!',
          value: 'foo',
        },
        {
          title: 'Bar!',
          value: 'bar',
        },
        {
          title: 'Baz!',
          value: 'baz',
        },
      ],
    }}
  >
    <Field.ArraySelection
      variant="button"
      label="Populated by dataPath"
      dataPath="/myDataPath"
    />
  </Form.Handler>
)
```

#### Button with the data property

```tsx
render(
  <Field.ArraySelection
    variant="button"
    label="Populated by data"
    data={[
      {
        title: 'Foo!',
        value: 'foo',
      },
      {
        title: 'Bar!',
        value: 'bar',
      },
      {
        title: 'Baz!',
        value: 'baz',
      },
    ]}
  />
)
```

#### Button with nested fields and logic

You can nest other fields and show them based on your desired logic.

```tsx
render(
  <Form.Handler>
    <Form.Card>
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
    </Form.Card>
  </Form.Handler>
)
```

#### Button with checkbox variant

```tsx
render(
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
)
```

## Properties

### Field-specific properties

```json
{
  "props": {
    "variant": {
      "doc": "Choice of UI feature.",
      "type": ["'checkbox'", "'button'", "'checkbox-button'"],
      "defaultValue": "'checkbox'",
      "status": "optional"
    },
    "optionsLayout": {
      "doc": "Layout for the list of options.",
      "type": ["'horizontal'", "'vertical'"],
      "defaultValue": "'vertical'",
      "status": "optional"
    },
    "children": {
      "doc": "For providing `<Field.Option>` components.",
      "type": "React.Node",
      "status": "optional"
    },
    "size": {
      "doc": "The sizes you can choose is small (1.5rem), default (2rem), medium (2.5rem) and large (3rem) are supported component sizes. Defaults to default / null. Also, if you define a number like size=\"2\" then it will be forwarded as the input element attribute. Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).",
      "type": "string",
      "status": "optional"
    },
    "data": {
      "doc": "Data to be used for the component. The object needs to have a `value` and a `title` property. Provide the Dropdown or Autocomplete data in the format documented here: [Dropdown](/uilib/components/dropdown) and [Autocomplete](/uilib/components/autocomplete) documentation.",
      "type": "array",
      "status": "optional"
    },
    "dataPath": {
      "doc": "The path to the context data (Form.Handler). The context data object needs to have a `value` and a `title` property. The generated options will be placed above given JSX based children.",
      "type": "string",
      "status": "optional"
    }
  },
  "showDefaultValue": true
}
```

### General properties

```json
{
  "props": {
    "value": {
      "doc": "Source data value for the field. Will take precedence over the path value given in the data context.",
      "type": "Array<string | number>",
      "status": "optional"
    },
    "defaultValue": {
      "doc": "Default source data value for the field. Will not take precedence over the path value given in the data context.",
      "type": "Array<string | number>",
      "status": "optional"
    },
    "path": {
      "doc": "JSON Pointer for where the data for the field is located in the source dataset (when using Form.Handler or DataContext). The `path` will also be set as the `name` attribute for the [string](/uilib/extensions/forms/base-fields/String/)-field.",
      "type": "string",
      "status": "optional"
    },
    "info": {
      "doc": "Info message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",
      "type": ["React.Node", "Array<React.Node>", "function"],
      "status": "optional"
    },
    "warning": {
      "doc": "Warning message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",
      "type": ["React.Node", "Array<React.Node>", "function"],
      "status": "optional"
    },
    "error": {
      "doc": "Error message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",
      "type": [
        "Error",
        "FormError",
        "Array<Error | FormError>",
        "function"
      ],
      "status": "optional"
    },
    "disabled": {
      "doc": "Set `true` to show the field but without the possibility of changing the value.",
      "type": "boolean",
      "status": "optional"
    },
    "emptyValue": {
      "doc": "The value to use (in `onChange` events etc) when emptying the field. Makes it possible for instance to provide `undefined` instead of an empty string when clearing the content of a text input.",
      "type": ["Array<string | number>", "undefined"],
      "status": "optional"
    },
    "required": {
      "doc": "When set to `true`, the field will give an error if the value fails the required validation. When set to `false`, the field will not be required, but will add a \"(optional)\" suffix to the label.",
      "type": "boolean",
      "status": "optional"
    },
    "labelSuffix": {
      "doc": "Will append an additional text to the label, like \"(optional)\". When using `inheritLabel`, the suffix will not be inherited. NB: The visual appearance of the `labelSuffix` may change in the future.",
      "type": "React.Node",
      "status": "optional"
    },
    "schema": {
      "doc": "Custom JSON Schema for validating the value.",
      "type": "object",
      "status": "optional"
    },
    "validateInitially": {
      "doc": "Set to `true` to show validation based errors initially (from given value-prop or source data) before the user interacts with the field.",
      "type": "boolean",
      "status": "optional"
    },
    "validateUnchanged": {
      "doc": "Set to `true` to show validation based errors when the field is touched (like focusing a field and blurring) without having changed the value. Since the user did not introduce a new error, this will apply when the value was initially invalid based on validation.",
      "type": "boolean",
      "status": "optional"
    },
    "validateContinuously": {
      "doc": "Set to `true` to show validation based errors continuously while writing, not just when blurring the field.",
      "type": "boolean",
      "status": "optional"
    },
    "errorMessages": {
      "doc": "Custom error messages for each type of error, overriding default messages. The messages can be a React.ReactNode or a string.",
      "type": "object",
      "status": "optional"
    },
    "onChangeValidator": {
      "doc": "Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered on every change done by the user. The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",
      "type": "function",
      "status": "optional"
    },
    "onBlurValidator": {
      "doc": "Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",
      "type": "function",
      "status": "optional"
    },
    "transformIn": {
      "doc": "Transforms the `value` before its displayed in the field (e.g. input).",
      "type": "function",
      "status": "optional"
    },
    "transformOut": {
      "doc": "Transforms the value before it gets forwarded to the form data object (context) or returned as the `onChange` value parameter. The first parameter is the internal value. Some fields do support a second parameter, like the SelectCountry, where the country object is given.",
      "type": "function",
      "status": "optional"
    },
    "label": {
      "doc": "Label text displayed above the field. Most fields already have a default label, so check the field translations for an existing label entry. Only set `label` when you need to override the default.",
      "type": "string",
      "status": "optional"
    },
    "labelDescription": {
      "doc": "A more discreet text displayed beside the label (i.e for \"(optional)\").",
      "type": "string",
      "status": "optional"
    },
    "labelDescriptionInline": {
      "doc": "If true, the `labelDescription` will be displayed on the same line as the label.",
      "type": "boolean",
      "status": "optional"
    },
    "labelSrOnly": {
      "doc": "Use `true` to make the label only readable by screen readers.",
      "type": "boolean",
      "status": "optional"
    },
    "labelSize": {
      "doc": "Define the font-size of the label based on the [font-size](/uilib/typography/font-size/) table.",
      "type": ["medium", "large"],
      "status": "optional"
    },
    "help": {
      "doc": "Provide help content for the field using `title` and `content` as a string or React.Node. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, set `outset` to `false` to display the help text inline (inset) instead of the default outset behavior, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",
      "type": "object",
      "status": "optional"
    },
    "hideHelpButton": {
      "doc": "Set `true` when you render the inline help button outside the label (e.g. inside a checkbox suffix) so FieldBlock skips drawing the default label help button.",
      "type": "boolean",
      "status": "optional"
    },
    "layout": {
      "doc": "Layout for the label and input. Can be `horizontal` or `vertical`.",
      "type": "string",
      "status": "optional"
    },
    "layoutOptions": {
      "doc": "Use this to set additional options for the `horizontal` layout. E.g. `{ width: \"medium\" }`. You can also use a custom width `{number}rem`. Instead of a width, you can use a min/max width. E.g. `{ minWidth: \"6rem\", maxWidth: \"12rem\" }`.",
      "type": "object",
      "status": "optional"
    },
    "width": {
      "doc": "Will set the width for the whole block. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",
      "type": ["string", "false"],
      "status": "optional"
    },
    "contentWidth": {
      "doc": "Will set the width for its contents. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",
      "type": ["string", "false"],
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  },
  "valueType": "Array<string | number>"
}
```

## Events

```json
{
  "props": {
    "onChange": {
      "doc": "Will be called on value changes made by the user, with the new value as argument. When an `async` function is used, the corresponding [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) will show an indicator on the field label. You can return `{ success: 'saved' } as const` to show a success symbol, or an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const`. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).",
      "type": "(value) => void",
      "status": "optional"
    },
    "onFocus": {
      "doc": "Will be called when the component gets into focus. Like clicking inside a text input or opening a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).",
      "type": "(value) => void",
      "status": "optional"
    },
    "onBlur": {
      "doc": "Will be called when the component stop being in focus. Like when going to next field, or closing a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).",
      "type": "(value) => void",
      "status": "optional"
    },
    "onStatusChange": {
      "doc": "Called whenever the status messages (info, warning or error) gets visible or changes. Receives the current `{ info, warning, error }` object.",
      "type": "({ info?, warning?, error? }: FieldStatus) => void",
      "status": "optional"
    }
  }
}
```
