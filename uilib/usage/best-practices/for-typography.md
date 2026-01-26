---
title: 'Best Practices for typography'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.342Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Typography

## Headings and styling

Never use headings (like `<h3>`) for purely styling purposes. Headings have a defined purpose and place in a web document. Using them correctly benefits all users.

Use headings where you think that someone with a **screen reader** would have the benefit of finding and reading a title.

### Think semantics first

Heading levels should have their logical hierarchy and only **increase by one**: `<h1>` followed by `<h2>` followed by `<h3>` and so on.

For styling purposes, use these classes `.dnb-h--xx-large`, `.dnb-h--x-large`, `.dnb-h--large`, `.dnb-h--medium` (`.dnb-lead`) or style your typography according to the UX prototypes.

## Line length and readability

For optimal readability and accessibility, maintain appropriate line lengths for text content. Long lines can be difficult to read, especially for users with dyslexia or visual impairments.

### Using proseMaxWidth for optimal line length

Typography components like `H2` and `P` support the `proseMaxWidth` prop to limit text width based on character count, creating optimal reading line lengths:

```tsx
<H2 proseMaxWidth={80}>
  This heading will be limited to approximately 80 characters wide
</H2>
<P proseMaxWidth={60}>
  This paragraph will be limited to approximately 60 characters wide
</P>
```

### Accessibility benefits

- **Improved readability**: Optimal line length reduces eye strain and improves comprehension
- **Better for screen readers**: Shorter lines are easier to navigate with assistive technologies
- **Responsive design**: Character-based width adapts to different font sizes and zoom levels
- **Dyslexia-friendly**: Shorter lines help users with reading difficulties

### Recommended line lengths

- **Headings**: 60-80 characters for optimal impact
- **Body text**: 45-75 characters for comfortable reading
- **Captions and small text**: 40-60 characters

## Disable local fonts

If you are actively developing, testing or measuring your web app, make sure you disable locally installed fonts which are being used as web fonts. This way you can ensure that the browser will not use these locally installed fonts and display the fonts the end user will actually see.
