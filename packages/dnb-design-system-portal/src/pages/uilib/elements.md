---
title: 'HTML Elements'
icon: 'elements'
draft: false
order: 6
---

import CodeBlock from 'Tags/CodeBlock'
import ComponentBox from 'Tags/ComponentBox'
import { Link } from 'dnb-ui-lib/src/elements'

import OtherElements from 'Pages/uilib/elements/other'
import Anchor from 'Pages/uilib/elements/anchor'
import Blockquote from 'Pages/uilib/elements/blockquote'
import Textarea from 'Pages/uilib/elements/textarea'
import Tables from 'Pages/uilib/elements/tables'
import Lists from 'Pages/uilib/elements/lists'
import Code from 'Pages/uilib/elements/code'

# HTML Elements

The `dnb-ui-lib` contains a DNB styling for the most common used [HTML Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element), defined by the UX Team at DNB. You may also have a look at [Typography](/uilib/typography) for Headings and Paragraph usage.

### How to use

By default, no HTML Element Tag will be styled, except for [Headings and Paragraphs](/uilib/typography) with no CSS class defined.

In order to apply a style, You have to define a CSS class, like:

<CodeBlock reactLive hidePreview>
{`
<a href="/" className="dnb-anchor">Text Link</a>
<blockquote className="dnb-blockquote">
  Dis leo ala tractatos ei quo.
</blockquote>
`}
</CodeBlock>

Although, You have also the possibility to load a [sub package](/uilib/usage/customisation/styling#sub-packages), called **dnb-ui-elements** witch applies all the styles to the HTML tags automatically. Use it with caution, as they can effect existing styles as well.

### React JSX

For those using JSX with React, You can simply use the wrapper Components.

```jsx
import { H1, H2, Lead, P, Link } from 'dnb-ui-lib/elements'

render(
  <article>
    <H1>My h1</H1>
    <P>My Paragraph</P>
  </article>
)
```

They work seamlessly with Styled Components as well:

<ComponentBox useRender scope={{Link}}>
{`
const StyledLink = styled(Link)\`
  font-size: var(--font-size-default);
  font-weight: var(--font-weight-default);
\`
render(<StyledLink href="/" target="_blank">Styled Link</StyledLink>)
`}
</ComponentBox>

## Overview

- [Anchor (Text Link)](#anchor)
- [Blockquote](#blockquote)
- [Lists](#lists)
- [Tables](#tables)
- [Textarea](#textarea)
- [Select](#missing-html-elements)
- [Radio](#missing-html-elements)
- [Checkbox](#missing-html-elements)
- [Code](#code)

<Anchor />
<Blockquote />
<Lists />
<Tables />
<Textarea />

---

<OtherElements />

---

<Code />
