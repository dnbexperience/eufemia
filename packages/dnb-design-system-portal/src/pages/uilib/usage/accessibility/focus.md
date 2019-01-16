---
header: 'Accessibility'
title: 'Focus'
status: 'wip'
draft: false
---

# Focus Management

Page Focus is an important part of keyboard-only navigation.
After a navigation content gets loaded, make sure to assign it an _invisible_ focus, so the user can continue the navigation inside this new content.

Read more about the term Page Focus in the [Body Component](/uilib/components/body#info).

```html
<body>
  <aside><!-- focusable navigation --></aside>
  <main class="dnb-no-focus" tabindex="-1">
    <!-- more markup with focusable HTMLElements -->
  </main>
</body>
```
