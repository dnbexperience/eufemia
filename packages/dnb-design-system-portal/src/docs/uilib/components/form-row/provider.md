---
showTabs: true
---

## Global Provider

If you are using React, you can make use of a [Provider](/uilib/usage/customisation/provider) to support properties for all nested `FormRow`s, like:

```jsx
import Provider from '@dnb/eufemia/shared/Provider'

render(
  <Provider FormRow={{ vertical: true }}>
    <App>
      ...
      <FormRow>Everything is vertical now</FormRow>
      <FormRow>Everything is vertical now</FormRow>
      ...
    </App>
  </Provider>
)
```
