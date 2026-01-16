---
title: 'EditContainer'
description: '`Form.Section.EditContainer` enables users to toggle (with animation) the content of each item between the view and edit container.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Form/Section/EditContainer/metadata.json
---

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
  </Form.Section>,
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
  </Form.Section>,
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
  </Form.Handler>,
)
```
