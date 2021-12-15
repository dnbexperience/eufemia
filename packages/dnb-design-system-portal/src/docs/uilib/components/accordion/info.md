---
showTabs: true
---

## Description

The Accordion component is a combination of an accessible button (header area) and a content container.

The component is made so you can compose different parts according to your technical needs.

By default the Accordion component will animate the users events, resulting in an ending height of `auto`. This way the content is still responsive after the animation has ended.

### Accordion provider

Use the `Accordion.Provider` to send along accordion properties to all nested accordions.

### Accordion groups

There is the `Accordion.Provider` and `Accordion.Group`. They are technical the same, except that `Accordion.Group` will provide automatically an unique `group` id, and with that, make all the nested accordions work together and close each other.

#### Unexpected behavior

**NB:** Please try to avoid using a group, because it initiates an unexpected behavior accessibility-wise. This is because the user's interaction will trigger an action in another place, out of the current context, something some users may not expect to happen. It is an automated out-of-context UI execution.
