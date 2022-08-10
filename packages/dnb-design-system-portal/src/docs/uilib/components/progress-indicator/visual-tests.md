---
draft: true
---

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

<ComponentBox data-visual-test="progress-indicator-sizes">
  {/* jsx */ `
<div style={{ display: 'flex' }}>
	<ProgressIndicator progress="50" size="small" />
	<ProgressIndicator progress="50" size="medium" />
	<ProgressIndicator progress="50" />
	<ProgressIndicator progress="50" size="large" />
</div>
	`}
</ComponentBox>
