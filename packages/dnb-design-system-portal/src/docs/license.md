---
title: 'License'
---

import license from "raw-loader!Root/LICENSE";
import { Logo } from '@dnb/eufemia/src'

<!-- prettier-ignore-start -->

export default ({children}) => (
  <React.Fragment>
    {children}
    <div
      dangerouslySetInnerHTML={{
        __html: license.replace(/\n|\r/g, '<br />')
      }}
    />
  </React.Fragment>
)

<!-- prettier-ignore-end -->

<br />
<br />

<Logo size="100" />

# Eufemia License

---
