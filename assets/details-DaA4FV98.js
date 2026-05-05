import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import{t as n}from"./Img-CKLl5zri.js";import{t as r}from"./form-status-UHDoi0f-.js";var i=e(),a=`/assets/icon-nearest-neighbour-oxDaEeEh.svg`;function o(e){let o={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o.h1,{children:`Icon Details`}),`
`,(0,i.jsx)(o.p,{children:`At DNB we are using Streamline icons as our source for off-the-shelf vector icons.`}),`
`,(0,i.jsx)(o.p,{children:(0,i.jsx)(o.a,{href:`https://www.streamlineicons.com/`,children:`Link to streamlineicons.com`})}),`
`,(0,i.jsx)(o.h2,{children:`Using Icons`}),`
`,(0,i.jsx)(o.p,{children:`The icons are in SVG format and are optimized for performance and to have the smallest footprint possible in the package build process.`}),`
`,(0,i.jsxs)(o.p,{children:[`The sources are located in the `,(0,i.jsx)(o.a,{href:`https://unpkg.com/@dnb/eufemia@latest/assets/icons/`,children:`assets folder`}),`.`]}),`
`,(0,i.jsxs)(o.p,{children:[`They also exist as `,(0,i.jsx)(o.a,{href:`/uilib/components/icon`,children:`React Components`}),` to be easily integrated, without the need of an additional SVG file loader.`]}),`
`,(0,i.jsx)(o.h2,{children:`Icon color`}),`
`,(0,i.jsxs)(o.p,{children:[`Eufemia SVG icons simply inherit the current color. In case you do not use the `,(0,i.jsx)(o.a,{href:`/uilib/components/icon`,children:`Icon component`}),`, you have to handle colors yourself.`]}),`
`,(0,i.jsx)(o.h3,{children:`Change SVG border color`}),`
`,(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:`language-css`,children:`.selector svg {
  color: var(--custom-color);
}
`})}),`
`,(0,i.jsx)(o.h3,{children:`Example color usage`}),`
`,(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:`language-css`,children:`color: var(--custom-color);
.selector svg {
  color: inherit;
  fill: currentColor;
  stroke: currentColor;
}
`})}),`
`,(0,i.jsx)(o.h2,{children:`Sizing`}),`
`,(0,i.jsxs)(o.p,{children:[`Eufemia icons come in `,(0,i.jsx)(o.strong,{children:`two`}),` sizes:`]}),`
`,(0,i.jsxs)(o.ul,{children:[`
`,(0,i.jsxs)(o.li,{children:[(0,i.jsx)(o.strong,{children:`Default Size`}),` 1.0rem with 1.5px stroke weight`]}),`
`,(0,i.jsxs)(o.li,{children:[(0,i.jsx)(o.strong,{children:`Medium Size`}),` 1.5rem with 1.5px stroke weight`]}),`
`]}),`
`,(0,i.jsx)(o.p,{children:`The reason there are two sizes is mainly due to the SVG artifact that the icons, alongside the strokes, will scale up once we use them with a larger width and height.`}),`
`,(0,i.jsx)(o.h3,{children:`Scalability in web`}),`
`,(0,i.jsx)(o.p,{children:`To ensure that the relative size of the SVG icons is scalable by the inherited CSS font size, do not explicitly specify the SVG.`}),`
`,(0,i.jsx)(o.p,{children:(0,i.jsx)(o.strong,{children:`Example size definition by CSS`})}),`
`,(0,i.jsx)(o.pre,{children:(0,i.jsx)(o.code,{className:`language-css`,children:`font-size: 1.5rem;
svg {
  width: 1em;
  height: 1em;

  font-size: inherit;
}
`})}),`
`,(0,i.jsx)(o.h2,{children:`Spacing`}),`
`,(0,i.jsx)(o.p,{children:`Icons should have a minimum area of 8px between them and their nearest neighbor.`}),`
`,(0,i.jsx)(`div`,{className:`image-box`,children:(0,i.jsx)(n,{src:a,caption:`Icons with nearest neighbour 8px (0.5rem) distance`,alt:`Icon's nearest neighbour`,height:`136`})}),`
`,(0,i.jsx)(o.h2,{children:`Custom Icons`}),`
`,(0,i.jsxs)(o.p,{children:[(0,i.jsx)(o.a,{href:`https://www.streamlineicons.com/`,children:`Streamline`}),` caters to pretty much all of Eufemia's icon needs. However, sometimes there is a need for a custom icon. In these cases please contact one of Eufemia's `,(0,i.jsx)(o.a,{href:`/design-system/contact`,children:`design leads`}),`.`]}),`
`,(0,i.jsx)(r,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}export{s as default};