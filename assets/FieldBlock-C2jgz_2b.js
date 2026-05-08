import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-CP0Wri1l.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { FieldBlock } from '@dnb/eufemia/extensions/forms'
render(<FieldBlock />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`FieldBlock`}),` is a reusable wrapper `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/create-component/`,children:`for building`}),` interactive `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/feature-fields`,children:`Field`}),` components.`]}),`
`,(0,r.jsxs)(n.p,{children:[`It shows surrounding elements through properties from `,(0,r.jsx)(n.code,{children:`FieldProps`}),` like `,(0,r.jsx)(n.code,{children:`label`}),` and `,(0,r.jsx)(n.code,{children:`error`}),`, and ensure that spacing between different fields work as required when put into surrounding components like `,(0,r.jsx)(n.a,{href:`/uilib/layout/flex/container/`,children:`Flex.Container`}),` or `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Card/`,children:`Form.Card`}),`.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/create-component/FieldBlock`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/create-component/FieldBlock`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`It can also be used to group multiple inner FieldBlock components, composing status (error) messages together as one component. Check out the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/base-fields/Composition/`,children:`Field.Composition`}),` docs for that.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { FieldBlock } from '@dnb/eufemia/extensions/forms'

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
`,(0,r.jsxs)(n.p,{children:[`More information about the usage can be found in the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/create-component/`,children:`create your own component`}),` section.`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};