---
title: 'Value'
description: '`Value` components can be used to summarize any kind of data.'
version: 11.2.0
generatedAt: 2026-05-08T07:25:37.743Z
checksum: 25ec6c5757e21d72003cae1812e65f5fb700f03a0081f2ef11d5468416cdbe17
---

# Value

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
```

## Description

On many screens, data from the dataset is summarized statically, such as on a final review screen where users can confirm their entered data before submitting it to the bank. To streamline the display of such data, Eufemia Forms has Value components. These components operate similarly to [field components](/uilib/extensions/forms/all-fields/), meaning they're data-driven, can accept value properties, and can be connected to a surrounding [Form.Handler](/uilib/extensions/forms/Form/Handler) by specifying the relevant value with a `path` property.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.String path="/myPath" />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value)

## Summary and definition lists

When you utilize multiple `Value.*` components together, consider enclosing them within the [SummaryList](/uilib/extensions/forms/Value/SummaryList/) component. This component offers a standardized approach for presenting labels and values within an accessible definition list structure.


```tsx
render(<Value.SummaryList>
        <Value.String label="Foo" value="value" />
        <Value.Number label="Bar" value={123} />
      </Value.SummaryList>)
```


## Combine values together

You can also combine `Value.*` components together by using the value [Composition](/uilib/extensions/forms/Value/Composition/) component. And it can still be used within the above mentioned [SummaryList](/uilib/extensions/forms/Value/SummaryList/) component.


```tsx
render(<Value.SummaryList>
        <Value.String label="Foo" value="value" />
        <Value.Composition label="Label">
          <Value.String value="value" />
          <Value.Number value={123} />
        </Value.Composition>
      </Value.SummaryList>)
```


## Inherit visibility from fields based on path

User-entered data is always stored internally in the data context, even when a [Field](/uilib/extensions/forms/all-fields/) is temporarily shown or hidden (mounted/unmounted).

By default, `Value.*` components will render the value regardless of the field's visibility.

To make the visibility of a `Value.*` component match the field with the same path, use `inheritVisibility={true}`:

```tsx
import { Form, Field, Value } from '@dnb/eufemia/extensions/forms'

const MyForm = () => {
  return (
    <Form.Handler>
      <Form.Visibility pathTrue="/makeVisible">
        <Field.Email path="/myPath" />
      </Form.Visibility>

      <Value.Email path="/myPath" inheritVisibility />
    </Form.Handler>
  )
}
```

It's recommended to use [Form.Visibility](/uilib/extensions/forms/Form/Visibility/) because it can animate and describes the UI in a clear, declarative way. However, `inheritVisibility` will also work with other methods, such as React's `useState` hook.

You can also propagate the `inheritVisibility` property down to all nested values with the [Value.Provider](/uilib/extensions/forms/Value/Provider/).

## Inherit labels from fields to values

You can use `inheritLabel={true}` to inherit the label from the field with the same path.

```tsx
import { Form, Field, Value } from '@dnb/eufemia/extensions/forms'

const MyForm = () => {
  return (
    <Form.Handler>
      <Field.String path="/myPath" label="My label" />
      <Value.String path="/myPath" inheritLabel />
    </Form.Handler>
  )
}
```

## Transform labels

You can use `transformLabel` to transform the label before it gets displayed.

```tsx
<Value.String
  label="The label"
  transformLabel={(label) => label.toUpperCase()}
/>
```

You can combine it with `inheritLabel` to transform the label from the field with the same path.

And by using the [Value.Provider](/uilib/extensions/forms/Value/Provider/), you can transform the labels of all nested value components.

```tsx
<Value.Provider transformLabel={(label) => label.replace(/\?$/, '')}>
  <Field.String path="/myPath" label="My label with a question mark?" />
  <Value.String path="/myPath" inheritLabel />
</Value.Provider>
```


## Components

### Base components


## [Value.Composition](/uilib/extensions/forms/Value/Composition/)

`Value.Composition` combines two or more `Value.*` components into one.

## [Value.String](/uilib/extensions/forms/Value/String/)

`Value.String` is a base component for displaying values of the type `string`.

## [Value.SummaryList](/uilib/extensions/forms/Value/SummaryList/)

`Value.SummaryList` uses definition lists to semantically make content consumable for screen readers.

## [Value.Number](/uilib/extensions/forms/Value/Number/)

`Value.Number` is a base component for displaying values of the type `number`.

## [Value.Boolean](/uilib/extensions/forms/Value/Boolean/)

`Value.Boolean` is a base component for displaying values of the type `boolean`.

## [Value.ArraySelection](/uilib/extensions/forms/Value/ArraySelection/)

`Value.ArraySelection` is a wrapper component for displaying string values, with user experience tailored for an array of selected values.

## [Value.Provider](/uilib/extensions/forms/Value/Provider/)

The `Value.Provider` lets you pass generic properties to all nested Value.* components.

## [Value.SelectCountry](/uilib/extensions/forms/Value/SelectCountry/)

`Value.SelectCountry` will render the selected country.

## [Value.SelectCurrency](/uilib/extensions/forms/Value/SelectCurrency/)

`Value.SelectCurrency` will render the selected currency.

## [Value.Selection](/uilib/extensions/forms/Value/Selection/)

`Value.Selection` is a component for displaying a string value based on a user selection.


### Feature components


## [Value.Address](/uilib/extensions/forms/Value/Address/)

`Value.Address` is a wrapper component for displaying string values, with user experience tailored for postal and street addresses.

## [Value.BankAccountNumber](/uilib/extensions/forms/Value/BankAccountNumber/)

`Value.BankAccountNumber` is a wrapper component for displaying string values, with user experience tailored for bank account number values.

## [Value.Currency](/uilib/extensions/forms/Value/Currency/)

`Value.Currency` is a wrapper component for displaying number values, with user experience tailored for currency values.

## [Value.Date](/uilib/extensions/forms/Value/Date/)

`Value.Date` is a wrapper component for displaying string values, with user experience tailored for date values.

## [Value.DateOfBirth](/uilib/extensions/forms/Value/DateOfBirth/)

`Value.DateOfBirth` is a wrapper component for displaying string values, with user experience tailored for date of birth values.

## [Value.Email](/uilib/extensions/forms/Value/Email/)

`Value.Email` is a wrapper component for displaying string values, with user experience tailored for email values.

## [Value.Name](/uilib/extensions/forms/Value/Name/)

`Value.Name` is a wrapper component for displaying string values, with user experience tailored for personal, like first and last name and company names.

## [Value.NationalIdentityNumber](/uilib/extensions/forms/Value/NationalIdentityNumber/)

`Value.NationalIdentityNumber` is a wrapper component for displaying string values, with user experience tailored for national identity number values.

## [Value.OrganizationNumber](/uilib/extensions/forms/Value/OrganizationNumber/)

`Value.OrganizationNumber` is a wrapper component for displaying string values, with user experience tailored for organization number values.

## [Value.PhoneNumber](/uilib/extensions/forms/Value/PhoneNumber/)

`Value.PhoneNumber` is a wrapper component for displaying string values, with user experience tailored for phone number values.

## [Value.PostalCodeAndCity](/uilib/extensions/forms/Value/PostalCodeAndCity/)

`Value.PostalCodeAndCity` is a wrapper component for displaying string values, with user experience tailored for Norwegian postal code and city values.

## [Value.Upload](/uilib/extensions/forms/Value/Upload/)

`Value.Upload` is a value component for displaying a list of files.
