---
showTabs: true
---

import ComponentBox from 'Src/shared/tags/ComponentBox'

## Demos

### To showcase the 404 status component

<ComponentBox data-visual-test="global-error-404">
{() => /* jsx */ `
<GlobalError status="404" />
`}
</ComponentBox>

### To showcase the 500 status component

<ComponentBox data-visual-test="global-error-500">
{() => /* jsx */ `
<GlobalError status="500" />
`}
</ComponentBox>
