---
title: 'Image'
description: 'Image element exists to have a future possibility to optimize and add features.'
metadata: https://eufemia.dnb.no/uilib/elements/image/metadata.json
---

## Import

```tsx
import { Img } from '@dnb/eufemia/elements'
```

## Description

The image element associated with the class `dnb-img` does not have much opinionated styling. It exists to provide a future possibility to optimize and add features.

As of now, the React image "element" (Img) provides a `figure` element with the `role="img"` and an `img` tag inside. This is mainly to support the [Skeleton](/uilib/components/skeleton) provider.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/elements/img)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/elements/image)

## Demos

### Basic image element

```tsx
const StyledImg = styled(Img)`
  border-radius: 1rem;
`
const CustomImage = () => {
  return (
    <StyledImg
      width="100"
      height="100"
      alt="DNB logo"
      src="/dnb/android-chrome-192x192.png"
    />
  )
}
render(<CustomImage />)
```

### Image with invalid source

```tsx
const MyImg = Img
render(
  <MyImg width="100" height="100" alt="Alt text" src="https://invalid" />,
)
```

### Image with caption

```tsx
const StyledImg = styled(Img)`
  border-radius: 1rem;
`
const CustomImage = () => {
  return (
    <StyledImg
      width="100"
      height="100"
      alt="Alt text"
      caption="Caption text"
      src="/dnb/android-chrome-192x192.png"
    />
  )
}
render(<CustomImage />)
```

### Image element with skeleton

```tsx
const StyledImg = styled(Img)`
  border-radius: 1rem;
`
const CustomImage = () => {
  const [state, setState] = React.useState(true)
  return (
    <Skeleton show={state}>
      <StyledImg
        width="100"
        height="100"
        alt="DNB logo"
        src="/dnb/android-chrome-192x192.png"
      />
      <br />
      <Skeleton.Exclude>
        <ToggleButton
          checked={state}
          on_change={({ checked }) => setState(checked)}
          top="large"
        >
          Toggle
        </ToggleButton>
      </Skeleton.Exclude>
    </Skeleton>
  )
}
render(<CustomImage />)
```
