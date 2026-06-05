import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-Bx3ttow-.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Description`}),`
`,(0,r.jsx)(t.p,{children:`Blocks are a collection of reusable fields and values. They can also be 100% customized and nested in each other. This makes it easy to reuse the same blocks in different contexts.`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:`A single block can be used without any further Eufemia Forms components, just like any other field and value.`}),`
`,(0,r.jsx)(t.li,{children:`Each block should have integration tests.`}),`
`,(0,r.jsx)(t.li,{children:`Each block has its own localization and translations.`}),`
`,(0,r.jsx)(t.li,{children:`When you import a block, only the code and translations used in the block will be included in your production bundle.`}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/blocks`,children:`Source code`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/blocks`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[`Read about how to create a section (block) by using a `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/`,children:`Form.Section`}),`.`]}),`
`,(0,r.jsx)(t.h2,{children:`Usage`}),`
`,(0,r.jsx)(t.p,{children:`You import a block like this:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-jsx`,children:`import { ChildrenWithAge } from '@dnb/eufemia/extensions/forms/blocks'
render(<ChildrenWithAge />)
`})}),`
`,(0,r.jsx)(t.h3,{children:`Integration`}),`
`,(0,r.jsxs)(t.p,{children:[`It is recommended to use blocks within a `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),`. However, they can also be used independently. In such cases, you can utilize the `,(0,r.jsx)(t.code,{children:`onChange`}),` event to listen for changes in the block.`]}),`
`,(0,r.jsxs)(t.p,{children:[`You can also define a `,(0,r.jsx)(t.code,{children:`path`}),` to the block component. This makes it possible to reuse the same block component in different contexts.`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-jsx`,children:`<ChildrenWithAge path="/account/holder/children" />
`})}),`
`,(0,r.jsx)(t.h3,{children:`Customization`}),`
`,(0,r.jsxs)(t.p,{children:[`The `,(0,r.jsx)(t.code,{children:`overwriteProps`}),` property lets you overwrite all of the field properties if needed:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`<ChildrenWithAge
  overwriteProps={{
    firstName: { label: 'Custom label' },
    lastName: { required: false, minLength: 0 },
  }}
/>
`})}),`
`,(0,r.jsx)(t.h3,{children:`Localization`}),`
`,(0,r.jsxs)(t.p,{children:[`You can change the texts and translations used inside of a block via the `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),`:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/src/extensions/forms'
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
`})})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsx)(a,{})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};