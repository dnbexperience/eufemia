import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import{a as n,c as r,d as i,f as a,i as o,l as s,n as c,o as l,r as u,s as d,t as f,u as p}from"./Examples-BPZcOqF5.js";var m=e();function h(e){let h={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...t(),...e.components};return u||_(`Examples`,!1),f||_(`Examples.AllFieldsRequired`,!0),c||_(`Examples.BasicViewAndEditContainer`,!0),o||_(`Examples.NestedPathSection`,!0),n||_(`Examples.NestedSections`,!0),l||_(`Examples.OverwriteProps`,!0),d||_(`Examples.SchemaSupport`,!0),r||_(`Examples.SectionLevelZodSchema`,!0),s||_(`Examples.ViewAndEditContainer`,!0),p||_(`Examples.ViewAndEditContainerValidation`,!0),i||_(`Examples.WithVisibility`,!0),a||_(`Examples.WithoutDataContext`,!0),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(h.h2,{children:`Demos`}),`
`,(0,m.jsx)(h.h3,{children:`Without Form.Handler`}),`
`,(0,m.jsx)(a,{}),`
`,(0,m.jsx)(h.h3,{children:`With a nested path`}),`
`,(0,m.jsx)(h.p,{children:`This lets you reuse the same section of fields in multiple places in your forms.`}),`
`,(0,m.jsx)(o,{}),`
`,(0,m.jsx)(h.h3,{children:`With a Edit and View container`}),`
`,(0,m.jsxs)(h.p,{children:[`This example uses the `,(0,m.jsx)(h.a,{href:`/uilib/extensions/forms/Form/Section/EditContainer/`,children:`Form.Section.EditContainer`}),` and `,(0,m.jsx)(h.a,{href:`/uilib/extensions/forms/Form/Section/ViewContainer/`,children:`Form.Section.ViewContainer`}),` containers with the default `,(0,m.jsx)(h.code,{children:`variant="outline"`}),`.`]}),`
`,(0,m.jsx)(s,{}),`
`,(0,m.jsx)(h.h3,{children:`Show errors on the whole section`}),`
`,(0,m.jsxs)(h.p,{children:[`When a field in the section has an error and the section has `,(0,m.jsx)(h.code,{children:`containerMode`}),` set to `,(0,m.jsx)(h.code,{children:`auto`}),` (default), the whole section will switch to edit mode. The errors will be shown when `,(0,m.jsx)(h.code,{children:`validateInitially`}),` is set to `,(0,m.jsx)(h.code,{children:`true`}),`.`]}),`
`,(0,m.jsx)(p,{}),`
`,(0,m.jsxs)(h.h3,{children:[`Using `,(0,m.jsx)(h.code,{children:`variant="basic"`})]}),`
`,(0,m.jsxs)(h.p,{children:[`Using `,(0,m.jsx)(h.code,{children:`variant="basic"`}),` will render the view and edit container without the additional Card `,(0,m.jsx)(h.code,{children:`outline`}),`.`]}),`
`,(0,m.jsx)(c,{}),`
`,(0,m.jsx)(h.h3,{children:`Overwrite properties`}),`
`,(0,m.jsx)(h.p,{children:`Overwriting properties makes it very flexible to reuse the same section of fields in multiple places in your forms.`}),`
`,(0,m.jsx)(l,{}),`
`,(0,m.jsx)(h.h3,{children:`Schema support`}),`
`,(0,m.jsxs)(h.p,{children:[`This feature lets you extend the requirements of the fields in the section with a `,(0,m.jsx)(h.a,{href:`/uilib/extensions/forms/all-features/#schema-validation`,children:`JSON Schema`}),`.`]}),`
`,(0,m.jsx)(d,{}),`
`,(0,m.jsx)(h.h3,{children:`Section level Zod schema`}),`
`,(0,m.jsx)(h.p,{children:`You can also use a Zod schema to validate the data in the section.`}),`
`,(0,m.jsx)(r,{}),`
`,(0,m.jsx)(h.h3,{children:`Required support`}),`
`,(0,m.jsxs)(h.p,{children:[`You can easily make a section of fields required by setting the `,(0,m.jsx)(h.code,{children:`required`}),` property on the section itself.`]}),`
`,(0,m.jsx)(f,{}),`
`,(0,m.jsx)(h.h3,{children:`Nested sections`}),`
`,(0,m.jsx)(h.p,{children:`You can nest sections inside each other.`}),`
`,(0,m.jsx)(n,{}),`
`,(0,m.jsx)(h.h3,{children:`With Visibility logic`}),`
`,(0,m.jsxs)(h.p,{children:[`The `,(0,m.jsx)(h.a,{href:`/uilib/extensions/forms/Form/Visibility/`,children:`Form.Visibility`}),` component lets you show or hide parts of your form based on the data given in the section itself.`]}),`
`,(0,m.jsx)(i,{})]})}function g(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,m.jsx)(n,{...e,children:(0,m.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};