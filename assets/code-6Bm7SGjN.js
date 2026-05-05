import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r}from"./index-CMgyXmp3.js";var i=e({CodeExample:()=>o}),a=t();function o(){return(0,a.jsx)(n,{children:`<Flex.Stack>
  <P>
    My <Code>formatted text</Code> inside a paragraph
  </P>

  <Section
    surface="dark"
    innerSpace={{
      block: 'small',
    }}
  >
    <P>
      My <Code>formatted text</Code> inside a paragraph on dark surface
    </P>
  </Section>

  <pre className="dnb-pre">Code Syntax</pre>
</Flex.Stack>
`})}function s(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components};return i||l(`Examples`,!1),o||l(`Examples.CodeExample`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Import`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-tsx`,children:`import { Code } from '@dnb/eufemia/elements'
`})}),`
`,(0,a.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/elements/code`,children:`Source code`})}),`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/elements/code`,children:`Docs code`})}),`
`]}),`
`,(0,a.jsxs)(t.h2,{children:[(0,a.jsx)(t.code,{children:`code`}),` and `,(0,a.jsx)(t.code,{children:`pre`}),` tag usage`]}),`
`,(0,a.jsxs)(t.p,{children:[`Both `,(0,a.jsx)(t.code,{children:`code`}),` and `,(0,a.jsx)(t.code,{children:`pre`}),` tags are styled:`]}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Code and Typography`}),`
`,(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:`<code>`}),` and `,(0,a.jsx)(t.code,{children:`<pre>`}),` use the `,(0,a.jsx)(t.a,{href:`/uilib/typography`,children:`DNBMono`}),` font:`]}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-css`,children:`font-family: var(--font-family-monospace);
`})}),`
`,(0,a.jsx)(t.h2,{children:`Code and Syntax highlighting`}),`
`,(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.a,{href:`https://prismjs.com`,children:`Prism`}),` is a popular Syntax Highlighting tool. DNB has its own `,(0,a.jsx)(t.strong,{children:`theme`}),` you can use:`]}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.code,{children:`@dnb/eufemia/style/themes/ui/prism/dnb-prism-theme.js`})}),`
`]}),`
`,(0,a.jsxs)(t.p,{children:[`You can find the theme and its definitions in the `,(0,a.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/blob/main/packages/dnb-eufemia/src/style/themes/ui/prism/dnb-prism-theme.js`,children:`GitHub repository`}),`.`]})]})}function c(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default};