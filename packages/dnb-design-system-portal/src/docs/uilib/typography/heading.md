---
showTabs: true
---

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

## Headings

The DNB UX team has defined three levels of heading styles:

- `.dnb-h--xx-large` (Heading xx-large)
- `.dnb-h--x-large` (Heading x-large)
- `.dnb-h--large` (Heading large)

Also available are:

- `.dnb-h--medium`
- `.dnb-h--basis`
- `.dnb-h--small`
- `.dnb-h--x-small`

Optional, you could use `.dnb-lead` (equivalent to `.dnb-h--medium`) to style a heading as well. But only if that would make sense in the particular context.

The sizes are aligned to the [font-size definitions](/uilib/typography/font-size).

### Think semantics first

You should [think semantics first](/uilib/usage/best-practices/for-typography#headings-and-styling) once you choose what level of heading you use. Always try to start with an `<h1>`. Later on you can style them properly.

If you have to use a paragraph or a arbitrary heading, and it has to **look like** a specific heading, you can use these classes:

- `.dnb-h--xx-large`
- `.dnb-h--x-large`
- `.dnb-h--large`
- etc.

Read more about [best practices for typography](/uilib/usage/best-practices/for-typography).

### Automated heading levels

There is also [Heading](/uilib/components/heading), a component to create automated semantic headings within a boundary of some rules.

### Heading styles in React

```jsx
import { H1, H2, ... } from '@dnb/eufemia/elements'

<H1>Heading style xx-large</H1>
<H1 size="small">Heading style small</H1>

/** These are equivalent */
<H1><small>Heading style x-large</small></H1>
<H1 modifier="small">Heading style x-large</H1>
```

<ComponentBox caption="Default Heading typography using React JSX">
{`
<H1 bottom="large">Heading style xx-large</H1>
<H1 size="x-large">Heading style x-large (one down)</H1>
<H1 size="small">Heading style small</H1>
<H2>Heading style large</H2>
`}
</ComponentBox>

### Heading styles in vanilla HTML

<ComponentBox hideCode data-visual-test="heading-default" caption="Heading styles in vanilla HTML">
{`
<h1 className="dnb-h--xx-large">Heading style xx-large</h1>
<h2 className="dnb-h--x-large">Heading style x-large</h2>
<h5 className="dnb-h--large">Heading style large</h5>
<h3 className="dnb-h--small">Heading style small</h3>
<h3 className="dnb-h--basis">Heading style basis</h3>
`}
</ComponentBox>

<ComponentBox hideCode data-visual-test="heading-additional" caption="Additional Heading modifiers">
{`
<article>
  <h1 className="dnb-h--xx-large">
    <small>dnb-h--x-large</small> Normal dnb-h--xx-large
  </h1>
  <h2 className="dnb-h--large">
    Normal dnb-h--large <small>dnb-h--medium</small>
  </h2>
  <h3 className="dnb-lead">
    Normal dnb-h--medium <small>dnb-h--basis</small>
  </h3>
</article>
`}
</ComponentBox>

### Example of margin collapsing

<ComponentBox caption="Only the largest margin takes effect">
{`
<H1 size="small" top bottom="small">Spacing with bottom margin: small</H1>
<P top="large" bottom="small">Spacing with top margin: large</P>
<P no_collapse top="large" bottom="small">Spacing + no_collapse with top margin: large</P>
<P no_collapse top="large">Spacing + no_collapse with top margin: large</P>
`}
</ComponentBox>
