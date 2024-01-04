/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  trash_medium,
  log_out_medium,
  cookie_medium,
  bell_medium,
  edit,
} from '@dnb/eufemia/src/icons'
import {
  Anchor,
  Button,
  Dialog,
  ProgressIndicator,
  FormStatus,
  Breadcrumb,
  P,
  Input,
} from '@dnb/eufemia/src'

export const DialogExampleDefault = () => (
  <ComponentBox data-visual-test="dialog-default">
    <Dialog title="What is a Dialog?">
      <P>
        The Dialog component is a Modal variation that appears at the
        center of the screen. The Dialog has similar functionality to a
        traditional popup window and is mostly used for informational
        purposes (for example explaining a word on the page). Similar to
        Modal, it has to be triggered by the user to appear. Typical usage
        would be to read an explanation, then closing it.
      </P>
      <Button variant="secondary" size="large" top="large">
        Read more
      </Button>
    </Dialog>
  </ComponentBox>
)

export const DialogExampleHelpButton = () => (
  <ComponentBox data-visual-test="dialog-help-button">
    <Input
      label="Input"
      placeholder="Placeholder ..."
      suffix={
        <Dialog>
          <P>Some additional information for the input field.</P>
        </Dialog>
      }
    />
  </ComponentBox>
)

export const DialogExampleFullscreen = () => (
  <ComponentBox data-visual-test="dialog-fullscreen">
    <Dialog
      title={<span className="dnb-sr-only">"Hidden" Dialog title</span>}
      fullscreen
      triggerAttributes={{
        variant: 'tertiary',
        text: 'Open a fullscreen dialog',
        icon: 'bell',
      }}
      modalContent="The Dialog component is a Modal variation that appears at the center of the screen. The Dialog has similar functionality to a traditional popup window and is mostly used for informational purposes."
    />
  </ComponentBox>
)

export const DialogExampleDelayClose = () => (
  <ComponentBox>
    <Dialog
      title=".5s close delay"
      triggerAttributes={{
        text: 'Click me',
      }}
      focusSelector=".dnb-input__input:first-of-type"
      preventClose
      hideCloseButton
      onOpen={(e) => console.log('on_open', e)}
      onClose={(e) => console.log('on_close', e)}
      onClosePrevent={({ close, triggeredBy }) => {
        console.log('triggeredBy', triggeredBy)
        const timeout = setTimeout(close, 500)
        return () => clearTimeout(timeout) // clear timeout on unmount
      }}
    >
      <P>This is a Dialog with no close button.</P>
      <P>Click outside me, and I will be closed within 1 second.</P>
      <Input label="Focus" top>
        Focus me with Tab key
      </Input>
    </Dialog>
  </ComponentBox>
)

export const DialogExampleCustomTrigger = () => (
  <ComponentBox data-visual-test="dialog-custom-trigger">
    <Dialog
      title="Modal Title"
      trigger={(props) => (
        <Button {...props} variant="primary" icon="information">
          Custom trigger button
        </Button>
      )}
    >
      <P>This Modal was opened by a custom trigger component.</P>
    </Dialog>
  </ComponentBox>
)

export const FullDialogExample = () => (
  <ComponentBox data-visual-test="full-dialog">
    {() => {
      const handleBack = () => null
      return (
        <>
          <Dialog title="Custom title">
            <Dialog.Navigation>
              <Breadcrumb onClick={handleBack} />
            </Dialog.Navigation>
            <Dialog.Header>
              <P bottom>This is in the Dialog header</P>
            </Dialog.Header>
            <Button bottom size="large" right top>
              Read more
            </Button>
            <Button bottom size="large" variant="secondary">
              Open example
            </Button>
            <FormStatus state="info">
              This is a formstatus in a Dialog
            </FormStatus>
          </Dialog>
        </>
      )
    }}
  </ComponentBox>
)

export const DialogExampleProgressIndicator = () => (
  <ComponentBox data-visual-test="dialog-progress-indicator">
    <Dialog
      spacing={false}
      fullscreen={false}
      alignContent="centered"
      hideCloseButton
      triggerAttributes={{
        text: 'Show',
      }}
      preventClose={false}
      maxWidth="12rem"
    >
      <ProgressIndicator
        show_label
        label_direction="vertical"
        top="large"
        bottom="large"
      />
    </Dialog>
  </ComponentBox>
)

export const DialogConfirmDefault = () => (
  <ComponentBox
    data-visual-test="dialog-confirm-default"
    scope={{ bell_medium }}
  >
    <Dialog
      variant="confirmation"
      title="Dialog confirmation title"
      icon={bell_medium}
      description="Some content describing the situation."
      onConfirm={({ close }) => close()}
      triggerAttributes={{
        text: 'Trigger button',
      }}
    />
  </ComponentBox>
)

export const DialogConfirmDelete = () => (
  <ComponentBox
    data-visual-test="dialog-confirm-delete"
    scope={{ trash_medium }}
  >
    <Dialog
      variant="confirmation"
      confirmType="warning"
      title="Are you sure you want to delete this?"
      icon={trash_medium}
      description="This action cannot be undone."
      confirmText="Delete"
      declineText="Cancel"
      onConfirm={({ close }) => close()}
      triggerAttributes={{
        text: 'Delete record',
        icon: trash_medium,
      }}
    />
  </ComponentBox>
)

export const DialogConfirmLoggedOut = () => {
  return (
    <ComponentBox
      data-visual-test="dialog-confirm-loggedout"
      scope={{ log_out_medium }}
    >
      {() => {
        const DemoComponent = () => {
          const [open, setOpen] = React.useState(false)
          const loginHandler = () => null
          return (
            <>
              <Button
                id="custom-triggerer"
                text="Manually trigger"
                on_click={() => setOpen(true)}
              />
              <Dialog
                variant="confirmation"
                title="Du har blitt logget ut"
                icon={log_out_medium}
                description="For å fortsette må du logge inn igjen."
                confirmText="Logg inn"
                hideDecline
                openState={open}
                onClose={() => {
                  setOpen(false)
                }}
                onConfirm={() => {
                  setOpen(false)
                  loginHandler()
                }}
                labelledBy="custom-triggerer"
              />
            </>
          )
        }

        return <DemoComponent />
      }}
    </ComponentBox>
  )
}

export const DialogConfirmCookies = () => (
  <ComponentBox
    data-visual-test="dialog-confirm-cookie"
    scope={{ cookie_medium, edit }}
  >
    <Dialog
      triggerAttributes={{
        text: 'Show cookie dialog',
      }}
      icon={cookie_medium}
      variant="confirmation"
      title="Informasjonskapsler (cookies)"
    >
      Vi bruker cookies for å gi deg den beste opplevelsen i nettbanken
      vår.
      <br />
      <Anchor target="_blank" href="https://www.dnb.no/cookies">
        Les mer om cookies
      </Anchor>
      <Dialog.Action>
        <Button
          variant="tertiary"
          text="Administrer"
          icon={edit}
          icon_position="left"
          on_click={({ close }) => {
            close()
          }}
        />
        <Button
          text="Jeg godtar"
          on_click={({ close }) => {
            close()
          }}
        />
      </Dialog.Action>
    </Dialog>
  </ComponentBox>
)

export const DialogConfirmScrollableContent = () => {
  return (
    <ComponentBox data-visual-test="dialog-scroll-content">
      {() => {
        const MockComponent = () => {
          const scrollRef = React.useRef(null)
          return (
            <Dialog
              triggerAttributes={{
                text: 'Show cookie dialog',
              }}
              variant="confirmation"
              title="Informasjonskapsler (cookies)"
              scrollRef={scrollRef}
              onOpen={() => {
                if (
                  document.documentElement.classList.contains(
                    'scroll-to-bottom',
                  )
                ) {
                  scrollRef.current.scrollTop = 100000
                }
              }}
            >
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              Newline
              <br />
              <br />
              <Anchor target="_blank" href="https://www.dnb.no/cookies">
                Les mer om cookies
              </Anchor>
              <Dialog.Action>
                <Button
                  variant="tertiary"
                  text="Administrer"
                  icon_position="left"
                  on_click={({ close }) => {
                    close()
                  }}
                />
                <Button
                  text="Jeg godtar"
                  on_click={({ close }) => {
                    close()
                  }}
                />
              </Dialog.Action>
            </Dialog>
          )
        }

        return <MockComponent />
      }}
    </ComponentBox>
  )
}
