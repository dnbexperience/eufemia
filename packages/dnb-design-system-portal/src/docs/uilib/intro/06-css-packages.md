---
fullscreen: true
search: 'Intro - CSS Packages'
---

import Intro, { IntroFooter } from 'dnb-design-system-portal/src/shared/tags/Intro'
import { Next } from 'dnb-design-system-portal/src/shared/tags/Intro'
import { Link } from '@dnb/eufemia/src/elements'

<Intro>

# CSS Packages

All styles are inside of CSS files. In order to ensure flexibility with legacy code, styles are packed into [several combinable packages](!/uilib/usage/customisation/styling) like:

- **dnb-ui-core**
- **dnb-ui-basis**
- **dnb-ui-components**
- **dnb-theme-ui**
- etc.

## CSS Reset

The package **dnb-ui-core** loads by default a CSS `reset/normalize`, optimized for the DNB Eufemia styles and browser universalization.

On [legacy code projects](!/uilib/usage/customisation/styling#how-to-deal-with-existing-styles), rather use **dnb-ui-basis** [in combination with](!/uilib/usage/customisation/styling#core-style) `.dnb-core-style`.

---

<IntroFooter href="/uilib/intro/07-typography" text="Next - Typography" />

</Intro>
