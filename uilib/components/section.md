---
title: 'Section'
description: 'The Section component is a visual helper.'
version: 11.2.0
generatedAt: 2026-05-08T07:25:36.881Z
checksum: 53374fcb803db9b71917a510cd257d02fc6f5f5162662ae0c6b86b36cb0c880c
---

# Section

## Import

```tsx
import { Section } from '@dnb/eufemia'
```

## Description

The Section component is a visual helper. It wraps content inside a visual section banner.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/section)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/section)

### Breakout / fullscreen

Under the hood, it uses a couple of tricks to achieve an infinite fullscreen size. You do not need to do anything more than you normally would with your content. The background of the Section component will extend beyond a `max-width` when enabled with the `breakout` property.

## Usage

Many of the properties support [media queries](/uilib/layout/media-queries/). This makes this component well suited to change its look based on screen sizes.

Each of these properties do support either a single value or an object containing one or more media query sizes:

```js
{
  small: false,
  medium: true,
  large: true,
}
```

- `breakout={boolean}` or e.g. `breakout={{ small: boolean }}`
- `roundedCorner={boolean}` or e.g. `roundedCorner={{ small: boolean }}`
- `outline={boolean|string}` or e.g. `outline={{ small: 'black' }}`
- `backgroundColor={string}` or e.g. `backgroundColor={{ small: 'white' }}`
- `textColor={string}` or e.g. `textColor={{ small: 'black-80' }}`
- `innerSpace={string}` or e.g. `innerSpace={{ small: { top: 'small' } }}`


## Demos

### Default Section


```tsx
render(<Section>
      <P space={0}>
        Visual Section: <Anchor href="#">default</Anchor>
      </P>
    </Section>)
```


### Default Section with inner space


```tsx
render(<Section innerSpace={{
  top: 'large',
  bottom: 'large',
  left: 'small'
}}>
      <P space={0}>
        Visual Section: <Anchor href="#">default with innerSpace</Anchor>
      </P>
    </Section>)
```


### Responsive inner space (padding)

Where `innerSpace` do respond on different screen sizes.


```tsx
render(<Section innerSpace={{
  small: {
    block: 'small',
    inline: 'x-small'
  },
  medium: {
    block: 'medium',
    inline: 'small'
  },
  large: false
}} backgroundColor="var(--token-color-background-neutral-subtle)" breakout={false}>
      <P space={0}>Responsive innerSpace</P>
    </Section>)
```


### Responsive appearance

Where `breakout`, `outline`, `roundedCorner`, `backgroundColor` and `dropShadow` do respond on different screen sizes.


```tsx
render(<Section breakout={{
  small: true,
  medium: false,
  large: false
}} outline={{
  medium: true,
  large: 'black'
}} roundedCorner={{
  large: true
}} backgroundColor={{
  small: 'var(--token-color-background-neutral)',
  medium: 'var(--token-color-background-neutral-subtle)',
  large: 'var(--token-color-background-neutral-subtle)'
}} dropShadow={{
  small: false,
  medium: true,
  large: true
}} innerSpace>
      <P space={0}>Responsive properties</P>
    </Section>)
```


### No breakout


```tsx
render(<Section breakout={false} backgroundColor="var(--token-color-background-neutral-subtle)">
      <P space={0}>No breakout</P>
    </Section>)
```


### Dark surface


```tsx
render(<Section innerSpace={{
  top: 'large',
  bottom: 'large'
}} backgroundColor="var(--token-color-decorative-first-bold-static)" surface="dark">
      <P space={0}>
        Dark surface section: <Anchor href="#">anchor</Anchor>
      </P>
    </Section>)
```


### Variant: divider


```tsx
render(<Section innerSpace={{
  top: 'medium',
  bottom: 'medium'
}} variant="divider">
      <P space={0}>
        Visual Section: <Anchor href="#">divider</Anchor>
      </P>
    </Section>)
```


### Variant: info


```tsx
render(<Section innerSpace={{
  top: 'large',
  bottom: 'large'
}} variant="information">
      <P space={0}>
        Generic information section: <Anchor href="#">info</Anchor>
      </P>
    </Section>)
```


### Variant: error


```tsx
render(<Section innerSpace={{
  top: 'large',
  bottom: 'large'
}} variant="error">
      <P space={0}>
        Error section: <Anchor href="#">error</Anchor>
      </P>
    </Section>)
```


### Variant: warning


```tsx
render(<Section innerSpace={{
  top: 'large',
  bottom: 'large'
}} variant="warning">
      <P space={0}>
        Warning section: <Anchor href="#">warning</Anchor>
      </P>
    </Section>)
```


### Variant: success


```tsx
render(<Section innerSpace={{
  top: 'large',
  bottom: 'large'
}} variant="success">
      <P space={0}>
        Success section: <Anchor href="#">success</Anchor>
      </P>
    </Section>)
```



  
```tsx
render(<Section innerSpace={{
  top: 'large',
  bottom: 'large'
}} backgroundColor="var(--token-color-background-neutral-subtle)">
      token-color-background-neutral-subtle
      <div>
        <Section innerSpace={{
      top: 'large',
      bottom: 'large'
    }} backgroundColor="var(--token-color-background-positive-subtle)">
          token-color-background-positive-subtle
          <div>
            <Section innerSpace={{
          top: 'large',
          bottom: 'large'
        }} textColor="var(--token-color-text-neutral-ondark)" backgroundColor="var(--token-color-background-info)">
              token-color-background-info
              <div>
                <Section innerSpace={{
              top: 'large',
              bottom: 'large'
            }} textColor="var(--token-color-text-neutral-ondark)" backgroundColor="var(--token-color-background-marketing)">
                  token-color-background-marketing
                  <div>
                    <Section innerSpace={{
                  top: 'large',
                  bottom: 'large'
                }} textColor="var(--token-color-text-neutral-ondark)" backgroundColor="var(--token-color-background-error)">
                      token-color-background-error
                      <div>
                        <Section innerSpace={{
                      top: 'large',
                      bottom: 'large'
                    }} backgroundColor="var(--token-color-background-warning-subtle)">
                          token-color-background-warning-subtle
                          <div>
                            <Section innerSpace={{
                          top: 'large',
                          bottom: 'large'
                        }} backgroundColor="var(--token-color-background-neutral-subtle)">
                              token-color-background-neutral-subtle
                              <div>
                                <Section innerSpace={{
                              top: 'large',
                              bottom: 'large'
                            }} backgroundColor="var(--token-color-background-marketing-subtle)">
                                  token-color-background-marketing-subtle
                                  <div>
                                    <Section innerSpace={{
                                  top: 'large',
                                  bottom: 'large'
                                }} variant="divider">
                                      divider
                                    </Section>
                                  </div>
                                </Section>
                              </div>
                            </Section>
                          </div>
                        </Section>
                      </div>
                    </Section>
                  </div>
                </Section>
              </div>
            </Section>
          </div>
        </Section>
      </div>
    </Section>)
```

## Properties


```json
{
  "props": {
    "variant": {
      "doc": "Defines the semantic purpose and subsequently the style of the visual helper.",
      "type": [
        "\"error\"",
        "\"information\"",
        "\"warning\"",
        "\"success\"",
        "\"divider\"",
        "string"
      ],
      "status": "optional"
    },
    "breakout": {
      "doc": "Use `true` to enable a fullscreen breakout look. Supports also media query breakpoints like `{ small: boolean }`. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "outset": {
      "doc": "Define if the Section should break out negatively on larger screens. You cannot use `breakout` and `outset` together. Defaults to `false`.",
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
      "type": [
        "string",
        "number"
      ],
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
      "doc": "Define a custom text color to compliment the `backgroundColor`. Use a Eufemia color. Supports also media query breakpoints like `{ small: 'black-80' }`.",
      "type": "string",
      "status": "optional"
    },
    "innerSpace": {
      "doc": "Will add a padding around the content. Supports also media query breakpoints like `{small: { top: 'medium' }}`.",
      "type": "string",
      "status": "optional"
    },
    "surface": {
      "doc": "Define the surface color context. When set to `dark`, ondark design tokens will be used for text and outline colors. Use `initial` to reset to the component's default behavior, ignoring any parent surface context. Uses `--token-color-decorative-first-bold-static` as the default background color and `--token-color-text-neutral-ondark` as the text color.",
      "type": [
        "\"dark\"",
        "\"light\"",
        "\"initial\""
      ],
      "status": "optional"
    },
    "element": {
      "doc": "Define what HTML element should be used. Defaults to `<section>`.",
      "type": [
        "string",
        "React.Element"
      ],
      "status": "optional"
    },
    "ref": {
      "doc": "By providing a `React.Ref` we can get the internally used element (DOM), e.g. `ref={myRef}` by using `React.useRef(null)`.",
      "type": "React.RefObject",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Variants

| Variant       | Description                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------ |
| `information` | Neutral, informational.                                                                          |
| `error`       | Indicates an erroneous state.                                                                    |
| `warning`     | Draws attention to a potential problem that may or may not require an action on the user's part. |
| `success`     | Indicates a successful state.                                                                    |

## Styles

You can easily [customize the color](/uilib/components/section).

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
