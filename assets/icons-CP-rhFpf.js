import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./bank_medium-DLNdpo20.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r}from"./index-DVm0MbGb.js";var i=e(),a=()=>(0,i.jsx)(n,{scope:{BankIcon:t},children:`<Icon icon={BankIcon} size="24" title="Beach" />
`}),o=()=>(0,i.jsx)(n,{scope:{BankIcon:t},children:`
<H1>
  My H1 with an icon <Icon icon={BankIcon} title="Beach" size="auto" />
</H1>
<H4>
  My H4 with the same icon{' '}
  <Icon icon={BankIcon} title="Beach" size="auto" />
</H4>

`}),s=()=>(0,i.jsx)(n,{noInline:!0,children:`const Responsive = styled.span\`
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
`});function c(e){let t={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,p:`p`,strong:`strong`,...r(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{children:`Accessibility of Icons`}),`
`,(0,i.jsxs)(t.p,{children:[`By using inline SVG, we have the possibility to make graphical assets both `,(0,i.jsx)(t.strong,{children:`responsive`}),` and `,(0,i.jsx)(t.strong,{children:`interactive`}),`. In order to do so, use the `,(0,i.jsx)(t.a,{href:`/uilib/components/icon`,children:`Icon`}),` component. These components provide the needed runtime processing.`]}),`
`,(0,i.jsx)(t.h2,{children:`Decorative Icons`}),`
`,(0,i.jsxs)(t.p,{children:[`The Icon component uses `,(0,i.jsx)(t.code,{children:`role="decoration"`}),` by default, which makes it invisible to assistive technologies.`]}),`
`,(0,i.jsx)(a,{}),`
`,(0,i.jsx)(t.h2,{children:`Responsive Icons`}),`
`,(0,i.jsxs)(t.p,{children:[`Use `,(0,i.jsx)(t.code,{children:`size="auto"`}),` to force the icon to inherit the size of its parent element.`]}),`
`,(0,i.jsx)(o,{}),`
`,(0,i.jsx)(t.h2,{children:`SVG Icons`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.em,{children:`Scalable Vector Graphics`}),` can be set up to be scalable and actually respond to the `,(0,i.jsx)(t.code,{children:`font-size`}),`.`]}),`
`,(0,i.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}export{l as default};