---
title: 'Field.MultiSelection'
description: '`Field.MultiSelection` is a component for selecting between a fixed set of options using checkboxes or similar, that will produce a value in the form of an array containing the values of selected options. This field accepts structured data with objects containing `value` and `title` properties.'
version: 11.6.1
generatedAt: 2026-06-15T12:17:01.870Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.MultiSelection

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.MultiSelection />)
```

## Description

`Field.MultiSelection` is a component for selecting multiple items from a fixed set with a confirmation flow. The selection interface appears in a popover overlay, keeping your form layout clean.

There is a corresponding [Value.MultiSelection](/uilib/extensions/forms/Value/MultiSelection) component.

This is ideal when users need to:

1. Browse and filter through many options.
2. See their selections clearly before confirming.
3. Cancel and discard changes without applying them.
4. Work with structured data beyond simple strings.

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'

const data = [
  {
    value: 'option1',
    title: 'Option 1',
    text: 'Text',
    description: 'Description',
  },
  { value: 'option2', title: 'Option 2', text: 'Text' },
  { value: 'option3', title: 'Option 3', description: 'Description' },
]

render(
  <Field.MultiSelection
    label="Select items"
    data={data}
    showSearchField
    showSelectedTags
  />
)
```

## Using with dataPath

You can also use the `dataPath` property to provide the data from the Form context:

```jsx
import { Field, Form } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler
    data={{
      myItems: [
        { value: 'oslo', title: 'Oslo', text: 'Capital of Norway' },
        {
          value: 'stockholm',
          title: 'Stockholm',
          text: 'Capital of Sweden',
        },
        {
          value: 'copenhagen',
          title: 'Copenhagen',
          text: 'Capital of Denmark',
        },
      ],
    }}
  >
    <Field.MultiSelection
      label="Select cities"
      dataPath="/myItems"
      showSearchField
      showSelectedTags
    />
  </Form.Handler>
)
```

## Features

### Popover Interface

The selection interface appears in a popover overlay, keeping your form clean and maintaining focus on the current field. Click the trigger button to open the selection interface, showing the search field, items list, and action buttons.

### Selected Items Display

Shows currently selected items as removable tags when `showSelectedTags` is enabled.

### Collapsible Selected Items (`selectedItemsCollapsibleThreshold`)

When `showSelectedTags` is enabled and the **total number of available items** exceeds `selectedItemsCollapsibleThreshold` (default: `20`), the selected items are hidden by default and a collapsible header appears with two controls:

- **Toggle button**: Shows the count of selected items relative to the total (e.g. _"22 of 30 selected"_) with a rotating chevron icon. Announces its state to screen readers via `aria-expanded`. Click to expand or collapse the tag list.
- **Clear all button**: A tertiary button with a close icon that deselects all items at once. Hidden when nothing is selected.

The tag list expands and collapses with a smooth height animation.

Set `selectedItemsCollapsibleThreshold` to a custom number to control when the collapsible header kicks in:

```jsx
<Field.MultiSelection
  showSelectedTags
  selectedItemsCollapsibleThreshold={10}
  {/* ... */}
/>
```

### Search Functionality

When `showSearchField` is enabled, users can filter through items by typing in the search field. The filtering applies to both the item title and text and description.

### Item Details

Each item can include optional `text` and `description` content below the main title. `text` renders as black primary lines, while `description` renders as grey secondary lines.

### Disabled Items

Individual items can be disabled by setting their `disabled` property to `true`.

### Confirmation Flow

When `showConfirmButton` is enabled, users must click "Confirm selection" to apply changes, or "Cancel" to discard them without modifying the form value.

## Accessibility

### Keyboard interaction

| Key               | Behavior                                                                                                                                            |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Enter` / `Space` | Opens or closes the popover when the trigger button is focused. Toggles an item when a checkbox is focused.                                         |
| `ArrowDown`       | When the trigger is focused: opens the popover and moves focus to the first checkbox. When inside the popover: moves focus to the next checkbox.    |
| `ArrowUp`         | When the trigger is focused: opens the popover and moves focus to the last checkbox. When inside the popover: moves focus to the previous checkbox. |
| `Escape`          | Closes the popover and discards any pending changes (same as Cancel).                                                                               |
| `Tab`             | Moves focus through the interactive elements inside the popover (search field, checkboxes, confirm/cancel buttons).                                 |

### Screen reader announcements

- The trigger button exposes the current selection count via `aria-describedby`. Screen readers will read e.g. _"2 of 5 selected"_ when the button receives focus.
- After each checkbox toggle (or tag removal), a live region (`aria-live="assertive"`) announces the updated count, e.g. _"3 of 5 selected"_. This announcement does not fire when the popover is closed via Cancel, since changes are discarded.
- The trigger button uses `role="combobox"` with `aria-haspopup="listbox"` so assistive technologies describe it as a combobox that opens a list.
- Each checkbox announces its own checked/unchecked state natively. No duplicate descriptions are added.
- Nested item groups are rendered as sibling `<ul>` elements after their parent `<li>`, so assistive technologies announce them as a new list level (e.g. _"list, 3 items, level 2"_).

### Focus management

- Opening the popover with the mouse moves focus to the popover content area so arrow-key navigation works immediately.
- Opening the popover with `ArrowDown` moves focus directly to the first checkbox; `ArrowUp` moves focus to the last checkbox.
- During keyboard navigation inside the popover, the focused item is automatically scrolled into view.
- Closing the popover (confirm, cancel, or Escape) returns focus to the trigger button.

### Semantic structure

- The item list is rendered as a `<ul>` with each option as an `<li>`, giving assistive technologies correct list semantics.
- Nested item groups use a child `<ul>` inside the parent `<li>`.
- The field label is linked to the trigger button via a `<label for="…">` relationship provided by `FieldBlock`.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=61839-11710&t=oe60OMkAhyFE8eje-4)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/MultiSelection)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/MultiSelection)


## Demos

### Basic


```tsx
const cities = [{
  value: 'oslo',
  title: 'Oslo',
  description: 'Capital of Norway'
}, {
  value: 'stockholm',
  title: 'Stockholm',
  description: 'Capital of Sweden'
}, {
  value: 'copenhagen',
  title: 'Copenhagen',
  description: 'Capital of Denmark'
}, {
  value: 'helsinki',
  title: 'Helsinki',
  description: 'Capital of Finland'
}, {
  value: 'reykjavik',
  title: 'Reykjavik',
  description: 'Capital of Iceland'
}];
render(<Field.MultiSelection label="Select cities" data={cities} />);
```


### With Select all

This example uses field width `medium`.


```tsx
const cities = [{
  value: 'oslo',
  title: 'Oslo',
  text: 'Capital of Norway'
}, {
  value: 'stockholm',
  title: 'Stockholm',
  text: 'Capital of Sweden'
}, {
  value: 'copenhagen',
  title: 'Copenhagen',
  text: 'Capital of Denmark'
}, {
  value: 'helsinki',
  title: 'Helsinki',
  text: 'Capital of Finland'
}, {
  value: 'reykjavik',
  title: 'Reykjavik',
  text: 'Capital of Iceland'
}];
render(<Field.MultiSelection label="Select cities" data={cities} showSelectAll width="medium" />);
```


### With search


```tsx
render(<Field.MultiSelection label="Select fruits" data={fruits} showSearchField />);
```


### With confirm and cancel


```tsx
const cities = [{
  value: 'oslo',
  title: 'Oslo',
  text: 'Capital of Norway'
}, {
  value: 'stockholm',
  title: 'Stockholm',
  text: 'Capital of Sweden'
}, {
  value: 'copenhagen',
  title: 'Copenhagen',
  text: 'Capital of Denmark'
}, {
  value: 'helsinki',
  title: 'Helsinki',
  text: 'Capital of Finland'
}, {
  value: 'reykjavik',
  title: 'Reykjavik',
  text: 'Capital of Iceland'
}];
render(<Field.MultiSelection label="Select cities" data={cities} showSearchField showSelectAll showConfirmButton />);
```


### With nested items


```tsx
render(<Field.MultiSelection label="Select regions" showSelectAll data={[{
  value: 'scandinavia',
  title: 'Scandinavia',
  children: [{
    value: 'oslo',
    title: 'Oslo',
    text: 'Capital of Norway'
  }, {
    value: 'stockholm',
    title: 'Stockholm',
    text: 'Capital of Sweden'
  }, {
    value: 'copenhagen',
    title: 'Copenhagen',
    text: 'Capital of Denmark'
  }]
}, {
  value: 'nordic',
  title: 'Other Nordic',
  children: [{
    value: 'helsinki',
    title: 'Helsinki',
    text: 'Capital of Finland'
  }, {
    value: 'reykjavik',
    title: 'Reykjavik',
    text: 'Capital of Iceland'
  }]
}]} />)
```


### With selected item tags


```tsx
const cities = [{
  value: 'oslo',
  title: 'Oslo',
  text: 'Capital of Norway'
}, {
  value: 'stockholm',
  title: 'Stockholm',
  text: 'Capital of Sweden'
}, {
  value: 'copenhagen',
  title: 'Copenhagen',
  text: 'Capital of Denmark'
}, {
  value: 'helsinki',
  title: 'Helsinki',
  text: 'Capital of Finland'
}, {
  value: 'reykjavik',
  title: 'Reykjavik',
  text: 'Capital of Iceland'
}];
render(<Field.MultiSelection label="Select cities" data={cities} value={['stockholm']} showSelectedTags />);
```


### With many selected items

When `showSelectedTags` is enabled and the number of items exceeds the `selectedItemsCollapsibleThreshold` (default: `10`), an accordion appears to collapse/expand the selected items. A "Clear all" button also appears to the right for quickly deselecting all items.


```tsx
const items = Array.from({
  length: 30
}, (_, i) => ({
  value: `item${i + 1}`,
  title: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`
}));
render(<Field.MultiSelection label="Select items" data={items} value={items.slice(0, 25).map(item => item.value)} showSelectedTags showSelectAll showSearchField />);
```


### With disabled items


```tsx
render(<Field.MultiSelection label="Select available languages" data={[{
  value: 'nodejs',
  title: 'Node.js',
  text: 'JavaScript runtime'
}, {
  value: 'python',
  title: 'Python',
  text: 'General purpose language',
  disabled: true
}, {
  value: 'rust',
  title: 'Rust',
  text: 'Systems programming language'
}, {
  value: 'golang',
  title: 'Go',
  text: 'Compiled language',
  disabled: true
}, {
  value: 'java',
  title: 'Java',
  text: 'Enterprise language'
}]} />)
```


### Inline variant

The `inline` variant renders the item list inline without a popover. This is useful when you want the options to be always visible.


```tsx
const cities = [{
  value: 'oslo',
  title: 'Oslo'
}, {
  value: 'stockholm',
  title: 'Stockholm'
}, {
  value: 'copenhagen',
  title: 'Copenhagen'
}, {
  value: 'helsinki',
  title: 'Helsinki'
}, {
  value: 'reykjavik',
  title: 'Reykjavik'
}];
render(<Field.MultiSelection label="Select cities" variant="inline" value={['stockholm']} data={cities} showSelectAll showSearchField showSelectedTags />);
```


### Using dataPath from Form context


```tsx
render(<Form.Handler data={{
  colors: [{
    value: 'red',
    title: 'Red',
    text: 'Primary color'
  }, {
    value: 'green',
    title: 'Green',
    text: 'Secondary color'
  }, {
    value: 'blue',
    title: 'Blue',
    text: 'Tertiary color'
  }, {
    value: 'yellow',
    title: 'Yellow',
    text: 'Accent color'
  }]
}}>
      <Field.MultiSelection label="Select colors" dataPath="/colors" value={['red']} help={{
    title: 'Help text',
    content: 'Additional information about this field'
  }} />
    </Form.Handler>)
```


### Disabled field


```tsx
const cities = [{
  value: 'oslo',
  title: 'Oslo',
  text: 'Capital of Norway'
}, {
  value: 'stockholm',
  title: 'Stockholm',
  text: 'Capital of Sweden'
}, {
  value: 'copenhagen',
  title: 'Copenhagen',
  text: 'Capital of Denmark'
}, {
  value: 'helsinki',
  title: 'Helsinki',
  text: 'Capital of Finland'
}, {
  value: 'reykjavik',
  title: 'Reykjavik',
  text: 'Capital of Iceland'
}];
render(<Field.MultiSelection label="Disabled field" disabled data={cities} />);
```


### With minimum required items


```tsx
const cities = [{
  value: 'oslo',
  title: 'Oslo',
  text: 'Capital of Norway'
}, {
  value: 'stockholm',
  title: 'Stockholm',
  text: 'Capital of Sweden'
}, {
  value: 'copenhagen',
  title: 'Copenhagen',
  text: 'Capital of Denmark'
}, {
  value: 'helsinki',
  title: 'Helsinki',
  text: 'Capital of Finland'
}, {
  value: 'reykjavik',
  title: 'Reykjavik',
  text: 'Capital of Iceland'
}];
render(<Form.Handler>
          <Form.Card>
            <Field.MultiSelection label="Select cities" path="/cities" required minItems={2} data={cities} showSearchField showSelectedTags />
            <Form.SubmitButton />
          </Form.Card>
        </Form.Handler>);
```

## Properties

### Field-specific properties


```json
{
  "props": {
    "variant": {
      "doc": "Defines the variant of the component. `popover` renders a trigger button that opens a popover with the item list. `inline` renders the item list inline as checkboxes.",
      "type": [
        "\"popover\"",
        "\"inline\""
      ],
      "status": "optional"
    },
    "data": {
      "doc": "Array of objects where each object contains at least `value` and `title`. Can also include `text` for an optional primary extra line, `description` for an optional secondary grey line, plus `disabled`, `help`, and `className`.",
      "type": [
        "Array<{ value, title, text?: ReactNode, description?: ReactNode, disabled?, ... }>"
      ],
      "status": "optional"
    },
    "dataPath": {
      "doc": "Path to data in Form.Handler context. The context data array should contain objects with `value` and `title` properties.",
      "type": [
        "string"
      ],
      "status": "optional"
    },
    "showSearchField": {
      "doc": "Show a search/filter input field to search through items.",
      "type": [
        "boolean"
      ],
      "status": "optional"
    },
    "showSelectAll": {
      "doc": "Show a \"Select all\" checkbox at the top of the list.",
      "type": [
        "boolean"
      ],
      "status": "optional"
    },
    "showSelectedTags": {
      "doc": "Show selected items as removable tags inside the popover. When enabled and nothing is selected, a placeholder text is shown.",
      "type": [
        "boolean"
      ],
      "status": "optional"
    },
    "showConfirmButton": {
      "doc": "Show confirm and cancel buttons at the bottom of the popover. Selections are only applied when the user confirms.",
      "type": [
        "boolean"
      ],
      "status": "optional"
    },
    "selectedItemsCollapsibleThreshold": {
      "doc": "When the number of selected items exceeds this threshold, the selected items are hidden by default and can be toggled with a header.",
      "type": [
        "number"
      ],
      "status": "optional"
    },
    "minItems": {
      "doc": "Minimum number of items required to be selected. Triggers a validation error if fewer items are selected.",
      "type": [
        "number"
      ],
      "status": "optional"
    },
    "maxItems": {
      "doc": "Maximum number of items allowed to be selected. Triggers a validation error if more items are selected.",
      "type": [
        "number"
      ],
      "status": "optional"
    },
    "width": {
      "doc": "The width of the component. Supported values: `\"medium\"` and `\"large\"`. Defaults to `\"large\"`.",
      "type": [
        "\"medium\"",
        "\"large\""
      ],
      "status": "optional"
    }
  },
  "showDefaultValue": true
}
```


### General properties

```ts
type MultiSelectionItem = {
  value: number | string
  title: ReactNode
  text?: ReactNode
  description?: ReactNode
  disabled?: boolean
  children?: Array<MultiSelectionItem> // Optional nested items for grouping
}
```


```json
{
  "props": {
    "value": {
      "doc": "Source data value for the field. Will take precedence over the path value given in the data context.",
      "type": "Array<MultiSelectionItem>",
      "status": "optional"
    },
    "defaultValue": {
      "doc": "Default source data value for the field. Will not take precedence over the path value given in the data context.",
      "type": "Array<MultiSelectionItem>",
      "status": "optional"
    },
    "path": {
      "doc": "JSON Pointer for where the data for the field is located in the source dataset (when using Form.Handler or DataContext). The `path` will also be set as the `name` attribute for the [string](/uilib/extensions/forms/base-fields/String/)-field.",
      "type": "string",
      "status": "optional"
    },
    "info": {
      "doc": "Info message shown below / after the field by default. Use `statusPosition=\"above\"` to show status messages above the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`.",
      "type": [
        "React.ReactNode",
        "Array<React.ReactNode>",
        "function"
      ],
      "status": "optional"
    },
    "warning": {
      "doc": "Warning message shown below / after the field by default. Use `statusPosition=\"above\"` to show status messages above the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`.",
      "type": [
        "React.ReactNode",
        "Array<React.ReactNode>",
        "function"
      ],
      "status": "optional"
    },
    "error": {
      "doc": "Error message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`.",
      "type": [
        "Error",
        "FormError",
        "Array<Error | FormError>",
        "function"
      ],
      "status": "optional"
    },
    "disabled": {
      "doc": "Set `true` to show the field but without the possibility of changing the value.",
      "type": "boolean",
      "status": "optional"
    },
    "emptyValue": {
      "doc": "The value to use (in `onChange` events etc) when emptying the field. Makes it possible for instance to provide `undefined` instead of an empty string when clearing the content of a text input.",
      "type": [
        "Array<MultiSelectionItem>",
        "undefined"
      ],
      "status": "optional"
    },
    "required": {
      "doc": "When set to `true`, the field will give an error if the value fails the required validation. When set to `false`, the field will not be required, but will add a \"(optional)\" suffix to the label.",
      "type": "boolean",
      "status": "optional"
    },
    "labelSuffix": {
      "doc": "Will append an additional text to the label, like \"(optional)\". When using `inheritLabel`, the suffix will not be inherited. **NB:** The visual appearance of the `labelSuffix` may change in the future.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "schema": {
      "doc": "Custom JSON Schema for validating the value.",
      "type": "object",
      "status": "optional"
    },
    "validateInitially": {
      "doc": "Set to `true` to show validation based errors initially (from given value-property or source data) before the user interacts with the field.",
      "type": "boolean",
      "status": "optional"
    },
    "validateUnchanged": {
      "doc": "Set to `true` to show validation based errors when the field is touched (like focusing a field and blurring) without having changed the value. Since the user did not introduce a new error, this will apply when the value was initially invalid based on validation.",
      "type": "boolean",
      "status": "optional"
    },
    "validateContinuously": {
      "doc": "Set to `true` to show validation based errors continuously while writing, not just when blurring the field.",
      "type": "boolean",
      "status": "optional"
    },
    "errorMessages": {
      "doc": "Custom error messages for each type of error, overriding default messages. The messages can be a `React.ReactNode` or a string.",
      "type": "object",
      "status": "optional"
    },
    "onChangeValidator": {
      "doc": "Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered on every change done by the user, and runs during form submit by default. The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }. Use `withValidatorOptions(validator, { runOnSubmit: 'never' })` to keep it from running during form submit, or `'when-changed'` to run it only when the value has changed since the validator last ran. Object and array values are compared by reference.",
      "type": "function",
      "status": "optional"
    },
    "onBlurValidator": {
      "doc": "Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown), and runs during form submit by default. The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }. Use `withValidatorOptions(validator, { runOnSubmit: 'never' })` to keep it from running during form submit, or `'when-changed'` to run it only when the value has changed since the validator last ran. Object and array values are compared by reference.",
      "type": "function",
      "status": "optional"
    },
    "transformIn": {
      "doc": "Transforms the `value` before it's displayed in the field (e.g. input).",
      "type": "function",
      "status": "optional"
    },
    "transformOut": {
      "doc": "Transforms the value before it gets forwarded to the form data object (context) or returned as the `onChange` value parameter. The first parameter is the internal value. Some fields do support a second parameter, like the SelectCountry, where the country object is given.",
      "type": "function",
      "status": "optional"
    },
    "label": {
      "doc": "Label text displayed above the field. Most fields already have a default label, so check the field translations for an existing label entry. Only set `label` when you need to override the default.",
      "type": "string",
      "status": "optional"
    },
    "labelDescription": {
      "doc": "A more discreet text displayed beside the label (e.g. \"(optional)\").",
      "type": "string",
      "status": "optional"
    },
    "labelDescriptionInline": {
      "doc": "If `true`, the `labelDescription` will be displayed on the same line as the label.",
      "type": "boolean",
      "status": "optional"
    },
    "labelSrOnly": {
      "doc": "Use `true` to make the label only readable by screen readers.",
      "type": "boolean",
      "status": "optional"
    },
    "labelSize": {
      "doc": "Define the font-size of the label based on the [font-size](/uilib/typography/font-size/) table.",
      "type": [
        "\"medium\"",
        "\"large\""
      ],
      "status": "optional"
    },
    "help": {
      "doc": "Provide help content for the field using `title` and `content` as a string or `React.ReactNode`. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, set `outset` to `false` to display the help text inline (inset) instead of the default outset behavior, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",
      "type": "object",
      "status": "optional"
    },
    "hideHelpButton": {
      "doc": "Set `true` when you render the inline help button outside the label (e.g. inside a checkbox suffix) so FieldBlock skips drawing the default label help button.",
      "type": "boolean",
      "status": "optional"
    },
    "statusPosition": {
      "doc": "Controls where status messages (`error`, `warning`, `information`) are visually shown. Use `below` (default) or `above`.",
      "type": [
        "\"below\"",
        "\"above\""
      ],
      "status": "optional"
    },
    "layout": {
      "doc": "Layout for the label and input. Can be `horizontal` or `vertical`.",
      "type": [
        "\"horizontal\"",
        "\"vertical\""
      ],
      "status": "optional"
    },
    "layoutOptions": {
      "doc": "Use this to set additional options for the `horizontal` layout, e.g. `{ width: \"medium\" }`. You can also use a custom width `{number}rem`. Instead of a width, you can use a min/max width, e.g. `{ minWidth: \"6rem\", maxWidth: \"12rem\" }`.",
      "type": "object",
      "status": "optional"
    },
    "width": {
      "doc": "Will set the width for the whole block. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",
      "type": [
        "string",
        "false"
      ],
      "status": "optional"
    },
    "contentWidth": {
      "doc": "Will set the width for its contents. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",
      "type": [
        "string",
        "false"
      ],
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
  },
  "omit": [
    "width",
    "contentWidth"
  ],
  "valueType": "Array<MultiSelectionItem>"
}
```


## Translations


```json
{
  "locales": [
    "da-DK",
    "en-GB",
    "nb-NO",
    "sv-SE"
  ],
  "entries": {
    "Field.errorPattern": {
      "nb-NO": "Du må skrive inn en gyldig verdi.",
      "en-GB": "You must enter a valid value.",
      "sv-SE": "Du måste ange ett giltigt värde.",
      "da-DK": "Du skal indtaste en gyldig værdi."
    },
    "Field.errorRequired": {
      "nb-NO": "Dette feltet må fylles ut.",
      "en-GB": "This field is required.",
      "sv-SE": "Detta fält måste fyllas i.",
      "da-DK": "Dette felt skal udfyldes."
    },
    "Field.errorSummary": {
      "nb-NO": "Feil som må rettes:",
      "en-GB": "Please correct the following errors:",
      "sv-SE": "Fel som måste åtgärdas:",
      "da-DK": "Felter der skal rettes:"
    },
    "Field.errorSummaryTitle": {
      "nb-NO": "Feil som må rettes",
      "en-GB": "Please correct the following errors",
      "sv-SE": "Fel som måste åtgärdas",
      "da-DK": "Felter der skal rettes"
    },
    "Field.optionalLabelSuffix": {
      "nb-NO": "(valgfritt)",
      "en-GB": "(optional)",
      "sv-SE": "(valfritt)",
      "da-DK": "(valgfrit)"
    },
    "Field.stateSummary": {
      "nb-NO": "Oppsummering:",
      "en-GB": "Summary:",
      "sv-SE": "Sammanfattning:",
      "da-DK": "Oversigt:"
    },
    "MultiSelectionField.cancelButton": {
      "nb-NO": "Avbryt",
      "en-GB": "Cancel",
      "sv-SE": "Avbryt",
      "da-DK": "Annuller"
    },
    "MultiSelectionField.clearAll": {
      "nb-NO": "Fjern alle",
      "en-GB": "Clear all",
      "sv-SE": "Rensa alla",
      "da-DK": "Ryd alt"
    },
    "MultiSelectionField.confirmButton": {
      "nb-NO": "Bekreft ({count} valgt)",
      "en-GB": "Confirm ({count} selected)",
      "sv-SE": "Bekräfta ({count} valda)",
      "da-DK": "Bekræft ({count} valgt)"
    },
    "MultiSelectionField.errorMaxItems": {
      "nb-NO": "Du kan ikke velge mer enn {maxItems}.",
      "en-GB": "You cannot select more than {maxItems} items.",
      "sv-SE": "Du kan inte välja fler än {maxItems}.",
      "da-DK": "Du kan ikke vælge mere end {maxItems}."
    },
    "MultiSelectionField.errorMinItems": {
      "nb-NO": "Du må velge minst {minItems}.",
      "en-GB": "You must select at least {minItems} items.",
      "sv-SE": "Du måste välja minst {minItems}.",
      "da-DK": "Du skal vælge mindst {minItems}."
    },
    "MultiSelectionField.noOptions": {
      "nb-NO": "Ingen alternativer",
      "en-GB": "No options",
      "sv-SE": "Inga alternativ",
      "da-DK": "Ingen muligheder"
    },
    "MultiSelectionField.placeholder": {
      "nb-NO": "Velg en eller flere",
      "en-GB": "Select one or more",
      "sv-SE": "Välj en eller flera",
      "da-DK": "Vælg en eller flere"
    },
    "MultiSelectionField.searchPlaceholder": {
      "nb-NO": "Søk...",
      "en-GB": "Search...",
      "sv-SE": "Sök...",
      "da-DK": "Søg..."
    },
    "MultiSelectionField.selectAll": {
      "nb-NO": "Velg alle",
      "en-GB": "Select all",
      "sv-SE": "Välj alla",
      "da-DK": "Vælg alle"
    },
    "MultiSelectionField.selectionCount": {
      "nb-NO": "{count} av {total} valgt",
      "en-GB": "{count} of {total} selected",
      "sv-SE": "{count} av {total} valda",
      "da-DK": "{count} af {total} valgt"
    }
  }
}
```

## Events


```json
{
  "props": {
    "onChange": {
      "doc": "Will be called on value changes made by the user, with the new value as argument. When an `async` function is used, the corresponding [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) will show an indicator on the field label. You can return `{ success: 'saved' } as const` to show a success symbol, or an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const`. The second parameter is an object that e.g. contains `properties` (all given `Field.*` properties).",
      "type": "(value) => void",
      "status": "optional"
    },
    "onFocus": {
      "doc": "Will be called when the component gets into focus. Like clicking inside a text input or opening a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `properties` (all given `Field.*` properties).",
      "type": "(value) => void",
      "status": "optional"
    },
    "onBlur": {
      "doc": "Will be called when the component stops being in focus. Like when going to next field, or closing a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `properties` (all given `Field.*` properties).",
      "type": "(value) => void",
      "status": "optional"
    },
    "onStatusChange": {
      "doc": "Called whenever the status messages (info, warning or error) gets visible or changes. Receives the current `{ info, warning, error }` object.",
      "type": "({ info?, warning?, error? }: FieldStatus) => void",
      "status": "optional"
    }
  }
}
```
