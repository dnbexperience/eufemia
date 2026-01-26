---
title: 'Form.Section.Toolbar'
description: '`Form.Section.Toolbar` is a helper component to be used within an `Form.Section.ViewContainer` and `Form.Section.EditContainer`.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.899Z
checksum: c3f04873caf51183e6c06dbd3e430a12d720489dfc5ff74ccae0c9dc1e3934d5
---

# Form.Section.Toolbar

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Section.Toolbar />)
```

## Description

`Form.Section.Toolbar` is a helper component to be used within the [Form.Section.ViewContainer](/uilib/extensions/forms/Form/Section/ViewContainer/) and the [Form.Section.EditContainer](/uilib/extensions/forms/Form/Section/EditContainer/).

## Customize the Toolbar

You can customize the toolbar by either passing a function as a child or as a JSX element:

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Section>
    <Form.Section.ViewContainer>
      View content
      <Form.Section.Toolbar>
        <Form.Section.ViewContainer.EditButton />
      </Form.Section.Toolbar>
    </Form.Section.ViewContainer>

    <Form.Section.EditContainer>
      Edit content
      <Form.Section.Toolbar>
        <Form.Section.EditContainer.DoneButton />
        <Form.Section.EditContainer.CancelButton />
      </Form.Section.Toolbar>
    </Form.Section.EditContainer>
  </Form.Section>
)
```

## Demos

### Using ViewContainer and EditContainer

```tsx
render(
  <Form.Section>
    <Form.Section.ViewContainer>
      View content
      <Form.Section.Toolbar>
        <Button variant="tertiary">Your Tool</Button>
        <Form.Section.ViewContainer.EditButton />
      </Form.Section.Toolbar>
    </Form.Section.ViewContainer>

    <Form.Section.EditContainer>
      Edit content
      <Form.Section.Toolbar>
        <Button variant="tertiary">Your Tool</Button>
        <Form.Section.EditContainer.DoneButton />
        <Form.Section.EditContainer.CancelButton />
      </Form.Section.Toolbar>
    </Form.Section.EditContainer>
  </Form.Section>
)
```

## Properties

```json
{
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": "Various",
    "status": "optional"
  }
}
```

## Events

```json
{
  "onEdit": {
    "doc": "Callback for the edit button.",
    "type": "Function",
    "status": "optional"
  },
  "onDone": {
    "doc": "Callback for the done button.",
    "type": "Function",
    "status": "optional"
  },
  "onCancel": {
    "doc": "Callback for the cancel button.",
    "type": "Function",
    "status": "optional"
  }
}
```
