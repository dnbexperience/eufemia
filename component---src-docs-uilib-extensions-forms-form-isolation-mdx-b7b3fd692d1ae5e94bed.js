"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[23590,59587,68279],{80003:function(n,e,t){t.r(e);var o=t(52322),r=t(45392),a=t(75681),i=t(49259);function l(n){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(a.default,{}),"\n",(0,o.jsx)(i.default,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,o.jsx)(e,Object.assign({},n,{children:(0,o.jsx)(l,n)})):l()}},49259:function(n,e,t){t.r(e),t.d(e,{default:function(){return h}});var o={};t.r(o),t.d(o,{CommitHandleRef:function(){return d},InsideSection:function(){return m},TransformCommitData:function(){return c},UsingCommitButton:function(){return s}});var r=t(52322),a=t(45392),i=t(46832),l=t(4902);t(2784);const s=()=>(0,r.jsx)(i.Z,{children:'<Form.Handler\n  onSubmit={(data) => console.log(\'onSubmit\', data)}\n  onChange={(data) => console.log(\'Regular onChange:\', data)}\n>\n  <Flex.Stack>\n    <Form.Isolation\n      onChange={(data) => console.log(\'Isolated onChange:\', data)}\n    >\n      <Flex.Stack>\n        <Field.String required label="Isolated" path="/isolated" />\n        <Form.Isolation.CommitButton text="Commit" />\n      </Flex.Stack>\n    </Form.Isolation>\n\n    <Field.String\n      required\n      label="Committed from isolation"\n      path="/isolated"\n    />\n    <Field.String required label="Outside of isolation" path="/regular" />\n\n    <Form.SubmitButton />\n  </Flex.Stack>\n</Form.Handler>\n'}),d=()=>(0,r.jsx)(i.Z,{scope:{Tools:l},noInline:!0,children:'const MyForm = () => {\n  const commitHandleRef = React.useRef(null)\n  return (\n    <>\n      <Form.Handler\n        bottom="large"\n        data={{\n          contactPersons: [\n            {\n              title: \'Hanne\',\n              value: \'hanne\',\n            },\n          ],\n        }}\n      >\n        <Form.Card>\n          <Form.SubHeading>Ny hovedkontaktperson</Form.SubHeading>\n\n          <HeightAnimation>\n            <Field.Selection variant="radio" dataPath="/contactPersons" />\n          </HeightAnimation>\n\n          <Form.Isolation\n            commitHandleRef={commitHandleRef}\n            transformOnCommit={(isolatedData, handlerData) => {\n              const value = isolatedData.newPerson.title.toLowerCase()\n              const transformedData = {\n                ...handlerData,\n                contactPersons: [\n                  ...handlerData.contactPersons,\n                  {\n                    ...isolatedData.newPerson,\n                    value,\n                  },\n                ],\n              }\n              return transformedData\n            }}\n          >\n            <Flex.Stack>\n              <Form.Section path="/newPerson">\n                <Field.Name.First required path="/title" />\n              </Form.Section>\n            </Flex.Stack>\n          </Form.Isolation>\n          <Tools.Log />\n        </Form.Card>\n      </Form.Handler>\n\n      <button\n        onClick={() => {\n          commitHandleRef.current()\n        }}\n      >\n        Commit from outside of handler\n      </button>\n    </>\n  )\n}\nrender(<MyForm />)\n'}),c=()=>(0,r.jsx)(i.Z,{noInline:!0,children:'const MyForm = () => {\n  return (\n    <Form.Handler\n      onChange={console.log}\n      defaultData={{\n        contactPersons: [\n          {\n            title: \'Hanne\',\n            value: \'hanne\',\n          },\n        ],\n        mySelection: \'hanne\',\n      }}\n    >\n      <Form.Card>\n        <Form.SubHeading>Legg til ny hovedkontaktperson</Form.SubHeading>\n\n        <HeightAnimation>\n          <Field.Selection\n            variant="radio"\n            path="/mySelection"\n            dataPath="/contactPersons"\n          >\n            <Field.Option title="Annen person" value="other" />\n          </Field.Selection>\n        </HeightAnimation>\n\n        <Form.Visibility\n          visibleWhen={{\n            path: \'/mySelection\',\n            hasValue: \'other\',\n          }}\n          animate\n        >\n          <Flex.Stack>\n            <Form.SubHeading>Ny hovedkontaktperson</Form.SubHeading>\n\n            <Form.Isolation\n              transformOnCommit={(isolatedData, handlerData) => {\n                return {\n                  ...handlerData,\n                  contactPersons: [\n                    ...handlerData.contactPersons,\n                    {\n                      ...isolatedData.newPerson,\n                      value: isolatedData.newPerson.title.toLowerCase(),\n                    },\n                  ],\n                }\n              }}\n              onCommit={(data, { clearData }) => {\n                clearData()\n              }}\n            >\n              <Flex.Stack>\n                <Form.Section path="/newPerson">\n                  <Field.Name.First required path="/title" />\n                </Form.Section>\n\n                <Form.Isolation.CommitButton />\n              </Flex.Stack>\n            </Form.Isolation>\n          </Flex.Stack>\n        </Form.Visibility>\n      </Form.Card>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'}),m=()=>(0,r.jsx)(i.Z,{children:'<Form.Handler\n  defaultData={{\n    mySection: {\n      isolated: \'Isolated value defined outside\',\n      regular: \'Outer regular value\',\n    },\n  }}\n  onChange={(data) => {\n    console.log(\'Outer onChange:\', data)\n  }}\n>\n  <Form.Section path="/mySection">\n    <Flex.Stack>\n      <Form.Isolation\n        defaultData={{\n          isolated: \'The real initial "isolated" value\',\n        }}\n        onPathChange={(path, value) => {\n          console.log(\'Isolated onChange:\', path, value)\n        }}\n        onCommit={(data) => console.log(\'onCommit:\', data)}\n      >\n        <Flex.Stack>\n          <Field.String label="Isolated" path="/isolated" required />\n          <Form.Isolation.CommitButton />\n        </Flex.Stack>\n      </Form.Isolation>\n\n      <Field.String label="Synced" path="/isolated" />\n      <Field.String label="Regular" path="/regular" required />\n\n      <Form.SubmitButton />\n    </Flex.Stack>\n  </Form.Section>\n</Form.Handler>\n'});function u(n){const e=Object.assign({h2:"h2",h3:"h3"},(0,a.ah)(),n.components);return o||f("Examples",!1),d||f("Examples.CommitHandleRef",!0),m||f("Examples.InsideSection",!0),c||f("Examples.TransformCommitData",!0),s||f("Examples.UsingCommitButton",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h2,{children:"Demos"}),"\n",(0,r.jsx)(e.h3,{children:"Transform data on commit"}),"\n",(0,r.jsx)(c,{}),"\n",(0,r.jsx)(e.h3,{children:"Using the CommitButton"}),"\n",(0,r.jsx)(s,{}),"\n",(0,r.jsx)(e.h3,{children:"Using commitHandleRef"}),"\n",(0,r.jsx)(d,{}),"\n",(0,r.jsx)(e.h3,{children:"Inside a section"}),"\n",(0,r.jsx)(m,{})]})}var h=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,a.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(u,n)})):u(n)};function f(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}},75681:function(n,e,t){t.r(e);var o=t(52322),r=t(45392);function a(n){const e=Object.assign({h2:"h2",p:"p",code:"code",a:"a",h3:"h3",ul:"ul",li:"li",pre:"pre"},(0,r.ah)(),n.components);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.h2,{children:"Description"}),"\n",(0,o.jsxs)(e.p,{children:[(0,o.jsx)(e.code,{children:"Form.Isolation"})," lets you isolate parts of your form so data and validations are not shared between the ",(0,o.jsx)(e.code,{children:"Form.Handler"})," until you want to."]}),"\n",(0,o.jsxs)(e.p,{children:["It's a provider that lets you provide a ",(0,o.jsx)(e.code,{children:"schema"})," or ",(0,o.jsx)(e.code,{children:"data"})," very similar to what the ",(0,o.jsx)(e.a,{href:"/uilib/extensions/forms/Form/Handler/",children:"Form.Handler"})," component does."]}),"\n",(0,o.jsx)(e.h3,{children:"Good to know"}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["It needs to be used inside of a ",(0,o.jsx)(e.code,{children:"Form.Handler"})," component."]}),"\n",(0,o.jsxs)(e.li,{children:["All fields inside need to validate successfully before the isolated data can be committed, just like the ",(0,o.jsx)(e.code,{children:"Form.Handler"})," does before submitting."]}),"\n",(0,o.jsxs)(e.li,{children:["Input fields are prevented from submitting the form when pressing enter. Pressing enter on input fields will commit the isolated data to the ",(0,o.jsx)(e.code,{children:"Form.Handler"})," context instead."]}),"\n",(0,o.jsxs)(e.li,{children:["You can provide a ",(0,o.jsx)(e.code,{children:"schema"}),", ",(0,o.jsx)(e.code,{children:"data"})," or ",(0,o.jsx)(e.code,{children:"defaultData"})," like you would do with the ",(0,o.jsx)(e.code,{children:"Form.Handler"}),"."]}),"\n",(0,o.jsxs)(e.li,{children:["You can also provide ",(0,o.jsx)(e.code,{children:"data"})," or ",(0,o.jsx)(e.code,{children:"defaultData"})," to the ",(0,o.jsx)(e.code,{children:"Form.Handler"})," component. If not given on the ",(0,o.jsx)(e.code,{children:"Form.Isolation"})," component, this will define the data that will be used for the isolated data."]}),"\n",(0,o.jsxs)(e.li,{children:["Using ",(0,o.jsx)(e.code,{children:"Form.Isolation"})," inside of a ",(0,o.jsx)(e.code,{children:"Form.Section"})," is supported."]}),"\n",(0,o.jsxs)(e.li,{children:[(0,o.jsx)(e.code,{children:"onChange"})," on the ",(0,o.jsx)(e.code,{children:"Form.Handler"})," will be called when the isolated data gets committed."]}),"\n",(0,o.jsxs)(e.li,{children:[(0,o.jsx)(e.code,{children:"onChange"})," on the ",(0,o.jsx)(e.code,{children:"Form.Isolation"})," will be called on every change of the isolated data. Use ",(0,o.jsx)(e.code,{children:"onCommit"})," to get the data that gets committed."]}),"\n"]}),"\n",(0,o.jsx)(e.h2,{children:"Usage"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'import { Form, Field } from \'@dnb/eufemia/extensions/forms\'\n\nexport function MyForm(props) {\n  return (\n    <Form.Handler\n      defaultData={{ isolated: \'Isolated\', regular: \'Regular\' }}\n    >\n      <Form.Isolation>\n        <Field.String label="Isolated" path="/isolated" />\n        <Form.Isolation.CommitButton />\n      </Form.Isolation>\n\n      <Field.String label="Regular" path="/regular" />\n      <Form.SubmitButton />\n    </Form.Handler>\n  )\n}\n'})}),"\n",(0,o.jsx)(e.h2,{children:"Commit the data to the form"}),"\n",(0,o.jsxs)(e.p,{children:["You can either use the ",(0,o.jsx)(e.code,{children:"Form.Isolation.CommitButton"})," or provide a custom ref handler you can use (call) when you want to commit the data to the ",(0,o.jsx)(e.code,{children:"Form.Handler"})," context:"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'import { Form, Field, JSONSchema } from \'@dnb/eufemia/extensions/forms\'\n\nfunction MyForm() {\n  const commitHandleRef = React.useRef<() => void>()\n\n  return (\n    <Form.Handler>\n      <Form.Isolation commitHandleRef={commitHandleRef}>\n        <Field.PhoneNumber path="/phoneNumber" />\n        <Button text="Submit" onClick={commitHandleRef.current} />\n      </Form.Isolation>\n    </Form.Handler>\n  )\n}\n\nrender(<MyForm />)\n'})}),"\n",(0,o.jsx)(e.h2,{children:"Prevent the form from being submitted"}),"\n",(0,o.jsxs)(e.p,{children:["To prevent the ",(0,o.jsx)(e.a,{href:"/uilib/extensions/forms/Form/Handler/",children:"Form.Handler"})," from being submitted when there are fields with errors inside the Isolation, you can use the ",(0,o.jsx)(e.code,{children:"bubbleValidation"})," property."]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:'import { Form, Field } from \'@dnb/eufemia/extensions/forms\'\n\nrender(\n  <Form.Handler>\n    <Form.Isolation bubbleValidation>\n      <Field.String label="Required field" path="/isolated" required />\n      <Form.Isolation.CommitButton />\n    </Form.Isolation>\n  </Form.Handler>,\n)\n'})}),"\n",(0,o.jsx)(e.h2,{children:"Schema support"}),"\n",(0,o.jsxs)(e.p,{children:["You can also use a ",(0,o.jsx)(e.code,{children:"schema"})," to define the properties of the nested fields:"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-tsx",children:"import { Form, Field, JSONSchema } from '@dnb/eufemia/extensions/forms'\n\nconst isolatedSchema: JSONSchema = {\n  type: 'object',\n  properties: {\n    phoneNumber: {\n      type: 'string',\n      pattern: '^[0-9]{10}$',\n    },\n  },\n  required: ['phoneNumber'],\n}\n\nrender(\n  <Form.Handler>\n    <Form.Isolation schema={isolatedSchema}>\n      <Field.PhoneNumber path=\"/phoneNumber\" />\n    </Form.Isolation>\n  </Form.Handler>,\n)\n"})}),"\n",(0,o.jsx)(e.h2,{children:"Clear data from isolated fields"}),"\n",(0,o.jsxs)(e.p,{children:["You can clear the isolation by calling ",(0,o.jsx)(e.code,{children:"Form.clearData"})," with the ",(0,o.jsx)(e.code,{children:"id"})," of the form."]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-jsx",children:"import { Form, Field } from '@dnb/eufemia/extensions/forms'\n\nfunction MyForm() {\n  return (\n    <Form.Handler>\n      <Form.Isolation\n        id=\"my-isolated-data\"\n        onCommit={() => {\n          Form.clearData('my-isolated-data')\n        }}\n      >\n        <Field.String path=\"/isolated\" />\n        <Form.Isolation.CommitButton />\n      </Form.Isolation>\n    </Form.Handler>\n  )\n}\n"})})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,o.jsx)(e,Object.assign({},n,{children:(0,o.jsx)(a,n)})):a(n)}},38734:function(n,e,t){t.d(e,{Z:function(){return s}});var o=t(84616),r=t(2784),a=t(2394),i=t(21068);const l=["minLength","maxLength","pattern","description","min","max","multipleOf","exclusiveMinimum","exclusiveMaximum"];function s(n){const{generateRef:e,filterData:t,log:s,children:d}=n||{},{fieldPropsRef:c,valuePropsRef:m,data:u,hasContext:h}=(0,r.useContext)(i.Z),f=(0,r.useRef)({});f.current=u;const p=(0,r.useCallback)((()=>{const n=Object.entries((null==c?void 0:c.current)||{}).reduce(((n,e)=>{let[r,i]=e;if(r.startsWith("/")){const e=r.substring(1),s=e.split("/"),d=s.length,c={type:i.valueType||"string"};for(const n of l)i[n]&&(c[n]=i[n]);if(d>1){const e=[""];for(const r of s){e.push(r);const l=e.join("/properties/"),d=e.length-1===s.length,m=a.e$(n,l)?a.U2(n,l):null,u=d?c:m;if(d)!1!==(null==t?void 0:t[l])&&a.t8(n,l,u);else{const e={type:"object",...m},r=[];i.required&&r.push(s.at(-1)),null!=m&&m.required&&r.push.apply(r,(0,o.Z)(m.required)),r.length>0&&(e.required=r),!1!==(null==t?void 0:t[l])&&a.t8(n,l,e)}}}else!1!==(null==t?void 0:t[r])&&a.t8(n.properties,r,c),i.required&&n.required.push(e)}return n}),{type:"object",properties:{},required:[]}),e=Object.entries((null==c?void 0:c.current)||{}).reduce(((n,e)=>{let[t,o]=e;if(t.startsWith("/")){const e={};for(const n in o)void 0!==o[n]&&"function"!=typeof o[n]&&(e[n]=o[n]);a.t8(n,t,e)}return n}),{}),r=Object.entries((null==m?void 0:m.current)||{}).reduce(((n,e)=>{let[t,o]=e;if(t.startsWith("/")){const e={};for(const n in o)void 0!==o[n]&&"function"!=typeof o[n]&&(e[n]=o[n]);a.t8(n,t,e)}return n}),{});return 0===n.required.length&&delete n.required,{schema:n,data:f.current,propsOfFields:e,propsOfValues:r}}),[c,t,m]);return h&&(s&&console.log(p().schema),e&&(e.current=p)),d}},10454:function(n,e,t){t.d(e,{Z:function(){return i}});var o=t(2784),r=t(2394),a=t(21068);function i(n){const{log:e,generateRef:t,filterData:i,children:l}=n||{},{fieldPropsRef:s,valuePropsRef:d,data:c,hasContext:m}=(0,o.useContext)(a.Z);(0,o.useRef)({}).current=c;const u=(0,o.useCallback)((()=>{const n=Object.entries((null==s?void 0:s.current)||{}).reduce(((n,e)=>{let[t,a]=e;if(t.startsWith("/")){const e={};for(const n in a)void 0===a[n]||"function"==typeof a[n]||(0,o.isValidElement)(a[n])||(e[n]=a[n]);!1!==(null==i?void 0:i[t])&&r.t8(n,t,e)}return n}),{}),e=Object.entries((null==d?void 0:d.current)||{}).reduce(((n,e)=>{let[t,a]=e;if(t.startsWith("/")){const e={};for(const n in a)void 0===a[n]||"function"==typeof a[n]||(0,o.isValidElement)(a[n])||(e[n]=a[n]);!1!==(null==i?void 0:i[t])&&r.t8(n,t,e)}return n}),{});return{propsOfFields:n,propsOfValues:e}}),[s,i,d]);return m&&(e&&console.log(u()),t&&(t.current=u)),l}},90584:function(n,e,t){var o=t(2784),r=t(21068),a=t(4408),i=t(9149),l=t(52322);function s(n){let{placeholder:e,label:t,data:s,...c}=n;const{data:m}=(0,o.useContext)(r.Z);return(0,l.jsxs)(a.Z,{element:"output",backgroundColor:"sand-yellow",style:{maxWidth:"80vw"},innerSpace:!0,...c,children:[t&&(0,l.jsx)(i.Z,{bottom:!0,children:(0,l.jsx)("b",{children:t})}),(0,l.jsxs)("pre",{children:[e&&0===Object.keys((null!=s?s:m)||{}).length?e:JSON.stringify(d(null!=s?s:m),null,2)," "]})]})}function d(n,e){return void 0===e&&(e="undefined"),void 0===n?e:n&&"object"==typeof n&&n!==e?{...n,...Object.fromEntries(Object.entries(n).map((n=>{let[e,t]=n;return[e,d(t)]})))}:n}s._supportsSpacingProps=!0,e.Z=s},4902:function(n,e,t){t.r(e),t.d(e,{GenerateSchema:function(){return o.Z},ListAllProps:function(){return r.Z},Log:function(){return a.Z}});var o=t(38734),r=t(10454),a=t(90584)}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-form-isolation-mdx-b7b3fd692d1ae5e94bed.js.map