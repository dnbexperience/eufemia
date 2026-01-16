---
title: 'SelectCountry'
description: '`Field.SelectCountry` is a wrapper component for the selection component, with options built in for selecting a country.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/feature-fields/SelectCountry/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.SelectCountry />)
```

## Description

`Field.SelectCountry` is a wrapper component for [Field.Selection](/uilib/extensions/forms/base-fields/Selection), with options built in for selecting a country.
[The list of available countries to select](/uilib/extensions/forms/feature-fields/SelectCountry/properties/#list-of-available-countries) is carefully curated to meet the demands we know today.
When selecting a country, the value returned is the selected country's [ISO 3166-1 alpha-2 code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) (country code) like `NO` for Norway.

It supports the HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute, and by default set it to `country-name`.

There is a corresponding [Value.SelectCountry](/uilib/extensions/forms/Value/SelectCountry) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/SelectCountry)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/SelectCountry)

## Support for locales like `sv-SE` and `da-DK`

In addition to the default support for `nb-NO` and `en-GB`, you can also use the `sv-SE` and `da-DK` locales to display country names in Swedish or Danish.

Learn more about [importing additional locales](/uilib/usage/customisation/localization/#eufemia-forms).

### Filter or prioritize country listing

You can filter countries with the `countries` property's values `Scandinavia`, `Nordic` or `Europe`.

Countries are sorted in alphabetically order, with the following prioritized countries on top of the list:

- Norway
- Sweden
- Denmark
- Finland

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.PhoneNumber countries="Prioritized" />)
```

### TransformIn and TransformOut

You can use the `transformIn` and `transformOut` to transform the value before it gets displayed in the field and before it gets sent to the form context. The second parameter is the country object. You may have a look at the demo below to see how it works.

```tsx
import type { CountryType } from '@dnb/eufemia/extensions/forms/Field/SelectCountry'

// From the Field (internal value) to the data context or event parameter
const transformOut = (internal: string, country: CountryType) => {
  if (internal) {
    return `${country.name} (${internal})`
  }
}

// To the Field (from e.g. defaultValue)
const transformIn = (external: unknown) => {
  return String(external).match(/\((.*)\)/)?.[1] || 'NO'
}
```

### onFocus, onBlur, onChange

These events have an additional parameter with the country object.

```tsx
const onFocus = (value, country) => {}
```

### The country object

```ts
{
  cdc: '47',
  iso: 'NO',
  name: 'Norge',
  i18n: { en: 'Norway', nb: 'Norge' },
  regions: ['Scandinavia', 'Nordic'],
  continent: 'Europe',
}
```

## Demos

### Option selected

```tsx
render(
  <Field.SelectCountry
    value="NO"
    onChange={(value, obj) => console.log('onChange', value, obj)}
  />,
)
```

### With a horizontal layout

```tsx
render(
  <Field.SelectCountry
    value="NO"
    layout="horizontal"
    layoutOptions={{
      width: '6rem',
    }}
  />,
)
```

### With help

```tsx
render(
  <Field.SelectCountry
    value="NO"
    label="Label text"
    help={{
      title: 'Help is available',
      content:
        'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
    }}
    onChange={(value, obj) => console.log('onChange', value, obj)}
  />,
)
```

### Disabled

```tsx
render(
  <Field.SelectCountry
    value="NO"
    label="Label text"
    onChange={(value, obj) => console.log('onChange', value, obj)}
    disabled
  />,
)
```

### Error

```tsx
render(
  <Field.SelectCountry
    value="NO"
    label="Label text"
    onChange={(value, obj) => console.log('onChange', value, obj)}
    error={new Error('This is what is wrong...')}
  />,
)
```

### Validation - Required

```tsx
render(
  <Field.SelectCountry
    label="Label text"
    onChange={(value, obj) => console.log('onChange', value, obj)}
    required
    validateInitially
    validateUnchanged
  />,
)
```

### TransformIn and TransformOut

```tsx
// From the Field (internal value) to the data context or event parameter
const transformOut = (value, country) => {
  if (value) {
    return country
  }
}

// To the Field (from e.g. defaultValue)
// To the Field (from e.g. defaultValue)
const transformIn = (country) => {
  return country?.iso
}
const MyForm = () => {
  return (
    <Form.Handler onSubmit={console.log}>
      <Form.Card>
        <Field.SelectCountry
          path="/country"
          transformIn={transformIn}
          transformOut={transformOut}
          defaultValue="NO"
        />

        <Value.SelectCountry
          path="/country"
          transformIn={transformIn}
          placeholder="(Select a country)"
          showEmpty
        />

        <Form.SubHeading>Data Context</Form.SubHeading>
        <Tools.Log />
      </Form.Card>
      <Form.SubmitButton />
    </Form.Handler>
  )
}
render(<MyForm />)
```

### Filter countries

This example demonstrates how to filter specific countries. Use the `countries` property to define a set of countries and/or the `filterCountries` property to apply custom filtering logic.

```tsx
render(
  <Field.SelectCountry
    countries="Scandinavia"
    filterCountries={({ iso }) => iso !== 'DK'}
  />,
)
```

```tsx
render(
  <Field.SelectCountry
    value="NO"
    htmlAttributes={{
      opened: true,
    }}
  />,
)
```
