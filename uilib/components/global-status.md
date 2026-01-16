---
title: 'GlobalStatus'
description: 'The GlobalStatus is a complex component meant for displaying global Application notifications or a summary of a form.'
metadata: https://eufemia.dnb.no/uilib/components/global-status/metadata.json
---

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
  />,
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
  />,
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
  />,
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
  />,
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
  />,
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
  />,
)
```
