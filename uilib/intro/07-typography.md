---
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.326Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

<Intro>

# Typography

Fonts are handled automatically once the CSS packages **dnb-ui-core** or **dnb-ui-basis** are loaded.

Every typography HTML element, like headings and paragraphs, have a defined `height`, respective `line-height` so everything falls exactly into the **8 pixel grid**.

You don't need to define the `font-family` ever, but rather use CSS Custom Properties for [font-weight](/uilib/typography/font-weight), [font-size](/uilib/typography/font-size) and [line-height](/uilib/typography/line-height).

```css
.selector {
  font-weight: var(--font-weight-medium);
}
```

The default [font-weight](/uilib/typography/font-weight) is currently **Book**, alongside _Demi_ and _Medium_.

The default _font lining_ is **Proportional Lining**. But in some circumstances you may use, alongside with the UX designer, [Tabular Lining](/uilib/typography/numbers).

Read [more about Typography](/uilib/typography)

---

<IntroFooter
  href="/uilib/intro/08-color-usage"
  text="Next - Color usage"
/>

</Intro>
