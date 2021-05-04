---
showTabs: true
---

import ComponentBox from 'Tags/ComponentBox'

## Demos

### Default HelpButton

<ComponentBox data-visual-test="help-button-default">
	{
	() => /* jsx */ `
<HelpButton>
	Text
</HelpButton>
`}
</ComponentBox>

### Help button inside a suffix

<ComponentBox data-visual-test="help-button-suffix">
	{
	() => /* jsx */ `
<Input
	size={10}
	placeholder="Input ..."
	suffix={<HelpButton title="Custom title">Text</HelpButton>}
/>
`}
</ComponentBox>

### Help button in different sizes

<ComponentBox data-visual-test="help-button-sizes">
	{
	() => /* jsx */ `
<HelpButton title="Custom title">Text</HelpButton>
<HelpButton
	size="small"
	left
	on_click={() => {
    	console.log('on_click')
	}}
/>
`}
</ComponentBox>

### Help button with information icon

<ComponentBox>
	{() => /* jsx */ `
<HelpButton icon="information" tooltip="More info">
	<Dl>
		<Dt>Term</Dt>
		<Dd>Description</Dd>
		<Dd>Description</Dd>
    	<Dt>Term</Dt>
    	<Dd>Description</Dd>
    </Dl>
</HelpButton>
`}
</ComponentBox>
