---
draft: true
---

**This is important!** You as a developer has the responsibility to have the technical knowledge to implement and [use best practices](!/uilib/usage/accessibility) to make applications accessible for every end user. We talk about all kinds of people who have temporary or permanent disabilities, so they depend on what you put into the application as code.

## **200%** in `font-size`

The WGAC 2 document is describing it clearly:

> **1.4.4 Resize text:** Text can be resized without assistive technology _up to 200 percent without loss of content or functionality_.<br /> **1.4.8 Visual Presentation:** Text can be resized without assistive technology up to 200 percent in a way that _does not require the user to scroll horizontally_ to read a line of text.

To make it clear:

- ... up to 200 percent without loss of content or functionality ...
- ... does not require the user to scroll horizontally ...

This means, every application **has to be made responsive**. Even if the application lives in a static sized container (960px). Use your browser or system settings to change the `font-size` for testing purposes.

## Screen reader users

Should be able use the most common used screen readers like VoiceOver (Apple devices) and NVDA or JAWS on Windows. Read more about [screen readers](uilib/usage/accessibility/screenreader).

## Keyboard users

Should be able to navigate the application by their keyboard only. For those it is extremely important that [active focus management](uilib/usage/accessibility/focus) is done right.
