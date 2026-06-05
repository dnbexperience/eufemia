import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{X as r}from"./Anchor-9saPtqqX.js";import{M as i}from"./Autocomplete-D_rgJ8Uh.js";import{t as a}from"./Section-rdyRjaib.js";import{c as o}from"./ToggleButton-BMi2PwcS.js";import{t as s}from"./Card-ClZNWqpG.js";import{D as c,_ as l,a as u}from"./Selection-ZMzbWBRf.js";import{t as d}from"./NumberFormatExport-lvr8n9zZ.js";import{t as f}from"./Slider-B2byJAVK.js";import{t as p}from"./Form-C8lTzZqR.js";import{t as m}from"./Field-neGd0eKd.js";import{t as h}from"./ValueBlock-BkbSUpXr.js";import{t as g}from"./Value-Cjs3mKU7.js";import{n as _}from"./Wizard-D41Hy6DQ.js";import{t as v}from"./Iterate-BRZybbeZ.js";import{t as y}from"./ComponentBox-CG7uqrFy.js";var b=e({BaseFieldComponents:()=>E,CreateBasicFieldComponent:()=>C,CreateBasicValueComponent:()=>S,CreateComposedFieldComponent:()=>T,FeatureFields:()=>D,GettingStarted:()=>w,LayoutComponents:()=>O,QuickStart:()=>I,Transformers:()=>F,UsingFormHandler:()=>A,UsingFormSection:()=>N,UsingIterate:()=>P,UsingWizard:()=>M,Validation:()=>j,VisibilityBasedOnData:()=>k}),x=t(n()),S=()=>(0,x.jsx)(y,{scope:{ValueBlock:h},hideCode:!0,stableName:`CreateBasicValueComponent`,sourceImports:[`import { useCallback } from 'react'`,`import { Input, Slider, Flex, NumberFormat } from '@dnb/eufemia'`,`import { Form, Field, Value, FieldBlock, useFieldProps, DataContext, ValueBlock, Wizard, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{ValueBlock:h,NumberFormat:d},noInline:!0,children:`const MyValue = ({ value, ...props }) => {
  return (
    <ValueBlock {...props}>
      <NumberFormat.Currency>{value}</NumberFormat.Currency>
    </ValueBlock>
  )
}
render(<MyValue label="Label" value={1234} />)
`}),C=()=>(0,x.jsx)(y,{scope:{useFieldProps:l},hideCode:!0,stableName:`CreateBasicFieldComponent`,sourceImports:[`import { useCallback } from 'react'`,`import { Input, Slider, Flex, NumberFormat } from '@dnb/eufemia'`,`import { Form, Field, Value, FieldBlock, useFieldProps, DataContext, ValueBlock, Wizard, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{FieldBlock:u,Input:i},noInline:!0,children:`const MyField = (props) => {
  const fromInput = useCallback(({ value }) => value, [])
  const preparedProps = {
    label: 'What is the secret of this field?',
    fromInput,
    onChangeValidator: (value) => {
      if (value === 'secret') {
        return new Error('Do not reveal the secret!')
      }
    },
    ...props,
  }
  const { id, value, label, handleChange, handleFocus, handleBlur } =
    useFieldProps(preparedProps)
  return (
    <FieldBlock forId={id} label={label}>
      <Input
        id={id}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </FieldBlock>
  )
}
render(
  <MyField onChange={(value) => console.log('onChange', value)} required />
)
`}),w=()=>(0,x.jsx)(y,{hideCode:!0,stableName:`GettingStarted`,sourceImports:[`import { useCallback } from 'react'`,`import { Input, Slider, Flex, NumberFormat } from '@dnb/eufemia'`,`import { Form, Field, Value, FieldBlock, useFieldProps, DataContext, ValueBlock, Wizard, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:p,Flex:o,Card:s,Field:m},noInline:!0,children:`const existingData = {
  companyName: 'DNB',
  companyOrganizationNumber: '123456789',
  postalAddressSelect: 'companyAddress',
}
function Component() {
  const { data } = Form.useData('company-form')
  console.log('State:', data)
  return (
    <Form.Handler
      id="company-form"
      defaultData={existingData}
      onChange={console.log}
      onSubmit={console.log}
    >
      <Flex.Stack>
        <Form.MainHeading>Bedrift</Form.MainHeading>
        <Form.Card>
          <Field.Name.Company path="/companyName" required />
          <Field.OrganizationNumber
            path="/companyOrganizationNumber"
            required
          />
          <Field.Selection
            path="/postalAddressSelect"
            label="Ønsket sted for tilsendt post"
            variant="radio"
          >
            <Field.Option
              value="companyAddress"
              title="Samme som forretningsadresse"
            />
            <Field.Option value="other" title="Annet" />
          </Field.Selection>
        </Form.Card>
        <Form.ButtonRow>
          <Form.SubmitButton />
        </Form.ButtonRow>
      </Flex.Stack>
    </Form.Handler>
  )
}
render(<Component />)
`}),T=()=>(0,x.jsx)(y,{scope:{DataContext:c,useFieldProps:l},hideCode:!0,stableName:`CreateComposedFieldComponent`,sourceImports:[`import { useCallback } from 'react'`,`import { Input, Slider, Flex, NumberFormat } from '@dnb/eufemia'`,`import { Form, Field, Value, FieldBlock, useFieldProps, DataContext, ValueBlock, Wizard, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{FieldBlock:u,Flex:o,Field:m,Slider:f,DataContext:c,Provider:r},noInline:!0,children:`const MyComposedField = (props) => {
  const { id, value, hasError, handleChange, handleFocus, handleBlur } =
    useFieldProps({
      path: '/birthYear',
    })
  const handleBirthYearChange = useCallback(
    (sliderData) => {
      handleChange(sliderData.value)
    },
    [handleChange]
  )
  return (
    <FieldBlock id={id} label={props.label ?? 'Name and age'}>
      <Flex.Horizontal>
        <Field.Name.First path="/firstName" width="medium" minLength={2} />
        <Field.Name.Last path="/lastName" width="medium" required />
        <FieldBlock width="large">
          <Slider
            min={1900}
            max={new Date().getFullYear()}
            step={1}
            label="Birth year"
            value={parseFloat(String(value))}
            onChange={handleBirthYearChange}
            onDragStart={handleFocus}
            onDragEnd={handleBlur}
            status={hasError}
            tooltip
          />
        </FieldBlock>
      </Flex.Horizontal>
    </FieldBlock>
  )
}
const data = {
  firstName: 'John',
  birthYear: 2000,
}
render(
  <DataContext.Provider
    defaultData={data}
    onChange={(data) => console.log('onChange', data)}
  >
    <MyComposedField label="My custom label" />
  </DataContext.Provider>
)
`}),E=()=>(0,x.jsx)(y,{scope:{Value:g},stableName:`BaseFieldComponents`,sourceImports:[`import { useCallback } from 'react'`,`import { Input, Slider, Flex, NumberFormat } from '@dnb/eufemia'`,`import { Form, Field, Value, FieldBlock, useFieldProps, DataContext, ValueBlock, Wizard, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:p,Card:s,Field:m},children:`<Form.Card>
  <Field.String
    label="Text field"
    value="Lorem Ipsum"
    onChange={(value) => console.log('onChange', value)}
  />
  <Field.Number
    label="Number Field"
    value={789}
    onChange={(value) => console.log('onChange', value)}
  />
  <Field.Boolean
    label="Boolean Field"
    value={true}
    onChange={(value) => console.log('onChange', value)}
  />
</Form.Card>
`}),D=()=>(0,x.jsx)(y,{scope:{Value:g},stableName:`FeatureFields`,sourceImports:[`import { useCallback } from 'react'`,`import { Input, Slider, Flex, NumberFormat } from '@dnb/eufemia'`,`import { Form, Field, Value, FieldBlock, useFieldProps, DataContext, ValueBlock, Wizard, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:p,Card:s,Field:m},children:`<Form.Card>
  <Field.String label="Fornavn" value="John" />
  <Field.String label="Etternavn" value="Smith" />
  <Field.NationalIdentityNumber value="20058512345" />
  <Field.Email value="john@smith.email" />
  <Field.PhoneNumber value="+4798765432" />
</Form.Card>
`}),O=()=>(0,x.jsx)(y,{scope:{Value:g},stableName:`LayoutComponents`,sourceImports:[`import { useCallback } from 'react'`,`import { Input, Slider, Flex, NumberFormat } from '@dnb/eufemia'`,`import { Form, Field, Value, FieldBlock, useFieldProps, DataContext, ValueBlock, Wizard, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:o,Form:p,Card:s,Field:m},children:`<Flex.Stack>
  <Form.MainHeading>Profile</Form.MainHeading>

  <Form.Card>
    <Form.SubHeading>Name</Form.SubHeading>

    <Field.String label="Fornavn" value="John" />
    <Field.String label="Etternavn" value="Smith" />
  </Form.Card>

  <Form.Card>
    <Form.SubHeading>More information</Form.SubHeading>

    <Field.NationalIdentityNumber value="20058512345" />
    <Field.Email value="john@smith.email" />
    <Field.PhoneNumber value="+4798765432" />
  </Form.Card>
</Flex.Stack>
`}),k=()=>(0,x.jsx)(y,{scope:{Value:g},stableName:`VisibilityBasedOnData`,sourceImports:[`import { useCallback } from 'react'`,`import { Input, Slider, Flex, NumberFormat } from '@dnb/eufemia'`,`import { Form, Field, Value, FieldBlock, useFieldProps, DataContext, ValueBlock, Wizard, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:p,Flex:o,Card:s,Field:m},children:`<Form.Handler
  defaultData={{
    firstName: undefined,
    lastName: 'Smith',
    advanced: false,
    ssn: '123',
    email: '@smith.email',
    phone: '+4798765432',
  }}
  onChange={(data) => console.log('onChange', data)}
  onPathChange={(path, value) => console.log('onPathChange', path, value)}
  onSubmit={(data) => console.log('onSubmit', data)}
>
  <Flex.Stack>
    <Form.MainHeading>Profile</Form.MainHeading>

    <Form.Card>
      <Form.SubHeading>Name</Form.SubHeading>

      <Field.String path="/firstName" label="Fornavn" />
      <Field.String path="/lastName" label="Etternavn" />
    </Form.Card>

    <Field.Boolean
      path="/advanced"
      variant="checkbox-button"
      label="More fields"
    />
    <Form.Visibility pathTrue="/advanced">
      <Flex.Stack>
        <Form.Card>
          <Form.SubHeading>More information</Form.SubHeading>

          <Field.NationalIdentityNumber value="20058512345" />
          <Field.Email value="john@smith.email" />
          <Field.PhoneNumber value="+4798765432" />
        </Form.Card>
      </Flex.Stack>
    </Form.Visibility>
  </Flex.Stack>
</Form.Handler>
`}),A=()=>(0,x.jsx)(y,{scope:{Value:g},stableName:`UsingFormHandler`,sourceImports:[`import { useCallback } from 'react'`,`import { Input, Slider, Flex, NumberFormat } from '@dnb/eufemia'`,`import { Form, Field, Value, FieldBlock, useFieldProps, DataContext, ValueBlock, Wizard, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:p,Card:s,Field:m},children:`<Form.Handler
  defaultData={{
    firstName: 'John',
    lastName: 'Smith',
    ssn: '20058512345',
    email: 'john@smith.email',
    phone: '+4798765432',
  }}
  onChange={(data) => console.log('onChange', data)}
  onPathChange={(path, value) => console.log('onPathChange', path, value)}
  onSubmit={(data) => console.log('onSubmit', data)}
>
  <Form.MainHeading>Profile</Form.MainHeading>

  <Form.Card>
    <Field.String path="/firstName" label="Fornavn" />
    <Field.String path="/lastName" label="Etternavn" />
    <Field.NationalIdentityNumber path="/ssn" />
    <Field.Email path="/email" />
    <Field.PhoneNumber path="/phone" />

    <Form.ButtonRow>
      <Form.SubmitButton />
    </Form.ButtonRow>
  </Form.Card>
</Form.Handler>
`}),j=()=>(0,x.jsx)(y,{scope:{Value:g},stableName:`Validation`,sourceImports:[`import { useCallback } from 'react'`,`import { Input, Slider, Flex, NumberFormat } from '@dnb/eufemia'`,`import { Form, Field, Value, FieldBlock, useFieldProps, DataContext, ValueBlock, Wizard, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:p,Card:s,Field:m},children:`<Form.Handler
  defaultData={{
    firstName: undefined,
    lastName: 'Smith',
    ssn: '123',
    email: '@smith.email',
    phone: '+4798765432',
  }}
  onChange={(data) => console.log('onChange', data)}
  onPathChange={(path, value) => console.log('onPathChange', path, value)}
  onSubmit={(data) => console.log('onSubmit', data)}
>
  <Form.MainHeading>Profile</Form.MainHeading>

  <Form.Card>
    <Field.String path="/firstName" label="Fornavn" required />
    <Field.String path="/lastName" label="Etternavn" required />
    <Field.NationalIdentityNumber path="/ssn" validateInitially />
    <Field.Email path="/email" validateInitially />
    <Field.PhoneNumber path="/phone" validateInitially />
  </Form.Card>
</Form.Handler>
`}),M=()=>(0,x.jsx)(y,{stableName:`UsingWizard`,sourceImports:[`import { useCallback } from 'react'`,`import { Input, Slider, Flex, NumberFormat } from '@dnb/eufemia'`,`import { Form, Field, Value, FieldBlock, useFieldProps, DataContext, ValueBlock, Wizard, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Wizard:_,Form:p,Card:s,Field:m,Value:g},noInline:!0,children:`function MyForm() {
  // Routers like "react-router" are supported as well
  Wizard.useQueryLocator('my-wizard')
  const { summaryTitle } = Form.useTranslation().Step
  return (
    <Form.Handler
      defaultData={{
        firstName: undefined,
        lastName: 'Smith',
        advanced: false,
        ssn: '123',
        email: '@smith.email',
        phone: '+4798765432',
      }}
      onChange={(data) => console.log('onChange', data)}
      onPathChange={(path, value) =>
        console.log('onPathChange', path, value)
      }
      onSubmit={(data) => console.log('onSubmit', data)}
    >
      <Wizard.Container id="my-wizard" mode="loose">
        <Wizard.Step title="Name">
          <Form.MainHeading>Profile</Form.MainHeading>

          <Form.Card>
            <Form.SubHeading>Name</Form.SubHeading>

            <Field.String path="/firstName" label="Fornavn" required />
            <Field.String path="/lastName" label="Etternavn" required />
          </Form.Card>

          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title="More information">
          <Form.MainHeading>Profile</Form.MainHeading>

          <Form.Card>
            <Form.SubHeading>More information</Form.SubHeading>

            <Field.NationalIdentityNumber path="/ssn" />
            <Field.Email path="/email" />
            <Field.PhoneNumber path="/phone" />
          </Form.Card>

          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title={summaryTitle}>
          <Form.MainHeading>Profile</Form.MainHeading>

          <Form.Card>
            <Value.SummaryList layout="grid">
              <Value.String path="/firstName" label="Fornavn" />
              <Value.String path="/lastName" label="Etternavn" />

              <Value.NationalIdentityNumber path="/ssn" />
              <Value.Email path="/email" />
              <Value.PhoneNumber path="/phone" />
            </Value.SummaryList>
          </Form.Card>

          <Form.ButtonRow>
            <Wizard.Buttons />
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
render(<MyForm />)
`}),N=()=>(0,x.jsx)(y,{stableName:`UsingFormSection`,sourceImports:[`import { useCallback } from 'react'`,`import { Input, Slider, Flex, NumberFormat } from '@dnb/eufemia'`,`import { Form, Field, Value, FieldBlock, useFieldProps, DataContext, ValueBlock, Wizard, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:p,Section:a,Field:m,Value:g,Card:s},noInline:!0,children:`const MyEditContainer = () => {
  return (
    <Form.Section.EditContainer variant="basic">
      <Field.Name.First path="/firstName" />
      <Field.Name.Last path="/lastName" />
    </Form.Section.EditContainer>
  )
}
const MyViewContainer = () => {
  return (
    <Form.Section.ViewContainer variant="basic">
      <Value.SummaryList>
        <Value.Name.First path="/firstName" />
        <Value.Name.Last path="/lastName" />
      </Value.SummaryList>
    </Form.Section.ViewContainer>
  )
}
render(
  <Form.Handler
    onSubmit={async (data) => console.log('onSubmit', data)}
    defaultData={{
      nestedPath: {
        firstName: 'Nora',
        lastName: undefined, // initiate error
      },
    }}
  >
    <Form.Card>
      <Form.SubHeading>Your account</Form.SubHeading>
      <Form.Section path="/nestedPath" required>
        <MyEditContainer />
        <MyViewContainer />
      </Form.Section>
    </Form.Card>
    <Form.SubmitButton />
  </Form.Handler>
)
`}),P=()=>(0,x.jsx)(y,{stableName:`UsingIterate`,sourceImports:[`import { useCallback } from 'react'`,`import { Input, Slider, Flex, NumberFormat } from '@dnb/eufemia'`,`import { Form, Field, Value, FieldBlock, useFieldProps, DataContext, ValueBlock, Wizard, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:m,Iterate:v,Value:g,Form:p,Flex:o,Card:s},noInline:!0,children:`const MyEditItemForm = () => {
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
function MyForm() {
  return (
    <Form.Handler
      data={{
        accounts: [
          {
            firstName: 'Tony',
            lastName: undefined, // initiate error
          },
        ],
      }}
      onChange={(data) => console.log('DataContext/onChange', data)}
      onSubmit={async (data) => console.log('onSubmit', data)}
    >
      <Flex.Vertical>
        <Form.MainHeading>Accounts</Form.MainHeading>

        <Form.Card gap={false}>
          <Iterate.Array path="/accounts">
            <MyViewItem />
            <MyEditItem />
          </Iterate.Array>

          <CreateNewEntry />
        </Form.Card>

        <Form.SubmitButton variant="send" />
      </Flex.Vertical>
    </Form.Handler>
  )
}
render(<MyForm />)
`}),F=()=>(0,x.jsx)(y,{hideCode:!0,stableName:`Transformers`,sourceImports:[`import { useCallback } from 'react'`,`import { Input, Slider, Flex, NumberFormat } from '@dnb/eufemia'`,`import { Form, Field, Value, FieldBlock, useFieldProps, DataContext, ValueBlock, Wizard, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:p,Card:s,Field:m,Value:g},noInline:!0,children:`const MyForm = () => {
  const transformToUpper = (value) => {
    return value?.toUpperCase()
  }
  const transformToLower = (value) => {
    return value?.toLowerCase()
  }
  return (
    <Form.Handler onChange={console.log}>
      <Form.Card>
        <Field.String
          width="medium"
          label="Input value"
          placeholder="Type letters"
          path="/myField"
          transformIn={transformToUpper}
          transformOut={transformToLower}
        />

        <Value.String label="Output value" path="/myField" />
      </Form.Card>
    </Form.Handler>
  )
}
render(<MyForm />)
`}),I=()=>(0,x.jsx)(y,{hideCode:!0,stableName:`QuickStart`,sourceImports:[`import { useCallback } from 'react'`,`import { Input, Slider, Flex, NumberFormat } from '@dnb/eufemia'`,`import { Form, Field, Value, FieldBlock, useFieldProps, DataContext, ValueBlock, Wizard, Iterate } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:p,Card:s,Field:m},noInline:!0,children:`const existingData = {
  companyName: 'DNB',
}
function MyForm() {
  return (
    <Form.Handler
      defaultData={existingData}
      onSubmit={async (data) => console.log('onSubmit', data)}
      required
    >
      <Form.MainHeading>Quick start</Form.MainHeading>

      <Form.Card>
        <Field.Name.Company path="/companyName" />

        <Field.OrganizationNumber path="/companyOrganizationNumber" />

        <Field.Selection
          path="/postalAddressSelect"
          label="Ønsket sted for tilsendt post"
          variant="radio"
          required={false}
        >
          <Field.Option
            value="companyAddress"
            title="Samme som forretningsadresse"
          />
          <Field.Option value="other" title="Annet" />
        </Field.Selection>

        <Form.Visibility
          visibleWhen={{
            path: '/postalAddressSelect',
            hasValue: 'other',
          }}
          animate
        >
          <Field.String
            path="/postalAddress"
            label="Sted for tilsendt post"
          />
        </Form.Visibility>
      </Form.Card>
      <Form.SubmitButton variant="send" />
    </Form.Handler>
  )
}
render(<MyForm />)
`});export{b as a,O as c,A as d,N as f,k as g,j as h,T as i,I as l,M as m,C as n,D as o,P as p,S as r,w as s,E as t,F as u};