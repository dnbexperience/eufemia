---
showTabs: true
---

## Description

The Skeleton component is a visual building block helper. It will provide loading placeholders that displays a non-interactive preview of the app’s actual UI to visually communicate that content is being processed.

### Take in consideration

It has to be used carefully and not as a quick loading indicator replacement. The reason lays in that, that the browser will use additional resources to render the additional state. And if it is misused, like showing not an nearly identical UI or it is shown for just a fraction of a second, then it will rather distract the user experience, than enhance it.

Also the fact, that in some setups, the users is first downloading almost the whole web application before we actually are able to show some skeletons during the API calls.

#### Gatsby

Gatsby as a framework makes the perfect fit to utilize a good skeleton user experience from the very first page visit. Every page is optimized to load as fast as possible (in addition to page preloading and PWA). This we can take advantage off and show our skeleton as our initial state.

1. The skeletons will show up during the very first paint – even without JavaScript enabled.
1. Next, our page loads the needed application bundle, so we can start an API call, getting our user data.
1. Now our applications renders.
1. And finally, we have the user data to display.

### Accessibility

- Elements and components should be still responsive to screen width and font-size.
- Screen readers will get a mention that the loading state has finished as a aria-live update.
- Components and interactive elements are not accessible for keyboard users.

### When not to use

- For low-traffic pages, such as super-user only admin pages, use a loading spinner instead.
- For a tiny, inline action or feedback, e.g. clicked a button and the action will take time, use the [ProgressIndicator](/uilib/components/progress-indicator) instead (animation).
- For fast processes that takes less than `300ms`, consider the [ProgressIndicator](/uilib/components/progress-indicator) or no loading state at all.
- For a background process or a long-running process, e.g. importing data or exporting reports, use the [ProgressIndicator](/uilib/components/progress-indicator) instead (percentage).

### When to use

- Use on high-traffic pages and landing pages, if they require a loading state.
- Use when there’s more than one element loading at the same time that requires an indicator.
- Use when the process would take more than `300ms` to load on an average internet connection.
- Use the Skeleton component when the [ProgressIndicator](/uilib/components/progress-indicator) is not prominent enough.

### How to use

You can use the Skeleton component as a provider for all underlaying components, like inputs and buttons. This way, you can simply toggle on and off the skeletons. And all the spacing and sizing will be given form the components itself.

But you can also use the Skeleton component to show a fake article or other figures.

### How it works

Every Eufemia component should support a skeleton natively. But for simplification, you can use the Skeleton component as a provider, so enable the skeletons for a group of components.

If you use the skeleton as a provider, the [Space](/uilib/components/space) component is used as a wrapper. This wrapper also serves the underlaying components to define the style type or animation. If only the defaults are used, then you can skip it by setting the element to false `element={false}`.

But the Skeleton component also supports a set of ready to use figures. Use it like `figure="article"`.

```jsx
<App>
  ...
  <Skeleton show={true}>
    ...
    <Input>I'm hidden behind the skeleton</Input>
    <Input>I'm hidden behind the skeleton</Input>
    ...
  </Skeleton>
  ...
</App>
```

### Global Provider

You can also use the global [Eufemia Provider](/uilib/usage/customisation/provider) to enable the underlaying skeletons. You can even have multiple providers wrapped.

```jsx
<Provider locale="nb-NO">
  <App>
    ...
    <Provider skeleton={true}>
      ...
      <Input>I'm hidden behind the skeleton</Input>
      <Input>I'm hidden behind the skeleton</Input>
      ...
    </Provider>
    ...
  </App>
</Provider>
```

### Exclude a part

You can easily exclude a part from being transformed to a skeleton by using `Skeleton.Exclude`.

```jsx
<Skeleton show={true}>
  <Input>I'm hidden behind the skeleton</Input>

  <Skeleton.Exclude>
    <Input>I'm NOT hidden</Input>
  </Skeleton.Exclude>
</Skeleton>
```

### Suspense

You can take advantage of an async component by using the React Suspense with a skeleton fallback.

```jsx
...
<Suspense
  fallback={
    <Skeleton show={true}>
      <UserData />
    </Skeleton>
  }
>
  <UserData />
</Suspense>
...
```

### Create custom skeleton

In order to create the same skeletons as the build-ins, you can make use of a couple of helper tools.

```jsx
import EufemiaContext from '@dnb/eufemia/shared/Context'
import {
  skeletonDOMAttributes,
  createSkeletonClass
} from '@dnb/eufemia/components/skeleton/SkeletonHelper'

function Component({ className, skeleton = false, ...params } = {}) {
  const context = React.useContext(EufemiaContext)

  // Handle accessibility features
  skeletonDOMAttributes(params, skeleton, context)

  // Handle CSS classes – use either "shape" or "font"
  params.className = createSkeletonClass(
    'shape',
    skeleton,
    context,
    className
  )

  return <my-component {...params} />
}
```
