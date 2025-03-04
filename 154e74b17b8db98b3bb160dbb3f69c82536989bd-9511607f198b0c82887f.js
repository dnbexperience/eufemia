"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[33013],{40730:function(n,e,t){t.r(e),t.d(e,{Default:function(){return i}});var a=t(41404),r=t(52322);const i=()=>(0,r.jsx)(a.Z,{noInline:!0,children:'const MyForm = () => {\n  const { count } = Iterate.useCount(\'myForm\')\n  return (\n    <Form.Handler\n      defaultData={{\n        myList: [\'Item 1\'],\n      }}\n      id="myForm"\n    >\n      <Form.Card>\n        <Iterate.Array path="/myList" placeholder={<>Empty list</>}>\n          <Iterate.AnimatedContainer title="Title {itemNo}">\n            <Field.String label="Label" itemPath="/" />\n\n            <Iterate.Toolbar>\n              <Iterate.RemoveButton />\n            </Iterate.Toolbar>\n          </Iterate.AnimatedContainer>\n        </Iterate.Array>\n\n        <Iterate.PushButton\n          path="/myList"\n          pushValue={\'Item \' + String(count(\'/myList\') + 1)}\n          text="Add new item"\n        />\n      </Form.Card>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'})},22939:function(n,e,t){t.r(e),t.d(e,{AnimatedContainer:function(){return u.Default},ArrayFromFormHandler:function(){return y},DynamicPathValue:function(){return V},FilledViewAndEditContainer:function(){return S},InitialOpenWithToolbarVariant:function(){return f},InitiallyOpen:function(){return g},NestedIterate:function(){return E},NestedIterateWithPushContainer:function(){return H},ObjectItems:function(){return I},PrimitiveItemsFields:function(){return d},PrimitiveItemsValues:function(){return s},RenderPropsObjectItems:function(){return C},RenderPropsPrimitiveItems:function(){return F},RequiredWithPushButton:function(){return x},RequiredWithPushContainer:function(){return v},ToolbarVariantMiniumOneItemOneItem:function(){return N},ToolbarVariantMiniumOneItemTwoItems:function(){return A},ValueComposition:function(){return c},ViewAndEditContainer:function(){return p},ViewAndEditContainerWithLineDivider:function(){return P},WithArrayValidator:function(){return w},WithTable:function(){return h},WithVisibility:function(){return b}});var a=t(41404),r=t(14042),i=t(4902),o=t(49406),l=t(96781),m=t(52322),u=t(40730);const d=()=>(0,m.jsx)(a.Z,{children:"<Iterate.Array\n  defaultValue={['Iron Man', 'Captain America', 'The Hulk']}\n  onChange={console.log}\n>\n  <Field.String itemPath=\"/\" />\n</Iterate.Array>\n"}),s=()=>(0,m.jsx)(a.Z,{"data-visual-test":"primitive-element-values",children:"<Value.SummaryList>\n  <Iterate.Array\n    defaultValue={['Iron Man', 'Captain America', 'The Hulk']}\n  >\n    <Value.String itemPath=\"/\" />\n  </Iterate.Array>\n</Value.SummaryList>\n"}),c=()=>(0,m.jsx)(a.Z,{children:"<Value.Composition>\n  <Iterate.Array\n    defaultValue={[\n      {\n        label: 'Label A',\n        value: 'value 1',\n      },\n      {\n        label: 'Label B',\n        value: 'value 2',\n      },\n    ]}\n  >\n    <Value.String\n      label={<Value.String itemPath=\"/label\" />}\n      itemPath=\"/value\"\n    />\n  </Iterate.Array>\n</Value.Composition>\n"}),h=()=>(0,m.jsx)(a.Z,{children:"<Table>\n  <thead>\n    <Tr>\n      <Th>Name</Th>\n      <Th>Age</Th>\n    </Tr>\n  </thead>\n  <tbody>\n    <Iterate.Array\n      withoutFlex\n      defaultValue={[\n        {\n          name: 'Iron Man',\n          age: 45,\n        },\n        {\n          name: 'Captain America',\n          age: 123,\n        },\n        {\n          name: 'The Hulk',\n          age: 3337,\n        },\n      ]}\n    >\n      <Tr>\n        <Td>\n          <Value.Name.Last itemPath=\"/name\" />\n        </Td>\n        <Td>\n          <Value.Number itemPath=\"/age\" />\n        </Td>\n      </Tr>\n    </Iterate.Array>\n  </tbody>\n</Table>\n"}),I=()=>(0,m.jsx)(a.Z,{children:"<Iterate.Array\n  defaultValue={[\n    {\n      accountName: 'Brukskonto',\n      accountNumber: '90901134567',\n    },\n    {\n      accountName: 'Sparekonto',\n      accountNumber: '90901156789',\n    },\n  ]}\n  onChange={(value) => console.log('onChange', value)}\n>\n  <Field.Composition>\n    <Field.BankAccountNumber itemPath=\"/accountNumber\" />\n    <Field.String label=\"Account name\" itemPath=\"/accountName\" />\n  </Field.Composition>\n</Iterate.Array>\n"}),F=()=>(0,m.jsx)(a.Z,{children:"<Iterate.Array\n  defaultValue={['foo', 'bar']}\n  onChange={(value) => console.log('onChange', value)}\n>\n  {(elementValue) => <Field.String value={elementValue} />}\n</Iterate.Array>\n"}),C=()=>(0,m.jsx)(a.Z,{children:"<Iterate.Array\n  defaultValue={[\n    {\n      num: 1,\n      txt: 'One',\n    },\n    {\n      num: 2,\n      txt: 'Two',\n    },\n  ]}\n  onChange={(value) => console.log('onChange', value)}\n>\n  {({ num, txt }) => (\n    <Field.Composition width=\"large\">\n      <Field.Number value={num} width=\"small\" />\n      <Field.String value={txt} width={false} />\n    </Field.Composition>\n  )}\n</Iterate.Array>\n"}),y=()=>(0,m.jsx)(a.Z,{"data-visual-test":"animated-container",children:'<Form.Handler\n  data={{\n    avengers: [\n      {\n        nickname: \'Iron Man\',\n        firstName: \'Tony\',\n        lastName: \'Stark\',\n      },\n      {\n        nickname: \'Captain America\',\n        firstName: \'Steve\',\n        lastName: \'Rogers\',\n      },\n    ],\n  }}\n  onChange={(data) => console.log(\'DataContext/onChange\', data)}\n>\n  <Flex.Stack>\n    <Form.MainHeading>Avengers</Form.MainHeading>\n\n    <Form.Card>\n      <Iterate.Array\n        path="/avengers"\n        onChange={(value) => console.log(\'Iterate/onChange\', value)}\n      >\n        <Iterate.AnimatedContainer\n          title={\n            <Value.String\n              label={false}\n              itemPath="/nickname"\n              placeholder="A Nick name"\n            />\n          }\n        >\n          <Field.Name\n            itemPath="/nickname"\n            width="medium"\n            label="Nick name"\n          />\n\n          <Field.Composition>\n            <Field.Name.First itemPath="/firstName" width="medium" />\n            <Field.Name.Last itemPath="/lastName" width="medium" />\n          </Field.Composition>\n\n          <Iterate.Toolbar>\n            <Iterate.RemoveButton showConfirmDialog />\n          </Iterate.Toolbar>\n        </Iterate.AnimatedContainer>\n      </Iterate.Array>\n\n      <Iterate.PushButton\n        text="Add another avenger"\n        path="/avengers"\n        pushValue={{}}\n      />\n    </Form.Card>\n  </Flex.Stack>\n</Form.Handler>\n'}),p=()=>(0,m.jsx)(a.Z,{"data-visual-test":"view-and-edit-container",noInline:!0,children:'const MyEditItemForm = () => {\n  return (\n    <Field.Composition>\n      <Field.Name.First itemPath="/firstName" width="medium" />\n      <Field.Name.Last itemPath="/lastName" width="medium" required />\n    </Field.Composition>\n  )\n}\nconst MyEditItem = () => {\n  return (\n    <Iterate.EditContainer\n      title="Edit account holder {itemNo}"\n      titleWhenNew="New account holder {itemNo}"\n    >\n      <MyEditItemForm />\n    </Iterate.EditContainer>\n  )\n}\nconst MyViewItem = () => {\n  const item = Iterate.useItem()\n  console.log(\'index:\', item.index)\n  return (\n    <Iterate.ViewContainer title="Account holder {itemNo}">\n      <Value.SummaryList>\n        <Value.Name.First itemPath="/firstName" showEmpty />\n        <Value.Name.Last itemPath="/lastName" placeholder="-" />\n      </Value.SummaryList>\n    </Iterate.ViewContainer>\n  )\n}\nconst CreateNewEntry = () => {\n  return (\n    <Iterate.PushContainer\n      path="/accounts"\n      title="New account holder"\n      openButton={\n        <Iterate.PushContainer.OpenButton text="Add another account" />\n      }\n      showOpenButtonWhen={(list) => list.length > 0}\n    >\n      <MyEditItemForm />\n    </Iterate.PushContainer>\n  )\n}\nconst MyForm = () => {\n  return (\n    <Form.Handler\n      data={{\n        accounts: [\n          {\n            firstName: \'Tony\',\n            lastName: \'Rogers\',\n          },\n        ],\n      }}\n      onChange={(data) => console.log(\'DataContext/onChange\', data)}\n      onSubmit={async (data) => console.log(\'onSubmit\', data)}\n    >\n      <Flex.Stack>\n        <Form.MainHeading>Accounts</Form.MainHeading>\n\n        <Form.Card gap={false}>\n          <Iterate.Array path="/accounts">\n            <MyViewItem />\n            <MyEditItem />\n          </Iterate.Array>\n\n          <CreateNewEntry />\n        </Form.Card>\n\n        <Form.SubmitButton variant="send" />\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'}),V=()=>(0,m.jsx)(a.Z,{children:'<Form.Handler\n  defaultData={{\n    count: 0,\n  }}\n>\n  <Flex.Stack>\n    <Field.Number path="/count" width="small" showStepControls />\n    <Iterate.Array\n      path="/items"\n      countPath="/count"\n      countPathTransform={({ value, index }) => {\n        return \'myObject\' in (value || {})\n          ? value\n          : {\n              myObject: index,\n            }\n      }}\n    >\n      <Field.Number itemPath="/myObject" label="Item no. {itemNo}" />\n    </Iterate.Array>\n  </Flex.Stack>\n</Form.Handler>\n'}),b=()=>(0,m.jsx)(a.Z,{children:'<Form.Handler>\n  <Iterate.Array path="/myList" defaultValue={[{}]}>\n    <Flex.Stack>\n      <Field.Name.First className="firstName" itemPath="/firstName" />\n\n      <Form.Visibility\n        animate\n        visibleWhen={{\n          itemPath: \'/firstName\',\n          hasValue: (value) => Boolean(value),\n        }}\n      >\n        <Field.Name.Last className="lastName" itemPath="/lastName" />\n      </Form.Visibility>\n    </Flex.Stack>\n  </Iterate.Array>\n</Form.Handler>\n'}),g=()=>(0,m.jsx)(a.Z,{scope:{Iterate:r},children:'<Form.Handler required>\n  <Wizard.Container>\n    <Wizard.Step>\n      <Form.Card>\n        <Iterate.Array path="/myList" defaultValue={[{}]}>\n          <Iterate.ViewContainer>\n            <Value.String label="Item {itemNo}" itemPath="/foo" />\n          </Iterate.ViewContainer>\n          <Iterate.EditContainer>\n            <Field.String\n              label="Item {itemNo}"\n              itemPath="/foo"\n              defaultValue="foo"\n            />\n          </Iterate.EditContainer>\n        </Iterate.Array>\n\n        <Iterate.PushButton\n          text="Add"\n          path="/myList"\n          variant="tertiary"\n          pushValue={{}}\n        />\n      </Form.Card>\n\n      <Wizard.Buttons />\n    </Wizard.Step>\n\n    <Wizard.Step>\n      <Iterate.Array path="/myList" defaultValue={[{}]}>\n        <Iterate.EditContainer>\n          <Field.String\n            label="Item {itemNo}"\n            itemPath="/foo"\n            defaultValue="foo"\n          />\n        </Iterate.EditContainer>\n        <Iterate.ViewContainer>\n          <Value.String label="Item {itemNo}" itemPath="/foo" />\n        </Iterate.ViewContainer>\n      </Iterate.Array>\n\n      <Wizard.Buttons />\n    </Wizard.Step>\n  </Wizard.Container>\n\n  <Tools.Log top />\n</Form.Handler>\n'}),f=()=>(0,m.jsx)(a.Z,{scope:{Iterate:r},noInline:!0,children:'const MyForm = () => {\n  const { getCountryNameByIso } = Value.SelectCountry.useCountry()\n  return (\n    <Form.Handler\n      onSubmit={async (data) => console.log(\'onSubmit\', data)}\n      onSubmitRequest={() => console.log(\'onSubmitRequest\')}\n    >\n      <Flex.Stack>\n        <Form.MainHeading>Statsborgerskap</Form.MainHeading>\n\n        <Form.Card>\n          <Iterate.Array\n            path="/countries"\n            defaultValue={[null]}\n            onChangeValidator={(arrayValue) => {\n              const findFirstDuplication = (arr) =>\n                arr.findIndex((e, i) => arr.indexOf(e) !== i)\n              const index = findFirstDuplication(arrayValue)\n              if (index > -1) {\n                return new Error(\n                  \'You cannot have duplicate items: \' +\n                    getCountryNameByIso(String(arrayValue.at(index))),\n                )\n              }\n            }}\n          >\n            <Iterate.ViewContainer toolbarVariant="minimumOneItem">\n              <Value.SelectCountry\n                label="Land du er statsborger i"\n                itemPath="/"\n              />\n            </Iterate.ViewContainer>\n\n            <Iterate.EditContainer toolbarVariant="minimumOneItem">\n              <Field.SelectCountry\n                label="Land du er statsborger i"\n                itemPath="/"\n                required\n              />\n            </Iterate.EditContainer>\n          </Iterate.Array>\n\n          <Iterate.PushButton\n            path="/countries"\n            pushValue={null}\n            text="Legg til flere statsborgerskap"\n          />\n        </Form.Card>\n\n        <Form.SubmitButton variant="send" />\n\n        <Tools.Log />\n      </Flex.Stack>\n    </Form.Handler>\n  )\n}\nrender(<MyForm />)\n'}),N=()=>(0,m.jsx)(a.Z,{hideCode:!0,children:'<Iterate.Array defaultValue={[\'foo\']}>\n  <Iterate.ViewContainer toolbarVariant="minimumOneItem">\n    View Content\n  </Iterate.ViewContainer>\n  <Iterate.EditContainer toolbarVariant="minimumOneItem">\n    Edit Content\n  </Iterate.EditContainer>\n</Iterate.Array>\n'}),A=()=>(0,m.jsx)(a.Z,{hideCode:!0,children:"<Iterate.Array defaultValue={['foo', 'bar']}>\n  <Iterate.ViewContainer toolbarVariant=\"minimumOneItem\">\n    View Content\n  </Iterate.ViewContainer>\n  <Iterate.EditContainer toolbarVariant=\"minimumOneItem\">\n    Edit Content\n  </Iterate.EditContainer>\n</Iterate.Array>\n"}),w=()=>(0,m.jsx)(a.Z,{children:'<Form.Handler\n  defaultData={{\n    items: [\'foo\'],\n  }}\n  onSubmit={async () => console.log(\'onSubmit\')}\n>\n  <Form.Card>\n    <Iterate.Array\n      path="/items"\n      onChangeValidator={(arrayValue) => {\n        if (!(arrayValue && arrayValue.length > 1)) {\n          return new Error(\'You need at least two items\')\n        }\n      }}\n      animate\n    >\n      <Flex.Horizontal align="flex-end">\n        <Field.String\n          label="Item no. {itemNo}"\n          itemPath="/"\n          width="medium"\n          size="medium"\n        />\n        <Iterate.RemoveButton showConfirmDialog />\n      </Flex.Horizontal>\n    </Iterate.Array>\n\n    <Iterate.PushButton top path="/items" pushValue={null} text="Add" />\n    <Form.SubmitButton />\n  </Form.Card>\n</Form.Handler>\n'}),S=()=>(0,m.jsx)(a.Z,{"data-visual-test":"filled-view-and-edit-container",hideCode:!0,noInline:!0,children:'const MyEditItemForm = () => {\n  return (\n    <Flex.Stack>\n      <Field.Name.First itemPath="/firstName" required />\n      <Field.Name.Last itemPath="/lastName" required />\n    </Flex.Stack>\n  )\n}\nconst EditItemToolbar = () => {\n  return (\n    <Iterate.Toolbar>\n      <Flex.Horizontal\n        justify="space-between"\n        style={{\n          width: \'100%\',\n        }}\n      >\n        <Flex.Horizontal gap="large">\n          <Iterate.EditContainer.DoneButton />\n          <Iterate.EditContainer.CancelButton />\n        </Flex.Horizontal>\n        <Iterate.ViewContainer.RemoveButton\n          showConfirmDialog\n          left={false}\n        />\n      </Flex.Horizontal>\n    </Iterate.Toolbar>\n  )\n}\nconst MyEditItem = (props) => {\n  return (\n    <Iterate.EditContainer\n      variant="filled"\n      toolbarVariant="custom"\n      toolbar={<EditItemToolbar />}\n      {...props}\n    >\n      <ValueWithAvatar />\n      <MyEditItemForm />\n    </Iterate.EditContainer>\n  )\n}\nconst CreateNewEntry = () => {\n  return (\n    <Iterate.PushContainer\n      path="/accounts"\n      title="New account holder"\n      variant="filled"\n      openButton={\n        <Iterate.PushContainer.OpenButton text="Add another account" />\n      }\n      showOpenButtonWhen={(list) => list.length > 0}\n    >\n      <MyEditItemForm />\n    </Iterate.PushContainer>\n  )\n}\nconst ValueWithAvatar = () => {\n  const { value } = Iterate.useItem()\n  const firstName = String(value[\'firstName\'] || \'\')\n  return (\n    <Flex.Horizontal align="center">\n      <Avatar.Group label={firstName}>\n        <Avatar>{firstName.substring(0, 1).toUpperCase()}</Avatar>\n      </Avatar.Group>\n      <Value.String itemPath="/firstName" />\n    </Flex.Horizontal>\n  )\n}\nconst MyViewItem = () => {\n  return (\n    <Iterate.ViewContainer\n      variant="filled"\n      toolbarVariant="custom"\n      toolbar={<></>}\n    >\n      <Flex.Horizontal align="center" justify="space-between">\n        <ValueWithAvatar />\n\n        <Iterate.Toolbar>\n          <Iterate.ViewContainer.EditButton />\n        </Iterate.Toolbar>\n      </Flex.Horizontal>\n    </Iterate.ViewContainer>\n  )\n}\nrender(\n  <Form.Handler\n    data={{\n      accounts: [\n        {\n          firstName:\n            \'Tony with long name that maybe will wrap over to a new line\',\n          lastName: \'Last\',\n        },\n        {\n          firstName: \'Maria\',\n          lastName: \'Last\',\n        },\n      ],\n    }}\n    onSubmit={(data) => console.log(\'onSubmit\', data)}\n    onSubmitRequest={() => console.log(\'onSubmitRequest\')}\n  >\n    <Flex.Stack>\n      <Form.MainHeading>Accounts</Form.MainHeading>\n\n      <Form.Card gap={false}>\n        <Iterate.Array path="/accounts" limit={2}>\n          <MyViewItem />\n          <MyEditItem />\n        </Iterate.Array>\n\n        <CreateNewEntry />\n      </Form.Card>\n\n      <Form.SubmitButton variant="send" />\n    </Flex.Stack>\n  </Form.Handler>,\n)\n'}),P=()=>(0,m.jsx)(a.Z,{"data-visual-test":"view-and-edit-container-with-line-divider",hideCode:!0,noInline:!0,children:'const MyEditItem = () => {\n  return (\n    <Iterate.EditContainer variant="basic" divider="line">\n      <Field.Name.First itemPath="/firstName" required />\n      <Field.Name.Last itemPath="/lastName" required />\n    </Iterate.EditContainer>\n  )\n}\nconst MyViewItem = () => {\n  return (\n    <Iterate.ViewContainer variant="basic" divider="line">\n      <Value.Name.First itemPath="/firstName" />\n      <Value.Name.Last itemPath="/lastName" />\n    </Iterate.ViewContainer>\n  )\n}\nrender(\n  <Form.Handler\n    data={{\n      accounts: [\n        {\n          firstName: \'Tony\',\n          lastName: \'Last\',\n        },\n        {\n          firstName: \'Maria\',\n          lastName: \'Last\',\n        },\n      ],\n    }}\n    onSubmit={(data) => console.log(\'onSubmit\', data)}\n    onSubmitRequest={() => console.log(\'onSubmitRequest\')}\n  >\n    <Flex.Stack>\n      <Form.MainHeading>Accounts</Form.MainHeading>\n\n      <Form.Card>\n        <Iterate.Array path="/accounts" divider="line">\n          <MyViewItem />\n          <MyEditItem />\n        </Iterate.Array>\n      </Form.Card>\n\n      <Form.SubmitButton variant="send" />\n    </Flex.Stack>\n  </Form.Handler>,\n)\n'}),x=()=>(0,m.jsx)(a.Z,{children:'<Form.Handler>\n  <Form.Card>\n    <Iterate.Array\n      path="/items"\n      animate\n      required\n      errorMessages={{\n        \'Field.errorRequired\': \'Custom message\',\n      }}\n      validateInitially\n    >\n      <Flex.Horizontal>\n        <Field.String itemPath="/" />\n        <Iterate.RemoveButton />\n      </Flex.Horizontal>\n    </Iterate.Array>\n\n    <Iterate.PushButton\n      path="/items"\n      pushValue="baz"\n      text="Add item to hide error"\n    />\n  </Form.Card>\n\n  <Form.SubmitButton />\n</Form.Handler>\n'}),v=()=>(0,m.jsx)(a.Z,{noInline:!0,children:'const MyViewItem = () => {\n  return (\n    <Iterate.ViewContainer title="Account holder {itemNo}">\n      <Value.SummaryList>\n        <Value.Name.First itemPath="/firstName" />\n        <Value.Name.Last itemPath="/lastName" />\n      </Value.SummaryList>\n    </Iterate.ViewContainer>\n  )\n}\nconst MyEditItem = () => {\n  return (\n    <Iterate.EditContainer\n      title="Edit account holder {itemNo}"\n      titleWhenNew="New account holder {itemNo}"\n    >\n      <MyEditItemContent />\n    </Iterate.EditContainer>\n  )\n}\nconst MyEditItemContent = () => {\n  return (\n    <Field.Composition width="large">\n      <Field.Name.First itemPath="/firstName" required />\n      <Field.Name.Last itemPath="/lastName" required />\n    </Field.Composition>\n  )\n}\nrender(\n  <Form.Handler>\n    <Form.Card>\n      <Iterate.PushContainer\n        path="/myListOfPeople"\n        title="New account holder"\n      >\n        <MyEditItemContent />\n      </Iterate.PushContainer>\n\n      <Iterate.Array\n        path="/myListOfPeople"\n        reverse\n        animate\n        required\n        errorMessages={{\n          \'Field.errorRequired\': \'Custom message\',\n        }}\n      >\n        <MyViewItem />\n        <MyEditItem />\n      </Iterate.Array>\n    </Form.Card>\n\n    <Form.SubmitButton />\n  </Form.Handler>,\n)\n'}),E=()=>(0,m.jsx)(a.Z,{children:'<Form.Handler\n  data={{\n    outer: [\n      {\n        inner: [\'foo\', \'bar\'],\n      },\n    ],\n  }}\n>\n  <Iterate.Array path="/outer">\n    <Iterate.Array itemPath="/inner">\n      <Field.String label="Item {itemNo}" itemPath="/" />\n    </Iterate.Array>\n  </Iterate.Array>\n\n  <Tools.Log />\n</Form.Handler>\n'}),H=()=>(0,m.jsx)(a.Z,{scope:{Iterate:r,Tools:i,ValueBlock:o.Z,FieldBlock:l.ZP},hideCode:!0,noInline:!0,children:'function EditPerson() {\n  return (\n    <Flex.Stack>\n      <Field.Name.Last itemPath="/name" />\n\n      <FieldBlock label="Citizenship\'s" asFieldset>\n        <Iterate.Array\n          itemPath="/citizenships"\n          animate\n          required\n          errorMessages={{\n            \'Field.errorRequired\': \'At least one citizenship is required.\',\n          }}\n        >\n          <Flex.Horizontal align="center">\n            <Field.SelectCountry label={false} itemPath="/" />\n            <Iterate.RemoveButton />\n          </Flex.Horizontal>\n        </Iterate.Array>\n      </FieldBlock>\n\n      <Iterate.PushContainer\n        itemPath="/citizenships"\n        openButton={\n          <Iterate.PushContainer.OpenButton\n            top\n            text="Add another citizenship"\n            variant="tertiary"\n          />\n        }\n        showOpenButtonWhen={(list) => list.length > 0}\n        toolbar={\n          <Iterate.Toolbar>\n            <Iterate.EditContainer.DoneButton text="Add citizenship" />\n          </Iterate.Toolbar>\n        }\n      >\n        <Field.SelectCountry label="New citizenship" itemPath="/" />\n      </Iterate.PushContainer>\n    </Flex.Stack>\n  )\n}\nrender(\n  <Form.Handler\n    required\n    onSubmit={(data) => console.log(\'onSubmit\', data)}\n  >\n    <Flex.Stack>\n      <Iterate.PushContainer\n        path="/persons"\n        title="New person"\n        openButton={\n          <Iterate.PushContainer.OpenButton\n            text="Add new person"\n            variant="tertiary"\n          />\n        }\n        showOpenButtonWhen={(list) => list.length > 0}\n      >\n        <EditPerson />\n      </Iterate.PushContainer>\n\n      <Iterate.Array\n        path="/persons"\n        required\n        errorMessages={{\n          required: \'Please add at least one person.\',\n        }}\n      >\n        <Iterate.ViewContainer title="Persons">\n          <Value.SummaryList>\n            <Value.Name.Last itemPath="/name" />\n\n            <ValueBlock label="Citizenship\'s">\n              <Iterate.Array itemPath="/citizenships">\n                <Value.SelectCountry inline label={false} itemPath="/" />\n              </Iterate.Array>\n            </ValueBlock>\n          </Value.SummaryList>\n\n          <Iterate.Toolbar>\n            <Iterate.ViewContainer.EditButton />\n            <Iterate.ViewContainer.RemoveButton showConfirmDialog />\n          </Iterate.Toolbar>\n        </Iterate.ViewContainer>\n\n        <Iterate.EditContainer title="Edit person">\n          <EditPerson />\n        </Iterate.EditContainer>\n      </Iterate.Array>\n\n      <Form.SubmitButton text="Save" />\n\n      <Tools.Log />\n    </Flex.Stack>\n  </Form.Handler>,\n)\n'})}}]);
//# sourceMappingURL=154e74b17b8db98b3bb160dbb3f69c82536989bd-9511607f198b0c82887f.js.map