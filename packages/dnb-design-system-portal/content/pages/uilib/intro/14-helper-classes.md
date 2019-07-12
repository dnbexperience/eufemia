---
fullscreen: true
draft: true
order: 14
---

<Intro>

# Section Component

A commonly used visual style is the DNB section divider. To make it easy to achieve this in Your layout setup, have a look at the [Section component](!/uilib/components/section).

## React:

```js
import { Section } from 'dnb-ui-lib'

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

---

<IntroFooter href="/uilib/intro/15-summary" text="Summary" />

</Intro>
