import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{ut as r}from"./SpacingUtils-nbqXIwIZ.js";import{t as i}from"./stop-BVULijT-.js";import{t as a}from"./Button-2YHZk8Pc.js";import{c as o}from"./ToggleButton-D3NEk3jO.js";import{t as s}from"./Card-C6UABezd.js";import{t as c}from"./Form-C16rVaXm.js";import{t as l}from"./Field-B5trC2Cn.js";import{t as u}from"./Value-DvCb56Kz.js";import{t as d}from"./Tools-B0-vRSQX.js";import{j as f}from"./index-BCXtuv-b.js";import{t as p}from"./ComponentBox-B2X8809Z.js";import{s as m}from"./Examples-Dov4hVd8.js";var h=e({AsyncChangeAndValidation:()=>x,AsyncOnSubmitRequest:()=>b,AsyncSubmit:()=>v,AsyncSubmitComplete:()=>y,Autofill:()=>C,FilterData:()=>E,Locale:()=>w,RequiredAndOptionalFields:()=>_,SessionStorage:()=>S,TransformData:()=>D,VisibleData:()=>T,WithHelp:()=>O}),g=t(n()),_=()=>(0,g.jsx)(p,{"data-visual-test":`required-and-optional-fields`,stableName:`RequiredAndOptionalFields`,sourceImports:[`import { useState } from 'react'`,`import { Form, Field, Value, Tools } from '@dnb/eufemia/extensions/forms'`,`import { stop as stopIcon } from '@dnb/eufemia/icons'`,`import { Button, Flex } from '@dnb/eufemia'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`,`import { createRequest } from '../SubmitIndicator/Examples'`],__buildScope:{Form:c,Card:s,Field:l},children:`<Form.Handler required>
  <Form.Card>
    <Field.Email path="/email" required={false} />
    <Field.String
      path="/custom"
      label="Label"
      labelDescription="Label description"
      required={false}
    />
    <Field.Currency path="/amount" label="Amount" />
    <Form.SubmitButton />
  </Form.Card>
</Form.Handler>
`}),v=()=>(0,g.jsx)(p,{stableName:`AsyncSubmit`,sourceImports:[`import { useState } from 'react'`,`import { Form, Field, Value, Tools } from '@dnb/eufemia/extensions/forms'`,`import { stop as stopIcon } from '@dnb/eufemia/icons'`,`import { Button, Flex } from '@dnb/eufemia'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`,`import { createRequest } from '../SubmitIndicator/Examples'`],__buildScope:{Form:c,Card:s,Field:l},children:`<Form.Handler onSubmit={async (data) => console.log('onSubmit', data)}>
  <Form.Card>
    <Field.Email path="/email" />
    <Form.ButtonRow>
      <Form.SubmitButton />
    </Form.ButtonRow>
  </Form.Card>
</Form.Handler>
`}),y=()=>(0,g.jsx)(p,{stableName:`AsyncSubmitComplete`,sourceImports:[`import { useState } from 'react'`,`import { Form, Field, Value, Tools } from '@dnb/eufemia/extensions/forms'`,`import { stop as stopIcon } from '@dnb/eufemia/icons'`,`import { Button, Flex } from '@dnb/eufemia'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`,`import { createRequest } from '../SubmitIndicator/Examples'`],__buildScope:{Form:c,Flex:o,Heading:f,Card:s,Value:u},children:`<Form.Handler
  data={{
    myField: 'Some value',
  }}
  onSubmit={async (data) => {
    console.log('onSubmit', data)

    // Wait for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // e.g. go to new location

    // Optionally, you can return e.g. the "pending" status with an additional info
    return {
      info: 'Redirecting to a new location',
      // Force the form to stay in pending state
      status: 'pending',
    }
  }}
  asyncSubmitTimeout={10000}
>
  <Flex.Stack>
    <Form.MainHeading>Heading</Form.MainHeading>
    <Form.Card>
      <Value.String label="Summary" path="/myField" />
    </Form.Card>
    <Form.ButtonRow>
      <Form.SubmitButton />
    </Form.ButtonRow>
  </Flex.Stack>
</Form.Handler>
`}),b=()=>(0,g.jsx)(p,{stableName:`AsyncOnSubmitRequest`,sourceImports:[`import { useState } from 'react'`,`import { Form, Field, Value, Tools } from '@dnb/eufemia/extensions/forms'`,`import { stop as stopIcon } from '@dnb/eufemia/icons'`,`import { Button, Flex } from '@dnb/eufemia'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`,`import { createRequest } from '../SubmitIndicator/Examples'`],__buildScope:{Form:c,Flex:o,Card:s,Field:l},children:`<Form.Handler
  onSubmitRequest={async ({ getErrors }) => {
    const errors = getErrors()
    console.log('onSubmitRequest errors', errors)

    // Wait for 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return an error message to display in the form
    return {
      error: new Error(
        \`The form has \${errors.length} error(s). Please fix them before submitting.\`
      ),
    }
  }}
>
  <Flex.Stack>
    <Form.Card>
      <Field.String label="Required field" path="/myField" required />
      <Field.Email path="/email" required />
    </Form.Card>
    <Form.ButtonRow>
      <Form.SubmitButton />
    </Form.ButtonRow>
  </Flex.Stack>
</Form.Handler>
`}),x=()=>(0,g.jsx)(p,{scope:{debounceAsync:r,createRequest:m,stopIcon:i},stableName:`AsyncChangeAndValidation`,sourceImports:[`import { useState } from 'react'`,`import { Form, Field, Value, Tools } from '@dnb/eufemia/extensions/forms'`,`import { stop as stopIcon } from '@dnb/eufemia/icons'`,`import { Button, Flex } from '@dnb/eufemia'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`,`import { createRequest } from '../SubmitIndicator/Examples'`],__buildScope:{Form:c,Flex:o,Field:l,Button:a},noInline:!0,children:`const validator = debounceAsync(async function secondValidator(
  value: string
) {
  try {
    const request = createRequest()
    const wasCanceled = this.addCancelEvent(request.cancel)
    await request(2000) // Simulate a request

    if (wasCanceled()) {
      throw new Error('Validation request canceled')
    }
  } catch (error) {
    return error
  }
  if (value !== 'valid') {
    return new Error(\`Custom error with invalid value: \${value}\`) // Show this message
  }
})

const cancelRequest = () => {
  validator.cancel()
}
const onSubmit = async (data) => {
  console.log('onSubmit', data)

  // Wait for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // For demo purposes, we show a message
  return {
    info: 'Message from onSubmit return',
  }
}
const onChangeForm = async (data) => {
  console.log('onChangeForm', data)

  // Wait for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // For demo purposes, we show a message
  return {
    warning: 'Warning message',
  }
}
const onChangeField = async (data) => {
  console.log('onChangeField', data)

  // Wait for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // For demo purposes, we show a message
  return {
    info: 'Info message',
  }
}
const MyForm = () => {
  const { data } = Form.useData('unique-id')
  console.log('data', data)
  return (
    <Form.Handler
      id="unique-id"
      onSubmit={onSubmit}
      onChange={onChangeForm}
    >
      <Flex.Stack>
        <Field.String
          label='Type "valid" to validate the field'
          path="/myField"
          required
          onChangeValidator={validator}
          onChange={onChangeField}
          autoComplete="off"
        />
        <Form.ButtonRow>
          <Form.SubmitButton text="Save" />
          <Button
            text="Stop async operations"
            variant="tertiary"
            icon={stopIcon}
            iconPosition="left"
            disabled={false}
            onClick={cancelRequest}
          />
        </Form.ButtonRow>
      </Flex.Stack>
    </Form.Handler>
  )
}
render(<MyForm />)
`}),S=()=>(0,g.jsx)(p,{stableName:`SessionStorage`,sourceImports:[`import { useState } from 'react'`,`import { Form, Field, Value, Tools } from '@dnb/eufemia/extensions/forms'`,`import { stop as stopIcon } from '@dnb/eufemia/icons'`,`import { Button, Flex } from '@dnb/eufemia'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`,`import { createRequest } from '../SubmitIndicator/Examples'`],__buildScope:{Form:c,Card:s,Field:l},children:`<Form.Handler
  onSubmit={(data, { resetForm, clearData }) => {
    console.log('onSubmit', data)

    // Docs: https://eufemia.dnb.no/uilib/extensions/forms/DataContext/Provider/events/#onsubmit-parameters
    resetForm()
    clearData()
  }}
  sessionStorageId="session-key"
>
  <Form.Card>
    <Field.String label="Name" path="/name" />
    <Field.Email path="/email" />
    <Form.ButtonRow>
      <Form.SubmitButton />
    </Form.ButtonRow>
  </Form.Card>
</Form.Handler>
`}),C=()=>(0,g.jsx)(p,{stableName:`Autofill`,sourceImports:[`import { useState } from 'react'`,`import { Form, Field, Value, Tools } from '@dnb/eufemia/extensions/forms'`,`import { stop as stopIcon } from '@dnb/eufemia/icons'`,`import { Button, Flex } from '@dnb/eufemia'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`,`import { createRequest } from '../SubmitIndicator/Examples'`],__buildScope:{Form:c,Flex:o,Card:s,Field:l},children:`<Form.Handler
  onSubmit={(data) => console.log('onSubmit', data)}
  autoComplete
>
  <Flex.Stack>
    <Form.MainHeading>Delivery address</Form.MainHeading>

    <Form.Card>
      <Form.SubHeading>Your name</Form.SubHeading>

      <Field.Name.First path="/firstName" required />
      <Field.Name.Last path="/lastName" required />
    </Form.Card>

    <Form.Card>
      <Form.SubHeading>Your address</Form.SubHeading>

      <Field.Composition width="large">
        <Field.String
          label="Street"
          width="stretch"
          path="/streetName"
          required
        />
        <Field.Number
          label="Nr."
          width="small"
          path="/streetNr"
          required
        />
      </Field.Composition>

      <Field.PostalCodeAndCity
        postalCode={{
          required: true,
          path: '/postalCode',
        }}
        city={{
          required: true,
          path: '/city',
        }}
      />
    </Form.Card>

    <Form.SubmitButton />
  </Flex.Stack>
</Form.Handler>
`}),w=()=>(0,g.jsx)(p,{stableName:`Locale`,sourceImports:[`import { useState } from 'react'`,`import { Form, Field, Value, Tools } from '@dnb/eufemia/extensions/forms'`,`import { stop as stopIcon } from '@dnb/eufemia/icons'`,`import { Button, Flex } from '@dnb/eufemia'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`,`import { createRequest } from '../SubmitIndicator/Examples'`],__buildScope:{Form:c,Card:s,Field:l},noInline:!0,children:`const myTranslations = {
  'nb-NO': {
    PhoneNumber: {
      numberLabel: 'Egendefinert 🚀',
    },
  },
  'en-GB': {
    PhoneNumber: {
      numberLabel: 'Custom 🚀',
    },
  },
}
const MyForm = () => {
  const { data } = Form.useData('my-form', {
    locale: 'en-GB',
  })
  return (
    <Form.Handler
      id="my-form"
      locale={data?.locale}
      translations={myTranslations}
    >
      <Form.Card>
        <Field.PhoneNumber />

        <Field.Selection
          path="/locale"
          variant="button"
          optionsLayout="horizontal"
        >
          <Field.Option value="nb-NO">Norsk</Field.Option>
          <Field.Option value="sv-SE">Svenska</Field.Option>
          <Field.Option value="da-DK">Dansk</Field.Option>
          <Field.Option value="en-GB">English</Field.Option>
        </Field.Selection>
      </Form.Card>
    </Form.Handler>
  )
}
render(<MyForm />)
`}),T=()=>(0,g.jsx)(p,{stableName:`VisibleData`,sourceImports:[`import { useState } from 'react'`,`import { Form, Field, Value, Tools } from '@dnb/eufemia/extensions/forms'`,`import { stop as stopIcon } from '@dnb/eufemia/icons'`,`import { Button, Flex } from '@dnb/eufemia'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`,`import { createRequest } from '../SubmitIndicator/Examples'`],__buildScope:{Form:c,Flex:o,Field:l},children:`<Form.Handler
  defaultData={{
    isVisible: true,
  }}
  onSubmit={(data, { reduceToVisibleFields }) => {
    const myData = reduceToVisibleFields(data, {
      removePaths: ['/isVisible'],
    })
    console.log('Result of reduceToVisibleFields: ', myData)
  }}
>
  <Flex.Stack>
    <Field.Boolean
      label="Show radio buttons"
      variant="button"
      path="/isVisible"
    />
    <Form.Visibility pathTrue="/isVisible" animate>
      <Field.Selection
        label="Radio buttons"
        variant="radio"
        path="/myValue"
        defaultValue="foo"
      >
        <Field.Option value="foo" title="Foo" />
        <Field.Option value="bar" title="Bar" />
      </Field.Selection>
    </Form.Visibility>
  </Flex.Stack>
</Form.Handler>
`}),E=()=>(0,g.jsx)(p,{stableName:`FilterData`,sourceImports:[`import { useState } from 'react'`,`import { Form, Field, Value, Tools } from '@dnb/eufemia/extensions/forms'`,`import { stop as stopIcon } from '@dnb/eufemia/icons'`,`import { Button, Flex } from '@dnb/eufemia'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`,`import { createRequest } from '../SubmitIndicator/Examples'`],__buildScope:{Form:c,Flex:o,Field:l,Tools:d},noInline:!0,children:`const id = 'my-form'
const filterDataHandler = ({ props }) => !props.disabled
const MyForm = () => {
  const { data } = Form.useData(id, {
    disabled: false,
    myField: 'Value',
  })
  return (
    <Form.Handler
      id={id}
      onSubmit={(data, { filterData }) => {
        console.log('onSubmit', filterData(filterDataHandler))
      }}
    >
      <Flex.Stack>
        <Field.Boolean label="Disabled" path="/disabled" />
        <Field.String
          label="My Field"
          path="/myField"
          disabled={data.disabled}
        />
        <Form.ButtonRow>
          <Form.SubmitButton />
        </Form.ButtonRow>
      </Flex.Stack>
    </Form.Handler>
  )
}
const Output = () => {
  const { filterData } = Form.useData(id)
  const { hasErrors } = Form.useValidation(id)
  return (
    <>
      <Tools.Log top data={hasErrors()} label="hasErrors:" />
      <Tools.Log top data={filterData(filterDataHandler)} />
    </>
  )
}
render(
  <>
    <MyForm />
    <Output />
  </>
)
`}),D=()=>(0,g.jsx)(p,{stableName:`TransformData`,sourceImports:[`import { useState } from 'react'`,`import { Form, Field, Value, Tools } from '@dnb/eufemia/extensions/forms'`,`import { stop as stopIcon } from '@dnb/eufemia/icons'`,`import { Button, Flex } from '@dnb/eufemia'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`,`import { createRequest } from '../SubmitIndicator/Examples'`],__buildScope:{Form:c,Flex:o,Field:l,Tools:d},noInline:!0,children:`const MyForm = () => {
  const [submitData, setSubmitData] = useState({})
  const onSubmit = (data, { transformData }) => {
    const transformedData = transformData(
      data,
      ({ value, displayValue, label }) => {
        return {
          value,
          displayValue,
          label,
        }
      }
    )
    setSubmitData(transformedData)
    console.log('onSubmit', transformedData)
  }
  return (
    <Form.Handler onSubmit={onSubmit}>
      <Flex.Stack>
        <Field.String
          label="Foo label"
          path="/myString"
          defaultValue="foo"
        />

        <Field.Selection
          label="Bar label"
          path="/mySelection"
          defaultValue="bar"
          variant="dropdown"
        >
          <Field.Option value="foo" title="Foo Value" />
          <Field.Option value="bar" title="Bar Value" />
        </Field.Selection>

        <Field.ArraySelection
          label="Bar label"
          path="/myArraySelection"
          defaultValue={['bar']}
          variant="checkbox"
        >
          <Field.Option value="foo" title="Foo Value" />
          <Field.Option value="bar" title="Bar Value" />
        </Field.ArraySelection>

        <Form.SubmitButton />

        <Tools.Log
          label="Submit Data (press submit to update)"
          data={submitData}
        />
        <Tools.Log label="Data Context" />
      </Flex.Stack>
    </Form.Handler>
  )
}
render(<MyForm />)
`}),O=()=>(0,g.jsx)(p,{stableName:`WithHelp`,sourceImports:[`import { useState } from 'react'`,`import { Form, Field, Value, Tools } from '@dnb/eufemia/extensions/forms'`,`import { stop as stopIcon } from '@dnb/eufemia/icons'`,`import { Button, Flex } from '@dnb/eufemia'`,`import { debounceAsync } from '@dnb/eufemia/shared/helpers/debounce'`,`import { createRequest } from '../SubmitIndicator/Examples'`],__buildScope:{Form:c,Card:s,Field:l,Value:u},children:`<Form.Handler
  defaultData={{
    myField: 12345,
  }}
>
  <Form.Card>
    <Field.Number
      path="/myField"
      label="Label text"
      help={{
        title: 'Help title',
        content: 'Help content.',
      }}
    />
    <Value.Number
      path="/myField"
      inheritLabel
      help={{
        title: 'Help title',
        content: 'Help content.',
      }}
    />
  </Form.Card>
</Form.Handler>
`});export{C as a,w as c,D as d,T as f,y as i,_ as l,b as n,h as o,O as p,v as r,E as s,x as t,S as u};