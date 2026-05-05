import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-geTEYZ7b.js";import{Rr as i}from"./index-CMgyXmp3.js";var a=e({CommitHandleRef:()=>c,InsideSection:()=>u,PreventUncommittedChanges:()=>d,TransformCommitData:()=>l,UpdateDataReference:()=>f,UsingCommitButton:()=>s});t();var o=n(),s=()=>(0,o.jsx)(r,{children:`<Form.Handler
  onSubmit={(data) => console.log('onSubmit', data)}
  onChange={(data) => console.log('Regular onChange:', data)}
>
  <Flex.Stack>
    <Form.Isolation
      resetDataAfterCommit
      onChange={(data) => console.log('Isolated onChange:', data)}
    >
      <Flex.Stack>
        <Field.String required label="Isolated" path="/isolated" />
        <Form.Isolation.CommitButton text="Commit" />
      </Flex.Stack>
    </Form.Isolation>

    <Field.String
      required
      label="Committed from isolation"
      path="/isolated"
    />
    <Field.String required label="Outside of isolation" path="/regular" />

    <Form.SubmitButton />
  </Flex.Stack>
</Form.Handler>
`}),c=()=>(0,o.jsx)(r,{noInline:!0,children:`const MyForm = () => {
  const commitHandleRef = React.useRef(null)
  return (
    <>
      <Form.Handler
        bottom="large"
        data={{
          contactPersons: [
            {
              title: 'Hanne',
              value: 'hanne',
            },
          ],
        }}
      >
        <Form.Card>
          <Form.SubHeading>Ny hovedkontaktperson</Form.SubHeading>

          <HeightAnimation>
            <Field.Selection variant="radio" dataPath="/contactPersons" />
          </HeightAnimation>

          <Form.Isolation
            commitHandleRef={commitHandleRef}
            transformOnCommit={(isolatedData, handlerData) => {
              // Because of missing TypeScript support
              const contactPersons = handlerData['contactPersons']
              const newPerson = isolatedData['newPerson']
              const value = newPerson.title.toLowerCase()
              const transformedData = {
                ...handlerData,
                contactPersons: [
                  ...contactPersons,
                  {
                    ...newPerson,
                    value,
                  },
                ],
              }
              return transformedData
            }}
          >
            <Flex.Stack>
              <Form.Section path="/newPerson">
                <Field.Name.First required path="/title" />
              </Form.Section>
            </Flex.Stack>
          </Form.Isolation>
          <Tools.Log />
        </Form.Card>
      </Form.Handler>

      <button
        onClick={() => {
          commitHandleRef.current()
        }}
      >
        Commit from outside of handler
      </button>
    </>
  )
}
render(<MyForm />)
`}),l=()=>(0,o.jsx)(r,{noInline:!0,children:`const MyForm = () => {
  return (
    <Form.Handler
      onChange={console.log}
      defaultData={{
        contactPersons: [
          {
            title: 'Hanne',
            value: 'hanne',
          },
        ],
        mySelection: 'hanne',
      }}
    >
      <Form.Card>
        <Form.SubHeading>Legg til ny hovedkontaktperson</Form.SubHeading>

        <HeightAnimation>
          <Field.Selection
            variant="radio"
            path="/mySelection"
            dataPath="/contactPersons"
          >
            <Field.Option title="Annen person" value="other" />
          </Field.Selection>
        </HeightAnimation>

        <Form.Visibility
          visibleWhen={{
            path: '/mySelection',
            hasValue: 'other',
          }}
          animate
        >
          <Flex.Stack>
            <Form.SubHeading>Ny hovedkontaktperson</Form.SubHeading>

            <Form.Isolation
              transformOnCommit={(isolatedData, handlerData) => {
                // Because of missing TypeScript support
                const contactPersons = handlerData['contactPersons']
                const newPerson = isolatedData['newPerson']
                return {
                  ...handlerData,
                  contactPersons: [
                    ...contactPersons,
                    {
                      ...newPerson,
                      value: newPerson.title.toLowerCase(),
                    },
                  ],
                }
              }}
              onCommit={(data, { clearData }) => {
                clearData()
              }}
              resetDataAfterCommit
            >
              <Flex.Stack>
                <Form.Section path="/newPerson">
                  <Field.Name.First required path="/title" />
                </Form.Section>

                <Form.Isolation.CommitButton />
              </Flex.Stack>
            </Form.Isolation>
          </Flex.Stack>
        </Form.Visibility>
      </Form.Card>
    </Form.Handler>
  )
}
render(<MyForm />)
`}),u=()=>(0,o.jsx)(r,{children:`<Form.Handler
  defaultData={{
    mySection: {
      isolated: 'Isolated value defined outside',
      regular: 'Outer regular value',
    },
  }}
  onChange={(data) => {
    console.log('Outer onChange:', data)
  }}
>
  <Form.Section path="/mySection">
    <Flex.Stack>
      <Form.Isolation
        defaultData={{
          isolated: 'The real initial "isolated" value',
        }}
        onPathChange={(path, value) => {
          console.log('Isolated onChange:', path, value)
        }}
        onCommit={(data) => console.log('onCommit:', data)}
        resetDataAfterCommit
      >
        <Flex.Stack>
          <Field.String label="Isolated" path="/isolated" required />
          <Form.Isolation.CommitButton />
        </Flex.Stack>
      </Form.Isolation>

      <Field.String label="Synced" path="/isolated" />
      <Field.String label="Regular" path="/regular" required />

      <Form.SubmitButton />
    </Flex.Stack>
  </Form.Section>
</Form.Handler>
`}),d=()=>(0,o.jsx)(r,{children:`<Form.Handler onSubmit={async (data) => console.log('onSubmit', data)}>
  <Flex.Stack>
    <Form.Isolation preventUncommittedChanges resetDataAfterCommit>
      <Flex.Stack>
        <Field.String required label="Isolated" path="/isolated" />

        <Flex.Horizontal>
          <Form.Isolation.CommitButton />
          <Form.Isolation.ResetButton showWhen="uncommittedChangeDetected" />
        </Flex.Horizontal>
      </Flex.Stack>
    </Form.Isolation>

    <Form.SubmitButton />

    <Tools.Log />
  </Flex.Stack>
</Form.Handler>
`}),f=()=>(0,o.jsx)(r,{noInline:!0,children:`const dataReference = Form.Isolation.createDataReference()
const SetDelayedData = () => {
  const { update } = Form.useData()
  React.useEffect(() => {
    setTimeout(() => {
      update('/isolated', 'With a delayed default value')
      dataReference.refresh() // <-- refresh the data reference
    }, 1000)
  }, [update])
  return null
}
render(
  <Form.Handler onSubmit={async (data) => console.log('onSubmit', data)}>
    <Flex.Stack>
      <Form.Isolation
        preventUncommittedChanges
        resetDataAfterCommit
        dataReference={dataReference}
      >
        <SetDelayedData />
        <Flex.Stack>
          <Field.String required label="Isolated" path="/isolated" />

          <Flex.Horizontal>
            <Form.Isolation.CommitButton />
            <Form.Isolation.ResetButton showConfirmDialog={false} />
          </Flex.Horizontal>
        </Flex.Stack>
      </Form.Isolation>

      <Form.SubmitButton />

      <Tools.Log />
    </Flex.Stack>
  </Form.Handler>
)
`});function p(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return a||h(`Examples`,!1),c||h(`Examples.CommitHandleRef`,!0),u||h(`Examples.InsideSection`,!0),d||h(`Examples.PreventUncommittedChanges`,!0),l||h(`Examples.TransformCommitData`,!0),f||h(`Examples.UpdateDataReference`,!0),s||h(`Examples.UsingCommitButton`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Transform data on commit`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Using the CommitButton`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Using commitHandleRef`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Inside a section`}),`
`,(0,o.jsxs)(t.p,{children:[`This example has a `,(0,o.jsx)(t.code,{children:`defaultValue`}),` both on the Form.Handler and the Form.Isolation.`]}),`
`,(0,o.jsxs)(t.p,{children:[`When no `,(0,o.jsx)(t.code,{children:`defaultValue`}),` is set on the Form.Isolation (inner context), the default value from Form.Handler (outer context) is used for the initial value.`]}),`
`,(0,o.jsxs)(t.p,{children:[`When pressing the "Legg til / Add"-button, the default value from Form.Isolation is inserted again, because `,(0,o.jsx)(t.code,{children:`resetDataAfterCommit`}),` is set to `,(0,o.jsx)(t.code,{children:`true`}),`.`]}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Prevent uncommitted changes`}),`
`,(0,o.jsxs)(t.p,{children:[`This example uses the `,(0,o.jsx)(t.code,{children:`preventUncommittedChanges`}),` property to display an error message if the user has made changes and attempts to submit the form.`]}),`
`,(0,o.jsx)(t.p,{children:`Try entering something in the input field, then submit the form. An error message will appear to indicate that changes must be committed first.`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Update the data reference`}),`
`,(0,o.jsx)(t.p,{children:`This example shows how to update the data reference at a later point in time.`}),`
`,(0,o.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};