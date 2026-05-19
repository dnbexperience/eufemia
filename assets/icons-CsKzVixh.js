import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./bank_medium-B12fNg30.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=e(t()),o=()=>(0,a.jsx)(r,{scope:{BankIcon:n},stableName:`IconsDecorativeExample`,children:`<Icon icon={BankIcon} size="24" title="Beach" />
`}),s=()=>(0,a.jsx)(r,{scope:{BankIcon:n},stableName:`IconsResponsiveExample`,children:`
<H1>
  My H1 with an icon <Icon icon={BankIcon} title="Beach" size="auto" />
</H1>
<H4>
  My H4 with the same icon{' '}
  <Icon icon={BankIcon} title="Beach" size="auto" />
</H4>

`}),c=()=>(0,a.jsx)(r,{stableName:`IconsSVGExample`,noInline:!0,children:`const Responsive = styled.span\`
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
`});function l(e){let t={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,p:`p`,strong:`strong`,...i(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{children:`Accessibility of Icons`}),`
`,(0,a.jsxs)(t.p,{children:[`By using inline SVG, we have the possibility to make graphical assets both `,(0,a.jsx)(t.strong,{children:`responsive`}),` and `,(0,a.jsx)(t.strong,{children:`interactive`}),`. In order to do so, use the `,(0,a.jsx)(t.a,{href:`/uilib/components/icon`,children:`Icon`}),` component. These components provide the needed runtime processing.`]}),`
`,(0,a.jsx)(t.h2,{children:`Decorative Icons`}),`
`,(0,a.jsxs)(t.p,{children:[`The Icon component uses `,(0,a.jsx)(t.code,{children:`role="decoration"`}),` by default, which makes it invisible to assistive technologies.`]}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h2,{children:`Responsive Icons`}),`
`,(0,a.jsxs)(t.p,{children:[`Use `,(0,a.jsx)(t.code,{children:`size="auto"`}),` to force the icon to inherit the size of its parent element.`]}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h2,{children:`SVG Icons`}),`
`,(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.em,{children:`Scalable Vector Graphics`}),` can be set up to be scalable and actually respond to the `,(0,a.jsx)(t.code,{children:`font-size`}),`.`]}),`
`,(0,a.jsx)(c,{})]})}function u(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}export{u as default};