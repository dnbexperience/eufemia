---
title: 'FormSet (deprecated)'
description: 'The FormSet component is a helper to more easily achieve often used DNB form layout setups.'
metadata: https://eufemia.dnb.no/uilib/layout/form-set/metadata.json
---

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
  </FormSet>,
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
  </FormSet>,
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
  </Provider>,
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
  </Form.Handler>,
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
  </FormSet>,
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
  </FormSet>,
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
  </FormSet>,
)
```
