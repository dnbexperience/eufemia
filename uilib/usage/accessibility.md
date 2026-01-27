---
title: 'Accessibility'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.355Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Accessibility

## Eufemia aims to be [WCAG 2.1](https://www.w3.org/TR/WCAG21/) compliant

HTML elements are by default good at accessibility. Eufemia components and its building blocks are also made to include all the needed features to make them accessible.

## WCAG 2.1 and Universal design (UU)

[From year 2021](https://www.uutilsynet.no/webdirektivet-wad/eus-webdirektiv-wad/265), all new and existing web solutions have to follow [WCAG 2.1](https://www.w3.org/TR/WCAG21/).

On _uutilsynet.no_ you can find an easy to read [WCAG guide (Norwegian)](https://www.uutilsynet.no/wcag-standarden/wcag-20-standarden/86).

## Main focus

As a developer, you have the responsibility to have the technical knowledge about accessibility. You have to implement and use best practices to make applications accessible for every user. We're talking about all kinds of users—people who have temporary or permanent disabilities who depend on what you put into the application as code. Therefore, you have to:

- Test **keyboard navigation** during development <Icon icon={CheckIcon} aria-hidden />
- Test with **screen readers** during development <Icon icon={CheckIcon} aria-hidden />
- Test with **200%** in `font-size` during development <Icon icon={CheckIcon} aria-hidden />
- Test page at **320px** screen width during development <Icon icon={CheckIcon} aria-hidden />
- Test with **reduced motion** preferences enabled <Icon icon={CheckIcon} aria-hidden />

## Reduced motion support

Eufemia respects the `prefers-reduced-motion` user preference, automatically reducing or removing animations and transitions for users with motion sensitivity or vestibular disorders. This includes:

- Modal and drawer animations
- Accordion expansions/collapses
- Progress indicator animations
- Scroll behavior transitions
- Icon rotations and transforms

All animations are automatically minimized when a user has enabled reduced motion in their operating system settings. This is compliant with [WCAG 2.1 Success Criterion 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html).

## Keyboard users

Should be able to navigate the application by their keyboard only. For those it is extremely important that [active focus management](/uilib/usage/accessibility/focus) is done right and has the required [focus ring](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#navigation-mechanisms-focus-visible) in place.

> [**2.1.1 Keyboard:**](https://www.w3.org/TR/WCAG21/#keyboard) All functionality of the content is _operable through a keyboard_ interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user's movement and not just the endpoints.

### Your responsibility

You as a developer have to make sure your application supports keyboard navigation. This will also make your application more assistive technology and screen friendly.

The `@dnb/eufemia` and it's building blocks are supporting keyboard usage.

Read more about [focus management and the helper tools](/uilib/usage/accessibility/focus).

## Screen reader users

Should be able to use the most commonly used screen readers like VoiceOver (Apple devices) and NVDA or JAWS on Windows. Read more about [screen readers](/uilib/usage/accessibility/screenreader).

> [**4.1 Compatible:**](https://www.w3.org/TR/WCAG21/#compatible) Maximize compatibility with current and future user agents, _including assistive technologies_.

### Your responsibility

Good keyboard support is crucial to making web applications accessible for assistive technologies. So - [think landmark and semantics first](/uilib/usage/accessibility#landmark--and-semantics-example). This also includes [typography](/uilib/usage/best-practices/for-typography#think-semantics-first) and best practices for [images and illustrations](/uilib/usage/accessibility/screenreader).

## Typography accessibility

Typography plays a crucial role in accessibility. Beyond semantic markup, consider:

- **Line length**: Use the `proseMaxWidth` prop on typography components to maintain optimal reading line lengths
- **Font scaling**: Ensure text remains readable at 200% zoom
- **Contrast**: Maintain sufficient color contrast between text and background
- **Spacing**: Use consistent spacing that works with assistive technologies

Read more about [typography best practices](/uilib/usage/best-practices/for-typography#line-length-and-readability) for accessibility.

## **200%** in `font-size` \{#font-size\}

The [WCAG 2.1](https://www.w3.org/TR/WCAG21/) document is describing it clearly:

> [**1.4.4 Resize text:**](https://www.w3.org/TR/WCAG21/#resize-text) Text can be resized without assistive technology _up to 200 percent without loss of content or functionality_.<br /><br /> [**1.4.8 Visual Presentation:**](https://www.w3.org/TR/WCAG21/#visual-presentation) Text can be resized without assistive technology up to 200 percent in a way that _does not require the user to scroll horizontally_ to read a line of text.

### Your responsibility

This means; every application **has to be made responsive**. Even if the application lives in a static sized container (960px). Use your browser or system settings to change the `font-size` for testing purposes.

Read [more about responsive layouts](/uilib/usage/layout#units).

The `@dnb/eufemia` and its building blocks are build from ground up to support font-size adaption automatically.

## 320px screen width minimum

This is to ensure that users with visual limitations can sufficiently zoom the page even on a medium-sized monitor. It's equivalent to 400% zoom in a 1280px viewport.

> [**1.4.10 Reflow:**](https://www.w3.org/TR/WCAG21/#reflow) Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for: Vertical scrolling content at a width equivalent to 320 CSS pixels.

Make sure that you take into consideration any paddings that might be added around your content. If the content you are working on will be placed inside a container with 16px padding on each side, you will need to test at 288px (320 - 16 - 16).

## Tooling tips

- Use [ESLint](https://eslint.org) with [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) in your Code Editor setup.
- Use **axe** in [integration tests](/uilib/usage/best-practices/for-testing#integration-tests)
- There are several integrations for Developer Tools, including [axe-core](https://www.deque.com/axe/)
- Testing semantics is never enough; use actual [screen readers](/uilib/usage/accessibility/screenreader)
