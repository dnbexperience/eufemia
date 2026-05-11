---
version: 11.2.2
generatedAt: 2026-05-11T08:17:55.648Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

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
