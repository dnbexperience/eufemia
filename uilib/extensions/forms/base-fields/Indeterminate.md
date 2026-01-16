---
title: 'Indeterminate'
description: '`Field.Indeterminate` component is used to display and handle the indeterminate state of a checkbox.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/base-fields/Indeterminate/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Indeterminate />)
```

## Description

`Field.Indeterminate` component is used to display and handle the indeterminate state of a checkbox. It is an uncontrolled component, meaning that the state is managed automatically.

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(
  <Field.Indeterminate
    dependencePaths={['/checkbox1', '/checkbox2', '/checkbox3']}
    path="/checkboxParent"
  />,
)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/Indeterminate)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/Indeterminate)

It should only be used in combination with checkbox looking variants.

Under the hood the [Field.Toggle](/uilib/extensions/forms/base-fields/Toggle/) base field is used. That means you can use all the properties from the `Toggle` component.

## Details about the state handling

The indeterminate state of a parent checkbox should be shown when some children checkboxes are checked, but not all. In detail:

- When all children are checked, the parent should get checked.
  - When the parent gets checked (clicked), all children should get checked.
- When all children are unchecked, the parent should get unchecked.
  - When the parent gets unchecked (clicked), all children should get unchecked.
- When some children are checked, the parent should be set in an indeterminate state.
  - When the parent gets clicked, all children should get checked. This behavior can be changed to the opposite or `auto` by using the `propagateIndeterminateState` property. Auto means that the parent will switch from its current state to be inverted.

## Demos

### Indeterminate state (partially checked)

```tsx
render(
  <Form.Handler onChange={console.log}>
    <Form.Card>
      <Field.Indeterminate
        label="Indeterminate"
        dependencePaths={['/child1', '/child2', '/child3']}
      />

      <Field.Toggle
        label="Checkbox 1"
        path="/child1"
        valueOn="what-ever"
        valueOff="you-name-it"
        required
      />

      <Field.Boolean label="Checkbox 2" path="/child2" required />

      <Field.Toggle
        label="Checkbox 3"
        path="/child3"
        valueOn="on"
        valueOff="off"
      />
    </Form.Card>

    <Form.SubmitButton />
  </Form.Handler>,
)
```

### Nested indeterminate state

```tsx
render(
  <Form.Handler onChange={console.log}>
    <Form.Card>
      <Field.Indeterminate
        label="1"
        path="/p1"
        dependencePaths={['/c2.1', '/p2.2', '/c3.1', '/c3.2']}
      />

      <Flex.Stack left="large">
        <Field.Boolean label="2.1" path="/c2.1" />
        <Field.Indeterminate
          label="2.2"
          valueOn="what-ever"
          valueOff="you-name-it"
          path="/p2.2"
          dependencePaths={['/c3.1', '/c3.2']}
        />

        <Flex.Stack left="large">
          <Field.Boolean label="3.1" path="/c3.1" />
          <Field.Toggle
            label="3.2"
            path="/c3.2"
            valueOn="what-ever"
            valueOff="you-name-it"
          />
        </Flex.Stack>
      </Flex.Stack>
    </Form.Card>
  </Form.Handler>,
)
```

### Propagate to `auto`, `checked` and `unchecked`

```tsx
const MyFormContent = () => {
  const { data } = Form.useData()
  return (
    <>
      <Form.Card>
        <Field.Selection label="Propagate to" path="/propagate">
          <Field.Option value="checked">Checked</Field.Option>
          <Field.Option value="unchecked">Unchecked</Field.Option>
          <Field.Option value="auto">Auto</Field.Option>
        </Field.Selection>

        <Field.Indeterminate
          label="Indeterminate"
          dependencePaths={['/child1', '/child2', '/child3']}
          propagateIndeterminateState={data['propagate']}
        />

        <Field.Toggle
          label="Checkbox 1"
          path="/child1"
          valueOn="what-ever"
          valueOff="you-name-it"
        />

        <Field.Boolean label="Checkbox 2" path="/child2" />

        <Field.Toggle
          label="Checkbox 3"
          path="/child3"
          valueOn="on"
          valueOff="off"
        />
      </Form.Card>
    </>
  )
}
const MyForm = () => {
  return (
    <Form.Handler
      id="propagate-demo"
      defaultData={{
        propagate: 'checked',
        child1: 'you-name-it',
        child2: true,
        child3: 'on',
      }}
      onChange={console.log}
    >
      <MyFormContent />
    </Form.Handler>
  )
}
render(<MyForm />)
```
