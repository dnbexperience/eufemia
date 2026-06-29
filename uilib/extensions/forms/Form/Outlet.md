---
title: 'Form.Outlet'
description: '`Form.Outlet` lets you render fields and form components in another part of the tree while linking them to a specific `Form.Handler` by id.'
version: 11.8.1
generatedAt: 2026-06-29T11:30:04.003Z
checksum: 09df09d5e89e56f80955c959e2f164ba8cd50476cfb851a6102f6dbbb1560cc2
---

# Form.Outlet

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Outlet formHandlerId="my-form-id">...</Form.Outlet>)
```

## Description

`Form.Outlet` links its children to an existing `Form.Handler` context by `formHandlerId`.

This is useful when you need to render parts of a form outside the handler subtree, such as in a side panel, modal footer, or another layout region.

The `formHandlerId` is required and must reference a mounted `Form.Handler`.

When `Form.Outlet` is placed **outside** a `Form.Handler` subtree it automatically wraps its children in a `<form>` element, so submit buttons work correctly. When placed **inside** an existing `Form.Handler`, no extra `<form>` element is added.

## Relevant links

- [Form.Handler](/uilib/extensions/forms/Form/Handler/)
- [Form.useData](/uilib/extensions/forms/Form/useData/)
- [Form.useSubmit](/uilib/extensions/forms/Form/useSubmit/)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Form/Outlet)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Form/Outlet)


## Demos

### Link data between handler and outlet


```tsx
const Example = () => {
  const formHandlerId = useId();
  return <Flex.Stack>
              <Form.Handler id={formHandlerId} data={{
      firstName: 'Nora',
      lastName: 'Mork'
    }} required>
                <Flex.Stack>
                  <Form.Card>
                    <Form.SubHeading>Form.Handler</Form.SubHeading>
                    <Value.Composition label="Name">
                      <Value.String path="/firstName" />
                      <Value.String path="/lastName" />
                    </Value.Composition>
                  </Form.Card>
                </Flex.Stack>
              </Form.Handler>

              <Form.Card>
                <Flex.Stack>
                  <Form.SubHeading>
                    Linked editor (Form.Outlet)
                  </Form.SubHeading>

                  <Form.Outlet formHandlerId={formHandlerId}>
                    <Field.Name.First path="/firstName" />
                    <Field.Name.Last path="/lastName" />
                  </Form.Outlet>
                </Flex.Stack>
              </Form.Card>
            </Flex.Stack>;
};
render(<Example />);
```


### Linked data inside Form.Section in outlet


```tsx
const Example = () => {
  const formHandlerId = useId();
  return <>
              <Flex.Stack>
                <Form.Handler id={formHandlerId} required>
                  <Flex.Stack>
                    <Form.Card>
                      <Form.SubHeading>Form.Handler</Form.SubHeading>
                      <Field.Composition width="large">
                        <Field.Name.First path="/mySection/firstName" />
                        <Field.Name.Last path="/mySection/lastName" />
                      </Field.Composition>
                      <Form.SubmitButton />
                    </Form.Card>
                  </Flex.Stack>
                </Form.Handler>

                <Form.Outlet formHandlerId={formHandlerId}>
                  <Form.Card>
                    <Form.SubHeading>
                      Linked editor in Form.Section (Form.Outlet)
                    </Form.SubHeading>

                    <Form.Section path="/mySection">
                      <Flex.Stack>
                        <Field.Composition width="large">
                          <Field.Name.First path="/firstName" />
                          <Field.Name.Last path="/lastName" />
                        </Field.Composition>
                        <Form.SubmitButton />
                      </Flex.Stack>
                    </Form.Section>
                    <Tools.Log label="Linked data" placeholder="Type in either place to see linked data" />
                  </Form.Card>
                </Form.Outlet>
              </Flex.Stack>
            </>;
};
render(<Example />);
```

## Properties


```json
{
  "props": {
    "formHandlerId": {
      "doc": "Required Form.Handler id used to link this outlet to a specific form context.",
      "type": "SharedStateId",
      "status": "required"
    },
    "children": {
      "doc": "Content rendered inside the linked Form.Handler context.",
      "type": "React.ReactNode",
      "status": "required"
    }
  }
}
```
