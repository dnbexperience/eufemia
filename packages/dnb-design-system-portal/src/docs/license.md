---
title: 'License'
---

import React from 'react'
import license from "raw-loader!dnb-design-system-portal/../../LICENSE";
import { Logo } from '@dnb/eufemia/src'

export default ({ children }) => {
  return (
    <React.Fragment>
      {children}
      <div
        dangerouslySetInnerHTML={{
          __html: license?.replace(/\n|\r/g, '<br />')
        }}
      />
    </React.Fragment>
  )
}

<br />
<br />

<Logo size="100" />

# Eufemia License

---
