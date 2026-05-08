import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import{a as n}from"./Examples-fvfY9Q2I.js";import r from"./demos-TkwAgJHg.js";var i=e();function a(e){let r={a:`a`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.h2,{children:`Import`}),`
`,(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:`language-tsx`,children:`import { Modal } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(r.h2,{children:`Description`}),`
`,(0,i.jsxs)(r.p,{children:[`Modal is the root component for `,(0,i.jsx)(r.a,{href:`/uilib/components/drawer`,children:`Drawer`}),` and `,(0,i.jsx)(r.a,{href:`/uilib/components/dialog`,children:`Dialog`}),`. If one of these satisfies your needs, use them instead of directly using Modal. The Modal component allows you to implement other modal variants beyond what we currently provide (Drawer and Dialog).`]}),`
`,(0,i.jsxs)(r.p,{children:[(0,i.jsx)(r.strong,{children:`Note:`}),` Modal dialogs interrupt users and demand action. They're appropriate when the user's attention needs to be directed toward important information.`]}),`
`,(0,i.jsx)(r.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(r.ul,{children:[`
`,(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/modal`,children:`Source code`})}),`
`,(0,i.jsx)(r.li,{children:(0,i.jsx)(r.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/modal`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(r.h3,{children:`Behavior`}),`
`,(0,i.jsxs)(r.p,{children:[`The modal can be triggered from either a button or by using the `,(0,i.jsx)(r.code,{children:`open`}),` property. Triggering a modal will activate the opaque overlay and display the contents.`]}),`
`,(0,i.jsx)(r.h3,{children:`Help button`}),`
`,(0,i.jsxs)(r.p,{children:[`Since Modal is often used with other components and frequently enhances contextual content, it includes a trigger button (`,(0,i.jsx)(r.a,{href:`/uilib/components/help-button`,children:`HelpButton`}),`) with a question mark icon by default. You can disable this behavior with `,(0,i.jsx)(r.code,{children:`omitTriggerButton={true}`}),`.`]}),`
`,(0,i.jsxs)(r.p,{children:[`You can also use the broadly available `,(0,i.jsx)(r.code,{children:`suffix`}),` property, like so:`]}),`
`,(0,i.jsx)(n,{}),`
`,(0,i.jsx)(r.h3,{children:`Accessibility`}),`
`,(0,i.jsx)(r.p,{children:`Modals implement many accessibility considerations.`}),`
`,(0,i.jsx)(r.p,{children:`Entering a Modal (all variants) will:`}),`
`,(0,i.jsxs)(r.ol,{children:[`
`,(0,i.jsx)(r.li,{children:`Set focus on the heading or close button`}),`
`,(0,i.jsx)(r.li,{children:`Enable escape key listener`}),`
`,(0,i.jsxs)(r.li,{children:[`Make every DOM element outside the Modal/Drawer inaccessible to keyboard and screen reader users. A `,(0,i.jsx)(r.a,{href:`/uilib/helpers/functions#interactioninvalidation`,children:`helper function`}),` is available for use in your application`]}),`
`,(0,i.jsx)(r.li,{children:`Disable body scrolling`}),`
`,(0,i.jsx)(r.li,{children:`Make the Modal/Drawer scrollable if needed`}),`
`,(0,i.jsx)(r.li,{children:`Dim the body/background with an overlay`}),`
`]}),`
`,(0,i.jsx)(r.h3,{children:`Structure and content`}),`
`,(0,i.jsx)(r.p,{children:`Typically an opaque cover over the main content (fullscreen) and a small centered box containing information and interactive elements (buttons, forms etc.)`}),`
`,(0,i.jsx)(r.h3,{children:`What is it`}),`
`,(0,i.jsxs)(r.p,{children:[`Modal dialogs appear on top of the main content changing the `,(0,i.jsx)(r.em,{children:`mode`}),` of the system into a special mode requiring user interaction. The main content is disabled until the user interacts with the modal dialog.`]}),`
`,(0,i.jsx)(r.h3,{children:`Disadvantages of Modal`}),`
`,(0,i.jsxs)(r.ol,{children:[`
`,(0,i.jsx)(r.li,{children:`They require immediate attention`}),`
`,(0,i.jsx)(r.li,{children:`They interrupt users`}),`
`,(0,i.jsx)(r.li,{children:`They cause users to forget what they were doing`}),`
`,(0,i.jsx)(r.li,{children:`They add extra goals: reading, interacting, and closing the Modal`}),`
`,(0,i.jsx)(r.li,{children:`They block the content in the background`}),`
`]}),`
`,(0,i.jsx)(r.h3,{children:`Guidelines`}),`
`,(0,i.jsxs)(r.ol,{children:[`
`,(0,i.jsx)(r.li,{children:`Use for important warnings to prevent or correct critical errors`}),`
`,(0,i.jsx)(r.li,{children:`Do not use for nonessential information unrelated to the user's current workflow`}),`
`,(0,i.jsx)(r.li,{children:`Use for requesting user input critical to the current process`}),`
`]}),`
`,(0,i.jsx)(r.h4,{children:`Nested modals`}),`
`,(0,i.jsx)(r.p,{children:`While it is possible to nest a Modal within another Modal, you as a developer must ensure the browser's back button (alongside the URL path) handles the nested Modal situation. A user should still be able to use the back button as expected and return to the last visited "page".`}),`
`,(0,i.jsx)(r.h2,{children:`Root Element (React Portal)`}),`
`,(0,i.jsxs)(r.p,{children:[`The Modal component uses `,(0,i.jsx)(r.a,{href:`/uilib/components/portal-root`,children:`PortalRoot`}),` internally to render its content. See the `,(0,i.jsx)(r.a,{href:`/uilib/components/portal-root`,children:`PortalRoot documentation`}),` for information on how to control where the portal content appears in the DOM.`]}),`
`,(0,i.jsx)(r.h3,{children:`Z-index`}),`
`,(0,i.jsxs)(r.p,{children:[`The Modal component is using `,(0,i.jsx)(r.strong,{children:`3000`}),` as the `,(0,i.jsx)(r.code,{children:`z-index`}),`.`]}),`
`,(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:`language-css`,children:`:root {
  --modal-z-index: 3000;
}
`})}),`
`,(0,i.jsx)(r.h3,{children:`data-dnb-modal-active`}),`
`,(0,i.jsxs)(r.p,{children:[`When a Modal/Drawer is open, it will set an HTML attribute on the main HTML element called `,(0,i.jsx)(r.code,{children:`data-dnb-modal-active`}),`. The attribute value will be the ID of the current Modal/Drawer.`]}),`
`,(0,i.jsx)(r.p,{children:`This can be used to handle z-index issues from within CSS only:`}),`
`,(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:`language-css`,children:`html[data-dnb-modal-active='MODAL-ID'] {
  /* Your css */
}
`})})]})}function o(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};