---
title: 'Lists'
---

import ComponentBox from 'Tags/ComponentBox'

## Lists

### Unordered Lists

<ComponentBox hideCode data-dnb-test="lists-ul">
{`
<ul className="dnb-ul">
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
</ul>
`}
</ComponentBox>

### Ordered Lists (nested)

<ComponentBox hideCode data-dnb-test="lists-ol" caption="Nested ol list by using `.dnb-ol--nested`">
{`
<ol className="dnb-ol dnb-ol--nested">
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
</ol>
`}
</ComponentBox>

#### Ordered list style position (outside vs inside)

The list marker will be inside of wrapped text / text with newlines.

<ComponentBox hideCode useRender data-dnb-test="lists-ol-style-position" caption="Nested ol with inside modifier `.dnb-ol--inside`">
{`
const WidthLimit = styled.div\`
  max-width: 20rem;
  .dnb-ol li::before {
    font-weight: var(--font-weight-bold);
  }
\`
render(<WidthLimit>
<ol className="dnb-ol dnb-ol--nested dnb-ol--outside">
  <li>
    Using <code className="dnb-code">dnb-ol--outside</code> (default): Using Porta commodo tempus interdum habitant urna magna aliquet quam nisl
    <ol>
      <li>
        Porta commodo tempus interdum habitant urna magna aliquet quam nisl
      </li>
    </ol>
  </li>
</ol>
<ol className="dnb-ol dnb-ol--nested dnb-ol--inside">
  <li>
    New ol, using <code className="dnb-code">dnb-ol--inside</code>: Porta commodo tempus interdum habitant urna magna aliquet quam nisl
    <ol>
      <li>
        Porta commodo tempus interdum habitant urna magna aliquet quam nisl
      </li>
    </ol>
  </li>
</ol>
</WidthLimit>)
`}
</ComponentBox>

### Definition Lists

<ComponentBox hideCode data-dnb-test="lists-dl">
{`
<dl className="dnb-dl">
  <dt>Title</dt>
  <dd>Description</dd>
  <dt>Title</dt>
  <dd>Description</dd>
  <dl className="dnb-dl">
    <dt>Sub Title</dt>
    <dd>Sub Description</dd>
  </dl>
</dl>
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
