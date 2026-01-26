---
title: 'Font Weights'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.333Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Font Weights for

<ChangeStyleTheme label="Change the brand:" bottom="large" />

For details about what values Typographic elements do use, have a look at the [Fonts & Typography](/quickguide-designer/fonts#typographic-elements) documentation.

## Eufemia has three (3) font-weights

| Type                                                                                              | CSS variable / property | CSS Classname             |
| ------------------------------------------------------------------------------------------------- | ----------------------- | ------------------------- |
| <span className="dnb-t__weight--regular">Regular ({GetPropValue('--font-weight-regular')})</span> | `--font-weight-regular` | `.dnb-t__weight--regular` |
| <span className="dnb-t__weight--medium">Medium ({GetPropValue('--font-weight-medium')})</span>    | `--font-weight-medium`  | `.dnb-t__weight--medium`  |
| <span className="dnb-t__weight--bold">Bold ({GetPropValue('--font-weight-bold')})</span>          | `--font-weight-bold`    | `.dnb-t__weight--bold`    |

### How to use the weights (CSS)

```css
/* I am Regular */
p {
  font-weight: normal;
}

/* I am Medium */
p {
  font-weight: var(--font-weight-medium); /* 500 */
}

/* I am Bold */
p {
  font-weight: var(--font-weight-bold); /* 600 (in Ui theme) */
}

/* This will result in loading the Bold Font */
.my-new-class {
  font-weight: var(--font-weight-bold);
}
```

### Usage in HTML (Helper Classes)

```html
<!-- Example usage of Weights in Markup -->
<h3 class="dnb-t__weight--regular">Heading</h3>
<p class="dnb-t__weight--medium">Paragraph</p>
<span class="dnb-t__weight--bold">Third Tag</span>
```

## weight examples

```tsx
render(
  <Wrapper>
    {/* Regular */}
    <FontUsageExample
      font_family="DNB Regular"
      typo_class="dnb-t__weight--regular"
    />

    {/* Medium */}
    <FontUsageExample
      font_family="DNB Medium"
      typo_class="dnb-t__weight--medium"
    />

    {/* Bold */}
    <FontUsageExample
      font_family="DNB Bold"
      typo_class="dnb-t__weight--bold"
    />

    {/* Mono Regular */}
    <FontUsageExample
      font_family="DNB Mono Regular"
      typo_class="dnb-t__weight--regular dnb-t__family--monospace"
    />
  </Wrapper>
)
```
