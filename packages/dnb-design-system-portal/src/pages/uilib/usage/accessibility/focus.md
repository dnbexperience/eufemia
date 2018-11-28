---
header: 'Accessibility'
title: 'Focus'
draft: false
---

# Focus Management

Page Focus is important part of navigation with keys only. Make sure after a navigation content gets loaded, it gets assigned a _invisible_ focus, so the user can continue the navigation inside the new content.

Read more about the term Page Focus in the [Body Component](/uilib/components/body#info).

```html
<body>
  <aside><!-- focusable navigation --></aside>
  <main class="dnb-no-focus" tabindex="-1">
    <!-- more markup with focusable HTMLElements -->
  </main>
</body>
```
