---
title: 'Space'
description: 'The Space component provides margins within the provided spacing patterns.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.345Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Space

## Import

```tsx
import { Space } from '@dnb/eufemia'
```

## Description

The Space component provides `margins` within the [provided spacing patterns](/uilib/usage/layout/spacing#spacing-helpers).

The reason this exists is to make your syntax as clean as possible. This way, you see directly in words what the spacing is for every affected component.

### Spacing Table

| Pixel | Type       | Rem     | Custom Property      |
| ----- | ---------- | ------- | -------------------- |
| 8     | `x-small`  | **0.5** | `--spacing-x-small`  |
| 16    | `small`    | **1**   | `--spacing-small`    |
| 24    | `medium`   | **1.5** | `--spacing-medium`   |
| 32    | `large`    | **2**   | `--spacing-large`    |
| 48    | `x-large`  | **3**   | `--spacing-x-large`  |
| 56    | `xx-large` | **3.5** | `--spacing-xx-large` |

**NB:** In some circumstances you may be in need of using **0.25rem** (4px) - therefore `xx-small` also exists, but as a single type. So, combining `xx-small` and `small` would not result in 0.25rem, but still remain 1rem.

### Value Format

There are a couple of different ways you can define the spacing types and values:

- **Types:** `small small x-small` (combine types up to _10rem_)
- **number:** `2.5` (equivalent to `rem`)
- **string(rem):** `2.5rem`
- **string(px):** `40px` (gets converted to `rem`)
- **boolean:** `true` (equivalent to `small`), `false` (equivalent to `zero`)

To get a spacing of e.g. **2.5rem** (40px), you may combine types `large` and `x-small`.

```tsx
{
  /* All of these methods will result in the same spacing */
}
;<Space top="large x-small" right="2.5" bottom="2.5rem" left="40px" />
```

With React, you can also use an object with the different directions:

```tsx
{
  /* All of these methods will result in the same spacing */
}
;<Space
  space={{
    top: 'large x-small',
    right: '2.5',
    bottom: '2.5rem',
    left: '40px',
  }}
/>
```

### Components and Spacing

Every component supports the spacing patterns, so it's possible to send in the `top`, `right`, `bottom`, `left` and `space` properties directly, like:

```tsx
<Button top="large x-small medium" />
<Button
  space={{
    top: 'large x-small medium',
  }}
/>
```

### Spacing shorthands

A shorthand for getting 1rem (most used) is to simply send in a boolean set as true. No given value in JSX means true, so you only need the property key:

```tsx
{
  /* Equivalent to top="small" */
}
;<Button top />
{
  /* Equivalent to top="small" right="small" bottom="small" left="small" */
}
;<Button space />
```

In order to set all four directions at once, you can provide a string as the `space` value:

```tsx
render(<Button space="large x-small medium" />)
```

### Does it not work as expected?

Is `margin` not giving the expected spacing? That may be due to **Margin Collapsing**. Margins collapse in the following situations:

- Adjacent siblings
- Completely empty boxes
- Parent and first or last child element

The best solution is to only use one direction of margins, e.g. `bottom`. Or you can set the [collapse property](/uilib/layout/space/properties) to `false`.

### Margin collapsing

In order to help handle unwanted margin collapsing in typography elements, see [this example](/uilib/elements/heading#example-of-margin-collapsing).

### Conditional Reset

For resetting spacing (`margin: 0`) only when no spacing is defined, you can make use of `dnb-space__reset`.

The following example will result in `margin: 0.5rem 0 0 0`:

```html
<ul class="my-list dnb-space__reset dnb-space__top--small">
  <!-- some content -->
</ul>
```

More details:

1. Because of the browser default styles, our list has some margin.
1. If we would want to "reset" these styles to a margin of 0 directly on `.my-list`, we would not be able to use `dnb-space__top--small` because of the CSS specificity is lower.

## Demos

### Spacing method #1

`Space` component. The RedBox is only to visualize the result.

```tsx
render(
  <TestStyles>
    <ComponentBox
      data-visual-test="spacing-method-space"
      scope={{
        RedBox,
      }}
    >
      <RedBox>
        <Space top="large x-small">
          <Input label="Input" />
        </Space>
      </RedBox>
    </ComponentBox>
  </TestStyles>
)
```

### Spacing method #2

Define the space directly.

```tsx
render(
  <TestStyles>
    <ComponentBox data-visual-test="spacing-method-component">
      <Input label="Input A" right="small" />
      <Input label="Input B" />
    </ComponentBox>
  </TestStyles>
)
```

### Spacing method #3

Using `createSpacingClasses` or `createSpacingProperties`.

```tsx
render(
  <TestStyles>
    <ComponentBox
      scope={{
        RedBox,
        createSpacingClasses,
        createSpacingProperties,
        removeSpaceProps,
        classnames,
      }}
      data-visual-test="spacing-method-form-row"
    >
      {() => {
        const Component = ({
          className = null,
          style = null,
          ...props
        }) => {
          const spacingClasses = createSpacingClasses(props)
          const spacingProperties = createSpacingProperties(props)
          const cn = classnames(
            'my-component',
            'dnb-space',
            spacingClasses,
            className
          )
          const st = {
            ...style,
            ...spacingProperties,
          }
          return (
            <div className={cn} style={st} {...removeSpaceProps(props)} />
          )
        }
        return (
          <>
            <RedBox>
              <Component top="small medium large">Space A</Component>
            </RedBox>
            <RedBox>
              <Component top>Space B</Component>
            </RedBox>
            <RedBox>
              <Component innerSpace="large">Inner Space</Component>
            </RedBox>
            <RedBox>
              <Component
                innerSpace={{
                  large: true,
                }}
              >
                Has space when breakpoint is large
              </Component>
            </RedBox>
          </>
        )
      }}
    </ComponentBox>
  </TestStyles>
)
```

### Responsive `innerSpace`

For "padding" inside the space component, you can use the property `innerSpace`.

It supports the same API as the `space` property.

But in addition it supports [media query breakpoints](/uilib/usage/layout/media-queries), such as `small`, `medium` and `large`.

```tsx
render(
  <TestStyles>
    <ComponentBox
      data-visual-test="inner-spacing"
      scope={{
        RedBox,
      }}
    >
      <RedBox>
        <Space
          innerSpace={{
            small: 'large x-small',
            medium: true,
            large: {
              top: '2rem',
              left: '16px',
              bottom: 'large',
              right: '5rem',
            },
          }}
        >
          <P>Content</P>
        </Space>
      </RedBox>
    </ComponentBox>
  </TestStyles>
)
```

### Spacing with no margin collapse, due to the flex usage

```tsx
render(
  <TestStyles>
    <ComponentBox
      hideCode
      scope={{
        RedBox,
        Vertical,
      }}
    >
      <Vertical>
        <RedBox>
          <Space bottom="small">
            <>
              I have <code className="dnb-code">bottom="small"</code>
            </>
          </Space>
        </RedBox>
        <RedBox>
          <Space top="large">
            <>
              I have <code className="dnb-code">top="large"</code>
            </>
          </Space>
        </RedBox>
      </Vertical>
    </ComponentBox>
  </TestStyles>
)
```

### All four values will result in an equivalent margin

```tsx
render(
  <TestStyles>
    <ComponentBox data-visual-test="spacing-margins" hideCode>
      <Space top="large x-small" right="2.5" bottom="2.5rem" left="40px">
        <details>
          <summary>
            I have four <code className="dnb-code">2.5rem</code> margins!
          </summary>
          And this are my CSS classes: <code className="dnb-code">dnb-space dnb-space__top--large dnb-space__top--x-small dnb-space__right--large dnb-space__right--x-small dnb-space__bottom--large dnb-space__bottom--x-small dnb-space__left--large dnb-space__left--x-small</code>
        </details>
      </Space>
    </ComponentBox>
  </TestStyles>
)
```

### Visual space testing

```tsx
render(
  <TestStyles>
    <ComponentBox
      data-visual-test="spacing-patterns"
      scope={{
        MagicBox,
        CustomStyle,
      }}
      hideCode
    >
      {() => {
        const TestCase = (props) => {
          return (
            <CustomStyle {...props}>
              {listOfBoxes.map((v) => (
                <Space key={v} top={v}>
                  <MagicBox />
                </Space>
              ))}
            </CustomStyle>
          )
        }
        const listOfBoxes = []
        for (let i = 0, c = 0, l = 20; i <= l; i++) {
          listOfBoxes.push(String(c))
          c += 0.5
        }
        return (
          <div className="spacing-patterns">
            <P bottom>
              With <Code>dnb-core-style</Code>
            </P>
            <TestCase className="dnb-core-style" />

            <P top bottom>
              Without
            </P>
            <TestCase />
          </div>
        )
      }}
    </ComponentBox>
  </TestStyles>
)
```

```tsx
render(
  <TestStyles>
    <ComponentBox
      data-visual-test="spacing-elements"
      scope={{
        MagicBox,
        CustomStyle,
      }}
      hideCode
    >
      {() => {
        const listOfBoxes = []
        for (let i = 0, c = 0, l = 10; i <= l; i++) {
          listOfBoxes.push(String(c))
          c += 1
        }
        const TestCase = (props) => {
          return (
            <CustomStyle {...props}>
              {listOfBoxes.map((v) => (
                <Button
                  key={v}
                  left="x-small"
                  top={v}
                  size="small"
                  custom_content={<MagicBox />}
                />
              ))}
            </CustomStyle>
          )
        }
        return (
          <div className="spacing-elements">
            <P bottom>
              With <Code>dnb-core-style</Code>
            </P>
            <TestCase className="dnb-core-style" />

            <P top bottom>
              Without
            </P>
            <TestCase />
          </div>
        )
      }}
    </ComponentBox>
  </TestStyles>
)
```

```tsx
const BlueBox = styled.div`
  display: inline-block;
  padding: 0.5rem;
  background: blue;
  ul {
    background: white;
  }
`
render(
  <BlueBox>
    <ul className="dnb-space__reset dnb-space__top--small dnb-space__right--small dnb-space__bottom--small dnb-space__left--small">
      <li> </li>
    </ul>
  </BlueBox>
)
```

## Global Properties

These properties are available in many other components and elements.

```json
{
  "props": {
    "space": {
      "doc": "Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.",
      "type": ["object"],
      "status": "optional"
    },
    "top": {
      "doc": "Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.",
      "type": ["string", "number", "boolean"],
      "status": "optional"
    },
    "right": {
      "doc": "Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.",
      "type": ["string", "number", "boolean"],
      "status": "optional"
    },
    "bottom": {
      "doc": "Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.",
      "type": ["string", "number", "boolean"],
      "status": "optional"
    },
    "left": {
      "doc": "Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.",
      "type": ["string", "number", "boolean"],
      "status": "optional"
    }
  }
}
```

## Component Properties

```json
{
  "props": {
    "element": {
      "doc": "Defines the HTML element used. Defaults to `div`.",
      "type": "React.Element",
      "status": "optional"
    },
    "stretch": {
      "doc": "If set to `true`, then the space element will be 100% in width.",
      "type": "boolean",
      "status": "optional"
    },
    "inline": {
      "doc": "If set to `true`, then `display: inline-block;` is used, so the HTML elements get aligned horizontally. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "innerSpace": {
      "doc": "Will add a padding around the content. Supports also media query breakpoints like `{small: { top: 'medium' }}`.",
      "type": ["object", "string", "number", "boolean"],
      "status": "optional"
    },
    "no_collapse": {
      "doc": "If set to `true`, then a wrapper with `display: flow-root;` is used. This way you avoid **Margin Collapsing**. Defaults to `false`. _Note:_ You can't use `inline={true}` in combination.",
      "type": "boolean",
      "status": "optional"
    }
  }
}
```

## Zero

Use either `0` or `false` (as a number/boolean or string) to set a `margin` of 0.

## Provider

Also, Provider is supporting the `collapse` property.

```tsx
render(
  <Provider
    space={{
      no_collapse: true,
    }}
  >
    <Space>I do not collapse</Space>
    <Space>I do not collapse</Space>
  </Provider>
)
```
