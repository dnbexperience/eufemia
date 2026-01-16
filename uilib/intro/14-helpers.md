---
metadata: https://eufemia.dnb.no/uilib/intro/14-helpers/metadata.json
---

<Intro>

# Section Component

A commonly used visual style is the DNB section divider. To make it easy to achieve this in your layout setup, have a look at the [Section component](/uilib/components/section).

## React:

```jsx
import { Section } from '@dnb/eufemia'

render(
  <Section backgroundColor="mint-green" spacing>
    Visual DNB Section
  </Section>,
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

You may have a look on all the CSS and JavaScript [helpers](/uilib/helpers) which comes included in the package.

---

<IntroFooter href="/uilib/intro/15-summary" text="Summary" />

</Intro>
