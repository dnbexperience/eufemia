import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";var n=e();function r(e){let r={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`Documentation`}),`
`,(0,n.jsx)(r.p,{children:`The documentation is written in enhanced Markdown, called MDX. It allows us to import other Markdown files along with React components and JavaScript logic.`}),`
`,(0,n.jsx)(r.h2,{children:`Handling themes`}),`
`,(0,n.jsx)(r.p,{children:`If you need to show some documentation only for when a certain theme is selected, you can do so:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-md`,children:`<VisibilityByTheme visible="eiendom">

## Eiendom examples

Text

<SpecialExample />

</VisibilityByTheme>
`})}),`
`,(0,n.jsx)(r.h3,{children:`Link to a specific theme`}),`
`,(0,n.jsxs)(r.p,{children:[`You can add a parameter called `,(0,n.jsx)(r.code,{children:`eufemia-theme`}),` to a url:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-md`,children:`[Relative](/uilib/components/badge/demos/?eufemia-theme=sbanken)
Absolute: https://eufemia.dnb.no/uilib/components/badge/demos/?eufemia-theme=sbanken
`})}),`
`,(0,n.jsx)(r.p,{children:`It will change and set the currently used theme once the user visits the related page.`})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};