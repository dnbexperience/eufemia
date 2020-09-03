---
title: 'Skeleton'
status: 'wip'
order: 20
# showTabs: true
---

import ComponentBox from 'Tags/ComponentBox'
import Provider from 'dnb-ui-lib/src/shared/Provider'
import { Article } from 'dnb-ui-lib/src/components/skeleton/figures'
import 'dnb-ui-lib/src/components/skeleton/style/themes/rainbow'
import 'dnb-ui-lib/src/components/skeleton/style/themes/norway'
import 'dnb-ui-lib/src/components/skeleton/style/themes/brand'
import 'dnb-ui-lib/src/components/skeleton/style/themes/lines'

# Skeleton

**Under development**

## Input with Skeleton

<ComponentBox>
{`
<Input label="Input" skeleton />
`}
</ComponentBox>

## Skeleton using the Skeleton Provider

<ComponentBox scope={{Provider}}>
{`
<Skeleton
	show={true}
>
	<H2 top bottom>Heading</H2>
	<P top bottom>Paragraph Non habitasse ut nisi dictum laoreet ridiculus dui.</P>
	<Input label_direction="vertical" label="Input" />
</Skeleton>
`}
</ComponentBox>

## Skeleton using Eufemia Provider

<ComponentBox scope={{Provider}}>
{`
<Provider
	skeleton={true}
	// formRow={{ skeleton: true }}
>
	<H2 top bottom>Heading</H2>
	<P top bottom>Paragraph Non habitasse ut nisi dictum laoreet ridiculus dui.</P>
	<Button>Button</Button>
</Provider>
`}
</ComponentBox>

## Skeleton figures

You may import a given figure, or create your own.

```jsx
import { Article } from 'dnb-ui-lib/components/skeleton/figures'
```

<ComponentBox scope={{Article}}>
{`
<Skeleton
	show
	style_type="shine"
	figure={() => <Article rows={5} />}
>
	hidden content
</Skeleton>
`}
</ComponentBox>
