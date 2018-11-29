---
draft: true
---

import { Button, IconWithAllIcons as Icon } from 'dnb-ui-lib/src'

<!-- <dnb-button icon="chevron-right" text="Custom Element"></dnb-button> -->

### Basic Buttons

<div className="demo-box">
  <Button text="Basic Button" />
</div>

### Large Buttons

<div className="demo-box">
  <Button variant="secondary" text="Secondary Button" size="large" icon="chevron-right_medium" />
  <Button variant="secondary" size="large">
    <Icon icon="chevron-right_medium" size="large" />
  </Button>
  <Button icon="chevron-right_medium" icon_size="large" size="large" />
</div>
