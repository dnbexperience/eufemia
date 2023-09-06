"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[57930],{86733:function(n,e,o){o.r(e),o.d(e,{default:function(){return _}});var t=o(52322),i=o(45392),l=(o(2784),o(82058)),r=o(46515),a=o(32643),s=o(70017),c=o(95138),d=o(28352);const h=()=>(0,t.jsx)(l.Z,{"data-visual-test":"dialog-default",children:'<Dialog title="What is a Dialog?">\n  <P>\n    The Dialog component is a Modal variation that appears at the center of\n    the screen. The Dialog has similar functionality to a traditional popup\n    window and is mostly used for informational purposes (for example\n    explaining a word on the page). Similar to Modal, it has to be\n    triggered by the user to appear. Typical usage would be to read an\n    explanation, then closing it.\n  </P>\n  <Button variant="secondary" size="large" top="large">\n    Read more\n  </Button>\n</Dialog>\n'}),g=()=>(0,t.jsx)(l.Z,{"data-visual-test":"dialog-help-button",children:'<Input\n  label="Input"\n  placeholder="Placeholder ..."\n  suffix={\n    <Dialog>\n      <P>Some additional information for the input field.</P>\n    </Dialog>\n  }\n/>\n'}),u=()=>(0,t.jsx)(l.Z,{"data-visual-test":"dialog-fullscreen",children:"<Dialog\n  title={<span className=\"dnb-sr-only\">\"Hidden\" Dialog title</span>}\n  fullscreen\n  triggerAttributes={{\n    variant: 'tertiary',\n    text: 'Open a fullscreen dialog',\n    icon: 'bell',\n  }}\n  modalContent=\"The Dialog component is a Modal variation that appears at the center of the screen. The Dialog has similar functionality to a traditional popup window and is mostly used for informational purposes.\"\n/>\n"}),m=()=>(0,t.jsx)(l.Z,{children:"<Dialog\n  title=\".5s close delay\"\n  triggerAttributes={{\n    text: 'Click me',\n  }}\n  focusSelector=\".dnb-input__input:first-of-type\"\n  preventClose\n  hideCloseButton\n  onOpen={(e) => console.log('on_open', e)}\n  onClose={(e) => console.log('on_close', e)}\n  onClosePrevent={({ close, triggeredBy }) => {\n    console.log('triggeredBy', triggeredBy)\n    const timeout = setTimeout(close, 500)\n    return () => clearTimeout(timeout) // clear timeout on unmount\n  }}\n>\n  <P>This is a Dialog with no close button.</P>\n  <P>Click outside me, and I will be closed within 1 second.</P>\n  <Input label=\"Focus:\" top>\n    Focus me with Tab key\n  </Input>\n</Dialog>\n"}),p=()=>(0,t.jsx)(l.Z,{"data-visual-test":"dialog-custom-trigger",children:'<Dialog\n  title="Modal Title"\n  trigger={(props) => (\n    <Button {...props} variant="primary" icon="information">\n      Custom trigger button\n    </Button>\n  )}\n>\n  <P>This Modal was opened by a custom trigger component.</P>\n</Dialog>\n'}),f=()=>(0,t.jsx)(l.Z,{"data-visual-test":"full-dialog",noInline:!0,children:'const handleBack = () => null\nrender(\n  <>\n    <Dialog title="Custom title">\n      <Dialog.Navigation>\n        <Breadcrumb onClick={handleBack} />\n      </Dialog.Navigation>\n      <Dialog.Header>\n        <P bottom>This is in the Dialog header</P>\n      </Dialog.Header>\n      <Button bottom size="large" right top>\n        Read more\n      </Button>\n      <Button bottom size="large" variant="secondary">\n        Open example\n      </Button>\n      <FormStatus state="info">\n        This is a formstatus in a Dialog\n      </FormStatus>\n    </Dialog>\n  </>,\n)\n'}),x=()=>(0,t.jsx)(l.Z,{"data-visual-test":"dialog-progress-indicator",children:'<Dialog\n  spacing={false}\n  fullscreen={false}\n  alignContent="centered"\n  hideCloseButton\n  triggerAttributes={{\n    text: \'Show\',\n  }}\n  preventClose={false}\n  maxWidth="12rem"\n>\n  <ProgressIndicator\n    show_label\n    label_direction="vertical"\n    top="large"\n    bottom="large"\n  />\n</Dialog>\n'}),b=()=>(0,t.jsx)(l.Z,{"data-visual-test":"dialog-confirm-default",scope:{bell_medium:r.Z},children:'<Dialog\n  variant="confirmation"\n  title="Dialog confirmation title"\n  icon={bell_medium}\n  description="Some content describing the situation."\n  onConfirm={({ close }) => close()}\n  triggerAttributes={{\n    text: \'Trigger button\',\n  }}\n/>\n'}),w=()=>(0,t.jsx)(l.Z,{"data-visual-test":"dialog-confirm-delete",scope:{trash_medium:a.Z},children:'<Dialog\n  variant="confirmation"\n  confirmType="warning"\n  title="Are you sure you want to delete this?"\n  icon={trash_medium}\n  description="This action cannot be undone."\n  confirmText="Delete"\n  declineText="Cancel"\n  onConfirm={({ close }) => close()}\n  triggerAttributes={{\n    text: \'Delete record\',\n    icon: trash_medium,\n  }}\n/>\n'}),j=()=>(0,t.jsx)(l.Z,{"data-visual-test":"dialog-confirm-loggedout",scope:{log_out_medium:s.Z},noInline:!0,children:'const DemoComponent = () => {\n  const [open, setOpen] = React.useState(false)\n  const loginHandler = () => null\n  return (\n    <>\n      <Button\n        id="custom-triggerer"\n        text="Manually trigger"\n        on_click={() => setOpen(true)}\n      />\n      <Dialog\n        variant="confirmation"\n        title="Du har blitt logget ut"\n        icon={log_out_medium}\n        description="For å fortsette må du logge inn igjen."\n        confirmText="Logg inn"\n        hideDecline\n        openState={open}\n        onClose={() => {\n          setOpen(false)\n        }}\n        onConfirm={() => {\n          setOpen(false)\n          loginHandler()\n        }}\n        labelledBy="custom-triggerer"\n      />\n    </>\n  )\n}\nrender(<DemoComponent />)\n'}),v=()=>(0,t.jsx)(l.Z,{"data-visual-test":"dialog-confirm-cookie",scope:{cookie_medium:c.Z,edit:d.Z},children:'<Dialog\n  triggerAttributes={{\n    text: \'Show cookie dialog\',\n  }}\n  icon={cookie_medium}\n  variant="confirmation"\n  title="Informasjonskapsler (cookies)"\n>\n  Vi bruker cookies for å gi deg den beste opplevelsen i nettbanken vår.\n  <br />\n  <Anchor target="_blank" href="https://www.dnb.no/cookies">\n    Les mer om cookies\n  </Anchor>\n  <Dialog.Action>\n    <Button\n      variant="tertiary"\n      text="Administrer"\n      icon={edit}\n      icon_position="left"\n      on_click={({ close }) => {\n        close()\n      }}\n    />\n    <Button\n      text="Jeg godtar"\n      on_click={({ close }) => {\n        close()\n      }}\n    />\n  </Dialog.Action>\n</Dialog>\n'}),D=()=>(0,t.jsx)(l.Z,{"data-visual-test":"dialog-scroll-content",noInline:!0,children:'const MockComponent = () => {\n  const scrollRef = React.useRef(null)\n  return (\n    <Dialog\n      triggerAttributes={{\n        text: \'Show cookie dialog\',\n      }}\n      variant="confirmation"\n      title="Informasjonskapsler (cookies)"\n      scrollRef={scrollRef}\n      onOpen={() => {\n        if (\n          document.documentElement.classList.contains(\'scroll-to-bottom\')\n        ) {\n          scrollRef.current.scrollTop = 100000\n        }\n      }}\n    >\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      Newline\n      <br />\n      <br />\n      <Anchor target="_blank" href="https://www.dnb.no/cookies">\n        Les mer om cookies\n      </Anchor>\n      <Dialog.Action>\n        <Button\n          variant="tertiary"\n          text="Administrer"\n          icon_position="left"\n          on_click={({ close }) => {\n            close()\n          }}\n        />\n        <Button\n          text="Jeg godtar"\n          on_click={({ close }) => {\n            close()\n          }}\n        />\n      </Dialog.Action>\n    </Dialog>\n  )\n}\nrender(<MockComponent />)\n'});function k(n){const e=Object.assign({h2:"h2",ol:"ol",li:"li",a:"a",code:"code",h3:"h3",p:"p"},(0,i.ah)(),n.components),{VisibleWhenVisualTest:o}=e;return o||function(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}("VisibleWhenVisualTest",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h2,{children:"Table of contents"}),"\n",(0,t.jsxs)(e.ol,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"/uilib/components/dialog/demos#demos-for-variant-information",children:"Inform demos"})}),"\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"/uilib/components/dialog/demos#demos-for-variant-confirmation",children:"Confirm demos"})}),"\n"]}),"\n",(0,t.jsxs)(e.h2,{children:["Demos for variant ",(0,t.jsx)(e.code,{children:"information"})]}),"\n",(0,t.jsx)(e.h3,{children:"Basic Dialog"}),"\n",(0,t.jsx)(h,{}),"\n",(0,t.jsx)(e.h3,{children:"Dialog as help button"}),"\n",(0,t.jsx)(g,{}),"\n",(0,t.jsx)(e.h3,{children:"Dialog with custom trigger"}),"\n",(0,t.jsx)(p,{}),"\n",(0,t.jsx)(e.h3,{children:"Dialog with custom content"}),"\n",(0,t.jsx)(f,{}),"\n",(0,t.jsx)(e.h3,{children:"Fullscreen Dialog"}),"\n",(0,t.jsx)(u,{}),"\n",(0,t.jsx)(e.h3,{children:"Dialog as progress indicator"}),"\n",(0,t.jsx)(x,{}),"\n",(0,t.jsx)(e.h3,{children:"Dialog with close delay"}),"\n",(0,t.jsx)(m,{}),"\n",(0,t.jsxs)(e.h2,{children:["Demos for variant ",(0,t.jsx)(e.code,{children:"confirmation"})]}),"\n",(0,t.jsx)(e.h3,{children:"Confirm dialog"}),"\n",(0,t.jsx)(b,{}),"\n",(0,t.jsx)(e.h3,{children:"Deletion Dialog"}),"\n",(0,t.jsxs)(e.p,{children:["A ",(0,t.jsx)(e.code,{children:'confirmType="warning"'})," will enhance the context by applying a red color to the icon, as in the deletion scenario."]}),"\n",(0,t.jsx)(w,{}),"\n",(0,t.jsx)(e.h3,{children:"Logged out Dialog"}),"\n",(0,t.jsxs)(e.p,{children:["Use the ",(0,t.jsx)(e.code,{children:"openState"})," prop to automatically trigger the Dialog, here demonstrated with a button for simplicity. You can also change the default confirm text and hide the decline button when suited."]}),"\n",(0,t.jsx)(j,{}),"\n",(0,t.jsx)(e.h3,{children:"Cookie concent Dialog"}),"\n",(0,t.jsxs)(e.p,{children:["Provide a custom set of buttons, like this cookie concent Dialog that has a ",(0,t.jsx)(e.code,{children:"tertiary"}),' "Administrate" button. Notice that the ',(0,t.jsx)(e.code,{children:"close"})," function will be provided for every child of type ",(0,t.jsx)(e.a,{href:"/uilib/components/button",children:"Button"})," given to ",(0,t.jsx)(e.code,{children:"Dialog.Actions"}),"."]}),"\n",(0,t.jsx)(v,{}),"\n",(0,t.jsx)(o,{children:(0,t.jsx)(D,{})})]})}var _=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(k,n)})):k(n)}},95138:function(n,e,o){var t=o(52322);e.Z=n=>(0,t.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",viewBox:"0 0 24 24",...n,children:[(0,t.jsx)("g",{clipPath:"url(#cookie_medium_svg__a)",children:(0,t.jsx)("path",{stroke:"#000",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"M13.823 10.008h.346M18.836 13h.346m-12.35 4.005h.346m13.62-7.948a3.665 3.665 0 0 1-3.668-3.69 3.636 3.636 0 0 1-3.945.314A3.668 3.668 0 0 1 11.554 1 10.997 10.997 0 0 0 1.443 8.904a11.009 11.009 0 0 0 4.255 12.11 10.997 10.997 0 0 0 16.769-5.633c.708-2.192.71-4.55.009-6.743a3.628 3.628 0 0 1-1.677.42ZM10 10.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm6 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-1.752-7.492c0 .183-.16.243-.248.243-.092 0-.252-.06-.252-.243 0-.197.16-.257.252-.257.088 0 .248.06.248.257ZM19.261 13c0 .183-.16.243-.248.243-.092 0-.252-.06-.252-.243 0-.197.16-.257.252-.257.088 0 .248.06.248.257ZM7.257 17.005c0 .184-.16.244-.248.244-.092 0-.252-.06-.252-.244 0-.197.16-.256.252-.256.088 0 .248.06.248.256Z"})}),(0,t.jsx)("defs",{children:(0,t.jsx)("clipPath",{id:"cookie_medium_svg__a",children:(0,t.jsx)("path",{fill:"#fff",d:"M0 0h24v24H0z"})})})]})},28352:function(n,e,o){var t=o(52322);e.Z=n=>(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:16,height:16,fill:"none",viewBox:"0 0 16 16",...n,children:(0,t.jsx)("path",{stroke:"#000",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"m14.06 5.134-8.764 8.764L1 15l1.101-4.296 8.764-8.765m3.195 3.195.258-.258a2.263 2.263 0 0 0 .022-3.216 2.264 2.264 0 0 0-3.217.022l-.258.257m3.195 3.195L10.865 1.94"})})},70017:function(n,e,o){var t=o(52322);e.Z=n=>(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",viewBox:"0 0 24 24",...n,children:(0,t.jsx)("path",{stroke:"#000",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"M17.067 18.6v1.467a1.467 1.467 0 0 1-1.467 1.467h-1.4m0-17.6h1.4A1.467 1.467 0 0 1 17.067 5.4v1.466m3 2.933L23 12.733m0 0h-8.067m8.067 0-2.933 2.933m-12.1-4.032a.367.367 0 1 0 .339.222.364.364 0 0 0-.34-.226m2.464 11.363-8.8-1.258A.732.732 0 0 1 1 21.01V3.906a.733.733 0 0 1 .58-.718l8.8-2.172a.733.733 0 0 1 .887.718v20.533a.733.733 0 0 1-.837.726Z"})})},32643:function(n,e,o){var t=o(52322);e.Z=n=>(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,fill:"none",viewBox:"0 0 24 24",...n,children:(0,t.jsx)("path",{stroke:"#000",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1.5,d:"M14.25 17.25v-7.5m-4.5 7.5v-7.5M1.5 4.5h21m-3.635 16.624A1.5 1.5 0 0 1 17.37 22.5H6.631a1.5 1.5 0 0 1-1.495-1.376L3.75 4.5h16.5l-1.385 16.624ZM14.25 1.5h-4.5A1.5 1.5 0 0 0 8.25 3v1.5h7.5V3a1.5 1.5 0 0 0-1.5-1.5Z"})})}}]);
//# sourceMappingURL=component---src-docs-uilib-components-dialog-demos-mdx-bd5a723f53d2bd1c187f.js.map