---
showTabs: true
---

import ComponentBox from 'Tags/ComponentBox'

## Paragraphs

Paragraph comes in several variants. You can use these classes:

- `.dnb-p` (Text basis)
- `.dnb-p--small`
- `.dnb-p--medium`
- `.dnb-p--bold` (Currently not supported by DNB UX)

### Paragraphs in React

```jsx
import { Lead, P, Link, ... } from '@dnb/eufemia/elements'

<Lead>Lead style medium</Lead>
<P>Paragraph style basis</P>
<P size="small">Paragraph style small</P>
```

<ComponentBox data-visual-test="paragraph-modifiers" caption="Default paragraph typography using React JSX">
{`
<P>Default paragraph</P>
<P modifier="medium">Medium weight paragraph</P>
<P size="small">Small paragraph</P>
<P modifier="small medium">Small paragraph with medium weight</P>
{/*(Bold is currently not supported by DNB UX)*/}
{/*<P modifier="bold">Bold weight paragraph</P>*/}
{/*<P modifier="small bold">Small paragraph with bold weight</P>*/}
`}
</ComponentBox>

### Paragraphs with vanilla HTML

<ComponentBox hideCode data-visual-test="paragraph-default" caption="Default Paragraph styles">
{`
<p className="dnb-p">
  Here is a paragraph text<br />
  <a href="/" className="dnb-anchor">Anchor / Text Link</a><br />
  <b>Bold paragraph (medium weight)</b><br />
  <strong>Strong paragraph (medium weight)</strong><br />
  {/*<i>Italic paragraph (Currently not supported by DNB UX)</i><br />*/}
  {/*<u>Underline paragraph (Currently not supported by DNB UX)</u><br />*/}
  Numbers 0123456789<br />
  <code className="dnb-code">Code paragraph</code><br />
  <cite>Cite paragraph</cite><br />
</p>
`}
</ComponentBox>

<ComponentBox hideCode data-visual-test="paragraph-small" caption="Paragraph with small font-size">
{`
<p className="dnb-p dnb-p--small">
  Here is a small paragraph text<br />
  <a href="/" className="dnb-anchor">Anchor / Text Link</a><br />
  <b>Bold paragraph (medium weight)</b><br />
  <strong>Strong paragraph (medium weight)</strong><br />
  {/*<i>Italic paragraph</i><br />*/}
  {/*<u>Underline paragraph</u><br />*/}
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

<ComponentBox hideCode data-visual-test="paragraph-additional" caption="Additional Paragraph formatting (not defined yet)">
{`
<p className="dnb-p">
  <i>Italic paragraph</i><br />
  <u>Underline paragraph</u><br />
  <del>Deleted paragraph</del><br />
  <mark>Marked paragraph</mark><br />
  <ins>Inserted paragraph</ins><br />
  <sub>Subscript paragraph</sub><br />
  <sup>Superscript paragraph</sup><br />
</p>
`}
</ComponentBox>

Read more [about Fonts in the Designer Guides](/quickguide-designer/fonts/)
