"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[59587],{49259:function(n,e,t){t.r(e),t.d(e,{default:function(){return h}});var o={};t.r(o),t.d(o,{CommitHandleRef:function(){return c},InsideSection:function(){return u},TransformCommitData:function(){return d},UsingCommitButton:function(){return s}});var r=t(52322),a=t(45392),i=t(46832),l=t(4902);t(2784);const s=()=>(0,r.jsx)(i.Z,{children:'<Form.Handler\n  onSubmit={(data) => console.log(\'onSubmit\', data)}\n  onChange={(data) => console.log(\'Regular onChange:\', data)}\n>\n  <Flex.Stack>\n    <Form.Isolation\n      onChange={(data) => console.log(\'Isolated onChange:\', data)}\n    >\n      <Flex.Stack>\n        <Field.String required label="Isolated" path="/isolated" />\n        <Form.Isolation.CommitButton text="Commit" />\n      </Flex.Stack>\n    </Form.Isolation>\n\n    <Field.String\n      required\n      label="Committed from isolation"\n      path="/isolated"\n    />\n    <Field.String required label="Outside of isolation" path="/regular" />\n\n    <Form.SubmitButton />\n  </Flex.Stack>\n</Form.Handler>\n'}),c=()=>(0,r.jsx)(i.Z,{scope:{Tools:l},noInline:!0,children:'const MyForm = () => {\n  const commitHandleRef = React.useRef(null)\n  return (\n    <>\n      <Form.Handler\n        bottom="large"\n        data={{\n          contactPersons: [\n            {\n              title: \'Hanne\',\n              value: \'hanne\',\n            },\n          ],\n        }}\n      >\n        <Form.Card>\n          <Form.SubHeading>Ny hovedkontaktperson</Form.SubHeading>\n\n          <HeightAnimation>\n            <Field.Selection variant="radio" dataPath="/contactPersons" />\n          </HeightAnimation>\n\n          <Form.Isolation\n            commitHandleRef={commitHandleRef}\n            transformOnCommit={(isolatedData, handlerData) => {\n              const value = isolatedData.newPerson.title.toLowerCase()\n              const transformedData = {\n                ...handlerData,\n                contactPersons: [\n                  ...handlerData.contactPersons,\n                  {\n                    ...isolatedData.newPerson,\n                    value,\n                  },\n                ],\n              }\n              return transformedData\n            }}\n          >\n            <Flex.Stack>\n              <Form.Section path="/newPerson">\n                <Field.Name.First required path="/title" />\n              </Form.Section>\n            </Flex.Stack>\n          </Form.Isolation>\n          <Tools.Log />\n        </Form.Card>\n      </Form.Handler>\n\n      <button\n        onClick={() => {\n          commitHandleRef.current()\n        }}\n      >\n        Commit from outside of handler\n      </button>\n    </>\n  )\n}\nrender(<MyForm />)\n'}),d=()=>(0,r.jsx)(i.Z,{noInline:!0,children:'const MyForm = () => {\n  return (\n    <Form.Handler\n      onChange={console.log}\n      defaultData={{\n        contactPersons: [\n          {\n            title: \'Hanne\',\n            value: \'hanne\',\n          },\n        ],\n        mySelection: \'hanne\',\n      }}\n    >\n      <Form.Card>\n        <Form.SubHeading>Legg til ny hovedkontaktperson</Form.SubHeading>\n\n        <HeightAnimation>\n          <Field.Selection\n            variant="radio"\n            path="/mySelection"\n            dataPath="/contactPersons"\n          >\n            <Field.Option title="Annen person" value="other" />\n          </Field.Selection>\n        </HeightAnimation>\n\n        <Form.Visibility\n          visibleWhen={{\n            path: \'/mySelection\',\n            hasValue: \'other\',\n          }}\n          animate\n        >\n          <Flex.Stack>\n            <Form.SubHeading>Ny hovedkontaktperson</Form.SubHeading>\n\n            <Form.Isolation\n              transformOnCommit={(isolatedData, handlerData) => {\n                return {\n                  ...handlerData,\n                  contactPersons: [\n                    ...handlerData.contactPersons,\n                    {\n                      ...isolatedData.newPerson,\n                      value: isolatedData.newPerson.title.toLowerCase(),\n                    },\n                  ],\n                }\n              }}\n              onCommit={(data, { clearData }) => {\n                clearData()\n              }}\n            >\n              <Flex.Stack>\n                <Form.Section path="/newPerson">\n                  <Field.Name.First required path="/title" />\n                </Form.Section>\n\n                <Form.Isolation.CommitButton />\n              </Flex.Stack>\n            </Form.Isolation>\n          </Flex.Stack>\n        </Form.Visibility>\n      </Form.Card>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'}),u=()=>(0,r.jsx)(i.Z,{children:'<Form.Handler\n  defaultData={{\n    mySection: {\n      isolated: \'Isolated value defined outside\',\n      regular: \'Outer regular value\',\n    },\n  }}\n  onChange={(data) => {\n    console.log(\'Outer onChange:\', data)\n  }}\n>\n  <Form.Section path="/mySection">\n    <Flex.Stack>\n      <Form.Isolation\n        defaultData={{\n          isolated: \'The real initial "isolated" value\',\n        }}\n        onPathChange={(path, value) => {\n          console.log(\'Isolated onChange:\', path, value)\n        }}\n        onCommit={(data) => console.log(\'onCommit:\', data)}\n      >\n        <Flex.Stack>\n          <Field.String label="Isolated" path="/isolated" required />\n          <Form.Isolation.CommitButton />\n        </Flex.Stack>\n      </Form.Isolation>\n\n      <Field.String label="Synced" path="/isolated" />\n      <Field.String label="Regular" path="/regular" required />\n\n      <Form.SubmitButton />\n    </Flex.Stack>\n  </Form.Section>\n</Form.Handler>\n'});function m(n){const e=Object.assign({h2:"h2",h3:"h3"},(0,a.ah)(),n.components);return o||f("Examples",!1),c||f("Examples.CommitHandleRef",!0),u||f("Examples.InsideSection",!0),d||f("Examples.TransformCommitData",!0),s||f("Examples.UsingCommitButton",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h2,{children:"Demos"}),"\n",(0,r.jsx)(e.h3,{children:"Transform data on commit"}),"\n",(0,r.jsx)(d,{}),"\n",(0,r.jsx)(e.h3,{children:"Using the CommitButton"}),"\n",(0,r.jsx)(s,{}),"\n",(0,r.jsx)(e.h3,{children:"Using commitHandleRef"}),"\n",(0,r.jsx)(c,{}),"\n",(0,r.jsx)(e.h3,{children:"Inside a section"}),"\n",(0,r.jsx)(u,{})]})}var h=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,a.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(m,n)})):m(n)};function f(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}},38734:function(n,e,t){t.d(e,{Z:function(){return s}});var o=t(84616),r=t(2784),a=t(2394),i=t(21068);const l=["minLength","maxLength","pattern","description","min","max","multipleOf","exclusiveMinimum","exclusiveMaximum"];function s(n){const{generateRef:e,filterData:t,log:s,children:c}=n||{},{fieldPropsRef:d,valuePropsRef:u,data:m,hasContext:h}=(0,r.useContext)(i.Z),f=(0,r.useRef)({});f.current=m;const p=(0,r.useCallback)((()=>{const n=Object.entries((null==d?void 0:d.current)||{}).reduce(((n,e)=>{let[r,i]=e;if(r.startsWith("/")){const e=r.substring(1),s=e.split("/"),c=s.length,d={type:i.valueType||"string"};for(const n of l)i[n]&&(d[n]=i[n]);if(c>1){const e=[""];for(const r of s){e.push(r);const l=e.join("/properties/"),c=e.length-1===s.length,u=a.e$(n,l)?a.U2(n,l):null,m=c?d:u;if(c)!1!==(null==t?void 0:t[l])&&a.t8(n,l,m);else{const e={type:"object",...u},r=[];i.required&&r.push(s.at(-1)),null!=u&&u.required&&r.push.apply(r,(0,o.Z)(u.required)),r.length>0&&(e.required=r),!1!==(null==t?void 0:t[l])&&a.t8(n,l,e)}}}else!1!==(null==t?void 0:t[r])&&a.t8(n.properties,r,d),i.required&&n.required.push(e)}return n}),{type:"object",properties:{},required:[]}),e=Object.entries((null==d?void 0:d.current)||{}).reduce(((n,e)=>{let[t,o]=e;if(t.startsWith("/")){const e={};for(const n in o)void 0!==o[n]&&"function"!=typeof o[n]&&(e[n]=o[n]);a.t8(n,t,e)}return n}),{}),r=Object.entries((null==u?void 0:u.current)||{}).reduce(((n,e)=>{let[t,o]=e;if(t.startsWith("/")){const e={};for(const n in o)void 0!==o[n]&&"function"!=typeof o[n]&&(e[n]=o[n]);a.t8(n,t,e)}return n}),{});return 0===n.required.length&&delete n.required,{schema:n,data:f.current,propsOfFields:e,propsOfValues:r}}),[d,t,u]);return h&&(s&&console.log(p().schema),e&&(e.current=p)),c}},10454:function(n,e,t){t.d(e,{Z:function(){return i}});var o=t(2784),r=t(2394),a=t(21068);function i(n){const{log:e,generateRef:t,filterData:i,children:l}=n||{},{fieldPropsRef:s,valuePropsRef:c,data:d,hasContext:u}=(0,o.useContext)(a.Z);(0,o.useRef)({}).current=d;const m=(0,o.useCallback)((()=>{const n=Object.entries((null==s?void 0:s.current)||{}).reduce(((n,e)=>{let[t,a]=e;if(t.startsWith("/")){const e={};for(const n in a)void 0===a[n]||"function"==typeof a[n]||(0,o.isValidElement)(a[n])||(e[n]=a[n]);!1!==(null==i?void 0:i[t])&&r.t8(n,t,e)}return n}),{}),e=Object.entries((null==c?void 0:c.current)||{}).reduce(((n,e)=>{let[t,a]=e;if(t.startsWith("/")){const e={};for(const n in a)void 0===a[n]||"function"==typeof a[n]||(0,o.isValidElement)(a[n])||(e[n]=a[n]);!1!==(null==i?void 0:i[t])&&r.t8(n,t,e)}return n}),{});return{propsOfFields:n,propsOfValues:e}}),[s,i,c]);return u&&(e&&console.log(m()),t&&(t.current=m)),l}},90584:function(n,e,t){var o=t(2784),r=t(21068),a=t(4408),i=t(9149),l=t(52322);function s(n){let{placeholder:e,label:t,data:s,...d}=n;const{data:u}=(0,o.useContext)(r.Z);return(0,l.jsxs)(a.Z,{element:"output",backgroundColor:"sand-yellow",style:{maxWidth:"80vw"},innerSpace:!0,...d,children:[t&&(0,l.jsx)(i.Z,{bottom:!0,children:(0,l.jsx)("b",{children:t})}),(0,l.jsxs)("pre",{children:[e&&0===Object.keys((null!=s?s:u)||{}).length?e:JSON.stringify(c(null!=s?s:u),null,2)," "]})]})}function c(n,e){return void 0===e&&(e="undefined"),void 0===n?e:n&&"object"==typeof n&&n!==e?{...n,...Object.fromEntries(Object.entries(n).map((n=>{let[e,t]=n;return[e,c(t)]})))}:n}s._supportsSpacingProps=!0,e.Z=s},4902:function(n,e,t){t.r(e),t.d(e,{GenerateSchema:function(){return o.Z},ListAllProps:function(){return r.Z},Log:function(){return a.Z}});var o=t(38734),r=t(10454),a=t(90584)}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-form-isolation-demos-mdx-d35a234c1052e275a21d.js.map