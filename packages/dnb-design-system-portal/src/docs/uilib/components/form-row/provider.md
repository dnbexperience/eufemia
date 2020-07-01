---
showTabs: true
---

## Global Provider

If You are using React, You can make use of a [Provider](/uilib/usage/customisation/provider) to support properties for all nested `FormRow`s, like:

```jsx
import Provider from 'dnb-ui-lib/shared/Provider'

render(
  <Provider formRow={{ vertical: true }}>
    <App>
      ...
      <FormRow>Everything is vertical now</FormRow>
      <FormRow>Everything is vertical now</FormRow>
      ...
    </App>
  </Provider>
)
```
