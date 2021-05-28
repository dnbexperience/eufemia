---
showTabs: true
---

## Description

The step indicator (progress indicator) is a visual representation of a users progress through a set of steps or series of actions. Their purpose is to both guide the user through the process and to help them create a mental model of the amount of time and effort that is required to fulfill the process.

If the user should be able to navigate back and forth, use the `mode="loose"` property. More about the modes further down.

The current active step is set with the `current_step` property or within the data with the `is_current` object property.

## Sidebar

The step indicator has a optionally a Sidebar "sister" component you can place in your layout, if the steps should be shown side-by-side to the content. Use the property `sidebar_id` to bind these two together:

```jsx
<main>
	<StepIndicator sidebar_id="unique-id" mode="strict" />
</main>

<aside>
	<StepIndicator.Sidebar sidebar_id="unique-id" />
</aside>
```

## Modes

The mode property is mandatory. It tells the component how it should behave.

### Strict mode

Use `strict` for a chronological step order.

The user can navigate between visited steps and the current step. The component keeps track of these reached steps.

### Loose mode

Use `loose` if the user should be able to navigate freely between all steps. Also those which are not visited before.

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

## API changes after version 9.8

The API has been simplified and some properties have to be changes by the next major version release. The changes are made backwards compatible. But in order to use the new UX look, you have to make a few changes:

- Add a property called `mode="strict"` (choose your mode)
- Add a property called `sidebar_id` with an unique ID.
- Optional, place `<StepIndicator.Sidebar sidebar_id="unique-step-indicator" />` in your layout.
- URL handling is deprecated and will be removed in v10

The documentation is updated and every property name that will be deprecated is clear marked with a strike-through line. You will get a console warning during development when you use the outdated properties.
