---
showTabs: true
---

## Description

The step indicator (progress indicator) is a visual representation of a user's progress through a set of steps or series of actions. Their purpose is to both guide the user through the process and to help them create a mental model of the amount of time and effort that is required to fulfill the process.

If the user should be able to navigate back and forth, use the `mode="loose"` property. More about the modes further down.

The current active step is set with the `current_step` property or within the data with the `is_current` object property.

**NB:** Ensure, when ever possible, to bind the `current_step` to the browsers path location. See the [example above](/uilib/components/step-indicator/#stepindicator-with-a-router) or [the example on CodeSandbox](https://codesandbox.io/s/eufemia-step-indicator-with-reach-router-mhu0bh?file=/src/App.tsx).

## Sidebar

The StepIndicator has two layouts. One for larger screens (above [medium](/uilib/usage/layout/media-queries#media-queries-properties-table)) and one for more narrow screens (below [medium](/uilib/usage/layout/media-queries#media-queries-properties-table)).

Depending on the screen width, the component will hide the Sidebar responsively, and in return show a button to access all the steps inside a [Drawer](/uilib/components/modal/drawer). You may have a [look at an demo](/uilib/components/step-indicator/#stepindicator-in-loose-mode).

### Why a sidebar?

In order to provide a user experience, where the number of steps are almost unlimited, and at the same time, make these steps as accessible as possible, the solution was to provide the steps side-by-side the content, as long as there is enough available room for it to show properly.

### How to use the sidebar?

The step indicator has an optional Sidebar "sister" component you can place in your layout if the steps should be shown side-by-side to the content. Use the property `sidebar_id` to bind these two together:

```jsx
<main>
  <StepIndicator sidebar_id="unique-id" mode="strict" data={[...]} />
</main>

<aside>
  <StepIndicator.Sidebar sidebar_id="unique-id" />
</aside>
```

#### Sidebar and SSR

**NB:** Keep in mind, if you SSR render the Sidebar **before** the main component, it has no access to the `data` and will show a basic skeleton to ensure the sidebar gets its width. This helps to lower the impact of unwanted layout shifts.

If you are able to provide the `data` to the Sidebar as well, it will use it during SSR render. You also can provide the data with a wrapper Eufemia Provider (You can nest Eufemia Providers):

```jsx
<Provider StepIndicator={{ data: [...] }}>
  <main>
    <StepIndicator sidebar_id="unique-id" mode="strict" />
  </main>

  <aside>
    <StepIndicator.Sidebar sidebar_id="unique-id" />
  </aside>
</Provider>
```

## Modes

The mode property is mandatory. It tells the component how it should behave.

- [strict](/uilib/components/step-indicator#strict-mode)
- [loose](/uilib/components/step-indicator#loose-mode)
- [static](/uilib/components/step-indicator#static-mode)

### Strict mode

Use `strict` for a chronological step order.

The user can navigate between the visited steps and the current step. The component keeps track of these reached steps.

### Loose mode

Use `loose` if the user should be able to navigate freely between all steps. Also, those which are not visited before.

### Static mode

Use `static` for non-interactive steps.

## Modify a step

You can easily modify a step – e.g. should one step not be interactive, you can use the `inactive` property on that step:

```js
const steps = [
  { title: 'Active' },
  { title: 'Not active', inactive: true },
]
```

More details about modifying steps in the [properties panel](/uilib/components/step-indicator/properties#steps-parameters).

## How wide should the sidebar be?

The sidebar comes with these styles:

```css
.dnb-step-indicator__sidebar {
  max-width: 20rem;
  margin-right: var(--spacing-x-large);
}
.dnb-step-indicator__sidebar .dnb-step-indicator__item {
  min-width: 320px;
}
```

## API changes after version 9.8

The API has been simplified and some properties have to be changed by the next major version release. The changes are made backward compatible. But in order to use the new UX look, you have to make a few changes:

- Add a property called `mode="strict"` (choose your mode)
- Add a property called `sidebar_id` with an unique ID.
- Optional, place `<StepIndicator.Sidebar sidebar_id="unique-step-indicator" />` in your layout.
