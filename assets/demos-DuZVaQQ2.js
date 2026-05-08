import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-C64JNWnl.js";import{Lr as n}from"./index-2AO2Cu5K.js";var r=e(),i=()=>(0,r.jsx)(t,{"data-visual-test":`global-error-404`,children:`<GlobalError statusCode="404" />
`}),a=()=>(0,r.jsx)(t,{"data-visual-test":`global-error-500`,children:`<GlobalError statusCode="500" />
`}),o=()=>(0,r.jsx)(t,{"data-visual-test":`global-error-custom`,noInline:!0,children:`const links = [
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
`});function s(e){let t={h2:`h2`,h3:`h3`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Demos`}),`
`,(0,r.jsx)(t.h3,{children:`To showcase the 404 status code component`}),`
`,(0,r.jsx)(i,{}),`
`,(0,r.jsx)(t.h3,{children:`To showcase the 500 status code component`}),`
`,(0,r.jsx)(a,{}),`
`,(0,r.jsx)(t.h3,{children:`To showcase a custom status code component`}),`
`,(0,r.jsx)(o,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(s,{...e})}):s(e)}export{c as default};