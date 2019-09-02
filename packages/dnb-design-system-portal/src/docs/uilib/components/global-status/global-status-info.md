---
draft: true
---

import Examples from 'Pages/uilib/components/global-status/Examples'

## Description

The GlobalStatus is a complex component meant for displaying a global Application notifications or a summary of a form ( displaying form errors, messages etc. ).
By default, the `GlobalStatus` is automatically connected together with the [FormStatus](/uilib/components/form-status) component. This means, that every form component showing a status, will send the status message along to the `GlobalStatus`.

### FormStatus default behavior

1. Once a **FormStatus** is show, the `main` **GlobalStatus** will show up.
1. The page will scroll (if needed) to the dedicated **GlobalStatus**.
1. But the focus will stay on the current place.
1. Screen reader uses will automatically hear the whole content of the `GlobalStatus` once it shows up.

### Several Global statuses

Normally, You only want to have **one** `GlobalStatus` inside Your application. But You can have several in parallel. But make sure You give every other a new ID:

```jsx
<GlobalStatus id="other-global-status" />
```

### Where to put it

- The `GlobalStatus` component should be positioned right under the header. By default, it uses `main` as the ID.
- Or as a secondary summary of errors in a submit form. Keep in mind, by default, form components like [Input](/uilib/components/input) are using the ID `main`. To make sure the build in [FormStatus](/uilib/components/form-status) is sending along the message to another `GlobalStatus`, You have to set the `global_status_id`, like:

```jsx
<Input global_status_id="other-global-status" ... />
```

But You can also make use of the [FormSet](/uilib/components/form-set) or [FormRow](/uilib/components/form-row) (or FormSet) witch will send along the `global_status_id` the underlaying/children components, like:

```jsx
<FormSet global_status_id="other-global-status">...</FormSet>
```

### Manually updates

Beside the automated connection between the error states of form components ([FormStatus](/uilib/components/form-status)), You can update messages from everywhere in Your application on any time:

**NB:** The GlobalStatus will `autoclose` by default, once all messages are removed.

### JavaScript (interceptor situation)

```js
import { GlobalStatus } from 'dnb-ui-lib/components'

// Update the the status like so:
const status = GlobalStatus.Set({
  status_id: 'custom-id-1',
  text: 'New Text',
  item: 'Item from status #1'
})

// 2. and remove it again if needed
status.remove()
```

### JSX

```jsx
import { GlobalStatus } from 'dnb-ui-lib/components'

// 1. Place it under the header bar
<GlobalStatus text="Optional default text" />

// 2. later on, You can show a message
<GlobalStatus.Add
  status_id="custom-id-1"
  title="New title"
  text="First long info text ..."
  item="Item from status #1"
/>

// 3. and remove it again
<GlobalStatus.Remove status_id="custom-id-1" />
```

If You need an additional `GlobalStatus`, define a custom ID (custom-status):

```jsx
import { GlobalStatus } from 'dnb-ui-lib/components'

// 1. Place it somewhere in Your application
<GlobalStatus id="custom-status" />

// 2. later on, You can show a message
<GlobalStatus.Add
  id="custom-status"
  status_id="custom-id-1"
  title="New title"
  text="First long info text ..."
  item="Item from status #1"
/>

// 3. and remove it again
<GlobalStatus.Remove id="custom-status" status_id="custom-id-1" />
```

## Demos

<Examples />
