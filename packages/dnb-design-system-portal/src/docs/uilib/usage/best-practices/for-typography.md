---
title: 'Best Practices for typography'
menuTitle: 'for typography'
draft: false
order: 3
---

# Typography

## Headings and styling

Never use headings (like `<h3>`) for purely styling purposes. Headings have a defined purpose and place in a web document. Using them correctly benefits all users.

Use headings where you think that someone with a **screen reader** would have the benefit of finding and reading a title.

### Think semantics first

Heading levels should have their logical hierarchy and only **increase by one**: `<h1>` followed by `<h2>` followed by `<h3>` and so on.

For styling purposes only, use these classes `.dnb-h1` , `.dnb-h2` or `.dnb-lead` or style your typography according to the UX prototypes.

## Disable local fonts

If you are actively developing, testing or measuring your web app, make sure you disable locally installed fonts which are being used as web fonts. this way you can ensure that the browser will not use these locally installed fonts and display the fonts the end user will actually see.
