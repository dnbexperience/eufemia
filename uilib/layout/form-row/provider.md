---
metadata: https://eufemia.dnb.no/uilib/layout/form-row/provider/metadata.json
---

## Global Provider

If you are using React, you can make use of a [Provider](/uilib/usage/customisation/provider) to support properties for all nested `FormRow`s, like:

```tsx
render(
  <Provider
    FormRow={{
      vertical: true,
    }}
  >
    <div id="my-app">
      ...
      <FormRow>Everything is vertical now</FormRow>
      <FormRow>Everything is vertical now</FormRow>
      ...
    </div>
  </Provider>,
)
```
