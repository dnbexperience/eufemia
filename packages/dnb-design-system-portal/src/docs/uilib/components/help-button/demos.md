---
showTabs: true
---

import ComponentBox from 'Tags/ComponentBox'

## Demos

### Default HelpButton

<ComponentBox data-visual-test="help-button-default">
	{
	/* @jsx */ `
<HelpButton>
	Text
</HelpButton>
	`
	}
</ComponentBox>

### Help button using information icon

<ComponentBox data-visual-test="help-button-sizes">
	{
	/* @jsx */ `
<HelpButton title="Custom title">Text</HelpButton>
<HelpButton
	size="small"
	left
	on_click={() => {
    	console.log('on_click')
	}}
/>
	`
	}
</ComponentBox>
