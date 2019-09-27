---
fullscreen: true
draft: true
order: 7
---

<Intro>

# Color usage

Colors are defined in two types:

- Profile (Brand colors)
- UX (Custom web usage colors)

It is recommended to use **CSS Custom Properties name** like `--color-ocean-green` to use a color. [Use a polyfill](!/uilib/usage/customisation/colors#polyfill) for legacy browser support.

```css
.selector {
  background-color: var(--color-ocean-green);
}
```

In Your Application root:

```js
// import the polyfill (Ponyfill)
import cssVars from 'css-vars-ponyfill'

// run the polyfill
cssVars()
```

See the [Color Table](!/uilib/usage/customisation/colors#colors-table).

---

<IntroFooter href="/uilib/intro/09-icons" text="Next - Icons" />

</Intro>
