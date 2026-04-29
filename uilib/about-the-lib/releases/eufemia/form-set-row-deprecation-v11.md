---
version: 11.0.4
generatedAt: 2026-04-29T19:30:10.026Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

## Deprecation

To replace FormSet or FormRow, use the Eufemia [Provider](/uilib/usage/customisation/provider-info) and [Flex](/uilib/layout/flex) as well as the Eufemia [Forms Extension](/uilib/extensions/forms).

e.g. before:

```tsx
<FormSet label_direction="vertical">
  <H2 top={0}>Heading</H2>
  <FormRow label={<span className="dnb-h--medium">Legend</span>}>
    <Input label="Label A" right />
    <Input label="Label B" />
  </FormRow>
</FormSet>
```

e.g. after (two examples):

```tsx
render(
  <Form.Handler>
    <H2 top={0}>Heading</H2>
    <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>
      <Flex.Horizontal>
        <Input label="Label A" />
        <Input label="Label B" />
      </Flex.Horizontal>
    </FieldBlock>
  </Form.Handler>
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
