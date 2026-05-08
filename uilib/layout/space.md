---
title: 'Space'
description: 'The Space component provides margins within the provided spacing patterns.'
version: 11.2.1
generatedAt: 2026-05-08T08:59:11.603Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Space

## Import

```tsx
import { Space } from '@dnb/eufemia'
```

## Description

The Space component provides `margins` within the [provided spacing patterns](/uilib/usage/layout/spacing#spacing-helpers).

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/space)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/space)

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
{/* All of these methods will result in the same spacing */}
<Space top="large x-small" right="2.5" bottom="2.5rem" left="40px" />
```


With React, you can also use an object with the different directions:


```tsx
{/* All of these methods will result in the same spacing */}
<Space space={{
top: 'large x-small',
right: '2.5',
bottom: '2.5rem',
left: '40px'
}} />
```


### Components and Spacing

Every component supports the spacing patterns, so it's possible to send in the `top`, `right`, `bottom`, `left` and `space` properties directly, like:


```tsx
<Button top="large x-small medium" />
<Button space={{
top: 'large x-small medium'
}} />
```


### Spacing shorthands

A shorthand for getting 1rem (most used) is to simply send in a boolean set as true. No given value in JSX means true, so you only need the property key:


```tsx
{/* Equivalent to top="small" */}
<Button top />
{/* Equivalent to top="small" right="small" bottom="small" left="small" */}
<Button space />
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

### Style and Spacing

Every Eufemia component that supports spacing props uses CSS custom properties (e.g. `--margin-t-s`) on the `style` attribute to drive responsive margins. When you pass a `style` prop to a component, your styles and the spacing styles are merged together — spacing properties take precedence.

This means you can safely combine your own styles with spacing:

```tsx
<Space style={{ color: 'var(--color-sea-green)' }} top="medium">
  ...
</Space>
```

If you work with raw DOM elements and set styles via `setAttribute('style', ...)`, make sure you preserve any existing style values when adding new ones, so the spacing custom properties are not lost.

```js
const existing = element.getAttribute('style')
const merged = existing
  ? `${existing.replace(/;?\s*$/, '')}; ${style}`
  : style
element.setAttribute('style', merged)
```


## Demos

### Spacing method #1

`Space` component. The RedBox is only to visualize the result.


```tsx
render(<TestStyles>
    <ComponentBox data-visual-test="spacing-method-space" scope={{
    RedBox
  }}>
      <RedBox>
        <Space top="large x-small">
          <Input label="Input" />
        </Space>
      </RedBox>
    </ComponentBox>
  </TestStyles>)
```


### Spacing method #2

Define the space directly.


```tsx
render(<TestStyles>
    <ComponentBox data-visual-test="spacing-method-component">
      <Input label="Input A" bottom="small" />
      <Input label="Input B" />
    </ComponentBox>
  </TestStyles>)
```


### Spacing method #3

Using `createSpacing` or `applySpacing`.


```tsx
render(<TestStyles>
    <ComponentBox scope={{
    RedBox,
    applySpacing
  }} data-visual-test="spacing-method-form-row">
      {() => {
      const Component = ({
        className = null,
        style = null,
        ...props
      }) => {
        const params = applySpacing(props, {
          ...props,
          className: `my-component dnb-space ${className || ''}`.trim(),
          style
        });
        return <div {...params} />;
      };
      return <>
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
              <Component innerSpace={{
            large: true
          }}>
                Has space when breakpoint is large
              </Component>
            </RedBox>
          </>;
    }}
    </ComponentBox>
  </TestStyles>)
```


## Responsive `space`

The `space` property supports [media query breakpoints](/uilib/usage/layout/media-queries) (`small`, `medium`, `large`) for responsive spacing. Provide an object with breakpoint keys to apply different values at each screen size.


```tsx
render(<TestStyles>
    <ComponentBox data-visual-test="responsive-outer-spacing" scope={{
    RedBox
  }}>
      <RedBox>
        <Space space={{
        small: 'large x-small',
        medium: {
          top: '2rem',
          left: '16px',
          bottom: 'large',
          right: '5rem'
        },
        large: true
      }}>
          <P>Content</P>
        </Space>
      </RedBox>
    </ComponentBox>
  </TestStyles>)
```


### Responsive `innerSpace`

The `innerSpace` property controls padding inside the Space component. It shares the same API as `space`.


```tsx
render(<TestStyles>
    <ComponentBox data-visual-test="inner-spacing" scope={{
    RedBox
  }}>
      <RedBox>
        <Space innerSpace={{
        small: 'large x-small',
        medium: true,
        large: {
          top: '2rem',
          left: '16px',
          bottom: 'large',
          right: '5rem'
        }
      }}>
          <P>Content</P>
        </Space>
      </RedBox>
    </ComponentBox>
  </TestStyles>)
```


### `inline` and `block` shorthand

Both `space` and `innerSpace` properties support `inline` and `block` shorthand properties for more semantic spacing control.

- `inline` applies spacing to left and right (horizontal)
- `block` applies spacing to top and bottom (vertical)


```tsx
render(<TestStyles>
    <ComponentBox data-visual-test="space-inline-block" scope={{
    RedBox
  }}>
      {/* Basic inline/block usage for space (margin) */}
      <Space space={{
      inline: 'small',
      block: 'large'
    }}>
        <RedBox>
          space: inline=small (left/right), block=large (top/bottom)
        </RedBox>
      </Space>

      {/* Basic inline/block usage for innerSpace (padding) */}
      <Space innerSpace={{
      inline: 'medium',
      block: 'x-small'
    }}>
        <RedBox>
          innerSpace: inline=medium (left/right), block=x-small
          (top/bottom)
        </RedBox>
      </Space>

      {/* Combining both space and innerSpace with inline/block */}
      <Space space={{
      block: 'large'
    }} innerSpace={{
      inline: 'medium',
      block: 'small'
    }}>
        <RedBox>
          Combined: space block=large + innerSpace inline=medium,
          block=small
        </RedBox>
      </Space>

      {/* Media queries with inline/block for both properties */}
      <Space space={{
      small: {
        inline: 'x-small'
      },
      medium: {
        block: 'medium'
      },
      large: {
        inline: 'large',
        block: 'small'
      }
    }} innerSpace={{
      small: {
        block: 'x-small'
      },
      medium: {
        inline: 'small'
      },
      large: {
        inline: 'medium',
        block: 'large'
      }
    }}>
        <RedBox>
          <div>Responsive inline/block for both space and innerSpace</div>
          <div>Different combinations per breakpoint</div>
        </RedBox>
      </Space>

      {/* Mixing inline/block with traditional directional props */}
      <Space space={{
      inline: 'small'
    }} top="x-large" innerSpace={{
      block: 'medium'
    }}>
        <RedBox>
          Mixed: space inline + top override, innerSpace block
        </RedBox>
      </Space>
    </ComponentBox>
  </TestStyles>)
```


### Spacing with no margin collapse, due to the flex usage


```tsx
render(<TestStyles>
    <ComponentBox hideCode scope={{
    RedBox,
    Vertical
  }}>
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
  </TestStyles>)
```


### All four values will result in an equivalent margin


```tsx
render(<TestStyles>
    <ComponentBox data-visual-test="spacing-margins" hideCode>
      <Space top="large x-small" right="2.5" bottom="2.5rem" left="40px">
        <details>
          <summary>
            I have four <code className="dnb-code">2.5rem</code> margins!
          </summary>
          And this are my CSS classes:{' '}
          <code className="dnb-code">
            dnb-space dnb-space__top--large dnb-space__top--x-small
            dnb-space__right--large dnb-space__right--x-small
            dnb-space__bottom--large dnb-space__bottom--x-small
            dnb-space__left--large dnb-space__left--x-small
          </code>
        </details>
      </Space>
    </ComponentBox>
  </TestStyles>)
```


### Visual space testing


```tsx
render(<TestStyles>
    <ComponentBox data-visual-test="spacing-patterns" scope={{
    MagicBox,
    CustomStyle
  }} hideCode>
      {() => {
      const TestCase = props => {
        return <CustomStyle {...props}>
              {listOfBoxes.map(v => <Space key={v} top={v}>
                  <MagicBox />
                </Space>)}
            </CustomStyle>;
      };
      const listOfBoxes = [];
      for (let i = 0, c = 0, l = 20; i <= l; i++) {
        listOfBoxes.push(String(c));
        c += 0.5;
      }
      return <div className="spacing-patterns">
            <P bottom>
              With <Code>dnb-core-style</Code>
            </P>
            <TestCase className="dnb-core-style" />

            <P top bottom>
              Without
            </P>
            <TestCase />
          </div>;
    }}
    </ComponentBox>
  </TestStyles>)
```



  
```tsx
render(<TestStyles>
    <ComponentBox data-visual-test="spacing-elements" scope={{
    MagicBox,
    CustomStyle
  }} hideCode>
      {() => {
      const listOfBoxes = [];
      for (let i = 0, c = 0, l = 10; i <= l; i++) {
        listOfBoxes.push(String(c));
        c += 1;
      }
      const TestCase = props => {
        return <CustomStyle {...props}>
              {listOfBoxes.map(v => <Button key={v} left="x-small" top={v} size="small" customContent={<MagicBox />} />)}
            </CustomStyle>;
      };
      return <div className="spacing-elements">
            <P bottom>
              With <Code>dnb-core-style</Code>
            </P>
            <TestCase className="dnb-core-style" />

            <P top bottom>
              Without
            </P>
            <TestCase />
          </div>;
    }}
    </ComponentBox>
  </TestStyles>)
```

  
```tsx
const BlueBox = styled.div`
        display: inline-block;
        padding: 0.5rem;
        background: blue;
        ul {
          background: white;
        }
      `;
render(<BlueBox>
          <Space element="ul" top="small" right="small" bottom="small" left="small" className="dnb-space__reset">
            <li> </li>
          </Space>
        </BlueBox>);
```

  
```tsx
render(<TestStyles>
    <ComponentBox data-visual-test="space-media-queries" scope={{
    RedBox
  }}>
      {/* Different spacing for different breakpoints */}
      <Space space={{
      small: 'small',
      medium: 'large',
      large: 'x-large'
    }}>
        <RedBox>
          Responsive spacing: small on mobile, large on tablet, x-large on
          desktop
        </RedBox>
      </Space>

      {/* Media queries with individual direction objects */}
      <Space space={{
      small: {
        top: 'small',
        bottom: 'medium'
      },
      medium: {
        top: 'large',
        bottom: 'x-large'
      },
      large: {
        top: 'x-large',
        bottom: 'xx-large'
      }
    }}>
        <RedBox>Responsive directional spacing</RedBox>
      </Space>

      {/* Mixing with individual props */}
      <Space space={{
      small: 'medium',
      medium: 'large',
      large: 'x-large'
    }} right="small" // Individual props override space
    >
        <RedBox>Media space with right override</RedBox>
      </Space>
    </ComponentBox>
  </TestStyles>)
```

  
```tsx
render(<TestStyles>
    <ComponentBox data-visual-test="innerspace-media-queries" scope={{
    RedBox
  }}>
      {/* Different inner spacing for different breakpoints */}
      <Space innerSpace={{
      small: 'small',
      medium: 'large',
      large: 'x-large'
    }}>
        <RedBox>
          <div>Responsive inner spacing</div>
          <div>Content inside has different spacing per breakpoint</div>
        </RedBox>
      </Space>

      {/* Media queries with directional inner spacing */}
      <Space innerSpace={{
      small: {
        block: 'small',
        inline: 'medium'
      },
      medium: {
        block: 'large',
        inline: 'x-large'
      },
      large: {
        block: 'x-large',
        inline: 'xx-large'
      }
    }}>
        <RedBox>
          <div>Responsive directional inner spacing</div>
          <div>Block and inline spacing changes per breakpoint</div>
        </RedBox>
      </Space>
    </ComponentBox>
  </TestStyles>)
```

## Global Properties

These properties are available in many other components and elements.


```json
{
  "props": {
    "space": {
      "doc": "Has to be an object with either: `top`, `right`, `bottom`, `left`, `inline`, or `block`. Also supports media query breakpoints like `{small: \"medium\", medium: \"large\", large: \"x-large\"}` and shorthand directions `inline`/`block`. Use spacing values like: `small`, `1rem`, `1` or `16px`.",
      "type": [
        "object"
      ],
      "status": "optional"
    },
    "top": {
      "doc": "Use spacing values like: `small`, `1rem`, `1` or `16px`. Will use `margin-top`.",
      "type": [
        "string",
        "number",
        "boolean"
      ],
      "status": "optional"
    },
    "right": {
      "doc": "Use spacing values like: `small`, `1rem`, `1` or `16px`. Will use `margin-right`.",
      "type": [
        "string",
        "number",
        "boolean"
      ],
      "status": "optional"
    },
    "bottom": {
      "doc": "Use spacing values like: `small`, `1rem`, `1` or `16px`. Will use `margin-bottom`.",
      "type": [
        "string",
        "number",
        "boolean"
      ],
      "status": "optional"
    },
    "left": {
      "doc": "Use spacing values like: `small`, `1rem`, `1` or `16px`. Will use `margin-left`.",
      "type": [
        "string",
        "number",
        "boolean"
      ],
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
      "type": [
        "string",
        "React.Element"
      ],
      "status": "optional"
    },
    "stretch": {
      "doc": "If set to `true`, then the space element will be 100% in `width`.",
      "type": "boolean",
      "status": "optional"
    },
    "inline": {
      "doc": "If set to `true`, then `display: inline-block;` is used, so the HTML elements get aligned horizontally. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "innerSpace": {
      "doc": "Will add a padding around the content. Supports also media query breakpoints like `{small: { top: 'medium' }}` and shorthand directions `inline`/`block`.",
      "type": [
        "object",
        "string",
        "number",
        "boolean"
      ],
      "status": "optional"
    },
    "noCollapse": {
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
render(<Provider space={{
  noCollapse: true
}}>
      <Space>I do not collapse</Space>
      <Space>I do not collapse</Space>
    </Provider>)
```
