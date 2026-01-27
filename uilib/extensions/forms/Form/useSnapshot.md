---
title: 'Form.useSnapshot'
description: '`Form.useSnapshot` lets you store data snapshots of your form data, either inside or outside of the form context.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:27.416Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Form.useSnapshot

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
// Use Form.useSnapshot
```

## Description

The `Form.useSnapshot` hook lets you store data snapshots of your form data, either inside or outside of the form context.

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'

function MyComponent() {
  const { createSnapshot, applySnapshot, revertSnapshot } =
    Form.useSnapshot()

  return <>MyComponent</>
}

render(
  <Form.Handler>
    <MyComponent />
  </Form.Handler>
)
```

The hook returns an object with the following properties:

- `createSnapshot` will store the current data as a new snapshot with the given id.
- `applySnapshot` will revert the data to the snapshot with the given id (required).
- `revertSnapshot` will revert the data to the snapshot with the given id (required). A reverted snapshot gets deleted from the memory.

## Partial data snapshots

In order to create and revert a snapshot for a specific part of the data context, you can use the `Form.Snapshot` component:

```tsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  return (
    <Form.Handler>
      <Form.Snapshot name="my-snapshot-slice-name">
        <Field.String path="/foo" label="Will be reverted" />
        <Field.String path="/bar" label="Me too" />
      </Form.Snapshot>

      <Field.String path="/baz" label="Will stay as before" />
    </Form.Handler>
  )
}
```

When calling the `createSnapshot` or `revertSnapshot` functions, you can pass in your snapshot `name` (my-snapshot-slice-name) as the second parameter. This will make sure that the snapshot is only applied to the given part of the form data.

```tsx
createSnapshot('my-snapshot-1', 'my-snapshot-slice-name')
revertSnapshot('my-snapshot-1', 'my-snapshot-slice-name')
```

You can check out examples in the demo section.

## Usage of the `Form.useSnapshot` hook

You can use the `Form.useSnapshot` hook with or without an `id` (string, function, object or React Context as the reference) property, which is optional and can be used to link the data to a specific [Form.Handler](/uilib/extensions/forms/Form/Handler/) component.

### Without an `id` property

Here "Component" is rendered inside the `Form.Handler` component and does not need an `id` property to access the snapshot:

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  return (
    <Form.Handler>
      <Component />
    </Form.Handler>
  )
}

function Component() {
  const { createSnapshot, revertSnapshot } = Form.useSnapshot()
}
```

### With an `id` property

While in this example, "Component" is outside the `Form.Handler` context, but linked together via the `id` (string, function, object or React Context as the reference) property:

```jsx
import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

function MyForm() {
  return (
    <>
      <Form.Handler id={myFormId}>...</Form.Handler>
      <Component />
    </>
  )
}

function Component() {
  const { createSnapshot, revertSnapshot } = Form.useSnapshot(myFormId)
}
```

This is beneficial when you need to utilize the form data in other places within your application.

## Demos

### Undo / Redo

```tsx
const MyComponent = () => {
  const { createSnapshot, applySnapshot } = Form.useSnapshot()
  const pointerRef = React.useRef(0)
  React.useEffect(() => {
    createSnapshot(pointerRef.current, 'my-snapshot-slice')
  }, [createSnapshot])
  const changeHandler = React.useCallback(() => {
    pointerRef.current += 1
    createSnapshot(pointerRef.current, 'my-snapshot-slice')
  }, [createSnapshot])
  const undoHandler = React.useCallback(() => {
    pointerRef.current -= 1
    applySnapshot(pointerRef.current, 'my-snapshot-slice')
  }, [applySnapshot])
  const redoHandler = React.useCallback(() => {
    pointerRef.current += 1
    applySnapshot(pointerRef.current, 'my-snapshot-slice')
  }, [applySnapshot])
  return (
    <>
      <Form.Card>
        <Form.Snapshot name="my-snapshot-slice">
          <Field.String
            path="/foo"
            label="Will be reverted"
            onChange={changeHandler}
          />
        </Form.Snapshot>
        <Field.String path="/bar" label="Will stay" />
      </Form.Card>

      <Form.ButtonRow>
        <Button variant="secondary" onClick={undoHandler}>
          Undo
        </Button>
        <Button variant="secondary" onClick={redoHandler}>
          Redo
        </Button>
      </Form.ButtonRow>

      <Tools.Log top />
    </>
  )
}
render(
  <Form.Handler>
    <MyComponent />
  </Form.Handler>
)
```

### Used in a Wizard

This example reverts the form data to its previous state when the user navigates back to a previous step.

```tsx
const MyForm = () => {
  const { createSnapshot, revertSnapshot } = Form.useSnapshot('my-form')
  return (
    <Form.Handler id="my-form">
      <Wizard.Container
        onStepChange={(index, mode, args) => {
          if (mode === 'previous') {
            revertSnapshot(String(args.id), 'my-snapshot-slice')
          } else {
            createSnapshot(args.previousStep.id, 'my-snapshot-slice')
          }
        }}
      >
        <Wizard.Step title="Step A" id="step-a">
          <Form.Snapshot name="my-snapshot-slice">
            <Field.String path="/foo" label="Will be reverted" />
          </Form.Snapshot>
          <Field.String path="/bar" label="Will stay" />
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title="Step B" id="step-b">
          <Field.String path="/foo" label="Will be reverted" />
          <Field.String path="/bar" label="Will stay" />
          <Wizard.Buttons />
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
render(<MyForm />)
```
