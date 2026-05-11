import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./stop-OugRuIkx.js";import{t as r}from"./ComponentBox-xW2kV1s2.js";import{Oa as i}from"./index-DVm0MbGb.js";import{s as a}from"./Examples-Cu-AFqOX.js";var o=e({AsyncChangeAndValidation:()=>f,AsyncOnSubmitRequest:()=>d,AsyncSubmit:()=>l,AsyncSubmitComplete:()=>u,Autofill:()=>m,FilterData:()=>_,Locale:()=>h,RequiredAndOptionalFields:()=>c,SessionStorage:()=>p,TransformData:()=>v,VisibleData:()=>g,WithHelp:()=>y}),s=t(),c=()=>(0,s.jsx)(r,{"data-visual-test":`required-and-optional-fields`,children:`<Form.Handler required>
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
`}),l=()=>(0,s.jsx)(r,{children:`<Form.Handler onSubmit={async (data) => console.log('onSubmit', data)}>
  <Form.Card>
    <Field.Email path="/email" />
    <Form.ButtonRow>
      <Form.SubmitButton />
    </Form.ButtonRow>
  </Form.Card>
</Form.Handler>
`}),u=()=>(0,s.jsx)(r,{children:`<Form.Handler
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
`}),d=()=>(0,s.jsx)(r,{children:`<Form.Handler
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
`}),f=()=>(0,s.jsx)(r,{scope:{debounceAsync:i,createRequest:a,stopIcon:n},noInline:!0,children:`const validator = debounceAsync(async function secondValidator(
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
`}),p=()=>(0,s.jsx)(r,{children:`<Form.Handler
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
`}),m=()=>(0,s.jsx)(r,{children:`<Form.Handler
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
`}),h=()=>(0,s.jsx)(r,{noInline:!0,children:`const myTranslations = {
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
`}),g=()=>(0,s.jsx)(r,{children:`<Form.Handler
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
`}),_=()=>(0,s.jsx)(r,{noInline:!0,children:`const id = 'my-form'
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
`}),v=()=>(0,s.jsx)(r,{noInline:!0,children:`const MyForm = () => {
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
`}),y=()=>(0,s.jsx)(r,{children:`<Form.Handler
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
`});export{m as a,h as c,v as d,g as f,u as i,c as l,d as n,o,y as p,l as r,_ as s,f as t,p as u};