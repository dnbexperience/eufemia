---
showTabs: true
---

import { Button } from '@dnb/eufemia/src'

## Description

`SkipContent` is a keyboard navigation helper to skip over larger parts of content – that contains interactive elements.

It gives users, using keyboard navigation, the option to skip over content, if desired.

**When is it desired?**

Typical when an action button, such as a save button, is placed below content.

**What is considered as large contents?**

- Tables with interactive elements
- Lists with interactive elements
- Articles many interactive elements
- Parts of a form

**What are interactive elements?**

- Text links/Anchors
- Buttons
- Inputs and other form elements
- Basically every focusable element

**How does it work?**

1. An initially hidden button will reveal when `tab` key is used.
1. The user can then press this button, or continue tabbing when desired.
1. When the user decides to continue using the `tab` key, the button will disappear again.
1. When the button gets pressed, the focus will be set to another defined HTML class selector and the browser will scroll to the element.

**Good description**

The revealing button needs a clear message to let the user easily understand the intention.

Example:

<Button variant="secondary">Skip table with enter key – or continue tabbing</Button>

### Screen readers and landmarks

The `SkipContent` helper component is mainly dedicated to keyboard navigation.

In order to let screen readers skip large parts of content, you need to ensure your HTML has [logical landmarks and regions](/uilib/usage/accessibility/checklist/#landmark--and-semantics-example).
