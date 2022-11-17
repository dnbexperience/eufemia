---
title: 'Paragraph'
redirect_from:
  - /uilib/typography/paragraph
---

import { ParagraphDefault, ParagraphSmall, ParagraphAdditional, ParagraphModifiers } from 'Docs/uilib/elements/paragraph/Examples'

# Paragraph

## Paragraphs and other text elements

Eufemia comes with several styles you can use on paragraphs and other HTML text elements:

**Weights**

- `.dnb-p` (Body text)
- `.dnb-p--medium`
<!-- - `.dnb-p--bold` (Currently not supported by DNB UX) -->

**Sizes**

- `.dnb-p--small`
- `.dnb-p--x-small`

**Variants**

- `.dnb-p--lead`

### Paragraphs in React

Paragraphs using React JSX.

```jsx
import { P, Lead, Link, ... } from '@dnb/eufemia/elements'
```

<ParagraphModifiers />

### Paragraphs with vanilla HTML

<ParagraphDefault />

#### Paragraph with small font-size

<ParagraphSmall />

#### Additional Paragraph formatting (not defined yet)

<ParagraphAdditional />

Read more [about Fonts in the Designer Guides](/quickguide-designer/fonts/).
