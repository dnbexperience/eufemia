---
showTabs: true
---

import PortalSkeleton from 'dnb-design-system-portal/src/shared/parts/uilib/PortalSkeleton'
import { AllComponents } from 'dnb-design-system-portal/src/docs/uilib/components/form-row/Examples'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import Provider from '@dnb/eufemia/src/shared/Provider'
import Context from '@dnb/eufemia/src/shared/Context'
import { Article } from '@dnb/eufemia/src/components/skeleton/figures'

## Demos

<PortalSkeleton />

## Input with Skeleton

<ComponentBox>
{`
<Input label="Input" skeleton />
`}
</ComponentBox>

## Toggle skeleton on/off

<ComponentBox data-visual-test="skeleton-exclude" useRender>
{`
const UserData = () => {
	const [state, setState] = React.useState(true)
	return (
		<Skeleton show={state}>
			<H2 top bottom>Heading</H2>
			<P top bottom>Paragraph Non habitasse ut nisi dictum laoreet ridiculus dui.</P>
			<Input label_direction="vertical" label="Input" />
			<Skeleton.Exclude>
				<ToggleButton checked={state} on_change={({ checked }) => setState(checked)} top="large">Toggle</ToggleButton>
			</Skeleton.Exclude>
		</Skeleton>
	)
}
render(<UserData />)
`}
</ComponentBox>

## Skeleton wrapper

<ComponentBox>
{`
<Skeleton show>
	<H2 top bottom>Heading</H2>
	<P top bottom>Paragraph Non habitasse ut nisi dictum laoreet ridiculus dui.</P>
	<Button>Button</Button>
</Skeleton>
`}
</ComponentBox>

## Skeleton using Eufemia Provider

You can also use `FormRow={{ skeleton: true }}`.

<ComponentBox scope={{Provider}}>
{`
<Provider
	skeleton={true}
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
import { Article } from '@dnb/eufemia/components/skeleton/figures'
```

<ComponentBox scope={{Article}} data-visual-test="skeleton-figure-article">
{`
<Skeleton
	show
	figure={<Article rows={5} />}
>
	hidden content
</Skeleton>
`}
</ComponentBox>

<!-- prettier-ignore-start -->

export const SkeletonVisualTests = () => {
  if(!(typeof window !== 'undefined' && window.IS_TEST)){
    return <></>
  }
  return (
	<>
		<ComponentBox data-visual-test="skeleton-all-horizontal" scope={{AllComponents}}>
			{`
			<FormRow>
				<Skeleton show no_animation>
					<AllComponents />
				</Skeleton>
			</FormRow>
			`}
		</ComponentBox>
		<ComponentBox data-visual-test="skeleton-all-vertical" scope={{AllComponents}}>
			{`
			<FormRow vertical="true">
				<Skeleton show no_animation>
					<AllComponents />
				</Skeleton>
			</FormRow>
			`}
		</ComponentBox>
	</>
  )
}

<SkeletonVisualTests />

<!-- prettier-ignore-end -->
