---
title: 'useFieldProps'
description: 'The `useFieldProps` hook standardize handling of the value flow for a single consumer component representing one data point.'
version: 11.5.0
generatedAt: 2026-06-03T07:21:25.015Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# useFieldProps

## Import

```tsx
import { useFieldProps } from '@dnb/eufemia/extensions/forms'
// Use useFieldProps
```

## Description

The `useFieldProps` hook standardizes handling of the value flow for a single consumer component representing one data point. It holds error state, hides it while the field is in focus, connects to surrounding `DataContext` (if present), and handles other things that all field or value components need to do. By implementing custom field or value components and passing the received properties through `useFieldProps`, all these features work the same way as other field or value components, and you only need to implement the specific unique features of that component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/hooks/useFieldProps.tsx)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/create-component/useFieldProps)

## How to use

```tsx
import { useFieldProps } from '@dnb/eufemia/extensions/forms'

const MyFieldComponent = (props) => {
  const { value, ...rest } = useFieldProps(props)
  return <Input value={value} {...rest} />
}

render(<MyFieldComponent path="/dataSelector" />)
```

Advanced usage:

```tsx
import { Form, useFieldProps } from '@dnb/eufemia/extensions/forms'

const MyFieldComponent = (props) => {
  const translations = Form.useTranslation().MyField

  const errorMessages = React.useMemo(() => {
    return {
      // My default error messages
      'Field.errorRequired': translations.myErrorMessage,
      'MyCustom.message': translations.myCustomErrorMessage,
      ...props.errorMessages,
    }
  }, [props.errorMessages])

  const preparedProps = {
    errorMessages,
    // Your component props
    ...props,
  }

  const {
    // Return Parameters:
    value,
    handleChange,
    handleFocus,
    handleBlur,
    htmlAttributes,

    // Component Properties
    ...rest
  } = useFieldProps(preparedProps)

  return (
    <Input
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...htmlAttributes}
      {...rest}
    />
  )
}
```

### Internal Properties

All properties are optional and can be used as needed. These properties can be provided as part of your component properties.

- `value` the input value (string).
- `emptyValue` defines what value is considered to be empty. Defaults to `undefined`. But an empty string is also validated when required is true.
- `path` the JSON pointer that defines the entry name/key in the data structure.
- `itemPath` similar to `path`, but is used when run inside the [Iterate](/uilib/extensions/forms/Iterate/) context.

#### Validation

- `required`—if true, it will call `validateRequired` for validation.
- `schema` or `pattern`—for JSON schema validation powered by [ajv](https://ajv.js.org/).
- `onChangeValidator`—your custom validation function. It will run on every keystroke. Can be an async function. Use it together with [debounceAsync](/uilib/helpers/functions/#debounce).
- `onBlurValidator`—your custom validation function. It will run on a `handleBlur()` call. Use it over `onChangeValidator` for validations with side-effects. Can be an async function.
- `validateRequired`—allows you to provide custom logic for how the `required` property should validate. See example below.
- `validateInitially`—in order to show an error without a change and blur event. Used for rare cases.
- `validateUnchanged`—in order to validate without a change and blur event. Used for rare cases.
- `validateContinuously`—in order to validate without a focus event beforehand. Used for rare cases.

#### Validators

- `exportValidators` object with your validators you want to export. More info down below.

Many Field components also export a `<FieldName>Validator` type describing exactly what keys are available on `validators`. Import the type from the corresponding Field (for example `DateValidator` from `@dnb/eufemia/extensions/forms/Field/Date`) and cast the `validators` argument to it before destructuring so TypeScript can narrow the object.

For more advanced use cases, you can export your custom Field validators with `exportValidators`. They are then available (as `validators` in object of the second validator parameter) to be used in the validator.

When an array is returned from the validator, it will be used to only call these validators (in the order they are returned).
If no array is returned, the internal validator will be called in addition.

```tsx
const MyField = (props) => {
  const myInternalValidator = useCallback(() => {
    if (value === 'fail now') {
      return new Error('Internal validation error')
    }
  }, [])
  return (
    <Field.String exportValidators={{ myInternalValidator }} {...props} />
  )
}

const myValidator = (value, { validators: { myInternalValidator } }) => {
  if (value === 'fail') {
    return new Error('My error')
  }

  return [myInternalValidator] // optional
}

render(<MyField onBlurValidator={myValidator} />)
```

#### Error

- `error`—like `new Error()` or `new FormError()` that includes a message to display. More info below.
- `errorMessages`—object with your custom messages or translation keys, such as `'Field.errorRequired'`. More info below.

### Return Parameters

It returns all of the given component properties, in addition to these:

- `value` the output value.
- `id` creates a memorized id.
- `dataContext` the internal shared data context.
- `error` the error object, in case an error is invoked. Will skip returning the error object, if the hook is used in a nested [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/).
- `hasError` will return true in case of an error, even if the hook is nested in a `FieldBlock`.
- `htmlAttributes` object that include needed HTML (e.g. aria-_ or data-_) attributes, ready to be spread on form elements. It includes in addition internal aria attributes such as `aria-invalid`, `aria-required` and `aria-describedby`.
- `isChanged` returns `true` if the value has changed with e.g. `handleChange`.
- `setHasFocus` accepts a boolean as value. When called, it will update the internal logic - for event handling and validation. Will re-render the React Hook and its outer component.
- `onFocus` event handler to assign to a form element.
- `onBlur` event handler to assign to a form element.
- `onChange` event handler to assign to a form element. When an `async` function is used, it will set the `fieldState` to pending. The corresponding [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) will show an indicator on the field label.

### Custom validateRequired

```ts
import { useFieldProps, FormError } from '@dnb/eufemia/extensions/forms'

const validateRequired = (
  value: unknown,
  {
    emptyValue,
    required,
    isChanged,
  }: { emptyValue: unknown; required: boolean; isChanged: boolean }
) => {
  if (required && value === emptyValue) {
    return new FormError('Field.errorRequired')
  }
}

function MyComponent() {
  const { error, hasError } = useFieldProps({
    value: undefined,
    required: true,
    validateInitially: true,
    validateRequired,
    errorMessages: {
      'Field.errorRequired': 'Show this when "required" fails.',
    },
  })
}
```

#### Validation order

During validation, the different APIs do have a prioritization order and will stop processing further when they match:

1. `required` property
1. `schema` property (including `pattern`)
1. `onChangeValidator` property
1. `onBlurValidator` property

### Error handling

Validation and error-handling are tightly coupled together. When a validation fails, you may use the error-object to handle and show the failures/statuses:

```tsx
render(
  <Field.String
    label="Label"
    error={new Error('This is what is wrong...')}
  />
)
```

But when you handle errors via `useFieldProps`, you may rather provide an object with messages, which will be used to display the error:

```ts
const { error, hasError } = useFieldProps({
  required: true,
  errorMessages: {
    'Field.errorRequired': 'Show this when "required" fails!',
  },
  ...componentProps,
})
```

To re-use existing `errorMessages`, you can use the `FormError` constructor as well:

```ts
import { FormError } from '@dnb/eufemia/extensions/forms'

// Will show the message from the errorMessages
new FormError('Field.errorRequired')
```

In order to invoke an error without a change and blur event, you can use `validateInitially`:

```ts
const { error, hasError } = useFieldProps({
  value: undefined,
  required: true,
  validateInitially: true,
  errorMessages: {
    'Field.errorRequired': 'Show this when "required" fails!',
  },
})
```

### Event handlers

- `handleFocus()` to call the `onFocus` event.

- `handleBlur()` to call the `onBlur` event.

- `handleChange(value)` to call the `onChange` event. Will update/change the internal value and re-render the React Hook, so will the outer component too.

```ts
handleChange(value, (additionalArgs = null))
```

When `additionalArgs` is provided, it will be passed to the `onChange`, `onFocus` or `onBlur` events as the second argument. It will be merged with the internal `additionalArgs`, which includes `props` (including all of the given properties), `getValueByPath` and `getSourceValue`.

- `updateValue(value)` to update/change the internal value, without calling any events.

- `forceUpdate()` to re-render the React Hook along with the outer component.

### Value transformers

The transformers are hooks to transform the value on different stages.

They should return a transformed value: `(value) => value`

- `toInput` transforms the value before it is returned. This applies whether the original source of the value is the value property or the data context.

- `fromInput` transforms the value given by `handleChange` before it is used in the further process flow. Use it to destruct the value from the original event object.

- `toEvent` transforms the internal value before it gets returned by even callbacks such as `onChange`, `onFocus` and `onBlur`. The second parameter returns the event type: `onChange`, `onFocus`, `onBlur` or `onBlurValidator`.

- `fromExternal` transforms the provided `value` property before any other operations are performed.

- `transformValue` transforms the value given by `handleChange` after `fromInput` and before `updateValue` and `toEvent`. The second parameter returns the current value.

- `provideAdditionalArgs` provide a function that can be called by the field to provide additional parameters, so events (`onFocus`, `onBlur` and `onChange`) and transformers (`transformOut`) get an additional parameter when transforming the value.

In addition there are **field value transformers** which should be used outside of the field component (by the field consumer):

- `transformIn` transforms the `value` before it's displayed in the field (e.g. input).

- `transformOut` transforms the value before it gets forwarded to the form data object or returned as the onChange value parameter.


## Demos

On the consumer side, we can use this custom component like so:

```jsx
<Form.Handler data={{ sliderValue: 50 }}>
  <MySliderComponent
    path="/sliderValue"
    minimum={50}
    maximum={80}
    required
    info="Info"
  />
</Form.Handler>
```

### Using a Zod schema

It is recommended to use Zod schemas instead of JSON Schemas, as they provide better TypeScript integration.


```tsx
const MySliderComponent = props => {
  const fromInput = useCallback(event => typeof event === 'number' ? event : event?.value || 0, []);
  const errorMessages = useMemo(() => {
    return {
      'Field.errorRequired': 'This field is required',
      ...props.errorMessages
    };
  }, [props.errorMessages]);

  // Preferred: Use Zod schemas when possible
  // They work out of the box and provide better TypeScript integration
  const schema = props.schema ?? z.number().min(props.minimum || 0).max(props.maximum || 100);
  const preparedProps = {
    fromInput,
    schema,
    ...errorMessages,
    label: 'Label',
    ...props
  };
  const {
    id,
    label,
    info,
    warning,
    error,
    value,
    width = 'medium',
    minimum = 0,
    maximum = 100,
    step = 1,
    handleChange,
    handleFocus,
    handleBlur
  } = useFieldProps(preparedProps);
  const steps = {
    minimum,
    maximum,
    step
  };
  return <FieldBlock forId={id} label={label} info={info} warning={warning} error={error} width={width}>
              <Flex.Stack>
                <Field.Number id={id} value={value} showStepControls onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} {...steps} />
                <Slider value={value} onChange={handleChange} onDragStart={handleFocus} onDragEnd={handleBlur} {...steps} />
              </Flex.Stack>
            </FieldBlock>;
};

// Example with Zod schema (preferred)
// Note: You can pass a Zod schema via props.schema and it will work without AJV
// The component now uses a Zod schema by default: z.number().min(50).max(80)
render(<Form.Handler data={{
  sliderValue: 50
}}>
            <MySliderComponent path="/sliderValue" minimum={50} maximum={80} required info="Info"
  // You can override with a custom Zod schema if needed
  // Example: schema={z.number().min(40).max(90).refine(val => val > 60, 'Value must be greater than 60')}
  />
          </Form.Handler>);
```


### Using an Ajv schema


```tsx
const MySliderComponent = props => {
  const fromInput = useCallback(event => typeof event === 'number' ? event : event?.value || 0, []);
  const errorMessages = useMemo(() => {
    return {
      'Field.errorRequired': 'This field is required',
      ...props.errorMessages
    };
  }, [props.errorMessages]);

  // No schema - uses built-in validation from field props
  const schema = props.schema ?? {
    type: 'number',
    minimum: props.minimum,
    maximum: props.maximum
  };
  const preparedProps = {
    fromInput,
    schema,
    ...errorMessages,
    label: 'Label',
    ...props
  };
  const {
    id,
    label,
    info,
    warning,
    error,
    value,
    width = 'medium',
    minimum = 0,
    maximum = 100,
    step = 1,
    handleChange,
    handleFocus,
    handleBlur
  } = useFieldProps(preparedProps);
  const steps = {
    minimum,
    maximum,
    step
  };
  return <FieldBlock forId={id} label={label} info={info} warning={warning} error={error} width={width}>
              <Flex.Stack>
                <Field.Number id={id} value={value} showStepControls onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} {...steps} />
                <Slider value={value} onChange={handleChange} onDragStart={handleFocus} onDragEnd={handleBlur} {...steps} />
              </Flex.Stack>
            </FieldBlock>;
};
render(<Form.Handler data={{
  sliderValue: 50
}}>
            <MySliderComponent path="/sliderValue" minimum={50} maximum={80} required info="Info" />
          </Form.Handler>);
```


## Parameters

Properties passed to the `useFieldProps` hook.


```json
{
  "props": {
    "value": {
      "doc": "Source data value for the field. Takes precedence over the path value from DataContext.",
      "type": "{valueType}",
      "status": "optional"
    },
    "defaultValue": {
      "doc": "Default value for the field. Does not take precedence over values from DataContext.",
      "type": "{valueType}",
      "status": "optional"
    },
    "path": {
      "doc": "JSON Pointer for the field data location in the source dataset (when using Form.Handler or DataContext).",
      "type": "string",
      "status": "optional"
    },
    "itemPath": {
      "doc": "Path relative to the current Iterate element. Used when the field is inside an Iterate context.",
      "type": "string",
      "status": "optional"
    },
    "emptyValue": {
      "doc": "The value used when emptying the field (e.g., `undefined` instead of empty string).",
      "type": [
        "{valueType}",
        "undefined"
      ],
      "status": "optional"
    },
    "required": {
      "doc": "When `true`, validates that the field is not empty. When `false`, adds \"(optional)\" suffix to label.",
      "type": "boolean",
      "status": "optional"
    },
    "disabled": {
      "doc": "Disables the field, preventing value changes while still displaying it.",
      "type": "boolean",
      "status": "optional"
    },
    "readOnly": {
      "doc": "Makes the field read-only. Used as a fallback for `disabled` when `disabled` is not explicitly set.",
      "type": "boolean",
      "status": "optional"
    },
    "info": {
      "doc": "Info message shown below the field. Can be a function receiving the current value.",
      "type": [
        "React.ReactNode",
        "Array<React.ReactNode>",
        "function"
      ],
      "status": "optional"
    },
    "warning": {
      "doc": "Warning message shown below the field. Can be a function receiving the current value.",
      "type": [
        "React.ReactNode",
        "Array<React.ReactNode>",
        "function"
      ],
      "status": "optional"
    },
    "error": {
      "doc": "Error message or Error object to display. Can be a function receiving the current value.",
      "type": [
        "Error",
        "FormError",
        "Array<Error | FormError>",
        "function"
      ],
      "status": "optional"
    },
    "errorMessages": {
      "doc": "Custom error messages keyed by error type (e.g., `Field.errorRequired`).",
      "type": "Record<string, React.ReactNode>",
      "status": "optional"
    },
    "schema": {
      "doc": "JSON Schema or Zod schema for validating the field value.",
      "type": [
        "object",
        "ZodSchema"
      ],
      "status": "optional"
    },
    "validateInitially": {
      "doc": "Show validation errors on initial render before user interaction.",
      "type": "boolean",
      "status": "optional"
    },
    "validateUnchanged": {
      "doc": "Show validation errors when field is touched without value changes.",
      "type": "boolean",
      "status": "optional"
    },
    "validateContinuously": {
      "doc": "Show validation errors continuously while typing, not just on blur.",
      "type": "boolean",
      "status": "optional"
    },
    "onChangeValidator": {
      "doc": "Custom validation function called on every change. Can be async. Returns Error, FormError, or array of validators.",
      "type": "(value, { errorMessages, connectWithPath, validators }) => Error | undefined",
      "status": "optional"
    },
    "onBlurValidator": {
      "doc": "Custom validation function called on blur. Preferred for validations with side-effects. Can be async.",
      "type": "(value, { errorMessages, connectWithPath, validators }) => Error | undefined",
      "status": "optional"
    },
    "exportValidators": {
      "doc": "Object containing validators to export for use in other validators.",
      "type": "Record<string, function>",
      "status": "optional"
    },
    "validateRequired": {
      "doc": "Custom logic for required validation. Receives `{ value, emptyValue, required, error }`.",
      "type": "function",
      "status": "optional"
    },
    "transformIn": {
      "doc": "Transforms the external value before displaying in the field.",
      "type": "(external: Value) => Value",
      "status": "optional"
    },
    "transformOut": {
      "doc": "Transforms the internal value before storing in form data or returning via onChange.",
      "type": "(internal: Value) => Value",
      "status": "optional"
    },
    "toInput": {
      "doc": "Transforms value for input display (after transformIn).",
      "type": "(value: Value) => Value",
      "status": "optional"
    },
    "fromInput": {
      "doc": "Transforms value from input (before transformOut).",
      "type": "(value: Value) => Value",
      "status": "optional"
    },
    "toEvent": {
      "doc": "Transforms value before passing to event handlers.",
      "type": "(value: Value) => Value",
      "status": "optional"
    },
    "fromExternal": {
      "doc": "Transforms external data value when reading from DataContext.",
      "type": "(value: Value) => Value",
      "status": "optional"
    },
    "transformValue": {
      "doc": "Transforms the value during processing.",
      "type": "(value: Value) => Value",
      "status": "optional"
    },
    "provideAdditionalArgs": {
      "doc": "Provides additional arguments to pass through event handlers.",
      "type": "(value: Value, additionalArgs: ProvideAdditionalEventArgs) => ProvideAdditionalEventArgs",
      "status": "optional"
    },
    "onChange": {
      "doc": "Callback called when the field value changes.",
      "type": "(value: Value, additionalArgs?: ReceiveAdditionalEventArgs) => void",
      "status": "optional"
    },
    "onFocus": {
      "doc": "Callback called when the field receives focus.",
      "type": "(value: Value, additionalArgs?: ReceiveAdditionalEventArgs) => void",
      "status": "optional"
    },
    "onBlur": {
      "doc": "Callback called when the field loses focus.",
      "type": "(value: Value, additionalArgs?: ReceiveAdditionalEventArgs) => void",
      "status": "optional"
    },
    "onStatusChange": {
      "doc": "Callback called when the field status changes (e.g., error, pending).",
      "type": "(status: FieldStatus) => void",
      "status": "optional"
    }
  }
}
```


## Return Values

Properties and methods returned from the `useFieldProps` hook.


```json
{
  "props": {
    "value": {
      "doc": "The current transformed field value, ready for display.",
      "type": "{valueType}",
      "status": "required"
    },
    "isChanged": {
      "doc": "Whether the field value has been changed by the user.",
      "type": "boolean",
      "status": "required"
    },
    "hasError": {
      "doc": "Whether the field currently has a validation error.",
      "type": "boolean",
      "status": "optional"
    },
    "htmlAttributes": {
      "doc": "HTML attributes including aria-invalid, aria-required, aria-describedby, and data-* attributes.",
      "type": "AriaAttributes & DataAttributes",
      "status": "required"
    },
    "handleFocus": {
      "doc": "Handler to call when the field receives focus.",
      "type": "() => void",
      "status": "required"
    },
    "handleBlur": {
      "doc": "Handler to call when the field loses focus. Triggers blur validation.",
      "type": "() => void",
      "status": "required"
    },
    "handleChange": {
      "doc": "Handler to call when the field value changes. Accepts the new value and optional additional args.",
      "type": "(value: Value, additionalArgs?: object) => void",
      "status": "required"
    },
    "handleError": {
      "doc": "Handler to manually trigger error display.",
      "type": "() => void",
      "status": "required"
    },
    "updateValue": {
      "doc": "Programmatically update the field value without triggering change events.",
      "type": "(value: Value) => void",
      "status": "required"
    },
    "setHasFocus": {
      "doc": "Manually set the focus state of the field.",
      "type": "(hasFocus: boolean, overrideValue?: Value, additionalArgs?: ProvideAdditionalEventArgs) => void",
      "status": "required"
    },
    "setChanged": {
      "doc": "Manually set the changed state of the field.",
      "type": "(state: boolean) => void",
      "status": "required"
    },
    "setDisplayValue": {
      "doc": "Set a custom display value for the field (used in summary views).",
      "type": "(value: React.ReactNode, options?: { path?: string; type?: \"field\" }) => void",
      "status": "required"
    },
    "forceUpdate": {
      "doc": "Force a re-render of the field component.",
      "type": "() => void",
      "status": "required"
    },
    "dataContext": {
      "doc": "The DataContext state object, providing access to form-level data and methods.",
      "type": "ContextState",
      "status": "required"
    },
    "fieldState": {
      "doc": "Current submit state of the field (pending, error, complete, etc.).",
      "type": "SubmitState",
      "status": "required"
    },
    "additionalArgs": {
      "doc": "Additional arguments passed through event handlers.",
      "type": "ReceiveAdditionalEventArgs",
      "status": "required"
    }
  }
}
```

## Parameters

Properties passed to the `useFieldProps` hook.


```json
{
  "props": {
    "value": {
      "doc": "Source data value for the field. Takes precedence over the path value from DataContext.",
      "type": "{valueType}",
      "status": "optional"
    },
    "defaultValue": {
      "doc": "Default value for the field. Does not take precedence over values from DataContext.",
      "type": "{valueType}",
      "status": "optional"
    },
    "path": {
      "doc": "JSON Pointer for the field data location in the source dataset (when using Form.Handler or DataContext).",
      "type": "string",
      "status": "optional"
    },
    "itemPath": {
      "doc": "Path relative to the current Iterate element. Used when the field is inside an Iterate context.",
      "type": "string",
      "status": "optional"
    },
    "emptyValue": {
      "doc": "The value used when emptying the field (e.g., `undefined` instead of empty string).",
      "type": [
        "{valueType}",
        "undefined"
      ],
      "status": "optional"
    },
    "required": {
      "doc": "When `true`, validates that the field is not empty. When `false`, adds \"(optional)\" suffix to label.",
      "type": "boolean",
      "status": "optional"
    },
    "disabled": {
      "doc": "Disables the field, preventing value changes while still displaying it.",
      "type": "boolean",
      "status": "optional"
    },
    "readOnly": {
      "doc": "Makes the field read-only. Used as a fallback for `disabled` when `disabled` is not explicitly set.",
      "type": "boolean",
      "status": "optional"
    },
    "info": {
      "doc": "Info message shown below the field. Can be a function receiving the current value.",
      "type": [
        "React.ReactNode",
        "Array<React.ReactNode>",
        "function"
      ],
      "status": "optional"
    },
    "warning": {
      "doc": "Warning message shown below the field. Can be a function receiving the current value.",
      "type": [
        "React.ReactNode",
        "Array<React.ReactNode>",
        "function"
      ],
      "status": "optional"
    },
    "error": {
      "doc": "Error message or Error object to display. Can be a function receiving the current value.",
      "type": [
        "Error",
        "FormError",
        "Array<Error | FormError>",
        "function"
      ],
      "status": "optional"
    },
    "errorMessages": {
      "doc": "Custom error messages keyed by error type (e.g., `Field.errorRequired`).",
      "type": "Record<string, React.ReactNode>",
      "status": "optional"
    },
    "schema": {
      "doc": "JSON Schema or Zod schema for validating the field value.",
      "type": [
        "object",
        "ZodSchema"
      ],
      "status": "optional"
    },
    "validateInitially": {
      "doc": "Show validation errors on initial render before user interaction.",
      "type": "boolean",
      "status": "optional"
    },
    "validateUnchanged": {
      "doc": "Show validation errors when field is touched without value changes.",
      "type": "boolean",
      "status": "optional"
    },
    "validateContinuously": {
      "doc": "Show validation errors continuously while typing, not just on blur.",
      "type": "boolean",
      "status": "optional"
    },
    "onChangeValidator": {
      "doc": "Custom validation function called on every change. Can be async. Returns Error, FormError, or array of validators.",
      "type": "(value, { errorMessages, connectWithPath, validators }) => Error | undefined",
      "status": "optional"
    },
    "onBlurValidator": {
      "doc": "Custom validation function called on blur. Preferred for validations with side-effects. Can be async.",
      "type": "(value, { errorMessages, connectWithPath, validators }) => Error | undefined",
      "status": "optional"
    },
    "exportValidators": {
      "doc": "Object containing validators to export for use in other validators.",
      "type": "Record<string, function>",
      "status": "optional"
    },
    "validateRequired": {
      "doc": "Custom logic for required validation. Receives `{ value, emptyValue, required, error }`.",
      "type": "function",
      "status": "optional"
    },
    "transformIn": {
      "doc": "Transforms the external value before displaying in the field.",
      "type": "(external: Value) => Value",
      "status": "optional"
    },
    "transformOut": {
      "doc": "Transforms the internal value before storing in form data or returning via onChange.",
      "type": "(internal: Value) => Value",
      "status": "optional"
    },
    "toInput": {
      "doc": "Transforms value for input display (after transformIn).",
      "type": "(value: Value) => Value",
      "status": "optional"
    },
    "fromInput": {
      "doc": "Transforms value from input (before transformOut).",
      "type": "(value: Value) => Value",
      "status": "optional"
    },
    "toEvent": {
      "doc": "Transforms value before passing to event handlers.",
      "type": "(value: Value) => Value",
      "status": "optional"
    },
    "fromExternal": {
      "doc": "Transforms external data value when reading from DataContext.",
      "type": "(value: Value) => Value",
      "status": "optional"
    },
    "transformValue": {
      "doc": "Transforms the value during processing.",
      "type": "(value: Value) => Value",
      "status": "optional"
    },
    "provideAdditionalArgs": {
      "doc": "Provides additional arguments to pass through event handlers.",
      "type": "(value: Value, additionalArgs: ProvideAdditionalEventArgs) => ProvideAdditionalEventArgs",
      "status": "optional"
    },
    "onChange": {
      "doc": "Callback called when the field value changes.",
      "type": "(value: Value, additionalArgs?: ReceiveAdditionalEventArgs) => void",
      "status": "optional"
    },
    "onFocus": {
      "doc": "Callback called when the field receives focus.",
      "type": "(value: Value, additionalArgs?: ReceiveAdditionalEventArgs) => void",
      "status": "optional"
    },
    "onBlur": {
      "doc": "Callback called when the field loses focus.",
      "type": "(value: Value, additionalArgs?: ReceiveAdditionalEventArgs) => void",
      "status": "optional"
    },
    "onStatusChange": {
      "doc": "Callback called when the field status changes (e.g., error, pending).",
      "type": "(status: FieldStatus) => void",
      "status": "optional"
    }
  }
}
```


## Return Values

Properties and methods returned from the `useFieldProps` hook.


```json
{
  "props": {
    "value": {
      "doc": "The current transformed field value, ready for display.",
      "type": "{valueType}",
      "status": "required"
    },
    "isChanged": {
      "doc": "Whether the field value has been changed by the user.",
      "type": "boolean",
      "status": "required"
    },
    "hasError": {
      "doc": "Whether the field currently has a validation error.",
      "type": "boolean",
      "status": "optional"
    },
    "htmlAttributes": {
      "doc": "HTML attributes including aria-invalid, aria-required, aria-describedby, and data-* attributes.",
      "type": "AriaAttributes & DataAttributes",
      "status": "required"
    },
    "handleFocus": {
      "doc": "Handler to call when the field receives focus.",
      "type": "() => void",
      "status": "required"
    },
    "handleBlur": {
      "doc": "Handler to call when the field loses focus. Triggers blur validation.",
      "type": "() => void",
      "status": "required"
    },
    "handleChange": {
      "doc": "Handler to call when the field value changes. Accepts the new value and optional additional args.",
      "type": "(value: Value, additionalArgs?: object) => void",
      "status": "required"
    },
    "handleError": {
      "doc": "Handler to manually trigger error display.",
      "type": "() => void",
      "status": "required"
    },
    "updateValue": {
      "doc": "Programmatically update the field value without triggering change events.",
      "type": "(value: Value) => void",
      "status": "required"
    },
    "setHasFocus": {
      "doc": "Manually set the focus state of the field.",
      "type": "(hasFocus: boolean, overrideValue?: Value, additionalArgs?: ProvideAdditionalEventArgs) => void",
      "status": "required"
    },
    "setChanged": {
      "doc": "Manually set the changed state of the field.",
      "type": "(state: boolean) => void",
      "status": "required"
    },
    "setDisplayValue": {
      "doc": "Set a custom display value for the field (used in summary views).",
      "type": "(value: React.ReactNode, options?: { path?: string; type?: \"field\" }) => void",
      "status": "required"
    },
    "forceUpdate": {
      "doc": "Force a re-render of the field component.",
      "type": "() => void",
      "status": "required"
    },
    "dataContext": {
      "doc": "The DataContext state object, providing access to form-level data and methods.",
      "type": "ContextState",
      "status": "required"
    },
    "fieldState": {
      "doc": "Current submit state of the field (pending, error, complete, etc.).",
      "type": "SubmitState",
      "status": "required"
    },
    "additionalArgs": {
      "doc": "Additional arguments passed through event handlers.",
      "type": "ReceiveAdditionalEventArgs",
      "status": "required"
    }
  }
}
```
