---
fullscreen: true
draft: true
order: 6
---

<Intro>

# Typography

Fonts are handled automatically once the CSS packages **dnb-ui-core** or **dnb-ui-basis** are loaded.

Every typography HTML element, like headings and paragraphs, have a defined `height`, respective `line-height` so everything falls exactly into the **8 pixel grid**.

You don't need to define the `font-family` ever, but rather use CSS Custom Properties for `font-weight`.

```css
.selector {
  font-weight: var(--font-weight-demi);
}
```

The default [font-weight](!/uilib/typography/font-weights) is currently **Book**, alongside _Demi_ and _Medium_.

The default _font lining_ is **Proportional Lining**. But in some circumstances you may use, alongside with the UX designer, [Tabular Lining](!/uilib/typography/numbers).

Read [more about Typography](!/uilib/typography)

---

<IntroFooter href="/uilib/intro/08-color-usage" text="Next - Color usage" />

</Intro>
