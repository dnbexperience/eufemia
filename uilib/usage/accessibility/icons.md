---
title: 'Icons'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.338Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Accessibility of Icons

By using inline SVG, we have the possibility to make graphical assets both **responsive** and **interactive**. In order to do so, use the [Icon](/uilib/components/icon) component. These components provide the needed runtime processing.

## Decorative Icons

The Icon component uses `role="decoration"` by default, which makes it invisible to assistive technologies.

```tsx
render(<Icon icon={BankIcon} size="24" title="Beach" />)
```

## Responsive Icons

Use `size="auto"` to force the icon to inherit the size of its parent element.

```tsx
<H1>
  My H1 with an icon <Icon icon={BankIcon} title="Beach" size="auto" />
</H1>
<H4>
  My H4 with the same icon{' '}
  <Icon icon={BankIcon} title="Beach" size="auto" />
</H4>
```

## SVG Icons

_Scalable Vector Graphics_ can be set up to be scalable and actually respond to the `font-size`.

```tsx
const Responsive = styled.span`
  svg {
    font-size: inherit;
    width: 1.5em;
    height: 1.5em;
  }
`
const Svg = (props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.03 5.22a.75.75 0 0 0-1.06 1.06l4.5 4.5a.75.75 0 0 0 1.06 0l4.5-4.5a.75.75 0 0 0-1.06-1.06L8 9.19 4.03 5.22z"
      fill="#000"
    />
  </svg>
)
render(
  <>
    <p>
      <Svg width="24" height="24" /> - has a fixed size
    </p>
    <p>
      <Responsive>
        <Svg />
      </Responsive>{' '}
      - is responsive
    </p>
  </>
)
```
