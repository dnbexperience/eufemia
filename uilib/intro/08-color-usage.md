---
version: 11.1.0
generatedAt: 2026-05-04T18:06:22.427Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

<Intro>

# Color usage (deprecated)

---

**Deprecated:** The `--color-*` CSS custom properties and this color documentation are deprecated. Use [Design Tokens – Colors](/uilib/usage/customisation/theming/design-tokens/colors) instead.

---

Colors are defined in two types:

- Profile (Brand colors)
- UX (Custom web usage colors)

It is recommended to use **CSS Custom Properties name** like `--color-ocean-green` to use a color. For legacy browser support, read more about why and how to [use a polyfill](/uilib/usage/customisation/styling/polyfill).

```css
.selector {
  background-color: var(--color-ocean-green);
}
```

See the [Color Table](/uilib/usage/customisation/colors#colors-table).

---

<IntroFooter href="/uilib/intro/09-icons" text="Next - Icons" />

</Intro>
