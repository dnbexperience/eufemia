import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-Bx3ttow-.js";import{t as r}from"./Img-CsLFEHF5.js";import{t as i}from"./form-status-CThPS3AY.js";var a=e(t()),o=`/assets/icon-nearest-neighbour-oxDaEeEh.svg`;function s(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{children:`Icon Details`}),`
`,(0,a.jsx)(t.p,{children:`At DNB we are using Streamline icons as our source for off-the-shelf vector icons.`}),`
`,(0,a.jsx)(t.p,{children:(0,a.jsx)(t.a,{href:`https://www.streamlineicons.com/`,children:`Link to streamlineicons.com`})}),`
`,(0,a.jsx)(t.h2,{children:`Using Icons`}),`
`,(0,a.jsx)(t.p,{children:`The icons are in SVG format and are optimized for performance and to have the smallest footprint possible in the package build process.`}),`
`,(0,a.jsxs)(t.p,{children:[`The sources are located in the `,(0,a.jsx)(t.a,{href:`https://unpkg.com/@dnb/eufemia@latest/assets/icons/`,children:`assets folder`}),`.`]}),`
`,(0,a.jsxs)(t.p,{children:[`They also exist as `,(0,a.jsx)(t.a,{href:`/uilib/components/icon`,children:`React Components`}),` to be easily integrated, without the need of an additional SVG file loader.`]}),`
`,(0,a.jsx)(t.h2,{children:`Icon color`}),`
`,(0,a.jsxs)(t.p,{children:[`Eufemia SVG icons simply inherit the current color. In case you do not use the `,(0,a.jsx)(t.a,{href:`/uilib/components/icon`,children:`Icon component`}),`, you have to handle colors yourself.`]}),`
`,(0,a.jsx)(t.h3,{children:`Change SVG border color`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-css`,children:`.selector svg {
  color: var(--custom-color);
}
`})}),`
`,(0,a.jsx)(t.h3,{children:`Example color usage`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-css`,children:`color: var(--custom-color);
.selector svg {
  color: inherit;
  fill: currentColor;
  stroke: currentColor;
}
`})}),`
`,(0,a.jsx)(t.h2,{children:`Sizing`}),`
`,(0,a.jsxs)(t.p,{children:[`Eufemia icons come in `,(0,a.jsx)(t.strong,{children:`two`}),` sizes:`]}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:`Default Size`}),` 1.0rem with 1.5px stroke weight`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:`Medium Size`}),` 1.5rem with 1.5px stroke weight`]}),`
`]}),`
`,(0,a.jsx)(t.p,{children:`The reason there are two sizes is mainly due to the SVG artifact that the icons, alongside the strokes, will scale up once we use them with a larger width and height.`}),`
`,(0,a.jsx)(t.h3,{children:`Scalability in web`}),`
`,(0,a.jsx)(t.p,{children:`To ensure that the relative size of the SVG icons is scalable by the inherited CSS font size, do not explicitly specify the SVG.`}),`
`,(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:`Example size definition by CSS`})}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-css`,children:`font-size: 1.5rem;
svg {
  width: 1em;
  height: 1em;

  font-size: inherit;
}
`})}),`
`,(0,a.jsx)(t.h2,{children:`Spacing`}),`
`,(0,a.jsx)(t.p,{children:`Icons should have a minimum area of 8px between them and their nearest neighbor.`}),`
`,(0,a.jsx)(`div`,{className:`image-box`,children:(0,a.jsx)(r,{src:o,caption:`Icons with nearest neighbour 8px (0.5rem) distance`,alt:`Icon's nearest neighbour`,height:`136`})}),`
`,(0,a.jsx)(t.h2,{children:`Custom Icons`}),`
`,(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.a,{href:`https://www.streamlineicons.com/`,children:`Streamline`}),` caters to pretty much all of Eufemia's icon needs. However, sometimes there is a need for a custom icon. In these cases please contact one of Eufemia's `,(0,a.jsx)(t.a,{href:`/design-system/contact`,children:`design leads`}),`.`]}),`
`,(0,a.jsx)(i,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(s,{...e})}):s(e)}export{c as default};