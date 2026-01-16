---
title: 'Accordion'
description: 'The Accordion component is a combination of an accessible button (header area) and a content container.'
metadata: https://eufemia.dnb.no/uilib/components/accordion/metadata.json
---

## Import

```tsx
import { Accordion } from '@dnb/eufemia'
```

## Description

The Accordion component is a combination of an accessible button (header area) and a content container.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4314-722)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/accordion)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/accordion)

The component is designed to let you compose different parts according to your technical needs.

By default, the Accordion component animates user events, resulting in a final height of `auto`. This keeps the content responsive after the animation ends.

### Accordion provider

Use the `Accordion.Provider` to pass accordion properties to all nested accordions.

### Accordion groups

Both `Accordion.Provider` and `Accordion.Group` are available. They're technically the same, except that `Accordion.Group` automatically provides a unique `group` id, making all nested accordions work together and close each other when one opens.

#### Unexpected behavior

**Note:** Please avoid using a group when possible, as it creates unexpected behavior from an accessibility perspective. When a user interacts with one accordion, it triggers an action elsewhere, outside the current context—something users may not expect. It's an automated, out-of-context UI execution.

## Demos

### Single Accordion

```tsx
<Accordion
  expanded
  remember_state
  id="single-accordion"
  title="Accordion title"
>
  <P>Accordion content</P>
</Accordion>
<Accordion.Provider
  top
  remember_state
  icon="chevron_down"
  icon_position="right"
>
  <Accordion id="single-provider-accordion" title="Accordion title">
    <P>Accordion content</P>
  </Accordion>
</Accordion.Provider>
```

### Accordion with large title and content

```tsx
render(
  <Accordion
    expanded
    bottom="large"
    title="Large content with long titleScelerisque eget cubilia tempus ipsum aenean dolor suscipit egestas potenti at eleifend platea interdum magnis amet molestie sem faucibus netus "
  >
    <P>
      Hendrerit dictum elit facilisis aliquet eleifend potenti leo nec
      praesent sollicitudin elementum scelerisque ridiculus neque nisi
      risus et habitant torquent nam pellentesque dictumst porttitor
      accumsan a nibh fringilla facilisi lacus sagittis mauris libero
      tellus justo ultricies tempor viverra sodales vestibulum proin tempus
      lorem cubilia at velit sociis sit malesuada class consectetur turpis
      metus vulputate tortor cum nisl ornare ligula platea quam gravida
      sapien penatibus ad curae varius hac ultrices ipsum felis vehicula
      fermentum rutrum parturient congue sed vel magnis laoreet donec id
      consequat augue mi semper volutpat urna in condimentum luctus cursus
      fames dignissim magna suspendisse bibendum mus natoque diam
    </P>
  </Accordion>,
)
```

### Grouped Accordion

**NB:** Please have a read on the [unexpected behavior](/uilib/components/accordion#unexpected-behavior) thoughts.

```tsx
render(
  <Accordion.Group expanded allow_close_all>
    <Accordion expanded={false}>
      <Accordion.Header>Accordion title</Accordion.Header>
      <Accordion.Content top>
        <P>
          Sociis sapien sociosqu vel sollicitudin accumsan laoreet gravida
          himenaeos nostra mollis volutpat bibendum convallis cum
          condimentum dictumst blandit rutrum vehicula
        </P>
      </Accordion.Content>
    </Accordion>
    <Accordion top>
      <Accordion.Header>Accordion title</Accordion.Header>
      <Accordion.Content>
        <P>
          Nec sit mattis natoque interdum sagittis cubilia nibh nullam
          etiam
        </P>
      </Accordion.Content>
    </Accordion>
  </Accordion.Group>,
)
```

### Customized Accordion

```tsx
<Accordion group="unique-id" left_component={<Icon icon={bell} />}>
  <Accordion.Header>Accordion title</Accordion.Header>
  <Accordion.Content>
    <P>
      Sociis sapien sociosqu vel sollicitudin accumsan laoreet gravida
      himenaeos nostra mollis volutpat bibendum convallis cum condimentum
      dictumst blandit rutrum vehicula
    </P>
  </Accordion.Content>
</Accordion>
<Accordion top expanded={true} group="unique-id">
  <Accordion.Header>Accordion title</Accordion.Header>
  <Accordion.Content>
    <P>
      Nec sit mattis natoque interdum sagittis cubilia nibh nullam etiam
    </P>
  </Accordion.Content>
</Accordion>
```

### In two columns

This is a demo of how to use a set of accordions in two [Grid](/uilib/layout/grid/) columns, including the correct tab order.
Tab order follows the order of the elements in the markup, just as a screen readers will read it.

```tsx
const items = [
  <Accordion key="one" variant="filled">
    <Accordion.Header>
      Sit amet suscipit ipsum tincidunt id?
    </Accordion.Header>
    <Accordion.Content space>
      <P>
        Sociis sapien sociosqu vel sollicitudin accumsan laoreet gravida
        himenaeos nostra mollis volutpat bibendum convallis cum condimentum
        dictumst blandit rutrum vehicula
      </P>
    </Accordion.Content>
  </Accordion>,
  <Accordion key="two" variant="filled">
    <Accordion.Header>
      Cras eget quam eget tortor placerat viverra?
    </Accordion.Header>
    <Accordion.Content space>
      <P>
        Morbi condimentum odio ut enim vulputate, rutrum ullamcorper sem
        vestibulum. Ut luctus tempus leo vel finibus. Pellentesque ultrices
        interdum nisi, sit amet suscipit ipsum tincidunt id. Praesent
        sodales vel eros ut accumsan.
      </P>
    </Accordion.Content>
  </Accordion>,
  <Accordion key="three" variant="filled">
    <Accordion.Header>Nam porta nec ipsum id porta</Accordion.Header>
    <Accordion.Content space>
      <P>
        Nam porta nec ipsum id porta. Cras eget quam eget tortor placerat
        viverra.
      </P>
    </Accordion.Content>
  </Accordion>,
]
render(
  <>
    <Heading size="large">Accordion in columns</Heading>
    <Grid.Container columns={2} columnGap="small" rowGap="x-small">
      <Grid.Item
        span={{
          small: [1, 2],
          medium: [1, 1],
          large: [1, 1],
        }}
      >
        <Flex.Stack gap="x-small">{items}</Flex.Stack>
      </Grid.Item>
      <Grid.Item
        span={{
          small: [1, 2],
          medium: [2, 2],
          large: [2, 2],
        }}
      >
        <Flex.Stack gap="x-small">{[...items].reverse()}</Flex.Stack>
      </Grid.Item>
    </Grid.Container>
  </>,
)
```

### Nested Accordions

```tsx
render(
  <Accordion id="nested-accordion" title="Accordion" expanded space>
    <P space={0}>Content A</P>
    <Accordion id="nested-accordion-1" title="Accordion nested 1" space>
      <P space={0}>I'm nested 1</P>
    </Accordion>

    <P space={0}>Content B</P>
    <Accordion id="nested-accordion-2" title="Accordion nested 2" space>
      <P space={0}>I'm nested 2</P>
    </Accordion>
  </Accordion>,
)
```

```tsx
<Accordion
  variant="plain"
  title="Accordion with plain variant"
  icon={{
    closed: AddIcon,
    expanded: SubtractIcon,
  }}
  icon_position="right"
>
  <P>content</P>
</Accordion>
<Accordion
  variant="plain"
  title="Accordion with plain variant"
  icon={{
    closed: AddIcon,
    expanded: SubtractIcon,
  }}
  icon_position="right"
  expanded
>
  <P>content</P>
</Accordion>
```

### Disabled

Accordion can be disabled, though is not exactly defined what the use case is.

```tsx
<Accordion expanded disabled remember_state title="Disabled (expanded)">
  <P>I am expanded, but disabled, so I can't be closed</P>
</Accordion>
<Accordion.Provider
  top
  disabled
  remember_state
  icon="chevron_down"
  icon_position="right"
>
  <Accordion title="Disabled (closed)">
    <P>You can't see this text because I am disabled and closed.</P>
  </Accordion>
</Accordion.Provider>
```

### Variant `filled`

This variant does not have any different styling in the Sbanken theme.

```tsx
<Accordion expanded title="Accordion title" variant="filled">
  <P>Accordion content</P>
</Accordion>
<Accordion top title="Accordion title" variant="filled">
  <P>Accordion content</P>
</Accordion>
```

```tsx
<Accordion
  expanded
  title="Accordion title"
  description="Accordion description"
>
  <P>Accordion content</P>
</Accordion>
<Accordion
  top
  icon="chevron_down"
  icon_position="right"
  id="description-provider-accordion"
  title="Accordion title"
  description="Accordion description"
>
  <P>Accordion content</P>
</Accordion>
```

### Close All Accordions In A Group

You can collapse all expanded accordions by sending a ref to the `collapseAllHandleRef` property and calling the `.current()` function on your ref.

```tsx
const myCollapseAllRef = React.useRef<() => void>()

return (
  <button onClick={() => myCloseAllRef.current()}>
    Close all accordions
  </button>

  <Accordion.Group collapseAllHandleRef={myCollapseAllRef}>
    {/* ... your accordions */}
  </Accordion.Group>
)
```

```tsx
<Button
  bottom="large"
  variant="secondary"
  onClick={() => collapseAll.current()}
>
  Close All
</Button>
<Accordion.Group
  expanded
  allow_close_all
  collapseAllHandleRef={collapseAll}
>
  <Accordion>
    <Accordion.Header>Accordion title 1</Accordion.Header>
    <Accordion.Content>
      <P>
        Sociis sapien sociosqu vel sollicitudin accumsan laoreet gravida
        himenaeos nostra mollis volutpat bibendum convallis cum
        condimentum dictumst blandit rutrum vehicula
      </P>
    </Accordion.Content>
  </Accordion>
  <Accordion>
    <Accordion.Header>Accordion title 2</Accordion.Header>
    <Accordion.Content>
      <P>
        Nec sit mattis natoque interdum sagittis cubilia nibh nullam
        etiam
      </P>
    </Accordion.Content>
  </Accordion>
  <Accordion>
    <Accordion.Header>Accordion title 3</Accordion.Header>
    <Accordion.Content>
      <P>
        Nec sit mattis natoque interdum sagittis cubilia nibh nullam
        etiam
      </P>
    </Accordion.Content>
  </Accordion>
</Accordion.Group>
```
