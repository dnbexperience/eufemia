---
title: 'PhoneNumber'
description: '`Field.PhoneNumber` is a wrapper component for the input of strings, with user experience tailored for phone number values.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/feature-fields/PhoneNumber/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.PhoneNumber />)
```

## Description

`Field.PhoneNumber` is a wrapper component for [string input](/uilib/extensions/forms/base-fields/String), with user experience tailored for phone number values.

There is a corresponding [Value.PhoneNumber](/uilib/extensions/forms/Value/PhoneNumber) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/PhoneNumber)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/PhoneNumber)

## Value

This component behaves as "one single component". It combines the country code and the number into a single string during an event callback.

The `value` property should be a string with the country code separated by a space from the main number.

The component returns the `emptyValue` when no number is set, which defaults to `undefined`.

It uses the HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute (`tel-country-code` and `tel-national`) in their respective fields (country code and phone number) to provide automated assistance in filling out form field values, as well as guidance to the browser as to the type of information expected in the field.

### Default country code

The default country code is set to `+47`.

## Structure and format of phone numbers

Creating a list of all possible phone numbers would be impractical due to the vast number of combinations, especially considering the various country codes, area codes, and local numbers. Additionally, new numbers are constantly being allocated, and existing numbers may be reassigned over time.

Therefore, the structure and format are only used when `+47` is selected.

## Support for locales like `sv-SE` and `da-DK`

In addition to the default support for `nb-NO` and `en-GB`, you can also use `sv-SE` and `da-DK` locales to display country names in Swedish or Danish.

Learn more about [importing additional locales](/uilib/usage/customisation/localization/#eufemia-forms).

## Filter or prioritize country listing

You can filter countries with the `countries` property's values `Scandinavia`, `Nordic` or `Europe`.

Countries are sorted in alphabetical order, with the following prioritized countries on top of the list:

- Norway
- Sweden
- Denmark
- Finland

## Validation

By default, it has no validation. However, you can enable it by providing a `required`, `pattern`, `schema`, `onChangeValidator`, or `onBlurValidator` property with the needed validation. More about validation in the [Getting Started](/uilib/extensions/forms/getting-started/#validation-and-error-handling) section.

### Norwegian mobile numbers

E.g. the following pattern will strictly match Norwegian mobile numbers, which are defined as having a "+47" country code, followed by a number starting with 4 or 9, and exactly 7 more digits. If the country code is set to any other two-digit code, the pattern will match any 6 digits after the country code.

```jsx
<Field.PhoneNumber pattern="((?=\+47)^\+47 [49]\d{7}$)|((?!\+47)^\+\d{2} \d{6})" />
```

## Demos

### Empty

```tsx
render(
  <Field.PhoneNumber
    onFocus={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onFocus', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
    onBlur={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onBlur', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
    onChange={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onChange', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
    onCountryCodeChange={(countryCode) =>
      console.log('onCountryCodeChange', countryCode)
    }
    onNumberChange={(phoneNumber) =>
      console.log('onNumberChange', phoneNumber)
    }
  />,
)
```

### Placeholder

```tsx
render(
  <Field.PhoneNumber
    placeholder="Call this number"
    onChange={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onChange', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
  />,
)
```

### Label

```tsx
render(
  <Field.PhoneNumber
    numberLabel="Label text"
    onChange={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onChange', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
  />,
)
```

### Label and value

```tsx
render(
  <Field.PhoneNumber
    numberLabel="Label text"
    value="+47 98765432"
    onChange={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onChange', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
  />,
)
```

### Show only Scandinavian countries

```tsx
render(
  <Field.PhoneNumber
    numberLabel="Label text"
    onChange={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onChange', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
    countries="Scandinavia"
  />,
)
```

### With help

```tsx
render(
  <Field.PhoneNumber
    onChange={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onChange', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
    help={{
      title: 'Help is available',
      content:
        'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
    }}
  />,
)
```

### Used in Card

```tsx
render(
  <Form.Card>
    <Field.PhoneNumber />
  </Form.Card>,
)
```

### Disabled

```tsx
render(
  <Field.PhoneNumber
    value="+47 12345678"
    numberLabel="Label text"
    onChange={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onChange', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
    disabled
  />,
)
```

### Error

```tsx
render(
  <Field.PhoneNumber
    value="007"
    numberLabel="Label text"
    onChange={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onChange', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
    error={new Error('This is what is wrong...')}
  />,
)
```

### Validation - Required

```tsx
render(
  <Field.PhoneNumber
    value="+47 888"
    numberLabel="Label text"
    onChange={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onChange', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
    required
  />,
)
```

### Validation - Pattern

```tsx
render(
  <Field.PhoneNumber
    value="+41 123"
    numberLabel="Label text"
    onChange={(value, { countryCode, phoneNumber, iso }) =>
      console.log('onChange', value, {
        countryCode,
        phoneNumber,
        iso,
      })
    }
    pattern="^\\+41 [1]\\d{2}$"
  />,
)
```

### Filter countries

This example demonstrates how to filter specific countries. Use the `countries` property to define a set of countries and/or the `filterCountries` property to apply custom filtering logic.

```tsx
render(
  <Field.PhoneNumber
    countries="Scandinavia"
    filterCountries={({ iso }) => iso !== 'DK'}
  />,
)
```

### With FieldBlock label

This example demonstrates how to use the `label` and `labelDescription` props on the [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) wrapper.

```tsx
render(
  <Field.PhoneNumber
    label="Additional Label that will stretch all the way down here"
    labelDescription="And a label description that will stretch all the way down here"
  />,
)
```

### Transform in and out

This example demonstrates how to transform data when it enters and leaves the form field.

You can use the `transformIn` property to modify the incoming data before it is displayed in the field, and the `transformOut` property to adjust the data before it is submitted or processed.
When `transformIn` one can either return a simple value `"+47 98765432"` or an object `{ countryCode:"+47", phoneNumber:"98765432" }`.

```tsx
const transformOut = (internalArgs, additionalArgs) => {
  return {
    countryCode: additionalArgs?.iso,
    phoneNumber: additionalArgs?.phoneNumber,
    countryCodePrefix: additionalArgs?.countryCode,
  }
}
const transformIn = (externalArgs) => {
  return {
    countryCode: externalArgs?.countryCodePrefix,
    phoneNumber: externalArgs?.phoneNumber,
  }
}
render(
  <Form.Handler
    defaultData={{
      myField: {
        countryCode: 'GB',
        phoneNumber: '9123457',
        countryCodePrefix: '+44',
      },
    }}
  >
    <Form.Card>
      <Field.PhoneNumber
        path="/myField"
        transformOut={transformOut}
        transformIn={transformIn}
        numberLabel="Transform in and out"
      />
      <Tools.Log />
    </Form.Card>
  </Form.Handler>,
)
```

Here is how you can deal with TypeScript types for the transform functions:

```ts
import { AdditionalArgs } from '@dnb/eufemia/src/extensions/forms/Field/PhoneNumber'

type MyFieldShape = {
  countryCode: string
  phoneNumber: string
  countryCodePrefix: string
}

const transformOut = (internal, additionalArgs = {}) => {
  const {
    countryCode: countryCodePrefix,
    phoneNumber,
    iso: countryCode,
  } = additionalArgs as AdditionalArgs

  return {
    countryCode,
    phoneNumber,
    countryCodePrefix,
  } satisfies MyFieldShape
}

const transformIn = (
  {
    countryCode: iso,
    phoneNumber,
    countryCodePrefix: countryCode,
  }: MyFieldShape = {} as MyFieldShape | undefined,
) => {
  return {
    countryCode,
    phoneNumber,
    iso,
  } satisfies AdditionalArgs
}
```

```tsx
render(
  <Field.PhoneNumber
    numberLabel="Telefon/mobilnummer with long label"
    required={false}
  />,
)
```

```tsx
render(
  <Form.Card>
    <Field.String width="stretch" />
    <Field.PhoneNumber numberLabel="default" />
    <Field.PhoneNumber width="large" numberLabel="large" />
    <Field.PhoneNumber width="stretch" numberLabel="stretch" />
    <Field.PhoneNumber omitCountryCodeField numberLabel="default" />
    <Field.PhoneNumber
      omitCountryCodeField
      width="large"
      numberLabel="large"
    />
    <Field.PhoneNumber
      omitCountryCodeField
      width="stretch"
      numberLabel="stretch"
    />
  </Form.Card>,
)
```
