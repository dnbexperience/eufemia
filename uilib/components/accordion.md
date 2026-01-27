---
title: 'Accordion'
description: 'The Accordion component is a combination of an accessible button (header area) and a content container.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.560Z
checksum: 2594667b77e077ae25cda844fc055ac1c8feea700976c81701cbe97d7a7e10a6
---

# Accordion

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
  </Accordion>
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
  </Accordion.Group>
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
  </>
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
  </Accordion>
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

## Properties

These properties can send along with the `Accordion.Provider` or `Accordion.Group`. It will affect every nested `Accordion`.

```json
{
  "props": {
    "id": {
      "doc": "A unique `id` that will be used on the button element. If you use `remember_state`, an id is required.",
      "type": "string",
      "status": "optional"
    },
    "title": {
      "doc": "A title as a string or React element. It will be used as the button text.",
      "type": "string",
      "status": "optional"
    },
    "expanded": {
      "doc": "If set to `true` the accordion will be expanded as its initial state.",
      "type": "boolean",
      "status": "optional"
    },
    "expanded_ssr": {
      "doc": "If set to `true` the accordion will be expanded during SSR. Can be potentially useful for SEO, although it will disturb client hydration, where React expects the same state. But that's mainly a technical aspect to consider.",
      "type": "boolean",
      "status": "optional"
    },
    "remember_state": {
      "doc": "If set to `true`, it will remember a changed state initiated by the user. It requires a unique `id`. It will store the state in the local storage.",
      "type": "boolean",
      "status": "optional"
    },
    "flush_remembered_state": {
      "doc": "If set to `true`, the saved (remembered) state will be removed and the initial component state will be used and set.",
      "type": "boolean",
      "status": "optional"
    },
    "no_animation": {
      "doc": "If set to `true`, the open and close animation will be omitted.",
      "type": "boolean",
      "status": "optional"
    },
    "variant": {
      "doc": "Defines the used styling. `Outlined`, `filled`, or `plain` (no styling). Defaults to `outlined`.",
      "type": ["outlined", "filled", "plain"],
      "status": "optional"
    },
    "icon": {
      "doc": "Will replace the `chevron` icon. The icon will still rotate (by CSS). You can use an object to use two different icons, one for the closed state and one for the expanded state `{ closed, expanded }`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "icon_position": {
      "doc": "Will set the placement of the icon. Defaults to `left`.",
      "type": "string",
      "status": "optional"
    },
    "icon_size": {
      "doc": "Define a different icon size. Defaults to `medium` (1.5rem).",
      "type": "string",
      "status": "optional"
    },
    "left_component": {
      "doc": "Will add a React element on the left side of the `title`, inside `AccordionHeaderContainer`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "prerender": {
      "doc": "If set to `true` the content will be present, even the accordion is not expanded. Can be useful for assistive technology or SEO.",
      "type": "boolean",
      "status": "optional"
    },
    "prevent_rerender": {
      "doc": "If set to `true` the accordion component will not re-render its content – can be useful for components you don't have control of storing the temporary state during an interaction.",
      "type": "boolean",
      "status": "optional"
    },
    "prevent_rerender_conditional": {
      "doc": "Use this prop together with `prevent_rerender` – and if it is set to `true`, the accordion component will re-render if the children are a new React element and do not match the previous one anymore.",
      "type": "boolean",
      "status": "optional"
    },
    "single_container": {
      "doc": "If set to `true`, a group of accordions will be wrapped to a sidebar looking menu for medium and larger screens.",
      "type": "boolean",
      "status": "optional"
    },
    "element": {
      "doc": "Gives you the option to replace the used `button` element. Provide a React element, including a string (HTML element). Defaults to a `div` with all the needed accessibility features included.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "heading": {
      "doc": "If set to `true`, level 2 (h2) will be used. You can provide your own HTML heading (`h3`), or provide a `heading_level` property.",
      "type": "boolean",
      "status": "optional"
    },
    "heading_level": {
      "doc": "If `heading` is set to `true`, you can provide a numeric value to define a different heading level. Defaults to `2`.",
      "type": "boolean",
      "status": "optional"
    },
    "disabled": {
      "doc": "If set to `true`, the accordion button will be disabled (dimmed).",
      "type": "boolean",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "contentRef": {
      "doc": "Send along a custom React Ref for `.dnb-accordion__content`.",
      "type": "function",
      "status": "optional"
    },
    "collapseAllHandleRef": {
      "doc": "Ref handle to collapse all expanded accordions. Send in a ref and use `.current()` to collapse all accordions. Default: `undefined`.",
      "type": "React.MutableRefObject<() => void>",
      "status": "optional"
    },
    "space": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## Accordion.Provider and Accordion.Group Properties

```json
{
  "props": {
    "group": {
      "doc": "Define a unique id, it will be used to 'group' several accordions into one.",
      "type": "string",
      "status": "optional"
    },
    "allow_close_all": {
      "doc": "If set to `true`, the group of accordions will allow all to close.",
      "type": "boolean",
      "status": "optional"
    },
    "expandBehaviour": {
      "doc": "Use `expandBehavior` instead.",
      "type": ["single", "multiple"],
      "status": "deprecated"
    },
    "expandBehavior": {
      "doc": "Determines how many accordions can be expanded at once. Defaults to `single`.",
      "type": ["single", "multiple"],
      "status": "optional"
    },
    "expanded_id": {
      "doc": "Define an `id` of a nested accordion that will get expanded.",
      "type": "string",
      "status": "optional"
    },
    "space": {
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
    "on_change": {
      "doc": "Will be called by user click interaction. Returns an object with a boolean state `expanded` inside `{ expanded, id, event, ...event }`.",
      "type": "function",
      "status": "optional"
    }
  }
}
```
