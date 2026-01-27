---
title: 'Forms for applications'
description: 'Forms is reusable components for data input, data display and surrounding layout for simplified user interface creation in React, built on top of base Eufemia components.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.315Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Forms for applications

## Table of Contents

- [Philosophy](#philosophy)
- [Features](#features)
- [Quick start](#quick-start)
- [Create your own component](#create-your-own-component)

## Philosophy

Eufemia Forms is:

- A framework for building form features
- Designed for flexibility
- Data-driven API
- Standardized data handling
- Loosely coupled components and building blocks
- Focused on superior user experience, accessibility, and usability

Eufemia Forms provides building blocks for form functionality. Components are built on an API with standardized properties that make it easier to integrate with surrounding data flow and to create custom components that work seamlessly with ready-made Eufemia Forms components.

An important aspect is that the components are data-driven. They're built on the premise of source data rather than being tightly coupled to HTML elements used in their internal implementation.

> The primary objective of Eufemia Forms is to simplify the process of building forms by leveraging a declarative API. This approach not only saves time but also reduces code and complexity.

## Features

Eufemia Forms consists of reusable components for data input, data display, and surrounding layout, simplifying user interface creation in React. All components are built on base Eufemia components.

Key features:

- Ready-to-use, data-driven form components
- Tree-shakeable structure — unused code will not be included in the production bundle
- All functionality in components can be controlled and overridden via properties
- Data management using the declarative [JSON Pointer](/uilib/extensions/forms/getting-started/#what-is-a-json-pointer) directive (e.g., `path="/firstName"`)
- State can be handled outside [Form.Handler](/uilib/extensions/forms/Form/Handler) (Provider Context) with the [useData](/uilib/extensions/forms/Form/useData) hook
- Support for both Zod and Ajv JSON Schema
- Async form [submission](/uilib/extensions/forms/getting-started/#async-form-behavior) and [validation](/uilib/extensions/forms/getting-started/#async-validation) support
- Theming of field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/)
- Easy-to-integrate [browser location](/uilib/extensions/forms/Wizard/location-hooks/) support
- Static [value components](/uilib/extensions/forms/Value/) for displaying data with proper formatting
- Use [Form.Section](/uilib/extensions/forms/Form/Section/) to quickly create reusable and flexible sections and blocks
- Parts of your form can be isolated using [Form.Isolation](/uilib/extensions/forms/Form/Isolation/)
- Building blocks for [creating custom field components](/uilib/extensions/forms/create-component)

## Quick start

Here's how you import the components from within scopes, such as `Form` and `Field`:

```jsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'
```

Field components can be used directly as they are, for example `Field.Email`:

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Email />)
```

**NB:** In the above example, only the email field will be a part of your application bundle. Unused code will be tree-shaken away.

And here is how you can use the `Form` component:

```tsx
const existingData = {
  companyName: 'DNB',
}
function MyForm() {
  return (
    <Form.Handler
      defaultData={existingData}
      onSubmit={async (data) => console.log('onSubmit', data)}
      required
    >
      <Form.MainHeading>Quick start</Form.MainHeading>

      <Form.Card>
        <Field.Name.Company path="/companyName" />

        <Field.OrganizationNumber path="/companyOrganizationNumber" />

        <Field.Selection
          path="/postalAddressSelect"
          label="Ønsket sted for tilsendt post"
          variant="radio"
          required={false}
        >
          <Field.Option
            value="companyAddress"
            title="Samme som forretningsadresse"
          />
          <Field.Option value="other" title="Annet" />
        </Field.Selection>

        <Form.Visibility
          visibleWhen={{
            path: '/postalAddressSelect',
            hasValue: 'other',
          }}
          animate
        >
          <Field.String
            path="/postalAddress"
            label="Sted for tilsendt post"
          />
        </Form.Visibility>
      </Form.Card>
      <Form.SubmitButton variant="send" />
    </Form.Handler>
  )
}
render(<MyForm />)
```

More details in the [getting started](/uilib/extensions/forms/getting-started/) section.

### Best practices

Read more about [best practices on forms](/uilib/extensions/forms/best-practices-on-forms/).

## Create your own component

Eufemia Forms provides helper components and tools to declaratively create interactive form components that integrate seamlessly with existing data and custom form components. This ensures a consistent look and feel, even when combining ready-made components with custom local components.

Read more about [creating your own component](/uilib/extensions/forms/create-component).

## Requirements

Some internal logic requires support for importing JSON files. Meta-frameworks often support this by default.
