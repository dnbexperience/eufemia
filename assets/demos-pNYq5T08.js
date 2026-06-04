import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";import{a as r,c as i,d as a,f as o,i as s,l as c,n as l,o as u,r as d,s as f,t as p,u as m}from"./Examples-BKcd1ucB.js";var h=e(t());function g(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return u||v(`Examples`,!1),p||v(`Examples.AsyncChangeAndValidation`,!0),l||v(`Examples.AsyncOnSubmitRequest`,!0),d||v(`Examples.AsyncSubmit`,!0),s||v(`Examples.AsyncSubmitComplete`,!0),r||v(`Examples.Autofill`,!0),f||v(`Examples.FilterData`,!0),i||v(`Examples.Locale`,!0),c||v(`Examples.RequiredAndOptionalFields`,!0),m||v(`Examples.SessionStorage`,!0),a||v(`Examples.TransformData`,!0),o||v(`Examples.VisibleData`,!0),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(t.h2,{children:`Demos`}),`
`,(0,h.jsx)(t.h3,{children:`Required and Optional Fields`}),`
`,(0,h.jsxs)(t.p,{children:[`To make all fields required, set the `,(0,h.jsx)(t.code,{children:`required`}),` property on the `,(0,h.jsx)(t.code,{children:`Form.Handler`}),` component.`]}),`
`,(0,h.jsxs)(t.p,{children:[`For fields that should remain optional, use `,(0,h.jsx)(t.code,{children:`required={false}`}),` property on the specific field. When doing so, it will append "(optional)" to the optional field's label(`,(0,h.jsx)(t.code,{children:`labelSuffix`}),`).`]}),`
`,(0,h.jsx)(c,{}),`
`,(0,h.jsx)(t.h3,{children:`In combination with a SubmitButton`}),`
`,(0,h.jsxs)(t.p,{children:[`This example uses an async `,(0,h.jsx)(t.code,{children:`onSubmit`}),` event handler. It will disable all fields and show an indicator on the `,(0,h.jsx)(t.a,{href:`/uilib/extensions/forms/Form/SubmitButton/`,children:`Form.SubmitButton`}),` while the form is pending.`]}),`
`,(0,h.jsx)(t.p,{children:`With an async function, you can also handle the response from the server and update the form with the new data.`}),`
`,(0,h.jsx)(t.pre,{children:(0,h.jsx)(t.code,{className:`language-ts`,children:`// Async function
const onSubmit = async (data) => {
  try {
    const response = await fetch('https://api.example.com', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    const data = await response.json()
    Form.setData('unique', data) // Whatever you want to do with the data
  } catch (error) {
    return error // Will display the error message in the form
  }
}
`})}),`
`,(0,h.jsx)(d,{}),`
`,(0,h.jsx)(t.h3,{children:`New location after async submit`}),`
`,(0,h.jsx)(t.p,{children:`This example is only for demo purpose and will NOT redirect to a new location. It will also time out after 10 seconds.`}),`
`,(0,h.jsx)(s,{}),`
`,(0,h.jsx)(t.h3,{children:`Async onSubmitRequest with error message`}),`
`,(0,h.jsxs)(t.p,{children:[`This example demonstrates returning an error message from `,(0,h.jsx)(t.code,{children:`onSubmitRequest`}),`. When the form has validation errors and the user tries to submit, the `,(0,h.jsx)(t.code,{children:`onSubmitRequest`}),` handler is called. It can return an error, warning, or info message that will be displayed at the form level.`]}),`
`,(0,h.jsx)(l,{}),`
`,(0,h.jsx)(t.h3,{children:`Reduce your data to visible fields`}),`
`,(0,h.jsxs)(t.p,{children:[`You can use the `,(0,h.jsx)(t.code,{children:`reduceToVisibleFields`}),` function to get only the data of visible (mounted) fields.`]}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsx)(t.h3,{children:`With session storage`}),`
`,(0,h.jsx)(t.p,{children:`Changes you make to the fields are temporarily saved and loaded
when the browser reloads. The data is stored until the session storage is invalidated.`}),`
`,(0,h.jsx)(m,{}),`
`,(0,h.jsx)(t.h3,{children:`Locale and translations`}),`
`,(0,h.jsx)(i,{}),`
`,(0,h.jsx)(t.h3,{children:`Autocomplete (autofill) user data`}),`
`,(0,h.jsx)(r,{}),`
`,(0,h.jsx)(t.h3,{children:`Complex async (autosave) example`}),`
`,(0,h.jsxs)(t.p,{children:[`This example demonstrates how to use async validation with an async `,(0,h.jsx)(t.code,{children:`onSubmit`}),` and async `,(0,h.jsx)(t.code,{children:`onChange`}),` event for both the `,(0,h.jsx)(t.code,{children:`Form.Handler`}),` and a field itself.`]}),`
`,(0,h.jsxs)(t.ul,{children:[`
`,(0,h.jsxs)(t.li,{children:[`
`,(0,h.jsx)(t.p,{children:`While you write, an async validation request is simulated to check if the input is valid. If it's not, an error message will be shown.`}),`
`]}),`
`,(0,h.jsxs)(t.li,{children:[`
`,(0,h.jsx)(t.p,{children:`During validation, only the relevant value will be evaluated. This means, when the delayed validation is done, and the value has changed, the validation result will be omitted.`}),`
`]}),`
`,(0,h.jsxs)(t.li,{children:[`
`,(0,h.jsxs)(t.p,{children:[`You can press enter to submit the form while you write. But only a string of `,(0,h.jsx)(t.code,{children:`valid`}),` will be accepted to emit the form `,(0,h.jsx)(t.code,{children:`onSubmit`}),` and `,(0,h.jsx)(t.code,{children:`onChange`}),`.`]}),`
`]}),`
`,(0,h.jsxs)(t.li,{children:[`
`,(0,h.jsx)(t.p,{children:`You can start writing, wait a second or two and remove the whole text again and blur the field. The async validation return will be omitted and the "required" error message will be shown.`}),`
`]}),`
`,(0,h.jsxs)(t.li,{children:[`
`,(0,h.jsx)(t.p,{children:`It also shows some status messages after the validation and submit requests are done.`}),`
`]}),`
`,(0,h.jsxs)(t.li,{children:[`
`,(0,h.jsxs)(t.p,{children:[`This example does not include an async `,(0,h.jsx)(t.code,{children:`onBlurValidator`}),` – but it's possible to add one into the mix as well.`]}),`
`]}),`
`,(0,h.jsxs)(t.li,{children:[`
`,(0,h.jsxs)(t.p,{children:[`To access the `,(0,h.jsx)(t.code,{children:`date`}),` "in sync" – you can use the `,(0,h.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useData/`,children:`Form.useData`}),` hook.`]}),`
`]}),`
`]}),`
`,(0,h.jsx)(p,{}),`
`,(0,h.jsx)(t.h3,{children:`Filter your data`}),`
`,(0,h.jsxs)(t.p,{children:[`By using the `,(0,h.jsx)(t.code,{children:`filterData`}),` method from the `,(0,h.jsx)(t.code,{children:`onSubmit`}),` event callback you can filter out data that you do not want to send to your server.`]}),`
`,(0,h.jsxs)(t.p,{children:[`More info about `,(0,h.jsx)(t.code,{children:`filterData`}),` can be found in the `,(0,h.jsx)(t.a,{href:`/uilib/extensions/forms/getting-started/#filter-data`,children:`Getting Started`}),` section.`]}),`
`,(0,h.jsx)(t.p,{children:`In this example we filter out all fields that are disabled.`}),`
`,(0,h.jsx)(f,{}),`
`,(0,h.jsx)(t.h3,{children:`Transform data`}),`
`,(0,h.jsxs)(t.p,{children:[`You can use the `,(0,h.jsx)(t.code,{children:`transformData`}),` method from the `,(0,h.jsx)(t.code,{children:`onSubmit`}),` event callback to transform the data before sending it to your server.`]}),`
`,(0,h.jsxs)(t.p,{children:[`It's possible to use the `,(0,h.jsx)(t.code,{children:`transformOut`}),` on the Form.Handler method to achieve the same result. However, performance-wise, it's better to use the `,(0,h.jsx)(t.code,{children:`transformData`}),` method. This is because `,(0,h.jsx)(t.code,{children:`transformOut`}),` on the Form.Handler method executes for every change, while the `,(0,h.jsx)(t.code,{children:`transformData`}),` method from the `,(0,h.jsx)(t.code,{children:`onSubmit`}),` event callback only executes when submitting the form.`]}),`
`,(0,h.jsx)(a,{})]})}function _(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(g,{...e})}):g(e)}function v(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as default};