import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{u as r}from"./FormStatus-hvaxPCn0.js";import{t as i}from"./Section-rdyRjaib.js";import{c as a}from"./ToggleButton-BMi2PwcS.js";import{t as o}from"./Card-ClZNWqpG.js";import{t as s}from"./Form-C8lTzZqR.js";import{t as c}from"./Field-neGd0eKd.js";import{t as l}from"./Tools-B6PN-yHu.js";import{K as u}from"./index-Bx3ttow-.js";import{t as d}from"./ComponentBox-CG7uqrFy.js";var f=e({CommitHandleRef:()=>h,InsideSection:()=>_,PreventUncommittedChanges:()=>v,TransformCommitData:()=>g,UpdateDataReference:()=>y,UsingCommitButton:()=>m}),p=t(n()),m=()=>(0,p.jsx)(d,{stableName:`UsingCommitButton`,sourceImports:[`import { useEffect, useRef } from 'react'`,`import { Flex, HeightAnimation } from '@dnb/eufemia'`,`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Flex:a,Field:c},children:`<Form.Handler
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
`}),h=()=>(0,p.jsx)(d,{stableName:`CommitHandleRef`,sourceImports:[`import { useEffect, useRef } from 'react'`,`import { Flex, HeightAnimation } from '@dnb/eufemia'`,`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Card:o,HeightAnimation:r,Field:c,Flex:a,Section:i,Tools:l},noInline:!0,children:`const MyForm = () => {
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
`}),g=()=>(0,p.jsx)(d,{stableName:`TransformCommitData`,sourceImports:[`import { useEffect, useRef } from 'react'`,`import { Flex, HeightAnimation } from '@dnb/eufemia'`,`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Card:o,HeightAnimation:r,Field:c,Flex:a,Section:i},noInline:!0,children:`const MyForm = () => {
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
`}),_=()=>(0,p.jsx)(d,{stableName:`InsideSection`,sourceImports:[`import { useEffect, useRef } from 'react'`,`import { Flex, HeightAnimation } from '@dnb/eufemia'`,`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Section:i,Flex:a,Field:c},children:`<Form.Handler
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
`}),v=()=>(0,p.jsx)(d,{stableName:`PreventUncommittedChanges`,sourceImports:[`import { useEffect, useRef } from 'react'`,`import { Flex, HeightAnimation } from '@dnb/eufemia'`,`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Flex:a,Field:c,Tools:l},children:`<Form.Handler onSubmit={async (data) => console.log('onSubmit', data)}>
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
`}),y=()=>(0,p.jsx)(d,{stableName:`UpdateDataReference`,sourceImports:[`import { useEffect, useRef } from 'react'`,`import { Flex, HeightAnimation } from '@dnb/eufemia'`,`import { Field, Form, Tools } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Flex:a,Field:c,Tools:l},noInline:!0,children:`const dataReference = Form.Isolation.createDataReference()
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
`});function b(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...u(),...e.components};return f||S(`Examples`,!1),h||S(`Examples.CommitHandleRef`,!0),_||S(`Examples.InsideSection`,!0),v||S(`Examples.PreventUncommittedChanges`,!0),g||S(`Examples.TransformCommitData`,!0),y||S(`Examples.UpdateDataReference`,!0),m||S(`Examples.UsingCommitButton`,!0),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(t.h2,{children:`Demos`}),`
`,(0,p.jsx)(t.h3,{children:`Transform data on commit`}),`
`,(0,p.jsx)(g,{}),`
`,(0,p.jsx)(t.h3,{children:`Using the CommitButton`}),`
`,(0,p.jsx)(m,{}),`
`,(0,p.jsx)(t.h3,{children:`Using commitHandleRef`}),`
`,(0,p.jsx)(h,{}),`
`,(0,p.jsx)(t.h3,{children:`Inside a section`}),`
`,(0,p.jsxs)(t.p,{children:[`This example has a `,(0,p.jsx)(t.code,{children:`defaultValue`}),` both on the Form.Handler and the Form.Isolation.`]}),`
`,(0,p.jsxs)(t.p,{children:[`When no `,(0,p.jsx)(t.code,{children:`defaultValue`}),` is set on the Form.Isolation (inner context), the default value from Form.Handler (outer context) is used for the initial value.`]}),`
`,(0,p.jsxs)(t.p,{children:[`When pressing the "Legg til / Add"-button, the default value from Form.Isolation is inserted again, because `,(0,p.jsx)(t.code,{children:`resetDataAfterCommit`}),` is set to `,(0,p.jsx)(t.code,{children:`true`}),`.`]}),`
`,(0,p.jsx)(_,{}),`
`,(0,p.jsx)(t.h3,{children:`Prevent uncommitted changes`}),`
`,(0,p.jsxs)(t.p,{children:[`This example uses the `,(0,p.jsx)(t.code,{children:`preventUncommittedChanges`}),` property to display an error message if the user has made changes and attempts to submit the form.`]}),`
`,(0,p.jsx)(t.p,{children:`Try entering something in the input field, then submit the form. An error message will appear to indicate that changes must be committed first.`}),`
`,(0,p.jsx)(v,{}),`
`,(0,p.jsx)(t.h3,{children:`Update the data reference`}),`
`,(0,p.jsx)(t.p,{children:`This example shows how to update the data reference at a later point in time.`}),`
`,(0,p.jsx)(y,{})]})}function x(e={}){let{wrapper:t}={...u(),...e.components};return t?(0,p.jsx)(t,{...e,children:(0,p.jsx)(b,{...e})}):b(e)}function S(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};