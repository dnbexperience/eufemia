---
title: 'WCAG Accessibility'
draft: false
icon: 'accessibility'
---

# Accessibility, Inclusivness and WCAG

#### Principles

Accessibility affects all users, not just those with stereotypical disabilities. The extra work that may be required to ensure good accessibility in DNB applications and services will be worth it.

Remember - test for accessibility early in the design process.

## WCAG (Web Content and Accessibility Guide)

The four main tenets of the WCAG 2.1 are:

- Perceivable
- Operable
- Understandable
- Robust

#### Perceivable

Perceivable content must be readable.

Make sure there is enough contrast between background and text colours.

Larger text is generally more readable. Make sure text can easily be resized.

Images should have alt text.

For video, provide transcripts and captions for visual-heavy videos.

##### Do's / Don'ts

Don't use font sizes below 14px (0.875 em).

Avoid fixed pixel sizes - use relative sizing.

Never put important text as part of an image.

#### Operable

All users should be able to get to all the pages and forms.

Users should be able to interact with what they need to:

- Links
- forms
- buttons
- all other navigating and information retrieval

##### Keyboard navigation

Keyboard navigation covers many use cases and contexts. Users who cannot see the position of the cursor on the screen, or who do not possess fine motor skills in their hands, often rely on the keyboard.

Keyboard shortcuts can increase task efficiency.

##### Progressive enhancement

Forms, navigation and other essential components and actions should work on older browsers and devices. Styling comes second to content and accessibility.

#### Understandable

Contents' intended meaning is easily understandable.

Use simple, honest, direct language.

#### Avoid assumptions

This especially applies to use of icons and symbols. What may be obvious to a designer or a user in one culture may not be so to another.

Back up icons and symbols with clear labels, captions or subtitles.

#### Robustness

Make content accessible from a wide variety of devices.

##### Semantic Markup

Semantic markup makes robust content that's accessible. Pay attention to the following:

- Semantic HTML tags
- Proper use of aria tags
- Logically ordering DOM elements
- Server-side rendering to ensure it's delivered properly

##### Responsive Design

Responsive Design ensures that content can be viewed on a wide spectrum of display sizes.
Responsive component and layout design should be planned from the beginning and not applied as an afterthought. Build prototypes early in code or design and begin testing their breakpoints sooner rather than later.

#### Accessibility checklist for designers

NB: Move this section to it's own menu item pages

Building an accessible interface starts at the UX stage of design. Ideally a designer should be able to convey to a developer how they would like a keyboard user to use and navigate through an interface. Much of the DNB Design System's styling and development have taken accessibility into consideration to a certain extent (see https://eufemia.dnb.no/uilib/usage/accessibility). However, each interface design comes with it's own challenges and requirement

- make sure the content is perceivable - ensure good contrast between background and foreground
- Plan how you would like a keyboard navigator to access interface laments/areas. What will the order of tabbing be?
- Should you provide a ’skip to content’ feature to allow users to get to the main content quickly
- Plan how the interface will respond to different screen sizes. The layout may have to change - how will this affect accessability?
- Zoom the interface - some users zoom their browser to increase the size. How will elements behave in these scenarios? Will they overlap. What happens to wide horizontal components such as navigation or tab sets?
- Fluid design as opposed to using fixed breakpoints, allows the content to reflow in the same order as screen readers render content to users who are blind or visually impaired.
