---
showTabs: true
---

import {
TabsExampleContentOutside,
TabsExampleContentObject,
TabsExampleScrollable,
TabsExampleLeftAligned,
TabsExampleUsingData,
TabsExampleRightAligned,
TabsExampleReachRouterNavigation,
TabsExampleReactRouterNavigation,
TabsNoBorder,
} from 'Docs/uilib/components/tabs/Examples'

## Demos

### Tabs where content is provided from outside

As this may be a more common use case, we still have to ensure our tabs content is linked together with the tabs – because of accessibility.

You have to provide an `id` to both of the components.

**NB:** You don't need to use a function inside `Tabs.Content` – it can contain any element you need, as long as it is a React Node.

<TabsExampleContentOutside />

### Tabs using 'data' property and content object

<TabsExampleContentObject />

### Tabs using 'data' property only

<TabsExampleUsingData />

### Tabs using React Components only

Also, this is an example of how to define a different content background color, by providing `content_style`.

<TabsExampleLeftAligned />

### Right aligned tabs

<TabsExampleRightAligned />

### Tabs optimized for mobile

<TabsExampleScrollable />

**Notes about the mobile view:** The Tabs component does automatically calculate the remaining spacing once the screen gets under `40em` in width.
But depending on your setup, you may have to align your Tabs all the way to the edge of the browser window. E.g. with a negative margin:

```css
@media screen and (min-width: 40em) {
  .dnb-tabs .dnb-tabs__tabs {
    margin: 0 -2rem;
  }
  .dnb-tabs .dnb-tabs__tabs__tablist {
    padding: 0 2rem;
  }
}
```

### Tabs without bottom border

<TabsNoBorder />

### Router navigation with Reach Router

This demo uses `@reach/router`. More [examples on CodeSandbox](https://codesandbox.io/embed/8z8xov7xyj).

<TabsExampleReachRouterNavigation />

### Router navigation with react-router-dom

This demo uses `react-router-dom`. More [examples on CodeSandbox](https://codesandbox.io/embed/8z8xov7xyj).

<TabsExampleReactRouterNavigation />

## Example Content

```jsx
const exampleContent = {
  first: () => <H2>First</H2>,
  second: () => <Input label="Label:">Focus me with next Tab key</Input>,
  third: () => (
    <>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
    </>
  ),
  fourth: 'Fourth as a string only',
}
```
