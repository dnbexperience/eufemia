"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[52408,68434,25627],{66621:function(n,e,t){t.r(e);var i=t(52322),a=t(45392),o=t(36870),r=t(4713);function s(n){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o.default,{}),"\n",(0,i.jsx)(r.default,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,a.ah)(),n.components);return e?(0,i.jsx)(e,Object.assign({},n,{children:(0,i.jsx)(s,n)})):s()}},4713:function(n,e,t){t.r(e),t.d(e,{default:function(){return m}});var i={};t.r(i),t.d(i,{ViewAndEditContainer:function(){return r.ViewAndEditContainer}});var a=t(52322),o=t(45392),r=t(38254);function s(n){const e=Object.assign({h2:"h2"},(0,o.ah)(),n.components);return i||d("Examples",!1),r.ViewAndEditContainer||d("Examples.ViewAndEditContainer",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.h2,{children:"Demos"}),"\n",(0,a.jsx)(r.ViewAndEditContainer,{})]})}var m=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,o.ah)(),n.components);return e?(0,a.jsx)(e,Object.assign({},n,{children:(0,a.jsx)(s,n)})):s(n)};function d(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}},36870:function(n,e,t){t.r(e);var i=t(52322),a=t(45392);function o(n){const e=Object.assign({h2:"h2",p:"p",code:"code",a:"a",pre:"pre"},(0,a.ah)(),n.components);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h2,{children:"Description"}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.code,{children:"ViewContainer"})," enables users to toggle (with animation) the content of each item between this view and the ",(0,i.jsx)(e.a,{href:"/uilib/extensions/forms/Form/Section/EditContainer/",children:"EditContainer"})," container."]}),"\n",(0,i.jsx)(e.p,{children:'By default, it features the toolbar containing a "Edit" button.'}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-tsx",children:'import { Form, Field, Value } from \'@dnb/eufemia/extensions/forms\'\n\nrender(\n  <Form.Section>\n    <Form.Section.EditContainer title="Edit account holder">\n      <Field.Name.Last path="/name" />\n    </Form.Section.EditContainer>\n\n    <Form.Section.ViewContainer title="Account holder">\n      <Value.Name.Last path="/name" />\n    </Form.Section.ViewContainer>\n  </Form.Section>,\n)\n'})}),"\n",(0,i.jsx)(e.h2,{children:"Customize the Toolbar"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-tsx",children:"import { Form, Value } from '@dnb/eufemia/extensions/forms'\n\nrender(\n  <Form.Section>\n    <Form.Section.ViewContainer>\n      <Value.Name.Last itemPath=\"/name\" />\n\n      <Form.Section.Toolbar>\n        <Form.Section.ViewContainer.EditButton />\n      </Form.Section.Toolbar>\n    </Form.Section.ViewContainer>\n  </Form.Section>,\n)\n"})}),"\n",(0,i.jsx)(e.h2,{children:"Accessibility"}),"\n",(0,i.jsxs)(e.p,{children:["The ",(0,i.jsx)(e.code,{children:"ViewContainer"})," component has an ",(0,i.jsx)(e.code,{children:"aria-label"})," attribute, which is set to the ",(0,i.jsx)(e.code,{children:"title"})," property value. It uses a section element to wrap the content, which helps users with screen readers to get the needed announcement."]}),"\n",(0,i.jsx)(e.p,{children:"When the item (view and edit) container gets removed, the active element focus will be set on the previous item."})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,a.ah)(),n.components);return e?(0,i.jsx)(e,Object.assign({},n,{children:(0,i.jsx)(o,n)})):o(n)}},38254:function(n,e,t){t.r(e),t.d(e,{AllFieldsRequired:function(){return c},BasicViewAndEditContainer:function(){return d},NestedPathSection:function(){return r},NestedSections:function(){return F},OverwriteProps:function(){return l},SchemaSupport:function(){return u},ViewAndEditContainer:function(){return s},ViewAndEditContainerValidation:function(){return m},WithVisibility:function(){return h},WithoutDataContext:function(){return o}});var i=t(41404),a=t(52322);const o=()=>(0,a.jsx)(i.Z,{children:"<Form.Section\n  data={{\n    myField: 'Value',\n  }}\n  onChange={console.log}\n>\n  <Field.String path=\"/myField\" />\n</Form.Section>\n"}),r=()=>(0,a.jsx)(i.Z,{noInline:!0,children:'const MyNameSection = (props: SectionProps) => {\n  return (\n    <Form.Section {...props}>\n      <Form.Card>\n        <Field.Name.First path="/firstName" />\n        <Field.Name.Last path="/lastName" />\n      </Form.Card>\n    </Form.Section>\n  )\n}\nrender(\n  <Form.Handler\n    onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    defaultData={{\n      nestedPath: {\n        firstName: \'Nora\',\n        lastName: \'Mørk\',\n      },\n    }}\n  >\n    <MyNameSection path="/nestedPath" />\n    <Form.SubmitButton variant="send" />\n  </Form.Handler>,\n)\n'}),s=()=>(0,a.jsx)(i.Z,{"data-visual-test":"view-and-edit-container",hideCode:!0,noInline:!0,children:'const MyEditContainer = () => {\n  return (\n    <Form.Section.EditContainer>\n      <Field.Name.First path="/firstName" />\n      <Field.Name.Last path="/lastName" />\n    </Form.Section.EditContainer>\n  )\n}\nconst MyViewContainer = () => {\n  return (\n    <Form.Section.ViewContainer>\n      <Value.SummaryList>\n        <Value.Name.First path="/firstName" />\n        <Value.Name.Last path="/lastName" />\n      </Value.SummaryList>\n    </Form.Section.ViewContainer>\n  )\n}\nrender(\n  <Form.Handler\n    onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    defaultData={{\n      nestedPath: {\n        firstName: \'Nora\',\n        lastName: \'Mørk\',\n      },\n    }}\n  >\n    <Form.Card>\n      <Form.SubHeading>Your account</Form.SubHeading>\n      <Form.Section path="/nestedPath" required>\n        <MyEditContainer />\n        <MyViewContainer />\n      </Form.Section>\n    </Form.Card>\n    <Form.SubmitButton />\n  </Form.Handler>,\n)\n'}),m=()=>(0,a.jsx)(i.Z,{hideCode:!0,noInline:!0,children:'const MyEditContainer = () => {\n  return (\n    <Form.Section.EditContainer>\n      <Field.Name.First path="/firstName" />\n      <Field.Name.Last path="/lastName" />\n    </Form.Section.EditContainer>\n  )\n}\nconst MyViewContainer = () => {\n  return (\n    <Form.Section.ViewContainer>\n      <Value.SummaryList>\n        <Value.Name.First path="/firstName" />\n        <Value.Name.Last path="/lastName" />\n      </Value.SummaryList>\n    </Form.Section.ViewContainer>\n  )\n}\nrender(\n  <Form.Handler\n    onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    defaultData={{\n      nestedPath: {\n        firstName: \'Nora\',\n        lastName: undefined, // initiate error\n      },\n    }}\n  >\n    <Form.Card>\n      <Form.SubHeading>Your account</Form.SubHeading>\n      <Form.Section path="/nestedPath" required validateInitially>\n        <MyEditContainer />\n        <MyViewContainer />\n      </Form.Section>\n    </Form.Card>\n    <Form.SubmitButton />\n  </Form.Handler>,\n)\n'}),d=()=>(0,a.jsx)(i.Z,{"data-visual-test":"basic-view-and-edit-container",hideCode:!0,noInline:!0,children:'const MyEditContainer = () => {\n  return (\n    <Form.Section.EditContainer variant="basic">\n      <Field.Name.First path="/firstName" />\n      <Field.Name.Last path="/lastName" />\n    </Form.Section.EditContainer>\n  )\n}\nconst MyViewContainer = () => {\n  return (\n    <Form.Section.ViewContainer variant="basic">\n      <Value.SummaryList>\n        <Value.Name.First path="/firstName" />\n        <Value.Name.Last path="/lastName" />\n      </Value.SummaryList>\n    </Form.Section.ViewContainer>\n  )\n}\nrender(\n  <Form.Handler\n    onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    defaultData={{\n      nestedPath: {\n        firstName: \'Nora\',\n        lastName: \'Mørk\',\n      },\n    }}\n  >\n    <Form.Card>\n      <Form.SubHeading>Your account</Form.SubHeading>\n      <Form.Section path="/nestedPath" required>\n        <MyEditContainer />\n        <MyViewContainer />\n      </Form.Section>\n    </Form.Card>\n    <Form.SubmitButton />\n  </Form.Handler>,\n)\n'}),l=()=>(0,a.jsx)(i.Z,{noInline:!0,children:'const MyNameSection = (props) => {\n  return (\n    <Form.Section {...props}>\n      <Form.Card>\n        <Field.Composition width="large">\n          <Field.Name.First path="/firstName" />\n          <Field.Name.Last path="/lastName" required minLength={10} />\n        </Field.Composition>\n      </Form.Card>\n    </Form.Section>\n  )\n}\nrender(\n  <Form.Handler\n    onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    defaultData={{\n      nestedPath: {\n        firstName: \'\',\n        lastName: \'M\',\n      },\n    }}\n  >\n    <MyNameSection\n      path="/nestedPath"\n      overwriteProps={{\n        firstName: {\n          required: true,\n          label: \'Custom\',\n        },\n        lastName: {\n          required: false,\n          minLength: 2,\n        },\n      }}\n    />\n    <Form.SubmitButton variant="send" />\n  </Form.Handler>,\n)\n'}),c=()=>(0,a.jsx)(i.Z,{noInline:!0,children:'const MyNameSection = (props: SectionProps) => {\n  return (\n    <Form.Section {...props}>\n      <Form.Card>\n        <Field.Composition width="large">\n          <Field.Name.First path="/firstName" />\n          <Field.Name.Last path="/lastName" />\n        </Field.Composition>\n      </Form.Card>\n    </Form.Section>\n  )\n}\nconst schema: JSONSchema = {\n  type: \'object\',\n  required: [\'myRequiredSection\'],\n}\nrender(\n  <Flex.Stack>\n    <Form.Handler onSubmit={async (data) => console.log(\'onSubmit\', data)}>\n      <MyNameSection required />\n      <Form.SubmitButton variant="send" />\n    </Form.Handler>\n\n    <Form.Handler\n      onSubmit={async (data) => console.log(\'onSubmit\', data)}\n      schema={schema}\n    >\n      <MyNameSection path="/myRequiredSection" />\n      <Form.SubmitButton variant="send" />\n    </Form.Handler>\n  </Flex.Stack>,\n)\n'}),u=()=>(0,a.jsx)(i.Z,{noInline:!0,children:"const MyNameSection = (props: SectionProps) => {\n  return (\n    <Form.Section {...props}>\n      <Form.Card>\n        <Field.Composition width=\"large\">\n          <Field.Name.First path=\"/firstName\" />\n          <Field.Name.Last path=\"/lastName\" required minLength={10} />\n        </Field.Composition>\n      </Form.Card>\n    </Form.Section>\n  )\n}\nconst mySchema: JSONSchema = {\n  type: 'object',\n  properties: {\n    nestedPath: {\n      type: 'object',\n      properties: {\n        firstName: {\n          type: 'string',\n          minLength: 3,\n        },\n        lastName: {\n          type: 'string',\n          minLength: 2,\n        },\n      },\n      required: ['firstName', 'lastName'],\n    },\n  },\n}\nrender(\n  <Form.Handler\n    onSubmit={async (data) => console.log('onSubmit', data)}\n    schema={mySchema}\n    defaultData={{\n      nestedPath: {\n        firstName: '',\n        lastName: 'M',\n      },\n    }}\n  >\n    <MyNameSection path=\"/nestedPath\" />\n    <Form.SubmitButton variant=\"send\" />\n  </Form.Handler>,\n)\n"}),h=()=>(0,a.jsx)(i.Z,{noInline:!0,children:'const MySection = ({ children, ...props }) => {\n  return (\n    <Form.Section {...props}>\n      <Form.Card>\n        <Field.Boolean\n          label="Are you sure?"\n          variant="buttons"\n          path="/iAmSure"\n        />\n        <Form.Visibility pathTrue="/iAmSure" animate>\n          <Field.Selection\n            label="Choose"\n            variant="radio"\n            path="/mySelection"\n          >\n            <Field.Option value="less" title="Less" />\n            <Field.Option value="more" title="More" />\n          </Field.Selection>\n\n          <Form.Visibility\n            visibleWhen={{\n              path: \'/mySelection\',\n              hasValue: \'more\',\n            }}\n            animate\n          >\n            <Field.String label="My String" path="/myString" />\n          </Form.Visibility>\n        </Form.Visibility>\n\n        {children}\n      </Form.Card>\n\n      <Tools.Log />\n    </Form.Section>\n  )\n}\nrender(\n  <Form.Handler\n    onChange={console.log}\n    defaultData={{\n      nestedPath: {\n        iAmSure: false,\n        mySelection: \'less\',\n        myString: \'has a value\',\n      },\n    }}\n  >\n    <MySection path="/nestedPath">\n      <Form.Visibility\n        visibleWhen={{\n          path: \'/myString\',\n          hasValue: (value) => value !== \'has a value\',\n        }}\n        animate\n      >\n        <P>\n          Result: <Value.String path="/nestedPath/myString" inline />\n        </P>\n      </Form.Visibility>\n    </MySection>\n  </Form.Handler>,\n)\n'}),F=()=>(0,a.jsx)(i.Z,{noInline:!0,children:'render(\n  <Form.Handler\n    onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    defaultData={{\n      nestedPath: {\n        name: {\n          first: \'Nora\',\n          last: \'Mørk\',\n        },\n        address: {\n          street: \'Strøget\',\n          nr: \'\',\n        },\n      },\n    }}\n  >\n    <MySection path="/nestedPath" required />\n    <Form.SubmitButton variant="send" />\n  </Form.Handler>,\n)\nfunction MySection(props: SectionProps) {\n  return (\n    <Form.Section {...props}>\n      <Form.Card>\n        <MyNameSection path="/name" />\n        <MyAddressSection path="/address" />\n        <MyValueSection />\n      </Form.Card>\n    </Form.Section>\n  )\n}\nfunction MyNameSection(props: SectionProps) {\n  return (\n    <Form.Section {...props}>\n      <Field.Composition width="large">\n        <Field.Name.First path="/first" />\n        <Field.Name.Last path="/last" />\n      </Field.Composition>\n    </Form.Section>\n  )\n}\nfunction MyAddressSection(props: SectionProps) {\n  return (\n    <Form.Section {...props}>\n      <Field.Composition width="large">\n        <Field.String label="Gateadresse" path="/street" width="stretch" />\n        <Field.String label="Nr." path="/nr" width="small" />\n      </Field.Composition>\n    </Form.Section>\n  )\n}\nfunction MyValueSection(props: SectionProps) {\n  return (\n    <Form.Section {...props}>\n      <Value.SummaryList>\n        <Form.Section path="/name">\n          <Value.Composition gap="small">\n            <Value.Name.First path="/first" />\n            <Value.Name.Last path="/last" />\n          </Value.Composition>\n        </Form.Section>\n\n        <Form.Section path="/address">\n          <Value.Composition gap="small">\n            <Value.String label="Gateadresse" path="/street" />\n            <Value.String label="Nr." path="/nr" placeholder="–" />\n          </Value.Composition>\n        </Form.Section>\n      </Value.SummaryList>\n    </Form.Section>\n  )\n}\n'})}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-form-section-view-container-mdx-cfeecb8efb8ef5d612a3.js.map