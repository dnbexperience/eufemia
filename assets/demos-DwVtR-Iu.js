import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r}from"./index-DVm0MbGb.js";var i=e({CommitHandleRef:()=>s,InsideSection:()=>l,PreventUncommittedChanges:()=>u,TransformCommitData:()=>c,UpdateDataReference:()=>d,UsingCommitButton:()=>o}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Form.Handler
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
`}),s=()=>(0,a.jsx)(n,{noInline:!0,children:`const MyForm = () => {
  const commitHandleRef = useRef(null)
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
`}),c=()=>(0,a.jsx)(n,{noInline:!0,children:`const MyForm = () => {
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
`}),l=()=>(0,a.jsx)(n,{children:`<Form.Handler
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
`}),u=()=>(0,a.jsx)(n,{children:`<Form.Handler onSubmit={async (data) => console.log('onSubmit', data)}>
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
`}),d=()=>(0,a.jsx)(n,{noInline:!0,children:`const dataReference = Form.Isolation.createDataReference()
const SetDelayedData = () => {
  const { update } = Form.useData()
  useEffect(() => {
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
`});function f(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components};return i||m(`Examples`,!1),s||m(`Examples.CommitHandleRef`,!0),l||m(`Examples.InsideSection`,!0),u||m(`Examples.PreventUncommittedChanges`,!0),c||m(`Examples.TransformCommitData`,!0),d||m(`Examples.UpdateDataReference`,!0),o||m(`Examples.UsingCommitButton`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Transform data on commit`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Using the CommitButton`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Using commitHandleRef`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Inside a section`}),`
`,(0,a.jsxs)(t.p,{children:[`This example has a `,(0,a.jsx)(t.code,{children:`defaultValue`}),` both on the Form.Handler and the Form.Isolation.`]}),`
`,(0,a.jsxs)(t.p,{children:[`When no `,(0,a.jsx)(t.code,{children:`defaultValue`}),` is set on the Form.Isolation (inner context), the default value from Form.Handler (outer context) is used for the initial value.`]}),`
`,(0,a.jsxs)(t.p,{children:[`When pressing the "Legg til / Add"-button, the default value from Form.Isolation is inserted again, because `,(0,a.jsx)(t.code,{children:`resetDataAfterCommit`}),` is set to `,(0,a.jsx)(t.code,{children:`true`}),`.`]}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Prevent uncommitted changes`}),`
`,(0,a.jsxs)(t.p,{children:[`This example uses the `,(0,a.jsx)(t.code,{children:`preventUncommittedChanges`}),` property to display an error message if the user has made changes and attempts to submit the form.`]}),`
`,(0,a.jsx)(t.p,{children:`Try entering something in the input field, then submit the form. An error message will appear to indicate that changes must be committed first.`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Update the data reference`}),`
`,(0,a.jsx)(t.p,{children:`This example shows how to update the data reference at a later point in time.`}),`
`,(0,a.jsx)(d,{})]})}function p(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};