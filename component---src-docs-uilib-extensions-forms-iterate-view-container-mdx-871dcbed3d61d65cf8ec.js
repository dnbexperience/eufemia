"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[63668,13618,36262],{10881:function(n,e,t){t.r(e);var a=t(52322),r=t(45392),i=t(40190),o=t(38071);function l(n){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.default,{}),"\n",(0,a.jsx)(o.default,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,a.jsx)(e,Object.assign({},n,{children:(0,a.jsx)(l,n)})):l()}},38071:function(n,e,t){t.r(e),t.d(e,{default:function(){return s}});var a={};t.r(a),t.d(a,{ViewAndEditContainer:function(){return o.ViewAndEditContainer}});var r=t(52322),i=t(45392),o=t(22939);function l(n){const e=Object.assign({h2:"h2"},(0,i.ah)(),n.components);return a||m("Examples",!1),o.ViewAndEditContainer||m("Examples.ViewAndEditContainer",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h2,{children:"Demos"}),"\n",(0,r.jsx)(o.ViewAndEditContainer,{})]})}var s=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(l,n)})):l(n)};function m(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}},40190:function(n,e,t){t.r(e);var a=t(52322),r=t(45392);function i(n){const e=Object.assign({h2:"h2",p:"p",code:"code",a:"a",pre:"pre"},(0,r.ah)(),n.components);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.h2,{children:"Description"}),"\n",(0,a.jsxs)(e.p,{children:[(0,a.jsx)(e.code,{children:"Iterate.ViewContainer"})," enables users to toggle (with animation) the content of each item between this view and the ",(0,a.jsx)(e.a,{href:"/uilib/extensions/forms/Iterate/EditContainer/",children:"EditContainer"})," container. It can be used instead of the ",(0,a.jsx)(e.a,{href:"/uilib/extensions/forms/Iterate/AnimatedContainer/",children:"AnimatedContainer"}),"."]}),"\n",(0,a.jsxs)(e.p,{children:["By default, it features the ",(0,a.jsx)(e.a,{href:"/uilib/extensions/forms/Iterate/Toolbar/",children:"Toolbar"}),' containing a "Edit" button and a ',(0,a.jsx)(e.a,{href:"/uilib/extensions/forms/Iterate/RemoveButton/",children:"RemoveButton"}),' button. The "Remove" will delete the current item from the array.']}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-tsx",children:'import { Iterate, Field, Value } from \'@dnb/eufemia/extensions/forms\'\n\nrender(\n  <Iterate.Array>\n    <Iterate.EditContainer\n      title="Edit account holder"\n      titleWhenNew="New account holder"\n    >\n      <Field.Name.Last itemPath="/name" />\n    </Iterate.EditContainer>\n\n    <Iterate.ViewContainer title="Account holder">\n      <Value.Name.Last itemPath="/name" />\n    </Iterate.ViewContainer>\n  </Iterate.Array>,\n)\n'})}),"\n",(0,a.jsx)(e.h2,{children:"The item number in the title"}),"\n",(0,a.jsxs)(e.p,{children:["You can use the ",(0,a.jsx)(e.code,{children:"{itemNr}"})," variable in the ",(0,a.jsx)(e.code,{children:"title"})," property to display the current item number."]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-tsx",children:'import { Iterate, Field, Value } from \'@dnb/eufemia/extensions/forms\'\n\nrender(\n  <Iterate.Array>\n    <Iterate.ViewContainer title="Account holder {itemNr}">\n      <Value.Name.Last itemPath="/name" />\n    </Iterate.ViewContainer>\n  </Iterate.Array>,\n)\n'})}),"\n",(0,a.jsx)(e.h2,{children:"Accessibility"}),"\n",(0,a.jsxs)(e.p,{children:["The ",(0,a.jsx)(e.code,{children:"Iterate.ViewContainer"})," component has an ",(0,a.jsx)(e.code,{children:"aria-label"})," attribute, which is set to the ",(0,a.jsx)(e.code,{children:"title"})," prop value. It uses a section element to wrap the content, which helps users with screen readers to get the needed announcement."]}),"\n",(0,a.jsx)(e.p,{children:"When the item (view and edit) container gets removed, the active element focus will be set on the previous item."})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,a.jsx)(e,Object.assign({},n,{children:(0,a.jsx)(i,n)})):i(n)}},40730:function(n,e,t){t.r(e),t.d(e,{Default:function(){return i}});var a=t(64368),r=t(52322);const i=()=>(0,r.jsx)(a.Z,{noInline:!0,children:'const MyForm = () => {\n  const { count } = Iterate.useCount(\'myForm\')\n  return (\n    <Form.Handler\n      defaultData={{\n        myList: [\'Item 1\'],\n      }}\n      id="myForm"\n    >\n      <Card stack>\n        <Iterate.Array path="/myList" placeholder={<>Empty list</>}>\n          <Iterate.AnimatedContainer title="Title {itemNr}">\n            <Field.String label="Label" itemPath="/" />\n\n            <Iterate.Toolbar>\n              <Iterate.RemoveButton />\n            </Iterate.Toolbar>\n          </Iterate.AnimatedContainer>\n        </Iterate.Array>\n\n        <Iterate.PushButton\n          path="/myList"\n          pushValue={\'Item \' + String(count(\'/myList\') + 1)}\n          text="Add new item"\n        />\n      </Card>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'})},22939:function(n,e,t){t.r(e),t.d(e,{AnimatedContainer:function(){return o.Default},ArrayFromFormHandler:function(){return p},DynamicPathValue:function(){return x},ObjectItems:function(){return u},PrimitiveItemsFields:function(){return l},PrimitiveItemsValues:function(){return s},RenderPropsObjectItems:function(){return h},RenderPropsPrimitiveItems:function(){return c},ValueComposition:function(){return m},ViewAndEditContainer:function(){return I},WithTable:function(){return d},WithVisibility:function(){return y}});var a=t(64368),r=t(6771),i=t(52322),o=t(40730);const l=()=>(0,i.jsx)(a.Z,{children:"<Iterate.Array\n  value={['Iron Man', 'Captain America', 'The Hulk']}\n  onChange={console.log}\n>\n  <Field.String itemPath=\"/\" />\n</Iterate.Array>\n"}),s=()=>(0,i.jsx)(a.Z,{"data-visual-test":"primitive-element-values",children:"<Value.SummaryList>\n  <Iterate.Array value={['Iron Man', 'Captain America', 'The Hulk']}>\n    <Value.String itemPath=\"/\" />\n  </Iterate.Array>\n</Value.SummaryList>\n"}),m=()=>(0,i.jsx)(a.Z,{children:"<Value.Composition>\n  <Iterate.Array\n    value={[\n      {\n        label: 'Label A',\n        value: 'value 1',\n      },\n      {\n        label: 'Label B',\n        value: 'value 2',\n      },\n    ]}\n  >\n    <Value.String\n      label={<Value.String itemPath=\"/label\" />}\n      itemPath=\"/value\"\n    />\n  </Iterate.Array>\n</Value.Composition>\n"}),d=()=>(0,i.jsx)(a.Z,{children:"<Table>\n  <thead>\n    <Tr>\n      <Th>Name</Th>\n      <Th>Age</Th>\n    </Tr>\n  </thead>\n  <tbody>\n    <Iterate.Array\n      withoutFlex\n      value={[\n        {\n          name: 'Iron Man',\n          age: 45,\n        },\n        {\n          name: 'Captain America',\n          age: 123,\n        },\n        {\n          name: 'The Hulk',\n          age: 3337,\n        },\n      ]}\n    >\n      <Tr>\n        <Td>\n          <Value.Name.Last itemPath=\"/name\" />\n        </Td>\n        <Td>\n          <Value.Number itemPath=\"/age\" />\n        </Td>\n      </Tr>\n    </Iterate.Array>\n  </tbody>\n</Table>\n"}),u=()=>(0,i.jsx)(a.Z,{scope:{Value:r},children:"<Iterate.Array\n  value={[\n    {\n      accountName: 'Brukskonto',\n      accountNumber: '90901134567',\n    },\n    {\n      accountName: 'Sparekonto',\n      accountNumber: '90901156789',\n    },\n  ]}\n  onChange={(value) => console.log('onChange', value)}\n>\n  <Field.Composition>\n    <Field.BankAccountNumber itemPath=\"/accountNumber\" />\n    <Field.String label=\"Account name\" itemPath=\"/accountName\" />\n  </Field.Composition>\n</Iterate.Array>\n"}),c=()=>(0,i.jsx)(a.Z,{children:"<Iterate.Array\n  value={['foo', 'bar']}\n  onChange={(value) => console.log('onChange', value)}\n>\n  {(elementValue) => <Field.String value={elementValue} />}\n</Iterate.Array>\n"}),h=()=>(0,i.jsx)(a.Z,{children:"<Iterate.Array\n  value={[\n    {\n      num: 1,\n      txt: 'One',\n    },\n    {\n      num: 2,\n      txt: 'Two',\n    },\n  ]}\n  onChange={(value) => console.log('onChange', value)}\n>\n  {({ num, txt }) => (\n    <Field.Composition width=\"large\">\n      <Field.Number value={num} width=\"small\" />\n      <Field.String value={txt} width={false} />\n    </Field.Composition>\n  )}\n</Iterate.Array>\n"}),p=()=>(0,i.jsx)(a.Z,{"data-visual-test":"animated-container",children:'<Form.Handler\n  data={{\n    avengers: [\n      {\n        nickname: \'Iron Man\',\n        firstName: \'Tony\',\n        lastName: \'Stark\',\n      },\n      {\n        nickname: \'Captain America\',\n        firstName: \'Steve\',\n        lastName: \'Rogers\',\n      },\n    ],\n  }}\n  onChange={(data) => console.log(\'DataContext/onChange\', data)}\n>\n  <Flex.Vertical>\n    <Form.MainHeading>Avengers</Form.MainHeading>\n\n    <Card stack>\n      <Iterate.Array\n        path="/avengers"\n        onChange={(value) => console.log(\'Iterate/onChange\', value)}\n      >\n        <Iterate.AnimatedContainer\n          title={\n            <Value.String\n              label={false}\n              itemPath="/nickname"\n              placeholder="A Nick name"\n            />\n          }\n        >\n          <Field.Name\n            itemPath="/nickname"\n            width="medium"\n            label="Nick name"\n          />\n\n          <Field.Composition>\n            <Field.Name.First itemPath="/firstName" width="medium" />\n            <Field.Name.Last itemPath="/lastName" width="medium" />\n          </Field.Composition>\n\n          <Iterate.Toolbar>\n            <Iterate.RemoveButton />\n          </Iterate.Toolbar>\n        </Iterate.AnimatedContainer>\n      </Iterate.Array>\n\n      <Iterate.PushButton\n        text="Add another avenger"\n        path="/avengers"\n        pushValue={{}}\n      />\n    </Card>\n  </Flex.Vertical>\n</Form.Handler>\n'}),I=()=>(0,i.jsx)(a.Z,{"data-visual-test":"view-and-edit-container",noInline:!0,children:'const MyEditItemForm = () => {\n  return (\n    <Field.Composition>\n      <Field.Name.First itemPath="/firstName" width="medium" />\n      <Field.Name.Last itemPath="/lastName" width="medium" required />\n    </Field.Composition>\n  )\n}\nconst MyEditItem = () => {\n  return (\n    <Iterate.EditContainer\n      title="Edit account holder {itemNr}"\n      titleWhenNew="New account holder {itemNr}"\n    >\n      <MyEditItemForm />\n    </Iterate.EditContainer>\n  )\n}\nconst MyViewItem = () => {\n  const item = Iterate.useItem()\n  console.log(\'index:\', item.index)\n  return (\n    <Iterate.ViewContainer title="Account holder {itemNr}">\n      <Value.SummaryList>\n        <Value.Name.First itemPath="/firstName" showEmpty />\n        <Value.Name.Last itemPath="/lastName" placeholder="-" />\n      </Value.SummaryList>\n    </Iterate.ViewContainer>\n  )\n}\nconst CreateNewEntry = () => {\n  return (\n    <Iterate.PushContainer\n      path="/accounts"\n      title="New account holder"\n      openButton={\n        <Iterate.PushContainer.OpenButton text="Add another account" />\n      }\n      showOpenButtonWhen={(list) => list.length > 0}\n    >\n      <MyEditItemForm />\n    </Iterate.PushContainer>\n  )\n}\nconst MyForm = () => {\n  return (\n    <Form.Handler\n      data={{\n        accounts: [\n          {\n            firstName: \'Tony\',\n            lastName: undefined, // initiate error\n          },\n        ],\n      }}\n      onChange={(data) => console.log(\'DataContext/onChange\', data)}\n      onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    >\n      <Flex.Vertical>\n        <Form.MainHeading>Accounts</Form.MainHeading>\n\n        <Card stack>\n          <Iterate.Array path="/accounts">\n            <MyViewItem />\n            <MyEditItem />\n          </Iterate.Array>\n\n          <CreateNewEntry />\n        </Card>\n\n        <Form.SubmitButton variant="send" />\n      </Flex.Vertical>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'}),x=()=>(0,i.jsx)(a.Z,{children:'<Form.Handler\n  defaultData={{\n    count: 0,\n  }}\n>\n  <Flex.Stack>\n    <Field.Number path="/count" width="small" showStepControls />\n    <Iterate.Array\n      path="/items"\n      countPath="/count"\n      countPathTransform={({ value, index }) =>\n        Object.prototype.hasOwnProperty.call(value || {}, \'myObject\')\n          ? value\n          : {\n              myObject: index,\n            }\n      }\n    >\n      <Field.Number itemPath="/myObject" label="Item no. {itemNr}" />\n    </Iterate.Array>\n  </Flex.Stack>\n</Form.Handler>\n'}),y=()=>(0,i.jsx)(a.Z,{children:'<Form.Handler>\n  <Iterate.Array path="/myList" value={[{}]}>\n    <Flex.Stack>\n      <Field.Name.First className="firstName" itemPath="/firstName" />\n\n      <Form.Visibility\n        animate\n        visibleWhen={{\n          itemPath: \'/firstName\',\n          hasValue: (value) => Boolean(value),\n        }}\n      >\n        <Field.Name.Last className="lastName" itemPath="/lastName" />\n      </Form.Visibility>\n    </Flex.Stack>\n  </Iterate.Array>\n</Form.Handler>\n'})}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-iterate-view-container-mdx-871dcbed3d61d65cf8ec.js.map