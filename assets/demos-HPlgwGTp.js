import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{u as r}from"./FormStatus-DyD2Q-ji.js";import{c as i}from"./ToggleButton-BtQrsiHY.js";import{t as a}from"./Card--_AKADDp.js";import{t as o}from"./Form-913YPZs6.js";import{t as s}from"./Field-CbVmykdw.js";import{t as c}from"./Value-C2hl5_67.js";import{n as l}from"./Wizard-BYX_YzAY.js";import{t as u}from"./Iterate-4c-UwM0d.js";import{t as d}from"./Tools-Dnz4rN_r.js";import{W as f}from"./index-D7e1avVt.js";import{t as p}from"./ComponentBox-CE7bpcJy.js";import{b as m}from"./Examples-7waGF-Io.js";var h=e({InitiallyOpen:()=>_,IsolatedData:()=>v,PreventUncommittedChanges:()=>y,Variants:()=>b,ViewAndEditContainer:()=>m}),g=t(n()),_=()=>(0,g.jsx)(p,{stableName:`InitiallyOpen`,sourceImports:[`import { useLayoutEffect } from 'react'`,`import { Flex, HeightAnimation } from '@dnb/eufemia'`,`import { Field, Form, Iterate, Tools, Value, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:s,Iterate:u,Value:c,Form:o,Flex:i,Card:a},noInline:!0,children:`const MyEditItemForm = () => {
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
      onChange={(data) => console.log('DataContext/onChange', data)}
      onSubmit={async (data) => console.log('onSubmit', data)}
    >
      <Flex.Stack>
        <Form.MainHeading>Accounts</Form.MainHeading>

        <Form.Card gap={false}>
          <Iterate.Array path="/accounts">
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
`}),v=()=>(0,g.jsx)(p,{stableName:`IsolatedData`,sourceImports:[`import { useLayoutEffect } from 'react'`,`import { Flex, HeightAnimation } from '@dnb/eufemia'`,`import { Field, Form, Iterate, Tools, Value, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Iterate:u,Value:c,Field:s,Form:o,Flex:i,HeightAnimation:r,Card:a,Tools:d},noInline:!0,children:`const formData = {
  persons: [
    {
      firstName: 'Ola',
      lastName: 'Nordmann',
    },
    {
      firstName: 'Kari',
      lastName: 'Nordmann',
    },
    {
      firstName: 'Per',
      lastName: 'Hansen',
    },
  ],
}
function RepresentativesView() {
  return (
    <Iterate.ViewContainer>
      <Value.Composition>
        <Value.String itemPath="/firstName" />
        <Value.String itemPath="/lastName" />
      </Value.Composition>
    </Iterate.ViewContainer>
  )
}
function RepresentativesEdit() {
  return (
    <Iterate.EditContainer>
      <Field.Name.First itemPath="/firstName" />
      <Field.Name.Last itemPath="/lastName" />
    </Iterate.EditContainer>
  )
}
function ExistingPersonDetails() {
  const { data, getValue } = Form.useData()
  const person = getValue(data['selectedPerson'])?.data || {}
  return (
    <Flex.Stack>
      <Field.Name.First
        readOnly
        itemPath="/firstName"
        value={person.firstName}
      />
      <Field.Name.Last
        readOnly
        itemPath="/lastName"
        value={person.lastName}
      />
    </Flex.Stack>
  )
}
function NewPersonDetails() {
  return (
    <Flex.Stack>
      <Field.Name.First required itemPath="/firstName" />
      <Field.Name.Last required itemPath="/lastName" />
    </Flex.Stack>
  )
}
function PushContainerContent() {
  const { data, update } = Form.useData()
  const selectedPerson = data['selectedPerson'] // Because of missing TypeScript support

  // Clear the PushContainer data when the selected person is "other",
  // so the fields do not inherit existing data.
  useLayoutEffect(() => {
    if (selectedPerson === 'other') {
      update('/pushContainerItems/0', {})
    }
  }, [selectedPerson, update])
  return (
    <>
      <Field.Selection
        variant="radio"
        required
        path="/selectedPerson"
        dataPath="/persons"
      >
        <Field.Option value="other" label="Other person" />
      </Field.Selection>

      <HeightAnimation top>
        <Form.Visibility
          visibleWhen={{
            path: '/selectedPerson',
            hasValue: (value) =>
              typeof value === 'string' && value !== 'other',
          }}
        >
          <ExistingPersonDetails />
        </Form.Visibility>

        <Form.Visibility
          visibleWhen={{
            path: '/selectedPerson',
            hasValue: (value) => value === 'other',
          }}
        >
          <NewPersonDetails />
        </Form.Visibility>
      </HeightAnimation>
    </>
  )
}
function RepresentativesCreateNew() {
  return (
    <Iterate.PushContainer
      path="/representatives"
      title="Add new representative"
      isolatedData={{
        persons: formData.persons.map((data, i) => {
          return {
            title: [data.firstName, data.lastName].join(' '),
            value: \`/persons/\${i}\`,
            data,
          }
        }),
      }}
      openButton={
        <Iterate.PushContainer.OpenButton
          variant="tertiary"
          text="Add new representative"
        />
      }
      showOpenButtonWhen={(list) => list.length > 0}
    >
      <PushContainerContent />
    </Iterate.PushContainer>
  )
}
render(
  <Form.Handler>
    <Form.MainHeading>Representatives</Form.MainHeading>
    <Flex.Stack>
      <Form.Card>
        <Iterate.Array path="/representatives">
          <RepresentativesView />
          <RepresentativesEdit />
        </Iterate.Array>
        <RepresentativesCreateNew />
      </Form.Card>

      <Form.Card>
        <Form.SubHeading>Data Context</Form.SubHeading>
        <Tools.Log placeholder="-" />
      </Form.Card>
    </Flex.Stack>
  </Form.Handler>
)
`}),y=()=>(0,g.jsx)(p,{stableName:`PreventUncommittedChanges`,sourceImports:[`import { useLayoutEffect } from 'react'`,`import { Flex, HeightAnimation } from '@dnb/eufemia'`,`import { Field, Form, Iterate, Tools, Value, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Wizard:l,Card:a,Iterate:u,Value:c,Field:s},children:`<Form.Handler>
  <Wizard.Container>
    <Wizard.Step title="Step 1">
      <Form.Card>
        <Form.SubHeading>People</Form.SubHeading>
        <Iterate.Array path="/people" animate placeholder="No people">
          <Value.Name.First itemPath="/firstName" />
        </Iterate.Array>

        <Iterate.PushContainer
          path="/people"
          title="New person"
          preventUncommittedChanges
          bubbleValidation
          openButton={
            <Iterate.PushContainer.OpenButton
              top
              variant="tertiary"
              text="Add new person"
            />
          }
          showOpenButtonWhen={(list) => list.length > 0}
        >
          <Field.Name.First itemPath="/firstName" />
        </Iterate.PushContainer>
      </Form.Card>

      <Wizard.Buttons />
    </Wizard.Step>

    <Wizard.Step title="Step 2">
      <Iterate.Array path="/people">
        <Value.Name.First itemPath="/firstName" />
      </Iterate.Array>
      <Wizard.Buttons />
    </Wizard.Step>
  </Wizard.Container>
</Form.Handler>
`}),b=()=>(0,g.jsx)(p,{"data-visual-test":`push-container-variants`,stableName:`Variants`,sourceImports:[`import { useLayoutEffect } from 'react'`,`import { Flex, HeightAnimation } from '@dnb/eufemia'`,`import { Field, Form, Iterate, Tools, Value, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Wizard:l,Iterate:u,Value:c,Field:s},children:`<Form.Handler>
  <Wizard.Container>
    <Wizard.Step title="Step 1">
      <Iterate.Array path="/x" required>
        <Value.Address itemPath="/y" />
      </Iterate.Array>
      <Iterate.PushContainer
        path="/x"
        variant="outline"
        top
        bottom
        bubbleValidation
      >
        <Field.Address label="variant outline" itemPath="/y" required />
      </Iterate.PushContainer>
      <Iterate.PushContainer
        path="/x"
        variant="filled"
        top
        bottom
        bubbleValidation
      >
        <Field.Address label="variant filled" itemPath="/y" required />
      </Iterate.PushContainer>
      <Iterate.PushContainer
        path="/x"
        variant="basic"
        top
        bottom
        bubbleValidation
      >
        <Field.Address label="variant basic" itemPath="/y" required />
      </Iterate.PushContainer>
      <Wizard.Buttons />
    </Wizard.Step>
    <Wizard.Step title="Step 2">
      <Wizard.Buttons />
    </Wizard.Step>
  </Wizard.Container>
</Form.Handler>
`});function x(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...f(),...e.components},{VisibleWhenVisualTest:n}=t;return h||C(`Examples`,!1),_||C(`Examples.InitiallyOpen`,!0),v||C(`Examples.IsolatedData`,!0),y||C(`Examples.PreventUncommittedChanges`,!0),b||C(`Examples.Variants`,!0),m||C(`Examples.ViewAndEditContainer`,!0),n||C(`VisibleWhenVisualTest`,!0),(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(t.h2,{children:`Demos`}),`
`,(0,g.jsx)(t.h3,{children:`Prevent uncommitted changes`}),`
`,(0,g.jsxs)(t.p,{children:[`This example uses the `,(0,g.jsx)(t.code,{children:`preventUncommittedChanges`}),` property to display an error message if the user has made changes and attempts to navigate to the next Wizard step.`]}),`
`,(0,g.jsx)(t.p,{children:`Try entering something in the input field, then navigate to the next step. An error message will appear to indicate that changes must be committed first.`}),`
`,(0,g.jsx)(y,{}),`
`,(0,g.jsx)(t.h3,{children:`Initially open`}),`
`,(0,g.jsx)(_,{}),`
`,(0,g.jsx)(t.h3,{children:`With existing data`}),`
`,(0,g.jsx)(m,{}),`
`,(0,g.jsx)(t.h3,{children:`Isolated data`}),`
`,(0,g.jsxs)(t.p,{children:[`This demo shows how to use the `,(0,g.jsx)(t.code,{children:`isolatedData`}),` property to provide data to the PushContainer.`]}),`
`,(0,g.jsx)(v,{}),`
`,(0,g.jsx)(n,{children:(0,g.jsx)(b,{})})]})}function S(e={}){let{wrapper:t}={...f(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(x,{...e})}):x(e)}function C(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{S as default};