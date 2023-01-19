/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

export const ModalExampleDrawerHeader = () => (
  <ComponentBox data-visual-test="modal-drawer-header">
    {
      /* jsx */ `
<Drawer
  mode="drawer"
  triggerAttributes={{ text: "Open Drawer" }}
>
  <Drawer.Navigaton>
    <Breadcrumb />
  </Drawer.Navigaton>
  <Drawer.Header>
    <H1 size="x-large" bottom>
      Title
    </H1>
    <P bottom>This is a lorem ipsum dolor</P>
    <Button bottom size="large" right>
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
  </Drawer.Header>
  <Drawer.Body>
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
  </Drawer.Body>
</Drawer>
	`
    }
  </ComponentBox>
)

export const ModalExampleDrawerBasic = () => (
  <ComponentBox data-visual-test="modal-drawer-basic">
    {
      /* jsx */ `
<Drawer
  title="Drawer Title"
  triggerAttributes={{ text: "Open Drawer" }}
>
  <Drawer.Body>
    <P top>This is a left aligned Drawer content.</P>
  </Drawer.Body>
</Drawer>
	`
    }
  </ComponentBox>
)
export const DrawerWithoutSpacing = () => (
  <ComponentBox data-visual-test="drawer-no-spacing">
    {
      /* jsx */ `
<Drawer
  title="Drawer without spacing"
  triggerAttributes={{ text: "Open Drawer with no spacing" }}
  spacing={false}
>
  <Drawer.Body>
    <P top>This is a left aligned Drawer content.</P>
  </Drawer.Body>
</Drawer>
  `
    }
  </ComponentBox>
)

export const ModalExampleDefault = () => (
  <ComponentBox data-visual-test="modal-trigger-default">
    {
      /* jsx */ `
<Dialog title="Modal Title">
  <Dialog.Body spacing styleType="mint-green">
    <P>This is the modal text.</P>
  </Dialog.Body>
</Dialog>
	`
    }
  </ComponentBox>
)

export const ModalExampleHelpButton = () => (
  <ComponentBox data-visual-test="modal-help-button">
    {
      /* jsx */ `
<Input
  label="Input"
  placeholder="Placeholder ..."
  suffix={
    <Dialog>
      <Dialog.Body spacing styleType="pistachio">
        <P>Help text</P>
      </Dialog.Body>
    </Dialog>
  }
/>
	`
    }
  </ComponentBox>
)

export const ModalExampleFullscreen = () => (
  <ComponentBox data-visual-test="modal-fullscreen">
    {
      /* jsx */ `
<Dialog
  title={<span className="dnb-sr-only">"Hidden" Modal title</span>}
  fullscreen="true"
  triggerAttributes={{ text: "Click me", icon: "bell", variant: "tertiary" }}
  modalContent="This is the modal text. Triggered by a tertiary button."
/>
	`
    }
  </ComponentBox>
)

export const DrawerExamplePlacementLeft = () => (
  <ComponentBox data-visual-test="modal-drawer-leftsided">
    {
      /* jsx */ `
<Drawer
  title="Modal title"
  containerPlacement="left"
  modalContent="This is the modal text. Triggered by a tertiary button."
/>
	`
    }
  </ComponentBox>
)
