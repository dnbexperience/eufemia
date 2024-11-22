"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[45868],{94012:function(n,e,t){t.r(e),t.d(e,{AsyncChangeAndValidation:function(){return m},AsyncSubmit:function(){return d},AsyncSubmitComplete:function(){return c},Autofill:function(){return b},FilterData:function(){return f},Locale:function(){return p},RequiredAndOptionalFields:function(){return u},SessionStorage:function(){return F},TransformData:function(){return g},VisibleData:function(){return h}});t(2784);var o=t(46832),r=t(4902),a=t(37419),i=t(52750),l=t(34674),s=t(52322);const u=()=>(0,s.jsx)(o.Z,{"data-visual-test":"required-and-optional-fields",children:'<Form.Handler required>\n  <Form.Card>\n    <Field.Email path="/email" required={false} />\n    <Field.String\n      path="/custom"\n      label="Label"\n      labelDescription="\nLabel description"\n      required={false}\n    />\n    <Field.Currency path="/amount" label="Amount" />\n    <Form.SubmitButton />\n  </Form.Card>\n</Form.Handler>\n'}),d=()=>(0,s.jsx)(o.Z,{children:"<Form.Handler onSubmit={async (data) => console.log('onSubmit', data)}>\n  <Form.Card>\n    <Field.Email path=\"/email\" />\n    <Form.ButtonRow>\n      <Form.SubmitButton />\n    </Form.ButtonRow>\n  </Form.Card>\n</Form.Handler>\n"}),c=()=>(0,s.jsx)(o.Z,{children:"<Form.Handler\n  data={{\n    myField: 'Some value',\n  }}\n  onSubmit={async (data) => {\n    console.log('onSubmit', data)\n\n    // Wait for 2 seconds\n    await new Promise((resolve) => setTimeout(resolve, 2000))\n\n    // e.g. go to new location\n\n    // Optionally, you can return e.g. the \"pending\" status with an additional info\n    return {\n      info: 'Redirecting to a new location',\n      // Force the form to stay in pending state\n      status: 'pending',\n    }\n  }}\n  asyncSubmitTimeout={10000}\n>\n  <Flex.Stack>\n    <Form.MainHeading>Heading</Form.MainHeading>\n    <Form.Card>\n      <Value.String label=\"Summary\" path=\"/myField\" />\n    </Form.Card>\n    <Form.ButtonRow>\n      <Form.SubmitButton />\n    </Form.ButtonRow>\n  </Flex.Stack>\n</Form.Handler>\n"}),m=()=>(0,s.jsx)(o.Z,{scope:{debounceAsync:i.k,createRequest:l.createRequest,stopIcon:a.Z},noInline:!0,children:"const validator = debounceAsync(async function secondValidator(\n  value: string,\n) {\n  try {\n    const request = createRequest()\n    const wasCanceled = this.addCancelEvent(request.cancel)\n    await request(2000) // Simulate a request\n\n    if (wasCanceled()) {\n      throw new Error('Validation request canceled')\n    }\n  } catch (error) {\n    return error\n  }\n  if (value !== 'valid') {\n    return new Error('Custom error with invalid value: ' + value) // Show this message\n  }\n})\n\nconst cancelRequest = () => {\n  validator.cancel()\n}\nconst onSubmit = async (data) => {\n  console.log('onSubmit', data)\n\n  // Wait for 2 seconds\n  await new Promise((resolve) => setTimeout(resolve, 2000))\n\n  // For demo purposes, we show a message\n  return {\n    info: 'Message from onSubmit return',\n  }\n}\nconst onChangeForm = async (data) => {\n  console.log('onChangeForm', data)\n\n  // Wait for 2 seconds\n  await new Promise((resolve) => setTimeout(resolve, 2000))\n\n  // For demo purposes, we show a message\n  return {\n    warning: 'Warning message',\n  }\n}\nconst onChangeField = async (data) => {\n  console.log('onChangeField', data)\n\n  // Wait for 2 seconds\n  await new Promise((resolve) => setTimeout(resolve, 2000))\n\n  // For demo purposes, we show a message\n  return {\n    info: 'Info message',\n  }\n}\nconst MyForm = () => {\n  const { data } = Form.useData('unique-id')\n  console.log('data', data)\n  return (\n    <Form.Handler\n      id=\"unique-id\"\n      onSubmit={onSubmit}\n      onChange={onChangeForm}\n    >\n      <Flex.Stack>\n        <Field.String\n          label='Type \"valid\" to validate the field'\n          path=\"/myField\"\n          required\n          onChangeValidator={validator}\n          onChange={onChangeField}\n          autoComplete=\"off\"\n        />\n        <Form.ButtonRow>\n          <Form.SubmitButton text=\"Save\" />\n          <Button\n            text=\"Stop async operations\"\n            variant=\"tertiary\"\n            icon={stopIcon}\n            icon_position=\"left\"\n            disabled={false}\n            onClick={cancelRequest}\n          />\n        </Form.ButtonRow>\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n"}),F=()=>(0,s.jsx)(o.Z,{children:'<Form.Handler\n  onSubmit={(data, { resetForm, clearData }) => {\n    console.log(\'onSubmit\', data)\n\n    // Docs: https://eufemia.dnb.no/uilib/extensions/forms/DataContext/Provider/events/#onsubmit-parameters\n    resetForm()\n    clearData()\n  }}\n  sessionStorageId="session-key"\n>\n  <Form.Card>\n    <Field.String label="Name" path="/name" />\n    <Field.Email path="/email" />\n    <Form.ButtonRow>\n      <Form.SubmitButton />\n    </Form.ButtonRow>\n  </Form.Card>\n</Form.Handler>\n'}),b=()=>(0,s.jsx)(o.Z,{children:'<Form.Handler\n  onSubmit={(data) => console.log(\'onSubmit\', data)}\n  autoComplete\n>\n  <Flex.Stack>\n    <Form.MainHeading>Delivery address</Form.MainHeading>\n\n    <Form.Card>\n      <Form.SubHeading>Your name</Form.SubHeading>\n\n      <Field.Name.First path="/firstName" required />\n      <Field.Name.Last path="/lastName" required />\n    </Form.Card>\n\n    <Form.Card>\n      <Form.SubHeading>Your address</Form.SubHeading>\n\n      <Field.Composition width="large">\n        <Field.String\n          label="Street"\n          width="stretch"\n          path="/streetName"\n          required\n        />\n        <Field.Number\n          label="Nr."\n          width="small"\n          path="/streetNr"\n          required\n        />\n      </Field.Composition>\n\n      <Field.PostalCodeAndCity\n        postalCode={{\n          required: true,\n          path: \'/postalCode\',\n        }}\n        city={{\n          required: true,\n          path: \'/city\',\n        }}\n      />\n    </Form.Card>\n\n    <Form.Card>\n      <P>More information about this form.</P>\n      <Form.ButtonRow>\n        <Form.SubmitButton />\n      </Form.ButtonRow>\n    </Form.Card>\n  </Flex.Stack>\n</Form.Handler>\n'}),p=()=>(0,s.jsx)(o.Z,{noInline:!0,children:"const myTranslations = {\n  'nb-NO': {\n    PhoneNumber: {\n      label: 'Egendefinert 🚀',\n    },\n  },\n  'en-GB': {\n    PhoneNumber: {\n      label: 'Custom 🚀',\n    },\n  },\n}\nconst MyForm = () => {\n  const { data } = Form.useData('my-form', {\n    locale: 'en-GB',\n  })\n  return (\n    <Form.Handler\n      id=\"my-form\"\n      locale={data?.locale}\n      translations={myTranslations}\n    >\n      <Form.Card>\n        <Field.PhoneNumber />\n\n        <Field.Selection\n          path=\"/locale\"\n          variant=\"button\"\n          optionsLayout=\"horizontal\"\n        >\n          <Field.Option value=\"nb-NO\">Norsk</Field.Option>\n          <Field.Option value=\"en-GB\">English</Field.Option>\n        </Field.Selection>\n      </Form.Card>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n"}),h=()=>(0,s.jsx)(o.Z,{children:'<Form.Handler\n  defaultData={{\n    isVisible: true,\n  }}\n  onSubmit={(data, { reduceToVisibleFields }) => {\n    const myData = reduceToVisibleFields(data, {\n      removePaths: [\'/isVisible\'],\n    })\n    console.log(\'Result of reduceToVisibleFields: \', myData)\n  }}\n>\n  <Flex.Stack>\n    <Field.Boolean\n      label="Show radio buttons"\n      variant="button"\n      path="/isVisible"\n    />\n    <Form.Visibility pathTrue="/isVisible" animate>\n      <Field.Selection\n        label="Radio buttons"\n        variant="radio"\n        path="/myValue"\n        defaultValue="foo"\n      >\n        <Field.Option value="foo" title="Foo" />\n        <Field.Option value="bar" title="Bar" />\n      </Field.Selection>\n    </Form.Visibility>\n  </Flex.Stack>\n</Form.Handler>\n'}),f=()=>(0,s.jsx)(o.Z,{scope:{Tools:r},noInline:!0,children:'const id = \'my-form\'\nconst filterDataHandler = ({ props }) => !props.disabled\nconst MyForm = () => {\n  const { data } = Form.useData(id, {\n    disabled: false,\n    myField: \'Value\',\n  })\n  return (\n    <Form.Handler\n      id={id}\n      onSubmit={(data, { filterData }) => {\n        console.log(\'onSubmit\', filterData(filterDataHandler))\n      }}\n    >\n      <Flex.Stack>\n        <Field.Boolean label="Disabled" path="/disabled" />\n        <Field.String\n          label="My Field"\n          path="/myField"\n          disabled={data.disabled}\n        />\n        <Form.ButtonRow>\n          <Form.SubmitButton />\n        </Form.ButtonRow>\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nconst Output = () => {\n  const { filterData } = Form.useData(id)\n  const { hasErrors } = Form.useValidation(id)\n  return (\n    <>\n      <Tools.Log top data={hasErrors()} label="hasErrors:" />\n      <Tools.Log top data={filterData(filterDataHandler)} />\n    </>\n  )\n}\nrender(\n  <>\n    <MyForm />\n    <Output />\n  </>,\n)\n'}),g=()=>(0,s.jsx)(o.Z,{scope:{Tools:r},noInline:!0,children:'const MyForm = () => {\n  const [submitData, setSubmitData] = React.useState({})\n  const onSubmit = (data, { transformData }) => {\n    const transformedData = transformData(\n      data,\n      ({ value, displayValue, label }) => {\n        return {\n          value,\n          displayValue,\n          label,\n        }\n      },\n    )\n    setSubmitData(transformedData)\n    console.log(\'onSubmit\', transformedData)\n  }\n  return (\n    <Form.Handler onSubmit={onSubmit}>\n      <Flex.Stack>\n        <Field.String\n          label="Foo label"\n          path="/myString"\n          defaultValue="foo"\n        />\n\n        <Field.Selection\n          label="Bar label"\n          path="/mySelection"\n          defaultValue="bar"\n          variant="dropdown"\n        >\n          <Field.Option value="foo" title="Foo Value" />\n          <Field.Option value="bar" title="Bar Value" />\n        </Field.Selection>\n\n        <Field.ArraySelection\n          label="Bar label"\n          path="/myArraySelection"\n          defaultValue={[\'bar\']}\n          variant="checkbox"\n        >\n          <Field.Option value="foo" title="Foo Value" />\n          <Field.Option value="bar" title="Bar Value" />\n        </Field.ArraySelection>\n\n        <Form.SubmitButton />\n\n        <Tools.Log\n          label="Submit Data (press submit to update)"\n          data={submitData}\n        />\n        <Tools.Log label="Data Context" />\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'})},34674:function(n,e,t){t.r(e),t.d(e,{AsyncChangeBehavior:function(){return s},AsyncSubmitBehavior:function(){return l},Default:function(){return i},WithinOtherComponents:function(){return d},createRequest:function(){return u}});var o=t(46832),r=t(52750),a=t(52322);const i=()=>(0,a.jsx)(o.Z,{children:'<Form.SubmitIndicator state="pending" />\n'}),l=()=>(0,a.jsx)(o.Z,{scope:{createRequest:u,debounceAsync:r.k},noInline:!0,children:'const delay = debounceAsync(async function () {\n  try {\n    const request = createRequest()\n    await request(1000) // Simulate a request\n  } catch (error) {\n    return error\n  }\n})\nrender(\n  <Form.Handler onSubmit={delay}>\n    <Form.Card>\n      <Field.String path="/myField" label="Short label" />\n      <Form.ButtonRow>\n        <Form.SubmitButton />\n        <Button variant="tertiary">Cancel</Button>\n      </Form.ButtonRow>\n    </Form.Card>\n  </Form.Handler>,\n)\n'}),s=()=>(0,a.jsx)(o.Z,{scope:{createRequest:u,debounceAsync:r.k},noInline:!0,children:'const delay = debounceAsync(async function () {\n  try {\n    const request = createRequest()\n    await request(1000) // Simulate a request\n  } catch (error) {\n    return error\n  }\n})\nrender(\n  <Form.Handler onSubmit={delay} onChange={delay}>\n    <Form.Card>\n      <Field.String\n        path="/myField1"\n        label="Label (with async validation)"\n        placeholder="Write something ..."\n        onChangeValidator={delay}\n      />\n      <FieldBlock width="medium">\n        <Field.String\n          path="/myField2"\n          width="stretch"\n          label="This is a long label"\n        />\n      </FieldBlock>\n      <Form.ButtonRow>\n        <Form.SubmitButton />\n        <Button variant="tertiary">Cancel</Button>\n      </Form.ButtonRow>\n    </Form.Card>\n  </Form.Handler>,\n)\n'}),u=()=>{let n,e;const t=t=>new Promise((o=>{e=o,n=setTimeout((()=>{o({hasError:!1})}),t)}));return t.cancel=()=>{var t;null===(t=e)||void 0===t||t({hasError:!0}),clearTimeout(n),n=null},t},d=()=>(0,a.jsx)(o.Z,{children:'<Form.Handler>\n  <Flex.Horizontal align="center">\n    <Form.SubmitButton showIndicator />\n    <Button variant="secondary" icon="chevron_right">\n      Secondary\n      <Form.SubmitIndicator state="pending" />\n    </Button>\n    <Button variant="tertiary">\n      Tertiary\n      <Form.SubmitIndicator state="pending" />\n    </Button>\n    <FormLabel>\n      Label\n      <Form.SubmitIndicator state="pending" />\n    </FormLabel>\n  </Flex.Horizontal>\n</Form.Handler>\n'})},38734:function(n,e,t){t.d(e,{Z:function(){return s}});var o=t(84616),r=t(2784),a=t(2394),i=t(21068);const l=["minLength","maxLength","pattern","description","min","max","multipleOf","exclusiveMinimum","exclusiveMaximum"];function s(n){const{generateRef:e,filterData:t,log:s,children:u}=n||{},{fieldPropsRef:d,valuePropsRef:c,data:m,hasContext:F}=(0,r.useContext)(i.Z),b=(0,r.useRef)({});b.current=m;const p=(0,r.useCallback)((()=>{const n=Object.entries((null==d?void 0:d.current)||{}).reduce(((n,e)=>{let[r,i]=e;if(r.startsWith("/")){const e=r.substring(1),s=e.split("/"),u=s.length,d={type:i.valueType||"string"};for(const n of l)i[n]&&(d[n]=i[n]);if(u>1){const e=[""];for(const r of s){e.push(r);const l=e.join("/properties/"),u=e.length-1===s.length,c=a.e$(n,l)?a.U2(n,l):null,m=u?d:c;if(u)!1!==(null==t?void 0:t[l])&&a.t8(n,l,m);else{const e={type:"object",...c},r=[];i.required&&r.push(s.at(-1)),null!=c&&c.required&&r.push.apply(r,(0,o.Z)(c.required)),r.length>0&&(e.required=r),!1!==(null==t?void 0:t[l])&&a.t8(n,l,e)}}}else!1!==(null==t?void 0:t[r])&&a.t8(n.properties,r,d),i.required&&n.required.push(e)}return n}),{type:"object",properties:{},required:[]}),e=Object.entries((null==d?void 0:d.current)||{}).reduce(((n,e)=>{let[t,o]=e;if(t.startsWith("/")){const e={};for(const n in o)void 0!==o[n]&&"function"!=typeof o[n]&&(e[n]=o[n]);a.t8(n,t,e)}return n}),{}),r=Object.entries((null==c?void 0:c.current)||{}).reduce(((n,e)=>{let[t,o]=e;if(t.startsWith("/")){const e={};for(const n in o)void 0!==o[n]&&"function"!=typeof o[n]&&(e[n]=o[n]);a.t8(n,t,e)}return n}),{});return 0===n.required.length&&delete n.required,{schema:n,data:b.current,propsOfFields:e,propsOfValues:r}}),[d,t,c]);return F&&(s&&console.log(p().schema),e&&(e.current=p)),u}},10454:function(n,e,t){t.d(e,{Z:function(){return i}});var o=t(2784),r=t(2394),a=t(21068);function i(n){const{log:e,generateRef:t,filterData:i,children:l}=n||{},{fieldPropsRef:s,valuePropsRef:u,data:d,hasContext:c}=(0,o.useContext)(a.Z);(0,o.useRef)({}).current=d;const m=(0,o.useCallback)((()=>{const n=Object.entries((null==s?void 0:s.current)||{}).reduce(((n,e)=>{let[t,a]=e;if(t.startsWith("/")){const e={};for(const n in a)void 0===a[n]||"function"==typeof a[n]||(0,o.isValidElement)(a[n])||(e[n]=a[n]);!1!==(null==i?void 0:i[t])&&r.t8(n,t,e)}return n}),{}),e=Object.entries((null==u?void 0:u.current)||{}).reduce(((n,e)=>{let[t,a]=e;if(t.startsWith("/")){const e={};for(const n in a)void 0===a[n]||"function"==typeof a[n]||(0,o.isValidElement)(a[n])||(e[n]=a[n]);!1!==(null==i?void 0:i[t])&&r.t8(n,t,e)}return n}),{});return{propsOfFields:n,propsOfValues:e}}),[s,i,u]);return c&&(e&&console.log(m()),t&&(t.current=m)),l}},90584:function(n,e,t){var o=t(2784),r=t(21068),a=t(4408),i=t(9149),l=t(52322);function s(n){let{placeholder:e,label:t,data:s,...d}=n;const{data:c}=(0,o.useContext)(r.Z);return(0,l.jsxs)(a.Z,{element:"output",backgroundColor:"sand-yellow",style:{maxWidth:"80vw"},innerSpace:!0,...d,children:[t&&(0,l.jsx)(i.Z,{bottom:!0,children:(0,l.jsx)("b",{children:t})}),(0,l.jsxs)("pre",{children:[e&&0===Object.keys((null!=s?s:c)||{}).length?e:JSON.stringify(u(null!=s?s:c),null,2)," "]})]})}function u(n,e){return void 0===e&&(e="undefined"),void 0===n?e:n&&"object"==typeof n&&n!==e?{...n,...Object.fromEntries(Object.entries(n).map((n=>{let[e,t]=n;return[e,u(t)]})))}:n}s._supportsSpacingProps=!0,e.Z=s},4902:function(n,e,t){t.r(e),t.d(e,{GenerateSchema:function(){return o.Z},ListAllProps:function(){return r.Z},Log:function(){return a.Z}});var o=t(38734),r=t(10454),a=t(90584)},37419:function(n,e,t){var o=t(52322);e.Z=n=>(0,o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:16,height:16,fill:"none",viewBox:"0 0 16 16",...n,children:(0,o.jsx)("path",{stroke:"#000",strokeWidth:1.5,d:"M12.95 3.05a7 7 0 0 0-9.9 9.9m9.9-9.9a7 7 0 1 1-9.9 9.9m9.9-9.9-9.9 9.9"})})}}]);
//# sourceMappingURL=a7b7cf8a36850e832b48ef9f68d16f069f923dcf-1f145a88816619123abc.js.map