import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";import r from"./demos-pIR-cAKD.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { FieldBlock } from '@dnb/eufemia/extensions/forms'
render(<FieldBlock />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`FieldBlock`}),` is a reusable wrapper `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/`,children:`for building`}),` interactive `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields`,children:`Field`}),` components.`]}),`
`,(0,i.jsxs)(t.p,{children:[`It shows surrounding elements through properties from `,(0,i.jsx)(t.code,{children:`FieldProps`}),` like `,(0,i.jsx)(t.code,{children:`label`}),` and `,(0,i.jsx)(t.code,{children:`error`}),`, and ensure that spacing between different fields work as required when put into surrounding components like `,(0,i.jsx)(t.a,{href:`/uilib/layout/flex/container/`,children:`Flex.Container`}),` or `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Card/`,children:`Form.Card`}),`.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/create-component/FieldBlock`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/create-component/FieldBlock`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[`It can also be used to group multiple inner FieldBlock components, composing status (error) messages together as one component. Check out the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Composition/`,children:`Field.Composition`}),` docs for that.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { FieldBlock } from '@dnb/eufemia/extensions/forms'

const YourFieldComponent = () => {
  return (
    <FieldBlock
      forId="unique-id"
      label="A label"
      info="Info at the bottom"
    >
      <Input id="unique-id" />
    </FieldBlock>
  )
}
`})}),`
`,(0,i.jsxs)(t.p,{children:[`More information about the usage can be found in the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/`,children:`create your own component`}),` section.`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};