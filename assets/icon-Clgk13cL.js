import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-BCXtuv-b.js";import r from"./demos-vvmT7Yyy.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Icon } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[`The main Icon component is a wrapper for whatever icon you place within it. This means a `,(0,i.jsx)(t.code,{children:`span`}),` wrapping an inline `,(0,i.jsx)(t.code,{children:`SVG`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[`You can use any content you like inside this `,(0,i.jsx)(t.code,{children:`Icon`}),` component.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/icon`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/icon`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Why use it?`}),`
`,(0,i.jsx)(t.p,{children:`You will get several advantages when using it, such as:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`Responsiveness in terms of `,(0,i.jsx)(t.code,{children:`font-size`})]}),`
`,(0,i.jsx)(t.li,{children:`Coloring`}),`
`,(0,i.jsx)(t.li,{children:`Accessibility`}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Importing Icons`}),`
`,(0,i.jsx)(t.p,{children:`In case your environment does not support tree-shaking, import the icons explicitly.`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`// Named ES import
import { bell } from '@dnb/eufemia/icons'

// or named import with modifier
import { bell as Bell } from '@dnb/eufemia/icons'

// Default and explicit ES import
import Bell from '@dnb/eufemia/icons/bell'
`})}),`
`,(0,i.jsx)(t.h3,{children:`Icon Sizes`}),`
`,(0,i.jsx)(t.p,{children:(0,i.jsxs)(t.em,{children:[`Exists in the `,(0,i.jsx)(t.a,{href:`/icons`,children:`Icon Library`})]})}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`default`}),` `,(0,i.jsx)(t.code,{children:`1rem`}),` (16px)`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`medium`}),` `,(0,i.jsx)(t.code,{children:`1.5rem`}),` (24px)`]}),`
`]}),`
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.em,{children:`Additional Sizes`})}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`small`}),` `,(0,i.jsx)(t.code,{children:`0.75rem`}),` (12px)`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`large`}),` `,(0,i.jsx)(t.code,{children:`2rem`}),` (32px)`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`x-large`}),` `,(0,i.jsx)(t.code,{children:`2.5rem`}),` (40px)`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`xx-large`}),` `,(0,i.jsx)(t.code,{children:`3rem`}),` (48px)`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`custom-size`}),` will not be responsive. Width and Height is set as `,(0,i.jsx)(t.code,{children:`pixels`})]}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Filled Icons`}),`
`,(0,i.jsxs)(t.p,{children:[`Some icons support a filled variant where the SVG paths are filled with `,(0,i.jsx)(t.code,{children:`currentColor`}),` instead of being stroked outlines. This is useful for visual emphasis — for example, a filled star to indicate a favorited item, or a filled chevron inside a button.`]}),`
`,(0,i.jsxs)(t.h4,{children:[`Using the `,(0,i.jsx)(t.code,{children:`fill`}),` prop`]}),`
`,(0,i.jsxs)(t.p,{children:[`Set `,(0,i.jsx)(t.code,{children:`fill`}),` on an `,(0,i.jsx)(t.code,{children:`Icon`}),` to fill its SVG paths with `,(0,i.jsx)(t.code,{children:`currentColor`}),`:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`<Icon icon={star} fill />
`})}),`
`,(0,i.jsxs)(t.p,{children:[`See the `,(0,i.jsx)(t.a,{href:`/icons#filled-icons`,children:`Icon Library`}),` for icons that are known to look good when filled.`]}),`
`,(0,i.jsx)(t.h3,{children:`Custom project Icons`}),`
`,(0,i.jsxs)(t.p,{children:[`For decorative or functional icons (not illustrations), use `,(0,i.jsx)(t.code,{children:`SVG`}),` as it gives the user responsiveness and better accessibility. It also gives you more control, so you can change the color and size inherited by the parent HTML element.`]}),`
`,(0,i.jsx)(t.p,{children:`To optimize your SVG icons to be used with Eufemia, you can follow these steps or at least get inspired:`}),`
`,(0,i.jsxs)(t.ol,{children:[`
`,(0,i.jsxs)(t.li,{children:[`Make sure your SVG icon fits in the two sizes (default of `,(0,i.jsx)(t.code,{children:`16px`}),` and medium of `,(0,i.jsx)(t.code,{children:`24px`}),`) with the correct stroke thickness of `,(0,i.jsx)(t.code,{children:`1.5px`}),`.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`Copy`}),` the SVG markup (in Figma, `,(0,i.jsx)(t.code,{children:`right click`}),` -> `,(0,i.jsx)(t.code,{children:`Copy as`}),` -> `,(0,i.jsx)(t.code,{children:`Copy as SVG`}),`).`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`Declutter`}),` and remove ID attributes in the markup, so they do not appear twice in your web application DOM. In most cases, you do not need `,(0,i.jsx)(t.code,{children:`<defs ... />`}),` and the corresponding ids anyway.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`Optimize`}),` the SVG. Use e.g. `,(0,i.jsx)(t.a,{href:`https://jakearchibald.github.io/svgomg/`,children:`Online SVGOMG`}),` by using `,(0,i.jsx)(t.code,{children:`Paste markup`}),`.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`NB:`}),` Do not remove `,(0,i.jsx)(t.code,{children:`viewBox`}),`! The `,(0,i.jsx)(t.code,{children:`viewBox`}),` will together with some CSS ensure that the icon scales based on the root font-size.`]}),`
`,(0,i.jsx)(t.li,{children:`Copy again the optimized markup and paste it into your JSX component (inline) or SVG file.`}),`
`,(0,i.jsxs)(t.li,{children:[`Consume the custom icons with either dynamic imports (`,(0,i.jsx)(t.code,{children:`import(...)`}),`) if you have many icons, or use static imports, like so:`]}),`
`]}),`
`,(0,i.jsx)(t.h4,{children:`If you have an SVG loader`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import ImportedSVGIcon from 'my-icons/custom_icon.svg'

render(<Icon icon={ImportedSVGIcon} />)
`})}),`
`,(0,i.jsx)(t.h4,{children:`Inline the SVG in your JSX`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`function CustomSVGIcon(props) {
  return <svg {...props}>...</svg>
}

render(<Button icon={CustomSVGIcon} />)
`})}),`
`,(0,i.jsx)(t.h4,{children:`SVG import in Create React App`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { ReactComponent as CustomIcon } from './custom_icon.svg'

render(<Icon size="medium">{CustomIcon}</Icon>)
`})}),`
`,(0,i.jsx)(t.h3,{children:`Primary Icon`}),`
`,(0,i.jsxs)(t.p,{children:[`There is also the `,(0,i.jsx)(t.a,{href:`/uilib/components/icon-primary`,children:`IconPrimary`}),` component, which comes with all the `,(0,i.jsx)(t.a,{href:`/icons/primary`,children:`Primary Icons`}),` included in `,(0,i.jsx)(t.code,{children:`@dnb/eufemia`}),`. You do not have to import the primary icons separately.`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};