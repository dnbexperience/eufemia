---
fullscreen: true
search: 'Intro - Accessibility'
---

import Intro, { IntroFooter } from 'dnb-design-system-portal/src/shared/tags/Intro'

<Intro>

# Accessibility

User Experience (**UX**) is much more than only the visual part. It for sure have to include good accessibility so all people can use our applications, services and solutions.

You have to:

- test **keyboard navigation** during development
- test with **screen readers** during development
- test with **200%** in `font-size` during development

You may read more about [these targets](!/uilib/usage/accessibility).

## Tools

Eufemia includes a range of tools to help you make better accessible applications:

- [Focus Management](!/uilib/usage/accessibility/focus)
- [Accessibility Checklist](!/uilib/usage/accessibility/checklist#accessibility-checklist)
- [Skip Link](!/uilib/usage/accessibility/focus#skip-link)
- [Semantics example](!/uilib/usage/accessibility/checklist#landmark--and-semantics-example)

## Components

- [NumberFormat](!/uilib/components/number-format) makes numbers accessible for screen readers.
- [Heading](!/uilib/components/heading) handles heading leveling automatically.
- [GlobalStatus](!/uilib/components/global-status) includes grouping of form status messages and live announcements for screen readers.
- [FormRow](!/uilib/components/form-row) includes `<fieldset>` and `<legend>`.
- [VisuallyHidden](!/uilib/components/visually-hidden) hides text visually, while makes it available for screen readers. Its based on the helper HTML class `dnb-sr-only`.
- [SkipContent](!/uilib/components/skip-content) similar to a skip link. It allows a user, while tabbing, to skip large parts of content, to reach quickly a save button etc.

All form components includes a `label` property to bind automatically the FormLabel to the components (HTML element).

```jsx
<Input label="Input label:" />
```

And all form components includes the [FormStatus](!/uilib/components/form-status) component which is coupled to the component by using `aria-describedby`.

```jsx
<Input status="Status message:" />
```

### **200%** you said?

---

![How it not should be](./assets/dnb-screenshot-about-font-size.png)

---

<IntroFooter href="/uilib/intro/04-ux-handover" text="Next - UX handover" />

</Intro>
