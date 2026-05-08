---
title: 'Base fields'
version: 11.2.1
generatedAt: 2026-05-08T08:59:11.524Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Base fields

Base fields are data driven fields you choose depending on the type of input. You can use these directly in your application forms.

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.String label="Name" />)
```

Here is also a list of [all available fields](/uilib/extensions/forms/all-fields/).


## [Field.ArraySelection](/uilib/extensions/forms/base-fields/ArraySelection/)

`Field.ArraySelection` is a component for selecting between a fixed set of options using checkboxes or similar, that will produce a value in the form of an array containing the values of selected options.

## [Field.Boolean](/uilib/extensions/forms/base-fields/Boolean/)

`Field.Boolean` is the base component for receiving user input where the target data is of type `boolean`.

## [Field.Composition](/uilib/extensions/forms/base-fields/Composition/)

`Field.Composition` is a component for when you create a field block that contains of several existing fields.

## [Field.Indeterminate](/uilib/extensions/forms/base-fields/Indeterminate/)

`Field.Indeterminate` component is used to display and handle the indeterminate state of a checkbox.

## [Field.Number](/uilib/extensions/forms/base-fields/Number/)

`Field.Number` is the base component for receiving user input where the target data is of type `number`.

## [Field.Option](/uilib/extensions/forms/base-fields/Option/)

`Field.Option` is a pseudo-component for defining an option to be used in a dropdown or similar user experiences.

## [Field.Selection](/uilib/extensions/forms/base-fields/Selection/)

`Field.Selection` is a wrapper component for selecting between options using a dropdown or similar user experiences.

## [Field.String](/uilib/extensions/forms/base-fields/String/)

`Field.String` is the base component for receiving user input where the target data is of type `string`.

## [Field.Toggle](/uilib/extensions/forms/base-fields/Toggle/)

`Field.Toggle` is a base component for allowing the user to toggle between two different values in the target data point.
