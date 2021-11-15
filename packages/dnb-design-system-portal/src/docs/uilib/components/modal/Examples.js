/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
// import styled from '@emotion/styled'

export const ModalExampleDefault = () => (
  <ComponentBox data-visual-test="modal-trigger-default">
    {() => /* jsx */ `
<Modal title="Modal Title">
  <Modal.Content spacing style_type="mint-green">
    <P>This is the modal text. Triggered by the help button.</P>
  </Modal.Content>
</Modal>
	`}
  </ComponentBox>
)

export const ModalExampleHelpButton = () => (
  <ComponentBox data-visual-test="modal-help-button">
    {() => /* jsx */ `
<Input
  label="Input"
  placeholder="Placeholder ..."
  suffix={
    <Modal>
      <Modal.Content spacing style_type="pistachio">
        <P>Help text</P>
      </Modal.Content>
    </Modal>
  }
/>
	`}
  </ComponentBox>
)

export const ModalExampleDrawerHeader = () => (
  <ComponentBox data-visual-test="modal-drawer-header" hideCode>
    {() => /* jsx */ `
<Modal
  mode="drawer"
  trigger_text="Open Drawer"
>
  <Modal.Bar>
    <Button
      variant="tertiary"
      icon="chevron_left"
      icon_position="left"
      wrap
    >
      Lorem ipsum rutrum
    </Button>
  </Modal.Bar>
  <Modal.Header>
    <H1 size="x-large" bottom>
      Title
    </H1>
    <P bottom>This is a lorem ipsum dolor</P>
    <Button bottom size="large">
      Lorem ipsum
    </Button>
    <Button bottom size="large" variant="secondary">
      Dolor sit
    </Button>
    <FormStatus state="info">This is a lorem ipsum dolor</FormStatus>
    <Tabs
      id="unique-linked-id"
      data={[
        {
          title: 'One',
          key: 'one',
        },
        {
          title: 'Two',
          key: 'two',
        },
      ]}
    />
  </Modal.Header>
  <Modal.Content>
    <Tabs.Content id="unique-linked-id">
      {({ title }) => {
        return (
          <H2>{title}</H2>
        )
      }}
    </Tabs.Content>
    <P top>
      Elementum eu suspendisse sit platea elit porttitor
      magna laoreet ad ultrices tempus urna curae parturient
      conubia quisque viverra eget vestibulum neque pulvinar
      semper vulputate id dis varius pellentesque nunc
      egestas risus amet mus aptent luctus imperdiet netus
      natoque cubilia mattis nostra proin ornare scelerisque
      sodales faucibus placerat sem bibendum pretium rutrum
      vitae sociis ligula inceptos morbi quam mi sed pharetra
      fermentum tortor ullamcorper ipsum tellus eros euismod
      volutpat nisl dui lectus fames suscipit phasellus
      praesent justo mollis montes velit taciti gravida lacus
      commodo senectus feugiat lorem etiam consequat
      penatibus cum hendrerit accumsan orci potenti purus
      nulla interdum metus sollicitudin magnis libero sapien
      habitant non class ridiculus consectetur congue nec
      litora sociosqu aliquet felis in rhoncus nascetur odio
      ultricies nullam a iaculis massa nisi ante nam cras
      aenean erat facilisi vivamus ut cursus auctor arcu
      lobortis himenaeos dictum habitasse tristique mauris at
      blandit sagittis nibh dignissim condimentum per integer
      duis lacinia malesuada est adipiscing maecenas donec
      eleifend turpis dictumst dapibus tempor fusce aliquam
      torquent hac ac curabitur venenatis et tincidunt augue
      porta vehicula enim facilisis posuere primis molestie
      convallis diam vel fringilla dolor leo quis diam cursus
      massa sapien tristique cum senectus sed tortor natoque
      amet hendrerit ut fusce ipsum quis
    </P>
  </Modal.Content>
</Modal>
	`}
  </ComponentBox>
)

export const ModalExampleDrawerBasic = () => (
  <ComponentBox data-visual-test="modal-drawer-basic">
    {() => /* jsx */ `
<Modal
  mode="drawer"
  title="Drawer Title"
  trigger_text="Open Drawer"
>
  <Modal.Content>
    <P top>This is a left aligned Drawer content.</P>
  </Modal.Content>
</Modal>
	`}
  </ComponentBox>
)

export const ModalExampleFullscreen = () => (
  <ComponentBox data-visual-test="modal-fullscreen">
    {() => /* jsx */ `
<Modal
  title={<span className="dnb-sr-only">"Hidden" Modal title</span>}
  fullscreen="true"
  trigger_variant="tertiary"
  trigger_text="Click me"
  trigger_icon="bell"
  modal_content="This is the modal text. Triggered by a tertiary button."
/>
	`}
  </ComponentBox>
)

export const ModalExampleDelayClose = () => (
  <ComponentBox>
    {() => /* jsx */ `
<Modal
  title="1s close delay"
  trigger_text="Click me"
  focus_selector=".dnb-input__input:first-of-type"
  prevent_close="true"
  hide_close_button="true"
  on_open={(e) => console.log('on_open', e)}
  on_close={(e) => console.log('on_close', e)}
  on_close_prevent={({ close, triggeredBy }) => {
    console.log('triggeredBy', triggeredBy)
    const timeout = setTimeout(close, 1e3)
    return () => clearTimeout(timeout) // clear timeout on unmount
  }}
>
  <P>This is a Modal Window with no close button.</P>
  <P>Click outside me, and I will be closed within 1 second.</P>
  <Section top spacing style_type="divider">
    <Input label="Focus:">Focus me with Tab key</Input>
  </Section>
</Modal>
	`}
  </ComponentBox>
)

export const ModalExampleCustomTrigger = () => (
  <ComponentBox>
    {() => /* jsx */ `
<Modal
  title="Modal Title"
  trigger={(props) => <Button {...props}>Custom trigger Button</Button>}
>
  <Section spacing style_type="divider">
    <P>This Modal was opened by a custom trigger component.</P>
  </Section>
</Modal>
	`}
  </ComponentBox>
)

export const ModalExampleStateOnly = () => (
  <ComponentBox useRender>
    {() => /* jsx */ `
const Component = () => {
  const [modalIsActive, setModalState] = React.useState(false)
  return (
    <>
      <Button
        id="custom-triggerer"
        text="Custom trigger Button"
        on_click={() => setModalState((s) => !s)}
      />
      <Modal
        title="Modal Title"
        trigger_hidden={true}
        open_state={modalIsActive}
        labelled_by="custom-triggerer"
        on_close={() => setModalState(false)}
      >
        <Section spacing style_type="divider">
          <P>This Modal was opened by a custom trigger button.</P>
        </Section>
      </Modal>
    </>
  )
}
render(<Component />)
	`}
  </ComponentBox>
)

export const ModalExampleCloseByCallback = () => (
  <ComponentBox>
    {() => /* jsx */ `
<Modal mode="drawer" hide_close_button title="Title">
  {({ close }) => (
    <>
      <Button text="Close by callback" on_click={close} />
    </>
  )}
</Modal>
	`}
  </ComponentBox>
)

export const ModalExampleCloseByHandler = () => (
  <ComponentBox>
    {() => /* jsx */ `
<Modal
  title="Auto close"
  trigger_text="Click me"
  align_content="center"
  max_width="40rem"
  close_modal={close => {
    const timeout = setTimeout(close, 3e3)
    return () => clearTimeout(timeout) // clear timeout on unmount
  }}
>
  <Section spacing style_type="emerald-green">
    <P>This Modal will close in 3 seconds.</P>
  </Section>
</Modal>
	`}
  </ComponentBox>
)

export const ModalExampleProgressIndicator = () => (
  <ComponentBox data-visual-test="modal-no-spacing">
    {() => /* jsx */ `
<Modal
  spacing={false}
  fullscreen={false}
  align_content="centered"
  hide_close_button
  trigger_text="Show"
  prevent_close={false}
  max_width="12rem"
>
  <ProgressIndicator
    show_label
    label_direction="vertical"
    top="large"
    bottom="large"
    size="large"
  />
</Modal>
	`}
  </ComponentBox>
)
