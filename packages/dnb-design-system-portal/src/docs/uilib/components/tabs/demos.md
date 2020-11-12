---
showTabs: true
---

import {
TabsExampleContentObject,
TabsExampleScrollable,
TabsExampleLeftAligned,
TabsExampleUsingData,
TabsExampleRightAligned,
TabsExampleReachRouterNavigation,
TabsExampleReactRouterNavigation,
} from 'Pages/uilib/components/tabs/Examples'

## Demos

### Tabs using 'data' property and content object

<TabsExampleContentObject />

### Tabs using 'data' property only

<TabsExampleUsingData />

### Tabs using React Components only

<TabsExampleLeftAligned />

### Right aligned tabs

<TabsExampleRightAligned />

### Tabs optimized for mobile

Depending on your setup, you may have to align your Tabs all the way to the edge of the browser window. E.g. with a negative margin:

```css
@media screen and (min-width: 40em) {
  .dnb-tabs .dnb-tabs__tabs {
    margin: 0 -4rem;
  }
}
```

<TabsExampleScrollable />

### Router navigation with Reach Router

This demo uses `@reach/router`. More [examples on CodeSandbox](https://codesandbox.io/embed/8z8xov7xyj).

<TabsExampleReachRouterNavigation />

### Router navigation with react-router-dom

This demo uses `react-router-dom`. More [examples on CodeSandbox](https://codesandbox.io/embed/8z8xov7xyj).

<TabsExampleReactRouterNavigation />

## Example Content

```jsx
const exampleContent = {
  first: () => <h2 className="dnb-h--large">First</h2>,
  second: () => <Input label="Label:">Focus me with next Tab key</Input>,
  third: () => (
    <>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
    </>
  ),
  fourth: 'Fourth as a string only'
}
```
