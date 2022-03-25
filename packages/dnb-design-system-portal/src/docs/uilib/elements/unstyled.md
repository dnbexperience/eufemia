import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

# Unstyled HTML Elements

In order to use the inherited [Skeleton](/uilib/components/skeleton), there are a number of un-styled HTML elements, that do inherit and react to the Skeleton Provider.

```jsx
import { Span, Div } from '@dnb/eufemia/elements'
```

- `Span`
- `Div`

## Example usage of span

<ComponentBox data-visual-test="span-skeleton" useRender>
{`
const Box = styled.div\`
	display: grid;
	place-items: center;
	width: 12rem;
	height: 4rem;
	padding: 0 1rem;
	background-color: var(--color-white);
\`
const StyledButton = styled.button\`
	display: flex;
	justify-content: space-between;
	width: 100%;
	&:hover {
		color: var(--color-fire-red);
	}
	&:active {
		opacity: 0.6;
	}
\`
const CustomImage = () => {
	const [state, setState] = React.useState(false)
	return (
		<Skeleton show={state}>
			<Box>
				<StyledButton className="dnb-button dnb-button--reset">
					<Span>Text</Span>
					<IconPrimary icon="chevron_right" />
				</StyledButton>
			</Box>
			<br />
			<Skeleton.Exclude>
				<ToggleButton checked={state} on_change={({ checked }) => setState(checked)} top="large">Toggle</ToggleButton>
			</Skeleton.Exclude>
		</Skeleton>
	)
}
render(<CustomImage />)
`}
</ComponentBox>
