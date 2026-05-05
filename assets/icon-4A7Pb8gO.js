import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import n from"./demos-B5PEdg2S.js";var r=e();function i(e){let n={a:`a`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Icon } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[`The main Icon component is a wrapper for whatever icon you place within it. This means a `,(0,r.jsx)(n.code,{children:`span`}),` wrapping an inline `,(0,r.jsx)(n.code,{children:`SVG`}),`.`]}),`
`,(0,r.jsxs)(n.p,{children:[`You can use any content you like inside this `,(0,r.jsx)(n.code,{children:`Icon`}),` component.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/icon`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/icon`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`Why use it?`}),`
`,(0,r.jsx)(n.p,{children:`You will get several advantages when using it, such as:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`Responsiveness in terms of `,(0,r.jsx)(n.code,{children:`font-size`})]}),`
`,(0,r.jsx)(n.li,{children:`Coloring`}),`
`,(0,r.jsx)(n.li,{children:`Accessibility`}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`Importing Icons`}),`
`,(0,r.jsx)(n.p,{children:`In case your environment does not support tree-shaking, import the icons explicitly.`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`// Named ES import
import { bell } from '@dnb/eufemia/icons'

// or named import with modifier
import { bell as Bell } from '@dnb/eufemia/icons'

// Default and explicit ES import
import Bell from '@dnb/eufemia/icons/bell'
`})}),`
`,(0,r.jsx)(n.h3,{children:`Icon Sizes`}),`
`,(0,r.jsx)(n.p,{children:(0,r.jsxs)(n.em,{children:[`Exists in the `,(0,r.jsx)(n.a,{href:`/icons`,children:`Icon Library`})]})}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`default`}),` `,(0,r.jsx)(n.code,{children:`1rem`}),` (16px)`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`medium`}),` `,(0,r.jsx)(n.code,{children:`1.5rem`}),` (24px)`]}),`
`]}),`
`,(0,r.jsx)(n.p,{children:(0,r.jsx)(n.em,{children:`Additional Sizes`})}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`small`}),` `,(0,r.jsx)(n.code,{children:`0.75rem`}),` (12px)`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`large`}),` `,(0,r.jsx)(n.code,{children:`2rem`}),` (32px)`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`x-large`}),` `,(0,r.jsx)(n.code,{children:`2.5rem`}),` (40px)`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`xx-large`}),` `,(0,r.jsx)(n.code,{children:`3rem`}),` (48px)`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`custom-size`}),` will not be responsive. Width and Height is set as `,(0,r.jsx)(n.code,{children:`pixels`})]}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`Custom project Icons`}),`
`,(0,r.jsxs)(n.p,{children:[`For decorative or functional icons (not illustrations), use `,(0,r.jsx)(n.code,{children:`SVG`}),` as it gives the user responsiveness and better accessibility. It also gives you more control, so you can change the color and size inherited by the parent HTML element.`]}),`
`,(0,r.jsx)(n.p,{children:`To optimize your SVG icons to be used with Eufemia, you can follow these steps or at least get inspired:`}),`
`,(0,r.jsxs)(n.ol,{children:[`
`,(0,r.jsxs)(n.li,{children:[`Make sure your SVG icon fits in the two sizes (default of `,(0,r.jsx)(n.code,{children:`16px`}),` and medium of `,(0,r.jsx)(n.code,{children:`24px`}),`) with the correct stroke thickness of `,(0,r.jsx)(n.code,{children:`1.5px`}),`.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Copy`}),` the SVG markup (in Figma, `,(0,r.jsx)(n.code,{children:`right click`}),` -> `,(0,r.jsx)(n.code,{children:`Copy as`}),` -> `,(0,r.jsx)(n.code,{children:`Copy as SVG`}),`).`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Declutter`}),` and remove ID attributes in the markup, so they do not appear twice in your web application DOM. In most cases, you do not need `,(0,r.jsx)(n.code,{children:`<defs ... />`}),` and the corresponding ids anyway.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Optimize`}),` the SVG. Use e.g. `,(0,r.jsx)(n.a,{href:`https://jakearchibald.github.io/svgomg/`,children:`Online SVGOMG`}),` by using `,(0,r.jsx)(n.code,{children:`Paste markup`}),`.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`NB:`}),` Do not remove `,(0,r.jsx)(n.code,{children:`viewBox`}),`! The `,(0,r.jsx)(n.code,{children:`viewBox`}),` will together with some CSS ensure that the icon scales based on the root font-size.`]}),`
`,(0,r.jsx)(n.li,{children:`Copy again the optimized markup and paste it into your JSX component (inline) or SVG file.`}),`
`,(0,r.jsxs)(n.li,{children:[`Consume the custom icons with either dynamic imports (`,(0,r.jsx)(n.code,{children:`import(...)`}),`) if you have many icons, or use static imports, like so:`]}),`
`]}),`
`,(0,r.jsx)(n.h4,{children:`If you have an SVG loader`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import ImportedSVGIcon from 'my-icons/custom_icon.svg'

render(<Icon icon={ImportedSVGIcon} />)
`})}),`
`,(0,r.jsx)(n.h4,{children:`Inline the SVG in your JSX`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`function CustomSVGIcon(props) {
  return <svg {...props}>...</svg>
}

render(<Button icon={CustomSVGIcon} />)
`})}),`
`,(0,r.jsx)(n.h4,{children:`SVG import in Create React App`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { ReactComponent as CustomIcon } from './custom_icon.svg'

render(<Icon size="medium">{CustomIcon}</Icon>)
`})}),`
`,(0,r.jsx)(n.h3,{children:`Primary Icon`}),`
`,(0,r.jsxs)(n.p,{children:[`There is also the `,(0,r.jsx)(n.a,{href:`/uilib/components/icon-primary`,children:`IconPrimary`}),` component, which comes with all the `,(0,r.jsx)(n.a,{href:`/icons/primary`,children:`Primary Icons`}),` included in `,(0,r.jsx)(n.code,{children:`@dnb/eufemia`}),`. You do not have to import the primary icons separately.`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};