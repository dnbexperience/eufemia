---
title: 'Form.Section.EditContainer'
description: '`Form.Section.EditContainer` enables users to toggle (with animation) the content of each item between the view and edit container.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:27.342Z
checksum: 3a3c3d0e49e2c12b2e78849f5784f909f49e8d2aa76cad07a5714074d3a7b48a
---

# Form.Section.EditContainer

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Section.EditContainer />)
```

## Description

`Form.Section.EditContainer` enables users to toggle (with animation) the content of each item between the [Form.Section.ViewContainer](/uilib/extensions/forms/Form/Section/ViewContainer/) and this edit container.

By default, it features a toolbar containing a "Done" button and a "Cancel" button. The "Cancel" button resets any changes made to the item content, restoring it to its original state.

```tsx
import { Form, Field, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Section>
    <Form.Section.EditContainer title="Edit account holder">
      <Field.Name.First path="/firstName" />
      <Field.Name.Last path="/lastName" />
    </Form.Section.EditContainer>

    <Form.Section.ViewContainer title="Account holder">
      <Value.SummaryList>
        <Value.Name.First path="/firstName" />
        <Value.Name.Last path="/lastName" />
      </Value.SummaryList>
    </Form.Section.ViewContainer>
  </Form.Section>
)
```

## Customize the Toolbar

```tsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Section>
    <Form.Section.EditContainer>
      <Field.Name.Last itemPath="/name" />
      <Form.Section.Toolbar>
        <Form.Section.EditContainer.DoneButton />
        <Form.Section.EditContainer.CancelButton />
      </Form.Section.Toolbar>
    </Form.Section.EditContainer>
  </Form.Section>
)
```

## Accessibility

The `EditContainer` component has an `aria-label` attribute, which is set to the `title` property value. It uses a section element to wrap the content, which helps users with screen readers to get the needed announcement.

When the edit container becomes active, it will automatically receive the active element focus. And when the edit container switches to the view container, the focus will be set to the view container.

## Demos

This demo shows the edit container opened by default by using the `containerMode="edit"` property.

```tsx
const MyEditContainer = () => {
  return (
    <Form.Section.EditContainer>
      <Field.Name.First path="/firstName" />
      <Field.Name.Last path="/lastName" />
    </Form.Section.EditContainer>
  )
}
const MyViewContainer = () => {
  return (
    <Form.Section.ViewContainer>
      <Value.SummaryList>
        <Value.Name.First path="/firstName" />
        <Value.Name.Last path="/lastName" />
      </Value.SummaryList>
    </Form.Section.ViewContainer>
  )
}
render(
  <Form.Handler
    onSubmit={async (data) => console.log('onSubmit', data)}
    defaultData={{
      nestedPath: {
        firstName: 'Nora',
      },
    }}
  >
    <Form.Card>
      <Form.SubHeading>Your account</Form.SubHeading>
      <Form.Section path="/nestedPath" required containerMode="edit">
        <MyEditContainer />
        <MyViewContainer />
      </Form.Section>
    </Form.Card>
    <Form.SubmitButton />
  </Form.Handler>
)
```

## Properties

```json
{
  "props": {
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
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "SectionEditContainer.cancelButton": {
      "nb-NO": "Avbryt",
      "en-GB": "Cancel",
      "sv-SE": "Avbryt",
      "da-DK": "Annuller"
    },
    "SectionEditContainer.confirmCancelText": {
      "nb-NO": "Er du sikker på at du vil forkaste endringene?",
      "en-GB": "Are you sure you want to discard your changes?",
      "sv-SE": "Är du säker på att du vill ångra dina ändringar?",
      "da-DK": "Er du sikker på, at du vil forkaste dine ændringer?"
    },
    "SectionEditContainer.doneButton": {
      "nb-NO": "Ferdig",
      "en-GB": "Done",
      "sv-SE": "Klar",
      "da-DK": "Færdig"
    },
    "SectionEditContainer.errorInSection": {
      "nb-NO": "Feilene ovenfor må rettes.",
      "en-GB": "Please correct the errors above.",
      "sv-SE": "Felen ovan måste åtgärdas.",
      "da-DK": "Fejlene ovenfor skal rettes."
    }
  }
}
```

## Events

```json
{
  "props": {
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
}
```
