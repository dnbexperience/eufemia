---
draft: true
---

import ComponentBox from 'Src/shared/tags/ComponentBox'

<!-- prettier-ignore-start -->

<ComponentBox
  caption="To showcase the 404 status component"
  data-dnb-test="global-error-404"
>
  {/* @jsx */ `
<GlobalError status="404" />
  `}
</ComponentBox>
<ComponentBox
  caption="To showcase the 500 status component"
  data-dnb-test="global-error-500"
>
  {/* @jsx */ `
<GlobalError status="500" />
  `}
</ComponentBox>

<!-- prettier-ignore-end -->
