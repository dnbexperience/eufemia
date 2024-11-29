"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[47548,11805,79306],{54889:function(e,n,t){t.r(n);var r=t(52322),a=t(45392),i=t(35896),s=t(96658);function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.default,{}),"\n",(0,r.jsx)(s.default,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(o,e)})):o()}},96658:function(e,n,t){t.r(n),t.d(n,{default:function(){return m}});var r={};t.r(r),t.d(r,{InitiallyOpen:function(){return l},IsolatedData:function(){return h},ViewAndEditContainer:function(){return d.ViewAndEditContainer}});var a=t(52322),i=t(45392),s=t(4902),o=t(46832),d=(t(2784),t(22939));const l=()=>(0,a.jsx)(o.Z,{noInline:!0,children:'const MyEditItemForm = () => {\n  return (\n    <Field.Composition>\n      <Field.Name.First itemPath="/firstName" width="medium" />\n      <Field.Name.Last itemPath="/lastName" width="medium" required />\n    </Field.Composition>\n  )\n}\nconst MyEditItem = () => {\n  return (\n    <Iterate.EditContainer\n      title="Edit account holder {itemNo}"\n      titleWhenNew="New account holder {itemNo}"\n    >\n      <MyEditItemForm />\n    </Iterate.EditContainer>\n  )\n}\nconst MyViewItem = () => {\n  const item = Iterate.useItem()\n  console.log(\'index:\', item.index)\n  return (\n    <Iterate.ViewContainer title="Account holder {itemNo}">\n      <Value.SummaryList>\n        <Value.Name.First itemPath="/firstName" showEmpty />\n        <Value.Name.Last itemPath="/lastName" placeholder="-" />\n      </Value.SummaryList>\n    </Iterate.ViewContainer>\n  )\n}\nconst CreateNewEntry = () => {\n  return (\n    <Iterate.PushContainer\n      path="/accounts"\n      title="New account holder"\n      openButton={\n        <Iterate.PushContainer.OpenButton text="Add another account" />\n      }\n      showOpenButtonWhen={(list) => list.length > 0}\n    >\n      <MyEditItemForm />\n    </Iterate.PushContainer>\n  )\n}\nconst MyForm = () => {\n  return (\n    <Form.Handler\n      onChange={(data) => console.log(\'DataContext/onChange\', data)}\n      onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    >\n      <Flex.Stack>\n        <Form.MainHeading>Accounts</Form.MainHeading>\n\n        <Form.Card>\n          <Iterate.Array path="/accounts">\n            <MyViewItem />\n            <MyEditItem />\n          </Iterate.Array>\n\n          <CreateNewEntry />\n        </Form.Card>\n\n        <Form.SubmitButton variant="send" />\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'}),h=()=>(0,a.jsx)(o.Z,{scope:{Tools:s},noInline:!0,children:'const formData = {\n  persons: [\n    {\n      firstName: \'Ola\',\n      lastName: \'Nordmann\',\n    },\n    {\n      firstName: \'Kari\',\n      lastName: \'Nordmann\',\n    },\n    {\n      firstName: \'Per\',\n      lastName: \'Hansen\',\n    },\n  ],\n}\nfunction RepresentativesView() {\n  return (\n    <Iterate.ViewContainer>\n      <Value.Composition>\n        <Value.String itemPath="/firstName" />\n        <Value.String itemPath="/lastName" />\n      </Value.Composition>\n    </Iterate.ViewContainer>\n  )\n}\nfunction RepresentativesEdit() {\n  return (\n    <Iterate.EditContainer>\n      <Field.Name.First itemPath="/firstName" />\n      <Field.Name.Last itemPath="/lastName" />\n    </Iterate.EditContainer>\n  )\n}\nfunction ExistingPersonDetails() {\n  const { data, getValue } = Form.useData()\n  const person = getValue(data[\'selectedPerson\'])?.data || {}\n  return (\n    <Flex.Stack>\n      <Field.Name.First\n        readOnly\n        itemPath="/firstName"\n        value={person.firstName}\n      />\n      <Field.Name.Last\n        readOnly\n        itemPath="/lastName"\n        value={person.lastName}\n      />\n    </Flex.Stack>\n  )\n}\nfunction NewPersonDetails() {\n  return (\n    <Flex.Stack>\n      <Field.Name.First required itemPath="/firstName" />\n      <Field.Name.Last required itemPath="/lastName" />\n    </Flex.Stack>\n  )\n}\nfunction PushContainerContent() {\n  const { data, update } = Form.useData()\n  const selectedPerson = data[\'selectedPerson\'] // Because of missing TypeScript support\n\n  // Clear the PushContainer data when the selected person is "other",\n  // so the fields do not inherit existing data.\n  React.useLayoutEffect(() => {\n    if (selectedPerson === \'other\') {\n      update(\'/pushContainerItems/0\', {})\n    }\n  }, [selectedPerson, update])\n  return (\n    <Flex.Stack>\n      <Field.Selection\n        variant="radio"\n        required\n        path="/selectedPerson"\n        dataPath="/persons"\n      >\n        <Field.Option value="other" label="Other person" />\n      </Field.Selection>\n      <Form.Visibility\n        visibleWhen={{\n          path: \'/selectedPerson\',\n          hasValue: (value) =>\n            typeof value === \'string\' && value !== \'other\',\n        }}\n      >\n        <ExistingPersonDetails />\n      </Form.Visibility>\n\n      <Form.Visibility\n        visibleWhen={{\n          path: \'/selectedPerson\',\n          hasValue: (value) => value === \'other\',\n        }}\n      >\n        <NewPersonDetails />\n      </Form.Visibility>\n    </Flex.Stack>\n  )\n}\nfunction RepresentativesCreateNew() {\n  return (\n    <Iterate.PushContainer\n      path="/representatives"\n      title="Add new representative"\n      isolatedData={{\n        persons: formData.persons.map((data, i) => {\n          return {\n            title: [data.firstName, data.lastName].join(\' \'),\n            value: \'/persons/\' + i,\n            data,\n          }\n        }),\n      }}\n      openButton={\n        <Iterate.PushContainer.OpenButton\n          variant="tertiary"\n          text="Add new representative"\n        />\n      }\n      showOpenButtonWhen={(list) => list.length > 0}\n    >\n      <PushContainerContent />\n    </Iterate.PushContainer>\n  )\n}\nrender(\n  <Form.Handler>\n    <Form.MainHeading>Representatives</Form.MainHeading>\n    <Flex.Stack>\n      <Form.Card>\n        <Iterate.Array path="/representatives">\n          <RepresentativesView />\n          <RepresentativesEdit />\n        </Iterate.Array>\n        <RepresentativesCreateNew />\n      </Form.Card>\n\n      <Form.Card>\n        <Form.SubHeading>Data Context</Form.SubHeading>\n        <Tools.Log placeholder="-" />\n      </Form.Card>\n    </Flex.Stack>\n  </Form.Handler>,\n)\n'});function c(e){const n=Object.assign({h2:"h2",h3:"h3",p:"p",code:"code"},(0,i.ah)(),e.components);return r||u("Examples",!1),l||u("Examples.InitiallyOpen",!0),h||u("Examples.IsolatedData",!0),d.ViewAndEditContainer||u("Examples.ViewAndEditContainer",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h2,{children:"Demos"}),"\n",(0,a.jsx)(n.h3,{children:"Initially open"}),"\n",(0,a.jsx)(l,{}),"\n",(0,a.jsx)(n.h3,{children:"With existing data"}),"\n",(0,a.jsx)(d.ViewAndEditContainer,{}),"\n",(0,a.jsx)(n.h3,{children:"Isolated data"}),"\n",(0,a.jsxs)(n.p,{children:["This demo shows how to use the ",(0,a.jsx)(n.code,{children:"isolatedData"})," property to provide data to the PushContainer."]}),"\n",(0,a.jsx)(h,{})]})}var m=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,a.jsx)(n,Object.assign({},e,{children:(0,a.jsx)(c,e)})):c(e)};function u(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},35896:function(e,n,t){t.r(n);var r=t(52322),a=t(45392);function i(e){const n=Object.assign({h2:"h2",p:"p",code:"code",a:"a",ul:"ul",li:"li",pre:"pre"},(0,a.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:"Description"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"Iterate.PushContainer"})," enables users to create a new item in the array. It can be used instead of the ",(0,r.jsx)(n.a,{href:"/uilib/extensions/forms/Iterate/PushButton/",children:"PushButton"}),", but with fields in the container."]}),"\n",(0,r.jsx)(n.p,{children:"It allows the user to fill in the fields without storing them in the data context."}),"\n",(0,r.jsx)(n.p,{children:"Good to know:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Fields inside the container must have an ",(0,r.jsx)(n.code,{children:"itemPath"})," defined, instead of a ",(0,r.jsx)(n.code,{children:"path"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:["You can provide ",(0,r.jsx)(n.code,{children:"data"})," or ",(0,r.jsx)(n.code,{children:"defaultData"})," to prefill the fields."]}),"\n",(0,r.jsxs)(n.li,{children:["The ",(0,r.jsx)(n.code,{children:"path"})," you define needs to point to an existing ",(0,r.jsx)(n.a,{href:"/uilib/extensions/forms/Iterate/Array/",children:"Iterate.Array"})," path."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{children:"Usage"}),"\n",(0,r.jsxs)(n.p,{children:["You may place it below the ",(0,r.jsx)(n.a,{href:"/uilib/extensions/forms/Iterate/Array/",children:"Iterate.Array"})," component like this:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:'import { Iterate, Field } from \'@dnb/eufemia/extensions/forms\'\n\nrender(\n  <Form.Handler>\n    <Iterate.Array path="/myList">...</Iterate.Array>\n\n    <Iterate.PushContainer path="/myList" title="New item title">\n      <Field.Name.Last itemPath="/name" />\n    </Iterate.PushContainer>\n  </Form.Handler>,\n)\n'})}),"\n",(0,r.jsx)(n.h2,{children:"Prevent the form from being submitted"}),"\n",(0,r.jsxs)(n.p,{children:["To prevent the ",(0,r.jsx)(n.a,{href:"/uilib/extensions/forms/Form/Handler/",children:"Form.Handler"})," from being submitted when there are fields with errors inside the PushContainer, you can use the ",(0,r.jsx)(n.code,{children:"bubbleValidation"})," property."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:'import { Form, Field, Iterate } from \'@dnb/eufemia/extensions/forms\'\n\nrender(\n  <Form.Handler>\n    <Iterate.Array path="/myList">...</Iterate.Array>\n\n    <Iterate.PushContainer path="/myList" bubbleValidation>\n      <Field.Name.Last itemPath="/name" required />\n    </Iterate.PushContainer>\n  </Form.Handler>,\n)\n'})}),"\n",(0,r.jsx)(n.h2,{children:"Show a button to create a new item"}),"\n",(0,r.jsxs)(n.p,{children:["By default, it keeps the form open after a new item has been created. You can change this behavior by using the ",(0,r.jsx)(n.code,{children:"openButton"})," and ",(0,r.jsx)(n.code,{children:"showOpenButtonWhen"})," properties."]}),"\n",(0,r.jsxs)(n.p,{children:["These properties allow you to render a button (",(0,r.jsx)(n.code,{children:"openButton"}),") and determine when to show it based on the logic provided by the ",(0,r.jsx)(n.code,{children:"showOpenButtonWhen"})," function. The ",(0,r.jsx)(n.code,{children:"showOpenButtonWhen"})," function receives the current list of items as an argument."]}),"\n",(0,r.jsxs)(n.p,{children:["The button will be shown instead of the content provided by the children when the ",(0,r.jsx)(n.code,{children:"showOpenButtonWhen"})," function returns ",(0,r.jsx)(n.code,{children:"true"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:'import { Iterate, Field } from \'@dnb/eufemia/extensions/forms\'\n\nrender(\n  <Form.Handler>\n    <Iterate.Array path="/myList">...</Iterate.Array>\n\n    <Iterate.PushContainer\n      path="/myList"\n      title="New item title"\n      openButton={\n        <Iterate.PushContainer.OpenButton text="Add another item" />\n      }\n      showOpenButtonWhen={(list) => list.length > 0}\n    >\n      Will be hidden based on the showOpenButtonWhen function\n    </Iterate.PushContainer>\n  </Form.Handler>,\n)\n'})}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"Iterate.PushContainer.OpenButton"})," accepts the same properties as the ",(0,r.jsx)(n.a,{href:"/uilib/components/button/",children:"Button"})," component."]}),"\n",(0,r.jsx)(n.h2,{children:"Show the next item number in the open button"}),"\n",(0,r.jsxs)(n.p,{children:["You can use the ",(0,r.jsx)(n.code,{children:"{nextItemNo}"})," variable in the ",(0,r.jsx)(n.code,{children:"text"})," or ",(0,r.jsx)(n.code,{children:"children"})," property to display the next item number."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:'import { Iterate, Field, Value } from \'@dnb/eufemia/extensions/forms\'\n\nrender(\n  <Form.Handler>\n    <Iterate.Array path="/myList">...</Iterate.Array>\n\n    <Iterate.PushContainer\n      path="/myList"\n      title="New item title"\n      openButton={\n        <Iterate.PushContainer.OpenButton text="Add no. {nextItemNo}" />\n      }\n      showOpenButtonWhen={(list) => list.length > 0}\n    >\n      <Field.Name.Last itemPath="/name" />\n    </Iterate.PushContainer>\n  </Form.Handler>,\n)\n'})}),"\n",(0,r.jsx)(n.h2,{children:"Technical details"}),"\n",(0,r.jsxs)(n.p,{children:["Under the hood, it uses the ",(0,r.jsx)(n.a,{href:"/uilib/extensions/forms/Form/Isolation/",children:"Form.Isolation"})," component to isolate the data from the rest of the form. It also uses the the ",(0,r.jsx)(n.a,{href:"/uilib/extensions/forms/Iterate/EditContainer/",children:"EditContainer"})," inside the ",(0,r.jsx)(n.a,{href:"/uilib/extensions/forms/Iterate/Array/",children:"Iterate.Array"})," component to render the fields."]}),"\n",(0,r.jsxs)(n.p,{children:["All fields inside the container will be stored in the data context at this path: ",(0,r.jsx)(n.code,{children:"/pushContainerItems/0"}),"."]})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(i,e)})):i(e)}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-iterate-push-container-mdx-c38b8bf321105cf716fd.js.map