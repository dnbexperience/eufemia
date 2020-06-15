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
// import { Ul } from 'dnb-ui-lib/elements'
// Instead of using className="dnb-ul", we use Ul
render(<Ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>
    Item 3
    <ul>
      <li>
        Item 1 <br />
        Break with a <a className="dnb-anchor" href="/">Anchor (Text Link</a>
      </li>
      <li>Item 2</li>
    </ul>
  </li>
  <li>Item 4</li>
</Ul>)
`}
</ComponentBox>

### Ordered Lists (nested)

<ComponentBox hideCode useRender data-dnb-test="lists-ol" caption="Nested ol list by using `.dnb-ol--nested`">
{`
// import { Ol } from 'dnb-ui-lib/elements'
// Instead of using className="dnb-ol", we use Ol
render(<Ol nested>
  <li>Item</li>
  <li>
    Item
    <ol>
      <li>
        Item
        <ol>
          <li>Item</li>
          <li>Item</li>
        </ol>
      </li>
      <li>Item
        <ol>
          <li>Item</li>
          <li>Item</li>
        </ol>
      </li>
    </ol>
  </li>
  <li>Item</li>
</Ol>)
`}
</ComponentBox>

#### Ordered list style position (outside vs inside)

The list marker will be inside of wrapped text / text with newlines.

<ComponentBox hideCode useRender data-dnb-test="lists-ol-style-position" caption="Nested ol with inside modifier `.dnb-ol--inside`">
{`
// import { Ol } from 'dnb-ui-lib/elements'
const WidthLimit = styled.div\`
  max-width: 22rem;
  .dnb-ol li::before {
    font-weight: var(--font-weight-bold);
  }
\`
render(<WidthLimit>
<Ol nested className="dnb-ol--outside">
  <li>
    Using <code className="dnb-code">dnb-ol--outside</code> (default): Using Porta commodo tempus interdum habitant urna magna aliquet quam nisl
    <ol>
      <li>
        Porta commodo tempus interdum habitant urna magna aliquet quam nisl
      </li>
    </ol>
  </li>
</Ol>
<Ol nested className="dnb-ol--inside">
  <li>
    New ol, using <code className="dnb-code">dnb-ol--inside</code>: Porta commodo tempus interdum habitant urna magna aliquet quam nisl
    <ol>
      <li>
        Porta commodo tempus interdum habitant urna magna aliquet quam nisl
      </li>
    </ol>
  </li>
</Ol>
</WidthLimit>)
`}
</ComponentBox>

### Definition Lists

<ComponentBox hideCode useRender data-dnb-test="lists-dl">
{`
// import { Dl } from 'dnb-ui-lib/elements'
render(<Dl>
  <dt>Title</dt>
  <dd>Description</dd>
  <dt>Title</dt>
  <dd>Description</dd>
  <dl className="dnb-dl">
    <dt>Sub Title</dt>
    <dd>Sub Description</dd>
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
