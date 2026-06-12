import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";import{a as r,t as i}from"./Examples-DChbx00k.js";import a from"./components-CeATvJ0T.js";var o=e(t());function s(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Import`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import { Value } from '@dnb/eufemia/extensions/forms'
`})}),`
`,(0,o.jsx)(t.h2,{children:`Description`}),`
`,(0,o.jsxs)(t.p,{children:[`On many screens, data from the dataset is summarized statically, such as on a final review screen where users can confirm their entered data before submitting it to the bank. To streamline the display of such data, Eufemia Forms has Value components. These components operate similarly to `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/all-fields/`,children:`field components`}),`, meaning they're data-driven, can accept value properties, and can be connected to a surrounding `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler`,children:`Form.Handler`}),` by specifying the relevant value with a `,(0,o.jsx)(t.code,{children:`path`}),` property.`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-jsx`,children:`import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.String path="/myPath" />)
`})}),`
`,(0,o.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value`,children:`Source code`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value`,children:`Docs code`})}),`
`]}),`
`,(0,o.jsx)(t.h2,{children:`Summary and definition lists`}),`
`,(0,o.jsxs)(t.p,{children:[`When you utilize multiple `,(0,o.jsx)(t.code,{children:`Value.*`}),` components together, consider enclosing them within the `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/Value/SummaryList/`,children:`SummaryList`}),` component. This component offers a standardized approach for presenting labels and values within an accessible definition list structure.`]}),`
`,(0,o.jsx)(r,{}),`
`,(0,o.jsx)(t.h2,{children:`Combine values together`}),`
`,(0,o.jsxs)(t.p,{children:[`You can also combine `,(0,o.jsx)(t.code,{children:`Value.*`}),` components together by using the value `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Composition/`,children:`Composition`}),` component. And it can still be used within the above mentioned `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/Value/SummaryList/`,children:`SummaryList`}),` component.`]}),`
`,(0,o.jsx)(i,{}),`
`,(0,o.jsx)(t.h2,{children:`Inherit visibility from fields based on path`}),`
`,(0,o.jsxs)(t.p,{children:[`User-entered data is always stored internally in the data context, even when a `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/all-fields/`,children:`Field`}),` is temporarily shown or hidden (mounted/unmounted).`]}),`
`,(0,o.jsxs)(t.p,{children:[`By default, `,(0,o.jsx)(t.code,{children:`Value.*`}),` components will render the value regardless of the field's visibility.`]}),`
`,(0,o.jsxs)(t.p,{children:[`To make the visibility of a `,(0,o.jsx)(t.code,{children:`Value.*`}),` component match the field with the same path, use `,(0,o.jsx)(t.code,{children:`inheritVisibility={true}`}),`:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field, Value } from '@dnb/eufemia/extensions/forms'

const MyForm = () => {
  return (
    <Form.Handler>
      <Form.Visibility pathTrue="/makeVisible">
        <Field.Email path="/myPath" />
      </Form.Visibility>

      <Value.Email path="/myPath" inheritVisibility />
    </Form.Handler>
  )
}
`})}),`
`,(0,o.jsxs)(t.p,{children:[`It's recommended to use `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Visibility/`,children:`Form.Visibility`}),` because it can animate and describes the UI in a clear, declarative way. However, `,(0,o.jsx)(t.code,{children:`inheritVisibility`}),` will also work with other methods, such as React's `,(0,o.jsx)(t.code,{children:`useState`}),` hook.`]}),`
`,(0,o.jsxs)(t.p,{children:[`You can also propagate the `,(0,o.jsx)(t.code,{children:`inheritVisibility`}),` property down to all nested values with the `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Provider/`,children:`Value.Provider`}),`.`]}),`
`,(0,o.jsx)(t.h2,{children:`Inherit labels from fields to values`}),`
`,(0,o.jsxs)(t.p,{children:[`You can use `,(0,o.jsx)(t.code,{children:`inheritLabel={true}`}),` to inherit the label from the field with the same path.`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field, Value } from '@dnb/eufemia/extensions/forms'

const MyForm = () => {
  return (
    <Form.Handler>
      <Field.String path="/myPath" label="My label" />
      <Value.String path="/myPath" inheritLabel />
    </Form.Handler>
  )
}
`})}),`
`,(0,o.jsx)(t.h2,{children:`Transform labels`}),`
`,(0,o.jsxs)(t.p,{children:[`You can use `,(0,o.jsx)(t.code,{children:`transformLabel`}),` to transform the label before it gets displayed.`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`<Value.String
  label="The label"
  transformLabel={(label) => label.toUpperCase()}
/>
`})}),`
`,(0,o.jsxs)(t.p,{children:[`You can combine it with `,(0,o.jsx)(t.code,{children:`inheritLabel`}),` to transform the label from the field with the same path.`]}),`
`,(0,o.jsxs)(t.p,{children:[`And by using the `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Provider/`,children:`Value.Provider`}),`, you can transform the labels of all nested value components.`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`<Value.Provider transformLabel={(label) => label.replace(/\\?$/, '')}>
  <Field.String path="/myPath" label="My label with a question mark?" />
  <Value.String path="/myPath" inheritLabel />
</Value.Provider>
`})})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}function l(e){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(c,{}),`
`,(0,o.jsx)(a,{})]})}function u(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}export{u as default};