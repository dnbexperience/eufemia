import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";import r from"./demos-DOqpf_2v.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,pre:`pre`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Visibility />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[`The `,(0,i.jsx)(t.code,{children:`Form.Visibility`}),` component allows you to conditionally show or hide components based on the state of data or field validation. You can either provide the values directly via properties or let it read data from a surrounding `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),`. This enables dynamic visibility control based on the paths it points to.`]}),`
`,(0,i.jsx)(t.h3,{children:`Iterate.Visibility`}),`
`,(0,i.jsxs)(t.p,{children:[`You can also use the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Visibility/`,children:`Iterate.Visibility`}),` component to target relative paths (`,(0,i.jsx)(t.code,{children:`itemPath`}),`) within an `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Array/`,children:`Iterate.Array`}),` component.`]}),`
`,(0,i.jsx)(t.h3,{children:`Data driven visibility`}),`
`,(0,i.jsxs)(t.p,{children:[`There are several `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Visibility/properties/`,children:`properties`}),` you can use to control visibility, such as `,(0,i.jsx)(t.code,{children:`pathDefined`}),`, `,(0,i.jsx)(t.code,{children:`pathTruthy`}),`, `,(0,i.jsx)(t.code,{children:`pathTrue`}),` etc.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

render(
  <>
    <Field.Boolean path="/myState" />
    <Form.Visibility pathTrue="/myState">
      show me when the data value is true
    </Form.Visibility>
  </>
)
`})}),`
`,(0,i.jsx)(t.h4,{children:`Dynamic value driven visibility`}),`
`,(0,i.jsxs)(t.p,{children:[`You can also use the `,(0,i.jsx)(t.code,{children:`visibleWhen`}),` property to conditionally show the children based on the data value of the path.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

render(
  <>
    <Field.Boolean path="/myState" />
    <Form.Visibility
      visibleWhen={{
        path: '/myState',
        hasValue: (value) => value === true,
      }}
    >
      show me when the data value is true
    </Form.Visibility>
  </>
)
`})}),`
`,(0,i.jsx)(t.h3,{children:`Validation driven visibility`}),`
`,(0,i.jsxs)(t.p,{children:[`You can conditionally display children based on field validation by using the `,(0,i.jsx)(t.code,{children:`visibleWhen`}),` property with `,(0,i.jsx)(t.code,{children:`isValid: true`}),`:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

render(
  <>
    <Field.Boolean path="/myField" />
    <Form.Visibility
      visibleWhen={{
        path: '/myField',
        isValid: true,
      }}
    >
      show me when the validation succeeds
    </Form.Visibility>
  </>
)
`})}),`
`,(0,i.jsxs)(t.p,{children:[`To prevent visibility changes during user interactions like typing, it shows the children only when the field both has no errors and has lost focus (blurred). You can use the `,(0,i.jsx)(t.code,{children:`validateContinuously: true`}),` property to immediately show the children when the field has no errors.`]}),`
`,(0,i.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,i.jsxs)(t.p,{children:[`Children of the `,(0,i.jsx)(t.code,{children:`Form.Visibility`}),` component will be hidden from screen readers when visually hidden, even if `,(0,i.jsx)(t.code,{children:`keepInDOM`}),` is enabled. You do not need to do anything to make the content additionally inaccessible.`]}),`
`,(0,i.jsx)(t.h2,{children:`Animate`}),`
`,(0,i.jsxs)(t.p,{children:[`You can use the `,(0,i.jsx)(t.code,{children:`animate`}),` property to animate the visibility change. It can be used in combination with `,(0,i.jsx)(t.code,{children:`keepInDOM`}),`.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(
  <>
    <Field.Boolean path="/myState" />
    <Form.Visibility pathTrue="/myState" animate>
      show me when the data value is true
    </Form.Visibility>
  </>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Keep in DOM`}),`
`,(0,i.jsxs)(t.p,{children:[`You can use the `,(0,i.jsx)(t.code,{children:`keepInDOM`}),` property to keep the content in the DOM, even if it's not visible or accessible. This can be useful for fields that still need to run validation.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(
  <>
    <Field.Boolean path="/myState" />
    <Form.Visibility pathTrue="/myState" keepInDOM>
      show me when the data value is true
    </Form.Visibility>
  </>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Disable children fields when hidden`}),`
`,(0,i.jsxs)(t.p,{children:[`You can disable children fields when they are hidden by using the `,(0,i.jsx)(t.code,{children:`fieldPropsWhenHidden`}),` property. It will pass the given properties to the children when the visibility is hidden. It needs to be used in combination with the `,(0,i.jsx)(t.code,{children:`keepInDOM`}),` property.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(
  <>
    <Field.Boolean path="/myState" />
    <Form.Visibility
      pathTrue="/myState"
      keepInDOM
      fieldPropsWhenHidden={{ disabled: true }}
    >
      <Field.String />
    </Form.Visibility>
  </>
)
`})}),`
`,(0,i.jsxs)(t.p,{children:[`Check out the `,(0,i.jsx)(t.a,{href:`#nested-visibility-example`,children:`Nested visibility example`}),` to see how you can use `,(0,i.jsx)(t.code,{children:`fieldPropsWhenHidden`}),` and `,(0,i.jsx)(t.code,{children:`keepInDOM`}),`.`]}),`
`,(0,i.jsx)(t.h3,{children:`Why is this useful?`}),`
`,(0,i.jsx)(t.p,{children:`In some cases, you want to keep the content in the DOM, even if it's not visible. This can be useful for fields that still need to run validation.`}),`
`,(0,i.jsx)(t.h2,{children:`Inherit visibility`}),`
`,(0,i.jsxs)(t.p,{children:[`By using the provider component `,(0,i.jsx)(t.code,{children:`Value.Provider`}),`, you can propagate the visibility (with the `,(0,i.jsx)(t.code,{children:`inheritVisibility`}),` property) of the parent to all nested values.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Value.Provider inheritVisibility>
      <Value.String path="/foo" />
      <Value.String path="/bar" />
    </Value.Provider>
  </Form.Handler>
)
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};