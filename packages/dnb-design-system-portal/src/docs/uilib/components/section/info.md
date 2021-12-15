---
showTabs: true
---

## Description

The Section component is a visual helper. It wraps content inside a visual section banner. Under the hood it uses a couple of tricks to get an infinite wide look background. You don't need to do anything more than you else would do regarding your content and the `max-width`. The background from the Section component will go beyond a `max-width`.

## Usage

The following example shows form sections with different styling. The helper prop `spacing` adds spacing to the section if needed.

## Customize color

Example of how to change the background color and by using a custom color. Yes, we use the `color` property for that.

### Define a custom Section color

1. Create a custom CSS style declaration

```css
.dnb-section--custom-section::after {
  color: var(--color-ocean-green);
}
```

2. and use that custom CSS class

```jsx
<Section style_type="custom-section">...</Section>
```

### Custom Section color in plain HTML

1. Create a custom CSS style declaration

```css
.custom-section::after {
  color: var(--color-ocean-green);
}
```

2. and use that custom CSS class

```html
<div className="dnb-section custom-section">...</div>
```
