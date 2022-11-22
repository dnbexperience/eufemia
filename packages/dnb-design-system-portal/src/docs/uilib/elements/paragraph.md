---
title: 'Paragraph'
redirect_from:
  - /uilib/typography/paragraph
---

import { ParagraphDefault, ParagraphSmall, ParagraphAdditional, ParagraphModifiers } from 'Docs/uilib/elements/paragraph/Examples'

# Paragraph

## Paragraph class modifiers

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
import { P, Lead } from '@dnb/eufemia/elements'
```

<ParagraphModifiers />

### Paragraphs `basis` sized

<ParagraphDefault />

#### Paragraph `small` sized

<ParagraphSmall />

#### Additional Paragraph formatting (not defined yet)

<ParagraphAdditional />

Read more [about Fonts in the Designer Guides](/quickguide-designer/fonts/).
