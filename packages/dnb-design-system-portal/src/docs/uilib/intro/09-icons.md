---
fullscreen: true
search: 'Intro - Icons'
---

import Intro, { IntroFooter } from 'dnb-design-system-portal/src/shared/tags/Intro'

<Intro>

# Icons

Icons are categories on two [main groups](!/icons) and comes in two sizes each:

## [Primary Icons](!/icons/primary)

```jsx
<Button icon="chevron_right" text="Button" />
```

## [Secondary Icons](!/icons/secondary)

```jsx
import { hamburger } from `@dnb/eufemia/icons`
<Button icon={hamburger} text="Button" />
```

Primary Icons are used inside of other custom [Components](!/uilib/components) and are imported by default.

It is recommended to use the [Icon Component](!/uilib/components/icon) to display icons for best accessibility.

---

<IntroFooter href="/uilib/intro/10-layout" text="Next - Components, Elements and Extensions" />

</Intro>
