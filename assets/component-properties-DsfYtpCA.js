import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-xW2kV1s2.js";import{Lr as n,Ur as r}from"./index-DVm0MbGb.js";var i=e(),a=()=>(0,i.jsx)(t,{children:`
<Button
  variant="secondary"
  text="Secondary Button"
  icon="chevron_right_medium"
  size="large"
/>
<Button icon="chevron_right" iconSize="medium" size="large" />

`}),o=()=>(0,i.jsx)(t,{scope:{hamburgerIcon:r},noInline:!0,children:`const Wrapper = styled.div\`
  .dnb-button {
    --button-width: 4rem;
    --button-height: 4rem;
    --button-border-radius: 2rem;
    svg {
      color: fuchsia;
    }
  }
\`
const myHandler = () => alert('Hello')
render(
  <Wrapper>
    <Button
      variant="secondary"
      icon={hamburgerIcon}
      size="default"
      onClick={myHandler}
    />
    <Button variant="secondary" size="default" onClick={myHandler}>
      <Icon icon={hamburgerIcon} />
    </Button>
  </Wrapper>
)
`});function s(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,strong:`strong`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{children:`Component Properties`}),`
`,(0,i.jsxs)(t.p,{children:[`Every `,(0,i.jsx)(t.a,{href:`/uilib/components`,children:`Component`}),` has its own `,(0,i.jsx)(t.code,{children:`properties`}),` to make them work for a variety of cases. You may have a look at the table describing all the possibilities. Check out for example the `,(0,i.jsx)(t.a,{href:`/uilib/components/button/properties`,children:`Button Properties`}),`.`]}),`
`,(0,i.jsx)(t.h2,{children:`Naming`}),`
`,(0,i.jsxs)(t.p,{children:[`Both the properties- and event names should use `,(0,i.jsx)(t.strong,{children:`camelCase`}),` to support a universal `,(0,i.jsx)(t.a,{href:`/contribute/style-guides/naming`,children:`naming convention`}),`.`]}),`
`,(0,i.jsx)(t.h2,{children:`Large Buttons & Icons`}),`
`,(0,i.jsx)(t.p,{children:`Below are some examples. You can even modify them right away in the Browser.`}),`
`,(0,i.jsx)(a,{}),`
`,(0,i.jsx)(t.h2,{children:`Extended example`}),`
`,(0,i.jsx)(o,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};