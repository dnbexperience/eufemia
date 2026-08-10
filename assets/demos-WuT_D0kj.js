import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{tt as n}from"./Anchor-ntifJ4U1.js";import{s as r}from"./ToggleButton-Bom-ZokA.js";import{t as i}from"./P-CfFm60MO.js";import{t as a}from"./Section-NtuOAPun.js";import{U as o}from"./index-D1L5wabr.js";import{t as s}from"./ComponentBox-B6YSImfw.js";var c=e(t());function l(){return(0,c.jsx)(s,{stableName:`CodeExample`,sourceImports:[`import { Code, Flex, P, Section } from '@dnb/eufemia'`],__buildScope:{Flex:r,P:i,Code:n,Section:a},children:`<Flex.Stack>
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
`})}function u(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...o(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsxs)(t.h3,{children:[(0,c.jsx)(t.code,{children:`code`}),` and `,(0,c.jsx)(t.code,{children:`pre`}),` tags`]}),`
`,(0,c.jsxs)(t.p,{children:[`Use `,(0,c.jsx)(t.a,{href:`/uilib/components/section/demos/#dark-surface`,children:`Section`}),` or `,(0,c.jsx)(t.a,{href:`/uilib/usage/customisation/theming/theme#surface-property`,children:`Theme.Context`}),` with `,(0,c.jsx)(t.code,{children:`surface="dark"`}),` to provide dark surface context to supporting components.`]}),`
`,(0,c.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(u,{...e})}):u(e)}export{d as default};