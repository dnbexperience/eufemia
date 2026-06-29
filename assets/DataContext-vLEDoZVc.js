import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-BsJ3GLEw.js";import r from"./ListDataContextComponents-97k_zFq_.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{children:`DataContext`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`DataContext`}),` builds a surrounding `,(0,i.jsx)(t.a,{href:`https://react.dev/learn/passing-data-deeply-with-context`,children:`React context`}),` that binds an entire source dataset together with the fields placed within. It enables fields and other components to retrieve data from the source data using `,(0,i.jsx)(t.code,{children:`path`}),` parameters that identify where in the source data the target value is located, and the same components will report changes to the data back so the context can update the dataset.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Example of using the `,(0,i.jsx)(t.code,{children:`DataContext.Provider`}),`:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`<DataContext.Provider data={data} onChange={handleChange}>
  <Field.Name.First path="/firstName" />
</DataContext.Provider>
`})}),`
`,(0,i.jsxs)(t.p,{children:[`For a more complete feature set tailored to building forms, please use `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler`,children:`Form.Handler`}),`. It uses DataContext internally.`]}),`
`,(0,i.jsx)(t.h2,{children:`Components`}),`
`,(0,i.jsx)(r,{}),`
`,(0,i.jsx)(t.h2,{children:`More details`}),`
`,(0,i.jsxs)(t.p,{children:[`If you don't want to repeat all the logic that drills down to values in the source data, and ensure that changes are sent to the right place, you can surround the components with a `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/DataContext/Provider`,children:`DataContext.Provider`}),` component. This means that you feed the form with source data in one place, and give it only one `,(0,i.jsx)(t.code,{children:`onChange`}),` callback. Then you only send the individual fields instructions about where in the data set the value that field is to process is located. The components then communicate internally and ensure that the values are retrieved and sent to the correct location.`]}),`
`,(0,i.jsxs)(t.p,{children:[`The reference to a specific field's value in the dataset is given with a property called `,(0,i.jsx)(t.code,{children:`path`}),`. Paths are defined in a syntax called JSON Pointer, which is basically a slash-separated string that can go several levels, and consist of both object-properties and array indexes. Examples of paths are: `,(0,i.jsx)(t.code,{children:`/firstName`}),`, `,(0,i.jsx)(t.code,{children:`/nested/path/to/value`}),` and `,(0,i.jsx)(t.code,{children:`/list/2/keyInThirdObject`}),`. More information about JSON Pointers can be found on `,(0,i.jsx)(t.a,{href:`https://json-schema.org/draft/2020-12/relative-json-pointer.html`,children:`the website of JSON Schema`}),`. You can also make the `,(0,i.jsx)(t.code,{children:`path`}),` type-safe with autocomplete and compile-time checking — see `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/typed-paths/`,children:`Type-checked paths`}),`.`]}),`
`,(0,i.jsx)(t.p,{children:`In practice, this means that you can go from:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`const handleChange = useCallback((path, value) => {
  // Update external state
})

return (
  <div id="my-form">
    <Field.Name.First
      value={data.firstName}
      onChange={(value) => handleChange('firstName', value)}
    />
    <Field.Name.Last
      value={data.lastName}
      onChange={(value) => handleChange('lastName', value)}
    />
    <Field.Email
      value={data.email}
      onChange={(value) => handleChange('email', value)}
    />
    <Field.String
      label="Special non-standardized value"
      value={data.specialValue}
      onChange={(value) => handleChange('specialValue', value)}
    />
  </div>
)
`})}),`
`,(0,i.jsx)(t.p,{children:`to:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`const handleChange = useCallback((path, value) => {
  // Update external state
})

return (
  <DataContext.Provider data={data} onChange={handleChange}>
    <Field.Name.First path="/firstName" />
    <Field.Name.Last path="/lastName" />
    <Field.Email path="/email" />
    <Field.String
      path="/specialValue"
      label="Special non-standardized value"
    />
  </DataContext.Provider>
)
`})}),`
`,(0,i.jsx)(t.p,{children:`This abstracts away some logic that many are used to having available for debugging and adjustments, which can be unfamiliar and difficult to get used to. The goal of the way this is designed is for it to be well tested and predictable, so that you do not need to have this boilerplate logic available. In addition, properties from the individual components make them flexible in use, and this can be continuously expanded to cover recurring needs from implementations.`}),`
`,(0,i.jsx)(t.h3,{children:`Error handling`}),`
`,(0,i.jsxs)(t.p,{children:[`Besides how the forms are built up and the link to the surrounding data flow, these form components must ensure that the user experience is as much as possible in line with the way we have defined that it should work in practice. An example of this is when the error messages appear on the screen. Both the individual input component and any surrounding `,(0,i.jsx)(t.code,{children:`DataContext.Provider`}),` component hold an internal state that says whether the value in the field has an error or not. In addition, it has a separate state that states whether error messages should be displayed or not.`]}),`
`,(0,i.jsxs)(t.p,{children:[`An example of what this leads to is when a field has an invalid value, for example because the field starts empty but is required, or if the field requires a given syntax (such as national identity number). In such cases, the error message is not displayed before or at the same time as the user fills in the field in question. However, when the user leaves the field, the error message will appear if the value is still not valid based on the validation properties the component has received. When the user then starts to adjust the field in question, the error message is hidden again until they leave the field. In addition, a surrounding `,(0,i.jsx)(t.code,{children:`DataContext.Provider`}),` will check all the fields for errors, so that you do not get to the next step in a step-divided form, or can submit the form and trigger `,(0,i.jsx)(t.code,{children:`onSubmit`}),` if there are still fields on the screen that have errors.`]}),`
`,(0,i.jsxs)(t.p,{children:[`In the case of forms divided into several wizard steps, the combination of the components `,(0,i.jsx)(t.code,{children:`DataContext.Provider`}),` and `,(0,i.jsx)(t.code,{children:`Wizard.Step`}),` will also ensure that only the fields that are visible on the screen (for the relevant step, or based on what is hidden or shown via the Visibility component) provide a basis for whether one can proceed in the process or not.`]}),`
`,(0,i.jsx)(t.h3,{children:`Hierarchically overridable properties`}),`
`,(0,i.jsxs)(t.p,{children:[`Configuration of the form functionality through properties for all components can be hierarchically overridden. This means that the further into the component structure you get, the higher priority properties have. For example, a component that is given a `,(0,i.jsx)(t.code,{children:`path`}),` to retrieve data from the `,(0,i.jsx)(t.code,{children:`DataContext.Provider`}),` will rather prioritize a `,(0,i.jsx)(t.code,{children:`value`}),` property that the component receives directly if both parts are available:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`<DataContext.Provider data={{ foo: 'I am the chosen one!' }}>
  <Value.String path="/foo" />
</DataContext.Provider>
`})}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`<DataContext.Provider data={{ foo: 'I am not chosen :-(' }}>
  <Value.String path="/foo" value="I am the one!" />
</DataContext.Provider>
`})}),`
`,(0,i.jsxs)(t.p,{children:[`In the same way, components that have text properties built in, such as field label and error message for required field on `,(0,i.jsx)(t.code,{children:`Field.Email`}),`, will choose what it receives instead of the default values if both are available:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`<Field.Email />
// Gets the default label, and the email-pattern validation.
`})}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`<Field.Email label="Send me e-mail on this address" />
// Gets the custom label, but still the default email-pattern validation.
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}export{o as default};