import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./Icon-DIq_qtVQ.js";import{t as r}from"./bank_medium-D_A7ljok.js";import{d as i}from"./HelpButton-sV5p6bwJ.js";import{t as a}from"./H4-06ptY6OB.js";import{W as o}from"./index-BCXtuv-b.js";import{t as s}from"./ComponentBox-B2X8809Z.js";var c=e(t()),l=()=>(0,c.jsx)(s,{scope:{BankIcon:r},stableName:`IconsDecorativeExample`,sourceImports:[`import { H1, Icon, H4 } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`,`import { bank_medium as BankIcon } from '@dnb/eufemia/icons'`],__buildScope:{Icon:n},children:`<Icon icon={BankIcon} size="24" title="Beach" />
`}),u=()=>(0,c.jsx)(s,{scope:{BankIcon:r},stableName:`IconsResponsiveExample`,sourceImports:[`import { H1, Icon, H4 } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`,`import { bank_medium as BankIcon } from '@dnb/eufemia/icons'`],__buildScope:{H1:i,Icon:n,H4:a},children:`
<H1>
  My H1 with an icon <Icon icon={BankIcon} title="Beach" size="auto" />
</H1>
<H4>
  My H4 with the same icon{' '}
  <Icon icon={BankIcon} title="Beach" size="auto" />
</H4>

`}),d=()=>(0,c.jsx)(s,{stableName:`IconsSVGExample`,sourceImports:[`import { H1, Icon, H4 } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`,`import { bank_medium as BankIcon } from '@dnb/eufemia/icons'`],noInline:!0,children:`const Responsive = styled.span\`
  svg {
    font-size: inherit;
    width: 1.5em;
    height: 1.5em;
  }
\`
const Svg = (props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.03 5.22a.75.75 0 0 0-1.06 1.06l4.5 4.5a.75.75 0 0 0 1.06 0l4.5-4.5a.75.75 0 0 0-1.06-1.06L8 9.19 4.03 5.22z"
      fill="currentColor"
    />
  </svg>
)
render(
  <>
    <p>
      <Svg width="24" height="24" /> - has a fixed size
    </p>
    <p>
      <Responsive>
        <Svg />
      </Responsive>{' '}
      - is responsive
    </p>
  </>
)
`});function f(e){let t={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,p:`p`,strong:`strong`,...o(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h1,{children:`Accessibility of Icons`}),`
`,(0,c.jsxs)(t.p,{children:[`By using inline SVG, we have the possibility to make graphical assets both `,(0,c.jsx)(t.strong,{children:`responsive`}),` and `,(0,c.jsx)(t.strong,{children:`interactive`}),`. In order to do so, use the `,(0,c.jsx)(t.a,{href:`/uilib/components/icon`,children:`Icon`}),` component. These components provide the needed runtime processing.`]}),`
`,(0,c.jsx)(t.h2,{children:`Decorative Icons`}),`
`,(0,c.jsxs)(t.p,{children:[`The Icon component uses `,(0,c.jsx)(t.code,{children:`role="decoration"`}),` by default, which makes it invisible to assistive technologies.`]}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h2,{children:`Responsive Icons`}),`
`,(0,c.jsxs)(t.p,{children:[`Use `,(0,c.jsx)(t.code,{children:`size="auto"`}),` to force the icon to inherit the size of its parent element.`]}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h2,{children:`SVG Icons`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.em,{children:`Scalable Vector Graphics`}),` can be set up to be scalable and actually respond to the `,(0,c.jsx)(t.code,{children:`font-size`}),`.`]}),`
`,(0,c.jsx)(d,{})]})}function p(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(f,{...e})}):f(e)}export{p as default};