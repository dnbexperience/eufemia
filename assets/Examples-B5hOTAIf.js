import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Avatar-CidI61ma.js";import{n as i,r as a,t as o}from"./Tr-BKjgVrf0.js";import{c as s}from"./ToggleButton-_NsXxiTa.js";import{t as c}from"./Card-ChPhpBPz.js";import{a as l}from"./Selection-DWa_5MEy.js";import{t as u}from"./ajv-bWb4wA9P.js";import{t as d}from"./Form-JTiJXf2d.js";import{t as f}from"./Field-DqRpWyNm.js";import{t as p}from"./ValueBlock-xJ-M2W9v.js";import{t as m}from"./Value-OsZalonW.js";import{n as h}from"./Wizard-CUdMs3bu.js";import{t as g}from"./Iterate-D_asUGot.js";import{t as _}from"./Tools-CXd2z-w-.js";import{v}from"./index-ppRu2ktv.js";import{t as y}from"./ComponentBox-R2c6Bo76.js";import{t as b}from"./Examples-DnZxtOOE.js";var x=e({AnimatedContainer:()=>b,ArrayFromFormHandler:()=>A,DynamicPathValue:()=>M,FilledViewAndEditContainer:()=>B,InitialOpenWithToolbarVariant:()=>I,InitiallyOpen:()=>P,MinItems:()=>F,NestedIterate:()=>W,NestedIterateWithPushContainer:()=>G,ObjectItems:()=>D,PrimitiveItemsFields:()=>C,PrimitiveItemsValues:()=>w,RenderPropsObjectItems:()=>k,RenderPropsPrimitiveItems:()=>O,RequiredWithPushButton:()=>H,RequiredWithPushContainer:()=>U,ToolbarVariantMiniumOneItemOneItem:()=>L,ToolbarVariantMiniumOneItemTwoItems:()=>R,ValueComposition:()=>T,ViewAndEditContainer:()=>j,ViewAndEditContainerWithLineDivider:()=>V,WithArrayValidator:()=>z,WithTable:()=>E,WithVisibility:()=>N}),S=t(n()),C=()=>(0,S.jsx)(y,{stableName:`PrimitiveItemsFields`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Iterate:g,Field:f},children:`<Iterate.Array
  defaultValue={['Iron Man', 'Captain America', 'The Hulk']}
  onChange={console.log}
>
  <Field.String itemPath="/" />
</Iterate.Array>
`}),w=()=>(0,S.jsx)(y,{"data-visual-test":`primitive-element-values`,stableName:`PrimitiveItemsValues`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:m,Iterate:g},children:`<Value.SummaryList>
  <Iterate.Array
    defaultValue={['Iron Man', 'Captain America', 'The Hulk']}
  >
    <Value.String itemPath="/" />
  </Iterate.Array>
</Value.SummaryList>
`}),T=()=>(0,S.jsx)(y,{stableName:`ValueComposition`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:m,Iterate:g},children:`<Value.Composition>
  <Iterate.Array
    defaultValue={[
      {
        value: 'value 1',
      },
      {
        value: 'value 2',
      },
    ]}
  >
    <Value.String itemPath="/value" />
  </Iterate.Array>
</Value.Composition>
`}),E=()=>(0,S.jsx)(y,{stableName:`WithTable`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Table:v,Tr:o,Th:i,Iterate:g,Td:a,Value:m},children:`<Table>
  <thead>
    <Tr>
      <Th>Name</Th>
      <Th>Age</Th>
    </Tr>
  </thead>
  <tbody>
    <Iterate.Array
      withoutFlex
      defaultValue={[
        {
          name: 'Iron Man',
          age: 45,
        },
        {
          name: 'Captain America',
          age: 123,
        },
        {
          name: 'The Hulk',
          age: 3337,
        },
      ]}
    >
      <Tr>
        <Td>
          <Value.Name.Last itemPath="/name" />
        </Td>
        <Td>
          <Value.Number itemPath="/age" />
        </Td>
      </Tr>
    </Iterate.Array>
  </tbody>
</Table>
`}),D=()=>(0,S.jsx)(y,{stableName:`ObjectItems`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Iterate:g,Field:f},children:`<Iterate.Array
  defaultValue={[
    {
      accountName: 'Brukskonto',
      accountNumber: '90901134567',
    },
    {
      accountName: 'Sparekonto',
      accountNumber: '90901156789',
    },
  ]}
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Composition>
    <Field.BankAccountNumber itemPath="/accountNumber" />
    <Field.String label="Account name" itemPath="/accountName" />
  </Field.Composition>
</Iterate.Array>
`}),O=()=>(0,S.jsx)(y,{stableName:`RenderPropsPrimitiveItems`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Iterate:g,Field:f},children:`<Iterate.Array
  defaultValue={['foo', 'bar']}
  onChange={(value) => console.log('onChange', value)}
>
  {(elementValue) => <Field.String value={elementValue} />}
</Iterate.Array>
`}),k=()=>(0,S.jsx)(y,{stableName:`RenderPropsObjectItems`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Iterate:g,Field:f},children:`<Iterate.Array
  defaultValue={[
    {
      num: 1,
      txt: 'One',
    },
    {
      num: 2,
      txt: 'Two',
    },
  ]}
  onChange={(value) => console.log('onChange', value)}
>
  {({ num, txt }) => (
    <Field.Composition width="large">
      <Field.Number value={num} width="small" />
      <Field.String value={txt} width={false} />
    </Field.Composition>
  )}
</Iterate.Array>
`}),A=()=>(0,S.jsx)(y,{"data-visual-test":`animated-container`,stableName:`ArrayFromFormHandler`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:d,Flex:s,Card:c,Iterate:g,Value:m,Field:f},children:`<Form.Handler
  data={{
    avengers: [
      {
        nickname: 'Iron Man',
        firstName: 'Tony',
        lastName: 'Stark',
      },
      {
        nickname: 'Captain America',
        firstName: 'Steve',
        lastName: 'Rogers',
      },
    ],
  }}
  onChange={(data) => console.log('DataContext/onChange', data)}
>
  <Flex.Stack>
    <Form.MainHeading>Avengers</Form.MainHeading>

    <Form.Card>
      <Iterate.Array
        path="/avengers"
        onChange={(value) => console.log('Iterate/onChange', value)}
        animate
      >
        <Iterate.AnimatedContainer
          title={
            <Value.Name
              label={false}
              itemPath="/nickname"
              placeholder="A Nick name"
            />
          }
        >
          <Field.Name
            itemPath="/nickname"
            width="medium"
            label="Nick name"
          />

          <Field.Composition>
            <Field.Name.First itemPath="/firstName" width="medium" />
            <Field.Name.Last itemPath="/lastName" width="medium" />
          </Field.Composition>

          <Iterate.Toolbar>
            <Iterate.RemoveButton showConfirmDialog />
          </Iterate.Toolbar>
        </Iterate.AnimatedContainer>
      </Iterate.Array>

      <Iterate.PushButton
        text="Add another avenger"
        path="/avengers"
        pushValue={{}}
      />
    </Form.Card>
  </Flex.Stack>
</Form.Handler>
`}),j=()=>(0,S.jsx)(y,{"data-visual-test":`view-and-edit-container`,stableName:`ViewAndEditContainer`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:f,Iterate:g,Value:m,Form:d,Flex:s,Card:c},noInline:!0,children:`const MyEditItemForm = () => {
  return (
    <Field.Composition>
      <Field.Name.First itemPath="/firstName" width="medium" />
      <Field.Name.Last itemPath="/lastName" width="medium" required />
    </Field.Composition>
  )
}
const MyEditItem = () => {
  return (
    <Iterate.EditContainer
      title="Edit account holder {itemNo}"
      titleWhenNew="New account holder {itemNo}"
    >
      <MyEditItemForm />
    </Iterate.EditContainer>
  )
}
const MyViewItem = () => {
  const item = Iterate.useItem()
  console.log('index:', item.index)
  return (
    <Iterate.ViewContainer title="Account holder {itemNo}">
      <Value.SummaryList>
        <Value.Name.First itemPath="/firstName" showEmpty />
        <Value.Name.Last itemPath="/lastName" placeholder="-" />
      </Value.SummaryList>
    </Iterate.ViewContainer>
  )
}
const CreateNewEntry = () => {
  return (
    <Iterate.PushContainer
      path="/accounts"
      title="New account holder"
      openButton={
        <Iterate.PushContainer.OpenButton text="Add another account" />
      }
      showOpenButtonWhen={(list) => list.length > 0}
    >
      <MyEditItemForm />
    </Iterate.PushContainer>
  )
}
const MyForm = () => {
  return (
    <Form.Handler
      data={{
        accounts: [
          {
            firstName: 'Tony',
            lastName: 'Rogers',
          },
        ],
      }}
      onChange={(data) => console.log('DataContext/onChange', data)}
      onSubmit={async (data) => console.log('onSubmit', data)}
    >
      <Flex.Stack>
        <Form.MainHeading>Accounts</Form.MainHeading>

        <Form.Card gap={false}>
          <Iterate.Array path="/accounts" animate>
            <MyViewItem />
            <MyEditItem />
          </Iterate.Array>

          <CreateNewEntry />
        </Form.Card>

        <Form.SubmitButton variant="send" />
      </Flex.Stack>
    </Form.Handler>
  )
}
render(<MyForm />)
`}),M=()=>(0,S.jsx)(y,{stableName:`DynamicPathValue`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:d,Flex:s,Field:f,Iterate:g,Tools:_},children:`<Form.Handler
  defaultData={{
    count: 0,
  }}
>
  <Flex.Stack>
    <Field.Number path="/count" width="small" showStepControls />
    <Iterate.Array
      path="/items"
      countPath="/count"
      countPathTransform={({ value, index }) => {
        return 'myObject' in (value || {})
          ? value
          : {
              myObject: index,
            }
      }}
      animate
    >
      <Field.Number itemPath="/myObject" label="Item no. {itemNo}" />
    </Iterate.Array>
    <Tools.Log />
  </Flex.Stack>
</Form.Handler>
`}),N=()=>(0,S.jsx)(y,{stableName:`WithVisibility`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:d,Iterate:g,Flex:s,Field:f},children:`<Form.Handler>
  <Iterate.Array path="/myList" defaultValue={[{}]}>
    <Flex.Stack>
      <Field.Name.First className="firstName" itemPath="/firstName" />

      <Form.Visibility
        animate
        visibleWhen={{
          itemPath: '/firstName',
          hasValue: (value) => Boolean(value),
        }}
      >
        <Field.Name.Last className="lastName" itemPath="/lastName" />
      </Form.Visibility>
    </Flex.Stack>
  </Iterate.Array>
</Form.Handler>
`}),P=()=>(0,S.jsx)(y,{scope:{Iterate:g},stableName:`InitiallyOpen`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:d,Wizard:h,Card:c,Iterate:g,Value:m,Field:f,Tools:_},children:`<Form.Handler required>
  <Wizard.Container>
    <Wizard.Step>
      <Form.Card>
        <Iterate.Array path="/myList" defaultValue={[{}]}>
          <Iterate.ViewContainer>
            <Value.String label="Item {itemNo}" itemPath="/foo" />
          </Iterate.ViewContainer>
          <Iterate.EditContainer>
            <Field.String
              label="Item {itemNo}"
              itemPath="/foo"
              defaultValue="foo"
            />
          </Iterate.EditContainer>
        </Iterate.Array>

        <Iterate.PushButton
          text="Add"
          path="/myList"
          variant="tertiary"
          pushValue={{}}
        />
      </Form.Card>

      <Wizard.Buttons />
    </Wizard.Step>

    <Wizard.Step>
      <Iterate.Array path="/myList" defaultValue={[{}]}>
        <Iterate.EditContainer>
          <Field.String
            label="Item {itemNo}"
            itemPath="/foo"
            defaultValue="foo"
          />
        </Iterate.EditContainer>
        <Iterate.ViewContainer>
          <Value.String label="Item {itemNo}" itemPath="/foo" />
        </Iterate.ViewContainer>
      </Iterate.Array>

      <Wizard.Buttons />
    </Wizard.Step>
  </Wizard.Container>

  <Tools.Log top />
</Form.Handler>
`}),F=()=>(0,S.jsx)(y,{hideCode:!0,scope:{makeAjvInstance:u},stableName:`MinItems`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:d,Iterate:g,Value:m,Field:f,Tools:_},noInline:!0,children:`const ajv = makeAjvInstance()
const schema = {
  type: 'object',
  properties: {
    myList: {
      type: 'array',
      minItems: 1,
    },
  },
}
render(
  <Form.Handler schema={schema} ajvInstance={ajv}>
    <Iterate.Array
      path="/myList"
      defaultValue={[
        {
          foo: 'Remove me to see the minItems error.',
        },
      ]}
      errorMessages={{
        minItems: 'You need at least one item.',
      }}
    >
      <Iterate.ViewContainer>
        <Value.String itemPath="/foo" />

        <Iterate.Toolbar>
          <Iterate.ViewContainer.EditButton />
          <Iterate.ViewContainer.RemoveButton showConfirmDialog />
        </Iterate.Toolbar>
      </Iterate.ViewContainer>

      <Iterate.EditContainer>
        <Field.String label="Item {itemNo}" itemPath="/foo" required />
      </Iterate.EditContainer>
    </Iterate.Array>

    <Iterate.PushButton
      text="Add another item"
      path="/myList"
      variant="tertiary"
      pushValue={{}}
    />

    <Tools.Log top />
  </Form.Handler>
)
`}),I=()=>(0,S.jsx)(y,{scope:{Iterate:g},stableName:`InitialOpenWithToolbarVariant`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:m,Form:d,Flex:s,Card:c,Iterate:g,Field:f,Tools:_},noInline:!0,children:`const MyForm = () => {
  const { getCountryNameByIso } = Value.SelectCountry.useCountry()
  return (
    <Form.Handler
      onSubmit={async (data) => console.log('onSubmit', data)}
      onSubmitRequest={() => console.log('onSubmitRequest')}
    >
      <Flex.Stack>
        <Form.MainHeading>Statsborgerskap</Form.MainHeading>

        <Form.Card>
          <Iterate.Array
            path="/countries"
            defaultValue={[null]}
            onChangeValidator={(arrayValue) => {
              const findFirstDuplication = (arr) =>
                arr.findIndex((e, i) => arr.indexOf(e) !== i)
              const index = findFirstDuplication(arrayValue)
              if (index > -1) {
                return new Error(
                  \`You cannot have duplicate items: \${getCountryNameByIso(
                    String(arrayValue.at(index))
                  )}\`
                )
              }
            }}
          >
            <Iterate.ViewContainer toolbarVariant="minimumOneItem">
              <Value.SelectCountry
                label="Land du er statsborger i"
                itemPath="/"
              />
            </Iterate.ViewContainer>

            <Iterate.EditContainer toolbarVariant="minimumOneItem">
              <Field.SelectCountry
                label="Land du er statsborger i"
                itemPath="/"
                required
              />
            </Iterate.EditContainer>
          </Iterate.Array>

          <Iterate.PushButton
            path="/countries"
            pushValue={null}
            text="Legg til flere statsborgerskap"
          />
        </Form.Card>

        <Form.SubmitButton variant="send" />

        <Tools.Log />
      </Flex.Stack>
    </Form.Handler>
  )
}
render(<MyForm />)
`}),L=()=>(0,S.jsx)(y,{hideCode:!0,stableName:`ToolbarVariantMiniumOneItemOneItem`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Iterate:g},children:`<Iterate.Array defaultValue={['foo']}>
  <Iterate.ViewContainer toolbarVariant="minimumOneItem">
    View Content
  </Iterate.ViewContainer>
  <Iterate.EditContainer toolbarVariant="minimumOneItem">
    Edit Content
  </Iterate.EditContainer>
</Iterate.Array>
`}),R=()=>(0,S.jsx)(y,{hideCode:!0,stableName:`ToolbarVariantMiniumOneItemTwoItems`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Iterate:g},children:`<Iterate.Array defaultValue={['foo', 'bar']}>
  <Iterate.ViewContainer toolbarVariant="minimumOneItem">
    View Content
  </Iterate.ViewContainer>
  <Iterate.EditContainer toolbarVariant="minimumOneItem">
    Edit Content
  </Iterate.EditContainer>
</Iterate.Array>
`}),z=()=>(0,S.jsx)(y,{stableName:`WithArrayValidator`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:d,Card:c,Iterate:g,Flex:s,Field:f},children:`<Form.Handler
  defaultData={{
    items: ['foo'],
  }}
  onSubmit={async () => console.log('onSubmit')}
>
  <Form.Card>
    <Iterate.Array
      path="/items"
      onChangeValidator={(arrayValue) => {
        if (!(arrayValue && arrayValue.length > 1)) {
          return new Error('You need at least two items')
        }
      }}
      animate
    >
      <Flex.Horizontal align="flex-end">
        <Field.String
          label="Item no. {itemNo}"
          itemPath="/"
          width="medium"
          size="medium"
        />
        <Iterate.RemoveButton showConfirmDialog />
      </Flex.Horizontal>
    </Iterate.Array>

    <Iterate.PushButton top path="/items" pushValue={null} text="Add" />
    <Form.SubmitButton />
  </Form.Card>
</Form.Handler>
`}),B=()=>(0,S.jsx)(y,{"data-visual-test":`filled-view-and-edit-container`,hideCode:!0,stableName:`FilledViewAndEditContainer`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:s,Field:f,Iterate:g,Avatar:r,Value:m,Form:d,Card:c},noInline:!0,children:`const MyEditItemForm = () => {
  return (
    <Flex.Stack>
      <Field.Name.First itemPath="/firstName" required />
      <Field.Name.Last itemPath="/lastName" required />
    </Flex.Stack>
  )
}
const EditItemToolbar = () => {
  return (
    <Iterate.Toolbar>
      <Flex.Horizontal justify="space-between" stretch>
        <Flex.Horizontal gap="large">
          <Iterate.EditContainer.DoneButton />
          <Iterate.EditContainer.CancelButton />
        </Flex.Horizontal>
        <Iterate.ViewContainer.RemoveButton
          showConfirmDialog
          left={false}
        />
      </Flex.Horizontal>
    </Iterate.Toolbar>
  )
}
const MyEditItem = (props) => {
  return (
    <Iterate.EditContainer
      variant="filled"
      toolbarVariant="custom"
      toolbar={<EditItemToolbar />}
      {...props}
    >
      <ValueWithAvatar />
      <MyEditItemForm />
    </Iterate.EditContainer>
  )
}
const CreateNewEntry = () => {
  return (
    <Iterate.PushContainer
      path="/persons"
      title="New person"
      variant="filled"
      openButton={
        <Iterate.PushContainer.OpenButton text="Add another person" />
      }
      showOpenButtonWhen={(list) => list.length > 0}
    >
      <MyEditItemForm />
    </Iterate.PushContainer>
  )
}
const ValueWithAvatar = () => {
  const { value } = Iterate.useItem()
  const firstName = String(value['firstName'] || '')
  return (
    <Flex.Horizontal align="center">
      <Avatar.Group label={firstName}>
        <Avatar>{firstName.substring(0, 1).toUpperCase()}</Avatar>
      </Avatar.Group>
      <Value.Name.First itemPath="/firstName" label={false} />
    </Flex.Horizontal>
  )
}
const MyViewItem = () => {
  return (
    <Iterate.ViewContainer
      variant="filled"
      toolbarVariant="custom"
      toolbar={<></>}
    >
      <Flex.Horizontal align="center" justify="space-between">
        <ValueWithAvatar />

        <Iterate.Toolbar>
          <Iterate.ViewContainer.EditButton />
        </Iterate.Toolbar>
      </Flex.Horizontal>
    </Iterate.ViewContainer>
  )
}
render(
  <Form.Handler
    data={{
      persons: [
        {
          firstName:
            'Tony with long name that maybe will wrap over to a new line',
          lastName: 'Last',
        },
        {
          firstName: 'Maria',
          lastName: 'Last',
        },
      ],
    }}
    onSubmit={(data) => console.log('onSubmit', data)}
    onSubmitRequest={() => console.log('onSubmitRequest')}
  >
    <Flex.Stack>
      <Form.MainHeading>Persons</Form.MainHeading>

      <Form.Card gap={false}>
        <Iterate.Array path="/persons" limit={2}>
          <MyViewItem />
          <MyEditItem />
        </Iterate.Array>

        <CreateNewEntry />
      </Form.Card>

      <Form.SubmitButton variant="send" />
    </Flex.Stack>
  </Form.Handler>
)
`}),V=()=>(0,S.jsx)(y,{"data-visual-test":`view-and-edit-container-with-line-divider`,hideCode:!0,stableName:`ViewAndEditContainerWithLineDivider`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Iterate:g,Field:f,Value:m,Form:d,Flex:s,Card:c},noInline:!0,children:`const MyEditItem = () => {
  return (
    <Iterate.EditContainer variant="basic" divider="line">
      <Field.Name.First itemPath="/firstName" required />
      <Field.Name.Last itemPath="/lastName" required />
    </Iterate.EditContainer>
  )
}
const MyViewItem = () => {
  return (
    <Iterate.ViewContainer variant="basic" divider="line">
      <Value.Name.First itemPath="/firstName" />
      <Value.Name.Last itemPath="/lastName" />
    </Iterate.ViewContainer>
  )
}
render(
  <Form.Handler
    data={{
      accounts: [
        {
          firstName: 'Tony',
          lastName: 'Last',
        },
        {
          firstName: 'Maria',
          lastName: 'Last',
        },
      ],
    }}
    onSubmit={(data) => console.log('onSubmit', data)}
    onSubmitRequest={() => console.log('onSubmitRequest')}
  >
    <Flex.Stack>
      <Form.MainHeading>Accounts</Form.MainHeading>

      <Form.Card>
        <Iterate.Array path="/accounts" divider="line">
          <MyViewItem />
          <MyEditItem />
        </Iterate.Array>
      </Form.Card>

      <Form.SubmitButton variant="send" />
    </Flex.Stack>
  </Form.Handler>
)
`}),H=()=>(0,S.jsx)(y,{stableName:`RequiredWithPushButton`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:d,Card:c,Iterate:g,Flex:s,Field:f},children:`<Form.Handler>
  <Form.Card>
    <Iterate.Array
      path="/items"
      animate
      required
      errorMessages={{
        'Field.errorRequired': 'Custom message',
      }}
      validateInitially
    >
      <Flex.Horizontal>
        <Field.String itemPath="/" />
        <Iterate.RemoveButton />
      </Flex.Horizontal>
    </Iterate.Array>

    <Iterate.PushButton
      path="/items"
      pushValue="baz"
      text="Add item to hide error"
    />
  </Form.Card>

  <Form.SubmitButton />
</Form.Handler>
`}),U=()=>(0,S.jsx)(y,{stableName:`RequiredWithPushContainer`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Iterate:g,Value:m,Field:f,Form:d,Card:c},noInline:!0,children:`const MyViewItem = () => {
  return (
    <Iterate.ViewContainer title="Account holder {itemNo}">
      <Value.SummaryList>
        <Value.Name.First itemPath="/firstName" />
        <Value.Name.Last itemPath="/lastName" />
      </Value.SummaryList>
    </Iterate.ViewContainer>
  )
}
const MyEditItem = () => {
  return (
    <Iterate.EditContainer
      title="Edit account holder {itemNo}"
      titleWhenNew="New account holder {itemNo}"
    >
      <MyEditItemContent />
    </Iterate.EditContainer>
  )
}
const MyEditItemContent = () => {
  return (
    <Field.Composition width="large">
      <Field.Name.First itemPath="/firstName" required />
      <Field.Name.Last itemPath="/lastName" required />
    </Field.Composition>
  )
}
render(
  <Form.Handler>
    <Form.Card>
      <Iterate.PushContainer
        path="/myListOfPeople"
        title="New account holder"
      >
        <MyEditItemContent />
      </Iterate.PushContainer>

      <Iterate.Array
        path="/myListOfPeople"
        reverse
        animate
        required
        errorMessages={{
          'Field.errorRequired': 'Custom message',
        }}
      >
        <MyViewItem />
        <MyEditItem />
      </Iterate.Array>
    </Form.Card>

    <Form.SubmitButton />
  </Form.Handler>
)
`}),W=()=>(0,S.jsx)(y,{stableName:`NestedIterate`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:d,Iterate:g,Field:f,Tools:_},children:`<Form.Handler
  data={{
    outer: [
      {
        inner: ['foo', 'bar'],
      },
    ],
  }}
>
  <Iterate.Array path="/outer">
    <Iterate.Array itemPath="/inner">
      <Field.String label="Item {itemNo}" itemPath="/" />
    </Iterate.Array>
  </Iterate.Array>

  <Tools.Log />
</Form.Handler>
`}),G=()=>(0,S.jsx)(y,{scope:{Iterate:g,Tools:_,ValueBlock:p,FieldBlock:l},hideCode:!0,stableName:`NestedIterateWithPushContainer`,sourceImports:[`import { Avatar, Flex, Table, Td, Th, Tr } from '@dnb/eufemia'`,`import { Iterate, Field, Value, Form, Tools, Wizard, ValueBlock, FieldBlock, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:s,Field:f,FieldBlock:l,Iterate:g,Form:d,Value:m,ValueBlock:p,Tools:_},noInline:!0,children:`function EditPerson() {
  return (
    <Flex.Stack>
      <Field.Name.Last itemPath="/name" />

      <FieldBlock label="Citizenship's" asFieldset>
        <Iterate.Array
          itemPath="/citizenships"
          animate
          required
          errorMessages={{
            'Field.errorRequired': 'At least one citizenship is required.',
          }}
        >
          <Flex.Horizontal align="center">
            <Field.SelectCountry label={false} itemPath="/" />
            <Iterate.RemoveButton />
          </Flex.Horizontal>
        </Iterate.Array>
      </FieldBlock>

      <Iterate.PushContainer
        itemPath="/citizenships"
        openButton={
          <Iterate.PushContainer.OpenButton
            top
            text="Add another citizenship"
            variant="tertiary"
          />
        }
        showOpenButtonWhen={(list) => list.length > 0}
        toolbar={
          <Iterate.Toolbar>
            <Iterate.EditContainer.DoneButton text="Add citizenship" />
          </Iterate.Toolbar>
        }
      >
        <Field.SelectCountry label="New citizenship" itemPath="/" />
      </Iterate.PushContainer>
    </Flex.Stack>
  )
}
render(
  <Form.Handler
    required
    onSubmit={(data) => console.log('onSubmit', data)}
  >
    <Flex.Stack>
      <Iterate.PushContainer
        path="/persons"
        title="New person"
        openButton={
          <Iterate.PushContainer.OpenButton
            text="Add new person"
            variant="tertiary"
          />
        }
        showOpenButtonWhen={(list) => list.length > 0}
      >
        <EditPerson />
      </Iterate.PushContainer>

      <Iterate.Array
        path="/persons"
        required
        errorMessages={{
          required: 'Please add at least one person.',
        }}
      >
        <Iterate.ViewContainer title="Persons">
          <Value.SummaryList>
            <Value.Name.Last itemPath="/name" />

            <ValueBlock label="Citizenship's">
              <Iterate.Array itemPath="/citizenships">
                <Value.SelectCountry inline label={false} itemPath="/" />
              </Iterate.Array>
            </ValueBlock>
          </Value.SummaryList>

          <Iterate.Toolbar>
            <Iterate.ViewContainer.EditButton />
            <Iterate.ViewContainer.RemoveButton showConfirmDialog />
          </Iterate.Toolbar>
        </Iterate.ViewContainer>

        <Iterate.EditContainer title="Edit person">
          <EditPerson />
        </Iterate.EditContainer>
      </Iterate.Array>

      <Form.SubmitButton text="Save" />

      <Tools.Log />
    </Flex.Stack>
  </Form.Handler>
)
`});export{E as C,z as S,L as _,I as a,j as b,W as c,C as d,w as f,U as g,H as h,B as i,G as l,O as m,M as n,P as o,k as p,x as r,F as s,A as t,D as u,R as v,N as w,V as x,T as y};