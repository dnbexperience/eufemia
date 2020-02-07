---
title: 'Numbers'

order: 3
---

# Numbers (deprecated)

Update: the number features are not needed anymore, using the DNB font.

Numbers comes in three variants: `Proportional Lining`, `Tabular Lining` and `Proportional Old Style`.

The **default lining** is set to `Proportional Lining`, like the CSS class `.dnb-typo-number--lining`.

Use `Tabular Lining` in tables and in other contexts where lots of numbers are side-by-side.

`Proportional Old Style` is currently chosen away in favor of proportional lining due to future font upgrades.

## Lining Variants and Examples

<div class="example-box">
  <dl>
    <dt>Proportional Lining</dt>
    <dd class="dnb-typo-number--lining">0123456789</dd>
  </dl>
  <dl>
    <dt>Tabular Lining</dt>
    <dd class="dnb-typo-number--tabular">0123456789</dd>
  </dl>
  <dl>
    <dt>Proportional Old Style</dt>
    <dd class="dnb-typo-number--oldstyle">0123456789</dd>
  </dl>
</div>

### Helper Classes and usage in HTML

```html
<p class="dnb-typo-number--lining">0123456789</p>
<p class="dnb-typo-number--tabular">0123456789</p>
<p class="dnb-typo-number--oldstyle">0123456789</p>
```
