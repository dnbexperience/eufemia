import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-a4aOn231.js";import{zr as r}from"./index-DqqByKA2.js";var i=e(t()),a=()=>(0,i.jsx)(n,{"data-visual-test":`global-error-404`,stableName:`GlobalError404Example`,children:`<GlobalError statusCode="404" />
`}),o=()=>(0,i.jsx)(n,{"data-visual-test":`global-error-500`,stableName:`GlobalError500Example`,children:`<GlobalError statusCode="500" />
`}),s=()=>(0,i.jsx)(n,{"data-visual-test":`global-error-custom`,stableName:`GlobalErrorCustomStatusExample`,noInline:!0,children:`const links = [
  {
    text: 'Forside',
    url: 'https://www.dnb.no/',
  },
  {
    text: 'Forsikring',
    url: 'https://www.dnb.no/forsikring/',
  },
  {
    text: 'Sparing',
    url: 'https://www.dnb.no/sparing/',
  },
  {
    text: 'Lån',
    url: 'https://www.dnb.no/lan/',
  },
  {
    text: 'Kontakt',
    url: 'https://www.dnb.no/hjelp-og-veiledning/',
  },
]
render(
  <GlobalError
    statusCode="403"
    title="Access Denied"
    text="More related text"
    links={links}
  >
    Additional Content
  </GlobalError>
)
`});function c(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Demos`}),`
`,(0,i.jsx)(t.h3,{children:`To showcase the 404 status code component`}),`
`,(0,i.jsx)(a,{}),`
`,(0,i.jsx)(t.h3,{children:`To showcase the 500 status code component`}),`
`,(0,i.jsx)(o,{}),`
`,(0,i.jsx)(t.h3,{children:`To showcase a custom status code component`}),`
`,(0,i.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}export{l as default};