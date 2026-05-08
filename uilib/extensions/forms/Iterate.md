---
title: 'Iterate'
description: '`Iterate` contains components and functionality for traversing values and parts of data sets such as arrays, which contain a varying number of elements where the number of components on the screen depends on how many elements the data consists of.'
version: 11.2.1
generatedAt: 2026-05-08T08:59:11.289Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Iterate

## Import

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'
```

## Description

Iterate is a set of components and functionality designed for traversing values and parts of data sets, such as arrays.

It is particularly useful when dealing with data that contains a varying number of items, as the number of components on the screen depends on the number of items in the data.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Iterate)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Iterate)

## Usage

1. Define a `value` property with an array of items you want to iterate over. This can be a list of strings, objects, or any other type of data.
2. Put [Field.\*](/uilib/extensions/forms/all-fields/) or [Values.\*](/uilib/extensions/forms/Value/) with an `itemPath` inside.

```tsx
import { Iterate, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array value={['foo', 'bar']} onChange={console.log}>
    <Field.String itemPath="/" />
  </Iterate.Array>
)
```

You can also iterate over objects and easily integrate it with the [Form.Handler](/uilib/extensions/forms/Form/Handler) data handling, as shown in the example below:

```tsx
import { Iterate, Field, Form } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler
    defaultData={{
      listOfHeroes: [
        { name: 'Iron Man' },
        { name: 'Captain America' },
        { name: 'The Hulk' },
      ],
    }}
    onChange={console.log}
  >
    <Iterate.Array path="/listOfHeroes">
      <Field.Name.Last itemPath="/name" />
    </Iterate.Array>
  </Form.Handler>
)
```


## Components


## [Iterate.Array](/uilib/extensions/forms/Iterate/Array/)

`Iterate.Array` works in many ways similar to field-components. It has a value-property that can receive an array or you can give it a path if you want it to retrieve an array from a surrounding DataContext. All children components of Iterate.Array are rendered once per item the array-value consists of.

## [Iterate.AnimatedContainer](/uilib/extensions/forms/Iterate/AnimatedContainer/)

`Iterate.AnimatedContainer` can be used to animate items when they are added or removed.

## [Iterate.PushButton](/uilib/extensions/forms/Iterate/PushButton/)

`Iterate.PushButton` builds on top of the same data flow logic as field components, but the only thing it changes in the value it receives or retrieves from source data is adding a new item to the array.

## [Iterate.PushContainer](/uilib/extensions/forms/Iterate/PushContainer/)

`Iterate.PushContainer` enables users to create a new item in the array.

## [Iterate.RemoveButton](/uilib/extensions/forms/Iterate/RemoveButton/)

`Iterate.RemoveButton` connects to the array of a surrounding Iterate.Array and removes the item when clicked.

## [Iterate.ViewContainer](/uilib/extensions/forms/Iterate/ViewContainer/)

`Iterate.ViewContainer` enables users to toggle (with animation) the content of each item between the view and edit container.

## [Iterate.EditContainer](/uilib/extensions/forms/Iterate/EditContainer/)

`Iterate.EditContainer` enables users to toggle (with animation) the content of each item between the view and edit container.

## [Iterate.Count](/uilib/extensions/forms/Iterate/Count/)

`Iterate.Count` is a helper component / function that returns the count of a data array or object.

## [Iterate.ItemNo](/uilib/extensions/forms/Iterate/ItemNo/)

`Iterate.ItemNo` is a helper component that can be used to render the current item number (index) in a given string.

## [Iterate.Toolbar](/uilib/extensions/forms/Iterate/Toolbar/)

`Iterate.Toolbar` is a helper component to be used within an `Iterate.AnimatedContainer` to add a toolbar to each item in the array.

## [Iterate.Visibility](/uilib/extensions/forms/Iterate/Visibility/)

The `Iterate.Visibility` component allows you to conditionally display content based on relative paths (`itemPath`) within an `Iterate.Array` component.
