---
title: 'Lists'
description: 'Lists are used to specify lists of information.'
metadata: https://eufemia.dnb.no/uilib/elements/lists/metadata.json
---

## Import

```tsx
import { Dd, Dl, Dt, Ol, Ul } from '@dnb/eufemia/elements'
```

## Description

Lists are used to specify lists of information.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4314-724)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/elements/lists)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/elements/lists)

## List modifiers

- `.dnb-ul--nested` / `.dnb-ol--nested` ensures a nested structure of several lists
- `.dnb-ol--outside` (default) defines the position of the marker
- `.dnb-ol--inside` defines the position of the marker

With React, you can also send in the modifiers as booleans:

```jsx
import { Ol } from '@dnb/eufemia'

render(
  <Ol nested inside>
    <li>Item</li>
  </Ol>,
)
```

## Demos

### Unordered Lists

```tsx
render(
  <Ul>
    <Li>Item 1</Li>
    <Li>Item 2</Li>
    <Li>
      Item 3
      <Ul>
        <Li>
          Item 1 <br />
          Break with a <Anchor href="/">Anchor (Text Link)</Anchor>
        </Li>
        <Li>Item 2</Li>
      </Ul>
    </Li>
    <Li>Item 4</Li>
  </Ul>,
)
```

### Ordered Lists (nested)

Nested `<ol>` list by using `.dnb-ol--nested`.

```tsx
render(
  <Ol nested>
    <Li>Item</Li>
    <Li>
      Item
      <Ol>
        <Li>
          Item
          <Ol>
            <Li>Item</Li>
            <Li>Item</Li>
          </Ol>
        </Li>
        <Li>
          Item
          <Ol>
            <Li>Item</Li>
            <Li>Item</Li>
          </Ol>
        </Li>
      </Ol>
    </Li>
    <Li>Item</Li>
  </Ol>,
)
```

### Unordered Lists inside Ordered Lists

```tsx
render(
  <Ol>
    <Li>
      Ordered item 1
      <Ul>
        <Li>Unordered item 1</Li>
        <Li>Unordered item 2</Li>
        <Li>Unordered item 3</Li>
      </Ul>
    </Li>
    <Li>Ordered item 2</Li>
  </Ol>,
)
```

#### Ordered list style position (outside vs inside)

The list marker will be inside of wrapped text / text with newlines.

Nested `<ol>` with inside modifier `.dnb-ol--inside`.

```tsx
const WidthLimit = styled.div`
  max-width: 22rem;
  .dnb-ol li::before {
    font-weight: var(--font-weight-bold);
  }
`
render(
  <WidthLimit>
    <Ol nested className="dnb-ol--outside">
      <Li>
        Using <code className="dnb-code">dnb-ol--outside</code> (default):
        Using Porta commodo tempus interdum habitant urna magna aliquet
        quam nisl
        <Ol>
          <Li>
            Porta commodo tempus interdum habitant urna magna aliquet quam
            nisl
          </Li>
        </Ol>
      </Li>
    </Ol>
    <Ol nested className="dnb-ol--inside">
      <Li>
        New ol, using <code className="dnb-code">dnb-ol--inside</code>:
        Porta commodo tempus interdum habitant urna magna aliquet quam nisl
        <Ol>
          <Li>
            Porta commodo tempus interdum habitant urna magna aliquet quam
            nisl
          </Li>
        </Ol>
      </Li>
    </Ol>
  </WidthLimit>,
)
```

#### Ordered list with other types

Ordered lists do support natively other types, like _letters_ and _roman numerals_. You can define that by using the `type` HTML attribute.

`<ol>` with custom type.

```tsx
render(
  <Ol type="A">
    <Li>Item</Li>
    <Li>
      Item
      <Ol type="I" start={3}>
        <Li>
          Item
          <Ol type="i">
            <Li>Item</Li>
            <Li>Item</Li>
          </Ol>
        </Li>
      </Ol>
    </Li>
    <Li>Item</Li>
  </Ol>,
)
```

### Definition Lists

Use Definition Lists whenever you have to tie together any items that have a direct relationship with each other (name/value sets).

You can use multiples of `<dt>` and `<dd>` within a definition list.

You can also use block level elements in the definition description, such as the `<p>` and `<ul>` elements. But you cannot use block level elements inside a definition term.

Any styling can be applied.

```tsx
render(
  <Dl>
    <Dt>Term</Dt>
    <Dd>Description</Dd>
    <Dt>Term</Dt>
    <Dd>Description 1</Dd>
    <Dd>Description 2</Dd>
    <Dd>Description 3</Dd>
    <Dd>
      <Dl>
        <Dt>Sub Term</Dt>
        <Dd>Sub Description</Dd>
      </Dl>
    </Dd>
  </Dl>,
)
```

### Definition List in horizontal direction

When using the `layout="horizontal"` property, the term and description will be wrapped in a `Dl.Item` element. You can only use one `Dd` element per `Dt` element.

The term and description are aligned on the bottom.

```tsx
render(
  <Dl layout="horizontal">
    <Dl.Item>
      <Dt>Term 1</Dt>
      <Dd>Description 1</Dd>
    </Dl.Item>
    <Dl.Item>
      <Dt>Term 2</Dt>
      <Dd>Description 2</Dd>
    </Dl.Item>
    <Dl.Item>
      <Dt>
        A term with several words lorem dolor sit amet consectetur
        adipiscing
      </Dt>
      <Dd>
        Description with several words lorem nulla mi posuere cubilia vel
        vulputate
      </Dd>
    </Dl.Item>
  </Dl>,
)
```

#### Definition List with a Grid pattern

You can only use one `Dd` element per `Dt` element.

The term and description are aligned on the bottom.

```tsx
render(
  <Dl layout="grid">
    <Dt>Term 1</Dt>
    <Dd>Description 1</Dd>

    <Dt>Term 2</Dt>
    <Dd>Description 2</Dd>

    <Dt>A term with several words lorem dolor sit amet</Dt>
    <Dd>
      Description with several words lorem nulla mi posuere cubilia vel
      vulputate
    </Dd>
  </Dl>,
)
```

### Remove list styles

```tsx
<ul className="dnb-ul dnb-unstyled-list">
  <li>ul Item</li>
</ul>
<ol className="dnb-ol dnb-unstyled-list">
  <li>ol Item</li>
</ol>
<dl className="dnb-dl dnb-unstyled-list">
  <dt>dl Title</dt>
  <dd>dl Description</dd>
</dl>
```
