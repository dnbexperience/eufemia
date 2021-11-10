---
showTabs: true
---

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

## Description

The FormRow component is a helper to archive more easily often used DNB form layout setups.

### Fieldset and Legend

By default a `FormRow` is using the `<fieldset>` and `<legend>` HTML elements - if a label property is provided.

## Layout direction

The default direction is `horizontal`.
You can combine several FormRow's (example below) and the direction to achieve the wanted UX layout. You can also send the layout properties along from a [FormSet](/uilib/components/form-set) (example below).
There are three possible layout properties for the FormRow children:

- `label_direction` Children's label direction
- `direction` Children components direction
- `vertical` Forces both to be vertically

### The property: **`label_direction`**

<ComponentBox>
{`
<FormRow label_direction="vertical">
  <Input label="Label:" right />
  <Input label="Label:" />
</FormRow>
`}
</ComponentBox>

### The property: **`direction`**

<ComponentBox>
{`
<FormRow direction="vertical">
  <Input label="Label:" bottom />
  <Input label="Label:" />
</FormRow>
`}
</ComponentBox>

### The property: **`vertical`**

<ComponentBox>
{`
<FormRow vertical>
  <Input label="Label:" bottom />
  <Input label="Label:" />
</FormRow>
`}
</ComponentBox>

### Default

This is how it looks if you don't make any definitions.

<ComponentBox>
{`
<FormRow>
  <Input label="Label:" right />
  <Input label="Label:" />
</FormRow>
`}
</ComponentBox>

## Spacing

To give a FormRow space, properties from [Space](/uilib/components/space/properties) are supported:

```jsx
/** The FormRow will then have a "margin-top: 2.5rem;" */
<FormRow top="large x-small" ... >
  ...
</FormRow>

/** ... or go crazy */
<FormRow top="large medium small" ... >
  ...
</FormRow>
```

## Provider

You can send down the `FormRow` as an application wide property (Context). More info about the [provider usage](/uilib/components/form-row/provider).

## Responsiveness

The FormRow component provides by default responsiveness.
But if you also want the form components to act responsive. E.g. the label of the input should be wrapped to be vertical / above the input, then you have to set the `responsive` prop to `true`.

```jsx
<FormRow responsive="true">
  <Input label="Input label">Value</Input>
</FormRow>
```

Wrapping happens then if the view port (screen) is less than `max-width: 40em`.

You can also make use of the [helper class](/uilib/helpers), e.g. `<FormRow className="dnb-responsive-component">...</FormRow>`.
