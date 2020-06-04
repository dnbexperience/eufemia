---
showTabs: true
---

import ComponentBox from 'Tags/ComponentBox'

## Paragraphs

Paragraph comes in several variants. You can use these classes:

- `.dnb-p` (Text basis)
- `.dnb-p--medium`
- `.dnb-p--bold`
- `.dnb-p--small`

<!-- - `.dnb-p--ingress` -->

### Paragraphs in React

```jsx
import { Lead, P, Link, ... } from 'dnb-ui-lib/elements'

<Lead>Lead style medium</Lead>
<P>Paragraph style basis</P>
<P modifier="small">Paragraph style small</P>
```

<ComponentBox data-dnb-test="paragraph-modifiers" caption="Default paragraph typography using React JSX">
{`
<P bottom="small">Paragraph (Default)</P>
<P modifier="medium">Paragraph (Medium weight)</P>
<P modifier="bold">Paragraph (Bold weight)</P>
<P modifier="small">Paragraph Small</P>
<P modifier="small medium">Paragraph Small (Medium weight)</P>
<P modifier="small bold">Paragraph Small (Bold weight)</P>
`}
</ComponentBox>

### Paragraphs with vanilla HTML

<ComponentBox hideCode data-dnb-test="paragraph-default" caption="Default Paragraph styles">
{`
<p className="dnb-p">
  Here is a paragraph text<br />
  <a href="/" className="dnb-anchor">Anchor / Text Link</a><br />
  <b>Bold paragraph</b><br />
  <strong>Strong paragraph</strong><br />
  <i>Italic paragraph</i><br />
  <u>Underline paragraph</u><br />
  Numbers 0123456789<br />
  <code className="dnb-code">Code paragraph</code><br />
  <cite>Cite paragraph</cite><br />
</p>
`}
</ComponentBox>

<ComponentBox hideCode data-dnb-test="paragraph-small" caption="Paragraph with small font-size">
{`
<p className="dnb-p dnb-p--small">
  Here is a small paragraph text<br />
  <a href="/" className="dnb-anchor">Anchor / Text Link</a><br />
  <b>Bold paragraph</b><br />
  <strong>Strong paragraph</strong><br />
  <i>Italic paragraph</i><br />
  <u>Underline paragraph</u><br />
  Numbers 0123456789<br />
  <code className="dnb-code">Code paragraph</code><br />
  <cite>Cite paragraph</cite><br />
</p>
<p className="dnb-p dnb-p--x-small">
  Here is a x-small paragraph text<br />
  with a new line.
</p>
`}
</ComponentBox>

<ComponentBox hideCode data-dnb-test="paragraph-additional" caption="Additional Paragraph formatting (not defined yet)">
{`
<p className="dnb-p">
  <del>Deleted paragraph</del><br />
  <mark>Marked paragraph</mark><br />
  <ins>Inserted paragraph</ins><br />
  <sub>Subscript paragraph</sub><br />
  <sup>Superscript paragraph</sup><br />
</p>
`}
</ComponentBox>

Read more [about Fonts in the Designer Guides](/quickguide-designer/fonts/)
