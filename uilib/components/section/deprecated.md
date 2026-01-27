---
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.906Z
checksum: ec84dc16e718312ef1af443ead4f2bc8f3bbe35d1a14f99e0971ce4ac21ae5c4
---

## Deprecated styles

### Mint-Green Section

```tsx
render(
  <Section
    innerSpace={{
      top: 'small',
      bottom: 'small',
    }}
    backgroundColor="mint-green"
  >
    <P space={0}>
      Visual Section: <Anchor href="#">mint-green</Anchor>
    </P>
  </Section>
)
```

### Sea-Green Section

```tsx
render(
  <Section
    innerSpace={{
      top: 'large',
      bottom: 'large',
    }}
    style_type="sea-green"
  >
    <P space={0}>
      Visual Section: <Anchor href="#">sea-green</Anchor>
    </P>
  </Section>
)
```

### Emerald-Green Section

```tsx
render(
  <Section
    innerSpace={{
      top: 'medium',
      bottom: 'medium',
    }}
    style_type="emerald-green"
  >
    <P space={0}>
      Visual Section: <Anchor href="#">emerald-green</Anchor>
    </P>
  </Section>
)
```

### Lavender Section

```tsx
render(
  <Section
    innerSpace={{
      top: 'small',
      bottom: 'small',
    }}
    textColor="black-80"
    backgroundColor="lavender"
  >
    <P space={0}>
      Visual Section: <Anchor href="#">lavender</Anchor>
    </P>
  </Section>
)
```

### Black-3 Section

```tsx
render(
  <Section
    innerSpace={{
      top: 'large',
      bottom: 'large',
    }}
    backgroundColor="black-3"
  >
    <P space={0}>
      Visual Section: <Anchor href="#">black-3</Anchor>
    </P>
  </Section>
)
```

### Sand-Yellow Section

```tsx
render(
  <Section
    innerSpace={{
      top: 'large',
      bottom: 'large',
    }}
    backgroundColor="sand-yellow"
  >
    <P space={0}>
      Visual Section: <Anchor href="#">sand-yellow</Anchor>
    </P>
  </Section>
)
```

### Pistachio Section

```tsx
render(
  <Section
    innerSpace={{
      top: 'large',
      bottom: 'large',
    }}
    backgroundColor="pistachio"
  >
    <P space={0}>
      Visual Section: <Anchor href="#">pistachio</Anchor>
    </P>
  </Section>
)
```

### Fire-Red Section

```tsx
render(
  <Section
    innerSpace={{
      top: 'large',
      bottom: 'large',
    }}
    style_type="fire-red"
  >
    <P space={0}>
      Visual Section: <Anchor href="#">fire-red</Anchor>
    </P>
  </Section>
)
```

### Fire-Red-8 Section

```tsx
render(
  <Section
    innerSpace={{
      top: 'large',
      bottom: 'large',
    }}
    backgroundColor="fire-red-8"
  >
    <P space={0}>
      Visual Section: <Anchor href="#">fire-red-8</Anchor>
    </P>
  </Section>
)
```

## Properties

```json
{
  "props": {
    "variant": {
      "doc": "Defines the semantic purpose and subsequently the style of the visual helper. Will take precedence over the style_type property.",
      "type": "string",
      "status": "optional"
    },
    "breakout": {
      "doc": "Use `true` to enable a fullscreen breakout look. Supports also media query breakpoints like `{ small: boolean }`. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "outset": {
      "doc": "Define if the Card should break out negatively on larger screens. You cannot use `breakout` and `outset` together. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "outline": {
      "doc": "Define a custom border color. If `true` is given, `color-black-8` is used. Use a Eufemia color. Supports also media query breakpoints like `{ small: 'black-8' }`.",
      "type": "string",
      "status": "optional"
    },
    "outlineWidth": {
      "doc": "Define a custom border width. Defaults to `var(--card-outline-width)`. Supports also media query breakpoints like `{ small: '2px' }`.",
      "type": "string | number",
      "status": "optional"
    },
    "roundedCorner": {
      "doc": "Use `true` to enable rounded corners (border-radius). Supports also media query breakpoints like `{ small: boolean }`. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "backgroundColor": {
      "doc": "Define a custom background color, instead of a variant. Use a Eufemia color. Supports also media query breakpoints like `{ small: 'white' }`.",
      "type": "string",
      "status": "optional"
    },
    "dropShadow": {
      "doc": "Use `true` to show the default Eufemia DropShadow. Supports also media query breakpoints like `{ small: true }`.",
      "type": "boolean",
      "status": "optional"
    },
    "textColor": {
      "doc": "Define a custom text color to compliment the backgroundColor. Use a Eufemia color. Supports also media query breakpoints like `{ small: 'black-80' }`.",
      "type": "string",
      "status": "optional"
    },
    "innerSpace": {
      "doc": "Will add a padding around the content. Supports also media query breakpoints like `{small: { top: 'medium' }}`.",
      "type": "string",
      "status": "optional"
    },
    "innerRef": {
      "doc": "By providing a React Ref we can get the internally used element (DOM). E.g. `inner_ref={myRef}` by using `React.createRef()` or `React.useRef()`.",
      "type": "React.RefObject",
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

## Variants

| Variant   | Description                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------ |
| `info`    | Neutral, informational.                                                                          |
| `error`   | Indicates an erroneous state.                                                                    |
| `warning` | Draws attention to a potential problem that may or may not require an action on the user's part. |
| `success` | Indicates a successful state.                                                                    |

## Styles

You can easily [customize the color](/uilib/components/section#customize-color).

| Style               | Description                                                                                         |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| `white`             | uses `--color-white`.                                                                               |
| `divider`           | uses `--color-white` as background with a border-line on top and bottom.                            |
| `transparent`       | CSS transparent. Used in situations where a Section is of interest, but without a color as a basis. |
| ~~`mint-green-12`~~ | _(default)_ uses `--color-mint-green-12`.                                                           |
| ~~`mint-green`~~    | uses `--color-mint-green`.                                                                          |
| ~~`lavender`~~      | uses `--color-lavender`.                                                                            |
| ~~`sand-yellow`~~   | uses `--color-sand-yellow`.                                                                         |
| ~~`pistachio`~~     | uses `--color-pistachio`.                                                                           |
| ~~`black-3`~~       | uses `--color-black-3`.                                                                             |
| ~~`emerald-green`~~ | uses `--color-emerald-green`.                                                                       |
| ~~`fire-red`~~      | uses `--color-fire-red`. Is used by [GlobalStatus](/uilib/components/global-status)                 |
