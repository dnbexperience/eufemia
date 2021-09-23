---
title: 'Image'
---

import ComponentBox from 'Tags/ComponentBox'

## Image

The image element associated with the class `dnb-img` does not have much opinionated styling. It exists more to have a future possibility to optimize and add features.

As of now, the React image "element" (Img) does provide a `figure` element with the `role="img"` and an `img` tag inside. This is mainly to support the [Skeleton](/uilib/components/skeleton) provider.

```jsx
import { Img } from '@dnb/eufemia/elements'

render(<InlineImg alt="..." src="..." width="100" height="100" />)
```

### Basic image element

<ComponentBox data-visual-test="image-plain" useRender hideCode>
{`
const StyledImg = styled(Img)\`
  border-radius: 1rem;
\`
const CustomImage = () => {
	return (
    <StyledImg
      width="100"
      height="100"
      alt="DNB logo"
      src="/android-chrome-192x192.png"
    />
	)
}
render(<CustomImage />)
`}
</ComponentBox>

### Image with invalid source

<ComponentBox data-visual-test="image-no-source" useRender hideCode>
{`
const MyImg = Img
render(
  <MyImg
    width="100"
    height="100"
    alt="Alt text"
    src="https://invalid"
  />
)
`}
</ComponentBox>

### Image with caption

<ComponentBox data-visual-test="image-caption" useRender hideCode>
{`
const StyledImg = styled(Img)\`
  border-radius: 1rem;
\`
const CustomImage = () => {
	return (
    <StyledImg
      width="100"
      height="100"
      alt="Alt text"
      caption="Caption text"
      src="/android-chrome-192x192.png"
    />
	)
}
render(<CustomImage />)
`}
</ComponentBox>

### Image element with skeleton

<ComponentBox data-visual-test="image-skeleton" useRender>
{`
const StyledImg = styled(Img)\`
  border-radius: 1rem;
\`
const CustomImage = () => {
	const [state, setState] = React.useState(true)
	return (
    <Skeleton show={state}>
      <StyledImg
        width="100"
        height="100"
        alt="DNB logo"
        src="/android-chrome-192x192.png"
      />
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
