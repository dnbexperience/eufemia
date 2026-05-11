import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{n as t,r as n,t as r}from"./trash_medium-Dhah7otg.js";import{x as i}from"./view_medium-Rb0zFYFk.js";import{t as a}from"./ComponentBox-xW2kV1s2.js";import{Lr as o,si as s}from"./index-DVm0MbGb.js";var c=e(),l=()=>(0,c.jsx)(a,{"data-visual-test":`dialog-default`,children:`<Dialog title="What is a Dialog?">
  <P>
    The Dialog component is a Modal variation that appears at the center of
    the screen. The Dialog has similar functionality to a traditional popup
    window and is mostly used for informational purposes (for example
    explaining a word on the page). Similar to Modal, it has to be
    triggered by the user to appear. Typical usage would be to read an
    explanation, then closing it.
  </P>
  <Button variant="secondary" size="large" top="large">
    Read more
  </Button>
</Dialog>
`}),u=()=>(0,c.jsx)(a,{"data-visual-test":`dialog-help-button`,children:`<Input
  label="Input"
  placeholder="Placeholder ..."
  suffix={
    <Dialog>
      <P>Some additional information for the input field.</P>
    </Dialog>
  }
/>
`}),d=()=>(0,c.jsx)(a,{"data-visual-test":`dialog-vertical-alignment`,children:`<Dialog
  title="Vertical alignment top"
  verticalAlignment="top"
  triggerAttributes={{
    text: 'Vertical alignment',
  }}
  modalContent="The Dialog component is a Modal aligned at the top of the screen. The Dialog has similar functionality to a traditional popup window and is mostly used for informational purposes."
/>
`}),f=()=>(0,c.jsx)(a,{"data-visual-test":`dialog-fullscreen`,children:`<Dialog
  title={<span className="dnb-sr-only">"Hidden" Dialog title</span>}
  fullscreen
  triggerAttributes={{
    variant: 'tertiary',
    text: 'Open a fullscreen dialog',
    icon: 'bell',
  }}
  modalContent="The Dialog component is a Modal variation that appears at the center of the screen. The Dialog has similar functionality to a traditional popup window and is mostly used for informational purposes."
/>
`}),p=()=>(0,c.jsx)(a,{children:`<Dialog
  title=".5s close delay"
  triggerAttributes={{
    text: 'Click me',
  }}
  focusSelector=".dnb-input__input:first-of-type"
  preventClose
  hideCloseButton
  onOpen={(e) => console.log('onOpen', e)}
  onClose={(e) => console.log('onClose', e)}
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
`}),m=()=>(0,c.jsx)(a,{"data-visual-test":`dialog-custom-trigger`,children:`<Dialog
  title="Modal Title"
  trigger={(props) => (
    <Button {...props} variant="primary" icon="information">
      Custom trigger button
    </Button>
  )}
>
  <P>This Modal was opened by a custom trigger component.</P>
</Dialog>
`}),h=()=>(0,c.jsx)(a,{"data-visual-test":`full-dialog`,noInline:!0,children:`const handleBack = () => null
render(
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
      <FormStatus state="information">
        This is a formstatus in a Dialog
      </FormStatus>
    </Dialog>
  </>
)
`}),g=()=>(0,c.jsx)(a,{"data-visual-test":`dialog-progress-indicator`,children:`<Dialog
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
  <ProgressIndicator showDefaultLabel top="large" bottom="large" />
</Dialog>
`}),_=()=>(0,c.jsx)(a,{"data-visual-test":`dialog-confirm-default`,scope:{bell_medium:s},children:`<Dialog
  variant="confirmation"
  title="Dialog confirmation title"
  icon={bell_medium}
  description="Some content describing the situation."
  onConfirm={({ close }) => close()}
  triggerAttributes={{
    text: 'Trigger button',
  }}
/>
`}),v=()=>(0,c.jsx)(a,{"data-visual-test":`dialog-confirm-delete`,scope:{trash_medium:r},children:`<Dialog
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
`}),y=()=>(0,c.jsx)(a,{"data-visual-test":`dialog-confirm-loggedout`,scope:{log_out_medium:t},noInline:!0,children:`const DemoComponent = () => {
  const [open, setOpen] = useState(false)
  const loginHandler = () => null
  return (
    <>
      <Button
        id="custom-triggerer"
        text="Manually trigger"
        onClick={() => setOpen(true)}
      />
      <Dialog
        variant="confirmation"
        title="Du har blitt logget ut"
        icon={log_out_medium}
        description="For å fortsette må du logge inn igjen."
        confirmText="Logg inn"
        hideDecline
        open={open}
        onClose={({ triggeredBy }) => {
          console.log('triggeredBy', triggeredBy)
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
render(<DemoComponent />)
`}),b=()=>(0,c.jsx)(a,{"data-visual-test":`dialog-confirm-cookie`,scope:{cookie_medium:n,edit:i},children:`<Dialog
  triggerAttributes={{
    text: 'Show cookie dialog',
  }}
  icon={cookie_medium}
  variant="confirmation"
  title="Informasjonskapsler (cookies)"
>
  Vi bruker cookies for å gi deg den beste opplevelsen i nettbanken vår.
  <br />
  <Anchor target="_blank" href="https://www.dnb.no/cookies">
    Les mer om cookies
  </Anchor>
  <Dialog.Action>
    <Button
      variant="tertiary"
      text="Administrer"
      icon={edit}
      iconPosition="left"
      // @ts-expect-error -- strictFunctionTypes
      onClick={({ close }) => {
        close()
      }}
    />
    <Button
      text="Jeg godtar"
      // @ts-expect-error -- strictFunctionTypes
      onClick={({ close }) => {
        close()
      }}
    />
  </Dialog.Action>
</Dialog>
`}),x=()=>(0,c.jsx)(a,{"data-visual-test":`dialog-scroll-content`,noInline:!0,children:`const MockComponent = () => {
  const scrollRef = useRef(null)
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
          document.documentElement.classList.contains('scroll-to-bottom')
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
          iconPosition="left"
          // @ts-expect-error -- strictFunctionTypes
          onClick={({ close }) => {
            close()
          }}
        />
        <Button
          text="Jeg godtar alle"
          // @ts-expect-error -- strictFunctionTypes
          onClick={({ close }) => {
            close()
          }}
        />
      </Dialog.Action>
    </Dialog>
  )
}
render(<MockComponent />)
`}),S=()=>(0,c.jsx)(a,{"data-visual-test":`dialog-scroll-content-info`,noInline:!0,children:`const MockComponent = () => {
  const scrollRef = useRef(null)
  return (
    <Dialog
      triggerAttributes={{
        text: 'Show information dialog with sticky header',
      }}
      variant="information"
      scrollRef={scrollRef}
      onOpen={() => {
        if (
          document.documentElement.classList.contains(
            'scroll-to-bottom-info'
          )
        ) {
          scrollRef.current.scrollTop = 100000
        }
      }}
    >
      <Form.Handler>
        <Flex.Stack>
          <Form.MainHeading>Opprett en bedriftskonto</Form.MainHeading>
          <P>
            For å opprette en bedriftskonto trenger vi litt informasjon om
            virksomheten din. Fyll ut feltene nedenfor, så tar vi kontakt
            innen to virkedager.
          </P>

          <Form.Card>
            <Form.SubHeading>Kontaktinformasjon</Form.SubHeading>
            <Field.String label="Fullt navn" path="/name" />
            <Field.Email path="/email" />
            <Field.PhoneNumber path="/phone" />
          </Form.Card>

          <Form.Card>
            <Form.SubHeading>Bedriftsinformasjon</Form.SubHeading>
            <Field.Name.Company path="/companyName" />
            <Field.OrganizationNumber path="/orgNumber" />
            <Field.String label="Adresse" path="/address" />
            <Field.PostalCodeAndCity
              postalCode={{
                path: '/postalCode',
              }}
              city={{
                path: '/city',
              }}
            />
          </Form.Card>

          <Form.Card>
            <Form.SubHeading>Tilleggsinformasjon</Form.SubHeading>
            <Field.String
              label="Beskriv behovet ditt"
              path="/description"
              multiline
              rows={3}
            />
            <Field.Boolean
              label="Jeg godtar vilkårene for bruk"
              path="/terms"
              variant="checkbox"
            />
          </Form.Card>
        </Flex.Stack>
      </Form.Handler>
    </Dialog>
  )
}
render(<MockComponent />)
`});function C(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,...o(),...e.components},{VisibleWhenVisualTest:n}=t;return n||T(`VisibleWhenVisualTest`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Table of contents`}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`/uilib/components/dialog/demos#demos-for-variant-information`,children:`Inform demos`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`/uilib/components/dialog/demos#demos-for-variant-confirmation`,children:`Confirm demos`})}),`
`]}),`
`,(0,c.jsxs)(t.h2,{children:[`Demos for variant `,(0,c.jsx)(t.code,{children:`information`})]}),`
`,(0,c.jsx)(t.h3,{children:`Basic Dialog`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h3,{children:`Dialog as help button`}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h3,{children:`Top aligned Dialog`}),`
`,(0,c.jsx)(d,{}),`
`,(0,c.jsx)(t.h3,{children:`Dialog with custom trigger`}),`
`,(0,c.jsx)(m,{}),`
`,(0,c.jsx)(t.h3,{children:`Dialog with custom content`}),`
`,(0,c.jsx)(h,{}),`
`,(0,c.jsx)(t.h3,{children:`Fullscreen Dialog`}),`
`,(0,c.jsx)(f,{}),`
`,(0,c.jsx)(t.h3,{children:`Dialog as progress indicator`}),`
`,(0,c.jsx)(g,{}),`
`,(0,c.jsx)(t.h3,{children:`Dialog with close delay`}),`
`,(0,c.jsx)(p,{}),`
`,(0,c.jsxs)(t.h2,{children:[`Demos for variant `,(0,c.jsx)(t.code,{children:`confirmation`})]}),`
`,(0,c.jsx)(t.h3,{children:`Confirm dialog`}),`
`,(0,c.jsx)(_,{}),`
`,(0,c.jsx)(t.h3,{children:`Deletion Dialog`}),`
`,(0,c.jsxs)(t.p,{children:[`A `,(0,c.jsx)(t.code,{children:`confirmType="warning"`}),` will enhance the context by applying a red color to the icon, as in the deletion scenario.`]}),`
`,(0,c.jsx)(v,{}),`
`,(0,c.jsx)(t.h3,{children:`Logged out Dialog`}),`
`,(0,c.jsxs)(t.p,{children:[`Use the `,(0,c.jsx)(t.code,{children:`open`}),` property to automatically trigger the Dialog, here demonstrated with a button for simplicity. You can also change the default confirm text and hide the decline button when suited.`]}),`
`,(0,c.jsx)(y,{}),`
`,(0,c.jsx)(t.h3,{children:`Cookie consent Dialog`}),`
`,(0,c.jsxs)(t.p,{children:[`Provide a custom set of buttons, like this cookie consent Dialog that has a `,(0,c.jsx)(t.code,{children:`tertiary`}),` "Administrate" button. Notice that the `,(0,c.jsx)(t.code,{children:`close`}),` function will be provided for every child of type `,(0,c.jsx)(t.a,{href:`/uilib/components/button`,children:`Button`}),` given to `,(0,c.jsx)(t.code,{children:`Dialog.Action`}),`.`]}),`
`,(0,c.jsx)(b,{}),`
`,(0,c.jsxs)(n,{children:[(0,c.jsx)(x,{}),(0,c.jsx)(S,{})]})]})}function w(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(C,{...e})}):C(e)}function T(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{w as default};