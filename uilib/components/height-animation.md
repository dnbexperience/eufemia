---
title: 'HeightAnimation'
description: 'HeightAnimation is a helper component to animate from 0 to height:auto powered by CSS.'
metadata: https://eufemia.dnb.no/uilib/components/height-animation/metadata.json
---

## Import

```tsx
import { HeightAnimation } from '@dnb/eufemia'
```

## Description

The HeightAnimation component calculates the height, and animates from `auto` to `auto` – or from `0` to `auto` in height – powered by CSS transition. It calculates the height on the fly.

When the animation is done, it sets the element's height to `auto`.

The component can be used as an opt-in replacement instead of vanilla HTML Elements.

The element animation is done with a CSS transition with `400ms` in duration.

It also re-calculates and changes the height, when the given content changes.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/height-animation)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/height-animation)

## Accessibility

It is important to never animate from 0 to e.g. 64px – because:

- The content may differ based on the viewport width (screen size)
- The content itself may change
- The user may have a larger `font-size`

## Demos

### Animation during height changes

This example shows how you easily can enhance the user experience. Here we also use `showOverflow` to avoid hidden overflow during the animation.

```tsx
const Example = () => {
  const [showMe, setShowMe] = React.useState(true)
  return (
    <>
      <HeightAnimation showOverflow>
        {showMe ? (
          <Button
            onClick={() => {
              setShowMe(!showMe)
            }}
          >
            Click me!
          </Button>
        ) : (
          <Anchor
            onClick={() => {
              setShowMe(!showMe)
            }}
          >
            No, click me!
          </Anchor>
        )}
      </HeightAnimation>

      <P top>Look at me 👀</P>
    </>
  )
}
render(<Example />)
```

### Basic open/close

This example removes its given children, when open is `open={false}`.

```tsx
const Example = () => {
  const [openState, setOpenState] = React.useState(false)
  const [contentState, setContentState] = React.useState(false)
  const onChangeHandler = ({ checked }) => {
    setOpenState(checked)
  }
  return (
    <>
      <ToggleButton checked={openState} on_change={onChangeHandler} right>
        Open/close
      </ToggleButton>
      <ToggleButton
        checked={contentState || !openState}
        disabled={!openState}
        on_change={({ checked }) => {
          setContentState(checked)
        }}
        space={{
          top: true,
          bottom: true,
        }}
      >
        Change height inside
      </ToggleButton>

      <Section style_type="lavender" top>
        <HeightAnimation open={openState}>
          <Section spacing style_type="lavender">
            <P space={0}>Your content</P>
          </Section>
          {contentState && <P space={0}>More content</P>}
        </HeightAnimation>
      </Section>

      <P top>Look at me 👀</P>
    </>
  )
}
render(<Example />)
```

### Keep in DOM

When providing `keepInDOM={true}`, your nested content will never be removed from the DOM. But rather be "hidden" with `visually: hidden` and `aria-hidden`.

```tsx
const Example = () => {
  const [openState, setOpenState] = React.useState(true)
  const [contentState, setContentState] = React.useState(false)
  const onChangeHandler = ({ checked }) => {
    setOpenState(checked)
  }
  return (
    <>
      <ToggleButton checked={openState} on_change={onChangeHandler} right>
        Open/close
      </ToggleButton>
      <ToggleButton
        checked={contentState || !openState}
        disabled={!openState}
        on_change={({ checked }) => {
          setContentState(checked)
        }}
        space={{
          top: true,
          bottom: true,
        }}
      >
        Change height inside
      </ToggleButton>

      <StyledSection style_type="lavender" top>
        <HeightAnimation open={openState} keepInDOM={true} duration={1000}>
          <Section spacing style_type="lavender">
            <P space={0}>Your content</P>
          </Section>
          {contentState && <P space={0}>More content</P>}
        </HeightAnimation>
      </StyledSection>
    </>
  )
}
const StyledSection = styled(Section)`
  .content-element {
    transition: transform 1s var(--easing-default);
    transform: translateY(-2rem);

    padding: 4rem 0;
  }

  .dnb-height-animation--parallax .content-element {
    transform: translateY(0);
  }
`
render(<Example />)
```
