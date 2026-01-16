---
metadata: https://eufemia.dnb.no/uilib/extensions/forms/quick-start/metadata.json
---

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
