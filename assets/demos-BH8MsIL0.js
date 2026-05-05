import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-geTEYZ7b.js";import{Rr as i}from"./index-CMgyXmp3.js";var a=e({InWizard:()=>s,UndoRedo:()=>c});t();var o=n(),s=()=>(0,o.jsx)(r,{noInline:!0,children:`const MyForm = () => {
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
`}),c=()=>(0,o.jsx)(r,{noInline:!0,children:`const MyComponent = () => {
  const { createSnapshot, applySnapshot } = Form.useSnapshot()
  const pointerRef = React.useRef(0)
  React.useEffect(() => {
    createSnapshot(pointerRef.current, 'my-snapshot-slice')
  }, [createSnapshot])
  const changeHandler = React.useCallback(() => {
    pointerRef.current += 1
    createSnapshot(pointerRef.current, 'my-snapshot-slice')
  }, [createSnapshot])
  const undoHandler = React.useCallback(() => {
    pointerRef.current -= 1
    applySnapshot(pointerRef.current, 'my-snapshot-slice')
  }, [applySnapshot])
  const redoHandler = React.useCallback(() => {
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
`});function l(e){let t={h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return a||d(`Examples`,!1),s||d(`Examples.InWizard`,!0),c||d(`Examples.UndoRedo`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Undo / Redo`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Used in a Wizard`}),`
`,(0,o.jsx)(t.p,{children:`This example reverts the form data to its previous state when the user navigates back to a previous step.`}),`
`,(0,o.jsx)(s,{})]})}function u(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};