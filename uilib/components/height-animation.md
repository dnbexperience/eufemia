---
title: 'HeightAnimation'
description: 'HeightAnimation is a helper component to animate from 0 to height:auto powered by CSS.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.766Z
checksum: 7eedd3f55dcfd1da3e81b23c1d33908818c752407ee60b0bbca9443ab2e9825e
---

# HeightAnimation

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

## Properties

```json
{
  "props": {
    "open": {
      "doc": "Set to `true` on second re-render when the view should animate from 0px to auto. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "animate": {
      "doc": "Set to `false` to omit the animation. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "keepInDOM": {
      "doc": "Set to `true` ensure the nested children content will be kept in the DOM. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "compensateForGap": {
      "doc": "To compensate for CSS gap between the rows, so animation does not jump during the animation. Provide a CSS unit or `auto`. Defaults to `null`.",
      "type": "string",
      "status": "optional"
    },
    "showOverflow": {
      "doc": "Set to `true` to omit the usage of \"overflow: hidden;\". Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "duration": {
      "doc": "Custom duration of the animation in milliseconds. Defaults to `400ms`.",
      "type": "number",
      "status": "optional"
    },
    "delay": {
      "doc": "Custom delay of the animation in milliseconds. Defaults to `0ms`.",
      "type": "number",
      "status": "optional"
    },
    "element": {
      "doc": "Custom HTML element for the component. Defaults to `div` HTML Element.",
      "type": "string",
      "status": "optional"
    },
    "innerRef": {
      "doc": "Send along a custom React Ref.",
      "type": "React.RefObject",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## Events

```json
{
  "props": {
    "onOpen": {
      "doc": "Is called when fully opened or closed. Returns `true` or `false` depending on the state.",
      "type": "function",
      "status": "optional"
    },
    "onAnimationStart": {
      "doc": "Is called when animation has started. The first parameter is a string. Depending on the state, the value can be `opening`, `closing` or `adjusting`.",
      "type": "function",
      "status": "optional"
    },
    "onAnimationEnd": {
      "doc": "Is called when animation is done and the full height is reached. The first parameter is a string. Depending on the state, the value can be `opened`, `closed` or `adjusted`.",
      "type": "function",
      "status": "optional"
    },
    "onInit": {
      "doc": "Is called once before mounting the component (useLayoutEffect). Returns the instance of the internal animation class.",
      "type": "function",
      "status": "optional"
    }
  }
}
```
