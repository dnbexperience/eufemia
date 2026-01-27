---
title: 'GlobalStatus'
description: 'The GlobalStatus is a complex component meant for displaying global Application notifications or a summary of a form.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.754Z
checksum: 70b3a7985681808c8a626273d279d16fd4df87329bae8bbe924b08aa6f9a3337
---

# GlobalStatus

## Import

```tsx
import { GlobalStatus } from '@dnb/eufemia'
```

## Description

The GlobalStatus is a complex component meant for displaying global application notifications or a summary of a form (displaying form errors, messages, etc.).

By default, the `GlobalStatus` is automatically connected together with the [FormStatus](/uilib/components/form-status) component. This means that every form component showing a status will send the status message along to the `GlobalStatus`.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=22127-18578)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/global-status)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/global-status)

### FormStatus default behavior

1. Once a **FormStatus** is shown, the `main` **GlobalStatus** will show up.
1. The page will scroll (if needed) to the dedicated **GlobalStatus**.
1. Form components will send along both the status text and its label to show a good and accessible summary.
1. Screen reader users will automatically hear the entire content of the `GlobalStatus` once it shows up.

### Several GlobalStatus instances

Normally, you only want to have **one** `GlobalStatus` inside your application. But you can have several in parallel. Make sure you give every other one a new ID:

```tsx
render(<GlobalStatus id="other-global-status" />)
```

### Where to put it

- The `GlobalStatus` component should be positioned right under the header. By default, it uses `main` as the ID.
- Or as a secondary summary of errors in a submit form. Keep in mind that, by default, form components like [Input](/uilib/components/input) use the ID `main`. To make sure the built-in [FormStatus](/uilib/components/form-status) sends the message to another `GlobalStatus`, you have to set the [`globalStatus`](/uilib/components/global-status/properties/#configuration-object), like:

```tsx
<GlobalStatus id="other-global-status" />
<Input
  globalStatus={{
    id: 'other-global-status',
  }}
/>
```

But you can also make use of the Eufemia [Provider](/uilib/usage/customisation/provider-info) where you can send the `globalStatus` to the underlying/wrapped components, like:

```tsx
<GlobalStatus id="other-global-status" />
<Provider
  formElement={{
    globalStatus: {
      id: 'other-global-status',
    },
  }}
>
  <Input status="Message" />
</Provider>
```

### Manual updates

Besides the automated connection between the error states of form components ([FormStatus](/uilib/components/form-status)), you can update messages from anywhere in your application at any time:

**NB:** The GlobalStatus will `autoclose` by default once all messages are removed.

### JavaScript (interceptor situation)

You can access and manipulate an existing GlobalStatus from outside of the React render tree.

1. Given you have already defined a GlobalStatus in JSX:

```tsx
render(<GlobalStatus id="other-global-status" />)
```

2. Then you can control it from within a JavaScript context whenever you need to:

```tsx
// 1. Update / extend the status like so:

const statusOne = GlobalStatus.create({
  id: 'other-global-status',
  // or main
  status_id: 'custom-id-1',
  text: 'New Text',
  item: 'Item from status #1',
  title: 'New Title',
  show: true,
})

// 2. and removes "custom-id-1" again if needed
// 2. and removes "custom-id-1" again if needed

statusOne.update({
  text: 'Updated Text',
})

// 3. and removes "custom-id-1" again if needed
// 3. and removes "custom-id-1" again if needed
statusOne.remove()
render(<GlobalStatus id="other-global-status" />)
```

### JSX

```tsx
{
  /* 1. Place it under the header bar */
}
;<GlobalStatus text="Optional default text" />
{
  /* 2. later on, you can show a message */
}
;<GlobalStatus.Add
  id="custom-id"
  status_id="custom-id-1"
  title="New title"
  text="First long info text ..."
  item="Item from status #1"
  on_close={({ status_id }) => {
    console.log('on_close', status_id)
  }}
/>
{
  /* 3. and remove it again */
}
;<GlobalStatus.Remove id="custom-id" status_id="custom-id-1" />
```

If you need an additional `GlobalStatus`, define a custom ID (custom-status):

```tsx
{
  /* 1. Place it somewhere in your application */
}
;<GlobalStatus id="custom-status" />
{
  /* 2. later on, you can show a message */
}
;<GlobalStatus.Add
  id="custom-status"
  status_id="custom-id-1"
  title="New title"
  text="First long info text ..."
  item="Item from status #1"
  on_close={({ status_id }) => {
    console.log('on_close', status_id)
  }}
/>
{
  /* 3. and remove it again */
}
;<GlobalStatus.Remove id="custom-status" status_id="custom-id-1" />
```

## Demos

### GlobalStatus displaying error status

**NB:** Keep in mind, the `items` are handled automatically by all form components! This is just an example of how to define the content manually.

```tsx
render(
  <GlobalStatus
    title="Custom Title"
    text="Failure text"
    items={[
      {
        text: 'List item',
        status_anchor_url: '/uilib/components/global-status',
        status_anchor_label: 'eksempel',
      },
    ]}
    show={true}
    autoscroll={false}
    no_animation={true}
    omit_set_focus={true}
    id="demo-1"
  />
)
```

### GlobalStatus displaying info status

```tsx
render(
  <GlobalStatus
    state="info"
    title="Custom info title ..."
    text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
    items={['Status text 1', 'Status text 2']}
    show={true}
    autoscroll={false}
    no_animation={true}
    omit_set_focus={true}
    id="demo-4"
  />
)
```

### GlobalStatus displaying warning status

```tsx
render(
  <GlobalStatus
    state="warning"
    title="Custom warning title ..."
    text="A string of text providing a warning or semi-urgent message of some kind to the user"
    show={true}
    autoscroll={false}
    no_animation={true}
    omit_set_focus={true}
    id="demo-5"
  />
)
```

### GlobalStatus displaying success status

```tsx
render(
  <GlobalStatus
    state="success"
    title="Custom success title ..."
    text="A string of text providing a success message of some kind to the user"
    show={true}
    autoscroll={false}
    no_animation={true}
    omit_set_focus={true}
    id="demo-6"
  />
)
```

### GlobalStatus custom icon

```tsx
render(
  <GlobalStatus
    icon={<Icon icon={confetti_medium} />}
    show={true}
    autoscroll={false}
    no_animation={true}
    omit_set_focus={true}
    id="demo-icon"
  />
)
```

### To showcase the automated coupling between **FormStatus** and **GlobalStatus**

```tsx
const InputWithError = () => {
  const [errorMessage, setErrorMessage] = React.useState(null)
  return (
    <Input
      label="Input"
      placeholder="Write less than 5 chars and dismiss the focus to show the GlobalStatus ..."
      stretch
      status={errorMessage}
      on_blur={({ value }) => {
        setErrorMessage(value.length <= 4 ? 'With a message shown' : null)
      }}
      globalStatus={{
        id: 'main-status',
      }}
    />
  )
}
render(<InputWithError />)
```

### GlobalStatus and update routines

```tsx
const Context = React.createContext(null)
const UpdateDemo = () => {
  const [errorA, setErrorA] = React.useState(false)
  const [errorB, setErrorB] = React.useState(false)
  const [isVisible, setVisibility] = React.useState(false)
  return (
    <Context.Provider
      value={{
        errorA,
        errorB,
        setErrorA,
        setErrorB,
        isVisible,
        setVisibility,
      }}
    >
      <UpdateDemoStatus />
      <UpdateDemoTools />
    </Context.Provider>
  )
}
const UpdateDemoStatus = () => {
  const { errorA, errorB, setErrorA, setErrorB } =
    React.useContext(Context)
  return (
    <>
      <GlobalStatus title="Custom Title" text="Failure text" id="demo-2" />
      <Input
        top
        right
        label="Label A"
        placeholder="Placeholder A"
        status={errorA}
        globalStatus={{
          id: 'demo-2',
        }}
        on_change={({ value }) => {
          setErrorA(value)
        }}
      />
      <Input
        top
        label="Label B"
        placeholder="Placeholder B"
        status={errorB}
        globalStatus={{
          id: 'demo-2',
        }}
        on_change={({ value }) => {
          setErrorB(value)
        }}
      />
    </>
  )
}
const UpdateDemoTools = () => {
  const {
    errorA,
    errorB,
    setErrorA,
    setErrorB,
    isVisible,
    setVisibility,
  } = React.useContext(Context)

  // Only to demonstrate the usage of an interceptor situation
  const inst = React.useRef(null)
  React.useEffect(() => {
    if (!inst.current) {
      inst.current = GlobalStatus.create({
        id: 'demo-2',
        title: 'New Title',
        text: 'New Text',
        status_id: 'custom-item',
        show: false,
      })
      inst.current.update({
        on_show: () => {
          console.log('on_show')
          if (!isVisible) {
            setVisibility(true)
          }
        },
        on_hide: () => {
          console.log('on_hide')
          setVisibility(false)
        },
        on_close: () => {
          console.log('on_close')
          setVisibility(false)
        },
      })
    }
    inst.current.update({
      show: isVisible,
    })
  }, [isVisible])
  React.useEffect(() => () => inst.current.remove(), [])
  return (
    <Section top spacing style_type="divider">
      <ToggleButton
        text="Toggle"
        variant="checkbox"
        right
        checked={isVisible}
        on_change={({ checked }) => {
          setVisibility(checked)
        }}
      />
      <Button
        text="Reset"
        variant="tertiary"
        icon="reset"
        disabled={!(errorA || errorB)}
        on_click={() => {
          setErrorA(null)
          setErrorB(null)
        }}
      />
    </Section>
  )
}
render(<UpdateDemo />)
```

### To showcase the custom **Update** and **Remove** possibility

```tsx
function AddRemoveItems() {
  const [count, toggleUpdateStatus] = React.useState(0)
  return (
    <>
      <GlobalStatus
        id="custom-status"
        autoscroll={false}
        on_close={() => toggleUpdateStatus(0)}
        on_hide={() => toggleUpdateStatus(0)}
      />
      <Button
        text={`Show step #${count}`}
        on_click={() => {
          toggleUpdateStatus(count + 1)
          if (count >= 3) {
            toggleUpdateStatus(0)
          }
        }}
        top="small"
      />
      {count === 1 && (
        <>
          <GlobalStatus.Add
            id="custom-status"
            status_id="custom-id-1"
            title="New title"
            text="First long info text ..."
            item="Item from status #1"
            on_close={({ status_id }) => {
              console.log('on_close 1', status_id)
            }}
          />
          <GlobalStatus.Add
            id="custom-status"
            status_id="custom-id-2"
            text="Second long info text ..."
            item="Item from status #2"
            on_close={({ status_id }) => {
              console.log('on_close 2', status_id)
            }}
          />
        </>
      )}
      {count === 2 && (
        <GlobalStatus.Remove id="custom-status" status_id="custom-id-2" />
      )}
      {count === 3 && (
        <GlobalStatus.Remove id="custom-status" status_id="custom-id-1" />
      )}
    </>
  )
}
render(<AddRemoveItems />)
```

### To showcase the scrolling

NB: this demo only works once, so you'll have to refresh the browser to try again :)

```tsx
render(
  <Button
    text="Scroll to main GlobalStatus"
    on_click={() => {
      GlobalStatus.Update({
        id: 'main-status',
        text: 'Dui consectetur viverra aenean vestibulum ac tristique sem ligula condimentum',
      })
    }}
  />
)
```

## Properties

```json
{
  "props": {
    "id": {
      "doc": "The main ID. Defaults to `main`.",
      "type": "string",
      "status": "optional"
    },
    "title": {
      "doc": "The title appears as a part of the status content. Defaults to `En feil har skjedd`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "text": {
      "doc": "The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "children": {
      "doc": "The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "items": {
      "doc": "The items (list items) appear as a part of the status content. you can both use an JSON array, or a vanilla array with a string or an object content. See **Item Object** example below.",
      "type": "Array<GlobalStatusItem>",
      "status": "optional"
    },
    "icon": {
      "doc": "The icon shown before the status title. Defaults to `exclamation`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "state": {
      "doc": "Defines the visual appearance of the status. There are four main statuses `error`, `warning`, `info` and `success`. The default status is `error`.",
      "type": ["error", "info", "warning", "success"],
      "status": "optional"
    },
    "icon_size": {
      "doc": "The icon size of the title icon shows. Defaults to `medium`.",
      "type": "string",
      "status": "optional"
    },
    "show": {
      "doc": "Set to `true` or `false` to manually make the global status visible. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "autoclose": {
      "doc": "Set to `true` to automatically close the global status if there are no more left items in the provider stack. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "autoscroll": {
      "doc": "Set to `true` to automatically scroll the page to the appeared global status. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "no_animation": {
      "doc": "Set to `true` to disable the show/hide/slide/fade/grow/shrink animation. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "delay": {
      "doc": "Defines the delay on how long the automated visibility should wait before it appears to the user. Defaults to `200ms`.",
      "type": ["number", "string"],
      "status": "optional"
    },
    "hide_close_button": {
      "doc": "Set to `true` if the close button should be hidden for the user. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "close_text": {
      "doc": "Text of the close button. Defaults to `Lukk`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "status_anchor_text": {
      "doc": "Defines the anchor text showing up after every item, in case there is a `status_id` defined. Defaults to `Gå til %s`. The `%s` represents the optional and internal handled label addition.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "omit_set_focus": {
      "doc": "Set to `true` to omit setting the focus during visibility. Defaults to `false`. Additionally, there is `omit_set_focus_on_update` which is set to `true` by default.",
      "type": "boolean",
      "status": "optional"
    },
    "omit_set_focus_on_update": {
      "doc": "Set to `true` to omit setting the focus during update. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "GlobalStatus.close_text": {
      "nb-NO": "Lukk",
      "en-GB": "Close",
      "sv-SE": "Stäng",
      "da-DK": "Luk"
    },
    "GlobalStatus.default_title": {
      "nb-NO": "En feil har skjedd",
      "en-GB": "An error has occurred",
      "sv-SE": "Ett fel har inträffat",
      "da-DK": "Der er opstået en fejl"
    },
    "GlobalStatus.status_anchor_text": {
      "nb-NO": "Gå til %s",
      "en-GB": "Go to %s",
      "sv-SE": "Gå till %s",
      "da-DK": "Gå til %s"
    }
  }
}
```

## Item Object

```js
// simple
const items = ['Item #1', 'Item #2']

// advanced
const items = [
  { text: 'Item #1', status_id: 'id-1' },
  { text: 'Item #2', status_id: 'id-2', status_anchor_url: 'https://' },
]
```

## Advanced Item Properties

```json
{
  "props": {
    "text": {
      "doc": "The text appears as the status content. Beside plain text, you can send in a React component as well.",
      "type": "string",
      "status": "required"
    },
    "status_id": {
      "doc": "Defines an unique ID so the message can be either updated or removed individual.",
      "type": "string",
      "status": "required"
    },
    "status_anchor_url": {
      "doc": "Use `status_anchor_url={true}` to enable the go-to link, defined as a url hash using the `status_id`. Or provide it with an actual url: `status_anchor_url=\"https://\"`.",
      "type": "string",
      "status": "optional"
    },
    "status_anchor_text": {
      "doc": "Defines the anchor text showing up after every item. Defaults to `Gå til %s`. The `%s` represents the optional and internal handled label addition.",
      "type": "string",
      "status": "optional"
    },
    "status_anchor_label": {
      "doc": "Adds an additional text to the anchor (replaces `%s`), showing up after every item. Is used by default by other form components, if they have an `label`.",
      "type": "string",
      "status": "optional"
    }
  }
}
```

## Controllers

In React, you can make use of the helper components, the function as a kind of a controller component.
The goal is to update the content (properties/events) of the target GlobalStatus.

```tsx
{/* Place the status wherever you have to.*/}
<GlobalStatus id="custom-id" />
{/* Manipulate the status later on. Every property is optional.*/}
<GlobalStatus.Add
  id="custom-id"
  status_id="status-1"
  item="Item #1"
  text="New Text"
  on_close={({ status_id }) => {
    console.log('on_close', status_id)
  }}
/>
<GlobalStatus.Add
  id="custom-id"
  status_id="status-2"
  item="Item #2"
  text="New Text"
  title="New Title"
  on_close={({ status_id }) => {
    console.log('on_close', status_id)
  }}
/>
<GlobalStatus.Add
  id="custom-id"
  status_id="status-3"
  item="Item #3"
  text="Text #3"
  on_close={({ status_id }) => {
    console.log('on_close', status_id)
  }}
/>
{/* or update the status.*/}
<GlobalStatus.Update id="custom-id" text="text" />
{/* Later you can remove a resolved item.*/}
<GlobalStatus.Remove id="custom-id" status_id="status-3" />
```

## Controller Properties

```json
{
  "props": {
    "id": {
      "doc": "The main ID. Defaults to `main`.",
      "type": "string",
      "status": "optional"
    },
    "status_id": {
      "doc": "Define a new stack ID so you can remove it with the same ID later on. Defaults to `null`.",
      "type": "string",
      "status": "optional"
    },
    "remove_on_unmount": {
      "doc": "Set to `true` if you want that the component `<GlobalStatus.Add remove_on_unmount={true} ... />` should automatically remove the stacked status from the target **GlobalStatus** on component unmount. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    }
  }
}
```

## Configuration Object

This object is used as a representation to configure the GlobalStatus component from other components, using the `globalStatus` property.
See [Autocomplete](/uilib/components/autocomplete/properties), [Button](/uilib/components/button/properties), [Input](/uilib/components/input/properties), etc, as examples that use the `globalStatus` property.

```js
{
  id: 'global-status-id',
  message: 'global status message'
}
```

## Configuration Object Properties

```json
{
  "props": {
    "id": {
      "doc": "The main ID. Defaults to `main`.",
      "type": "string",
      "status": "optional"
    },
    "message": {
      "doc": "The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.",
      "type": "React.ReactNode",
      "status": "optional"
    }
  }
}
```

## Events

```json
{
  "props": {
    "on_open": {
      "doc": "Gets triggered the first time the GlobalStatus appears on the screen. In other words, it has to have been hidden before. Returns `{ id, status_id, ...properties }`.",
      "type": "function",
      "status": "optional"
    },
    "on_show": {
      "doc": "Gets triggered for the first time and for every new content update the GlobalStatus gets. Returns `{ id, status_id, ...properties }`.",
      "type": "function",
      "status": "optional"
    },
    "on_close": {
      "doc": "Gets triggered once the GlobalStatus disappears from the screen. Works only if `no_animation` is not `true`. Returns `{ id, status_id, ...properties }`.",
      "type": "function",
      "status": "optional"
    },
    "on_hide": {
      "doc": "Gets triggered once the GlobalStatus is getting closed/hidden by the user. Returns `{ id, status_id, ...properties }`.",
      "type": "function",
      "status": "optional"
    },
    "on_adjust": {
      "doc": "Gets triggered once the GlobalStatus is getting new content by the user. Returns `{ id, status_id, ...properties }`.",
      "type": "function",
      "status": "optional"
    }
  }
}
```
