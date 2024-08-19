"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[59587],{49259:function(n,e,t){t.r(e),t.d(e,{default:function(){return h}});var o={};t.r(o),t.d(o,{CommitHandleRef:function(){return d},InsideSection:function(){return c},TransformCommitData:function(){return m},UsingCommitButton:function(){return s}});var a=t(52322),r=t(45392),i=t(64368),l=t(49414);t(2784);const s=()=>(0,a.jsx)(i.Z,{children:'<Form.Handler\n  onSubmit={(data) => console.log(\'onSubmit\', data)}\n  onChange={(data) => console.log(\'Regular onChange:\', data)}\n>\n  <Flex.Stack>\n    <Form.Isolation\n      onChange={(data) => console.log(\'Isolated onChange:\', data)}\n    >\n      <Flex.Stack>\n        <Field.String required label="Isolated" path="/isolated" />\n        <Form.Isolation.CommitButton text="Commit" />\n      </Flex.Stack>\n    </Form.Isolation>\n\n    <Field.String\n      required\n      label="Commited from isolation"\n      path="/isolated"\n    />\n    <Field.String required label="Outside of isolation" path="/regular" />\n\n    <Form.SubmitButton />\n  </Flex.Stack>\n</Form.Handler>\n'}),d=()=>(0,a.jsx)(i.Z,{noInline:!0,children:'const MyForm = () => {\n  const commitHandleRef = React.useRef(null)\n  return (\n    <>\n      <Form.Handler\n        bottom="large"\n        data={{\n          contactPersons: [\n            {\n              title: \'Hanne\',\n              value: \'hanne\',\n            },\n          ],\n        }}\n      >\n        <Card stack>\n          <Form.SubHeading>Ny hovedkontaktperson</Form.SubHeading>\n\n          <HeightAnimation>\n            <Field.Selection variant="radio" dataPath="/contactPersons" />\n          </HeightAnimation>\n\n          <Form.Isolation\n            commitHandleRef={commitHandleRef}\n            transformOnCommit={(isolatedData, handlerData) => {\n              const value = isolatedData.newPerson.title.toLowerCase()\n              const transformedData = {\n                ...handlerData,\n                contactPersons: [\n                  ...handlerData.contactPersons,\n                  {\n                    ...isolatedData.newPerson,\n                    value,\n                  },\n                ],\n              }\n              return transformedData\n            }}\n          >\n            <Flex.Stack>\n              <Form.Section path="/newPerson">\n                <Field.Name.First required path="/title" />\n              </Form.Section>\n            </Flex.Stack>\n          </Form.Isolation>\n          <Log />\n        </Card>\n      </Form.Handler>\n\n      <button\n        onClick={() => {\n          commitHandleRef.current()\n        }}\n      >\n        Commit from outside of handler\n      </button>\n    </>\n  )\n}\nconst Log = () => {\n  const { data } = Form.useData()\n  return (\n    <Section element="output" innerSpace backgroundColor="sand-yellow" top>\n      {JSON.stringify(data || {}, null, 4)}\n    </Section>\n  )\n}\nrender(<MyForm />)\n'}),m=()=>(0,a.jsx)(i.Z,{scope:{Iterate:l},noInline:!0,children:'const MyForm = () => {\n  return (\n    <Form.Handler\n      onChange={console.log}\n      defaultData={{\n        contactPersons: [\n          {\n            title: \'Hanne\',\n            value: \'hanne\',\n          },\n        ],\n        mySelection: \'hanne\',\n      }}\n    >\n      <Card stack>\n        <Form.SubHeading>Legg til ny hovedkontaktperson</Form.SubHeading>\n\n        <HeightAnimation>\n          <Field.Selection\n            variant="radio"\n            path="/mySelection"\n            dataPath="/contactPersons"\n          >\n            <Field.Option title="Annen person" value="other" />\n          </Field.Selection>\n        </HeightAnimation>\n\n        <Form.Visibility\n          visibleWhen={{\n            path: \'/mySelection\',\n            hasValue: \'other\',\n          }}\n          animate\n        >\n          <Flex.Stack>\n            <Form.SubHeading>Ny hovedkontaktperson</Form.SubHeading>\n\n            <Form.Isolation\n              transformOnCommit={(isolatedData, handlerData) => {\n                return {\n                  ...handlerData,\n                  contactPersons: [\n                    ...handlerData.contactPersons,\n                    {\n                      ...isolatedData.newPerson,\n                      value: isolatedData.newPerson.title.toLowerCase(),\n                    },\n                  ],\n                }\n              }}\n              onCommit={(data, { clearData }) => {\n                clearData()\n              }}\n            >\n              <Flex.Stack>\n                <Form.Section path="/newPerson">\n                  <Field.Name.First required path="/title" />\n                </Form.Section>\n\n                <Form.Isolation.CommitButton />\n              </Flex.Stack>\n            </Form.Isolation>\n          </Flex.Stack>\n        </Form.Visibility>\n      </Card>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'}),c=()=>(0,a.jsx)(i.Z,{children:'<Form.Handler\n  defaultData={{\n    mySection: {\n      isolated: \'Isolated value defined outside\',\n      regular: \'Outer regular value\',\n    },\n  }}\n  onChange={(data) => {\n    console.log(\'Outer onChange:\', data)\n  }}\n>\n  <Form.Section path="/mySection">\n    <Flex.Stack>\n      <Form.Isolation\n        defaultData={{\n          isolated: \'The real initial "isolated" value\',\n        }}\n        onPathChange={(path, value) => {\n          console.log(\'Isolated onChange:\', path, value)\n        }}\n        onCommit={(data) => console.log(\'onCommit:\', data)}\n      >\n        <Flex.Stack>\n          <Field.String label="Isolated" path="/isolated" required />\n          <Form.Isolation.CommitButton />\n        </Flex.Stack>\n      </Form.Isolation>\n\n      <Field.String label="Synced" path="/isolated" />\n      <Field.String label="Regular" path="/regular" required />\n\n      <Form.SubmitButton />\n    </Flex.Stack>\n  </Form.Section>\n</Form.Handler>\n'});function u(n){const e=Object.assign({h2:"h2",h3:"h3"},(0,r.ah)(),n.components);return o||F("Examples",!1),d||F("Examples.CommitHandleRef",!0),c||F("Examples.InsideSection",!0),m||F("Examples.TransformCommitData",!0),s||F("Examples.UsingCommitButton",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.h2,{children:"Demos"}),"\n",(0,a.jsx)(e.h3,{children:"Transform data on commit"}),"\n",(0,a.jsx)(m,{}),"\n",(0,a.jsx)(e.h3,{children:"Using the CommitButton"}),"\n",(0,a.jsx)(s,{}),"\n",(0,a.jsx)(e.h3,{children:"Using commitHandleRef"}),"\n",(0,a.jsx)(d,{}),"\n",(0,a.jsx)(e.h3,{children:"Inside a section"}),"\n",(0,a.jsx)(c,{})]})}var h=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,a.jsx)(e,Object.assign({},n,{children:(0,a.jsx)(u,n)})):u(n)};function F(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-form-isolation-demos-mdx-5daaee710c76979ee72d.js.map