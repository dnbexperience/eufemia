---
title: 'Form.Section.ViewContainer'
description: '`Form.Section.ViewContainer` enables users to toggle (with animation) the content of each item between the view and edit container.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.905Z
checksum: f2112bfc04972b684d467ba2e5f91f06f6da274cf03b87794c1cf74003da252a
---

# Form.Section.ViewContainer

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Section.ViewContainer />)
```

## Description

`Form.Section.ViewContainer` enables users to toggle (with animation) the content of each item between this view and the [Form.Section.EditContainer](/uilib/extensions/forms/Form/Section/EditContainer/) container.

By default, it features the toolbar containing a "Edit" button.

```tsx
import { Form, Field, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Section>
    <Form.Section.EditContainer title="Edit account holder">
      <Field.Name.Last path="/name" />
    </Form.Section.EditContainer>

    <Form.Section.ViewContainer title="Account holder">
      <Value.Name.Last path="/name" />
    </Form.Section.ViewContainer>
  </Form.Section>
)
```

## Customize the Toolbar

```tsx
import { Form, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Section>
    <Form.Section.ViewContainer>
      <Value.Name.Last itemPath="/name" />

      <Form.Section.Toolbar>
        <Form.Section.ViewContainer.EditButton />
      </Form.Section.Toolbar>
    </Form.Section.ViewContainer>
  </Form.Section>
)
```

## Accessibility

The `ViewContainer` component has an `aria-label` attribute, which is set to the `title` property value. It uses a section element to wrap the content, which helps users with screen readers to get the needed announcement.

When the item (view and edit) container gets removed, the active element focus will be set on the previous item.

## Demos

<Examples.ViewAndEditContainer />

## Properties

```json
{
  "title": {
    "doc": "The title of the container.",
    "type": "React.Node",
    "status": "optional"
  },
  "variant": {
    "doc": "Defines the variant of the container. Can be `outline`, `filled` or `basic`. Defaults to `outline`.",
    "type": "string",
    "status": "optional"
  },
  "[FlexVertical](/uilib/layout/flex/container/properties)": {
    "doc": "All Flex.Vertical properties.",
    "type": "Various",
    "status": "optional"
  }
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "SectionViewContainer.editButton": {
      "nb-NO": "Endre",
      "en-GB": "Edit",
      "sv-SE": "Ändra",
      "da-DK": "Rediger"
    }
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
  }
}
```
