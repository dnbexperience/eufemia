import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./Card-2G-TKpj3.js";import{t as i}from"./Form-PES0Uozy.js";import{t as a}from"./Field-DrUGn0oz.js";import{n as o}from"./Wizard-DlovE-XE.js";import{t as s}from"./Tools-p1RXalAh.js";import{Rr as c,wr as l}from"./index-BIrFyEEc.js";import{t as u}from"./ComponentBox-DFVIRw0w.js";var d=t({InWizard:()=>p,UndoRedo:()=>m}),f=e(n()),p=()=>(0,f.jsx)(u,{stableName:`InWizard`,sourceImports:[`import { useCallback, useEffect, useRef } from 'react'`,`import { Button } from '@dnb/eufemia'`,`import { Field, Form, Tools, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Wizard:o,Field:a},noInline:!0,children:`const MyForm = () => {
  const { createSnapshot, revertSnapshot } = Form.useSnapshot('my-form')
  return (
    <Form.Handler id="my-form">
      <Wizard.Container
        onStepChange={(index, mode, args) => {
          if (mode === 'previous') {
            revertSnapshot(String(args.id), 'my-snapshot-slice')
          } else {
            createSnapshot(args.previousStep.id, 'my-snapshot-slice')
          }
        }}
      >
        <Wizard.Step title="Step A" id="step-a">
          <Form.Snapshot name="my-snapshot-slice">
            <Field.String path="/foo" label="Will be reverted" />
          </Form.Snapshot>
          <Field.String path="/bar" label="Will stay" />
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title="Step B" id="step-b">
          <Field.String path="/foo" label="Will be reverted" />
          <Field.String path="/bar" label="Will stay" />
          <Wizard.Buttons />
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
render(<MyForm />)
`}),m=()=>(0,f.jsx)(u,{stableName:`UndoRedo`,sourceImports:[`import { useCallback, useEffect, useRef } from 'react'`,`import { Button } from '@dnb/eufemia'`,`import { Field, Form, Tools, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Card:r,Field:a,Button:l,Tools:s},noInline:!0,children:`const MyComponent = () => {
  const { createSnapshot, applySnapshot } = Form.useSnapshot()
  const pointerRef = useRef(0)
  useEffect(() => {
    createSnapshot(pointerRef.current, 'my-snapshot-slice')
  }, [createSnapshot])
  const changeHandler = useCallback(() => {
    pointerRef.current += 1
    createSnapshot(pointerRef.current, 'my-snapshot-slice')
  }, [createSnapshot])
  const undoHandler = useCallback(() => {
    pointerRef.current -= 1
    applySnapshot(pointerRef.current, 'my-snapshot-slice')
  }, [applySnapshot])
  const redoHandler = useCallback(() => {
    pointerRef.current += 1
    applySnapshot(pointerRef.current, 'my-snapshot-slice')
  }, [applySnapshot])
  return (
    <>
      <Form.Card>
        <Form.Snapshot name="my-snapshot-slice">
          <Field.String
            path="/foo"
            label="Will be reverted"
            onChange={changeHandler}
          />
        </Form.Snapshot>
        <Field.String path="/bar" label="Will stay" />
      </Form.Card>

      <Form.ButtonRow>
        <Button variant="secondary" onClick={undoHandler}>
          Undo
        </Button>
        <Button variant="secondary" onClick={redoHandler}>
          Redo
        </Button>
      </Form.ButtonRow>

      <Tools.Log top />
    </>
  )
}
render(
  <Form.Handler>
    <MyComponent />
  </Form.Handler>
)
`});function h(e){let t={h2:`h2`,h3:`h3`,p:`p`,...c(),...e.components};return d||_(`Examples`,!1),p||_(`Examples.InWizard`,!0),m||_(`Examples.UndoRedo`,!0),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(t.h2,{children:`Demos`}),`
`,(0,f.jsx)(t.h3,{children:`Undo / Redo`}),`
`,(0,f.jsx)(m,{}),`
`,(0,f.jsx)(t.h3,{children:`Used in a Wizard`}),`
`,(0,f.jsx)(t.p,{children:`This example reverts the form data to its previous state when the user navigates back to a previous step.`}),`
`,(0,f.jsx)(p,{})]})}function g(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};