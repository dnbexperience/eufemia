---
title: 'Skeleton'
status: 'wip'
order: 20
# showTabs: true
---

import ComponentBox from 'Tags/ComponentBox'
import Provider from 'dnb-ui-lib/src/shared/Provider'

# Skeleton

**Under development**

## Input with Skeleton

<ComponentBox>
{`
<Input label="Input" skeleton />
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
	<Input label_direction="vertical" label="Input" />
</Provider>
`}
</ComponentBox>

## Skeleton component example

<ComponentBox scope={{Provider}}>
{`
<Skeleton bottom show className="dnb-skeleton--shine dnb-h--xx-large" width={20} />
<Skeleton top show className="dnb-skeleton--shine dnb-p" width={40} />
<Provider
	skeleton={true}
>
<Skeleton figure="article" />
</Provider>
`}
</ComponentBox>
