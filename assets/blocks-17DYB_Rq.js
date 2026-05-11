import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";var n=e();function r(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Description`}),`
`,(0,n.jsx)(r.p,{children:`Blocks are a collection of reusable fields and values. They can also be 100% customized and nested in each other. This makes it easy to reuse the same blocks in different contexts.`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`A single block can be used without any further Eufemia Forms components, just like any other field and value.`}),`
`,(0,n.jsx)(r.li,{children:`Each block should have integration tests.`}),`
`,(0,n.jsx)(r.li,{children:`Each block has its own localization and translations.`}),`
`,(0,n.jsx)(r.li,{children:`When you import a block, only the code and translations used in the block will be included in your production bundle.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Relevant links`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/blocks`,children:`Source code`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/blocks`,children:`Docs code`})}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`Read about how to create a section (block) by using a `,(0,n.jsx)(r.a,{href:`/uilib/extensions/forms/Form/Section/`,children:`Form.Section`}),`.`]}),`
`,(0,n.jsx)(r.h2,{children:`Usage`}),`
`,(0,n.jsx)(r.p,{children:`You import a block like this:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`import { ChildrenWithAge } from '@dnb/eufemia/extensions/forms/blocks'
render(<ChildrenWithAge />)
`})}),`
`,(0,n.jsx)(r.h3,{children:`Integration`}),`
`,(0,n.jsxs)(r.p,{children:[`It is recommended to use blocks within a `,(0,n.jsx)(r.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard`}),` and `,(0,n.jsx)(r.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),`. However, they can also be used independently. In such cases, you can utilize the `,(0,n.jsx)(r.code,{children:`onChange`}),` event to listen for changes in the block.`]}),`
`,(0,n.jsxs)(r.p,{children:[`You can also define a `,(0,n.jsx)(r.code,{children:`path`}),` to the block component. This makes it possible to reuse the same block component in different contexts.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`<ChildrenWithAge path="/account/holder/children" />
`})}),`
`,(0,n.jsx)(r.h3,{children:`Customization`}),`
`,(0,n.jsxs)(r.p,{children:[`The `,(0,n.jsx)(r.code,{children:`overwriteProps`}),` property lets you overwrite all of the field properties if needed:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`<ChildrenWithAge
  overwriteProps={{
    firstName: { label: 'Custom label' },
    lastName: { required: false, minLength: 0 },
  }}
/>
`})}),`
`,(0,n.jsx)(r.h3,{children:`Localization`}),`
`,(0,n.jsxs)(r.p,{children:[`You can change the texts and translations used inside of a block via the `,(0,n.jsx)(r.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),`:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/src/extensions/forms'
import { ChildrenWithAge } from '@dnb/eufemia/extensions/forms/blocks'

const myTranslations = {
  'nb-NO': { ChildrenWithAge: { hasChildren: { title: 'Egendefinert' } } },
  'en-GB': { ChildrenWithAge: { hasChildren: { title: 'Custom label' } } },
}

export function MyForm() {
  return (
    <Form.Handler translations={myTranslations}>
      <ChildrenWithAge />
    </Form.Handler>
  )
}
`})})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}function a(e){return(0,n.jsx)(i,{})}function o(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(a,{...e})}):a(e)}export{o as default};