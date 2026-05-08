import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t,_i as n,xi as r}from"./index--zEB_f_m.js";var i=e();function a(e){let a={a:`a`,blockquote:`blockquote`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(a.h2,{children:[`Eufemia aims to be `,(0,i.jsx)(a.a,{href:`https://www.w3.org/TR/WCAG21/`,children:`WCAG 2.1`}),` compliant`]}),`
`,(0,i.jsx)(a.p,{children:`HTML elements are by default good at accessibility. Eufemia components and its building blocks are also made to include all the needed features to make them accessible.`}),`
`,(0,i.jsx)(a.h2,{children:`WCAG 2.1 and Universal design (UU)`}),`
`,(0,i.jsxs)(a.p,{children:[(0,i.jsx)(a.a,{href:`https://www.uutilsynet.no/webdirektivet-wad/eus-webdirektiv-wad/265`,children:`From year 2021`}),`, all new and existing web solutions have to follow `,(0,i.jsx)(a.a,{href:`https://www.w3.org/TR/WCAG21/`,children:`WCAG 2.1`}),`.`]}),`
`,(0,i.jsxs)(a.p,{children:[`On `,(0,i.jsx)(a.em,{children:`uutilsynet.no`}),` you can find an easy to read `,(0,i.jsx)(a.a,{href:`https://www.uutilsynet.no/wcag-standarden/wcag-20-standarden/86`,children:`WCAG guide (Norwegian)`}),`.`]}),`
`,(0,i.jsx)(a.h2,{children:`Main focus`}),`
`,(0,i.jsx)(a.p,{children:`As a developer, you have the responsibility to have the technical knowledge about accessibility. You have to implement and use best practices to make applications accessible for every user. We're talking about all kinds of users—people who have temporary or permanent disabilities who depend on what you put into the application as code. Therefore, you have to:`}),`
`,(0,i.jsxs)(a.ul,{children:[`
`,(0,i.jsxs)(a.li,{children:[`Test `,(0,i.jsx)(a.strong,{children:`keyboard navigation`}),` during development `,(0,i.jsx)(r,{icon:n,"aria-hidden":!0})]}),`
`,(0,i.jsxs)(a.li,{children:[`Test with `,(0,i.jsx)(a.strong,{children:`screen readers`}),` during development `,(0,i.jsx)(r,{icon:n,"aria-hidden":!0})]}),`
`,(0,i.jsxs)(a.li,{children:[`Test with `,(0,i.jsx)(a.strong,{children:`200%`}),` in `,(0,i.jsx)(a.code,{children:`font-size`}),` during development `,(0,i.jsx)(r,{icon:n,"aria-hidden":!0})]}),`
`,(0,i.jsxs)(a.li,{children:[`Test page at `,(0,i.jsx)(a.strong,{children:`320px`}),` screen width during development `,(0,i.jsx)(r,{icon:n,"aria-hidden":!0})]}),`
`,(0,i.jsxs)(a.li,{children:[`Test with `,(0,i.jsx)(a.strong,{children:`reduced motion`}),` preferences enabled `,(0,i.jsx)(r,{icon:n,"aria-hidden":!0})]}),`
`]}),`
`,(0,i.jsx)(a.h2,{children:`Reduced motion support`}),`
`,(0,i.jsxs)(a.p,{children:[`Eufemia respects the `,(0,i.jsx)(a.code,{children:`prefers-reduced-motion`}),` user preference, automatically reducing or removing animations and transitions for users with motion sensitivity or vestibular disorders. This includes:`]}),`
`,(0,i.jsxs)(a.ul,{children:[`
`,(0,i.jsx)(a.li,{children:`Modal and drawer animations`}),`
`,(0,i.jsx)(a.li,{children:`Accordion expansions/collapses`}),`
`,(0,i.jsx)(a.li,{children:`Progress indicator animations`}),`
`,(0,i.jsx)(a.li,{children:`Scroll behavior transitions`}),`
`,(0,i.jsx)(a.li,{children:`Icon rotations and transforms`}),`
`]}),`
`,(0,i.jsxs)(a.p,{children:[`All animations are automatically minimized when a user has enabled reduced motion in their operating system settings. This is compliant with `,(0,i.jsx)(a.a,{href:`https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html`,children:`WCAG 2.1 Success Criterion 2.3.3 Animation from Interactions`}),`.`]}),`
`,(0,i.jsx)(a.h2,{children:`Keyboard users`}),`
`,(0,i.jsxs)(a.p,{children:[`Should be able to navigate the application by their keyboard only. For those it is extremely important that `,(0,i.jsx)(a.a,{href:`/uilib/usage/accessibility/focus`,children:`active focus management`}),` is done right and has the required `,(0,i.jsx)(a.a,{href:`https://www.w3.org/TR/2008/REC-WCAG20-20081211/#navigation-mechanisms-focus-visible`,children:`focus ring`}),` in place.`]}),`
`,(0,i.jsxs)(a.blockquote,{children:[`
`,(0,i.jsxs)(a.p,{children:[(0,i.jsx)(a.a,{href:`https://www.w3.org/TR/WCAG21/#keyboard`,children:(0,i.jsx)(a.strong,{children:`2.1.1 Keyboard:`})}),` All functionality of the content is `,(0,i.jsx)(a.em,{children:`operable through a keyboard`}),` interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user's movement and not just the endpoints.`]}),`
`]}),`
`,(0,i.jsx)(a.h3,{children:`Your responsibility`}),`
`,(0,i.jsx)(a.p,{children:`You as a developer have to make sure your application supports keyboard navigation. This will also make your application more assistive technology and screen friendly.`}),`
`,(0,i.jsxs)(a.p,{children:[`The `,(0,i.jsx)(a.code,{children:`@dnb/eufemia`}),` and it's building blocks are supporting keyboard usage.`]}),`
`,(0,i.jsxs)(a.p,{children:[`Read more about `,(0,i.jsx)(a.a,{href:`/uilib/usage/accessibility/focus`,children:`focus management and the helper tools`}),`.`]}),`
`,(0,i.jsx)(a.h2,{children:`Screen reader users`}),`
`,(0,i.jsxs)(a.p,{children:[`Should be able to use the most commonly used screen readers like VoiceOver (Apple devices) and NVDA or JAWS on Windows. Read more about `,(0,i.jsx)(a.a,{href:`/uilib/usage/accessibility/screenreader`,children:`screen readers`}),`.`]}),`
`,(0,i.jsxs)(a.blockquote,{children:[`
`,(0,i.jsxs)(a.p,{children:[(0,i.jsx)(a.a,{href:`https://www.w3.org/TR/WCAG21/#compatible`,children:(0,i.jsx)(a.strong,{children:`4.1 Compatible:`})}),` Maximize compatibility with current and future user agents, `,(0,i.jsx)(a.em,{children:`including assistive technologies`}),`.`]}),`
`]}),`
`,(0,i.jsx)(a.h3,{children:`Your responsibility`}),`
`,(0,i.jsxs)(a.p,{children:[`Good keyboard support is crucial to making web applications accessible for assistive technologies. So - `,(0,i.jsx)(a.a,{href:`/uilib/usage/accessibility/checklist/#landmark--and-semantics-example`,children:`think landmark and semantics first`}),`. This also includes `,(0,i.jsx)(a.a,{href:`/uilib/usage/best-practices/for-typography#think-semantics-first`,children:`typography`}),` and best practices for `,(0,i.jsx)(a.a,{href:`/uilib/usage/accessibility/screenreader`,children:`images and illustrations`}),`.`]}),`
`,(0,i.jsx)(a.h2,{children:`Typography accessibility`}),`
`,(0,i.jsx)(a.p,{children:`Typography plays a crucial role in accessibility. Beyond semantic markup, consider:`}),`
`,(0,i.jsxs)(a.ul,{children:[`
`,(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.strong,{children:`Line length`}),`: Use the `,(0,i.jsx)(a.code,{children:`proseMaxWidth`}),` property on typography components to maintain optimal reading line lengths`]}),`
`,(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.strong,{children:`Font scaling`}),`: Ensure text remains readable at 200% zoom`]}),`
`,(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.strong,{children:`Contrast`}),`: Maintain sufficient color contrast between text and background`]}),`
`,(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.strong,{children:`Spacing`}),`: Use consistent spacing that works with assistive technologies`]}),`
`]}),`
`,(0,i.jsxs)(a.p,{children:[`Read more about `,(0,i.jsx)(a.a,{href:`/uilib/usage/best-practices/for-typography#line-length-and-readability`,children:`typography best practices`}),` for accessibility.`]}),`
`,(0,i.jsxs)(a.h2,{children:[(0,i.jsx)(a.strong,{children:`200%`}),` in `,(0,i.jsx)(a.code,{children:`font-size`}),` {#font-size}`]}),`
`,(0,i.jsxs)(a.p,{children:[`The `,(0,i.jsx)(a.a,{href:`https://www.w3.org/TR/WCAG21/`,children:`WCAG 2.1`}),` document is describing it clearly:`]}),`
`,(0,i.jsxs)(a.blockquote,{children:[`
`,(0,i.jsxs)(a.p,{children:[(0,i.jsx)(a.a,{href:`https://www.w3.org/TR/WCAG21/#resize-text`,children:(0,i.jsx)(a.strong,{children:`1.4.4 Resize text:`})}),` Text can be resized without assistive technology `,(0,i.jsx)(a.em,{children:`up to 200 percent without loss of content or functionality`}),`.`,(0,i.jsx)(`br`,{}),(0,i.jsx)(`br`,{}),` `,(0,i.jsx)(a.a,{href:`https://www.w3.org/TR/WCAG21/#visual-presentation`,children:(0,i.jsx)(a.strong,{children:`1.4.8 Visual Presentation:`})}),` Text can be resized without assistive technology up to 200 percent in a way that `,(0,i.jsx)(a.em,{children:`does not require the user to scroll horizontally`}),` to read a line of text.`]}),`
`]}),`
`,(0,i.jsx)(a.h3,{children:`Your responsibility`}),`
`,(0,i.jsxs)(a.p,{children:[`This means; every application `,(0,i.jsx)(a.strong,{children:`has to be made responsive`}),`. Even if the application lives in a static sized container (960px). Use your browser or system settings to change the `,(0,i.jsx)(a.code,{children:`font-size`}),` for testing purposes.`]}),`
`,(0,i.jsxs)(a.p,{children:[`Read `,(0,i.jsx)(a.a,{href:`/uilib/layout`,children:`more about responsive layouts`}),`.`]}),`
`,(0,i.jsxs)(a.p,{children:[`The `,(0,i.jsx)(a.code,{children:`@dnb/eufemia`}),` and its building blocks are build from ground up to support font-size adaption automatically.`]}),`
`,(0,i.jsx)(a.h2,{children:`320px screen width minimum`}),`
`,(0,i.jsx)(a.p,{children:`This is to ensure that users with visual limitations can sufficiently zoom the page even on a medium-sized monitor. It's equivalent to 400% zoom in a 1280px viewport.`}),`
`,(0,i.jsxs)(a.blockquote,{children:[`
`,(0,i.jsxs)(a.p,{children:[(0,i.jsx)(a.a,{href:`https://www.w3.org/TR/WCAG21/#reflow`,children:(0,i.jsx)(a.strong,{children:`1.4.10 Reflow:`})}),` Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for: Vertical scrolling content at a width equivalent to 320 CSS pixels.`]}),`
`]}),`
`,(0,i.jsx)(a.p,{children:`Make sure that you take into consideration any paddings that might be added around your content. If the content you are working on will be placed inside a container with 16px padding on each side, you will need to test at 288px (320 - 16 - 16).`})]})}function o(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}export{o as default};