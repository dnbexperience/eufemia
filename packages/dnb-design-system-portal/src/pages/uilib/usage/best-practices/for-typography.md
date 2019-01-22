---
header: 'UI Library'
title: 'Best Practices for typography'
menuTitle: 'for typography'
draft: false
order: 2
---

# Typography

### Headings and styling

Never use Headings (like `<h4>`) for only styling purposes. Headings exist in first place to practice correct semantics, witch again will gain all kind of users.

Use headings where You think that someone with a Screen Reader would have benefits of finding and reading a title.

Heading levels should only **increase by one**.

## Disable local fonts

In case You are actively develop, testing or measuring Your web app, make sure You disable local installed fonts, witch are used as web fonts. This way You are sure the browser is not using the locally installed fonts, but actually using the fonts the end user will get.
