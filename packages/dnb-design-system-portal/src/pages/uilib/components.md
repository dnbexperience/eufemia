---
title: 'Components'
icon: 'components'
draft: false
order: 6
---

import componentsParts from 'Src/uilib/components/demos/allParts'
import AllParts from 'Src/uilib/AllParts'

### All Components

<!-- prettier-ignore-start -->

export default ({ children }) => <AllParts parts={componentsParts}>{children}</AllParts>

<!-- prettier-ignore-end -->
