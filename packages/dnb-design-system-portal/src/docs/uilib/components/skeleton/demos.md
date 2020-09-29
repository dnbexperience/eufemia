---
showTabs: true
---

import AllComponents from 'dnb-ui-lib/src/components/form-row/AllComponents'
import ComponentBox from 'Tags/ComponentBox'
import Provider from 'dnb-ui-lib/src/shared/Provider'
import { Article } from 'dnb-ui-lib/src/components/skeleton/figures'
import 'dnb-ui-lib/src/components/skeleton/style/themes/rainbow'
import 'dnb-ui-lib/src/components/skeleton/style/themes/norway'
import 'dnb-ui-lib/src/components/skeleton/style/themes/brand'

## Demos

## Input with Skeleton

<ComponentBox>
{`
<Input label="Input" skeleton />
`}
</ComponentBox>

## Toggle skeleton on/off

<ComponentBox data-dnb-test="skeleton-exclude" scope={{Provider}} useRender>
{`
const UserData = () => {
	const [state, setState] = React.useState(true)
	return (
		<>
			<Skeleton show={state}>
				<H2 top bottom>Heading</H2>
				<P top bottom>Paragraph Non habitasse ut nisi dictum laoreet ridiculus dui.</P>
				<Input label_direction="vertical" label="Input" />
				<Skeleton.Exclude>
					<ToggleButton checked={state} on_change={({ checked }) => setState(checked)} top="large">Toggle</ToggleButton>
				</Skeleton.Exclude>
			</Skeleton>
		</>
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

You can also use `formRow={{ skeleton: true }}`.

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

<!-- prettier-ignore-start -->

export const SkeletonVisualTests = () => {
  if(!(typeof window !== 'undefined' && window.IS_TEST)){
    return <></>
  }
  return (
	<>
		<ComponentBox data-dnb-test="skeleton-all-horizontal" scope={{AllComponents}}>
			{`
			<FormRow>
				<Skeleton show no_animation>
					<AllComponents />
				</Skeleton>
			</FormRow>
			`}
		</ComponentBox>
		<ComponentBox data-dnb-test="skeleton-all-vertical" scope={{AllComponents}}>
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
