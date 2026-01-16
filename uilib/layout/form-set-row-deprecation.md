---
metadata: https://eufemia.dnb.no/uilib/layout/form-set-row-deprecation/metadata.json
---

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
