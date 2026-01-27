---
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.328Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

<Intro>

# Layout

To get a good user experience and a professional looking result, perfect layouting is crucial.

- Use the **8 Pixel Grid** everywhere, both on spacing and sizes.
- Use either `em` or `rem` (root em) units for layouts and spacing.
- Use **CSS Flexbox** or **CSS Grid** as layout systems.

## Spacing

Remember, everything should be in the **8px grid** (0.5rem) spacing - even it the designer sometimes are one or two pixels of, you now know what it should be.

![UX layout spacing](../usage/assets/ux-layout-spacing.png)

You may have a [look at the layout docs](/uilib/usage/layout) as well as [the spacing helpers](/uilib/usage/layout/spacing) and the [Space](/uilib/layout/space) component.

But there is also support for basic spacing in every component:

### Example

```tsx
<Input label="My Input" value="Input" right="small" />
<Button text="Button" />
```

---

<IntroFooter
  href="/uilib/intro/11-components-elements-extensions"
  text="Next - Components, Elements and Extensions"
/>

</Intro>
