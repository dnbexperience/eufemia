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

### Ordered Lists

<CodeBlock reactLive hideCode data-dnb-test="lists-ol">
{`
<ol className="dnb-ol">
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
      <li>Item</li>
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
  <dt>Item Title 1</dt>
  <dd>Item Description 1</dd>
  <dt>Item Title 1</dt>
  <dd>Item Description 1</dd>
</dl>
`}
</CodeBlock>

### Remove list styles

<CodeBlock reactLive hideCode data-dnb-test="lists-reset">
{`
<ul className="dnb-ul dnb-unstyled-list">
  <li>ul Item 1</li>
  <li>ul Item 2</li>
</ul>
<ol className="dnb-ol dnb-unstyled-list">
  <li>ol Item</li>
  <li>ol Item</li>
</ol>
`}
</CodeBlock>
