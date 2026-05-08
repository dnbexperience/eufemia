import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import{t as n}from"./Img-A9Xy5Pz4.js";var r=e(),i=`/assets/naming-space-CytpqIKP.svg`,a=`/assets/tables-space-C-4Ysk0x.svg`;function o(e){let o={a:`a`,blockquote:`blockquote`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...t(),...e.components},{TypographyBox:s}=o;return s||c(`TypographyBox`,!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.h1,{children:`Naming conventions (Designers)`}),`
`,(0,r.jsxs)(o.blockquote,{children:[`
`,(0,r.jsxs)(o.p,{children:[`Persist the same component name throughout the design, code, and conversation `,(0,r.jsx)(`cite`,{children:`Nathan Curtis`})]}),`
`]}),`
`,(0,r.jsx)(o.h2,{children:`Naming space`}),`
`,(0,r.jsx)(o.p,{children:`Eufemia makes use of a very simple 8px unit grid. Margins, paddings, and distances consist of multiples of 8 (mostly, though sometimes half and quarter units are required). If we were to combine multiples of this 8px 'space block', we could end up with something like this:`}),`
`,(0,r.jsx)(n,{src:i,caption:`Naming space units`,alt:`Naming space units`}),`
`,(0,r.jsx)(o.p,{children:`These titles can then be transferred to components, such as tables. A 'medium' table would refer to the amount of padding in the cells.`}),`
`,(0,r.jsx)(n,{src:a,caption:`Applying space to tables`,alt:`Applying space to tables`}),`
`,(0,r.jsx)(o.p,{children:`The same applies to components such as cards, form rows, etc. Responsive breakpoints can switch between these spacing units to expand or contract the overall size of an object.`}),`
`,(0,r.jsx)(o.h2,{children:`Naming Colors`}),`
`,(0,r.jsx)(o.p,{children:`Eufemia for the web uses a simple naming system:`}),`
`,(0,r.jsx)(s,{children:`Color name + percentage`}),`
`,(0,r.jsx)(o.p,{children:`Depending on where the color will be used, its name formation will be different. For example, in Figma (and other design tools), the name is constructed as follows:`}),`
`,(0,r.jsx)(o.p,{children:`The color name is written with spaces between words. The first word starts with a capital letter. Some color names have a percentage sign denoting the tint value.`}),`
`,(0,r.jsx)(o.p,{children:`Example:`}),`
`,(0,r.jsx)(s,{children:`Fire red 8%`}),`
`,(0,r.jsx)(o.p,{children:`Whereas in CSS as a custom property this is written:`}),`
`,(0,r.jsx)(s,{children:`--color-fire-red-8`}),`
`,(0,r.jsxs)(o.p,{children:[`Colors have a naming convention across all platforms and formats. Please refer to the table in `,(0,r.jsx)(o.a,{href:`/quickguide-designer/colors`,children:`colors section`}),`.`]}),`
`,(0,r.jsxs)(o.p,{children:[(0,r.jsx)(o.strong,{children:`NB!`}),` Android and iOS will have a different format for the same names. This guide is for application in `,(0,r.jsx)(o.strong,{children:`web`}),` products.`]}),`
`,(0,r.jsx)(o.h3,{children:`Naming conventions in design applications`}),`
`,(0,r.jsx)(o.p,{children:`We do not have a strict naming convention for design files in Figma. However, it is encouraged to name your design file frames and interface designs with clear, logical names in English.`}),`
`,(0,r.jsx)(o.p,{children:`To maintain consistency, in Figma we name Pages and Frames (canvases) with the first letter capitalized.`}),`
`,(0,r.jsx)(o.p,{children:`Example of a Figma Page name:`}),`
`,(0,r.jsx)(s,{children:`04 Spacing & Common components`}),`
`,(0,r.jsx)(o.p,{children:`Example of a Figma Frame name:`}),`
`,(0,r.jsx)(s,{children:`02 Spacing components - horizontal`}),`
`,(0,r.jsx)(o.p,{children:`Actual components are written with all small letters.`}),`
`,(0,r.jsx)(o.p,{children:`Example of a Figma component name:`}),`
`,(0,r.jsx)(s,{children:`date picker`}),`
`,(0,r.jsxs)(o.p,{children:[`If in doubt, look at the main Eufemia file - `,(0,r.jsx)(o.a,{href:`https://www.figma.com/file/cdtwQD8IJ7pTeE45U148r1/Eufemia-Web?node-id=530%3A49`,children:`Eufemia - Web`}),`.`]})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}function c(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{s as default};