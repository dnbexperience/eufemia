---
title: 'Icons'
---

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import Beach from 'Docs/uilib/usage/accessibility/assets/beach'

# Accessibility of Icons

By using inline SVG, we have the possibility to make graphical assets both **responsive** and **interactive**. In order to do so, use the [Icon](/uilib/components/icon) or [IconPrimary](/uilib/components/icon-primary) component. These components provide the needed runtime processing.

## Decorative Icons

If your icons are purely **decorative**, you’ll need to manually add an **aria-hidden** (results in `aria-hidden="true"`) attribute to each of your icons so your app is "accessible".

<ComponentBox scope={{Beach}}>
{`
<Icon icon={Beach} size="64" title="Beach" aria-hidden="true" />
`}
</ComponentBox>

## Responsive Icons

Use `size="auto"` to force the icon to inherit the size of its parent element.

<ComponentBox scope={{Beach}}>
{`
<H1>My H1 with an icon <Icon icon={Beach} title="Beach" size="auto" /></H1>
<H4>My H4 with the same icon <Icon icon={Beach} title="Beach" size="auto" /></H4>
`}
</ComponentBox>

## SVG Icons

_Scalable Vector Graphics_ can be set up to be scalable and actually respond to the `font-size`.

<ComponentBox scope={{Beach}} useRender>
{`
const Responsive = styled.span\`
  svg {
    font-size: inherit;
    width: 1.5em;
    height: 1.5em;
  }
\`
\nconst Svg = (props) => (<svg
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
</svg>)
\nrender(<>
  <p>
    <Svg width="24" height="24" /> - has a fixed size
  </p>
  <p>
    <Responsive><Svg /></Responsive> - is responsive
  </p>
  <p>
    <span className="dnb-icon dnb-icon--medium">
      <Svg />
    </span> - uses <code>.dnb-icon</code>
  </p>
</>)
`}
</ComponentBox>
