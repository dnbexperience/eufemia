---
title: 'Form'
description: '`Form` provides the main forms-helpers including data provider and event handling.'
version: 11.2.1
generatedAt: 2026-05-08T08:59:11.224Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Form

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
```

## Description

`Form` provides the main forms-helpers including data provider and event handling.

```tsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

const existingData = {
  email: 'name@email.no',
}

function MyForm() {
  return (
    <Form.Handler
      defaultData={existingData}
      onSubmit={async (data) => {
        await makeRequest(data)
      }}
    >
      <Form.MainHeading>Heading</Form.MainHeading>
      <Form.Card>
        <Field.Email path="/email" />
      </Form.Card>

      <Form.ButtonRow>
        <Form.SubmitButton />
      </Form.ButtonRow>
    </Form.Handler>
  )
}
```

`defaultData` is only used if no other data source is provided and will not update internal data if it changes after mount. Initializing fields with an empty value is optional; if you do, prefer the field's `emptyValue` (often `undefined`).

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Form)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Form)


## Demos

### With a help button


```tsx
render(<Form.Handler defaultData={{
  myField: 12345
}}>
        <Form.Card>
          <Field.Number path="/myField" label="Label text" help={{
      title: 'Help title',
      content: 'Help content.'
    }} />
          <Value.Number path="/myField" inheritLabel help={{
      title: 'Help title',
      content: 'Help content.'
    }} />
        </Form.Card>
      </Form.Handler>)
```


### In combination with a SubmitButton


```tsx
render(<Form.Handler onSubmit={async data => console.log('onSubmit', data)}>
        <Form.Card>
          <Field.Email path="/email" />
          <Form.ButtonRow>
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Form.Card>
      </Form.Handler>)
```


### New location after async submit


```tsx
render(<Form.Handler data={{
  myField: 'Some value'
}} onSubmit={async data => {
  console.log('onSubmit', data);

  // Wait for 2 seconds
  await new Promise(resolve => setTimeout(resolve, 2000));

  // e.g. go to new location

  // Optionally, you can return e.g. the "pending" status with an additional info
  return {
    info: 'Redirecting to a new location',
    // Force the form to stay in pending state
    status: 'pending'
  };
}} asyncSubmitTimeout={10000}>
        <Flex.Stack>
          <Form.MainHeading>Heading</Form.MainHeading>
          <Form.Card>
            <Value.String label="Summary" path="/myField" />
          </Form.Card>
          <Form.ButtonRow>
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Flex.Stack>
      </Form.Handler>)
```


### Filter your data


```tsx
const id = 'my-form';
const filterDataHandler = ({
  props
}) => !props.disabled;
const MyForm = () => {
  const {
    data
  } = Form.useData(id, {
    disabled: false,
    myField: 'Value'
  });
  return <Form.Handler id={id} onSubmit={(data, {
    filterData
  }) => {
    console.log('onSubmit', filterData(filterDataHandler));
  }}>
              <Flex.Stack>
                <Field.Boolean label="Disabled" path="/disabled" />
                <Field.String label="My Field" path="/myField" disabled={data.disabled} />
                <Form.ButtonRow>
                  <Form.SubmitButton />
                </Form.ButtonRow>
              </Flex.Stack>
            </Form.Handler>;
};
const Output = () => {
  const {
    filterData
  } = Form.useData(id);
  const {
    hasErrors
  } = Form.useValidation(id);
  return <>
              <Tools.Log top data={hasErrors()} label="hasErrors:" />
              <Tools.Log top data={filterData(filterDataHandler)} />
            </>;
};
render(<>
            <MyForm />
            <Output />
          </>);
```


## Components


## [Form.Card](/uilib/extensions/forms/Form/Card/)

`Form.Card` is a wrapper for the Card component to make it easier to use inside a form.

## [Form.Section](/uilib/extensions/forms/Form/Section/)

`Form.Section` lets you compose blocks of fields and values to be reused in different contexts.

## [Form.Section.ViewContainer](/uilib/extensions/forms/Form/Section/ViewContainer/)

`Form.Section.ViewContainer` enables users to toggle (with animation) the content of each item between the view and edit container.

## [Form.Section.EditContainer](/uilib/extensions/forms/Form/Section/EditContainer/)

`Form.Section.EditContainer` enables users to toggle (with animation) the content of each item between the view and edit container.

## [Form.Appearance](/uilib/extensions/forms/Form/Appearance/)

`Form.Appearance` is a provider for theming form fields.

## [Form.ButtonRow](/uilib/extensions/forms/Form/ButtonRow/)

`Form.ButtonRow` is a wrapper for horizontally separated buttons.

## [Form.clearData](/uilib/extensions/forms/Form/clearData/)

`Form.clearData` lets you clear the data of a form.

## [Form.getData](/uilib/extensions/forms/Form/getData/)

`Form.getData` lets you access your form data outside of the form context.

## [Form.Handler](/uilib/extensions/forms/Form/Handler/)

The `Form.Handler` is the root component of your form. It provides an HTML form element and handles the form data.

## [Form.InfoOverlay](/uilib/extensions/forms/Form/InfoOverlay/)

`Form.InfoOverlay` is used to display an informational message that fully covers the available space.

## [Form.Isolation](/uilib/extensions/forms/Form/Isolation/)

`Form.Isolation` lets you isolate parts of your form so data and validations are not shared between the `Form.Handler` until you want to.

## [Form.MainHeading](/uilib/extensions/forms/Form/MainHeading/)

`Form.MainHeading` is a standardized main heading for sections, ensuring default layout, spacing etc.

## [Form.Section.Toolbar](/uilib/extensions/forms/Form/Section/Toolbar/)

`Form.Section.Toolbar` is a helper component to be used within an `Form.Section.ViewContainer` and `Form.Section.EditContainer`.

## [Form.setData](/uilib/extensions/forms/Form/setData/)

`Form.setData` lets you set or modify your form data outside of the form context.

## [Form.SubHeading](/uilib/extensions/forms/Form/SubHeading/)

`Form.SubHeading` is a standardized sub heading for sections, ensuring default layout, spacing etc.

## [Form.SubmitButton](/uilib/extensions/forms/Form/SubmitButton/)

`Form.SubmitButton` connects to the `Form.Handler` to submit the active state of the internal DataContext, triggering `onSubmit`.

## [Form.SubmitConfirmation](/uilib/extensions/forms/Form/SubmitConfirmation/)

`Form.SubmitConfirmation` can be used to prevent the `Form.Handler` from submitting, and makes it possible to show a confirmation dialog in different scenarios.

## [Form.SubmitIndicator](/uilib/extensions/forms/Form/SubmitIndicator/)

`Form.SubmitIndicator` lets you show an indicator while async form operations are performed.

## [Form.useData](/uilib/extensions/forms/Form/useData/)

`Form.useData` lets you access or modify your form data outside of the form context within your application.

## [Form.useSnapshot](/uilib/extensions/forms/Form/useSnapshot/)

`Form.useSnapshot` lets you store data snapshots of your form data, either inside or outside of the form context.

## [Form.useSubmit](/uilib/extensions/forms/Form/useSubmit/)

`Form.useSubmit` lets you trigger form submit from outside the form element, e.g. when the submit button is in a modal footer or toolbar.

## [Form.useTranslation](/uilib/extensions/forms/Form/useTranslation/)

`Form.useTranslation` is a hook that returns the translations for the current locale.

## [Form.useValidation](/uilib/extensions/forms/Form/useValidation/)

`Form.useValidation` lets you monitor and modify field status or your form errors outside of the context.

## [Form.Visibility](/uilib/extensions/forms/Form/Visibility/)

`Form.Visibility` makes it possible to hide components and elements on the screen based on the dynamic state of data.
