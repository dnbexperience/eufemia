---
title: 'HeightAnimation'
description: 'Use HeightAnimation to animate content as it opens or closes.'
version: 11.10.0
generatedAt: 2026-08-14T11:19:59.780Z
checksum: c7f9ea1b305ed53dc0a5a673f1e462ec36a29ea8e8a2c3cc780e21a37075d4b8
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

## Server-side rendering (SSR)

HeightAnimation is SSR-compatible. When `open` is `true` (the default), the component renders its content with the `--is-visible` class during server-side rendering so the initial HTML is correct without waiting for JavaScript.

Custom `duration` and `delay` props are applied after hydration via a DOM effect to avoid hydration mismatches caused by differences in how React serializes CSS custom properties on the server versus the client.

## Accessibility

Connect the control and animated content with `aria-controls`, and expose the current state with `aria-expanded`. HeightAnimation does not manage focus. Avoid closing content while focus is inside it, or move focus to a logical visible control first.

When `keepInDOM` or `untilFound` keeps closed content in the DOM, HeightAnimation applies `aria-hidden="true"`. The collapsed content is therefore unavailable to assistive technologies until it opens.

`untilFound` uses the native `hidden="until-found"` behavior, making collapsed text available to browser find-in-page. HeightAnimation reveals matching content internally, so `onBeforeMatch` is optional. When an external control owns the `open` state, handle `onBeforeMatch` by updating the same state passed to `open`. This keeps the control's `aria-expanded` value synchronized when the browser reveals a match.

`untilFound` depends on native browser support for `hidden="until-found"` (Chromium 102+, Firefox 148+, with partial support in Safari 26.2+). In browsers without support, the collapsed content is **not reliably hidden** and can remain visible, because the collapse relies on the browser applying `content-visibility` for `hidden="until-found"`. For content that must stay hidden in those browsers, use `keepInDOM` (or leave `untilFound` off) instead.

Users who prefer reduced motion receive an effectively immediate transition. It is important to never animate to a fixed height such as 64px, because:

- The content may differ based on the viewport width (screen size)
- The content itself may change
- The user may have a larger `font-size`


## Related components

HeightAnimation is part of the [Other](/uilib/components/overview/#other) category. Other components for similar needs:

- [CopyOnClick](/uilib/components/copy-on-click/) – when people should copy text by clicking it.
- [PortalRoot](/uilib/components/portal-root/) – to render floating content outside the normal page structure.
- [ScrollView](/uilib/components/scroll-view/) – when content needs its own horizontal or vertical scrolling area.


## Demos

### Animation during height changes

This example shows how you easily can enhance the user experience. Here we also use `showOverflow` to avoid hidden overflow during the animation.


```tsx
const Example = () => {
  const [showMe, setShowMe] = useState(true);
  return <>
              <HeightAnimation showOverflow>
                {showMe ? <Button onClick={() => {
        setShowMe(!showMe);
      }}>
                    Click me!
                  </Button> : <Anchor onClick={() => {
        setShowMe(!showMe);
      }}>
                    No, click me!
                  </Anchor>}
              </HeightAnimation>

              <P top>Look at me 👀</P>
            </>;
};
render(<Example />);
```


### Basic open/close

This example removes its given children, when open is `open={false}`.


```tsx
const Example = () => {
  const [openState, setOpenState] = useState(false);
  const [contentState, setContentState] = useState(false);
  const onChangeHandler = ({
    checked
  }) => {
    setOpenState(checked);
  };
  return <>
              <ToggleButton checked={openState} onChange={onChangeHandler} right>
                Open/close
              </ToggleButton>
              <ToggleButton checked={contentState || !openState} disabled={!openState} onChange={({
      checked
    }) => {
      setContentState(checked);
    }} space={{
      top: true,
      bottom: true
    }}>
                Change height inside
              </ToggleButton>

              <Section variant="information" top>
                <HeightAnimation open={openState}>
                  <Section innerSpace={{
          block: 'large'
        }} variant="information">
                    <P space={0}>Your content</P>
                  </Section>
                  {contentState && <P space={0}>More content</P>}
                </HeightAnimation>
              </Section>

              <P top>Look at me 👀</P>
            </>;
};
render(<Example />);
```


### Keep in DOM

When providing `keepInDOM={true}`, your nested content will never be removed from the DOM. But rather be "hidden" with `visually: hidden` and `aria-hidden`.


```tsx
const Example = () => {
  const [openState, setOpenState] = useState(true);
  const [contentState, setContentState] = useState(false);
  const onChangeHandler = ({
    checked
  }) => {
    setOpenState(checked);
  };
  return <>
              <ToggleButton checked={openState} onChange={onChangeHandler} right>
                Open/close
              </ToggleButton>
              <ToggleButton checked={contentState || !openState} disabled={!openState} onChange={({
      checked
    }) => {
      setContentState(checked);
    }} space={{
      top: true,
      bottom: true
    }}>
                Change height inside
              </ToggleButton>

              <StyledSection variant="information" top>
                <HeightAnimation open={openState} keepInDOM={true} duration={1000}>
                  <Section innerSpace={{
          block: 'large'
        }} variant="information">
                    <P space={0}>Your content</P>
                  </Section>
                  {contentState && <P space={0}>More content</P>}
                </HeightAnimation>
              </StyledSection>
            </>;
};
const StyledSection = styled(Section)`
          .content-element {
            transition: transform 1s var(--easing-default);
            transform: translateY(-2rem);

            padding: 4rem 0;
          }

          .dnb-height-animation--parallax .content-element {
            transform: translateY(0);
          }
        `;
render(<Example />);
```


### Find collapsed content

The `untilFound` prop keeps collapsed content available to the browser's find-in-page feature using `hidden="until-found"`. Search this page for **“Findable banking content”**. HeightAnimation reveals the match itself, while the optional `onBeforeMatch` callback synchronizes the toggle's external state.


```tsx
const Example = () => {
  const [openState, setOpenState] = useState(false);
  return <>
              <ToggleButton checked={openState} aria-expanded={openState} aria-controls="until-found-content" onChange={({
      checked
    }) => setOpenState(checked)}>
                Open content
              </ToggleButton>

              <HeightAnimation id="until-found-content" open={openState} untilFound onBeforeMatch={() => setOpenState(true)}>
                <Space innerSpace>
                  <Section variant="information" innerSpace>
                    <P space={0}>Findable banking content</P>
                  </Section>
                </Space>
              </HeightAnimation>
            </>;
};
render(<Example />);
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
      "doc": "Set to `true` to ensure the nested children content will be kept in the DOM. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "untilFound": {
      "doc": "Set to `true` to keep closed content available to the browser find-in-page feature with `hidden=\"until-found\"`. This implies `keepInDOM`. In browsers without `hidden=\"until-found\"` support, the collapsed content may remain visible. Defaults to `false`.",
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
      "doc": "Custom duration of the animation in milliseconds. Defaults to `400`.",
      "type": "number",
      "status": "optional"
    },
    "delay": {
      "doc": "Custom delay of the animation in milliseconds. Defaults to `0`.",
      "type": "number",
      "status": "optional"
    },
    "element": {
      "doc": "Custom HTML element for the component. Defaults to `div` HTML Element.",
      "type": [
        "string",
        "React.ElementType"
      ],
      "status": "optional"
    },
    "ref": {
      "doc": "Send along a custom `React.Ref`.",
      "type": "React.RefObject",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```

## Events


```json
{
  "props": {
    "onBeforeMatch": {
      "doc": "Is called after matching content inside a closed animation is revealed by the browser using `untilFound`. Use it to synchronize external open state and controls.",
      "type": "function",
      "status": "optional"
    },
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
