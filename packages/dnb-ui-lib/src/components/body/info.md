---
name: 'Body'
class: '.dnb-body'
type: 'pattern'
status: 'prototype'
version: 0.5.0
---

The body style should be used as a mother root of all other components and contents.
You can assign the DNB style by using the css class `.dnb-body` on any element as well.

This component does several things automatically, like:

- Assigning a `no-touch` or `touch` css class to the `<body>` tag (defineIsTouch)
- Defining what input is used to get **focus** at the current moment. Is the tab key pressed, the body tag gets an attribute like: `data-whatinput="keyboard"`

## Page Focus

The body component also has a named export, called **pageFocus**.
Either call `pageFocus(HTMLElement)` once the "content wrapper element" is mounted, or manually add a css class like `dnb-no-focus` to it.

Read more about the term [Page Focus](/quickguide-developer/accessibility/focus).

## NB: Web-Component

Once You use the **Body** component as a _Custom Element_ (`<dnb-body />`) - make sure You don't use it like a wrapper component. But just use the class `dnb-body` on any other tag, like:

```html
<body>
  <div class="dnb-body">
    <!-- more markup ... -->
  </div>
</body>
```
