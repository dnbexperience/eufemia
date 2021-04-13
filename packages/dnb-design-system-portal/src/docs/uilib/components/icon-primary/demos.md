---
showTabs: true
---

import ComponentBox from 'Src/shared/tags/ComponentBox'

## Demos

### Default and Medium sized icons (responsive)

<ComponentBox>
	{() => /* jsx */ `
<IconPrimary icon="question" title="Give icons a title" />
<IconPrimary
  icon="question_medium"
  title="Size defined in name"
  aria-hidden
/>
	`}
</ComponentBox>

### Default Icon with custom, but fixed size (64)

<ComponentBox>
	{() => /* jsx */ `
<IconPrimary
  icon="question"
  size="64"
  title="I'm not responsive!"
/>
	`}
</ComponentBox>
