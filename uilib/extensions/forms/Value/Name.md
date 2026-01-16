---
title: 'Name'
description: '`Value.Name` is a wrapper component for displaying string values, with user experience tailored for personal, like first and last name and company names.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Value/Name/metadata.json
---

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Name />)
render(<Value.Name.First />)
render(<Value.Name.Last />)
render(<Value.Name.Company />)
```

## Description

`Value.Name` is a wrapper component for displaying string values, with user experience tailored for personal, like first and last name and company names.

There is a corresponding [Field.Name](/uilib/extensions/forms/feature-fields/Name) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  return (
    <Value.SummaryList>
      <Value.Name />
      <Value.Name.First value="Nora" />
      <Value.Name.Last value="Mørk" />
      <Value.Name.Company value="DNB" />
    </Value.SummaryList>
  )
}
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/Name)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/Name)

## Demos

### First name

<Examples.FirstName value="Nora" />

### Last name

<Examples.LastName value="Mørk" />

### Company name

<Examples.CompanyName value="DNB" />

### Placeholder

```tsx
render(<Value.Name.Last placeholder="Custom placeholder" />)
```

### Value composition

```tsx
render(
  <Value.Composition>
    <Value.Name.First value="Nora" />
    <Value.Name.Last value="Mørk" />
  </Value.Composition>,
)
```

### Inline

```tsx
render(
  <Form.Handler
    defaultData={{
      firstName: 'Nora',
      lastName: 'Mørk',
    }}
  >
    <P>
      This is before the component{' '}
      <Value.Name.First path="/firstName" inline />{' '}
      <Value.Name.Last path="/lastName" inline /> This is after the
      component
    </P>
  </Form.Handler>,
)
```
