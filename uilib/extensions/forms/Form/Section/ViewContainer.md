---
title: 'Form.Section.ViewContainer'
description: '`Form.Section.ViewContainer` enables users to toggle (with animation) the content of each item between the view and edit container.'
version: 11.0.4
generatedAt: 2026-04-29T19:30:11.482Z
checksum: 860d80482d33f1099e61af4d0bef4096954adb5a37a6228f2b462ddf83cb7822
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
  "props": {
    "title": {
      "doc": "The title of the container.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "variant": {
      "doc": "Defines the variant of the container. Can be `outline`, `filled` or `basic`. Defaults to `outline`.",
      "type": ["\"outline\"", "\"filled\"", "\"basic\""],
      "status": "optional"
    },
    "[FlexVertical](/uilib/layout/flex/container/properties)": {
      "doc": "All Flex.Vertical properties.",
      "type": "Various",
      "status": "optional"
    }
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
  "props": {
    "onEdit": {
      "doc": "Callback for the edit button.",
      "type": "function",
      "status": "optional"
    }
  }
}
```
