---
title: 'Form.Appearance'
description: '`Form.Appearance` is a provider for theming form fields.'
version: 11.6.0
generatedAt: 2026-06-12T08:43:36.479Z
checksum: a92c9083ffd5526df49f918ca91053791ab1378d592b9102943adef6a5cf96e7
---

# Form.Appearance

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Appearance />)
```

## Description

`Form.Appearance` is a provider for theming form fields.

For now, it only provides theming of sizes for [base fields](/uilib/extensions/forms/base-fields/) and all [feature fields](/uilib/extensions/forms/feature-fields/) that utilize them. See example below.

You can nest `Form.Appearance` to provide different themes for different parts of the form.

## Usage

```tsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'
render(
  <Form.Appearance size="medium">
    <Field.String />
    <Form.Appearance size="large">
      <Field.String />
    </Form.Appearance>
  </Form.Appearance>
)
```


## Demos

### Medium size


```tsx
type AppearanceData = {
  size: 'default' | NonNullable<FormAppearanceProps['size']>;
};
const Appearance = () => {
  const {
    data
  } = Form.useData<AppearanceData>('appearance', {
    size: 'medium'
  });
  const size = data.size === 'default' ? undefined : data.size;
  return <Form.Appearance size={size}>
              <Form.Handler id="appearance">
                <Flex.Stack>
                  <Field.Selection label="Choose size" path="/size">
                    <Field.Option value="default" title="Default" />
                    <Field.Option value="medium" title="Medium" />
                    <Field.Option value="large" title="Large" />
                  </Field.Selection>
                  <Field.String label="String" value="Foo" />
                  <Field.String label="String multiline" multiline value="Foo" rows={1} />
                  <Field.Number label="Number" value={1234} />
                  <Field.Number label="Number" currency currencyDisplay="name" value={1234} showStepControls />
                  <Field.Date />
                  <Field.Email value="mail@dnb.no" />
                  <Field.Currency label="Amount" currencyDisplay="name" value={1234} />
                  <Field.Expiry />
                  <Field.NationalIdentityNumber value="12345678012" />
                  <Field.OrganizationNumber value="123123123" />
                  <Field.PhoneNumber />
                  <Field.PostalCodeAndCity postalCode={{}} city={{
          value: 'Oslo'
        }} />
                  <Field.SelectCountry />
                  <Field.BankAccountNumber />
                  <Field.Name.First />
                  <Field.Name.Last />
                  <Field.DateOfBirth />
                  <Field.Password />
                  <Field.Slider />
                  <Field.Upload />
                  <Field.Address.Postal />
                  <Field.Address.Street />
                  <Field.Indeterminate dependencePaths={[]} />
                  <Field.Toggle valueOn="what-ever" valueOff="you-name-it" />
                  <Field.Boolean />
                  <Form.ButtonRow>
                    <Form.SubmitButton />
                  </Form.ButtonRow>
                </Flex.Stack>
              </Form.Handler>
            </Form.Appearance>;
};
render(<Appearance />);
```


### Nested sizing


```tsx
render(<Form.Appearance size="medium">
        <Form.Handler>
          <Flex.Stack>
            <Field.String label="Medium" value="Foo" />

            <Form.Appearance size="large">
              <Field.String label="Large" value="Bar" />
            </Form.Appearance>
          </Flex.Stack>
        </Form.Handler>
      </Form.Appearance>)
```

## Properties


```json
{
  "props": {
    "size": {
      "doc": "The sizes you can choose are `default`, `medium` and `large`.",
      "type": [
        "\"medium\"",
        "\"large\""
      ],
      "status": "optional"
    }
  }
}
```
