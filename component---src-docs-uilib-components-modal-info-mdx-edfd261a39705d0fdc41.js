"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[79822],{99793:function(e,n,t){t.r(n);var o=t(52322),i=t(45392),a=t(17435);function r(e){const n=Object.assign({h2:"h2",pre:"pre",code:"code",p:"p",a:"a",h3:"h3",ol:"ol",li:"li",em:"em",h4:"h4",strong:"strong"},(0,i.ah)(),e.components);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h2,{children:"Import"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-tsx",children:"import { Modal } from '@dnb/eufemia'\n"})}),"\n",(0,o.jsx)(n.h2,{children:"Description"}),"\n",(0,o.jsxs)(n.p,{children:["Modal is the root component for ",(0,o.jsx)(n.a,{href:"/uilib/components/drawer",children:"Drawer"})," and ",(0,o.jsx)(n.a,{href:"/uilib/components/dialog",children:"Dialog"}),". If one of these satisfy your needs, you want to use those rather than directly using Modal. Using the Modal, it's possible to implement other modal variants than we provide as of now(Drawer and Dialog)."]}),"\n",(0,o.jsx)(n.p,{children:"NB! Modal dialogs interrupt users and demand an action. They are appropriate when the user’s attention needs to be directed toward important information."}),"\n",(0,o.jsx)(n.h3,{children:"Behavior"}),"\n",(0,o.jsxs)(n.p,{children:["The modal can be triggered from either a button or by using the ",(0,o.jsx)(n.code,{children:"open_state"})," property. Triggering a modal will activate the opaque overlay and display the contents."]}),"\n",(0,o.jsx)(n.h3,{children:"Help button"}),"\n",(0,o.jsxs)(n.p,{children:["As the Modal is very often used in combination with other components and often as an enhancement of contextual content, it comes with a trigger button (",(0,o.jsx)(n.a,{href:"/uilib/components/help-button",children:"HelpButton"}),") with a question mark icon by default. You can for sure disable that behavior by using ",(0,o.jsx)(n.code,{children:"omitTriggerButton={true}"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:["You can also use the broadly available ",(0,o.jsx)(n.code,{children:"suffix"})," property, like so:"]}),"\n",(0,o.jsx)(a.a6,{}),"\n",(0,o.jsx)(n.h3,{children:"Accessibility"}),"\n",(0,o.jsx)(n.p,{children:"In order to make modals accessible, a lot of things are considered."}),"\n",(0,o.jsx)(n.p,{children:"Entering a Modal (all variants) will:"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"Set focus on the heading or close button."}),"\n",(0,o.jsx)(n.li,{children:"Enable escape key listener."}),"\n",(0,o.jsxs)(n.li,{children:["Invalidate every DOM element outside of the Modal / Drawer, so they are not accessible to keyboard and screen reader users. For doing that, there is a ",(0,o.jsx)(n.a,{href:"/uilib/helpers/functions#interactioninvalidation-example",children:"helper function"})," to be used in your application as well."]}),"\n",(0,o.jsx)(n.li,{children:"Disable the body scroll possibility."}),"\n",(0,o.jsx)(n.li,{children:"Make the Modal / Drawer scrollable if needed."}),"\n",(0,o.jsx)(n.li,{children:"Dim the body / background with an overlay."}),"\n"]}),"\n",(0,o.jsx)(n.h3,{children:"Structure and content"}),"\n",(0,o.jsx)(n.p,{children:"Typically an opaque cover over the main content (fullscreen) and a small centered box containing information and interactive elements (buttons, forms etc.)"}),"\n",(0,o.jsx)(n.h3,{children:"What is it"}),"\n",(0,o.jsxs)(n.p,{children:["Modal dialogs appear on top of the main content changing the ",(0,o.jsx)(n.em,{children:"mode"})," of the system into a special mode requiring user interaction. The main content is disabled until the user interacts with the modal dialog."]}),"\n",(0,o.jsx)(n.h3,{children:"Disadvantages of Modal"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"They require immediate attention."}),"\n",(0,o.jsx)(n.li,{children:"They interrupt users."}),"\n",(0,o.jsx)(n.li,{children:"They cause users to forget what they were doing."}),"\n",(0,o.jsx)(n.li,{children:"They add extra goals - reading, interacting, and closing the Modal."}),"\n",(0,o.jsx)(n.li,{children:"They block the content in the background."}),"\n"]}),"\n",(0,o.jsx)(n.h3,{children:"Guidelines"}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsx)(n.li,{children:"Use for important warnings as a way to prevent or correct critical errors."}),"\n",(0,o.jsx)(n.li,{children:"Do not use for unessential information that is not related to the user's current workflow."}),"\n",(0,o.jsx)(n.li,{children:"Use for requesting the user to enter information critical to the current process."}),"\n"]}),"\n",(0,o.jsx)(n.h4,{children:"Nested modals"}),"\n",(0,o.jsx)(n.p,{children:'While it is possible to nest a Modal within another Modal, you as a developer have to ensure the Browsers back-button (alongside the URL path), does take care of the nested Modal situation. Because a user should still be able to use the back button as expected and return to the last visited "page".'}),"\n",(0,o.jsx)(n.h2,{children:"Root Element"}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.strong,{children:"NB:"})," If the wrapper is not set manually, a wrapper is inserted automatically as a child node to the body."]}),"\n",(0,o.jsxs)(n.p,{children:["To make sure the HTML structure is decoupled from all the page content, you can optionally define a wrapper div like ",(0,o.jsx)(n.code,{children:'<div class="dnb-modal-root" />'}),"."]}),"\n",(0,o.jsx)(n.p,{children:"Just place this as a sibling of your app root HTML element. This ensures that we always can stack the modal content above the App Content."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-html",children:'<body>\n  <div id="app" />\n  <div id="dnb-modal-root" />\n</body>\n'})}),"\n",(0,o.jsx)(n.h3,{children:"Z-index"}),"\n",(0,o.jsxs)(n.p,{children:["The Modal component is using ",(0,o.jsx)(n.strong,{children:"3000"})," as the ",(0,o.jsx)(n.code,{children:"z-index"}),"."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-css",children:":root {\n  --modal-z-index: 3000;\n}\n"})}),"\n",(0,o.jsx)(n.h3,{children:"data-dnb-modal-active"}),"\n",(0,o.jsxs)(n.p,{children:["When a Modal / Drawer is open, it will set an HTML attribute on the main HTML Element called ",(0,o.jsx)(n.code,{children:"data-dnb-modal-active"}),". The attribute value will be the ID of the current Modal / Drawer."]}),"\n",(0,o.jsx)(n.p,{children:"This can be used to handle z-index issues from within CSS only:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-css",children:"html[data-dnb-modal-active='MODAL-ID'] {\n  /* Your css */\n}\n"})})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,o.jsx)(n,Object.assign({},e,{children:(0,o.jsx)(r,e)})):r(e)}},17435:function(e,n,t){t.d(n,{Ju:function(){return c},Lm:function(){return h},S6:function(){return r},YR:function(){return s},a6:function(){return d},df:function(){return l}});t(2784);var o=t(41404),i=t(52322);const a=e=>{let{children:n}=e;return(0,i.jsx)("div",{id:"example-card",style:{padding:"2rem",backgroundColor:"white"},children:n})},r=()=>(0,i.jsx)(o.Z,{"data-visual-test":"modal-standard",scope:{ExampleCard:a},children:"<Modal>\n  <ExampleCard>\n    <P>This is a Modal that you can use to make custom variations</P>\n  </ExampleCard>\n</Modal>\n"}),s=()=>(0,i.jsx)(o.Z,{scope:{ExampleCard:a},noInline:!0,children:'const Component = () => {\n  const [modalIsActive, setModalState] = React.useState(false)\n  return (\n    <>\n      <Button\n        id="custom-triggerer"\n        text="Custom trigger Button"\n        on_click={() => setModalState((s) => !s)}\n      />\n      <Modal\n        title="Modal Title"\n        omit_trigger_button\n        open_state={modalIsActive}\n        labelled_by="custom-triggerer"\n        on_close={() => setModalState(false)}\n      >\n        <ExampleCard>\n          <P>This Modal was opened by a custom trigger button.</P>\n        </ExampleCard>\n      </Modal>\n    </>\n  )\n}\nrender(<Component />)\n'}),l=()=>(0,i.jsx)(o.Z,{scope:{ExampleCard:a},children:'<Modal\n  title="Auto close"\n  triggerAttributes={{\n    text: \'Click me\',\n  }}\n  align_content="center"\n  max_width="40rem"\n  close_modal={(close) => {\n    const timeout = setTimeout(close, 3e3)\n    return () => clearTimeout(timeout)\n  }}\n>\n  <ExampleCard>\n    <P>This Modal will close in 3 seconds.</P>\n  </ExampleCard>\n</Modal>\n'}),d=()=>(0,i.jsx)(o.Z,{hidePreview:!0,children:'<Input\n  label="Input"\n  placeholder="Placeholder ..."\n  suffix={<HelpButton>Help text</HelpButton>}\n/>\n'}),c=()=>(0,i.jsx)(o.Z,{hidePreview:!0,children:"<Modal\n  triggerAttributes={{\n    icon: 'bell',\n  }}\n  right=\"small\"\n>\n  ... content ...\n</Modal>\n"}),h=()=>(0,i.jsx)(o.Z,{hidePreview:!0,children:"<Modal\n  preventClose={true}\n  onClosePrevent={({ triggeredBy, close /* id, event */ }) => {\n    switch (triggeredBy) {\n      case 'keyboard':\n      case 'button':\n        close()\n        break\n      case 'overlay': {\n        const timeout = setTimeout(close, 1e3)\n        return () => clearTimeout(timeout) // clear timeout on unmount\n      }\n    }\n  }}\n>\n  ...\n</Modal>\n"})}}]);
//# sourceMappingURL=component---src-docs-uilib-components-modal-info-mdx-edfd261a39705d0fdc41.js.map