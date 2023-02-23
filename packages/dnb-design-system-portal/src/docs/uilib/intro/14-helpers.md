---
fullscreen: true
search: 'Intro - Good to know'
redirect_from:
  - /uilib/intro/14-helper-classes
---

import Intro, { IntroFooter } from 'dnb-design-system-portal/src/shared/tags/Intro'

<Intro>

# Section Component

A commonly used visual style is the DNB section divider. To make it easy to achieve this in Your layout setup, have a look at the [Section component](!/uilib/components/section).

## React:

```jsx
import { Section } from '@dnb/eufemia'

render(
  <Section style_type="mint-green" spacing>
    Visual DNB Section
  </Section>
)
```

## CSS:

```html
<div className="dnb-section dnb-section--spacing dnb-section--mint-green">
  Visual DNB Section
</div>
```

## Demo:

<div className="dnb-section dnb-section--spacing dnb-section--mint-green">
  Visual DNB Section
</div>

## More helpers

You may have a look on all the CSS and JavaScript [helpers](!/uilib/helpers) which comes included in the package.

---

<IntroFooter href="/uilib/intro/15-summary" text="Summary" />

</Intro>
