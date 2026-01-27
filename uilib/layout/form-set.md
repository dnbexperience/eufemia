---
title: 'FormSet (deprecated)'
description: 'The FormSet component is a helper to more easily achieve often used DNB form layout setups.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.340Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# FormSet (deprecated)

## Import

```tsx
import { FormSet } from '@dnb/eufemia'
```

## Description

The FormSet component gives you both an HTML form element `<form>` by default and also a React provider for [FormRow](/uilib/layout/form-row). This way you can define more globally e.g. if all the rows should be displayed **vertically**.

```tsx
render(
  <FormSet direction="vertical">
    <FormRow>Components are now vertical aligned</FormRow>
    <FormRow>Components are now vertical aligned</FormRow>
  </FormSet>
)
```

## Deprecation

In order to replace FormSet or FormRow you may use the Eufemia [Provider](/uilib/usage/customisation/provider-info) and [Flex](/uilib/layout/flex) as well as the Eufemia [Forms Extension](/uilib/extensions/forms).

e.g. before:

```tsx
render(
  <FormSet label_direction="vertical">
    <H2 top={0}>Heading</H2>
    <FormRow label={<span className="dnb-h--medium">Legend</span>}>
      <Input label="Label A" right />
      <Input label="Label B" />
    </FormRow>
  </FormSet>
)
```

e.g. after (two examples):

```tsx
render(
  <Provider
    formElement={{
      label_direction: 'vertical',
    }}
  >
    <Form.Handler>
      <H2 top={0}>Heading</H2>
      <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>
        <Flex.Horizontal>
          <Input label="Label A" />
          <Input label="Label B" />
        </Flex.Horizontal>
      </FieldBlock>
    </Form.Handler>
  </Provider>
)
```

```tsx
render(
  <Form.Handler>
    <Flex.Stack>
      <Form.MainHeading>Heading</Form.MainHeading>
      <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>
        <Flex.Horizontal>
          <Field.String label="Label A" width="medium" />
          <Field.String label="Label B" width="large" />
        </Flex.Horizontal>
      </FieldBlock>
    </Flex.Stack>
  </Form.Handler>
)
```

## Demos

### Use the `FormSet` as a Provider for `FormRow`

```tsx
render(
  <FormSet vertical>
    <FormRow no_label>
      <H2>A semantic h2 in a FormRow without a label</H2>
    </FormRow>
    <FormRow
      section_style="mint-green-12"
      section_spacing
      label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis"
    >
      <Radio.Group value="first">
        <Radio label="First" value="first" />
        <Radio label="Second" value="second" />
        <Radio label="Third" value="third" />
      </Radio.Group>
    </FormRow>
  </FormSet>
)
```

### FormSet where FormRow inherits the direction

```tsx
render(
  <FormSet direction="vertical">
    <FormRow
      label={
        <Space element="span" className="dnb-h--large">
          Custom Legend
        </Space>
      }
    >
      <Input label="Label" bottom />
      <Input label="Label" />
    </FormRow>
  </FormSet>
)
```

### FormSet with `on_submit` event and `prevent_submit` set to `true`

```tsx
render(
  <FormSet
    direction="horizontal"
    on_submit={({ event }) => console.log('on_submit', event)}
    prevent_submit={true}
  >
    <FormRow>
      <Input
        label="Search Input"
        type="search"
        value="Search text ..."
        right="small"
      />
      <Button type="submit" text="Trigger submit" />
    </FormRow>
  </FormSet>
)
```

## Properties

```json
{
  "props": {
    "element": {
      "doc": "Define what HTML element should be used. Defaults to `<form>`.",
      "type": "string",
      "status": "optional"
    },
    "no_form": {
      "doc": "If set to `true`, then a `div` HTML element will be used instead of `form`. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "prevent_submit": {
      "doc": "If set to `true`, components inside can't cause a page refresh. The event `on_submit` will still be triggered. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "locale": {
      "doc": "Send along a different locale to all nested components.",
      "type": "string",
      "status": "optional"
    },
    "disabled": {
      "doc": "If set to `true`, every component inside will be disabled. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, it enables skeleton for nested components. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "[FormRow](/uilib/layout/form-row/properties)": {
      "doc": "Beside the own properties, **FormSet** can provide the [FormRow](/uilib/layout/form-row/properties) properties down to `FormRow`. This works in React-based applications by using the React Context under the hood.",
      "type": "Various",
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

## Events

```json
{
  "props": {
    "on_submit": {
      "doc": "Will be called on submit. Returns an object with a native event: `{ event }`.",
      "type": "function",
      "status": "optional"
    }
  }
}
```
