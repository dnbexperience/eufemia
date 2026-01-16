---
title: 'Skeleton'
description: 'The Skeleton component is a visual building block helper.'
metadata: https://eufemia.dnb.no/uilib/components/skeleton/metadata.json
---

## Import

```tsx
import { Skeleton } from '@dnb/eufemia'
```

## Description

The Skeleton component is a visual building block that helps provide loading placeholders. It displays a non-interactive preview of the actual UI of the component, visually communicating that content is being processed.

After 5 seconds, an animation is shown that times out after 30 seconds.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/skeleton)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/skeleton)

## Take into consideration

It should be used carefully and not as a quick loading indicator replacement. The browser will use additional resources to render the additional state. If it is misused, such as showing a significantly different UI or being shown for just a fraction of a second, it can distract from the user experience rather than enhancing it.

Also, in some setups, the user may need to download almost the entire web application before skeletons can be shown during API calls.

### Gatsby

Gatsby as a framework is the perfect fit to utilize a good skeleton user experience from the very first page visit. Every page is optimized to load as fast as possible (in addition to page preloading and PWA). We can take advantage of this and show our skeleton as our initial state.

1. The skeletons will show up during the very first paint – even without JavaScript enabled.
1. Next, our page loads the needed application bundle, so we can start an API call to get our user data.
1. Now our application renders.
1. Finally, we have the user data to display.

## Accessibility

- Elements and components should still be responsive to screen width and font size.
- Screen readers will get a mention that the loading state has finished as an aria-live update.
- Components and interactive elements are not accessible for keyboard users.

## When not to use

- For low-traffic pages, such as super-user-only admin pages, use a loading spinner instead.
- For a tiny, inline action or feedback, e.g. clicked a button and the action will take time, use the [ProgressIndicator](/uilib/components/progress-indicator) instead (animation).
- For fast processes that take less than `300ms`, consider the [ProgressIndicator](/uilib/components/progress-indicator) or no loading state at all.
- For a background process or a long-running process, e.g. importing data or exporting reports, use the [ProgressIndicator](/uilib/components/progress-indicator) instead (percentage).

## When to use

- Use on high-traffic pages and landing pages, if they require a loading state.
- Use when there’s more than one element loading at the same time that requires an indicator.
- Use when the process would take more than `300ms` to load on an average internet connection.
- Use the Skeleton component when the [ProgressIndicator](/uilib/components/progress-indicator) is not prominent enough.

## How to use

You can use the Skeleton component as a provider for all underlying components, like inputs and buttons. This way, you can simply toggle on and off the skeletons. And all the spacing and sizing will be given from the components themselves.

But you can also use the Skeleton component to show a fake article or other figures.

## How it works

Every Eufemia component should support a skeleton natively. But for simplification, you can use the Skeleton component as a provider to enable the skeletons for a group of components.

If you use the skeleton as a provider, the [Space](/uilib/layout/space) component is used as a wrapper. This wrapper also helps the underlying components to define the style type or animation. If only the defaults are used, then you can skip it by setting the element to `false` with `element={false}`.

But the Skeleton component also supports a set of ready-to-use figures. Use it like `figure="article"`.

```tsx
render(
  <Div id="your-app">
    <Skeleton show={true}>
      <Input>I'm hidden behind the skeleton</Input>
      <Input>I'm hidden behind the skeleton</Input>
    </Skeleton>
  </Div>,
)
```

## Global Provider

You can also use the global [Eufemia Provider](/uilib/usage/customisation/provider) to enable the underlying skeletons. You can even have multiple providers wrapped.

```tsx
render(
  <Provider locale="nb-NO">
    <Div id="your-app">
      <Provider skeleton={true}>
        <Input>I'm hidden behind the skeleton</Input>
        <Input>I'm hidden behind the skeleton</Input>
      </Provider>
    </Div>
  </Provider>,
)
```

## Exclude a part

You can easily exclude a part from being transformed to a skeleton by using `Skeleton.Exclude`.

```tsx
render(
  <Skeleton show={true}>
    <Input>I'm hidden behind the skeleton</Input>

    <Skeleton.Exclude>
      <Input>I'm NOT hidden</Input>
    </Skeleton.Exclude>
  </Skeleton>,
)
```

## Suspense

You can take advantage of an async component by using the React Suspense with a skeleton fallback.

```tsx
render(
  <Suspense
    fallback={
      <Skeleton show={true}>
        <Div id="user-data" />
      </Skeleton>
    }
  >
    <Div id="user-data" />
  </Suspense>,
)
```

## Create a custom skeleton

In order to create the same skeletons as the build-ins, you can make use of a couple of helper tools.

```tsx
function Component({ skeleton = false, ...params } = {}) {
  const context = React.useContext(Context)

  // Handle accessibility features
  skeletonDOMAttributes(params, skeleton, context)

  // Handle CSS classes – use either "shape" or "font"
  const className = createSkeletonClass('font', skeleton, context)
  return (
    <div {...params} id="my-component" className={className}>
      Hello World
    </div>
  )
}
render(<Component />)
```

## Demos

<PortalSkeleton />

## Input with Skeleton

```tsx
render(<Input label="Input" skeleton />)
```

## Toggle skeleton on/off

```tsx
const UserData = () => {
  const [state, setState] = React.useState(true)
  return (
    <Skeleton show={state}>
      <H2 top bottom>
        Heading
      </H2>
      <P top bottom>
        Paragraph Non habitasse ut nisi dictum laoreet ridiculus dui.
      </P>
      <Input label_direction="vertical" label="Input" />
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
render(<UserData />)
```

## Skeleton wrapper

```tsx
render(
  <Skeleton show>
    <H2 top bottom>
      Heading
    </H2>
    <P top bottom>
      Paragraph Non habitasse ut nisi dictum laoreet ridiculus dui.
    </P>
    <Button>Button</Button>
  </Skeleton>,
)
```

## Skeleton using Eufemia Provider

You can also use `formElement={{ skeleton: true }}`.

```tsx
render(
  <Provider skeleton={true}>
    <H2 top bottom>
      Heading
    </H2>
    <P top bottom>
      Paragraph Non habitasse ut nisi dictum laoreet ridiculus dui.
    </P>
    <Button>Button</Button>
  </Provider>,
)
```

## Skeleton figures

You may import a given figure, or create your own.

```jsx
import { Article } from '@dnb/eufemia/components/skeleton/figures'
```

```tsx
render(
  <Skeleton show figure={<Article rows={5} />}>
    hidden content
  </Skeleton>,
)
```

```tsx
<Skeleton show no_animation>
  <AllComponentsHorizontalTestCase data-visual-test="skeleton-all-horizontal" />
</Skeleton>
<Skeleton show no_animation>
  <AllComponentsVerticalLabelsTestCase data-visual-test="skeleton-all-vertical" />
</Skeleton>
```
