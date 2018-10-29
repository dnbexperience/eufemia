---
header: 'UI Library'
title: 'Components'
draft: false
order: 5
---

import parts from 'Src/uilib/components/demos/allParts'
import AllParts from 'Src/uilib/AllParts'

<!-- prettier-ignore-start -->

export default ({ children }) => {
  return (
    <AllParts parts={parts}>{children}</AllParts>
  )
}

<!-- prettier-ignore-end -->

### All Components
