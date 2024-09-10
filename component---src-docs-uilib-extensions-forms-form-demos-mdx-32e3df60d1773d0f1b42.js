"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[54181],{22118:function(n,e,t){t.r(e);var o=t(52322),r=t(45392),a=t(94012);function i(n){const e=Object.assign({h2:"h2",h3:"h3"},(0,r.ah)(),n.components);return a||s("Examples",!1),a.AsyncSubmit||s("Examples.AsyncSubmit",!0),a.AsyncSubmitComplete||s("Examples.AsyncSubmitComplete",!0),a.FilterData||s("Examples.FilterData",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.h2,{children:"Demos"}),"\n",(0,o.jsx)(e.h3,{children:"In combination with a SubmitButton"}),"\n",(0,o.jsx)(a.AsyncSubmit,{}),"\n",(0,o.jsx)(e.h3,{children:"New location after async submit"}),"\n",(0,o.jsx)(a.AsyncSubmitComplete,{}),"\n",(0,o.jsx)(e.h3,{children:"Filter your data"}),"\n",(0,o.jsx)(a.FilterData,{})]})}function s(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,o.jsx)(e,Object.assign({},n,{children:(0,o.jsx)(i,n)})):i(n)}},94012:function(n,e,t){t.r(e),t.d(e,{AsyncChangeAndValidation:function(){return u},AsyncSubmit:function(){return l},AsyncSubmitComplete:function(){return d},Autofill:function(){return m},FilterData:function(){return h},Locale:function(){return F},SessionStorage:function(){return c}});var o=t(19459),r=t(37419),a=t(52750),i=t(34674),s=t(52322);const l=()=>(0,s.jsx)(o.Z,{children:"<Form.Handler onSubmit={async (data) => console.log('onSubmit', data)}>\n  <Card stack>\n    <Field.Email path=\"/email\" />\n    <Form.ButtonRow>\n      <Form.SubmitButton />\n    </Form.ButtonRow>\n  </Card>\n</Form.Handler>\n"}),d=()=>(0,s.jsx)(o.Z,{children:"<Form.Handler\n  data={{\n    myField: 'Some value',\n  }}\n  onSubmit={async (data) => {\n    console.log('onSubmit', data)\n\n    // Wait for 2 seconds\n    await new Promise((resolve) => setTimeout(resolve, 2000))\n\n    // e.g. go to new location\n\n    // Optionally, you can return e.g. the \"pending\" status with an additional info\n    return {\n      info: 'Redirecting to a new location',\n      // Force the form to stay in pending state\n      status: 'pending',\n    }\n  }}\n  asyncSubmitTimeout={10000}\n>\n  <Flex.Stack>\n    <Form.MainHeading>Heading</Form.MainHeading>\n    <Card>\n      <Value.String label=\"Summary\" path=\"/myField\" />\n    </Card>\n    <Form.ButtonRow>\n      <Form.SubmitButton />\n    </Form.ButtonRow>\n  </Flex.Stack>\n</Form.Handler>\n"}),u=()=>(0,s.jsx)(o.Z,{scope:{debounceAsync:a.k,createRequest:i.createRequest,stopIcon:r.Z},noInline:!0,children:"const validator = debounceAsync(async function secondValidator(\n  value: string,\n) {\n  try {\n    const request = createRequest()\n    const wasCanceled = this.addCancelEvent(request.cancel)\n    await request(2000) // Simulate a request\n\n    if (wasCanceled()) {\n      throw new Error('Validation request canceled')\n    }\n  } catch (error) {\n    return error\n  }\n  if (value !== 'valid') {\n    return new Error('Custom error with invalid value: ' + value) // Show this message\n  }\n})\n\nconst cancelRequest = () => {\n  validator.cancel()\n}\nconst onSubmit = async (data) => {\n  console.log('onSubmit', data)\n\n  // Wait for 2 seconds\n  await new Promise((resolve) => setTimeout(resolve, 2000))\n\n  // For demo purposes, we show a message\n  return {\n    info: 'Message from onSubmit return',\n  }\n}\nconst onChangeForm = async (data) => {\n  console.log('onChangeForm', data)\n\n  // Wait for 2 seconds\n  await new Promise((resolve) => setTimeout(resolve, 2000))\n\n  // For demo purposes, we show a message\n  return {\n    warning: 'Warning message',\n  }\n}\nconst onChangeField = async (data) => {\n  console.log('onChangeField', data)\n\n  // Wait for 2 seconds\n  await new Promise((resolve) => setTimeout(resolve, 2000))\n\n  // For demo purposes, we show a message\n  return {\n    info: 'Info message',\n  }\n}\nconst MyForm = () => {\n  const { data } = Form.useData('unique-id')\n  console.log('data', data)\n  return (\n    <Form.Handler\n      id=\"unique-id\"\n      onSubmit={onSubmit}\n      onChange={onChangeForm}\n    >\n      <Flex.Stack>\n        <Field.String\n          label='Type \"valid\" to validate the field'\n          path=\"/myField\"\n          required\n          validator={validator}\n          onChange={onChangeField}\n          autoComplete=\"off\"\n        />\n        <Form.ButtonRow>\n          <Form.SubmitButton text=\"Save\" />\n          <Button\n            text=\"Stop async operations\"\n            variant=\"tertiary\"\n            icon={stopIcon}\n            icon_position=\"left\"\n            disabled={false}\n            onClick={cancelRequest}\n          />\n        </Form.ButtonRow>\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n"}),c=()=>(0,s.jsx)(o.Z,{children:'<Form.Handler\n  onSubmit={(data, { resetForm, clearData }) => {\n    console.log(\'onSubmit\', data)\n\n    // Docs: https://eufemia.dnb.no/uilib/extensions/forms/DataContext/Provider/events/#onsubmit-parameters\n    resetForm()\n    clearData()\n  }}\n  sessionStorageId="session-key"\n>\n  <Card stack>\n    <Field.String label="Name" path="/name" />\n    <Field.Email path="/email" />\n    <Form.ButtonRow>\n      <Form.SubmitButton />\n    </Form.ButtonRow>\n  </Card>\n</Form.Handler>\n'}),m=()=>(0,s.jsx)(o.Z,{children:'<Form.Handler\n  onSubmit={(data) => console.log(\'onSubmit\', data)}\n  autoComplete\n>\n  <Flex.Stack>\n    <Form.MainHeading>Delivery address</Form.MainHeading>\n\n    <Card stack>\n      <Form.SubHeading>Your name</Form.SubHeading>\n\n      <Field.Name.First path="/firstName" required />\n      <Field.Name.Last path="/lastName" required />\n    </Card>\n\n    <Card stack>\n      <Form.SubHeading>Your address</Form.SubHeading>\n\n      <Field.Composition width="large">\n        <Field.String\n          label="Street"\n          width="stretch"\n          path="/streetName"\n          required\n        />\n        <Field.Number\n          label="Nr."\n          width="small"\n          path="/streetNr"\n          required\n        />\n      </Field.Composition>\n\n      <Field.PostalCodeAndCity\n        postalCode={{\n          required: true,\n          path: \'/postalCode\',\n        }}\n        city={{\n          required: true,\n          path: \'/city\',\n        }}\n      />\n    </Card>\n\n    <Card stack>\n      <P>More information about this form.</P>\n      <Form.ButtonRow>\n        <Form.SubmitButton />\n      </Form.ButtonRow>\n    </Card>\n  </Flex.Stack>\n</Form.Handler>\n'}),F=()=>(0,s.jsx)(o.Z,{noInline:!0,children:"const myTranslations = {\n  'nb-NO': {\n    PhoneNumber: {\n      label: 'Egendefinert 🚀',\n    },\n  },\n  'en-GB': {\n    PhoneNumber: {\n      label: 'Custom 🚀',\n    },\n  },\n}\nconst MyForm = () => {\n  const { data } = Form.useData('my-form', {\n    locale: 'en-GB',\n  })\n  return (\n    <Form.Handler\n      id=\"my-form\"\n      locale={data?.locale}\n      translations={myTranslations}\n    >\n      <Card stack>\n        <Field.PhoneNumber />\n\n        <Field.Selection\n          path=\"/locale\"\n          variant=\"button\"\n          optionsLayout=\"horizontal\"\n        >\n          <Field.Option value=\"nb-NO\">Norsk</Field.Option>\n          <Field.Option value=\"en-GB\">English</Field.Option>\n        </Field.Selection>\n      </Card>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n"}),h=()=>(0,s.jsx)(o.Z,{scope:{replaceUndefinedValues:b},noInline:!0,children:'const id = \'my-form\'\nconst filterDataHandler = ({ props }) => !props.disabled\nconst MyForm = () => {\n  const { data } = Form.useData(id, {\n    disabled: false,\n    myField: \'Value\',\n  })\n  return (\n    <Form.Handler\n      id={id}\n      onSubmit={(data, { filterData }) => {\n        console.log(\'onSubmit\', filterData(filterDataHandler))\n      }}\n    >\n      <Flex.Stack>\n        <Field.Boolean label="Disabled" path="/disabled" />\n        <Field.String\n          label="My Field"\n          path="/myField"\n          disabled={data.disabled}\n        />\n        <Form.ButtonRow>\n          <Form.SubmitButton />\n        </Form.ButtonRow>\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nconst Output = () => {\n  const { filterData } = Form.useData(id)\n  const { hasErrors } = Form.useError(id)\n  return (\n    <Section\n      top\n      innerSpace\n      backgroundColor="sand-yellow"\n      breakout={false}\n      element="output"\n    >\n      hasErrors: {JSON.stringify(hasErrors(), null, 2)}\n      <pre>\n        {JSON.stringify(\n          replaceUndefinedValues(filterData(filterDataHandler)),\n          null,\n          2,\n        )}\n      </pre>\n    </Section>\n  )\n}\nrender(\n  <>\n    <MyForm />\n    <Output />\n  </>,\n)\n'});function b(n,e){return void 0===e&&(e=null),void 0===n?e:"object"==typeof n&&n!==e?{...n,...Object.fromEntries(Object.entries(n).map((n=>{let[e,t]=n;return[e,b(t)]})))}:n}},34674:function(n,e,t){t.r(e),t.d(e,{AsyncChangeBehavior:function(){return l},AsyncSubmitBehavior:function(){return s},Default:function(){return i},WithinOtherComponents:function(){return u},createRequest:function(){return d}});var o=t(19459),r=t(52750),a=t(52322);const i=()=>(0,a.jsx)(o.Z,{children:'<Form.SubmitIndicator state="pending" />\n'}),s=()=>(0,a.jsx)(o.Z,{scope:{createRequest:d,debounceAsync:r.k},noInline:!0,children:'const delay = debounceAsync(async function () {\n  try {\n    const request = createRequest()\n    await request(1000) // Simulate a request\n  } catch (error) {\n    return error\n  }\n})\nrender(\n  <Form.Handler onSubmit={delay}>\n    <Card stack>\n      <Field.String path="/myField" label="Short label" />\n      <Form.ButtonRow>\n        <Form.SubmitButton />\n        <Button variant="tertiary">Cancel</Button>\n      </Form.ButtonRow>\n    </Card>\n  </Form.Handler>,\n)\n'}),l=()=>(0,a.jsx)(o.Z,{scope:{createRequest:d,debounceAsync:r.k},noInline:!0,children:'const delay = debounceAsync(async function () {\n  try {\n    const request = createRequest()\n    await request(1000) // Simulate a request\n  } catch (error) {\n    return error\n  }\n})\nrender(\n  <Form.Handler onSubmit={delay} onChange={delay}>\n    <Card stack>\n      <Field.String\n        path="/myField1"\n        label="Label (with async validation)"\n        placeholder="Write something ..."\n        validator={delay}\n      />\n      <FieldBlock width="medium">\n        <Field.String\n          path="/myField2"\n          width="stretch"\n          label="This is a long label"\n        />\n      </FieldBlock>\n      <Form.ButtonRow>\n        <Form.SubmitButton />\n        <Button variant="tertiary">Cancel</Button>\n      </Form.ButtonRow>\n    </Card>\n  </Form.Handler>,\n)\n'}),d=()=>{let n,e;const t=t=>new Promise((o=>{e=o,n=setTimeout((()=>{o({hasError:!1})}),t)}));return t.cancel=()=>{var t;null===(t=e)||void 0===t||t({hasError:!0}),clearTimeout(n),n=null},t},u=()=>(0,a.jsx)(o.Z,{children:'<Form.Handler>\n  <Flex.Horizontal align="center">\n    <Form.SubmitButton showIndicator />\n    <Button variant="secondary" icon="chevron_right">\n      Secondary\n      <Form.SubmitIndicator state="pending" />\n    </Button>\n    <Button variant="tertiary">\n      Tertiary\n      <Form.SubmitIndicator state="pending" />\n    </Button>\n    <FormLabel>\n      Label\n      <Form.SubmitIndicator state="pending" />\n    </FormLabel>\n  </Flex.Horizontal>\n</Form.Handler>\n'})},37419:function(n,e,t){var o=t(52322);e.Z=n=>(0,o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:16,height:16,fill:"none",viewBox:"0 0 16 16",...n,children:(0,o.jsx)("path",{stroke:"#000",strokeWidth:1.5,d:"M12.95 3.05a7 7 0 0 0-9.9 9.9m9.9-9.9a7 7 0 1 1-9.9 9.9m9.9-9.9-9.9 9.9"})})}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-form-demos-mdx-32e3df60d1773d0f1b42.js.map