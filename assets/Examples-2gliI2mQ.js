import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-xW2kV1s2.js";var n=e(),r=()=>(0,n.jsx)(t,{"data-visual-test":`modal-standard`,children:`<Modal>
  <div
    style={{
      padding: '2rem',
      backgroundColor: 'var(--token-color-background-neutral)',
    }}
  >
    <P>This is a Modal that you can use to make custom variations</P>
  </div>
</Modal>
`}),i=()=>(0,n.jsx)(t,{noInline:!0,children:`const Component = () => {
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
`}),a=()=>(0,n.jsx)(t,{children:`<Modal
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
`}),o=()=>(0,n.jsx)(t,{hidePreview:!0,children:`<Input
  label="Input"
  placeholder="Placeholder ..."
  suffix={<HelpButton>Help text</HelpButton>}
/>
`}),s=()=>(0,n.jsx)(t,{hidePreview:!0,children:`<Modal
  triggerAttributes={{
    icon: 'bell',
  }}
  right="small"
>
  ... content ...
</Modal>
`}),c=()=>(0,n.jsx)(t,{hidePreview:!0,children:`<Modal
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
`});export{o as a,i,c as n,s as o,r,a as t};