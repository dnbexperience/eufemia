import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";import{t as r}from"./Img-Ds0SJqAP.js";var i=e(t()),a=`/assets/naming-space-CytpqIKP.svg`,o=`/assets/tables-space-C-4Ysk0x.svg`;function s(e){let t={a:`a`,blockquote:`blockquote`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...n(),...e.components},{TypographyBox:s}=t;return s||l(`TypographyBox`,!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{children:`Naming conventions (Designers)`}),`
`,(0,i.jsxs)(t.blockquote,{children:[`
`,(0,i.jsxs)(t.p,{children:[`Persist the same component name throughout the design, code, and conversation `,(0,i.jsx)(`cite`,{children:`Nathan Curtis`})]}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Naming space`}),`
`,(0,i.jsx)(t.p,{children:`Eufemia makes use of a very simple 8px unit grid. Margins, paddings, and distances consist of multiples of 8 (mostly, though sometimes half and quarter units are required). If we were to combine multiples of this 8px 'space block', we could end up with something like this:`}),`
`,(0,i.jsx)(r,{src:a,caption:`Naming space units`,alt:`Naming space units`}),`
`,(0,i.jsx)(t.p,{children:`These titles can then be transferred to components, such as tables. A 'medium' table would refer to the amount of padding in the cells.`}),`
`,(0,i.jsx)(r,{src:o,caption:`Applying space to tables`,alt:`Applying space to tables`}),`
`,(0,i.jsx)(t.p,{children:`The same applies to components such as cards, form rows, etc. Responsive breakpoints can switch between these spacing units to expand or contract the overall size of an object.`}),`
`,(0,i.jsx)(t.h2,{children:`Naming Colors`}),`
`,(0,i.jsx)(t.p,{children:`Eufemia for the web uses a simple naming system:`}),`
`,(0,i.jsx)(s,{children:`Color name + percentage`}),`
`,(0,i.jsx)(t.p,{children:`Depending on where the color will be used, its name formation will be different. For example, in Figma (and other design tools), the name is constructed as follows:`}),`
`,(0,i.jsx)(t.p,{children:`The color name is written with spaces between words. The first word starts with a capital letter. Some color names have a percentage sign denoting the tint value.`}),`
`,(0,i.jsx)(t.p,{children:`Example:`}),`
`,(0,i.jsx)(s,{children:`Fire red 8%`}),`
`,(0,i.jsx)(t.p,{children:`Whereas in CSS as a custom property this is written:`}),`
`,(0,i.jsx)(s,{children:`--color-fire-red-8`}),`
`,(0,i.jsxs)(t.p,{children:[`Colors have a naming convention across all platforms and formats. Please refer to the table in `,(0,i.jsx)(t.a,{href:`/quickguide-designer/colors`,children:`colors section`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:`NB!`}),` Android and iOS will have a different format for the same names. This guide is for application in `,(0,i.jsx)(t.strong,{children:`web`}),` products.`]}),`
`,(0,i.jsx)(t.h3,{children:`Naming conventions in design applications`}),`
`,(0,i.jsx)(t.p,{children:`We do not have a strict naming convention for design files in Figma. However, it is encouraged to name your design file frames and interface designs with clear, logical names in English.`}),`
`,(0,i.jsx)(t.p,{children:`To maintain consistency, in Figma we name Pages and Frames (canvases) with the first letter capitalized.`}),`
`,(0,i.jsx)(t.p,{children:`Example of a Figma Page name:`}),`
`,(0,i.jsx)(s,{children:`04 Spacing & Common components`}),`
`,(0,i.jsx)(t.p,{children:`Example of a Figma Frame name:`}),`
`,(0,i.jsx)(s,{children:`02 Spacing components - horizontal`}),`
`,(0,i.jsx)(t.p,{children:`Actual components are written with all small letters.`}),`
`,(0,i.jsx)(t.p,{children:`Example of a Figma component name:`}),`
`,(0,i.jsx)(s,{children:`date picker`}),`
`,(0,i.jsxs)(t.p,{children:[`If in doubt, look at the main Eufemia file - `,(0,i.jsx)(t.a,{href:`https://www.figma.com/file/cdtwQD8IJ7pTeE45U148r1/Eufemia-Web?node-id=530%3A49`,children:`Eufemia - Web`}),`.`]})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default};