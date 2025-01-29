"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[45344],{49871:function(n,e,t){t.r(e);var i=t(52322),a=t(45392),r=t(38254);function o(n){const e=Object.assign({h2:"h2",h3:"h3",p:"p",a:"a",code:"code"},(0,a.ah)(),n.components);return r||s("Examples",!1),r.AllFieldsRequired||s("Examples.AllFieldsRequired",!0),r.BasicViewAndEditContainer||s("Examples.BasicViewAndEditContainer",!0),r.NestedPathSection||s("Examples.NestedPathSection",!0),r.NestedSections||s("Examples.NestedSections",!0),r.OverwriteProps||s("Examples.OverwriteProps",!0),r.SchemaSupport||s("Examples.SchemaSupport",!0),r.ViewAndEditContainer||s("Examples.ViewAndEditContainer",!0),r.ViewAndEditContainerValidation||s("Examples.ViewAndEditContainerValidation",!0),r.WithVisibility||s("Examples.WithVisibility",!0),r.WithoutDataContext||s("Examples.WithoutDataContext",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h2,{children:"Demos"}),"\n",(0,i.jsx)(e.h3,{children:"Without Form.Handler"}),"\n",(0,i.jsx)(r.WithoutDataContext,{}),"\n",(0,i.jsx)(e.h3,{children:"With a nested path"}),"\n",(0,i.jsx)(e.p,{children:"This lets you reuse the same section of fields in multiple places in your forms."}),"\n",(0,i.jsx)(r.NestedPathSection,{}),"\n",(0,i.jsx)(e.h3,{children:"With a Edit and View container"}),"\n",(0,i.jsxs)(e.p,{children:["This example uses the ",(0,i.jsx)(e.a,{href:"/uilib/extensions/forms/Form/Section/EditContainer/",children:"EditContainer"})," and ",(0,i.jsx)(e.a,{href:"/uilib/extensions/forms/Form/Section/ViewContainer/",children:"ViewContainer"})," containers with the default ",(0,i.jsx)(e.code,{children:'variant="outline"'}),"."]}),"\n",(0,i.jsx)(r.ViewAndEditContainer,{}),"\n",(0,i.jsx)(e.h3,{children:"Show errors on the whole section"}),"\n",(0,i.jsxs)(e.p,{children:["When a field in the section has an error and the section has ",(0,i.jsx)(e.code,{children:"containerMode"})," set to ",(0,i.jsx)(e.code,{children:"auto"})," (default), the whole section will switch to edit mode. The errors will be shown when ",(0,i.jsx)(e.code,{children:"validateInitially"})," is set to ",(0,i.jsx)(e.code,{children:"true"}),"."]}),"\n",(0,i.jsx)(r.ViewAndEditContainerValidation,{}),"\n",(0,i.jsxs)(e.h3,{children:["Using ",(0,i.jsx)(e.code,{children:'variant="basic"'})]}),"\n",(0,i.jsxs)(e.p,{children:["Using ",(0,i.jsx)(e.code,{children:'variant="basic"'})," will render the view and edit container without the additional Card ",(0,i.jsx)(e.code,{children:"outline"}),"."]}),"\n",(0,i.jsx)(r.BasicViewAndEditContainer,{}),"\n",(0,i.jsx)(e.h3,{children:"Overwrite properties"}),"\n",(0,i.jsx)(e.p,{children:"Overwriting properties makes it very flexible to reuse the same section of fields in multiple places in your forms."}),"\n",(0,i.jsx)(r.OverwriteProps,{}),"\n",(0,i.jsx)(e.h3,{children:"Schema support"}),"\n",(0,i.jsxs)(e.p,{children:["This feature lets you extend the requirements of the fields in the section with a ",(0,i.jsx)(e.a,{href:"/uilib/extensions/forms/all-features/#schema-validation",children:"JSON Schema"}),"."]}),"\n",(0,i.jsx)(r.SchemaSupport,{}),"\n",(0,i.jsx)(e.h3,{children:"Required support"}),"\n",(0,i.jsxs)(e.p,{children:["You can easily make a section of fields required by setting the ",(0,i.jsx)(e.code,{children:"required"})," property on the section itself."]}),"\n",(0,i.jsx)(r.AllFieldsRequired,{}),"\n",(0,i.jsx)(e.h3,{children:"Nested sections"}),"\n",(0,i.jsx)(e.p,{children:"You can nest sections inside each other."}),"\n",(0,i.jsx)(r.NestedSections,{}),"\n",(0,i.jsx)(e.h3,{children:"With Visibility logic"}),"\n",(0,i.jsxs)(e.p,{children:["The ",(0,i.jsx)(e.a,{href:"/uilib/extensions/forms/Form/Visibility/",children:"Visibility"})," component lets you show or hide parts of your form based on the data given in the section itself."]}),"\n",(0,i.jsx)(r.WithVisibility,{})]})}function s(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,a.ah)(),n.components);return e?(0,i.jsx)(e,Object.assign({},n,{children:(0,i.jsx)(o,n)})):o(n)}},38254:function(n,e,t){t.r(e),t.d(e,{AllFieldsRequired:function(){return c},BasicViewAndEditContainer:function(){return l},NestedPathSection:function(){return o},NestedSections:function(){return p},OverwriteProps:function(){return m},SchemaSupport:function(){return h},ViewAndEditContainer:function(){return s},ViewAndEditContainerValidation:function(){return d},WithVisibility:function(){return u},WithoutDataContext:function(){return r}});var i=t(46832),a=t(52322);const r=()=>(0,a.jsx)(i.Z,{children:"<Form.Section\n  data={{\n    myField: 'Value',\n  }}\n  onChange={console.log}\n>\n  <Field.String path=\"/myField\" />\n</Form.Section>\n"}),o=()=>(0,a.jsx)(i.Z,{noInline:!0,children:'const MyNameSection = (props: SectionProps) => {\n  return (\n    <Form.Section {...props}>\n      <Form.Card>\n        <Field.Name.First path="/firstName" />\n        <Field.Name.Last path="/lastName" />\n      </Form.Card>\n    </Form.Section>\n  )\n}\nrender(\n  <Form.Handler\n    onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    defaultData={{\n      nestedPath: {\n        firstName: \'Nora\',\n        lastName: \'Mørk\',\n      },\n    }}\n  >\n    <MyNameSection path="/nestedPath" />\n    <Form.SubmitButton variant="send" />\n  </Form.Handler>,\n)\n'}),s=()=>(0,a.jsx)(i.Z,{"data-visual-test":"view-and-edit-container",hideCode:!0,noInline:!0,children:'const MyEditContainer = () => {\n  return (\n    <Form.Section.EditContainer>\n      <Field.Name.First path="/firstName" />\n      <Field.Name.Last path="/lastName" />\n    </Form.Section.EditContainer>\n  )\n}\nconst MyViewContainer = () => {\n  return (\n    <Form.Section.ViewContainer>\n      <Value.SummaryList>\n        <Value.Name.First path="/firstName" />\n        <Value.Name.Last path="/lastName" />\n      </Value.SummaryList>\n    </Form.Section.ViewContainer>\n  )\n}\nrender(\n  <Form.Handler\n    onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    defaultData={{\n      nestedPath: {\n        firstName: \'Nora\',\n        lastName: \'Mørk\',\n      },\n    }}\n  >\n    <Form.Card>\n      <Form.SubHeading>Your account</Form.SubHeading>\n      <Form.Section path="/nestedPath" required>\n        <MyEditContainer />\n        <MyViewContainer />\n      </Form.Section>\n    </Form.Card>\n    <Form.SubmitButton />\n  </Form.Handler>,\n)\n'}),d=()=>(0,a.jsx)(i.Z,{hideCode:!0,noInline:!0,children:'const MyEditContainer = () => {\n  return (\n    <Form.Section.EditContainer>\n      <Field.Name.First path="/firstName" />\n      <Field.Name.Last path="/lastName" />\n    </Form.Section.EditContainer>\n  )\n}\nconst MyViewContainer = () => {\n  return (\n    <Form.Section.ViewContainer>\n      <Value.SummaryList>\n        <Value.Name.First path="/firstName" />\n        <Value.Name.Last path="/lastName" />\n      </Value.SummaryList>\n    </Form.Section.ViewContainer>\n  )\n}\nrender(\n  <Form.Handler\n    onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    defaultData={{\n      nestedPath: {\n        firstName: \'Nora\',\n        lastName: undefined, // initiate error\n      },\n    }}\n  >\n    <Form.Card>\n      <Form.SubHeading>Your account</Form.SubHeading>\n      <Form.Section path="/nestedPath" required validateInitially>\n        <MyEditContainer />\n        <MyViewContainer />\n      </Form.Section>\n    </Form.Card>\n    <Form.SubmitButton />\n  </Form.Handler>,\n)\n'}),l=()=>(0,a.jsx)(i.Z,{"data-visual-test":"basic-view-and-edit-container",hideCode:!0,noInline:!0,children:'const MyEditContainer = () => {\n  return (\n    <Form.Section.EditContainer variant="basic">\n      <Field.Name.First path="/firstName" />\n      <Field.Name.Last path="/lastName" />\n    </Form.Section.EditContainer>\n  )\n}\nconst MyViewContainer = () => {\n  return (\n    <Form.Section.ViewContainer variant="basic">\n      <Value.SummaryList>\n        <Value.Name.First path="/firstName" />\n        <Value.Name.Last path="/lastName" />\n      </Value.SummaryList>\n    </Form.Section.ViewContainer>\n  )\n}\nrender(\n  <Form.Handler\n    onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    defaultData={{\n      nestedPath: {\n        firstName: \'Nora\',\n        lastName: \'Mørk\',\n      },\n    }}\n  >\n    <Form.Card>\n      <Form.SubHeading>Your account</Form.SubHeading>\n      <Form.Section path="/nestedPath" required>\n        <MyEditContainer />\n        <MyViewContainer />\n      </Form.Section>\n    </Form.Card>\n    <Form.SubmitButton />\n  </Form.Handler>,\n)\n'}),m=()=>(0,a.jsx)(i.Z,{noInline:!0,children:'const MyNameSection = (props) => {\n  return (\n    <Form.Section {...props}>\n      <Form.Card>\n        <Field.Composition width="large">\n          <Field.Name.First path="/firstName" />\n          <Field.Name.Last path="/lastName" required minLength={10} />\n        </Field.Composition>\n      </Form.Card>\n    </Form.Section>\n  )\n}\nrender(\n  <Form.Handler\n    onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    defaultData={{\n      nestedPath: {\n        firstName: \'\',\n        lastName: \'M\',\n      },\n    }}\n  >\n    <MyNameSection\n      path="/nestedPath"\n      overwriteProps={{\n        firstName: {\n          required: true,\n          label: \'Custom\',\n        },\n        lastName: {\n          required: false,\n          minLength: 2,\n        },\n      }}\n    />\n    <Form.SubmitButton variant="send" />\n  </Form.Handler>,\n)\n'}),c=()=>(0,a.jsx)(i.Z,{noInline:!0,children:'const MyNameSection = (props: SectionProps) => {\n  return (\n    <Form.Section {...props}>\n      <Form.Card>\n        <Field.Composition width="large">\n          <Field.Name.First path="/firstName" />\n          <Field.Name.Last path="/lastName" />\n        </Field.Composition>\n      </Form.Card>\n    </Form.Section>\n  )\n}\nconst schema: JSONSchema = {\n  type: \'object\',\n  required: [\'myRequiredSection\'],\n}\nrender(\n  <Flex.Stack>\n    <Form.Handler onSubmit={async (data) => console.log(\'onSubmit\', data)}>\n      <MyNameSection required />\n      <Form.SubmitButton variant="send" />\n    </Form.Handler>\n\n    <Form.Handler\n      onSubmit={async (data) => console.log(\'onSubmit\', data)}\n      schema={schema}\n    >\n      <MyNameSection path="/myRequiredSection" />\n      <Form.SubmitButton variant="send" />\n    </Form.Handler>\n  </Flex.Stack>,\n)\n'}),h=()=>(0,a.jsx)(i.Z,{noInline:!0,children:"const MyNameSection = (props: SectionProps) => {\n  return (\n    <Form.Section {...props}>\n      <Form.Card>\n        <Field.Composition width=\"large\">\n          <Field.Name.First path=\"/firstName\" />\n          <Field.Name.Last path=\"/lastName\" required minLength={10} />\n        </Field.Composition>\n      </Form.Card>\n    </Form.Section>\n  )\n}\nconst mySchema: JSONSchema = {\n  type: 'object',\n  properties: {\n    nestedPath: {\n      type: 'object',\n      properties: {\n        firstName: {\n          type: 'string',\n          minLength: 3,\n        },\n        lastName: {\n          type: 'string',\n          minLength: 2,\n        },\n      },\n      required: ['firstName', 'lastName'],\n    },\n  },\n}\nrender(\n  <Form.Handler\n    onSubmit={async (data) => console.log('onSubmit', data)}\n    schema={mySchema}\n    defaultData={{\n      nestedPath: {\n        firstName: '',\n        lastName: 'M',\n      },\n    }}\n  >\n    <MyNameSection path=\"/nestedPath\" />\n    <Form.SubmitButton variant=\"send\" />\n  </Form.Handler>,\n)\n"}),u=()=>(0,a.jsx)(i.Z,{noInline:!0,children:'const MySection = ({ children, ...props }) => {\n  return (\n    <Form.Section {...props}>\n      <Form.Card>\n        <Field.Boolean\n          label="Are you sure?"\n          variant="buttons"\n          path="/iAmSure"\n        />\n        <Form.Visibility pathTrue="/iAmSure" animate>\n          <Field.Selection\n            label="Choose"\n            variant="radio"\n            path="/mySelection"\n          >\n            <Field.Option value="less" title="Less" />\n            <Field.Option value="more" title="More" />\n          </Field.Selection>\n\n          <Form.Visibility\n            visibleWhen={{\n              path: \'/mySelection\',\n              hasValue: \'more\',\n            }}\n            animate\n          >\n            <Field.String label="My String" path="/myString" />\n          </Form.Visibility>\n        </Form.Visibility>\n\n        {children}\n      </Form.Card>\n\n      <Tools.Log />\n    </Form.Section>\n  )\n}\nrender(\n  <Form.Handler\n    onChange={console.log}\n    defaultData={{\n      nestedPath: {\n        iAmSure: false,\n        mySelection: \'less\',\n        myString: \'has a value\',\n      },\n    }}\n  >\n    <MySection path="/nestedPath">\n      <Form.Visibility\n        visibleWhen={{\n          path: \'/myString\',\n          hasValue: (value) => value !== \'has a value\',\n        }}\n        animate\n      >\n        <P>\n          Result: <Value.String path="/nestedPath/myString" inline />\n        </P>\n      </Form.Visibility>\n    </MySection>\n  </Form.Handler>,\n)\n'}),p=()=>(0,a.jsx)(i.Z,{noInline:!0,children:'render(\n  <Form.Handler\n    onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    defaultData={{\n      nestedPath: {\n        name: {\n          first: \'Nora\',\n          last: \'Mørk\',\n        },\n        address: {\n          street: \'Strøget\',\n          nr: \'\',\n        },\n      },\n    }}\n  >\n    <MySection path="/nestedPath" required />\n    <Form.SubmitButton variant="send" />\n  </Form.Handler>,\n)\nfunction MySection(props: SectionProps) {\n  return (\n    <Form.Section {...props}>\n      <Form.Card>\n        <MyNameSection path="/name" />\n        <MyAddressSection path="/address" />\n        <MyValueSection />\n      </Form.Card>\n    </Form.Section>\n  )\n}\nfunction MyNameSection(props: SectionProps) {\n  return (\n    <Form.Section {...props}>\n      <Field.Composition width="large">\n        <Field.Name.First path="/first" />\n        <Field.Name.Last path="/last" />\n      </Field.Composition>\n    </Form.Section>\n  )\n}\nfunction MyAddressSection(props: SectionProps) {\n  return (\n    <Form.Section {...props}>\n      <Field.Composition width="large">\n        <Field.String label="Gateadresse" path="/street" width="stretch" />\n        <Field.String label="Nr." path="/nr" width="small" />\n      </Field.Composition>\n    </Form.Section>\n  )\n}\nfunction MyValueSection(props: SectionProps) {\n  return (\n    <Form.Section {...props}>\n      <Value.SummaryList>\n        <Form.Section path="/name">\n          <Value.Composition gap="small">\n            <Value.Name.First path="/first" />\n            <Value.Name.Last path="/last" />\n          </Value.Composition>\n        </Form.Section>\n\n        <Form.Section path="/address">\n          <Value.Composition gap="small">\n            <Value.String label="Gateadresse" path="/street" />\n            <Value.String label="Nr." path="/nr" placeholder="–" />\n          </Value.Composition>\n        </Form.Section>\n      </Value.SummaryList>\n    </Form.Section>\n  )\n}\n'})}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-form-section-demos-mdx-45407cc3d550b2163d7b.js.map