---
showTabs: true
---

import { Heading } from 'dnb-ui-lib/src'

## Description

Create automated semantic headings

## Provider

<!-- You can send down the `locale` as an application wide property (Context). More info about the [provider and locale usage](/uilib/components/heading/provider). -->

```jsx
import Provider from 'dnb-ui-lib/shared/Provider'

render(
  <Provider locale="en-US" currency_display="code">
    <MyApp>
      text <Heading>123</Heading> table etc.
    </MyApp>
  </Provider>
)
```
