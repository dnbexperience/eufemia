import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{et as r}from"./Anchor-Djq5YQEM.js";import{t as i}from"./P-C9wBv35m.js";import{t as a}from"./Section-BtXmNREe.js";import{c as o}from"./ToggleButton-_NsXxiTa.js";import{K as s}from"./index-ppRu2ktv.js";import{t as c}from"./ComponentBox-R2c6Bo76.js";var l=e({CodeExample:()=>d}),u=t(n());function d(){return(0,u.jsx)(c,{stableName:`CodeExample`,sourceImports:[`import { Code, Flex, P, Section } from '@dnb/eufemia'`],__buildScope:{Flex:o,P:i,Code:r,Section:a},children:`<Flex.Stack>
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
`})}function f(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...s(),...e.components};return l||m(`Examples`,!1),d||m(`Examples.CodeExample`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Import`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-tsx`,children:`import { Code } from '@dnb/eufemia/elements'
`})}),`
`,(0,u.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/elements/code`,children:`Source code`})}),`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/elements/code`,children:`Docs code`})}),`
`]}),`
`,(0,u.jsxs)(t.h2,{children:[(0,u.jsx)(t.code,{children:`code`}),` and `,(0,u.jsx)(t.code,{children:`pre`}),` tag usage`]}),`
`,(0,u.jsxs)(t.p,{children:[`Both `,(0,u.jsx)(t.code,{children:`code`}),` and `,(0,u.jsx)(t.code,{children:`pre`}),` tags are styled.`]}),`
`,(0,u.jsxs)(t.p,{children:[`Use `,(0,u.jsx)(t.a,{href:`/uilib/components/section/demos/#dark-surface`,children:`Section`}),` or `,(0,u.jsx)(t.a,{href:`/uilib/usage/customisation/theming/theme#surface-property`,children:`Theme.Context`}),` with `,(0,u.jsx)(t.code,{children:`surface="dark"`}),` to provide dark surface context to supporting components.`]}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`Code and Typography`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.code,{children:`<code>`}),` and `,(0,u.jsx)(t.code,{children:`<pre>`}),` use the `,(0,u.jsx)(t.a,{href:`/uilib/typography`,children:`DNBMono`}),` font:`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-css`,children:`font-family: var(--font-family-monospace);
`})}),`
`,(0,u.jsx)(t.h2,{children:`Code and Syntax highlighting`}),`
`,(0,u.jsxs)(t.p,{children:[(0,u.jsx)(t.a,{href:`https://prismjs.com`,children:`Prism`}),` is a popular Syntax Highlighting tool. DNB has its own `,(0,u.jsx)(t.strong,{children:`theme`}),` you can use:`]}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.code,{children:`@dnb/eufemia/style/themes/ui/prism/dnb-prism-theme.js`})}),`
`]}),`
`,(0,u.jsxs)(t.p,{children:[`You can find the theme and its definitions in the `,(0,u.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/blob/main/packages/dnb-eufemia/src/style/themes/ui/prism/dnb-prism-theme.js`,children:`GitHub repository`}),`.`]})]})}function p(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};