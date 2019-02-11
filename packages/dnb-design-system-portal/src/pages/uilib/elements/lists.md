---
draft: true
---

import CodeBlock from 'Tags/CodeBlock'

## Lists

### Unordered Lists

<CodeBlock reactLive hideCode>
{`
<ul>
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

<CodeBlock reactLive hideCode>
{`
<ol>
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

<CodeBlock reactLive hideCode>
{`
<dl>
  <dt>Item Title 1</dt>
  <dd>Item Description 1</dd>
  <dt>Item Title 1</dt>
  <dd>Item Description 1</dd>
</dl>
`}
</CodeBlock>
