---
title: 'Field.Indeterminate'
description: '`Field.Indeterminate` component is used to display and handle the indeterminate state of a checkbox.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.262Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.Indeterminate

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Indeterminate />)
```

## Description

`Field.Indeterminate` component is used to display and handle the indeterminate state of a checkbox. It is an uncontrolled component, meaning that the state is managed automatically.

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(
  <Field.Indeterminate
    dependencePaths={['/checkbox1', '/checkbox2', '/checkbox3']}
    path="/checkboxParent"
  />
)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/Indeterminate)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/Indeterminate)

It should only be used in combination with checkbox looking variants.

Under the hood the [Field.Toggle](/uilib/extensions/forms/base-fields/Toggle/) base field is used. That means you can use all the properties from the `Toggle` component.

## Details about the state handling

The indeterminate state of a parent checkbox should be shown when some children checkboxes are checked, but not all. In detail:

- When all children are checked, the parent should get checked.
  - When the parent gets checked (clicked), all children should get checked.
- When all children are unchecked, the parent should get unchecked.
  - When the parent gets unchecked (clicked), all children should get unchecked.
- When some children are checked, the parent should be set in an indeterminate state.
  - When the parent gets clicked, all children should get checked. This behavior can be changed to the opposite or `auto` by using the `propagateIndeterminateState` property. Auto means that the parent will switch from its current state to be inverted.

## Demos

### Indeterminate state (partially checked)

```tsx
render(
  <Form.Handler onChange={console.log}>
    <Form.Card>
      <Field.Indeterminate
        label="Indeterminate"
        dependencePaths={['/child1', '/child2', '/child3']}
      />

      <Field.Toggle
        label="Checkbox 1"
        path="/child1"
        valueOn="what-ever"
        valueOff="you-name-it"
        required
      />

      <Field.Boolean label="Checkbox 2" path="/child2" required />

      <Field.Toggle
        label="Checkbox 3"
        path="/child3"
        valueOn="on"
        valueOff="off"
      />
    </Form.Card>

    <Form.SubmitButton />
  </Form.Handler>
)
```

### Nested indeterminate state

```tsx
render(
  <Form.Handler onChange={console.log}>
    <Form.Card>
      <Field.Indeterminate
        label="1"
        path="/p1"
        dependencePaths={['/c2.1', '/p2.2', '/c3.1', '/c3.2']}
      />

      <Flex.Stack left="large">
        <Field.Boolean label="2.1" path="/c2.1" />
        <Field.Indeterminate
          label="2.2"
          valueOn="what-ever"
          valueOff="you-name-it"
          path="/p2.2"
          dependencePaths={['/c3.1', '/c3.2']}
        />

        <Flex.Stack left="large">
          <Field.Boolean label="3.1" path="/c3.1" />
          <Field.Toggle
            label="3.2"
            path="/c3.2"
            valueOn="what-ever"
            valueOff="you-name-it"
          />
        </Flex.Stack>
      </Flex.Stack>
    </Form.Card>
  </Form.Handler>
)
```

### Propagate to `auto`, `checked` and `unchecked`

```tsx
const MyFormContent = () => {
  const { data } = Form.useData()
  return (
    <>
      <Form.Card>
        <Field.Selection label="Propagate to" path="/propagate">
          <Field.Option value="checked">Checked</Field.Option>
          <Field.Option value="unchecked">Unchecked</Field.Option>
          <Field.Option value="auto">Auto</Field.Option>
        </Field.Selection>

        <Field.Indeterminate
          label="Indeterminate"
          dependencePaths={['/child1', '/child2', '/child3']}
          propagateIndeterminateState={data['propagate']}
        />

        <Field.Toggle
          label="Checkbox 1"
          path="/child1"
          valueOn="what-ever"
          valueOff="you-name-it"
        />

        <Field.Boolean label="Checkbox 2" path="/child2" />

        <Field.Toggle
          label="Checkbox 3"
          path="/child3"
          valueOn="on"
          valueOff="off"
        />
      </Form.Card>
    </>
  )
}
const MyForm = () => {
  return (
    <Form.Handler
      id="propagate-demo"
      defaultData={{
        propagate: 'checked',
        child1: 'you-name-it',
        child2: true,
        child3: 'on',
      }}
      onChange={console.log}
    >
      <MyFormContent />
    </Form.Handler>
  )
}
render(<MyForm />)
```

## Properties

### Field-specific properties

```json
{
  "dependencePaths": {
    "doc": "Provide an array with the related paths of other [Field.Toggle](/uilib/extensions/forms/base-fields/Toggle/) or [Field.Boolean](/uilib/extensions/forms/base-fields/Boolean/) fields.",
    "type": "array",
    "status": "required"
  },
  "propagateIndeterminateState": {
    "doc": "When `checked`, the dependent checkboxes will always be set to \"checked\" when in indeterminate state. When `unchecked`, the dependent checkboxes will be set to \"unchecked\" when in indeterminate state. When \"auto\", the dependent checkboxes will get the inverted state from where the (this) parent checkbox is in. Default is `checked`.",
    "type": ["checked", "unchecked", "auto"],
    "status": "optional"
  },
  "valueOn": {
    "doc": "Source data value when the toggle is in the \"on-state\" (varies based on UI variant).",
    "type": ["string", "number", "boolean"],
    "status": "optional"
  },
  "valueOff": {
    "doc": "Source data value when the toggle is in the \"off-state\".",
    "type": ["string", "number", "boolean"],
    "status": "optional"
  },
  "size": {
    "doc": "The sizes you can choose is small (1.5rem), default (2rem), medium (2.5rem) and large (3rem) are supported component sizes. Defaults to default / null. Also, if you define a number like size=\"2\" then it will be forwarded as the input element attribute. Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).",
    "type": "string",
    "status": "optional"
  }
}
```

### General properties

```json
{
  "value": {
    "doc": "Source data value for the field. Will take precedence over the path value given in the data context.",
    "type": "{valueType}",
    "status": "optional"
  },
  "defaultValue": {
    "doc": "Default source data value for the field. Will not take precedence over the path value given in the data context.",
    "type": "{valueType}",
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
    "type": ["Error", "FormError", "Array<Error | FormError>", "function"],
    "status": "optional"
  },
  "disabled": {
    "doc": "Set `true` to show the field but without the possibility of changing the value.",
    "type": "boolean",
    "status": "optional"
  },
  "emptyValue": {
    "doc": "The value to use (in `onChange` events etc) when emptying the field. Makes it possible for instance to provide `undefined` instead of an empty string when clearing the content of a text input.",
    "type": ["{valueType}", "undefined"],
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
    "doc": "Field label to show above / before the input feature.",
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
}
```
