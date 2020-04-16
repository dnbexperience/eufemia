---
title: 'Anchor (Text Link)'
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
    <a target="_blank" href="https://eufemia.dnb.no/uilib/elements/anchor" data-dnb-test="anchor-blank" className="dnb-anchor">
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
render(
  <p className="dnb-p">
    <Anchor href="/uilib/elements/anchor" right>My Link</Anchor>
    <Link href="/uilib/elements/anchor">My Link</Link>
  </p>
)
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
    <a target="_blank" href="https://eufemia.dnb.no/uilib/elements/anchor" className="dnb-anchor dnb-anchor--no-icon">
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

### Anchor modifiers

- `.dnb-anchor--no-animation` <a href="/" class="dnb-anchor dnb-anchor--no-animation">No Animation</a>
- `.dnb-anchor--no-style` <a href="/" class="dnb-anchor dnb-anchor--no-style">No Style</a>
- `.dnb-anchor--no-hover` <a href="/" class="dnb-anchor dnb-anchor--no-hover">No Hover</a>
- `.dnb-anchor--no-underline` <a href="/" class="dnb-anchor dnb-anchor--no-underline">No Underline</a>

### Anchor with icons

<ComponentBox hideCode>
{`
<a href="/" className="dnb-anchor" data-dnb-test="anchor-icon">
  Anchor with Icon <IconPrimary icon="chevron_right" />
</a>
<br/><br/>
<p className="dnb-p" data-dnb-test="anchor-paragraph">
  text <a href="/" className="dnb-anchor">Inside a Paragraph <IconPrimary icon="bell" /></a> text
</p>
`}
</ComponentBox>

### Anchor in headings

<ComponentBox hideCode>
{`
<h2 className="dnb-h2">
  <a href="/" className="dnb-anchor" data-dnb-test="anchor-heading">
    Inside Headings <IconPrimary icon="bell" />
  </a> H2
</h2>
<h2 className="dnb-h2">
  <a target="_blank" href="https://eufemia.dnb.no/uilib/elements/anchor" className="dnb-anchor" data-dnb-test="anchor-heading-blank">
    Blank target in headings
  </a> H2
</h2>
`}
</ComponentBox>

### Customize blank target graphic

You may use a [tool like this url-encoder](https://yoksel.github.io/url-encoder/) to **url-encode** your SVG.

If you only want to change the colors, you can swap out `fill='%23007272'` with your custom color HEX code. Keep in mind that `%23` stands for `#`.

```css
.dnb-anchor {
  --anchor-target-svg: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 0a.75.75 0 000 1.5V0zm4 .75h.75A.75.75 0 0015 0v.75zm-.75 4a.75.75 0 001.5 0h-1.5zm1.5 4a.75.75 0 00-1.5 0h1.5zm-.75 6.5V16c.41 0 .75-.34.75-.75H15zm-14 0H.25c0 .41.34.75.75.75v-.75zM1 .75V0a.75.75 0 00-.75.75H1zm5.75.75a.75.75 0 000-1.5v1.5zm2.72 3.72a.75.75 0 001.06 1.06L9.47 5.22zM14.25.75v4h1.5v-4h-1.5zm0 8v6.5h1.5v-6.5h-1.5zM15 14.5H1V16h14v-1.5zm-13.25.75V.75H.25v14.5h1.5zM1 1.5h5.75V0H1v1.5zm10 0h4V0h-4v1.5zm-.47 4.78l5-5L14.47.22l-5 5 1.06 1.06z' fill='%23007272' /%3E%3C/svg%3E");
  --anchor-target-svg--active: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 0a.75.75 0 000 1.5V0zm4 .75h.75A.75.75 0 0015 0v.75zm-.75 4a.75.75 0 001.5 0h-1.5zm1.5 4a.75.75 0 00-1.5 0h1.5zm-.75 6.5V16c.41 0 .75-.34.75-.75H15zm-14 0H.25c0 .41.34.75.75.75v-.75zM1 .75V0a.75.75 0 00-.75.75H1zm5.75.75a.75.75 0 000-1.5v1.5zm2.72 3.72a.75.75 0 001.06 1.06L9.47 5.22zM14.25.75v4h1.5v-4h-1.5zm0 8v6.5h1.5v-6.5h-1.5zM15 14.5H1V16h14v-1.5zm-13.25.75V.75H.25v14.5h1.5zM1 1.5h5.75V0H1v1.5zm10 0h4V0h-4v1.5zm-.47 4.78l5-5L14.47.22l-5 5 1.06 1.06z' fill='%23a5e1d2' /%3E%3C/svg%3E");
}
```
