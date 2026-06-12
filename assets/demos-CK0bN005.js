import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{C as n,t as r}from"./Anchor-BqZ7Pm7_.js";import{n as i,r as a,t as o}from"./trash_medium-CJbJz0bX.js";import{t as s}from"./edit-BY-5a6Yq.js";import{n as c}from"./FormStatus-DiAc_h6C.js";import{t as l}from"./Button-DbtiL1rf.js";import{M as u,f as d}from"./Autocomplete-6fC_p2_U.js";import{t as f}from"./P-D0SeNBSG.js";import{a as p,n as m}from"./HelpButton-B8IG5rB3.js";import{c as h}from"./ToggleButton-T4E3Coih.js";import{t as g}from"./Card-Dsou21Li.js";import{t as _}from"./Form-B9l6EvGx.js";import{t as v}from"./Field-DHicZJEj.js";import{K as y,U as b}from"./index-CsG353ar.js";import{t as x}from"./ComponentBox-Cb1rLw_D.js";var S=e(t()),C=()=>(0,S.jsx)(x,{"data-visual-test":`dialog-default`,stableName:`DialogExampleDefault`,sourceImports:[`import { useRef, useState } from 'react'`,`import { trash_medium, log_out_medium, cookie_medium, bell_medium, edit } from '@dnb/eufemia/icons'`,`import { Anchor, Button, Dialog, Flex, ProgressIndicator, FormStatus, Breadcrumb, P, Input } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Dialog:m,P:f,Modal:p,Button:l},children:`<Dialog title="What is a Dialog?">
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
`}),w=()=>(0,S.jsx)(x,{"data-visual-test":`dialog-help-button`,stableName:`DialogExampleHelpButton`,sourceImports:[`import { useRef, useState } from 'react'`,`import { trash_medium, log_out_medium, cookie_medium, bell_medium, edit } from '@dnb/eufemia/icons'`,`import { Anchor, Button, Dialog, Flex, ProgressIndicator, FormStatus, Breadcrumb, P, Input } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Input:u,Dialog:m,P:f},children:`<Input
  label="Input"
  placeholder="Placeholder ..."
  suffix={
    <Dialog>
      <P>Some additional information for the input field.</P>
    </Dialog>
  }
/>
`}),T=()=>(0,S.jsx)(x,{"data-visual-test":`dialog-vertical-alignment`,stableName:`DialogExampleVerticalAlignment`,sourceImports:[`import { useRef, useState } from 'react'`,`import { trash_medium, log_out_medium, cookie_medium, bell_medium, edit } from '@dnb/eufemia/icons'`,`import { Anchor, Button, Dialog, Flex, ProgressIndicator, FormStatus, Breadcrumb, P, Input } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Dialog:m},children:`<Dialog
  title="Vertical alignment top"
  verticalAlignment="top"
  triggerProps={{
    text: 'Vertical alignment',
  }}
  modalContent="The Dialog component is a Modal aligned at the top of the screen. The Dialog has similar functionality to a traditional popup window and is mostly used for informational purposes."
/>
`}),E=()=>(0,S.jsx)(x,{"data-visual-test":`dialog-fullscreen`,stableName:`DialogExampleFullscreen`,sourceImports:[`import { useRef, useState } from 'react'`,`import { trash_medium, log_out_medium, cookie_medium, bell_medium, edit } from '@dnb/eufemia/icons'`,`import { Anchor, Button, Dialog, Flex, ProgressIndicator, FormStatus, Breadcrumb, P, Input } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Dialog:m},children:`<Dialog
  title={<span className="dnb-sr-only">"Hidden" Dialog title</span>}
  fullscreen
  triggerProps={{
    variant: 'tertiary',
    text: 'Open a fullscreen dialog',
    icon: 'bell',
  }}
  modalContent="The Dialog component is a Modal variation that appears at the center of the screen. The Dialog has similar functionality to a traditional popup window and is mostly used for informational purposes."
/>
`}),D=()=>(0,S.jsx)(x,{stableName:`DialogExampleDelayClose`,sourceImports:[`import { useRef, useState } from 'react'`,`import { trash_medium, log_out_medium, cookie_medium, bell_medium, edit } from '@dnb/eufemia/icons'`,`import { Anchor, Button, Dialog, Flex, ProgressIndicator, FormStatus, Breadcrumb, P, Input } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Dialog:m,P:f,Input:u},children:`<Dialog
  title=".5s close delay"
  triggerProps={{
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
`}),O=()=>(0,S.jsx)(x,{"data-visual-test":`dialog-custom-trigger`,stableName:`DialogExampleCustomTrigger`,sourceImports:[`import { useRef, useState } from 'react'`,`import { trash_medium, log_out_medium, cookie_medium, bell_medium, edit } from '@dnb/eufemia/icons'`,`import { Anchor, Button, Dialog, Flex, ProgressIndicator, FormStatus, Breadcrumb, P, Input } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Dialog:m,Button:l,P:f,Modal:p},children:`<Dialog
  title="Modal Title"
  trigger={(props) => (
    <Button {...props} variant="primary" icon="information">
      Custom trigger button
    </Button>
  )}
>
  <P>This Modal was opened by a custom trigger component.</P>
</Dialog>
`}),k=()=>(0,S.jsx)(x,{"data-visual-test":`full-dialog`,stableName:`FullDialogExample`,sourceImports:[`import { useRef, useState } from 'react'`,`import { trash_medium, log_out_medium, cookie_medium, bell_medium, edit } from '@dnb/eufemia/icons'`,`import { Anchor, Button, Dialog, Flex, ProgressIndicator, FormStatus, Breadcrumb, P, Input } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Dialog:m,Breadcrumb:b,P:f,Button:l,FormStatus:c},noInline:!0,children:`const handleBack = () => null
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
`}),A=()=>(0,S.jsx)(x,{stableName:`DialogExampleNested`,sourceImports:[`import { useRef, useState } from 'react'`,`import { trash_medium, log_out_medium, cookie_medium, bell_medium, edit } from '@dnb/eufemia/icons'`,`import { Anchor, Button, Dialog, Flex, ProgressIndicator, FormStatus, Breadcrumb, P, Input } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Dialog:m,P:f},children:`<Dialog
  title="Account settings"
  triggerProps={{
    text: 'Open settings',
  }}
>
  <P bottom>
    Review your account settings below. To permanently remove your account,
    use the button below.
  </P>
  <Dialog
    variant="confirmation"
    confirmType="warning"
    title="Are you sure?"
    description="Deleting your account is permanent and cannot be undone. All your data will be lost."
    triggerProps={{
      text: 'Delete account',
      variant: 'secondary',
    }}
  />
</Dialog>
`}),j=()=>(0,S.jsx)(x,{"data-visual-test":`dialog-progress-indicator`,stableName:`DialogExampleProgressIndicator`,sourceImports:[`import { useRef, useState } from 'react'`,`import { trash_medium, log_out_medium, cookie_medium, bell_medium, edit } from '@dnb/eufemia/icons'`,`import { Anchor, Button, Dialog, Flex, ProgressIndicator, FormStatus, Breadcrumb, P, Input } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Dialog:m,ProgressIndicator:d},children:`<Dialog
  spacing={false}
  fullscreen={false}
  alignContent="centered"
  hideCloseButton
  triggerProps={{
    text: 'Show',
  }}
  preventClose={false}
  maxWidth="12rem"
>
  <ProgressIndicator showDefaultLabel top="large" bottom="large" />
</Dialog>
`}),M=()=>(0,S.jsx)(x,{"data-visual-test":`dialog-confirm-default`,scope:{bell_medium:n},stableName:`DialogConfirmDefault`,sourceImports:[`import { useRef, useState } from 'react'`,`import { trash_medium, log_out_medium, cookie_medium, bell_medium, edit } from '@dnb/eufemia/icons'`,`import { Anchor, Button, Dialog, Flex, ProgressIndicator, FormStatus, Breadcrumb, P, Input } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Dialog:m},children:`<Dialog
  variant="confirmation"
  title="Dialog confirmation title"
  icon={bell_medium}
  description="Some content describing the situation."
  onConfirm={({ close }) => close()}
  triggerProps={{
    text: 'Trigger button',
  }}
/>
`}),N=()=>(0,S.jsx)(x,{"data-visual-test":`dialog-confirm-delete`,scope:{trash_medium:o},stableName:`DialogConfirmDelete`,sourceImports:[`import { useRef, useState } from 'react'`,`import { trash_medium, log_out_medium, cookie_medium, bell_medium, edit } from '@dnb/eufemia/icons'`,`import { Anchor, Button, Dialog, Flex, ProgressIndicator, FormStatus, Breadcrumb, P, Input } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Dialog:m},children:`<Dialog
  variant="confirmation"
  confirmType="warning"
  title="Are you sure you want to delete this?"
  icon={trash_medium}
  description="This action cannot be undone."
  confirmText="Delete"
  declineText="Cancel"
  onConfirm={({ close }) => close()}
  triggerProps={{
    text: 'Delete record',
    icon: trash_medium,
  }}
/>
`}),P=()=>(0,S.jsx)(x,{"data-visual-test":`dialog-confirm-loggedout`,scope:{log_out_medium:i},stableName:`DialogConfirmLoggedOut`,sourceImports:[`import { useRef, useState } from 'react'`,`import { trash_medium, log_out_medium, cookie_medium, bell_medium, edit } from '@dnb/eufemia/icons'`,`import { Anchor, Button, Dialog, Flex, ProgressIndicator, FormStatus, Breadcrumb, P, Input } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Button:l,Dialog:m},noInline:!0,children:`const DemoComponent = () => {
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
`}),F=()=>(0,S.jsx)(x,{"data-visual-test":`dialog-confirm-cookie`,scope:{cookie_medium:a,edit:s},stableName:`DialogConfirmCookies`,sourceImports:[`import { useRef, useState } from 'react'`,`import { trash_medium, log_out_medium, cookie_medium, bell_medium, edit } from '@dnb/eufemia/icons'`,`import { Anchor, Button, Dialog, Flex, ProgressIndicator, FormStatus, Breadcrumb, P, Input } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Dialog:m,Anchor:r,Button:l},children:`<Dialog
  triggerProps={{
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
`}),I=()=>(0,S.jsx)(x,{"data-visual-test":`dialog-scroll-content`,stableName:`DialogConfirmScrollableContent`,sourceImports:[`import { useRef, useState } from 'react'`,`import { trash_medium, log_out_medium, cookie_medium, bell_medium, edit } from '@dnb/eufemia/icons'`,`import { Anchor, Button, Dialog, Flex, ProgressIndicator, FormStatus, Breadcrumb, P, Input } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Dialog:m,Anchor:r,Button:l},noInline:!0,children:`const MockComponent = () => {
  const scrollRef = useRef(null)
  return (
    <Dialog
      triggerProps={{
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
`}),L=()=>(0,S.jsx)(x,{"data-visual-test":`dialog-scroll-content-info`,stableName:`DialogInformationScrollableContent`,sourceImports:[`import { useRef, useState } from 'react'`,`import { trash_medium, log_out_medium, cookie_medium, bell_medium, edit } from '@dnb/eufemia/icons'`,`import { Anchor, Button, Dialog, Flex, ProgressIndicator, FormStatus, Breadcrumb, P, Input } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Dialog:m,Form:_,Flex:h,P:f,Card:g,Field:v},noInline:!0,children:`const MockComponent = () => {
  const scrollRef = useRef(null)
  return (
    <Dialog
      triggerProps={{
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
`});function R(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,...y(),...e.components},{VisibleWhenVisualTest:n}=t;return n||B(`VisibleWhenVisualTest`,!0),(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(t.h2,{children:`Table of contents`}),`
`,(0,S.jsxs)(t.ol,{children:[`
`,(0,S.jsx)(t.li,{children:(0,S.jsx)(t.a,{href:`/uilib/components/dialog/demos#demos-for-variant-information`,children:`Inform demos`})}),`
`,(0,S.jsx)(t.li,{children:(0,S.jsx)(t.a,{href:`/uilib/components/dialog/demos#demos-for-variant-confirmation`,children:`Confirm demos`})}),`
`]}),`
`,(0,S.jsxs)(t.h2,{children:[`Demos for variant `,(0,S.jsx)(t.code,{children:`information`})]}),`
`,(0,S.jsx)(t.h3,{children:`Basic Dialog`}),`
`,(0,S.jsx)(C,{}),`
`,(0,S.jsx)(t.h3,{children:`Dialog as help button`}),`
`,(0,S.jsx)(w,{}),`
`,(0,S.jsx)(t.h3,{children:`Top aligned Dialog`}),`
`,(0,S.jsx)(T,{}),`
`,(0,S.jsx)(t.h3,{children:`Dialog with custom trigger`}),`
`,(0,S.jsx)(O,{}),`
`,(0,S.jsx)(t.h3,{children:`Dialog with custom content`}),`
`,(0,S.jsx)(k,{}),`
`,(0,S.jsx)(t.h3,{children:`Fullscreen Dialog`}),`
`,(0,S.jsx)(E,{}),`
`,(0,S.jsx)(t.h3,{children:`Dialog as progress indicator`}),`
`,(0,S.jsx)(j,{}),`
`,(0,S.jsx)(t.h3,{children:`Nested Dialog`}),`
`,(0,S.jsx)(t.p,{children:`Open a confirmation dialog from within another dialog — for example to confirm a destructive action.`}),`
`,(0,S.jsx)(A,{}),`
`,(0,S.jsx)(t.h3,{children:`Dialog with close delay`}),`
`,(0,S.jsx)(D,{}),`
`,(0,S.jsxs)(t.h2,{children:[`Demos for variant `,(0,S.jsx)(t.code,{children:`confirmation`})]}),`
`,(0,S.jsx)(t.h3,{children:`Confirm dialog`}),`
`,(0,S.jsx)(M,{}),`
`,(0,S.jsx)(t.h3,{children:`Deletion Dialog`}),`
`,(0,S.jsxs)(t.p,{children:[`A `,(0,S.jsx)(t.code,{children:`confirmType="warning"`}),` will enhance the context by applying a red color to the icon, as in the deletion scenario.`]}),`
`,(0,S.jsx)(N,{}),`
`,(0,S.jsx)(t.h3,{children:`Logged out Dialog`}),`
`,(0,S.jsxs)(t.p,{children:[`Use the `,(0,S.jsx)(t.code,{children:`open`}),` property to automatically trigger the Dialog, here demonstrated with a button for simplicity. You can also change the default confirm text and hide the decline button when suited.`]}),`
`,(0,S.jsx)(P,{}),`
`,(0,S.jsx)(t.h3,{children:`Cookie consent Dialog`}),`
`,(0,S.jsxs)(t.p,{children:[`Provide a custom set of buttons, like this cookie consent Dialog that has a `,(0,S.jsx)(t.code,{children:`tertiary`}),` "Administrate" button. Notice that the `,(0,S.jsx)(t.code,{children:`close`}),` function will be provided for every child of type `,(0,S.jsx)(t.a,{href:`/uilib/components/button`,children:`Button`}),` given to `,(0,S.jsx)(t.code,{children:`Dialog.Action`}),`.`]}),`
`,(0,S.jsx)(F,{}),`
`,(0,S.jsxs)(n,{children:[(0,S.jsx)(I,{}),(0,S.jsx)(L,{})]})]})}function z(e={}){let{wrapper:t}={...y(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(R,{...e})}):R(e)}function B(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{z as default};