"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[65783,73176,96124,55310],{72945:function(n,e,a){a.r(e);var r=a(52322),t=a(45392);function o(n){const e=Object.assign({pre:"pre",code:"code"},(0,t.ah)(),n.components);return(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"// Async event handler\nconst onChange = debounceAsync(async function (data) {\n  try {\n    await makeRequest(data)\n  } catch (error) {\n    return error\n  }\n\n  // Optionally, you can return an object with these keys, depending your needs\n  return {\n    info: 'Info message',\n    warning: 'Warning message',\n\n    // and either an error\n    error: new Error('Error message'),\n\n    // or success (when used for autosave)\n    success: 'saved',\n  } as const\n})\n"})})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,t.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(o,n)})):o(n)}},99201:function(n,e,a){a.r(e);var r=a(52322),t=a(45392);function o(n){const e=Object.assign({p:"p",pre:"pre",code:"code"},(0,t.ah)(),n.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.p,{children:"In all async operations, you can simply return an error object to display it in the form or influence the form behavior."}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",children:"import { Form } from '@dnb/eufemia/extensions/forms'\n\n// Async function\nconst onSubmit = async (data) => {\n  try {\n    const response = await fetch('https://api.example.com', {\n      method: 'POST',\n      body: JSON.stringify(data),\n    })\n    const data = await response.json()\n\n    Form.setData('unique-id', data) // Whatever you want to do with the data\n  } catch (error) {\n    return error // Will display the error message in the form\n  }\n\n  // Optionally, you can return an object with these keys, depending your needs\n  return {\n    info: 'Info message',\n    warning: 'Warning message',\n\n    // Force the form to stay in pending state\n    status: 'pending',\n\n    // and either an error\n    error: new Error('Error message'),\n  } as const\n}\n\nfunction Component() {\n  return (\n    <Form.Handler id=\"unique-id\" onSubmit={onSubmit}>\n      ...\n    </Form.Handler>\n  )\n}\n"})})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,t.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(o,n)})):o(n)}},9947:function(n,e,a){a.r(e);var r=a(52322),t=a(45392),o=a(94929),i=a(57295),s=(a(99201),a(72945));function l(n){const e=Object.assign({h1:"h1",p:"p",strong:"strong",ul:"ul",li:"li",a:"a",h3:"h3",code:"code",h4:"h4",pre:"pre",h5:"h5",h2:"h2"},(0,t.ah)(),n.components);return o||d("Examples",!1),o.GettingStarted||d("Examples.GettingStarted",!0),o.Transformers||d("Examples.Transformers",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h1,{children:"Getting started"}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.strong,{children:"Table of Contents"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"#quick-start",children:"Quick start"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"#creating-forms",children:"Creating forms"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"#state-management",children:"State management"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"#field-components",children:"Field components"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"#value-components",children:"Value components"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"#async-form-behavior",children:"Async form behavior"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"#validation-and-error-handling",children:"Validation and error handling"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"#localization",children:"Localization"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"#layout",children:"Layout"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"#best-practices",children:"Best practices"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"#create-your-own-component",children:"Create your own component"})}),"\n"]}),"\n",(0,r.jsx)(i.default,{}),"\n",(0,r.jsx)(e.h3,{children:"Creating forms"}),"\n",(0,r.jsxs)(e.p,{children:["To build an entire form, there are surrounding components such as form ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Form/Handler",children:"Handler"})," and ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Wizard/Container",children:"Wizard.Container"})," that make data flow and layout easier and save you a lot of extra code, without compromising flexibility."]}),"\n",(0,r.jsxs)(e.p,{children:["The needed styles are included in the Eufemia core package via ",(0,r.jsx)(e.code,{children:"dnb-ui-components"}),"."]}),"\n",(0,r.jsx)(e.h3,{children:"State management"}),"\n",(0,r.jsxs)(e.p,{children:["The state management is done via the ",(0,r.jsx)(e.a,{href:"#what-is-a-json-pointer",children:"JSON Pointer"})," directive (i.e ",(0,r.jsx)(e.code,{children:'path="/firstName"'}),"). This is a standardized way of pointing to a specific part of a JavaScript/JSON object. The JSON Pointer is used to both read and write data, and is also used to validate the data."]}),"\n",(0,r.jsx)(e.h4,{children:"What is a JSON Pointer?"}),"\n",(0,r.jsxs)(e.p,{children:["A ",(0,r.jsx)(e.a,{href:"https://datatracker.ietf.org/doc/html/draft-ietf-appsawg-json-pointer-03",children:"JSON Pointer"})," is a string of tokens separated by ",(0,r.jsx)(e.code,{children:"/"})," characters, these tokens either specify keys in objects or indexes in arrays."]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"const data = {\n  foo: {\n    bar: [\n      {\n        baz: 'value',\n      },\n    ],\n  },\n}\nconst pointer = '/foo/bar/0/baz' // points to 'value'\n"})}),"\n",(0,r.jsx)(e.h4,{children:"Data handling"}),"\n",(0,r.jsxs)(e.p,{children:["You don't need React ",(0,r.jsx)(e.strong,{children:"useState"})," to handle your form data."]}),"\n",(0,r.jsxs)(e.p,{children:["With ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Form/useData/",children:"useData"}),", ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Form/getData/",children:"getData"})," and ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Form/setData/",children:"setData"})," you area able to access and modify your form data not only from nested components, but also outside the form context itself (",(0,r.jsx)(e.code,{children:"Form.Handler"}),")."]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-jsx",children:"import { Form } from '@dnb/eufemia/extensions/forms'\n\nfunction MyForm() {\n  return (\n    <Form.Handler id=\"unique-id\">\n      <MyComponent />\n    </Form.Handler>\n  )\n}\n\nfunction MyComponent() {\n  const {\n    getValue, // Method to get a single value\n    update, // Method to update a single value\n    set, // Method to set the whole dataset\n    data, // The whole dataset (unvalidated)\n    filterData, // Method to filter data with your own logic\n  } = Form.useData('optional-id')\n}\n\n// You canalso use the setData:\nForm.setData('unique-id', { companyName: 'DNB' })\n\n// ... and the getData – method when ever you need to:\nconst {\n  getValue, // Method to get a single value\n  data, // The whole dataset (unvalidated)\n  filterData, // Method to filter data with your own logic\n} = Form.getData('unique-id')\n"})}),"\n",(0,r.jsxs)(e.p,{children:["You can even handle the state outside the ",(0,r.jsx)(e.code,{children:"Form.Handler"})," context. You can find more details in the ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Form/useData/",children:"useData"})," documentation."]}),"\n",(0,r.jsx)(o.GettingStarted,{}),"\n",(0,r.jsx)(e.h4,{children:"Filter data"}),"\n",(0,r.jsxs)(e.p,{children:["You can filter data by any given criteria. This is done by adding a ",(0,r.jsx)(e.code,{children:"filterData"})," property with a handler to the ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Form/Handler/",children:"Form.Handler"}),"."]}),"\n",(0,r.jsx)(e.p,{children:"The callback function receives the path as the first argument, the value as the second argument, and the related field properties as the third argument. The callback function must return a boolean value or undefined. Return false to exclude an entry."}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",children:"const filterDataHandler = (path, value, props, internal) => {\n  if (props.disabled === true) {\n    return false\n  }\n}\nrender(<Form.Handler filterData={filterDataHandler} />)\n"})}),"\n",(0,r.jsxs)(e.p,{children:["Here is a working example of how to ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Form/Handler/demos/#filter-your-data",children:"filter data"}),"."]}),"\n",(0,r.jsx)(e.h4,{children:"Transforming data"}),"\n",(0,r.jsx)(e.p,{children:"Each field supports transformer functions. So you can transform a value before it is processed to the form data object and vis-a-versa:"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",children:'<Field.String\n  label="Label"\n  path="/myField"\n  transformIn={transformIn}\n  transformOut={transformOut}\n/>\n'})}),"\n",(0,r.jsx)(o.Transformers,{}),"\n",(0,r.jsx)(e.h3,{children:"Async form handling"}),"\n",(0,r.jsx)(e.p,{children:"It depends on your use case if this feature is needed. But when it is, its ofter a time consuming task to implement. Eufemia Forms has therefor a built-in feature that enables async form behavior."}),"\n",(0,r.jsxs)(e.p,{children:["More details about the async form behavior can be found in the ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/getting-started/#async-form-behavior",children:"async form behavior"})," section."]}),"\n",(0,r.jsx)(e.h3,{children:"Field components"}),"\n",(0,r.jsxs)(e.p,{children:["In short, field components are interactive components that the user can interact with. Read more about fields in the ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/fields/",children:"What are fields?"})," section."]}),"\n",(0,r.jsx)(e.h3,{children:"Value components"}),"\n",(0,r.jsxs)(e.p,{children:["Beside the interactive ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/fields/",children:"Field"})," components, there is also the static ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Value/",children:"Value"})," components. Use these to show summaries or read-only parts of your application with benefits such as linking to source data and standardized formatting based on the type of data to be displayed."]}),"\n",(0,r.jsx)(e.h3,{children:"Async form behavior"}),"\n",(0,r.jsx)(e.p,{children:"This feature allows you to perform asynchronous operations such as fetching data from an API – without additional state management."}),"\n",(0,r.jsxs)(e.p,{children:["You can enable async form submit behavior on the form ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Form/Handler",children:"Handler"})," by using:"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",children:"<Form.Handler onSubmit={async () => {}}>...</Form.Handler>\n"})}),"\n",(0,r.jsxs)(e.p,{children:["It will disable all fields and show an indicator on the ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Form/SubmitButton/",children:"SubmitButton"})," while the ",(0,r.jsx)(e.strong,{children:"form"})," is pending (",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Form/Handler/demos/",children:"examples"}),")."]}),"\n",(0,r.jsxs)(e.p,{children:["When using ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Wizard/Container/",children:"Wizard.Container"})," you can use in addition:"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",children:"<Wizard.Container onStepChange={async () => {}}>...</Wizard.Container>\n"})}),"\n",(0,r.jsxs)(e.p,{children:["It will disable all fields and show an indicator on the ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Wizard/Buttons/",children:"NextButton"})," while the ",(0,r.jsx)(e.strong,{children:"step"})," is pending (",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Wizard/Container/demos/",children:"examples"}),")."]}),"\n",(0,r.jsx)(e.h4,{children:"onChange and autosave"}),"\n",(0,r.jsxs)(e.p,{children:["You can use an async function for the ",(0,r.jsx)(e.code,{children:"onChange"})," event handler, either on the form ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Form/Handler",children:"Handler"}),":"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",children:"<Form.Handler onChange={async () => {}}>...</Form.Handler>\n"})}),"\n",(0,r.jsxs)(e.p,{children:["or on every ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/fields/",children:"field"}),":"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",children:'<Field.PhoneNumber path="/myField" onChange={async () => {}} />\n'})}),"\n",(0,r.jsxs)(e.p,{children:["They can be used in combination as well – including ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/getting-started/#async-validation",children:"async validator"})," functions."]}),"\n",(0,r.jsx)(e.p,{children:"When the user makes a value change, it will show an indicator on the corresponding field label."}),"\n",(0,r.jsx)(e.p,{children:"This feature can not only be used for autosave, but for any other real-time async operations."}),"\n",(0,r.jsx)(e.p,{children:"Here is an example of an async change behavior:"}),"\n",(0,r.jsx)(s.default,{}),"\n",(0,r.jsxs)(e.p,{children:["More info about the async change behavior in the form ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Form/Handler/info/#async-onchange-and-onsubmit-event-handlers",children:"Handler"})," section."]}),"\n",(0,r.jsx)(e.h4,{children:"Async field validation"}),"\n",(0,r.jsxs)(e.p,{children:["A similar indicator behavior will occur when using async functions for field validation, such as ",(0,r.jsx)(e.code,{children:"validator"})," or ",(0,r.jsx)(e.code,{children:"onBlurValidation"}),", your form will exhibit async behavior. This means that the validation needs to be successfully completed before the form can be submitted."]}),"\n",(0,r.jsx)(e.h3,{children:"Validation and error handling"}),"\n",(0,r.jsx)(e.p,{children:"Every field component has a built-in validation that is based on the type of data it handles. This validation is automatically applied to the field when the user interacts with it. The validation is also applied when the user submits the form."}),"\n",(0,r.jsxs)(e.p,{children:["In addition, you can add your own validation to a field component. This is done by adding a ",(0,r.jsx)(e.code,{children:"required"}),", ",(0,r.jsx)(e.code,{children:"pattern"}),", ",(0,r.jsx)(e.code,{children:"schema"})," or ",(0,r.jsx)(e.code,{children:"validator"})," property."]}),"\n",(0,r.jsxs)(e.p,{children:["Fields which have the ",(0,r.jsx)(e.code,{children:"disabled"})," prop or the ",(0,r.jsx)(e.code,{children:"readOnly"})," prop, will skip validation."]}),"\n",(0,r.jsxs)(e.p,{children:["For monitoring and set your form errors, you can use the ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Form/useError",children:"useError"})," hook."]}),"\n",(0,r.jsx)(e.h4,{children:"Summary for errors"}),"\n",(0,r.jsx)(e.p,{children:"To improve user experience communication regarding errors and their locations, WCAG/UU suggests summarizing error messages when errors have occurred."}),"\n",(0,r.jsxs)(e.p,{children:["Eufemia Forms will easily link up with the ",(0,r.jsx)(e.a,{href:"/uilib/components/global-status",children:"GlobalStatus"})," component and will only display it if there are errors or when the form is being submitted."]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",children:"<GlobalStatus />\n\n<Form.Handler >\n  My Form\n</Form.Handler>\n"})}),"\n",(0,r.jsxs)(e.p,{children:["If you need a custom unique ID, you can just assign ",(0,r.jsx)(e.code,{children:"globalStatusId"})," to the ",(0,r.jsx)(e.code,{children:"Form.Handler"}),":"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",children:'<GlobalStatus id="my-form-status" />\n\n<Form.Handler globalStatusId="my-form-status">\n  My Form\n</Form.Handler>\n'})}),"\n",(0,r.jsx)(e.h4,{children:"required"}),"\n",(0,r.jsxs)(e.p,{children:["The ",(0,r.jsx)(e.code,{children:"required"})," property is a boolean that indicates whether the field is required or not:"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",children:"<Field.PhoneNumber required />\n"})}),"\n",(0,r.jsx)(e.h4,{children:"pattern"}),"\n",(0,r.jsxs)(e.p,{children:["The ",(0,r.jsx)(e.code,{children:"pattern"})," property is a regular expression (RegExp) that the value of the field must match:"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",children:'<Field.PhoneNumber pattern="Your RegExp" />\n'})}),"\n",(0,r.jsx)(e.h4,{children:"schema"}),"\n",(0,r.jsxs)(e.p,{children:["The ",(0,r.jsx)(e.code,{children:"schema"})," property is a JSON schema that the value of the field must match:"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",children:"const schema = {\n  /* AJV Schema */\n}\n<Field.PhoneNumber schema={schema} />\n"})}),"\n",(0,r.jsx)(e.h4,{children:"validator"}),"\n",(0,r.jsxs)(e.p,{children:["The ",(0,r.jsx)(e.code,{children:"validator"})," (including ",(0,r.jsx)(e.code,{children:"onBlurValidator"}),") property is a function that takes the current value of the field as an argument and returns an error message if the value is invalid:"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",children:"const validator = (value) => {\n  const isInvalid = new RegExp('Your RegExp').test(value)\n  if (isInvalid) {\n    return new Error('Invalid value message')\n  }\n}\nrender(<Field.PhoneNumber validator={validator} />)\n"})}),"\n",(0,r.jsxs)(e.p,{children:["You can find more info about error messages in the ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Form/error-messages/",children:"Error messages"})," docs."]}),"\n",(0,r.jsx)(e.h5,{children:"Async validation"}),"\n",(0,r.jsx)(e.p,{children:"Async validation is also supported. The validator function can return a promise (async/await) that resolves to an error message."}),"\n",(0,r.jsxs)(e.p,{children:["In this example we use ",(0,r.jsx)(e.code,{children:"onBlurValidator"})," to only validate the field when the user leaves the field:"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",children:"const validator = async (value) => {\n  try {\n    const isInvalid = await makeRequest(value)\n    if (isInvalid) {\n      return new Error('Invalid value') // Show this message below the field\n    }\n  } catch (error) {\n    return error\n  }\n}\nrender(<Field.PhoneNumber onBlurValidator={validator} />)\n"})}),"\n",(0,r.jsx)(e.h5,{children:"Async validator with debounce"}),"\n",(0,r.jsxs)(e.p,{children:["While when using async validation on every keystroke, it's a good idea to debounce the validation function to avoid unnecessary requests. This can be done by using the ",(0,r.jsx)(e.a,{href:"/uilib/helpers/functions/#debounce",children:"debounceAsync"})," helper function:"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",children:"import { debounceAsync } from '@dnb/eufemia/shared/helpers'\n\nconst validator = debounceAsync(async function myValidator(value) {\n  try {\n    const isInvalid = await makeRequest(value)\n    if (isInvalid) {\n      return new Error('Invalid value') // Show this message below the field\n    }\n  } catch (error) {\n    return error\n  }\n})\nrender(<Field.PhoneNumber validator={validator} />)\n"})}),"\n",(0,r.jsx)(e.h3,{children:"Localization"}),"\n",(0,r.jsxs)(e.p,{children:["In short, use the Eufemia ",(0,r.jsx)(e.a,{href:"/uilib/usage/customisation/localization/",children:"Provider"})," to set the locale for your application (forms). This will ensure that the correct language is used for all the fields in your form."]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",children:"import { Provider } from '@dnb/eufemia/shared'\n\nrender(\n  <Provider locale=\"en-GB\">\n    <Field.PhoneNumber />\n  </Provider>,\n)\n"})}),"\n",(0,r.jsx)(e.p,{children:"In addition, you can customize the translations globally:"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",children:"import { Provider } from '@dnb/eufemia/shared'\n\nrender(\n  <Provider\n    locales={{\n      'nb-NO': {\n        Forms: {\n          PhoneNumber: { label: 'Custom' },\n        },\n      },\n    }}\n  >\n    <Field.PhoneNumber />\n  </Provider>,\n)\n"})}),"\n",(0,r.jsxs)(e.p,{children:["Or use the ",(0,r.jsx)(e.code,{children:"Form.useTranslation"})," hook to localize ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/create-component/#localization-and-translations",children:"your own field"}),"."]}),"\n",(0,r.jsx)(e.h3,{children:"Layout"}),"\n",(0,r.jsx)(e.p,{children:"When building your application forms, preferably use the following layout components. They seamlessly places all the fields and components of Eufemia Forms correctly into place."}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"/uilib/layout/flex/stack/",children:"Flex.Stack"})," layout component for easy and consistent application forms."]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"/uilib/components/card/",children:"Card"})," with the stack property ",(0,r.jsx)(e.code,{children:"<Card stack>...</Card>"})," for the default card outline of forms."]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Form/Appearance/",children:"Form.Appearance"})," for changing sizes (height) of e.g. input fields."]}),"\n"]}),"\n",(0,r.jsx)(e.h3,{children:"Best practices"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/best-practices-on-forms/",children:"Best practices on Forms"}),"."]}),"\n"]}),"\n",(0,r.jsx)(e.h2,{children:"Create your own componet"}),"\n",(0,r.jsx)(e.p,{children:"Eufemia Forms consists of helper components and tools so you can declaratively create interactive form components that flawlessly integrates between existing data and your custom form components. This ensures a common look and feel, even when ready-made components are combined with your local custom components."}),"\n",(0,r.jsxs)(e.p,{children:["Read more about ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/create-component",children:"creating your own component"}),"."]})]})}function d(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,t.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(l,n)})):l(n)}},57295:function(n,e,a){a.r(e);var r=a(52322),t=a(45392),o=a(94929);function i(n){const e=Object.assign({h2:"h2",p:"p",code:"code",pre:"pre",strong:"strong"},(0,t.ah)(),n.components);return o||s("Examples",!1),o.QuickStart||s("Examples.QuickStart",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h2,{children:"Quick start"}),"\n",(0,r.jsxs)(e.p,{children:["Field components can be used directly as they are, for example ",(0,r.jsx)(e.code,{children:"Field.Email"}),":"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-jsx",children:"import { Field } from '@dnb/eufemia/extensions/forms'\n\nrender(<Field.Email />)\n"})}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.strong,{children:"NB:"})," In the above example, only the email field will be a part of your application bundle. Unused code will be tree-shaken away."]}),"\n",(0,r.jsxs)(e.p,{children:["Heres how you can import the ",(0,r.jsx)(e.code,{children:"Form"})," and ",(0,r.jsx)(e.code,{children:"Field"})," components:"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-jsx",children:"import { Form, Field } from '@dnb/eufemia/extensions/forms'\n"})}),"\n",(0,r.jsxs)(e.p,{children:["And here is how you can use the ",(0,r.jsx)(e.code,{children:"Form"})," component:"]}),"\n",(0,r.jsx)(o.QuickStart,{})]})}function s(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,t.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(i,n)})):i(n)}},94929:function(n,e,a){a.r(e),a.d(e,{BaseFieldComponents:function(){return m},CreateBasicFieldComponent:function(){return c},CreateBasicValueComponent:function(){return d},CreateComposedFieldComponent:function(){return u},FeatureFields:function(){return p},GettingStarted:function(){return h},LayoutComponents:function(){return f},QuickStart:function(){return y},Transformers:function(){return F},UsingFormHandler:function(){return g},UsingWizard:function(){return j},Validation:function(){return b},VisibilityBasedOnData:function(){return x}});a(2784);var r=a(28204),t=a(49406),o=a(26409),i=a(16620),s=a(54937),l=a(52322);const d=()=>(0,l.jsx)(r.Z,{scope:{ValueBlock:t.Z},hideCode:!0,noInline:!0,children:'const MyValue = ({ value, ...props }) => {\n  return (\n    <ValueBlock {...props}>\n      <NumberFormat currency>{value}</NumberFormat>\n    </ValueBlock>\n  )\n}\nrender(<MyValue label="Label" value={1234} />)\n'}),c=()=>(0,l.jsx)(r.Z,{scope:{useFieldProps:o.Z},hideCode:!0,noInline:!0,children:"const MyField = (props) => {\n  const fromInput = React.useCallback(({ value }) => value, [])\n  const preparedProps = {\n    label: 'What is the secret of this field?',\n    fromInput,\n    validator: (value) => {\n      if (value === 'secret') {\n        return new Error('Do not reveal the secret!')\n      }\n    },\n    ...props,\n  }\n  const { id, value, label, handleChange, handleFocus, handleBlur } =\n    useFieldProps(preparedProps)\n  return (\n    <FieldBlock forId={id} label={label}>\n      <Input\n        id={id}\n        value={value}\n        on_change={handleChange}\n        on_focus={handleFocus}\n        on_blur={handleBlur}\n      />\n    </FieldBlock>\n  )\n}\nrender(\n  <MyField\n    onChange={(value) => console.log('onChange', value)}\n    required\n  />,\n)\n"}),h=()=>(0,l.jsx)(r.Z,{hideCode:!0,noInline:!0,children:'const existingData = {\n  companyName: \'DNB\',\n  companyOrganizationNumber: \'123456789\',\n  postalAddressSelect: \'companyAddress\',\n}\nfunction Component() {\n  const { data } = Form.useData(\'company-form\')\n  console.log(\'State:\', data)\n  return (\n    <Form.Handler\n      id="company-form"\n      data={existingData}\n      onChange={console.log}\n      onSubmit={console.log}\n    >\n      <Flex.Stack>\n        <Form.MainHeading>Bedrift</Form.MainHeading>\n        <Card stack>\n          <Field.String\n            path="/companyName"\n            label="Bedriftens navn"\n            required\n          />\n          <Field.OrganizationNumber\n            path="/companyOrganizationNumber"\n            required\n          />\n          <Field.Selection\n            path="/postalAddressSelect"\n            label="Ønsket sted for tilsendt post"\n            variant="radio"\n          >\n            <Field.Option\n              value="companyAddress"\n              title="Samme som forretningsadresse"\n            />\n            <Field.Option value="other" title="Annet" />\n          </Field.Selection>\n        </Card>\n        <Form.ButtonRow>\n          <Form.SubmitButton />\n        </Form.ButtonRow>\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nrender(<Component />)\n'}),u=()=>(0,l.jsx)(r.Z,{scope:{DataContext:i,useFieldProps:o.Z},hideCode:!0,noInline:!0,children:'const MyComposedField = (props) => {\n  const birthYear = useFieldProps({\n    path: \'/birthYear\',\n  })\n  const handleBirthYearChange = React.useCallback(\n    (sliderData) => {\n      birthYear.handleChange(sliderData.value)\n    },\n    [birthYear],\n  )\n  return (\n    <FieldBlock label={props.label ?? \'Name and age\'}>\n      <Flex.Horizontal>\n        <Field.String\n          path="/firstName"\n          label="First name"\n          width="medium"\n          minLength={2}\n        />\n        <Field.String\n          path="/lastName"\n          label="Last name"\n          width="medium"\n          required\n        />\n        <FieldBlock width="large">\n          <Slider\n            min={1900}\n            max={new Date().getFullYear()}\n            step={1}\n            label="Birth year"\n            label_direction="vertical"\n            value={parseFloat(String(birthYear.value))}\n            on_change={handleBirthYearChange}\n            on_drag_start={birthYear.handleFocus}\n            on_drag_end={birthYear.handleBlur}\n            status={birthYear.error?.message}\n            tooltip\n          />\n        </FieldBlock>\n      </Flex.Horizontal>\n    </FieldBlock>\n  )\n}\nconst data = {\n  firstName: \'John\',\n  birthYear: 2000,\n}\nrender(\n  <DataContext.Provider\n    data={data}\n    onChange={(data) => console.log(\'onChange\', data)}\n  >\n    <MyComposedField label="My custom label" />\n  </DataContext.Provider>,\n)\n'}),m=()=>(0,l.jsx)(r.Z,{scope:{Value:s},children:'<Card stack>\n  <Field.String\n    label="Text field"\n    value="Lorem Ipsum"\n    onChange={(value) => console.log(\'onChange\', value)}\n  />\n  <Field.Number\n    label="Number Field"\n    value={789}\n    onChange={(value) => console.log(\'onChange\', value)}\n  />\n  <Field.Boolean\n    label="Boolean Field"\n    value={true}\n    onChange={(value) => console.log(\'onChange\', value)}\n  />\n</Card>\n'}),p=()=>(0,l.jsx)(r.Z,{scope:{Value:s},children:'<Card stack>\n  <Field.String label="Fornavn" value="John" />\n  <Field.String label="Etternavn" value="Smith" />\n  <Field.NationalIdentityNumber value="20058512345" />\n  <Field.Email value="john@smith.email" />\n  <Field.PhoneNumber value="+47 98765432" />\n</Card>\n'}),f=()=>(0,l.jsx)(r.Z,{scope:{Value:s},children:'<Flex.Stack>\n  <Form.MainHeading>Profile</Form.MainHeading>\n\n  <Card stack>\n    <Form.SubHeading>Name</Form.SubHeading>\n\n    <Field.String label="Fornavn" value="John" />\n    <Field.String label="Etternavn" value="Smith" />\n  </Card>\n\n  <Card stack>\n    <Form.SubHeading>More information</Form.SubHeading>\n\n    <Field.NationalIdentityNumber value="20058512345" />\n    <Field.Email value="john@smith.email" />\n    <Field.PhoneNumber value="+47 98765432" />\n  </Card>\n</Flex.Stack>\n'}),x=()=>(0,l.jsx)(r.Z,{scope:{Value:s},children:'<Form.Handler\n  data={{\n    firstName: undefined,\n    lastName: \'Smith\',\n    advanced: false,\n    ssn: \'123\',\n    email: \'@smith.email\',\n    phone: \'+47 98765432\',\n  }}\n  onChange={(data) => console.log(\'onChange\', data)}\n  onPathChange={(path, value) => console.log(\'onPathChange\', path, value)}\n  onSubmit={(data) => console.log(\'onSubmit\', data)}\n>\n  <Flex.Stack>\n    <Form.MainHeading>Profile</Form.MainHeading>\n\n    <Card stack>\n      <Form.SubHeading>Name</Form.SubHeading>\n\n      <Field.String path="/firstName" label="Fornavn" />\n      <Field.String path="/lastName" label="Etternavn" />\n    </Card>\n\n    <Field.Boolean\n      path="/advanced"\n      variant="checkbox-button"\n      label="More fields"\n    />\n    <Form.Visibility pathTrue="/advanced">\n      <Flex.Stack>\n        <Card stack>\n          <Form.SubHeading>More information</Form.SubHeading>\n\n          <Field.NationalIdentityNumber value="20058512345" />\n          <Field.Email value="john@smith.email" />\n          <Field.PhoneNumber value="+47 98765432" />\n        </Card>\n      </Flex.Stack>\n    </Form.Visibility>\n  </Flex.Stack>\n</Form.Handler>\n'}),g=()=>(0,l.jsx)(r.Z,{scope:{Value:s},children:"<Form.Handler\n  data={{\n    firstName: 'John',\n    lastName: 'Smith',\n    ssn: '20058512345',\n    email: 'john@smith.email',\n    phone: '+47 98765432',\n  }}\n  onChange={(data) => console.log('onChange', data)}\n  onPathChange={(path, value) => console.log('onPathChange', path, value)}\n  onSubmit={(data) => console.log('onSubmit', data)}\n>\n  <Form.MainHeading>Profile</Form.MainHeading>\n\n  <Card stack>\n    <Field.String path=\"/firstName\" label=\"Fornavn\" />\n    <Field.String path=\"/lastName\" label=\"Etternavn\" />\n    <Field.NationalIdentityNumber path=\"/ssn\" />\n    <Field.Email path=\"/email\" />\n    <Field.PhoneNumber path=\"/phone\" />\n\n    <Form.ButtonRow>\n      <Form.SubmitButton />\n    </Form.ButtonRow>\n  </Card>\n</Form.Handler>\n"}),b=()=>(0,l.jsx)(r.Z,{scope:{Value:s},children:"<Form.Handler\n  data={{\n    firstName: undefined,\n    lastName: 'Smith',\n    ssn: '123',\n    email: '@smith.email',\n    phone: '+47 98765432',\n  }}\n  onChange={(data) => console.log('onChange', data)}\n  onPathChange={(path, value) => console.log('onPathChange', path, value)}\n  onSubmit={(data) => console.log('onSubmit', data)}\n>\n  <Form.MainHeading>Profile</Form.MainHeading>\n\n  <Card stack>\n    <Field.String path=\"/firstName\" label=\"Fornavn\" required />\n    <Field.String path=\"/lastName\" label=\"Etternavn\" required />\n    <Field.NationalIdentityNumber path=\"/ssn\" validateInitially />\n    <Field.Email path=\"/email\" validateInitially />\n    <Field.PhoneNumber path=\"/phone\" validateInitially />\n  </Card>\n</Form.Handler>\n"}),j=()=>(0,l.jsx)(r.Z,{noInline:!0,children:'const MyForm = () => {\n  // Routers like "react-router" are supported as well\n  Wizard.useQueryLocator(\'my-wizard\')\n  const { summaryTitle } = Form.useLocale().Step\n  return (\n    <Form.Handler\n      data={{\n        firstName: undefined,\n        lastName: \'Smith\',\n        advanced: false,\n        ssn: \'123\',\n        email: \'@smith.email\',\n        phone: \'+47 98765432\',\n      }}\n      onChange={(data) => console.log(\'onChange\', data)}\n      onPathChange={(path, value) =>\n        console.log(\'onPathChange\', path, value)\n      }\n      onSubmit={(data) => console.log(\'onSubmit\', data)}\n    >\n      <Wizard.Container id="my-wizard" mode="loose">\n        <Wizard.Step title="Name">\n          <Form.MainHeading>Profile</Form.MainHeading>\n\n          <Card stack>\n            <Form.SubHeading>Name</Form.SubHeading>\n\n            <Field.String path="/firstName" label="Fornavn" required />\n            <Field.String path="/lastName" label="Etternavn" required />\n          </Card>\n\n          <Wizard.Buttons />\n        </Wizard.Step>\n\n        <Wizard.Step title="More information">\n          <Form.MainHeading>Profile</Form.MainHeading>\n\n          <Card stack>\n            <Form.SubHeading>More information</Form.SubHeading>\n\n            <Field.NationalIdentityNumber path="/ssn" />\n            <Field.Email path="/email" />\n            <Field.PhoneNumber path="/phone" />\n          </Card>\n\n          <Wizard.Buttons />\n        </Wizard.Step>\n\n        <Wizard.Step title={summaryTitle}>\n          <Form.MainHeading>Profile</Form.MainHeading>\n\n          <Card stack>\n            <Value.SummaryList layout="grid">\n              <Value.String path="/firstName" label="Fornavn" />\n              <Value.String path="/lastName" label="Etternavn" />\n\n              <Value.NationalIdentityNumber path="/ssn" />\n              <Value.Email path="/email" />\n              <Value.PhoneNumber path="/phone" />\n            </Value.SummaryList>\n          </Card>\n\n          <Form.ButtonRow>\n            <Wizard.Buttons />\n            <Form.SubmitButton />\n          </Form.ButtonRow>\n        </Wizard.Step>\n      </Wizard.Container>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'}),F=()=>(0,l.jsx)(r.Z,{hideCode:!0,noInline:!0,children:'const MyForm = () => {\n  const transformToUpper = (value) => {\n    return value?.toUpperCase()\n  }\n  const transformToLower = (value) => {\n    return value?.toLowerCase()\n  }\n  return (\n    <Form.Handler onChange={console.log}>\n      <Card stack>\n        <Field.String\n          width="medium"\n          label="Input value"\n          placeholder="Type letters"\n          path="/myField"\n          transformIn={transformToUpper}\n          transformOut={transformToLower}\n        />\n\n        <Value.String label="Output value" path="/myField" />\n      </Card>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'}),y=()=>(0,l.jsx)(r.Z,{noInline:!0,children:'const MyForm = () => {\n  const existingData = {\n    companyName: \'DNB\',\n  }\n  return (\n    <Form.Handler\n      data={existingData}\n      onChange={console.log}\n      onSubmit={console.log}\n    >\n      <Card stack>\n        <Field.String\n          path="/companyName"\n          label="Bedriftens navn"\n          required\n        />\n        <Field.OrganizationNumber\n          path="/companyOrganizationNumber"\n          required\n        />\n        <Field.Selection\n          path="/postalAddressSelect"\n          label="Ønsket sted for tilsendt post"\n          variant="radio"\n        >\n          <Field.Option\n            value="companyAddress"\n            title="Samme som forretningsadresse"\n          />\n          <Field.Option value="other" title="Annet" />\n        </Field.Selection>\n      </Card>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'})},16620:function(n,e,a){a.r(e),a.d(e,{At:function(){return c},Context:function(){return r.Z},Provider:function(){return t.ZP},defaultContextState:function(){return r.E}});var r=a(21068),t=a(6436),o=a(2784),i=a(95955),s=a.n(i),l=a(52322);function d(n){const{path:e="/",iterate:a,children:t}=n,i=(0,o.useContext)(r.Z),{data:d,handlePathChange:c}=i,h=d&&s().has(d,e)?s().get(d,e):void 0,u=(0,o.useCallback)(((n,a)=>{c(`${e}${n}`,a)}),[c,e]);return a?Array.isArray(h)?(0,l.jsx)(l.Fragment,{children:h.map(((n,a)=>{const o=c?(n,r)=>{c(`${e}/${a}${n}`,r)}:void 0;return(0,l.jsx)(r.Z.Provider,{value:{...i,data:n,handlePathChange:o},children:t},`element${a}`)}))}):null:(0,l.jsx)(r.Z.Provider,{value:{...i,data:h,handlePathChange:u},children:t})}d._supportsSpacingProps=!0;var c=d}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-getting-started-mdx-291a23e6098901556ce5.js.map