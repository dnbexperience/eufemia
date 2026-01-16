---
title: 'Provider'
description: 'The `Value.Provider` lets you pass generic properties to all nested Value.* components.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Value/Provider/metadata.json
---

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Provider />)
```

## Description

The `Value.Provider` lets you pass generic properties to all nested Value.\* components.

```tsx
import { Field, Value } from '@dnb/eufemia/extensions/forms'
render(
  <>
    <Field.Boolean path="/myPath" label="My label" />

    <Value.Provider inheritLabel>
      <Value.Boolean path="/myPath" />
    </Value.Provider>
  </>,
)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/Provider)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/Provider)

## Demos

### Inherit visibility

```tsx
render(
  <Form.Handler>
    <Form.Card>
      <Field.Boolean
        variant="button"
        path="/isVisible"
        defaultValue={true}
      />

      <Form.Visibility pathTrue="/isVisible" animate>
        <Field.Name.First path="/foo" defaultValue="foo" />
        <Field.Name.Last path="/bar" defaultValue="bar" />
      </Form.Visibility>

      <Value.Provider inheritVisibility>
        <Value.SummaryList>
          <Value.Name.First path="/foo" />
          <Value.Name.First path="/bar" />
        </Value.SummaryList>
      </Value.Provider>
    </Form.Card>
  </Form.Handler>,
)
```
