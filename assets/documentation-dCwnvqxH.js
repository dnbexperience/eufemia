import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-BCXtuv-b.js";var r=e(t());function i(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Documentation`}),`
`,(0,r.jsx)(t.p,{children:`The documentation is written in enhanced Markdown, called MDX. It allows us to import other Markdown files along with React components and JavaScript logic.`}),`
`,(0,r.jsx)(t.h2,{children:`Handling themes`}),`
`,(0,r.jsx)(t.p,{children:`If you need to show some documentation only for when a certain theme is selected, you can do so:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-md`,children:`<VisibilityByTheme visible="eiendom">

## Eiendom examples

Text

<SpecialExample />

</VisibilityByTheme>
`})}),`
`,(0,r.jsx)(t.h3,{children:`Link to a specific theme`}),`
`,(0,r.jsxs)(t.p,{children:[`You can add a parameter called `,(0,r.jsx)(t.code,{children:`eufemia-theme`}),` to a url:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-md`,children:`[Relative](/uilib/components/badge/demos/?eufemia-theme=sbanken)
Absolute: https://eufemia.dnb.no/uilib/components/badge/demos/?eufemia-theme=sbanken
`})}),`
`,(0,r.jsx)(t.p,{children:`It will change and set the currently used theme once the user visits the related page.`})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};