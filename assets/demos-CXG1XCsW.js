import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./GlobalError-C2fVbvl5.js";import{W as r}from"./index-BCXtuv-b.js";import{t as i}from"./ComponentBox-B2X8809Z.js";var a=e(t()),o=()=>(0,a.jsx)(i,{"data-visual-test":`global-error-404`,stableName:`GlobalError404Example`,sourceImports:[`import { GlobalError } from '@dnb/eufemia'`],__buildScope:{GlobalError:n},children:`<GlobalError statusCode="404" />
`}),s=()=>(0,a.jsx)(i,{"data-visual-test":`global-error-500`,stableName:`GlobalError500Example`,sourceImports:[`import { GlobalError } from '@dnb/eufemia'`],__buildScope:{GlobalError:n},children:`<GlobalError statusCode="500" />
`}),c=()=>(0,a.jsx)(i,{"data-visual-test":`global-error-custom`,stableName:`GlobalErrorCustomStatusExample`,sourceImports:[`import { GlobalError } from '@dnb/eufemia'`],__buildScope:{GlobalError:n},noInline:!0,children:`const links = [
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
`});function l(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`To showcase the 404 status code component`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`To showcase the 500 status code component`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`To showcase a custom status code component`}),`
`,(0,a.jsx)(c,{})]})}function u(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}export{u as default};