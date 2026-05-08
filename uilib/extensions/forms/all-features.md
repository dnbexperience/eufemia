---
title: 'All features and APIs'
version: 11.2.1
generatedAt: 2026-05-08T08:59:11.513Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# All features and APIs

**Table of Contents**

- [Form](#form)
- [Connectors](#connectors)
- [Wizard](#wizard)
- [Iterate](#iterate)
- [Data Context](#data-context)
- [FieldBlock](#fieldblock)
- [ValueBlock](#valueblock)
- [useFieldProps](#usefieldprops)
- [useValueProps](#usevalueprops)

## Intro

Eufemia Forms is a flexible set of building blocks for form functionality. Besides field components and data display, it consists of more complex functionality for surrounding processes such as data flow, validation and building UI.

## [Form](/uilib/extensions/forms/Form)

Form provides the main forms-helpers including data provider and event handling. This makes it possible to do a combined processing of the data for a form, so you do not have to create individual distribution of data and callbacks to persist changes for each field individually.

Example using the [Form.Handler](/uilib/extensions/forms/Form/Handler) collecting data with `onSubmit`:

```jsx
import { Form, Field, Value } from '@dnb/eufemia/extensions/forms'

const existingData = {
  email: 'name@email.no'
  date: '2024-01-01'
}

// The submit handler can be async
const submitHandler = async (data) => {
  try {
    await makeRequest(data)
  } catch (error) {
    return error
  }
}

function Component() {
  return (
    <Form.Handler defaultData={existingData} onSubmit={submitHandler}>
      <Field.Email path="/email" />
      <Value.Date path="/date" />
      <Form.SubmitButton />
    </Form.Handler>
  )
}
```

Here is a list of all available `Form.*` components:


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


### Validation and error handling

You can provide [custom logic](/uilib/extensions/forms/getting-started/#validation-and-error-handling) and texts to handle and display error messages. More details about error messages can be found [on a separate page](/uilib/extensions/forms/Form/error-messages).

### Schema validation

Eufemia Forms does support [Ajv schema validator](https://ajv.js.org/) on both single fields and the whole data set – if needed.

[JSON Schema](https://json-schema.org/) is a flexible standard that makes it possible to describe the data's structure and validation needs, both for the individual value, and more complex rules across the data set.

Descriptions and examples of such validation can be found [on a separate page](/uilib/extensions/forms/Form/schema-validation).

You can also [create your own Ajv instance](/uilib/extensions/forms/Form/schema-validation/#custom-ajv-instance-and-keywords) and pass it to your form.

This is useful if you want to use a custom schema keyword and `validate` function or if you want to use a different version of Ajv.

#### Generate schema from fields

You can also easily generate an Ajv schema from a set of fields (JSX), by using the `log` property on the `Tools.GenerateSchema` component. It will e.g. console log the generated schema. More info about this feature can be found [on a separate page](/uilib/extensions/forms/Form/schema-validation/#generate-schema-from-fields)

## [Connectors](/uilib/extensions/forms/Connectors/)

Connectors are an opt-in way to extend the functionality of a form. They can be used to add features like API calls for autofill, validation, and more.

## [Wizard](/uilib/extensions/forms/Wizard/)

Wizard is a wrapper component for showing forms with a StepIndicator for navigation between several pages (multi-steps). It also includes components for navigating between steps.

Example using the [Wizard.Container](/uilib/extensions/forms/Wizard/Container) for handling stepped layouts:

```jsx
import { Wizard, Form } from '@dnb/eufemia/extensions/forms'

render(
  <Wizard.Container>
    <Wizard.Step title="Name">
      <Form.MainHeading>Profile</Form.MainHeading>
    </Wizard.Step>
  </Wizard.Container>
)
```

Here is a list of all available `Wizard.*` components:


## [Wizard.Container](/uilib/extensions/forms/Wizard/Container/)

The `Wizard.Container` is a container component for multi-page forms including a step indicator.

## [Wizard.Step](/uilib/extensions/forms/Wizard/Step/)

Each step should be wrapped with a `Wizard.Step` component directly inside Wizard.Container.

## [Wizard.Buttons](/uilib/extensions/forms/Wizard/Buttons/)

`Wizard.Buttons` is a combination of PreviousButton and NextButton for navigating between steps/pages.

## [Wizard.EditButton](/uilib/extensions/forms/Wizard/EditButton/)

`Wizard.EditButton` is a button to be placed in a summary step.

## [Wizard.NextButton](/uilib/extensions/forms/Wizard/NextButton/)

`Wizard.NextButton` connects to the `Wizard.Context` to move the user to the next step when clicked.

## [Wizard.PreviousButton](/uilib/extensions/forms/Wizard/PreviousButton/)

`Wizard.PreviousButton` connects to the `Wizard.Context` to move the user to the previous step when clicked.

## [Wizard.useStep](/uilib/extensions/forms/Wizard/useStep/)

`Wizard.useStep` returns `Wizard.Context` parameters such as totalSteps, activeIndex or a setActiveIndex handler.

## [Wizard.LocationHooks](/uilib/extensions/forms/Wizard/location-hooks/)

Is a set of React Hooks that lets you easily hook up your existing router in order to store the current step in the URL query string.


## [Iterate](/uilib/extensions/forms/Iterate/)

`Iterate` contains components and functionality for traversing values and parts of data sets such as arrays, which contain a varying number of elements where the number of components on the screen depends on how many elements the data consists of.


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


## [Data Context](/uilib/extensions/forms/DataContext/)

`DataContext` builds a surrounding [React context](https://react.dev/learn/passing-data-deeply-with-context) that binds an entire source dataset together with the fields placed within. It enables fields and other components to retrieve data from the source data using `path` parameters that identify where in the source data the target value is located, and the same components will report changes to the data back so the context can update the dataset.


## [DataContext.At](/uilib/extensions/forms/DataContext/At/)

`DataContext.At` makes it possible to dig into a data set to set a pointer as the root for sub components, as well as iterate array-data.

## [DataContext.Context](/uilib/extensions/forms/DataContext/Context/)

The context object used in `DataContext.Provider`.

## [DataContext.Provider](/uilib/extensions/forms/DataContext/Provider/)

`DataContext.Provider` is the context provider that has to wrap the features if components of Field and Value is to be used with a common source instead of distributing values and events individually.


## [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock)

`FieldBlock` is a reusable wrapper [for building](/uilib/extensions/forms/create-component/) interactive [Field](/uilib/extensions/forms/feature-fields) components.

## [ValueBlock](/uilib/extensions/forms/create-component/ValueBlock)

`ValueBlock` is a reusable wrapper for building [Value](/uilib/extensions/forms/Value) components.

## [useFieldProps](/uilib/extensions/forms/create-component/useFieldProps/)

The `useFieldProps` hook standardize handling of the value flow for a single consumer component for one data point.

## [useValueProps](/uilib/extensions/forms/create-component/useValueProps/)

The `useValueProps` hook standardize handling of the value flow for a single presentation component for one data point.
