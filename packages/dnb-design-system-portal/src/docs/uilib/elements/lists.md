---
title: 'Lists'
draft: false
---

import CodeBlock from 'Tags/CodeBlock'

## Lists

### Unordered Lists

<CodeBlock reactLive hideCode data-dnb-test="lists-ul">
{`
<ul className="dnb-ul">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>
    Item 3
    <ul>
      <li>
        Item 1 <br />
        Break
      </li>
      <li>Item 2</li>
    </ul>
  </li>
  <li>Item 4</li>
</ul>
`}
</CodeBlock>

### Ordered Lists (nested)

<CodeBlock reactLive hideCode data-dnb-test="lists-ol" caption="Nested ol list by using `.dnb-ol--nested`">
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
</CodeBlock>

### Definition Lists

<CodeBlock reactLive hideCode data-dnb-test="lists-dl">
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
</CodeBlock>

### Remove list styles

<CodeBlock reactLive hideCode data-dnb-test="lists-reset">
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
</CodeBlock>
