import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import n from"./demos-CpHKaHaV.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,pre:`pre`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Visibility />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`Form.Visibility`}),` component allows you to conditionally show or hide components based on the state of data or field validation. You can either provide the values directly via properties or let it read data from a surrounding `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),`. This enables dynamic visibility control based on the paths it points to.`]}),`
`,(0,r.jsx)(n.h3,{children:`Iterate.Visibility`}),`
`,(0,r.jsxs)(n.p,{children:[`You can also use the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Iterate/Visibility/`,children:`Iterate.Visibility`}),` component to target relative paths (`,(0,r.jsx)(n.code,{children:`itemPath`}),`) within an `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Iterate/Array/`,children:`Iterate.Array`}),` component.`]}),`
`,(0,r.jsx)(n.h3,{children:`Data driven visibility`}),`
`,(0,r.jsxs)(n.p,{children:[`There are several `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Visibility/properties/`,children:`properties`}),` you can use to control visibility, such as `,(0,r.jsx)(n.code,{children:`pathDefined`}),`, `,(0,r.jsx)(n.code,{children:`pathTruthy`}),`, `,(0,r.jsx)(n.code,{children:`pathTrue`}),` etc.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

render(
  <>
    <Field.Boolean path="/myState" />
    <Form.Visibility pathTrue="/myState">
      show me when the data value is true
    </Form.Visibility>
  </>
)
`})}),`
`,(0,r.jsx)(n.h4,{children:`Dynamic value driven visibility`}),`
`,(0,r.jsxs)(n.p,{children:[`You can also use the `,(0,r.jsx)(n.code,{children:`visibleWhen`}),` property to conditionally show the children based on the data value of the path.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

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
`,(0,r.jsx)(n.h3,{children:`Validation driven visibility`}),`
`,(0,r.jsxs)(n.p,{children:[`You can conditionally display children based on field validation by using the `,(0,r.jsx)(n.code,{children:`visibleWhen`}),` property with `,(0,r.jsx)(n.code,{children:`isValid: true`}),`:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

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
`,(0,r.jsxs)(n.p,{children:[`To prevent visibility changes during user interactions like typing, it shows the children only when the field both has no errors and has lost focus (blurred). You can use the `,(0,r.jsx)(n.code,{children:`validateContinuously: true`}),` property to immediately show the children when the field has no errors.`]}),`
`,(0,r.jsx)(n.h2,{children:`Accessibility`}),`
`,(0,r.jsxs)(n.p,{children:[`Children of the `,(0,r.jsx)(n.code,{children:`Form.Visibility`}),` component will be hidden from screen readers when visually hidden, even if `,(0,r.jsx)(n.code,{children:`keepInDOM`}),` is enabled. You do not need to do anything to make the content additionally inaccessible.`]}),`
`,(0,r.jsx)(n.h2,{children:`Animate`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the `,(0,r.jsx)(n.code,{children:`animate`}),` property to animate the visibility change. It can be used in combination with `,(0,r.jsx)(n.code,{children:`keepInDOM`}),`.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(
  <>
    <Field.Boolean path="/myState" />
    <Form.Visibility pathTrue="/myState" animate>
      show me when the data value is true
    </Form.Visibility>
  </>
)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Keep in DOM`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the `,(0,r.jsx)(n.code,{children:`keepInDOM`}),` property to keep the content in the DOM, even if it's not visible or accessible. This can be useful for fields that still need to run validation.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(
  <>
    <Field.Boolean path="/myState" />
    <Form.Visibility pathTrue="/myState" keepInDOM>
      show me when the data value is true
    </Form.Visibility>
  </>
)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Disable children fields when hidden`}),`
`,(0,r.jsxs)(n.p,{children:[`You can disable children fields when they are hidden by using the `,(0,r.jsx)(n.code,{children:`fieldPropsWhenHidden`}),` property. It will pass the given properties to the children when the visibility is hidden. It needs to be used in combination with the `,(0,r.jsx)(n.code,{children:`keepInDOM`}),` property.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
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
`,(0,r.jsxs)(n.p,{children:[`Check out the `,(0,r.jsx)(n.a,{href:`#nested-visibility-example`,children:`Nested visibility example`}),` to see how you can use `,(0,r.jsx)(n.code,{children:`fieldPropsWhenHidden`}),` and `,(0,r.jsx)(n.code,{children:`keepInDOM`}),`.`]}),`
`,(0,r.jsx)(n.h3,{children:`Why is this useful?`}),`
`,(0,r.jsx)(n.p,{children:`In some cases, you want to keep the content in the DOM, even if it's not visible. This can be useful for fields that still need to run validation.`}),`
`,(0,r.jsx)(n.h2,{children:`Inherit visibility`}),`
`,(0,r.jsxs)(n.p,{children:[`By using the provider component `,(0,r.jsx)(n.code,{children:`Value.Provider`}),`, you can propagate the visibility (with the `,(0,r.jsx)(n.code,{children:`inheritVisibility`}),` property) of the parent to all nested values.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Value } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Value.Provider inheritVisibility>
      <Value.String path="/foo" />
      <Value.String path="/bar" />
    </Value.Provider>
  </Form.Handler>
)
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};