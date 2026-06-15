import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./Button-DwQUlfj-.js";import{M as r}from"./Autocomplete-Bbkxjf2i.js";import{t as i}from"./P-C9wBv35m.js";import{a,t as o}from"./HelpButton-C7xeEDxM.js";import{t as s}from"./ComponentBox-R2c6Bo76.js";var c=e(t()),l=()=>(0,c.jsx)(s,{"data-visual-test":`modal-standard`,stableName:`ModalExampleStandard`,sourceImports:[`import { useState } from 'react'`,`import { Modal, P, Button, Input, HelpButton } from '@dnb/eufemia'`],__buildScope:{Modal:a,P:i},children:`<Modal>
  <div
    style={{
      padding: '2rem',
      backgroundColor: 'var(--token-color-background-neutral)',
    }}
  >
    <P>This is a Modal that you can use to make custom variations</P>
  </div>
</Modal>
`}),u=()=>(0,c.jsx)(s,{stableName:`ModalExampleStateOnly`,sourceImports:[`import { useState } from 'react'`,`import { Modal, P, Button, Input, HelpButton } from '@dnb/eufemia'`],__buildScope:{Button:n,Modal:a,P:i},noInline:!0,children:`const Component = () => {
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
`}),d=()=>(0,c.jsx)(s,{stableName:`ModalExampleCloseByHandler`,sourceImports:[`import { useState } from 'react'`,`import { Modal, P, Button, Input, HelpButton } from '@dnb/eufemia'`],__buildScope:{Modal:a,P:i},children:`<Modal
  title="Auto close"
  triggerProps={{
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
`}),f=()=>(0,c.jsx)(s,{hidePreview:!0,stableName:`ModalExampleSuffix`,sourceImports:[`import { useState } from 'react'`,`import { Modal, P, Button, Input, HelpButton } from '@dnb/eufemia'`],__buildScope:{Input:r,HelpButton:o},children:`<Input
  label="Input"
  placeholder="Placeholder ..."
  suffix={<HelpButton>Help text</HelpButton>}
/>
`}),p=()=>(0,c.jsx)(s,{hidePreview:!0,stableName:`ModalExampleTriggerProps`,sourceImports:[`import { useState } from 'react'`,`import { Modal, P, Button, Input, HelpButton } from '@dnb/eufemia'`],__buildScope:{Modal:a},children:`<Modal
  triggerProps={{
    icon: 'bell',
  }}
  right="small"
>
  ... content ...
</Modal>
`}),m=()=>(0,c.jsx)(s,{hidePreview:!0,stableName:`ModalExampleOnClosePrevent`,sourceImports:[`import { useState } from 'react'`,`import { Modal, P, Button, Input, HelpButton } from '@dnb/eufemia'`],__buildScope:{Modal:a},children:`<Modal
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
`});export{f as a,u as i,m as n,p as o,l as r,d as t};