---
draft: true
---

| Properties           | Description                                                                                                                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                 | _(optional)_ the main ID. Defaults to the prop                                                                                                                                                        |
| `title`              | _(optional)_ the title appears as a part of the status content. Use `false` to hide / remove the title and icon. Defaults to `En feil har skjedd`.                                                    |
| `text, children`     | _(optional)_ the text appears as the status content. Beside plain text, You can send in a React component as well. Defaults to `null`.                                                                |
| `items`              | _(optional)_ the items (list items) appears as a part of the status content. You can both use an JSON array, or a vanilla array with a string or an object content. Se **Item Object** example below. |
| `state`              | _(optional)_ defines the visual appearance of the status. These states are supported for now: `error`. The default status is `error`.                                                                 |
| `icon`               | _(optional)_ the icon show before the status title. Defaults to `exclamation`.                                                                                                                        |
| `icon_size`          | _(optional)_ the icon size of the title icon shows. Defaults to `medium`.                                                                                                                             |
| `show`               | _(optional)_ set to `true` to manually make the global status visible. Defaults to `false`.                                                                                                           |
| `autoclose`          | _(optional)_ set to `true` to automatically close the global status if there are no more left items in the provider stack. Defaults to `true`.                                                        |
| `autoscroll`         | _(optional)_ set to `true` to automatically scroll the page to the appeared global status. Defaults to `true`.                                                                                        |
| `no_animation`       | _(optional)_ set to `true` to disable the show/hide/slide/fade/grow/shrink animation. Defaults to `false`.                                                                                            |
| `delay`              | _(optional)_ defines the delay on how long the automated visibility should wait, before it appears to the user. Defaults to `200ms`.                                                                  |
| `hide_close_button`  | _(optional)_ set to `true` if the close button should be hidden for the user. Defaults to `false`.                                                                                                    |
| `close_text`         | _(optional)_ text of the close button. Defaults to `Lukk`.                                                                                                                                            |
| `status_anchor_text` | _(optional)_ defines the anchor text showing up after every item, in case there is a `status_id` defined. Defaults to `Gå til`.                                                                       |

## Item Object

```js
// simple
const items = ['Item #1', 'Item #2']

// advanced
const items = [
  { text: 'Item #1', status_id: 'id-1' },
  { text: 'Item #2', status_id: 'id-2', status_anchor_url: 'https://' }
]
```

| Advanced Item Properties | Description                                                                                                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `text`                   | _(required)_ the text appears as the status content. Beside plain text, You can send in a React component as well.                                                                   |
| `status_id`              | _(required)_ defines an unique ID so the message can be either updated or removed individual.                                                                                        |
| `status_anchor_url`      | _(optional)_ Use `status_anchor_url="true"` to enable the go to link, defined as a url hash using the `status_id`. Or provide it with an actual url: `status_anchor_url="https://"`. |
| `status_anchor_text`     | _(optional)_ defines the anchor text showing up after every item. Defaults to `Gå til`.                                                                                              |

## Controllers

In React You can make use of the helper components, the function as a kind of a controller component.
The goal is to update the content (properties/events) of the target GlobalStatus.

```jsx
// Place the status where ever You have to
<GlobalStatus id="custom-id" />

// Update the status later on. Every property is optional
<GlobalStatus.Add id="custom-id" status_id="status-1" item="Item #1" text="New Text" />
<GlobalStatus.Add id="custom-id" status_id="status-2" item="Item #2" title="New Titel" />
<GlobalStatus.Add id="custom-id" status_id="status-3" item="Item #3" />

// Later You can remove a resolved item
<GlobalStatus.Remove id="custom-id" status_id="status-3" />
```

| Controller Properties | Description                                                                                                                                                                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                  | _(optional)_ the main ID. Defaults to the prop `main`.                                                                                                                                                                                   |
| `status_id`           | _(optional)_ define a new stack ID so You can remove it with the same ID later on. Defaults to `null`.                                                                                                                                   |
| `remove_on_unmount`   | _(optional)_ set to `true` if You want that the component `<GlobalStatus.Add remove_on_unmount="true" ... />` should automatically remove the stacked status from the target **GlobalStatus** on component unmount. Defaults to `false`. |
