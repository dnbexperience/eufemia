---
showTabs: true
---

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

## Demos

### DNB Logo with dynamic height

 <ComponentBox data-visual-test="logo-auto-size">
	{
	/* jsx */ `
<span style={{fontSize: '12rem'}}>
  <Logo size="auto" />
</span>
	`
	}
</ComponentBox>

### DNB Logo with dynamic height

<ComponentBox data-visual-test="logo-inherit-size">
	{
	/* jsx */ `
<span style={{height: '12rem'}}>
  <Logo size="inherit" />
</span>
	`
	}
</ComponentBox>

### DNB Logo with fixed height

<ComponentBox data-visual-test="logo-default">
	{
	/* jsx */ `
<Logo height="192" />
`
	}
</ComponentBox>
