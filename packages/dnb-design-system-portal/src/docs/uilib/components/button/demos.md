---
showTabs: true
---

import ComponentBox from 'Tags/ComponentBox'
import { bell_medium as Bell, question } from 'dnb-ui-lib/src/icons'

## Demos

### Primary button

<ComponentBox>
	{
	/* @jsx */ `
<Button
  text="Primary button with text only"
  on_click={() => {
    console.log('on_click')
  }}
  data-dnb-test="button-primary"
/>
		`
	}
</ComponentBox>

### Secondary button

<ComponentBox>
	{
	/* @jsx */ `
<Button
  variant="secondary"
  onClick={() => {
    console.log('onClick')
  }}
  data-dnb-test="button-secondary"
>
  Secondary button with text only
</Button>
	`
	}
</ComponentBox>

### Disabled primary button

<ComponentBox>
	{
	/* @jsx */ `
<Button
  text="Disabled primary button"
  disabled
/>
	`
	}
</ComponentBox>

### Disabled secondary button

<ComponentBox>
	{
	/* @jsx */ `
<Button
  text="Disabled secondary button"
  variant="secondary"
  disabled
/>
	`
	}
</ComponentBox>

### Primary button with icon

<ComponentBox>
	{
	/* @jsx */ `
<Button
  text="Primary button with icon"
  icon="chevron_right"
/>
	`
	}
</ComponentBox>

### Primary button with icon on left

<ComponentBox>
	{
	/* @jsx */ `
<Button
  icon_position="left"
  icon="chevron_left"
>
  Primary button with icon on left
</Button>
	`
	}
</ComponentBox>

### Tertiary button

<ComponentBox>
	{
	/* @jsx */ `
<Button
  variant="tertiary"
  text="Tertiary button with icon on left"
  icon_position="left"
  icon="chevron_left"
  data-dnb-test="button-tertiary"
/>
<Button
  variant="tertiary"
  text="With medium icon"
  icon="chevron_right"
  icon_size="medium"
/>
	`
	}
</ComponentBox>

### Anchor button

<ComponentBox data-dnb-test="button-anchor">
	{
	/* @jsx */ `
<Button
  text="Primary with href"
  href="?no-cache=1"
  icon_position="right"
  icon="chevron_right"
/>
<Button
  variant="secondary"
  text="Secondary with href"
  href="?no-cache=1"
  icon_position="left"
  icon="chevron_left"
/>
<Button
  href="?no-cache=1"
  title="This is a link"
  icon="chevron_right"
  size="default"
/>
	`
	}
</ComponentBox>

### Signal button

Medium is equivalent to 24, but responsive. To import custom icons, use: `import { bell_medium as Bell } from 'dnb-ui-lib/icons'`

<!-- prettier-ignore -->
<ComponentBox scope={{ Bell }}>
	{
	/* @jsx */ `
<Button
  variant="signal"
  text="Signal Button"
  icon={Bell}
  data-dnb-test="button-signal"
/>
	`
	}
</ComponentBox>

### Large Signal button

Large Signal button with medium sized icon. To import custom icons, use: `import { bell_medium as Bell } from 'dnb-ui-lib/icons'`

<!-- prettier-ignore -->
<ComponentBox scope={{ Bell }}>
	{
	/* @jsx */ `
<Button
  variant="signal"
  text="Large Signal Button"
  icon={<Bell />}
  size="large"
  icon_size="medium"
/>
	`
	}
</ComponentBox>

### Icon button

<!-- prettier-ignore -->
<ComponentBox scope={{ question }}>
	{
    /* @jsx */ `
<Button
  title="Disabled Icon only Button"
  icon="calendar"
  disabled
/>
<Button title="Button with Icon only" icon="calendar" data-dnb-test="button-icon" />
<Button
  title="Small sized button with default Icon"
  icon="add"
  icon_size="default"
  size="small"
/>
<Button
  title="Default sized Button with medium Icon"
  icon="calendar"
  icon_size="medium"
  size="default"
/>
<Button
  title="Button with custom, Secondary Icon only"
  icon={question}
/>
<Button
  title="Button with status"
  icon={question}
  status="error"
/>
	`
	}
</ComponentBox>

<!-- prettier-ignore-start -->

export const TertiaryWithNoIcon = () => {
  if(!(typeof window !== 'undefined' && window.IS_TEST)){
    return <></>
  }
  return (
    <ComponentBox
      title="Tertiary button with no icon"
      data-dnb-test="button-tertiary-no-icon"
    >
    {/* @jsx */ `
<Button text="Tertiary button with no icon" variant="tertiary" />
    `}
    </ComponentBox>
  )
}

<TertiaryWithNoIcon />

<!-- prettier-ignore-end -->
