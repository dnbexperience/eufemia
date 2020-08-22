---
fullscreen: true
search: 'Intro - Color usage'
---

<Intro>

# Color usage

Colors are defined in two types:

- Profile (Brand colors)
- UX (Custom web usage colors)

It is recommended to use **CSS Custom Properties name** like `--color-ocean-green` to use a color. For legacy browser support, read more about why and how to [use a polyfill](/uilib/usage/customisation/styling/polyfill).

```css
.selector {
  background-color: var(--color-ocean-green);
}
```

See the [Color Table](!/uilib/usage/customisation/colors#colors-table).

---

<IntroFooter href="/uilib/intro/09-icons" text="Next - Icons" />

</Intro>
