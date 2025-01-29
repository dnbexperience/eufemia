"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[68434],{4713:function(n,e,t){t.r(e),t.d(e,{default:function(){return m}});var a={};t.r(a),t.d(a,{ViewAndEditContainer:function(){return o.ViewAndEditContainer}});var i=t(52322),r=t(45392),o=t(38254);function s(n){const e=Object.assign({h2:"h2"},(0,r.ah)(),n.components);return a||d("Examples",!1),o.ViewAndEditContainer||d("Examples.ViewAndEditContainer",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h2,{children:"Demos"}),"\n",(0,i.jsx)(o.ViewAndEditContainer,{})]})}var m=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,i.jsx)(e,Object.assign({},n,{children:(0,i.jsx)(s,n)})):s(n)};function d(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}},38254:function(n,e,t){t.r(e),t.d(e,{AllFieldsRequired:function(){return c},BasicViewAndEditContainer:function(){return d},NestedPathSection:function(){return o},NestedSections:function(){return S},OverwriteProps:function(){return l},SchemaSupport:function(){return u},ViewAndEditContainer:function(){return s},ViewAndEditContainerValidation:function(){return m},WithVisibility:function(){return F},WithoutDataContext:function(){return r}});var a=t(46832),i=t(52322);const r=()=>(0,i.jsx)(a.Z,{children:"<Form.Section\n  data={{\n    myField: 'Value',\n  }}\n  onChange={console.log}\n>\n  <Field.String path=\"/myField\" />\n</Form.Section>\n"}),o=()=>(0,i.jsx)(a.Z,{noInline:!0,children:'const MyNameSection = (props: SectionProps) => {\n  return (\n    <Form.Section {...props}>\n      <Form.Card>\n        <Field.Name.First path="/firstName" />\n        <Field.Name.Last path="/lastName" />\n      </Form.Card>\n    </Form.Section>\n  )\n}\nrender(\n  <Form.Handler\n    onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    defaultData={{\n      nestedPath: {\n        firstName: \'Nora\',\n        lastName: \'Mørk\',\n      },\n    }}\n  >\n    <MyNameSection path="/nestedPath" />\n    <Form.SubmitButton variant="send" />\n  </Form.Handler>,\n)\n'}),s=()=>(0,i.jsx)(a.Z,{"data-visual-test":"view-and-edit-container",hideCode:!0,noInline:!0,children:'const MyEditContainer = () => {\n  return (\n    <Form.Section.EditContainer>\n      <Field.Name.First path="/firstName" />\n      <Field.Name.Last path="/lastName" />\n    </Form.Section.EditContainer>\n  )\n}\nconst MyViewContainer = () => {\n  return (\n    <Form.Section.ViewContainer>\n      <Value.SummaryList>\n        <Value.Name.First path="/firstName" />\n        <Value.Name.Last path="/lastName" />\n      </Value.SummaryList>\n    </Form.Section.ViewContainer>\n  )\n}\nrender(\n  <Form.Handler\n    onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    defaultData={{\n      nestedPath: {\n        firstName: \'Nora\',\n        lastName: \'Mørk\',\n      },\n    }}\n  >\n    <Form.Card>\n      <Form.SubHeading>Your account</Form.SubHeading>\n      <Form.Section path="/nestedPath" required>\n        <MyEditContainer />\n        <MyViewContainer />\n      </Form.Section>\n    </Form.Card>\n    <Form.SubmitButton />\n  </Form.Handler>,\n)\n'}),m=()=>(0,i.jsx)(a.Z,{hideCode:!0,noInline:!0,children:'const MyEditContainer = () => {\n  return (\n    <Form.Section.EditContainer>\n      <Field.Name.First path="/firstName" />\n      <Field.Name.Last path="/lastName" />\n    </Form.Section.EditContainer>\n  )\n}\nconst MyViewContainer = () => {\n  return (\n    <Form.Section.ViewContainer>\n      <Value.SummaryList>\n        <Value.Name.First path="/firstName" />\n        <Value.Name.Last path="/lastName" />\n      </Value.SummaryList>\n    </Form.Section.ViewContainer>\n  )\n}\nrender(\n  <Form.Handler\n    onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    defaultData={{\n      nestedPath: {\n        firstName: \'Nora\',\n        lastName: undefined, // initiate error\n      },\n    }}\n  >\n    <Form.Card>\n      <Form.SubHeading>Your account</Form.SubHeading>\n      <Form.Section path="/nestedPath" required validateInitially>\n        <MyEditContainer />\n        <MyViewContainer />\n      </Form.Section>\n    </Form.Card>\n    <Form.SubmitButton />\n  </Form.Handler>,\n)\n'}),d=()=>(0,i.jsx)(a.Z,{"data-visual-test":"basic-view-and-edit-container",hideCode:!0,noInline:!0,children:'const MyEditContainer = () => {\n  return (\n    <Form.Section.EditContainer variant="basic">\n      <Field.Name.First path="/firstName" />\n      <Field.Name.Last path="/lastName" />\n    </Form.Section.EditContainer>\n  )\n}\nconst MyViewContainer = () => {\n  return (\n    <Form.Section.ViewContainer variant="basic">\n      <Value.SummaryList>\n        <Value.Name.First path="/firstName" />\n        <Value.Name.Last path="/lastName" />\n      </Value.SummaryList>\n    </Form.Section.ViewContainer>\n  )\n}\nrender(\n  <Form.Handler\n    onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    defaultData={{\n      nestedPath: {\n        firstName: \'Nora\',\n        lastName: \'Mørk\',\n      },\n    }}\n  >\n    <Form.Card>\n      <Form.SubHeading>Your account</Form.SubHeading>\n      <Form.Section path="/nestedPath" required>\n        <MyEditContainer />\n        <MyViewContainer />\n      </Form.Section>\n    </Form.Card>\n    <Form.SubmitButton />\n  </Form.Handler>,\n)\n'}),l=()=>(0,i.jsx)(a.Z,{noInline:!0,children:'const MyNameSection = (props) => {\n  return (\n    <Form.Section {...props}>\n      <Form.Card>\n        <Field.Composition width="large">\n          <Field.Name.First path="/firstName" />\n          <Field.Name.Last path="/lastName" required minLength={10} />\n        </Field.Composition>\n      </Form.Card>\n    </Form.Section>\n  )\n}\nrender(\n  <Form.Handler\n    onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    defaultData={{\n      nestedPath: {\n        firstName: \'\',\n        lastName: \'M\',\n      },\n    }}\n  >\n    <MyNameSection\n      path="/nestedPath"\n      overwriteProps={{\n        firstName: {\n          required: true,\n          label: \'Custom\',\n        },\n        lastName: {\n          required: false,\n          minLength: 2,\n        },\n      }}\n    />\n    <Form.SubmitButton variant="send" />\n  </Form.Handler>,\n)\n'}),c=()=>(0,i.jsx)(a.Z,{noInline:!0,children:'const MyNameSection = (props: SectionProps) => {\n  return (\n    <Form.Section {...props}>\n      <Form.Card>\n        <Field.Composition width="large">\n          <Field.Name.First path="/firstName" />\n          <Field.Name.Last path="/lastName" />\n        </Field.Composition>\n      </Form.Card>\n    </Form.Section>\n  )\n}\nconst schema: JSONSchema = {\n  type: \'object\',\n  required: [\'myRequiredSection\'],\n}\nrender(\n  <Flex.Stack>\n    <Form.Handler onSubmit={async (data) => console.log(\'onSubmit\', data)}>\n      <MyNameSection required />\n      <Form.SubmitButton variant="send" />\n    </Form.Handler>\n\n    <Form.Handler\n      onSubmit={async (data) => console.log(\'onSubmit\', data)}\n      schema={schema}\n    >\n      <MyNameSection path="/myRequiredSection" />\n      <Form.SubmitButton variant="send" />\n    </Form.Handler>\n  </Flex.Stack>,\n)\n'}),u=()=>(0,i.jsx)(a.Z,{noInline:!0,children:"const MyNameSection = (props: SectionProps) => {\n  return (\n    <Form.Section {...props}>\n      <Form.Card>\n        <Field.Composition width=\"large\">\n          <Field.Name.First path=\"/firstName\" />\n          <Field.Name.Last path=\"/lastName\" required minLength={10} />\n        </Field.Composition>\n      </Form.Card>\n    </Form.Section>\n  )\n}\nconst mySchema: JSONSchema = {\n  type: 'object',\n  properties: {\n    nestedPath: {\n      type: 'object',\n      properties: {\n        firstName: {\n          type: 'string',\n          minLength: 3,\n        },\n        lastName: {\n          type: 'string',\n          minLength: 2,\n        },\n      },\n      required: ['firstName', 'lastName'],\n    },\n  },\n}\nrender(\n  <Form.Handler\n    onSubmit={async (data) => console.log('onSubmit', data)}\n    schema={mySchema}\n    defaultData={{\n      nestedPath: {\n        firstName: '',\n        lastName: 'M',\n      },\n    }}\n  >\n    <MyNameSection path=\"/nestedPath\" />\n    <Form.SubmitButton variant=\"send\" />\n  </Form.Handler>,\n)\n"}),F=()=>(0,i.jsx)(a.Z,{noInline:!0,children:'const MySection = ({ children, ...props }) => {\n  return (\n    <Form.Section {...props}>\n      <Form.Card>\n        <Field.Boolean\n          label="Are you sure?"\n          variant="buttons"\n          path="/iAmSure"\n        />\n        <Form.Visibility pathTrue="/iAmSure" animate>\n          <Field.Selection\n            label="Choose"\n            variant="radio"\n            path="/mySelection"\n          >\n            <Field.Option value="less" title="Less" />\n            <Field.Option value="more" title="More" />\n          </Field.Selection>\n\n          <Form.Visibility\n            visibleWhen={{\n              path: \'/mySelection\',\n              hasValue: \'more\',\n            }}\n            animate\n          >\n            <Field.String label="My String" path="/myString" />\n          </Form.Visibility>\n        </Form.Visibility>\n\n        {children}\n      </Form.Card>\n\n      <Tools.Log />\n    </Form.Section>\n  )\n}\nrender(\n  <Form.Handler\n    onChange={console.log}\n    defaultData={{\n      nestedPath: {\n        iAmSure: false,\n        mySelection: \'less\',\n        myString: \'has a value\',\n      },\n    }}\n  >\n    <MySection path="/nestedPath">\n      <Form.Visibility\n        visibleWhen={{\n          path: \'/myString\',\n          hasValue: (value) => value !== \'has a value\',\n        }}\n        animate\n      >\n        <P>\n          Result: <Value.String path="/nestedPath/myString" inline />\n        </P>\n      </Form.Visibility>\n    </MySection>\n  </Form.Handler>,\n)\n'}),S=()=>(0,i.jsx)(a.Z,{noInline:!0,children:'render(\n  <Form.Handler\n    onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    defaultData={{\n      nestedPath: {\n        name: {\n          first: \'Nora\',\n          last: \'Mørk\',\n        },\n        address: {\n          street: \'Strøget\',\n          nr: \'\',\n        },\n      },\n    }}\n  >\n    <MySection path="/nestedPath" required />\n    <Form.SubmitButton variant="send" />\n  </Form.Handler>,\n)\nfunction MySection(props: SectionProps) {\n  return (\n    <Form.Section {...props}>\n      <Form.Card>\n        <MyNameSection path="/name" />\n        <MyAddressSection path="/address" />\n        <MyValueSection />\n      </Form.Card>\n    </Form.Section>\n  )\n}\nfunction MyNameSection(props: SectionProps) {\n  return (\n    <Form.Section {...props}>\n      <Field.Composition width="large">\n        <Field.Name.First path="/first" />\n        <Field.Name.Last path="/last" />\n      </Field.Composition>\n    </Form.Section>\n  )\n}\nfunction MyAddressSection(props: SectionProps) {\n  return (\n    <Form.Section {...props}>\n      <Field.Composition width="large">\n        <Field.String label="Gateadresse" path="/street" width="stretch" />\n        <Field.String label="Nr." path="/nr" width="small" />\n      </Field.Composition>\n    </Form.Section>\n  )\n}\nfunction MyValueSection(props: SectionProps) {\n  return (\n    <Form.Section {...props}>\n      <Value.SummaryList>\n        <Form.Section path="/name">\n          <Value.Composition gap="small">\n            <Value.Name.First path="/first" />\n            <Value.Name.Last path="/last" />\n          </Value.Composition>\n        </Form.Section>\n\n        <Form.Section path="/address">\n          <Value.Composition gap="small">\n            <Value.String label="Gateadresse" path="/street" />\n            <Value.String label="Nr." path="/nr" placeholder="–" />\n          </Value.Composition>\n        </Form.Section>\n      </Value.SummaryList>\n    </Form.Section>\n  )\n}\n'})}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-form-section-view-container-demos-mdx-63d993f055147d687840.js.map