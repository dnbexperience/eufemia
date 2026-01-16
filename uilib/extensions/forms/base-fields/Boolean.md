---
title: 'Boolean'
description: '`Field.Boolean` is the base component for receiving user input where the target data is of type `boolean`.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/base-fields/Boolean/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Boolean />)
```

## Description

`Field.Boolean` is the base component for receiving user input where the target data is of type `boolean`.

There is a corresponding [Value.Boolean](/uilib/extensions/forms/Value/Boolean) component.

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Boolean path="/myState" />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/Boolean)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/Boolean)

## Indeterminate checkbox

Here is an indeterminate state (partially checked) [working example](/uilib/extensions/forms/base-fields/Indeterminate/).

## Schema validation

You can use a schema to validate the value with either `const` or `enum`.

**Using Zod schemas**

```tsx
import { Form, Field, z } from '@dnb/eufemia/extensions/forms'

const schema = z.object({
  myField: z.literal(true), // or z.enum([true])
})

render(
  <Form.Handler schema={schema} data={{ myField: false }}>
    <Field.Boolean path="/myField" />
  </Form.Handler>,
)
```

**Using JSON Schema (Ajv)**

```tsx
import {
  Form,
  Field,
  makeAjvInstance,
} from '@dnb/eufemia/extensions/forms'

const ajv = makeAjvInstance()
const schema = {
  type: 'object',
  properties: {
    myField: {
      type: 'boolean',
      const: true, // or enum: [true]
    },
  },
}

render(
  <Form.Handler
    schema={schema}
    ajvInstance={ajv}
    data={{ myField: false }}
  >
    <Field.Boolean path="/myField" />
  </Form.Handler>,
)
```

## Demos

### No label or value

```tsx
render(
  <Field.Boolean onChange={(value) => console.log('onChange', value)} />,
)
```

### Checkbox

#### Value true

```tsx
render(
  <Field.Boolean
    variant="checkbox"
    label="Label text"
    value={true}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Value false

```tsx
render(
  <Field.Boolean
    variant="checkbox"
    label="Label text"
    value={false}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Checkbox - Required

```tsx
render(
  <Field.Boolean
    variant="checkbox"
    label="Set to be required initially"
    onChange={(value) => console.log('onChange', value)}
    validateInitially
    required
  />,
)
```

#### Checkbox - Disabled

```tsx
render(
  <Field.Boolean
    variant="checkbox"
    label="I am disabled"
    onChange={(value) => console.log('onChange', value)}
    disabled
  />,
)
```

### Checkbox - prevent changing the state of the checkbox

You can prevent the state of the checkbox from changing by calling `preventDefault` on the `onClick` event.

```tsx
render(
  <Field.Boolean
    variant="checkbox"
    label="I will never change the state"
    onClick={(value, { event }) => {
      event.preventDefault()
    }}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Checkbox - Error

```tsx
render(
  <Field.Boolean
    variant="checkbox"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  />,
)
```

### Checkbox - With Help

```tsx
render(
  <Field.Boolean
    variant="checkbox"
    label="Checkbox variant"
    help={{
      title: 'Help title',
      content: 'Help content',
    }}
  />,
)
```

### Button

#### Value true

```tsx
render(
  <Field.Boolean
    variant="button"
    label="Label text"
    value={true}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Button - Value false

```tsx
render(
  <Field.Boolean
    variant="button"
    label="Label text"
    value={false}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Button - Required

```tsx
render(
  <Field.Boolean
    variant="button"
    label="Set to be required initially"
    onChange={(value) => console.log('onChange', value)}
    validateInitially
    required
  />,
)
```

#### Button - Disabled

```tsx
render(
  <Field.Boolean
    variant="button"
    label="I am disabled"
    onChange={(value) => console.log('onChange', value)}
    disabled
  />,
)
```

#### Button - Error

```tsx
render(
  <Field.Boolean
    variant="button"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  />,
)
```

### Checkbox button

#### Value true

```tsx
render(
  <Field.Boolean
    variant="checkbox-button"
    label="Label text"
    value={true}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Checkbox button - Value false

```tsx
render(
  <Field.Boolean
    variant="checkbox-button"
    label="Label text"
    value={false}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Checkbox button - Required

```tsx
render(
  <Field.Boolean
    variant="checkbox-button"
    label="Set to be required initially"
    onChange={(value) => console.log('onChange', value)}
    validateInitially
    required
  />,
)
```

#### Checkbox button - Disabled

```tsx
render(
  <Field.Boolean
    variant="checkbox-button"
    label="I am disabled"
    onChange={(value) => console.log('onChange', value)}
    disabled
  />,
)
```

#### Checkbox button - Error

```tsx
render(
  <Field.Boolean
    variant="checkbox-button"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  />,
)
```

### Buttons

#### Value true

```tsx
render(
  <Field.Boolean
    variant="buttons"
    label="Label text"
    value={true}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Buttons - Value false

```tsx
render(
  <Field.Boolean
    variant="buttons"
    label="Label text"
    value={false}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Button - Value undefined (no option selected)

```tsx
render(
  <Field.Boolean
    variant="buttons"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Buttons - Required

```tsx
render(
  <Field.Boolean
    variant="buttons"
    label="Set to be required initially"
    onChange={(value) => console.log('onChange', value)}
    validateInitially
    required
  />,
)
```

#### Buttons - With Help

```tsx
render(
  <Field.Boolean
    variant="buttons"
    label="Buttons variant"
    help={{
      title: 'Help title',
      content: 'Help content',
    }}
  />,
)
```

#### Buttons - Disabled

```tsx
render(
  <Field.Boolean
    variant="buttons"
    label="I am disabled"
    onChange={(value) => console.log('onChange', value)}
    disabled
  />,
)
```

#### Buttons - Error

```tsx
render(
  <Field.Boolean
    variant="buttons"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  />,
)
```

### Radio

#### Value true

```tsx
render(
  <Field.Boolean
    variant="radio"
    label="Label text"
    value={true}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Radio - Value false

```tsx
render(
  <Field.Boolean
    variant="radio"
    label="Label text"
    value={false}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Radio - Value undefined (no option selected)

```tsx
render(
  <Field.Boolean
    variant="radio"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### Radio - Required

```tsx
render(
  <Field.Boolean
    variant="radio"
    label="Set to be required initially"
    onChange={(value) => console.log('onChange', value)}
    validateInitially
    required
  />,
)
```

#### Radio - With Help

```tsx
render(
  <Field.Boolean
    variant="radio"
    label="Radio variant"
    help={{
      title: 'Help title',
      content: 'Help content',
    }}
  />,
)
```

#### Radio - Disabled

```tsx
render(
  <Field.Boolean
    variant="radio"
    label="I am disabled"
    onChange={(value) => console.log('onChange', value)}
    disabled
  />,
)
```

#### Radio - Error

```tsx
render(
  <Field.Boolean
    variant="radio"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  />,
)
```

### Switch

#### Switch - With Help

```tsx
render(
  <Field.Boolean
    variant="switch"
    label="Switch variant"
    help={{
      title: 'Help title',
      content: 'Help content',
    }}
  />,
)
```
