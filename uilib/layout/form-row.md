---
title: 'FormRow (deprecated)'
description: 'The FormRow component is a helper to more easily achieve often used DNB form layout setups.'
metadata: https://eufemia.dnb.no/uilib/layout/form-row/metadata.json
---

## Import

```tsx
import { FormRow } from '@dnb/eufemia'
```

## Description

The FormRow component is a helper to more easily achieve often used DNB form layout setups.

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

### Fieldset and Legend

By default a `FormRow` is using the `<fieldset>` and `<legend>` HTML elements - if a label property is provided.

## Layout direction

The default direction is `horizontal`.
You can combine several FormRow's (example below) and the direction to achieve the wanted UX layout. You can also send the layout properties along from a [FormSet](/uilib/layout/form-set) (example below).
There are three possible layout properties for the FormRow children:

- `label_direction` Children's label direction
- `direction` Children components direction
- `vertical` Forces both to be vertically

### The property: **`label_direction`**

```tsx
render(
  <FormRow label_direction="vertical">
    <Input label="Label" right />
    <Input label="Label" />
  </FormRow>,
)
```

### The property: **`direction`**

```tsx
render(
  <FormRow direction="vertical">
    <Input label="Label" bottom />
    <Input label="Label" />
  </FormRow>,
)
```

### The property: **`vertical`**

```tsx
render(
  <FormRow vertical>
    <Input label="Label" bottom />
    <Input label="Label" />
  </FormRow>,
)
```

### Default

This is how it looks if you do not make any definitions.

```tsx
render(
  <FormRow>
    <Input label="Label" right />
    <Input label="Label" />
  </FormRow>,
)
```

## Spacing

To give a FormRow space, properties from [Space](/uilib/layout/space/properties) are supported:

```tsx
{
  /* The FormRow will then have a "margin-top: 2.5rem;" */
}
;<FormRow top="large x-small">
  <Input label="Input label">Value</Input>
</FormRow>
{
  /* ... or go crazy */
}
;<FormRow top="large medium small">
  <Input label="Input label">Value</Input>
</FormRow>
```

## Provider

You can send down the `FormRow` as an application-wide property (Context). More info about the [provider usage](/uilib/layout/form-row/provider).

## Responsiveness

The FormRow component provides by default responsiveness.
But if you also want the form components to be responsive. E.g. the label of the input should be wrapped to be vertical / above the input, then you have to set the `responsive` property to `true`.

```tsx
render(
  <FormRow responsive={true}>
    <Input label="Input label">Value</Input>
  </FormRow>,
)
```

Wrapping happens then if the viewport (screen) is less than `max-width: 40em`.

You can also make use of the [helper class](/uilib/helpers), e.g. `<FormRow className="dnb-responsive-component">...</FormRow>`.

## Demos

### Basic FormRow

```tsx
render(
  <TestStyles>
    <ComponentBox>
      <FormRow>
        <Input
          label="Default horizontal FormRow"
          placeholder="Input ..."
        />
      </FormRow>
    </ComponentBox>
  </TestStyles>,
)
```

### Vertical FormRow

```tsx
render(
  <TestStyles>
    <ComponentBox>
      <FormRow direction="vertical" label="Label legend for the inputs">
        <Input label="Vertical direction" placeholder="Input A ..." />
        <Input
          label="Vertical direction"
          placeholder="Input B ..."
          top="small"
        />
      </FormRow>
    </ComponentBox>
  </TestStyles>,
)
```

### Vertical aligned labels

Only the labels are vertically aligned - while the input labels are still horizontal.

```tsx
render(
  <TestStyles>
    <ComponentBox>
      <FormRow
        label={
          <Ingress top="0" bottom="small">
            Custom legend
          </Ingress>
        }
        label_direction="vertical"
      >
        <Input label="Label A" value="Input A" right="small" />
        <Input label="Label B" value="Input B" />
      </FormRow>
    </ComponentBox>
  </TestStyles>,
)
```

### Combine both vertical and horizontal FormRow's

```tsx
render(
  <TestStyles>
    <ComponentBox>
      {() => {
        // 1. In the nested FormRow we reset the layout to not be vertical
        // 2. So we can use a different direction ("label_direction")
        return (
          <FormRow
            label={
              <Space
                element="span"
                className="dnb-h--large"
                top={false}
                bottom="large"
                no_collapse={true}
              >
                Custom vertical legend
              </Space>
            }
            vertical
          >
            <Input label="Vertical input A" />
            <Input label="Vertical input B" top="medium" />
            <FormRow
              vertical={false}
              label_direction="horizontal"
              top="medium"
            >
              <Input label="Horizontal input A" right="small" />
              <Input label="Horizontal input B" />
            </FormRow>
            <Input label="Vertical input C" top="medium" />
          </FormRow>
        )
      }}
    </ComponentBox>
  </TestStyles>,
)
```

### Several components inside a horizontal FormRow - not wrapping

```tsx
render(
  <TestStyles>
    <ComponentBox>
      <FormRow
        label="A long horizontal legend (FormLabel) with a lot of informative text"
        direction="horizontal"
      >
        <Input label="Input label A" right="small" />
        <Input label="Input label B" />
      </FormRow>
    </ComponentBox>
  </TestStyles>,
)
```

### Several components inside a wrapping (`wrap`) horizontal FormRow

```tsx
render(
  <TestStyles>
    <ComponentBox>
      <FormRow
        label="Long label labwl Adipiscing mauris dis proin nec Condimentum egestas class blandit netus non a suscipit id urna"
        direction="horizontal"
        wrap
      >
        <Input label="Input A" top="small" right="small" />
        <Input label="Input B" top="small" right="small" />
        <Input label="Input C" top="small" right="small" />
      </FormRow>
    </ComponentBox>
  </TestStyles>,
)
```

### Legend usage

```tsx
render(
  <TestStyles>
    <ComponentBox>
      <FormSet label_direction="vertical">
        <FormRow label="Label legend for the inputs">
          <Input
            label="Vertical label direction"
            placeholder="Input A ..."
            right="small"
          />
          <Input
            label="Vertical label direction"
            placeholder="Input B ..."
          />
        </FormRow>
        <FormRow label="Checkbox legend" top="medium">
          <Checkbox label="Checkbox" />
        </FormRow>
      </FormSet>
    </ComponentBox>
  </TestStyles>,
)
```

### Inherit context

```tsx
render(
  <TestStyles>
    <ComponentBox>
      <FormRow vertical={true} disabled={true}>
        <Input label="Vertical input A" placeholder="Input A ..." />
        <Input
          label="Vertical input B"
          placeholder="Input B ..."
          top="medium"
        />
      </FormRow>
    </ComponentBox>
  </TestStyles>,
)
```

### Combining different components and directions

```tsx
render(
  <TestStyles>
    <ComponentBox>
      {() => {
        const PhoneRow = styled(FormRow)`
          .dnb-dropdown__shell,
          .dnb-dropdown__list {
            width: auto;
            min-width: 6rem;
          }
          @media screen and (max-width: 40em) {
            .dnb-dropdown {
              margin-bottom: 0.5rem;
            }
          }
        `
        return (
          <FormRow vertical={true}>
            <Input label="Input" placeholder="Input ..." bottom />
            <PhoneRow
              label="Phone number"
              label_direction="vertical"
              vertical={false}
            >
              <Dropdown
                right="small"
                title="Country code"
                data={['+47', '+48', '+49']}
                value={0}
              />
              <Input placeholder="Your phone number" />
            </PhoneRow>
          </FormRow>
        )
      }}
    </ComponentBox>
  </TestStyles>,
)
```

### Section style

The `label` property can be used to set a row label as well as the `section_style` is supported

```tsx
render(
  <TestStyles>
    <ComponentBox>
      <FormRow
        vertical
        section_style="mint-green"
        section_spacing
        label="A long horizontal legend (FormLabel) with a lot of informative text"
      >
        <Checkbox label="Checkbox" />
      </FormRow>
    </ComponentBox>
  </TestStyles>,
)
```
