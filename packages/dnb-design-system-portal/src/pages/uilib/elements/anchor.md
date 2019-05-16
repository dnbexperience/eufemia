---
title: 'Anchor / Link'
draft: false
---

import CodeBlock from 'Tags/CodeBlock'

## Anchor

<CodeBlock reactLive hideCode>
{`
<ul className="dnb-ul dnb-unstyled-list">
  <li>
    <a href="/" data-dnb-test="anchor-default" className="dnb-anchor">
      Default Style
    </a>
  </li>
  <li>
    <a href="/" data-dnb-test="anchor-hover" className="dnb-anchor dnb-anchor--hover">
      Hover Style
    </a>
  </li>
  <li>
    <a href="/" data-dnb-test="anchor-active" className="dnb-anchor dnb-anchor--active">
      Active Style
    </a>
  </li>
  <li>
    <a href="/" data-dnb-test="anchor-focus" className="dnb-anchor dnb-anchor--focus">
      Focus Style
    </a>
  </li>
</ul>
`}
</CodeBlock>

### Additional Anchor helper classes

<CodeBlock reactLive hideCode>
{`
<ul className="dnb-ul dnb-unstyled-list">
  <li style={{display: 'inline-block', padding: '0.5rem', margin: '-0.5rem', backgroundColor: 'var(--color-ocean-green)'}}>
    <a href="/" className="dnb-anchor dnb-anchor--contrast">
      Contrast Style
    </a>
  </li>
  <li>
    <a href="/" className="dnb-anchor dnb-anchor--no-underline">
      No underline
    </a>
  </li>
  <li>
    <a href="/" className="dnb-anchor dnb-anchor--no-hover">
      No hover
    </a>
  </li>
  <li>
    <a href="/" className="dnb-anchor dnb-anchor--no-radius">
      No border-radius
    </a>
  </li>
  <li>
    <a href="/" className="dnb-anchor dnb-anchor--no-animation">
      No animation
    </a>
  </li>
  <li>
    <a href="/" className="dnb-anchor dnb-anchor--no-style">
      Reset anchor style
    </a>
  </li>
</ul>
`}
</CodeBlock>

Read more about the Anchor [Default Styles](/uilib/typography/anchor#default-styles)
