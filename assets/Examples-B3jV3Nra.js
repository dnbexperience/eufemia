import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-a4aOn231.js";var r=e(t()),i=()=>(0,r.jsx)(n,{"data-visual-test":`modal-standard`,stableName:`ModalExampleStandard`,children:`<Modal>
  <div
    style={{
      padding: '2rem',
      backgroundColor: 'var(--token-color-background-neutral)',
    }}
  >
    <P>This is a Modal that you can use to make custom variations</P>
  </div>
</Modal>
`}),a=()=>(0,r.jsx)(n,{stableName:`ModalExampleStateOnly`,noInline:!0,children:`const Component = () => {
  const [modalIsActive, setModalState] = useState(false)
  return (
    <>
      <Button
        id="custom-triggerer"
        text="Custom trigger Button"
        onClick={() => setModalState((s) => !s)}
      />
      <Modal
        title="Modal Title"
        omitTriggerButton
        open={modalIsActive}
        labelledBy="custom-triggerer"
        onClose={() => setModalState(false)}
      >
        <div
          style={{
            padding: '2rem',
            backgroundColor: 'var(--token-color-background-neutral)',
          }}
        >
          <P>This Modal was opened by a custom trigger button.</P>
        </div>
      </Modal>
    </>
  )
}
render(<Component />)
`}),o=()=>(0,r.jsx)(n,{stableName:`ModalExampleCloseByHandler`,children:`<Modal
  title="Auto close"
  triggerAttributes={{
    text: 'Click me',
  }}
  alignContent="center"
  maxWidth="40rem"
  closeModal={(close) => {
    const timeout = setTimeout(close, 3e3)
    return () => clearTimeout(timeout)
  }}
>
  <div
    style={{
      padding: '2rem',
      backgroundColor: 'var(--token-color-background-neutral)',
    }}
  >
    <P>This Modal will close in 3 seconds.</P>
  </div>
</Modal>
`}),s=()=>(0,r.jsx)(n,{hidePreview:!0,stableName:`ModalExampleSuffix`,children:`<Input
  label="Input"
  placeholder="Placeholder ..."
  suffix={<HelpButton>Help text</HelpButton>}
/>
`}),c=()=>(0,r.jsx)(n,{hidePreview:!0,stableName:`ModalExampleTriggerProps`,children:`<Modal
  triggerAttributes={{
    icon: 'bell',
  }}
  right="small"
>
  ... content ...
</Modal>
`}),l=()=>(0,r.jsx)(n,{hidePreview:!0,stableName:`ModalExampleOnClosePrevent`,children:`<Modal
  preventClose={true}
  onClosePrevent={({ triggeredBy, close /* id, event */ }) => {
    switch (triggeredBy) {
      case 'keyboard':
      case 'button':
        close()
        break
      case 'overlay': {
        const timeout = setTimeout(close, 1e3)
        return () => clearTimeout(timeout) // clear timeout on unmount
      }
    }
  }}
>
  ...
</Modal>
`});export{s as a,a as i,l as n,c as o,i as r,o as t};