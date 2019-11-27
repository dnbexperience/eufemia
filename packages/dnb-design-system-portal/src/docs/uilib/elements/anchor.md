---
title: 'Anchor (Text Link)'
draft: false
---

import ComponentBox from 'Tags/ComponentBox'
import { IconPrimary } from 'dnb-ui-lib/src'

## Anchor (Text Link)

The Anchor, also knows as `Link` is used to navigate from one linked content to the next.

You would normally just decorate your anchor class withe this CSS class: `.dnb-anchor`.

<ComponentBox hideCode>
{`
<ul className="dnb-ul dnb-unstyled-list">
  <li>
    <a href="/" data-dnb-test="anchor-default" className="dnb-anchor">
      Default Style
    </a>
  </li>
  <li>
    <a href="https://eufemia.dnb.no/uilib/elements/anchor" target="_blank" data-dnb-test="anchor-blank" className="dnb-anchor">
      Blank target with https
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
</ComponentBox>

### React JSX

<ComponentBox useRender>
{`
// import { Link, Anchor } from 'dnb-ui-lib/elements'
render(<Anchor href="/uilib/elements/anchor">My Link</Anchor>)
`}
</ComponentBox>

### Additional Anchor helper classes

To force a specific state of style, use the following classes to do so:

<ComponentBox hideCode>
{`
<ul className="dnb-ul dnb-unstyled-list">
  <li style={{display: 'inline-block', padding: '0.5rem', margin: '-0.5rem', backgroundColor: 'var(--color-ocean-green)'}}>
    <a href="/" data-dnb-test="anchor-contrast" className="dnb-anchor dnb-anchor--contrast">
      Contrast Style
    </a>
  </li>
  <li>
    <a href="/" className="dnb-anchor dnb-anchor--no-underline">
      No underline
    </a>
  </li>
  <li>
    <a href="/" target="_blank" className="dnb-anchor dnb-anchor--no-icon">
      Blank target without link_out icon
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
  <li>
    <button className="dnb-anchor">
      I'm a Button!
    </button>
  </li>
</ul>
`}
</ComponentBox>

### With icon

- <a href="/" className="dnb-anchor">Anchor with Icon <IconPrimary icon="chevron_right" /></a>
- <p>
    Eros semper blandit tellus mollis primis quisque platea sollicitudin
    ipsum <a href="/" className="dnb-anchor">Inside a Paragraph <IconPrimary icon="bell" /></a> auctor cursus mauris porta consectetur natoque vehicula vestibulum feugiat ultrices vitae fermentum eros euismod imperdiet eleifend justo vivamus posuere
  </p>
- <h2 className="dnb-h2">
    <a href="/" className="dnb-anchor">Inside Headings <IconPrimary icon="bell" /></a> H2
  </h2>
- <h2 className="dnb-h2">
    <a href="/" target="_blank" className="dnb-anchor">Blank target in headings</a> H2
  </h2>

### Manipulation

- `.dnb-anchor--no-animation` <a href="/" class="dnb-anchor dnb-anchor--no-animation">No Animation</a>
- `.dnb-anchor--no-style` <a href="/" class="dnb-anchor dnb-anchor--no-style">No Style</a>
- `.dnb-anchor--no-hover` <a href="/" class="dnb-anchor dnb-anchor--no-hover">No Hover</a>
- `.dnb-anchor--no-underline` <a href="/" class="dnb-anchor dnb-anchor--no-underline">No Underline</a>
