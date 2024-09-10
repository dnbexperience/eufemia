"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[80504],{43316:function(n,e,t){t.r(e);var a=t(52322),o=t(45392),r=t(94012);function i(n){const e=Object.assign({h2:"h2",h3:"h3",p:"p",code:"code",a:"a",pre:"pre",ul:"ul",li:"li"},(0,o.ah)(),n.components);return r||s("Examples",!1),r.AsyncChangeAndValidation||s("Examples.AsyncChangeAndValidation",!0),r.AsyncSubmit||s("Examples.AsyncSubmit",!0),r.AsyncSubmitComplete||s("Examples.AsyncSubmitComplete",!0),r.Autofill||s("Examples.Autofill",!0),r.FilterData||s("Examples.FilterData",!0),r.Locale||s("Examples.Locale",!0),r.SessionStorage||s("Examples.SessionStorage",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.h2,{children:"Demos"}),"\n",(0,a.jsx)(e.h3,{children:"In combination with a SubmitButton"}),"\n",(0,a.jsxs)(e.p,{children:["This example uses an async ",(0,a.jsx)(e.code,{children:"onSubmit"})," event handler. It will disable all fields and show an indicator on the ",(0,a.jsx)(e.a,{href:"/uilib/extensions/forms/Form/SubmitButton/",children:"SubmitButton"})," while the form is pending."]}),"\n",(0,a.jsx)(e.p,{children:"With an async function, you can also handle the response from the server and update the form with the new data."}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-ts",children:"// Async function\nconst onSubmit = async (data) => {\n  try {\n    const response = await fetch('https://api.example.com', {\n      method: 'POST',\n      body: JSON.stringify(data),\n    })\n    const data = await response.json()\n    Form.setData('unique', data) // Whatever you want to do with the data\n  } catch (error) {\n    return error // Will display the error message in the form\n  }\n}\n"})}),"\n",(0,a.jsx)(r.AsyncSubmit,{}),"\n",(0,a.jsx)(e.h3,{children:"New location after async submit"}),"\n",(0,a.jsx)(e.p,{children:"This example is only for demo purpose and will NOT redirect to a new location. It will also time out after 10 seconds."}),"\n",(0,a.jsx)(r.AsyncSubmitComplete,{}),"\n",(0,a.jsx)(e.h3,{children:"Filter your data"}),"\n",(0,a.jsxs)(e.p,{children:["By using the ",(0,a.jsx)(e.code,{children:"filterData"})," method from the ",(0,a.jsx)(e.code,{children:"onSubmit"})," event callback you can filter out data that you don't want to send to your server."]}),"\n",(0,a.jsxs)(e.p,{children:["More info about ",(0,a.jsx)(e.code,{children:"filterData"})," can be found in the ",(0,a.jsx)(e.a,{href:"/uilib/extensions/forms/getting-started/#filter-data",children:"Getting Started"})," section."]}),"\n",(0,a.jsx)(e.p,{children:"In this example we filter out all fields that are disabled."}),"\n",(0,a.jsx)(r.FilterData,{}),"\n",(0,a.jsx)(e.h3,{children:"With session storage"}),"\n",(0,a.jsx)(e.p,{children:"Changes you make to the fields are temporarily saved and loaded\nwhen the browser reloads. The data is stored until the session storage is invalidated."}),"\n",(0,a.jsx)(r.SessionStorage,{}),"\n",(0,a.jsx)(e.h3,{children:"Locale and translations"}),"\n",(0,a.jsx)(r.Locale,{}),"\n",(0,a.jsx)(e.h3,{children:"Autocomplete (autofill) user data"}),"\n",(0,a.jsx)(r.Autofill,{}),"\n",(0,a.jsx)(e.h3,{children:"Complex async (autosave) example"}),"\n",(0,a.jsxs)(e.p,{children:["This example demonstrates how to use async validation with an async ",(0,a.jsx)(e.code,{children:"onSubmit"})," and async ",(0,a.jsx)(e.code,{children:"onChange"})," event for both the ",(0,a.jsx)(e.code,{children:"Form.Handler"})," and a field itself."]}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsxs)(e.li,{children:["\n",(0,a.jsx)(e.p,{children:"While you write, an async validation request is simulated to check if the input is valid. If it's not, an error message will be shown."}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["\n",(0,a.jsx)(e.p,{children:"During validation, only the relevant value will be evaluated. This means, when the delayed validation is done, and the value has changed, the validation result will be omitted."}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["\n",(0,a.jsxs)(e.p,{children:["You can press enter to submit the form while you write. But only a string of ",(0,a.jsx)(e.code,{children:"valid"})," will be accepted to emit the form ",(0,a.jsx)(e.code,{children:"onSubmit"})," and ",(0,a.jsx)(e.code,{children:"onChange"}),"."]}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["\n",(0,a.jsx)(e.p,{children:'You can start writing, wait a second or two and remove the whole text again and blur the field. The async validation return will be omitted and the "required" error message will be shown.'}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["\n",(0,a.jsx)(e.p,{children:"It also shows some status messages after the validation and submit requests are done."}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["\n",(0,a.jsxs)(e.p,{children:["This example does not include an async ",(0,a.jsx)(e.code,{children:"onBlurValidator"})," – but it's possible to add one into the mix as well."]}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["\n",(0,a.jsxs)(e.p,{children:["To access the ",(0,a.jsx)(e.code,{children:"date"}),' "in sync" – you can use the ',(0,a.jsx)(e.a,{href:"/uilib/extensions/forms/Form/useData/",children:"useData"})," hook."]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(r.AsyncChangeAndValidation,{})]})}function s(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,o.ah)(),n.components);return e?(0,a.jsx)(e,Object.assign({},n,{children:(0,a.jsx)(i,n)})):i(n)}},94012:function(n,e,t){t.r(e),t.d(e,{AsyncChangeAndValidation:function(){return c},AsyncSubmit:function(){return l},AsyncSubmitComplete:function(){return d},Autofill:function(){return m},FilterData:function(){return p},Locale:function(){return h},SessionStorage:function(){return u}});var a=t(19459),o=t(37419),r=t(52750),i=t(34674),s=t(52322);const l=()=>(0,s.jsx)(a.Z,{children:"<Form.Handler onSubmit={async (data) => console.log('onSubmit', data)}>\n  <Card stack>\n    <Field.Email path=\"/email\" />\n    <Form.ButtonRow>\n      <Form.SubmitButton />\n    </Form.ButtonRow>\n  </Card>\n</Form.Handler>\n"}),d=()=>(0,s.jsx)(a.Z,{children:"<Form.Handler\n  data={{\n    myField: 'Some value',\n  }}\n  onSubmit={async (data) => {\n    console.log('onSubmit', data)\n\n    // Wait for 2 seconds\n    await new Promise((resolve) => setTimeout(resolve, 2000))\n\n    // e.g. go to new location\n\n    // Optionally, you can return e.g. the \"pending\" status with an additional info\n    return {\n      info: 'Redirecting to a new location',\n      // Force the form to stay in pending state\n      status: 'pending',\n    }\n  }}\n  asyncSubmitTimeout={10000}\n>\n  <Flex.Stack>\n    <Form.MainHeading>Heading</Form.MainHeading>\n    <Card>\n      <Value.String label=\"Summary\" path=\"/myField\" />\n    </Card>\n    <Form.ButtonRow>\n      <Form.SubmitButton />\n    </Form.ButtonRow>\n  </Flex.Stack>\n</Form.Handler>\n"}),c=()=>(0,s.jsx)(a.Z,{scope:{debounceAsync:r.k,createRequest:i.createRequest,stopIcon:o.Z},noInline:!0,children:"const validator = debounceAsync(async function secondValidator(\n  value: string,\n) {\n  try {\n    const request = createRequest()\n    const wasCanceled = this.addCancelEvent(request.cancel)\n    await request(2000) // Simulate a request\n\n    if (wasCanceled()) {\n      throw new Error('Validation request canceled')\n    }\n  } catch (error) {\n    return error\n  }\n  if (value !== 'valid') {\n    return new Error('Custom error with invalid value: ' + value) // Show this message\n  }\n})\n\nconst cancelRequest = () => {\n  validator.cancel()\n}\nconst onSubmit = async (data) => {\n  console.log('onSubmit', data)\n\n  // Wait for 2 seconds\n  await new Promise((resolve) => setTimeout(resolve, 2000))\n\n  // For demo purposes, we show a message\n  return {\n    info: 'Message from onSubmit return',\n  }\n}\nconst onChangeForm = async (data) => {\n  console.log('onChangeForm', data)\n\n  // Wait for 2 seconds\n  await new Promise((resolve) => setTimeout(resolve, 2000))\n\n  // For demo purposes, we show a message\n  return {\n    warning: 'Warning message',\n  }\n}\nconst onChangeField = async (data) => {\n  console.log('onChangeField', data)\n\n  // Wait for 2 seconds\n  await new Promise((resolve) => setTimeout(resolve, 2000))\n\n  // For demo purposes, we show a message\n  return {\n    info: 'Info message',\n  }\n}\nconst MyForm = () => {\n  const { data } = Form.useData('unique-id')\n  console.log('data', data)\n  return (\n    <Form.Handler\n      id=\"unique-id\"\n      onSubmit={onSubmit}\n      onChange={onChangeForm}\n    >\n      <Flex.Stack>\n        <Field.String\n          label='Type \"valid\" to validate the field'\n          path=\"/myField\"\n          required\n          validator={validator}\n          onChange={onChangeField}\n          autoComplete=\"off\"\n        />\n        <Form.ButtonRow>\n          <Form.SubmitButton text=\"Save\" />\n          <Button\n            text=\"Stop async operations\"\n            variant=\"tertiary\"\n            icon={stopIcon}\n            icon_position=\"left\"\n            disabled={false}\n            onClick={cancelRequest}\n          />\n        </Form.ButtonRow>\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n"}),u=()=>(0,s.jsx)(a.Z,{children:'<Form.Handler\n  onSubmit={(data, { resetForm, clearData }) => {\n    console.log(\'onSubmit\', data)\n\n    // Docs: https://eufemia.dnb.no/uilib/extensions/forms/DataContext/Provider/events/#onsubmit-parameters\n    resetForm()\n    clearData()\n  }}\n  sessionStorageId="session-key"\n>\n  <Card stack>\n    <Field.String label="Name" path="/name" />\n    <Field.Email path="/email" />\n    <Form.ButtonRow>\n      <Form.SubmitButton />\n    </Form.ButtonRow>\n  </Card>\n</Form.Handler>\n'}),m=()=>(0,s.jsx)(a.Z,{children:'<Form.Handler\n  onSubmit={(data) => console.log(\'onSubmit\', data)}\n  autoComplete\n>\n  <Flex.Stack>\n    <Form.MainHeading>Delivery address</Form.MainHeading>\n\n    <Card stack>\n      <Form.SubHeading>Your name</Form.SubHeading>\n\n      <Field.Name.First path="/firstName" required />\n      <Field.Name.Last path="/lastName" required />\n    </Card>\n\n    <Card stack>\n      <Form.SubHeading>Your address</Form.SubHeading>\n\n      <Field.Composition width="large">\n        <Field.String\n          label="Street"\n          width="stretch"\n          path="/streetName"\n          required\n        />\n        <Field.Number\n          label="Nr."\n          width="small"\n          path="/streetNr"\n          required\n        />\n      </Field.Composition>\n\n      <Field.PostalCodeAndCity\n        postalCode={{\n          required: true,\n          path: \'/postalCode\',\n        }}\n        city={{\n          required: true,\n          path: \'/city\',\n        }}\n      />\n    </Card>\n\n    <Card stack>\n      <P>More information about this form.</P>\n      <Form.ButtonRow>\n        <Form.SubmitButton />\n      </Form.ButtonRow>\n    </Card>\n  </Flex.Stack>\n</Form.Handler>\n'}),h=()=>(0,s.jsx)(a.Z,{noInline:!0,children:"const myTranslations = {\n  'nb-NO': {\n    PhoneNumber: {\n      label: 'Egendefinert 🚀',\n    },\n  },\n  'en-GB': {\n    PhoneNumber: {\n      label: 'Custom 🚀',\n    },\n  },\n}\nconst MyForm = () => {\n  const { data } = Form.useData('my-form', {\n    locale: 'en-GB',\n  })\n  return (\n    <Form.Handler\n      id=\"my-form\"\n      locale={data?.locale}\n      translations={myTranslations}\n    >\n      <Card stack>\n        <Field.PhoneNumber />\n\n        <Field.Selection\n          path=\"/locale\"\n          variant=\"button\"\n          optionsLayout=\"horizontal\"\n        >\n          <Field.Option value=\"nb-NO\">Norsk</Field.Option>\n          <Field.Option value=\"en-GB\">English</Field.Option>\n        </Field.Selection>\n      </Card>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n"}),p=()=>(0,s.jsx)(a.Z,{scope:{replaceUndefinedValues:F},noInline:!0,children:'const id = \'my-form\'\nconst filterDataHandler = ({ props }) => !props.disabled\nconst MyForm = () => {\n  const { data } = Form.useData(id, {\n    disabled: false,\n    myField: \'Value\',\n  })\n  return (\n    <Form.Handler\n      id={id}\n      onSubmit={(data, { filterData }) => {\n        console.log(\'onSubmit\', filterData(filterDataHandler))\n      }}\n    >\n      <Flex.Stack>\n        <Field.Boolean label="Disabled" path="/disabled" />\n        <Field.String\n          label="My Field"\n          path="/myField"\n          disabled={data.disabled}\n        />\n        <Form.ButtonRow>\n          <Form.SubmitButton />\n        </Form.ButtonRow>\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nconst Output = () => {\n  const { filterData } = Form.useData(id)\n  const { hasErrors } = Form.useError(id)\n  return (\n    <Section\n      top\n      innerSpace\n      backgroundColor="sand-yellow"\n      breakout={false}\n      element="output"\n    >\n      hasErrors: {JSON.stringify(hasErrors(), null, 2)}\n      <pre>\n        {JSON.stringify(\n          replaceUndefinedValues(filterData(filterDataHandler)),\n          null,\n          2,\n        )}\n      </pre>\n    </Section>\n  )\n}\nrender(\n  <>\n    <MyForm />\n    <Output />\n  </>,\n)\n'});function F(n,e){return void 0===e&&(e=null),void 0===n?e:"object"==typeof n&&n!==e?{...n,...Object.fromEntries(Object.entries(n).map((n=>{let[e,t]=n;return[e,F(t)]})))}:n}},34674:function(n,e,t){t.r(e),t.d(e,{AsyncChangeBehavior:function(){return l},AsyncSubmitBehavior:function(){return s},Default:function(){return i},WithinOtherComponents:function(){return c},createRequest:function(){return d}});var a=t(19459),o=t(52750),r=t(52322);const i=()=>(0,r.jsx)(a.Z,{children:'<Form.SubmitIndicator state="pending" />\n'}),s=()=>(0,r.jsx)(a.Z,{scope:{createRequest:d,debounceAsync:o.k},noInline:!0,children:'const delay = debounceAsync(async function () {\n  try {\n    const request = createRequest()\n    await request(1000) // Simulate a request\n  } catch (error) {\n    return error\n  }\n})\nrender(\n  <Form.Handler onSubmit={delay}>\n    <Card stack>\n      <Field.String path="/myField" label="Short label" />\n      <Form.ButtonRow>\n        <Form.SubmitButton />\n        <Button variant="tertiary">Cancel</Button>\n      </Form.ButtonRow>\n    </Card>\n  </Form.Handler>,\n)\n'}),l=()=>(0,r.jsx)(a.Z,{scope:{createRequest:d,debounceAsync:o.k},noInline:!0,children:'const delay = debounceAsync(async function () {\n  try {\n    const request = createRequest()\n    await request(1000) // Simulate a request\n  } catch (error) {\n    return error\n  }\n})\nrender(\n  <Form.Handler onSubmit={delay} onChange={delay}>\n    <Card stack>\n      <Field.String\n        path="/myField1"\n        label="Label (with async validation)"\n        placeholder="Write something ..."\n        validator={delay}\n      />\n      <FieldBlock width="medium">\n        <Field.String\n          path="/myField2"\n          width="stretch"\n          label="This is a long label"\n        />\n      </FieldBlock>\n      <Form.ButtonRow>\n        <Form.SubmitButton />\n        <Button variant="tertiary">Cancel</Button>\n      </Form.ButtonRow>\n    </Card>\n  </Form.Handler>,\n)\n'}),d=()=>{let n,e;const t=t=>new Promise((a=>{e=a,n=setTimeout((()=>{a({hasError:!1})}),t)}));return t.cancel=()=>{var t;null===(t=e)||void 0===t||t({hasError:!0}),clearTimeout(n),n=null},t},c=()=>(0,r.jsx)(a.Z,{children:'<Form.Handler>\n  <Flex.Horizontal align="center">\n    <Form.SubmitButton showIndicator />\n    <Button variant="secondary" icon="chevron_right">\n      Secondary\n      <Form.SubmitIndicator state="pending" />\n    </Button>\n    <Button variant="tertiary">\n      Tertiary\n      <Form.SubmitIndicator state="pending" />\n    </Button>\n    <FormLabel>\n      Label\n      <Form.SubmitIndicator state="pending" />\n    </FormLabel>\n  </Flex.Horizontal>\n</Form.Handler>\n'})},37419:function(n,e,t){var a=t(52322);e.Z=n=>(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:16,height:16,fill:"none",viewBox:"0 0 16 16",...n,children:(0,a.jsx)("path",{stroke:"#000",strokeWidth:1.5,d:"M12.95 3.05a7 7 0 0 0-9.9 9.9m9.9-9.9a7 7 0 1 1-9.9 9.9m9.9-9.9-9.9 9.9"})})}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-form-handler-demos-mdx-26fda01d7a3271631360.js.map