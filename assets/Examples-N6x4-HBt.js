import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{b as n,n as r,o as i,t as a}from"./ComponentBox-DPdYTeDv.js";import{t as o}from"./ajv-vuuxEh2r.js";import{p as s}from"./index--zEB_f_m.js";import{t as c}from"./Examples-BarV3_op.js";var l=e({AnimatedContainer:()=>c,ArrayFromFormHandler:()=>v,DynamicPathValue:()=>b,FilledViewAndEditContainer:()=>O,InitialOpenWithToolbarVariant:()=>w,InitiallyOpen:()=>S,MinItems:()=>C,NestedIterate:()=>M,NestedIterateWithPushContainer:()=>N,ObjectItems:()=>h,PrimitiveItemsFields:()=>d,PrimitiveItemsValues:()=>f,RenderPropsObjectItems:()=>_,RenderPropsPrimitiveItems:()=>g,RequiredWithPushButton:()=>A,RequiredWithPushContainer:()=>j,ToolbarVariantMiniumOneItemOneItem:()=>T,ToolbarVariantMiniumOneItemTwoItems:()=>E,ValueComposition:()=>p,ViewAndEditContainer:()=>y,ViewAndEditContainerWithLineDivider:()=>k,WithArrayValidator:()=>D,WithTable:()=>m,WithVisibility:()=>x}),u=t(),d=()=>(0,u.jsx)(a,{children:`<Iterate.Array
  defaultValue={['Iron Man', 'Captain America', 'The Hulk']}
  onChange={console.log}
>
  <Field.String itemPath="/" />
</Iterate.Array>
`}),f=()=>(0,u.jsx)(a,{"data-visual-test":`primitive-element-values`,children:`<Value.SummaryList>
  <Iterate.Array
    defaultValue={['Iron Man', 'Captain America', 'The Hulk']}
  >
    <Value.String itemPath="/" />
  </Iterate.Array>
</Value.SummaryList>
`}),p=()=>(0,u.jsx)(a,{children:`<Value.Composition>
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
`}),m=()=>(0,u.jsx)(a,{children:`<Table>
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
`}),h=()=>(0,u.jsx)(a,{children:`<Iterate.Array
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
`}),g=()=>(0,u.jsx)(a,{children:`<Iterate.Array
  defaultValue={['foo', 'bar']}
  onChange={(value) => console.log('onChange', value)}
>
  {(elementValue) => <Field.String value={elementValue} />}
</Iterate.Array>
`}),_=()=>(0,u.jsx)(a,{children:`<Iterate.Array
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
`}),v=()=>(0,u.jsx)(a,{"data-visual-test":`animated-container`,children:`<Form.Handler
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
            <Value.String
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
`}),y=()=>(0,u.jsx)(a,{"data-visual-test":`view-and-edit-container`,noInline:!0,children:`const MyEditItemForm = () => {
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
`}),b=()=>(0,u.jsx)(a,{children:`<Form.Handler
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
`}),x=()=>(0,u.jsx)(a,{children:`<Form.Handler>
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
`}),S=()=>(0,u.jsx)(a,{scope:{Iterate:i},children:`<Form.Handler required>
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
`}),C=()=>(0,u.jsx)(a,{hideCode:!0,scope:{makeAjvInstance:o},noInline:!0,children:`const ajv = makeAjvInstance()
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
`}),w=()=>(0,u.jsx)(a,{scope:{Iterate:i},noInline:!0,children:`const MyForm = () => {
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
`}),T=()=>(0,u.jsx)(a,{hideCode:!0,children:`<Iterate.Array defaultValue={['foo']}>
  <Iterate.ViewContainer toolbarVariant="minimumOneItem">
    View Content
  </Iterate.ViewContainer>
  <Iterate.EditContainer toolbarVariant="minimumOneItem">
    Edit Content
  </Iterate.EditContainer>
</Iterate.Array>
`}),E=()=>(0,u.jsx)(a,{hideCode:!0,children:`<Iterate.Array defaultValue={['foo', 'bar']}>
  <Iterate.ViewContainer toolbarVariant="minimumOneItem">
    View Content
  </Iterate.ViewContainer>
  <Iterate.EditContainer toolbarVariant="minimumOneItem">
    Edit Content
  </Iterate.EditContainer>
</Iterate.Array>
`}),D=()=>(0,u.jsx)(a,{children:`<Form.Handler
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
`}),O=()=>(0,u.jsx)(a,{"data-visual-test":`filled-view-and-edit-container`,hideCode:!0,noInline:!0,children:`const MyEditItemForm = () => {
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
      <Value.String itemPath="/firstName" />
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
`}),k=()=>(0,u.jsx)(a,{"data-visual-test":`view-and-edit-container-with-line-divider`,hideCode:!0,noInline:!0,children:`const MyEditItem = () => {
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
`}),A=()=>(0,u.jsx)(a,{children:`<Form.Handler>
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
`}),j=()=>(0,u.jsx)(a,{noInline:!0,children:`const MyViewItem = () => {
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
`}),M=()=>(0,u.jsx)(a,{children:`<Form.Handler
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
`}),N=()=>(0,u.jsx)(a,{scope:{Iterate:i,Tools:r,ValueBlock:n,FieldBlock:s},hideCode:!0,noInline:!0,children:`function EditPerson() {
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
`});export{m as C,D as S,T as _,w as a,y as b,M as c,d,f,j as g,A as h,O as i,N as l,g as m,b as n,S as o,_ as p,l as r,C as s,v as t,h as u,E as v,x as w,k as x,p as y};