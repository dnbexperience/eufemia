---
title: 'Iterate.Toolbar'
description: '`Iterate.Toolbar` is a helper component to be used within an `Iterate.AnimatedContainer` to add a toolbar to each item in the array.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.027Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Iterate.Toolbar

## Import

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'
render(<Iterate.Toolbar />)
```

## Description

Use `Iterate.Toolbar` to enhance each item in the array with additional functionality. It's particularly useful within components like [Iterate.AnimatedContainer](/uilib/extensions/forms/Iterate/AnimatedContainer) to incorporate a toolbar with extra tools.

The Toolbar is integrated into the [Iterate.ViewContainer](/uilib/extensions/forms/Iterate/ViewContainer/) and the [Iterate.EditContainer](/uilib/extensions/forms/Iterate/EditContainer/).

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.AnimatedContainer>
      Item Content
      <Iterate.Toolbar>
        <Iterate.RemoveButton />
      </Iterate.Toolbar>
    </Iterate.AnimatedContainer>
  </Iterate.Array>
)
```

## Customize the Toolbar

You can customize the toolbar by either passing a function as a child or as a JSX element:

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.ViewContainer>
      Item view content
      <Iterate.Toolbar>
        <Iterate.ViewContainer.EditButton />
        <Iterate.ViewContainer.RemoveButton />
      </Iterate.Toolbar>
    </Iterate.ViewContainer>

    <Iterate.EditContainer>
      Item edit content
      <Iterate.Toolbar>
        <Iterate.EditContainer.DoneButton />
        <Iterate.EditContainer.CancelButton />
      </Iterate.Toolbar>
    </Iterate.EditContainer>
  </Iterate.Array>
)
```

You can also provide a function as a child. The function will receive the following parameters as an object:

- `index` the index of the current item in the array.
- `value` the value of the current item.
- `items` the array of items.

```tsx
import { Iterate } from '@dnb/eufemia/extensions/forms'

render(
  <Iterate.Array>
    <Iterate.ViewContainer>
      Item Content
      <Iterate.Toolbar>
        {({ items, index, value }) => {
          return items.length === 1 ? null : (
            <>
              <Iterate.ViewContainer.EditButton />
              <Iterate.ViewContainer.RemoveButton />
            </>
          )
        }}
      </Iterate.Toolbar>
    </Iterate.ViewContainer>
  </Iterate.Array>
)
```

## Demos

### Using AnimatedContainer

```tsx
render(
  <Iterate.Array value={['foo']}>
    <Iterate.AnimatedContainer>
      Item content
      <Iterate.Toolbar>
        <Button variant="tertiary">Your Tool</Button>
        <Iterate.RemoveButton />
      </Iterate.Toolbar>
    </Iterate.AnimatedContainer>
  </Iterate.Array>
)
```

### Using ViewContainer and EditContainer

```tsx
render(
  <Iterate.Array value={['foo']}>
    <Iterate.ViewContainer>
      Item view content
      <Iterate.Toolbar>
        <Button variant="tertiary">Your Tool</Button>
        <Iterate.ViewContainer.EditButton />
        <Iterate.ViewContainer.RemoveButton />
      </Iterate.Toolbar>
    </Iterate.ViewContainer>

    <Iterate.EditContainer>
      Item edit content
      <Iterate.Toolbar>
        <Button variant="tertiary">Your Tool</Button>
        <Iterate.EditContainer.DoneButton />
        <Iterate.EditContainer.CancelButton />
      </Iterate.Toolbar>
    </Iterate.EditContainer>
  </Iterate.Array>
)
```

## Properties

```json
{}
```
