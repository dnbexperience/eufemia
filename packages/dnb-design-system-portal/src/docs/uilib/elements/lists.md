---
title: 'Lists'
---

import ComponentBox from 'Tags/ComponentBox'

## Lists

### List modifiers

- `.dnb-ul--nested` / `.dnb-ol--nested` will ensure a nested structure of several lists
- `.dnb-ol--outside` (default) defines the position of the marker
- `.dnb-ol--inside` defines the position of the marker

With React you can also send in the modifiers as booleans:

```jsx
import { Ol } from 'dnb-ui-lib/elements'

render(
  <Ol nested inside>
    <li>Item</li>
  </Ol>
)
```

### Unordered Lists

<ComponentBox hideCode useRender data-dnb-test="lists-ul">
{`
// import { Ul, Li } from 'dnb-ui-lib/elements'
// Instead of using className="dnb-ul", we use Ul
render(<Ul>
  <Li>Item 1</Li>
  <Li>Item 2</Li>
  <Li>
    Item 3
    <Ul>
      <Li>
        Item 1 <br />
        Break with a <a className="dnb-anchor" href="/">Anchor (Text Link</a>
      </Li>
      <Li>Item 2</Li>
    </Ul>
  </Li>
  <Li>Item 4</Li>
</Ul>)
`}
</ComponentBox>

### Ordered Lists (nested)

<ComponentBox hideCode useRender data-dnb-test="lists-ol" caption="Nested ol list by using `.dnb-ol--nested`">
{`
// import { Ol, Li } from 'dnb-ui-lib/elements'
// Instead of using className="dnb-ol", we use Ol (and Li)
render(<Ol nested>
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
      <Li>Item
        <Ol>
          <Li>Item</Li>
          <Li>Item</Li>
        </Ol>
      </Li>
    </Ol>
  </Li>
  <Li>Item</Li>
</Ol>)
`}
</ComponentBox>

#### Ordered list style position (outside vs inside)

The list marker will be inside of wrapped text / text with newlines.

<ComponentBox hideCode useRender data-dnb-test="lists-ol-style-position" caption="Nested ol with inside modifier `.dnb-ol--inside`">
{`
// import { Ol, Li } from 'dnb-ui-lib/elements'
const WidthLimit = styled.div\`
  max-width: 22rem;
  .dnb-ol li::before {
    font-weight: var(--font-weight-bold);
  }
\`
render(<WidthLimit>
<Ol nested className="dnb-ol--outside">
  <Li>
    Using <code className="dnb-code">dnb-ol--outside</code> (default): Using Porta commodo tempus interdum habitant urna magna aliquet quam nisl
    <Ol>
      <Li>
        Porta commodo tempus interdum habitant urna magna aliquet quam nisl
      </Li>
    </Ol>
  </Li>
</Ol>
<Ol nested className="dnb-ol--inside">
  <Li>
    New ol, using <code className="dnb-code">dnb-ol--inside</code>: Porta commodo tempus interdum habitant urna magna aliquet quam nisl
    <Ol>
      <Li>
        Porta commodo tempus interdum habitant urna magna aliquet quam nisl
      </Li>
    </Ol>
  </Li>
</Ol>
</WidthLimit>)
`}
</ComponentBox>

### Definition Lists

Use Definition Lists when ever you have to tie together any items that have a direct relationship with each other (name/value sets).

You can use multiples of `<dt>` and `<dd>` within a definition list.

You can also use block level elements in the definition description, such as the `<p>` and `<ul>` elements. But you cannot use block level elements inside a definition term.

Any styling can be applied.

<ComponentBox hideCode useRender data-dnb-test="lists-dl">
{`
// import { Dl, Dt, Dd } from 'dnb-ui-lib/elements'
render(<Dl>
  <Dt>Term</Dt>
  <Dd>Description</Dd>
  <Dt>Term</Dt>
  <Dd>Description 1</Dd>
  <Dd>Description 2</Dd>
  <Dd>Description 3</Dd>
  <dl className="dnb-dl">
    <Dt>Sub Term</Dt>
    <Dd>Sub Description</Dd>
  </dl>
</Dl>)
`}
</ComponentBox>

### Remove list styles

<ComponentBox hideCode data-dnb-test="lists-reset">
{`
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
`}
</ComponentBox>
