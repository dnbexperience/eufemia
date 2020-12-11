import { check as CheckIcon } from 'dnb-ui-lib/src/icons'
import { Icon } from 'dnb-ui-lib/src/components'

## Eufemia aims to be [WCAG 2.1](https://www.w3.org/TR/WCAG21/) compliant

HTML elements are by default good at accessibility. Eufemia components and its building blocks are also made to include all the needed features to make them accessible.

## WCAG 2.1 and Universal design (UU)

[From year 2021](https://uu.difi.no/krav-og-regelverk/webdirektivet-og-wcag-21), all new and existing web solutions has to follow [WCAG 2.1](https://www.w3.org/TR/WCAG21/).

On _difi.no_ you find an easy to read [WCAG guide (Norwegian)](https://uu.difi.no/krav-og-regelverk/wcag-20-standarden).

## Main focus

You as a developer has the responsibility to have the technical knowledge about accessibility. You have to implement and [use best practices](!/uilib/usage/accessibility) to make applications accessible for every user. We talk about all kinds of users, people who have temporary or permanent disabilities, so they depend on what you put into the application - as code. Therefore, you have to:

- Test **keyboard navigation** during development <Icon icon={CheckIcon} aria-hidden />
- Test with **screen readers** during development <Icon icon={CheckIcon} aria-hidden />
- Test with **200%** in `font-size` during development <Icon icon={CheckIcon} aria-hidden />

## Keyboard users

Should be able to navigate the application by their keyboard only. For those it is extremely important that [active focus management](uilib/usage/accessibility/focus) is done right and has the required [focus ring](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#navigation-mechanisms-focus-visible) in place.

> **2.1.1 Keyboard:** All functionality of the content is _operable through a keyboard_ interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user's movement and not just the endpoints.

### Your responsibility

You as a developer has to make sure your application supports keyboard navigation. This will also make your application more assistive technology and screen friendly.

The `dnb-ui-lib` and it's building blocks are supporting keyboard usage.

Read more about [focus management and the helper tools](!/uilib/usage/accessibility/focus).

## Screen reader users

Should be able to use the most common used screen readers like VoiceOver (Apple devices) and NVDA or JAWS on Windows. Read more about [screen readers](!/uilib/usage/accessibility/screenreader).

> **4.1 Compatible:** Maximize compatibility with current and future user agents, _including assistive technologies_.

### Your responsibility

Good keyboard support is crucial to make web application accessible on for assistive technologies. So - [think landmark and semantics first](!/uilib/usage/accessibility#landmark--and-semantics-example). This includes also [typography](!/uilib/usage/best-practices/for-typography#think-semantics-first) and best practices for [images and illustrations](!/uilib/usage/accessibility/screenreader).

## **200%** in `font-size` {#font-size}

The [WCAG 2.1](https://www.w3.org/TR/WCAG21/) document is describing it clearly:

> **1.4.4 Resize text:** Text can be resized without assistive technology _up to 200 percent without loss of content or functionality_.<br /><br /> **1.4.8 Visual Presentation:** Text can be resized without assistive technology up to 200 percent in a way that _does not require the user to scroll horizontally_ to read a line of text.

### Your responsibility

This means; every application **has to be made responsive**. Even if the application lives in a static sized container (960px). Use your browser or system settings to change the `font-size` for testing purposes.

Read [more about responsive layouts](!/uilib/usage/layout#responsiveness).

The `dnb-ui-lib` and it's building blocks are build from ground up to support font-size adaption automatically.

### Demos

You find examples of responsive application layouts in the [demos section](!/uilib/getting-started/demos).
