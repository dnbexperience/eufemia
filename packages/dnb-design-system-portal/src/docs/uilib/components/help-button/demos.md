---
showTabs: true
---

import ComponentBox from 'Tags/ComponentBox'

## Demos

### Default HelpButton

<ComponentBox data-dnb-test="help-button-default">
	{
	/* @jsx */ `
<HelpButton
  title="Additional details"
  on_click={() => {
    console.log('on_click')
  }}
/>
	`
	}
</ComponentBox>

### Help button using information icon

<ComponentBox data-dnb-test="help-button-information">
	{
	/* @jsx */ `
<HelpButton
  icon="information"
/>
<HelpButton
  icon="information"
  size="small"
  left
/>
	`
	}
</ComponentBox>
