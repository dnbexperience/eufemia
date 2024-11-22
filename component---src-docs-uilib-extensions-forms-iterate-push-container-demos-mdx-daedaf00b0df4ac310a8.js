"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[11805],{96658:function(n,e,t){t.r(e),t.d(e,{default:function(){return c}});var a={};t.r(a),t.d(a,{InitiallyOpen:function(){return d},IsolatedData:function(){return m},ViewAndEditContainer:function(){return l.ViewAndEditContainer}});var r=t(52322),i=t(45392),o=t(4902),s=t(46832),l=(t(2784),t(22939));const d=()=>(0,r.jsx)(s.Z,{noInline:!0,children:'const MyEditItemForm = () => {\n  return (\n    <Field.Composition>\n      <Field.Name.First itemPath="/firstName" width="medium" />\n      <Field.Name.Last itemPath="/lastName" width="medium" required />\n    </Field.Composition>\n  )\n}\nconst MyEditItem = () => {\n  return (\n    <Iterate.EditContainer\n      title="Edit account holder {itemNo}"\n      titleWhenNew="New account holder {itemNo}"\n    >\n      <MyEditItemForm />\n    </Iterate.EditContainer>\n  )\n}\nconst MyViewItem = () => {\n  const item = Iterate.useItem()\n  console.log(\'index:\', item.index)\n  return (\n    <Iterate.ViewContainer title="Account holder {itemNo}">\n      <Value.SummaryList>\n        <Value.Name.First itemPath="/firstName" showEmpty />\n        <Value.Name.Last itemPath="/lastName" placeholder="-" />\n      </Value.SummaryList>\n    </Iterate.ViewContainer>\n  )\n}\nconst CreateNewEntry = () => {\n  return (\n    <Iterate.PushContainer\n      path="/accounts"\n      title="New account holder"\n      openButton={\n        <Iterate.PushContainer.OpenButton text="Add another account" />\n      }\n      showOpenButtonWhen={(list) => list.length > 0}\n    >\n      <MyEditItemForm />\n    </Iterate.PushContainer>\n  )\n}\nconst MyForm = () => {\n  return (\n    <Form.Handler\n      onChange={(data) => console.log(\'DataContext/onChange\', data)}\n      onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    >\n      <Flex.Stack>\n        <Form.MainHeading>Accounts</Form.MainHeading>\n\n        <Form.Card>\n          <Iterate.Array path="/accounts">\n            <MyViewItem />\n            <MyEditItem />\n          </Iterate.Array>\n\n          <CreateNewEntry />\n        </Form.Card>\n\n        <Form.SubmitButton variant="send" />\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'}),m=()=>(0,r.jsx)(s.Z,{scope:{Tools:o},noInline:!0,children:'const formData = {\n  persons: [\n    {\n      firstName: \'Ola\',\n      lastName: \'Nordmann\',\n    },\n    {\n      firstName: \'Kari\',\n      lastName: \'Nordmann\',\n    },\n    {\n      firstName: \'Per\',\n      lastName: \'Hansen\',\n    },\n  ],\n}\nfunction RepresentativesView() {\n  return (\n    <Iterate.ViewContainer>\n      <Value.Composition>\n        <Value.String itemPath="/firstName" />\n        <Value.String itemPath="/lastName" />\n      </Value.Composition>\n    </Iterate.ViewContainer>\n  )\n}\nfunction RepresentativesEdit() {\n  return (\n    <Iterate.EditContainer>\n      <Field.Name.First itemPath="/firstName" />\n      <Field.Name.Last itemPath="/lastName" />\n    </Iterate.EditContainer>\n  )\n}\nfunction ExistingPersonDetails() {\n  const { data, getValue } = Form.useData()\n  const person = getValue(data.selectedPerson)?.data || {}\n  return (\n    <Flex.Stack>\n      <Field.Name.First\n        readOnly\n        itemPath="/firstName"\n        value={person.firstName}\n      />\n      <Field.Name.Last\n        readOnly\n        itemPath="/lastName"\n        value={person.lastName}\n      />\n    </Flex.Stack>\n  )\n}\nfunction NewPersonDetails() {\n  return (\n    <Flex.Stack>\n      <Field.Name.First required itemPath="/firstName" />\n      <Field.Name.Last required itemPath="/lastName" />\n    </Flex.Stack>\n  )\n}\nfunction PushContainerContent() {\n  const { data, update } = Form.useData()\n\n  // Clear the PushContainer data when the selected person is "other",\n  // so the fields do not inherit existing data.\n  React.useLayoutEffect(() => {\n    if (data.selectedPerson === \'other\') {\n      update(\'/pushContainerItems/0\', {})\n    }\n  }, [data.selectedPerson, update])\n  return (\n    <Flex.Stack>\n      <Field.Selection\n        variant="radio"\n        required\n        path="/selectedPerson"\n        dataPath="/persons"\n      >\n        <Field.Option value="other" label="Other person" />\n      </Field.Selection>\n      <Form.Visibility\n        visibleWhen={{\n          path: \'/selectedPerson\',\n          hasValue: (value) =>\n            typeof value === \'string\' && value !== \'other\',\n        }}\n      >\n        <ExistingPersonDetails />\n      </Form.Visibility>\n\n      <Form.Visibility\n        visibleWhen={{\n          path: \'/selectedPerson\',\n          hasValue: (value) => value === \'other\',\n        }}\n      >\n        <NewPersonDetails />\n      </Form.Visibility>\n    </Flex.Stack>\n  )\n}\nfunction RepresentativesCreateNew() {\n  return (\n    <Iterate.PushContainer\n      path="/representatives"\n      title="Add new representative"\n      isolatedData={{\n        persons: formData.persons.map((data, i) => {\n          return {\n            title: [data.firstName, data.lastName].join(\' \'),\n            value: \'/persons/\' + i,\n            data,\n          }\n        }),\n      }}\n      openButton={\n        <Iterate.PushContainer.OpenButton\n          variant="tertiary"\n          text="Add new representative"\n        />\n      }\n      showOpenButtonWhen={(list) => list.length > 0}\n    >\n      <PushContainerContent />\n    </Iterate.PushContainer>\n  )\n}\nrender(\n  <Form.Handler>\n    <Form.MainHeading>Representatives</Form.MainHeading>\n    <Flex.Stack>\n      <Form.Card>\n        <Iterate.Array path="/representatives">\n          <RepresentativesView />\n          <RepresentativesEdit />\n        </Iterate.Array>\n        <RepresentativesCreateNew />\n      </Form.Card>\n\n      <Form.Card>\n        <Form.SubHeading>Data Context</Form.SubHeading>\n        <Tools.Log placeholder="-" />\n      </Form.Card>\n    </Flex.Stack>\n  </Form.Handler>,\n)\n'});function u(n){const e=Object.assign({h2:"h2",h3:"h3",p:"p",code:"code"},(0,i.ah)(),n.components);return a||h("Examples",!1),d||h("Examples.InitiallyOpen",!0),m||h("Examples.IsolatedData",!0),l.ViewAndEditContainer||h("Examples.ViewAndEditContainer",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h2,{children:"Demos"}),"\n",(0,r.jsx)(e.h3,{children:"Initially open"}),"\n",(0,r.jsx)(d,{}),"\n",(0,r.jsx)(e.h3,{children:"With existing data"}),"\n",(0,r.jsx)(l.ViewAndEditContainer,{}),"\n",(0,r.jsx)(e.h3,{children:"Isolated data"}),"\n",(0,r.jsxs)(e.p,{children:["This demo shows how to use the ",(0,r.jsx)(e.code,{children:"isolatedData"})," property to provide data to the PushContainer."]}),"\n",(0,r.jsx)(m,{})]})}var c=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(u,n)})):u(n)};function h(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-iterate-push-container-demos-mdx-daedaf00b0df4ac310a8.js.map