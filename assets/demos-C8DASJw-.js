import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-BCXtuv-b.js";import{a as r,c as i,d as a,f as o,i as s,l as c,n as l,o as u,r as d,s as f,t as p,u as m}from"./Examples-LefXBOnS.js";var h=e(t());function g(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...n(),...e.components};return d||v(`Examples`,!1),p||v(`Examples.AllFieldsRequired`,!0),l||v(`Examples.BasicViewAndEditContainer`,!0),s||v(`Examples.NestedPathSection`,!0),r||v(`Examples.NestedSections`,!0),u||v(`Examples.OverwriteProps`,!0),f||v(`Examples.SchemaSupport`,!0),i||v(`Examples.SectionLevelZodSchema`,!0),c||v(`Examples.ViewAndEditContainer`,!0),m||v(`Examples.ViewAndEditContainerValidation`,!0),a||v(`Examples.WithVisibility`,!0),o||v(`Examples.WithoutDataContext`,!0),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(t.h2,{children:`Demos`}),`
`,(0,h.jsx)(t.h3,{children:`Without Form.Handler`}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsx)(t.h3,{children:`With a nested path`}),`
`,(0,h.jsx)(t.p,{children:`This lets you reuse the same section of fields in multiple places in your forms.`}),`
`,(0,h.jsx)(s,{}),`
`,(0,h.jsx)(t.h3,{children:`With a Edit and View container`}),`
`,(0,h.jsxs)(t.p,{children:[`This example uses the `,(0,h.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/EditContainer/`,children:`Form.Section.EditContainer`}),` and `,(0,h.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/ViewContainer/`,children:`Form.Section.ViewContainer`}),` containers with the default `,(0,h.jsx)(t.code,{children:`variant="outline"`}),`.`]}),`
`,(0,h.jsx)(c,{}),`
`,(0,h.jsx)(t.h3,{children:`Show errors on the whole section`}),`
`,(0,h.jsxs)(t.p,{children:[`When a field in the section has an error and the section has `,(0,h.jsx)(t.code,{children:`containerMode`}),` set to `,(0,h.jsx)(t.code,{children:`auto`}),` (default), the whole section will switch to edit mode. The errors will be shown when `,(0,h.jsx)(t.code,{children:`validateInitially`}),` is set to `,(0,h.jsx)(t.code,{children:`true`}),`.`]}),`
`,(0,h.jsx)(m,{}),`
`,(0,h.jsxs)(t.h3,{children:[`Using `,(0,h.jsx)(t.code,{children:`variant="basic"`})]}),`
`,(0,h.jsxs)(t.p,{children:[`Using `,(0,h.jsx)(t.code,{children:`variant="basic"`}),` will render the view and edit container without the additional Card `,(0,h.jsx)(t.code,{children:`outline`}),`.`]}),`
`,(0,h.jsx)(l,{}),`
`,(0,h.jsx)(t.h3,{children:`Overwrite properties`}),`
`,(0,h.jsx)(t.p,{children:`Overwriting properties makes it very flexible to reuse the same section of fields in multiple places in your forms.`}),`
`,(0,h.jsx)(u,{}),`
`,(0,h.jsx)(t.h3,{children:`Schema support`}),`
`,(0,h.jsxs)(t.p,{children:[`This feature lets you extend the requirements of the fields in the section with a `,(0,h.jsx)(t.a,{href:`/uilib/extensions/forms/all-features/#schema-validation`,children:`JSON Schema`}),`.`]}),`
`,(0,h.jsx)(f,{}),`
`,(0,h.jsx)(t.h3,{children:`Section level Zod schema`}),`
`,(0,h.jsx)(t.p,{children:`You can also use a Zod schema to validate the data in the section.`}),`
`,(0,h.jsx)(i,{}),`
`,(0,h.jsx)(t.h3,{children:`Required support`}),`
`,(0,h.jsxs)(t.p,{children:[`You can easily make a section of fields required by setting the `,(0,h.jsx)(t.code,{children:`required`}),` property on the section itself.`]}),`
`,(0,h.jsx)(p,{}),`
`,(0,h.jsx)(t.h3,{children:`Nested sections`}),`
`,(0,h.jsx)(t.p,{children:`You can nest sections inside each other.`}),`
`,(0,h.jsx)(r,{}),`
`,(0,h.jsx)(t.h3,{children:`With Visibility logic`}),`
`,(0,h.jsxs)(t.p,{children:[`The `,(0,h.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Visibility/`,children:`Form.Visibility`}),` component lets you show or hide parts of your form based on the data given in the section itself.`]}),`
`,(0,h.jsx)(a,{})]})}function _(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(g,{...e})}):g(e)}function v(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as default};