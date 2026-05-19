import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({CodeExample:()=>s}),o=e(n());function s(){return(0,o.jsx)(r,{stableName:`CodeExample`,children:`<Flex.Stack>
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
`})}function c(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...i(),...e.components};return a||u(`Examples`,!1),s||u(`Examples.CodeExample`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Import`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import { Code } from '@dnb/eufemia/elements'
`})}),`
`,(0,o.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/elements/code`,children:`Source code`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/elements/code`,children:`Docs code`})}),`
`]}),`
`,(0,o.jsxs)(t.h2,{children:[(0,o.jsx)(t.code,{children:`code`}),` and `,(0,o.jsx)(t.code,{children:`pre`}),` tag usage`]}),`
`,(0,o.jsxs)(t.p,{children:[`Both `,(0,o.jsx)(t.code,{children:`code`}),` and `,(0,o.jsx)(t.code,{children:`pre`}),` tags are styled:`]}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Code and Typography`}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`<code>`}),` and `,(0,o.jsx)(t.code,{children:`<pre>`}),` use the `,(0,o.jsx)(t.a,{href:`/uilib/typography`,children:`DNBMono`}),` font:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-css`,children:`font-family: var(--font-family-monospace);
`})}),`
`,(0,o.jsx)(t.h2,{children:`Code and Syntax highlighting`}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.a,{href:`https://prismjs.com`,children:`Prism`}),` is a popular Syntax Highlighting tool. DNB has its own `,(0,o.jsx)(t.strong,{children:`theme`}),` you can use:`]}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.code,{children:`@dnb/eufemia/style/themes/ui/prism/dnb-prism-theme.js`})}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`You can find the theme and its definitions in the `,(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/blob/main/packages/dnb-eufemia/src/style/themes/ui/prism/dnb-prism-theme.js`,children:`GitHub repository`}),`.`]})]})}function l(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default};