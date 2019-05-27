---
title: 'Anchor / Link'
draft: false
---

import CodeBlock from 'Tags/CodeBlock'
import { IconPrimary } from 'dnb-ui-lib/src'

## Anchor

The Anchor, also knows as `Link` is used to navigate from one linked content to the next.

You would normally just decorate your anchor class withe this CSS class: `.dnb-anchor`.

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

To force a specific state of style, use the following classes to do so:

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

### With icon

- <a href="/" className="dnb-anchor">Anchor with Icon <IconPrimary icon="chevron_right" /></a>
- <p>
    Eros semper blandit tellus mollis primis quisque platea sollicitudin
    ipsum <a href="/" className="dnb-anchor">Inside a Paragraph <IconPrimary icon="bell" /></a> auctor cursus mauris porta consectetur natoque vehicula vestibulum feugiat ultrices vitae fermentum eros euismod imperdiet eleifend justo vivamus posuere
  </p>
- <h2>
    <a href="/" className="dnb-anchor">Inside Headings <IconPrimary icon="bell" /></a> H2
  </h2>

### Manipulation

- `.dnb-anchor--no-animation` <a href="/" class="dnb-anchor dnb-anchor--no-animation">No Animation</a>
- `.dnb-anchor--no-style` <a href="/" class="dnb-anchor dnb-anchor--no-style">No Style</a>
- `.dnb-anchor--no-hover` <a href="/" class="dnb-anchor dnb-anchor--no-hover">No Hover</a>
- `.dnb-anchor--no-underline` <a href="/" class="dnb-anchor dnb-anchor--no-underline">No Underline</a>
