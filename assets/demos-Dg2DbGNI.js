import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Button-DwQUlfj-.js";import{t as i}from"./Card-ChPhpBPz.js";import{t as a}from"./Form-JTiJXf2d.js";import{t as o}from"./Field-DqRpWyNm.js";import{n as s}from"./Wizard-CUdMs3bu.js";import{t as c}from"./Tools-CXd2z-w-.js";import{K as l}from"./index-ppRu2ktv.js";import{t as u}from"./ComponentBox-R2c6Bo76.js";var d=e({InWizard:()=>p,UndoRedo:()=>m}),f=t(n()),p=()=>(0,f.jsx)(u,{stableName:`InWizard`,sourceImports:[`import { useCallback, useEffect, useRef } from 'react'`,`import { Button } from '@dnb/eufemia'`,`import { Field, Form, Tools, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Wizard:s,Field:o},noInline:!0,children:`const MyForm = () => {
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
`}),m=()=>(0,f.jsx)(u,{stableName:`UndoRedo`,sourceImports:[`import { useCallback, useEffect, useRef } from 'react'`,`import { Button } from '@dnb/eufemia'`,`import { Field, Form, Tools, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Card:i,Field:o,Button:r,Tools:c},noInline:!0,children:`const MyComponent = () => {
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
`});function h(e){let t={h2:`h2`,h3:`h3`,p:`p`,...l(),...e.components};return d||_(`Examples`,!1),p||_(`Examples.InWizard`,!0),m||_(`Examples.UndoRedo`,!0),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(t.h2,{children:`Demos`}),`
`,(0,f.jsx)(t.h3,{children:`Undo / Redo`}),`
`,(0,f.jsx)(m,{}),`
`,(0,f.jsx)(t.h3,{children:`Used in a Wizard`}),`
`,(0,f.jsx)(t.p,{children:`This example reverts the form data to its previous state when the user navigates back to a previous step.`}),`
`,(0,f.jsx)(p,{})]})}function g(e={}){let{wrapper:t}={...l(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};