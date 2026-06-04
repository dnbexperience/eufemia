import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";import{a as r}from"./Examples-8V1bGGQT.js";import i from"./demos-CftOEC8T.js";var a=e(t());function o(e){let t={a:`a`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Import`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-tsx`,children:`import { Modal } from '@dnb/eufemia'
`})}),`
`,(0,a.jsx)(t.h2,{children:`Description`}),`
`,(0,a.jsxs)(t.p,{children:[`Modal is the root component for `,(0,a.jsx)(t.a,{href:`/uilib/components/drawer`,children:`Drawer`}),` and `,(0,a.jsx)(t.a,{href:`/uilib/components/dialog`,children:`Dialog`}),`. If one of these satisfies your needs, use them instead of directly using Modal. The Modal component allows you to implement other modal variants beyond what we currently provide (Drawer and Dialog).`]}),`
`,(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:`Note:`}),` Modal dialogs interrupt users and demand action. They're appropriate when the user's attention needs to be directed toward important information.`]}),`
`,(0,a.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/modal`,children:`Source code`})}),`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/modal`,children:`Docs code`})}),`
`]}),`
`,(0,a.jsx)(t.h3,{children:`Behavior`}),`
`,(0,a.jsxs)(t.p,{children:[`The modal can be triggered from either a button or by using the `,(0,a.jsx)(t.code,{children:`open`}),` property. Triggering a modal will activate the opaque overlay and display the contents.`]}),`
`,(0,a.jsx)(t.h3,{children:`Help button`}),`
`,(0,a.jsxs)(t.p,{children:[`Since Modal is often used with other components and frequently enhances contextual content, it includes a trigger button (`,(0,a.jsx)(t.a,{href:`/uilib/components/help-button`,children:`HelpButton`}),`) with a question mark icon by default. You can disable this behavior with `,(0,a.jsx)(t.code,{children:`omitTriggerButton={true}`}),`.`]}),`
`,(0,a.jsxs)(t.p,{children:[`You can also use the broadly available `,(0,a.jsx)(t.code,{children:`suffix`}),` property, like so:`]}),`
`,(0,a.jsx)(r,{}),`
`,(0,a.jsx)(t.h3,{children:`Accessibility`}),`
`,(0,a.jsx)(t.p,{children:`Modals implement many accessibility considerations.`}),`
`,(0,a.jsx)(t.p,{children:`Entering a Modal (all variants) will:`}),`
`,(0,a.jsxs)(t.ol,{children:[`
`,(0,a.jsx)(t.li,{children:`Set focus on the heading or close button`}),`
`,(0,a.jsx)(t.li,{children:`Enable escape key listener`}),`
`,(0,a.jsxs)(t.li,{children:[`Make every DOM element outside the Modal/Drawer inaccessible to keyboard and screen reader users. A `,(0,a.jsx)(t.a,{href:`/uilib/helpers/functions#interactioninvalidation`,children:`helper function`}),` is available for use in your application`]}),`
`,(0,a.jsx)(t.li,{children:`Disable body scrolling`}),`
`,(0,a.jsx)(t.li,{children:`Make the Modal/Drawer scrollable if needed`}),`
`,(0,a.jsx)(t.li,{children:`Dim the body/background with an overlay`}),`
`]}),`
`,(0,a.jsx)(t.h3,{children:`Structure and content`}),`
`,(0,a.jsx)(t.p,{children:`Typically an opaque cover over the main content (fullscreen) and a small centered box containing information and interactive elements (buttons, forms etc.)`}),`
`,(0,a.jsx)(t.h3,{children:`What is it`}),`
`,(0,a.jsxs)(t.p,{children:[`Modal dialogs appear on top of the main content changing the `,(0,a.jsx)(t.em,{children:`mode`}),` of the system into a special mode requiring user interaction. The main content is disabled until the user interacts with the modal dialog.`]}),`
`,(0,a.jsx)(t.h3,{children:`Disadvantages of Modal`}),`
`,(0,a.jsxs)(t.ol,{children:[`
`,(0,a.jsx)(t.li,{children:`They require immediate attention`}),`
`,(0,a.jsx)(t.li,{children:`They interrupt users`}),`
`,(0,a.jsx)(t.li,{children:`They cause users to forget what they were doing`}),`
`,(0,a.jsx)(t.li,{children:`They add extra goals: reading, interacting, and closing the Modal`}),`
`,(0,a.jsx)(t.li,{children:`They block the content in the background`}),`
`]}),`
`,(0,a.jsx)(t.h3,{children:`Guidelines`}),`
`,(0,a.jsxs)(t.ol,{children:[`
`,(0,a.jsx)(t.li,{children:`Use for important warnings to prevent or correct critical errors`}),`
`,(0,a.jsx)(t.li,{children:`Do not use for nonessential information unrelated to the user's current workflow`}),`
`,(0,a.jsx)(t.li,{children:`Use for requesting user input critical to the current process`}),`
`]}),`
`,(0,a.jsx)(t.h4,{children:`Nested modals`}),`
`,(0,a.jsx)(t.p,{children:`While it is possible to nest a Modal within another Modal, you as a developer must ensure the browser's back button (alongside the URL path) handles the nested Modal situation. A user should still be able to use the back button as expected and return to the last visited "page".`}),`
`,(0,a.jsx)(t.h2,{children:`Root Element (React Portal)`}),`
`,(0,a.jsxs)(t.p,{children:[`The Modal component uses `,(0,a.jsx)(t.a,{href:`/uilib/components/portal-root`,children:`PortalRoot`}),` internally to render its content. See the `,(0,a.jsx)(t.a,{href:`/uilib/components/portal-root`,children:`PortalRoot documentation`}),` for information on how to control where the portal content appears in the DOM.`]}),`
`,(0,a.jsx)(t.h3,{children:`Z-index`}),`
`,(0,a.jsxs)(t.p,{children:[`The Modal component is using `,(0,a.jsx)(t.strong,{children:`3000`}),` as the `,(0,a.jsx)(t.code,{children:`z-index`}),`.`]}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-css`,children:`:root {
  --modal-z-index: 3000;
}
`})}),`
`,(0,a.jsx)(t.h3,{children:`data-dnb-modal-active`}),`
`,(0,a.jsxs)(t.p,{children:[`When a Modal/Drawer is open, it will set an HTML attribute on the main HTML element called `,(0,a.jsx)(t.code,{children:`data-dnb-modal-active`}),`. The attribute value will be the ID of the current Modal/Drawer.`]}),`
`,(0,a.jsx)(t.p,{children:`This can be used to handle z-index issues from within CSS only:`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-css`,children:`html[data-dnb-modal-active='MODAL-ID'] {
  /* Your css */
}
`})})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}function c(e){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s,{}),`
`,(0,a.jsx)(i,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}export{l as default};