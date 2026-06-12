import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./Icon-HRQtcCxf.js";import{t as r}from"./check-BJWc8kYn.js";import{K as i}from"./index-CsG353ar.js";var a=e(t());function o(e){let t={a:`a`,blockquote:`blockquote`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...i(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(t.h2,{children:[`Eufemia aims to be `,(0,a.jsx)(t.a,{href:`https://www.w3.org/TR/WCAG21/`,children:`WCAG 2.1`}),` compliant`]}),`
`,(0,a.jsx)(t.p,{children:`HTML elements are by default good at accessibility. Eufemia components and its building blocks are also made to include all the needed features to make them accessible.`}),`
`,(0,a.jsx)(t.h2,{children:`WCAG 2.1 and Universal design (UU)`}),`
`,(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.a,{href:`https://www.uutilsynet.no/webdirektivet-wad/eus-webdirektiv-wad/265`,children:`From year 2021`}),`, all new and existing web solutions have to follow `,(0,a.jsx)(t.a,{href:`https://www.w3.org/TR/WCAG21/`,children:`WCAG 2.1`}),`.`]}),`
`,(0,a.jsxs)(t.p,{children:[`On `,(0,a.jsx)(t.em,{children:`uutilsynet.no`}),` you can find an easy to read `,(0,a.jsx)(t.a,{href:`https://www.uutilsynet.no/wcag-standarden/wcag-20-standarden/86`,children:`WCAG guide (Norwegian)`}),`.`]}),`
`,(0,a.jsx)(t.h2,{children:`Main focus`}),`
`,(0,a.jsx)(t.p,{children:`As a developer, you have the responsibility to have the technical knowledge about accessibility. You have to implement and use best practices to make applications accessible for every user. We're talking about all kinds of users—people who have temporary or permanent disabilities who depend on what you put into the application as code. Therefore, you have to:`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsxs)(t.li,{children:[`Test `,(0,a.jsx)(t.strong,{children:`keyboard navigation`}),` during development `,(0,a.jsx)(n,{icon:r,"aria-hidden":!0})]}),`
`,(0,a.jsxs)(t.li,{children:[`Test with `,(0,a.jsx)(t.strong,{children:`screen readers`}),` during development `,(0,a.jsx)(n,{icon:r,"aria-hidden":!0})]}),`
`,(0,a.jsxs)(t.li,{children:[`Test with `,(0,a.jsx)(t.strong,{children:`200%`}),` in `,(0,a.jsx)(t.code,{children:`font-size`}),` during development `,(0,a.jsx)(n,{icon:r,"aria-hidden":!0})]}),`
`,(0,a.jsxs)(t.li,{children:[`Test page at `,(0,a.jsx)(t.strong,{children:`320px`}),` screen width during development `,(0,a.jsx)(n,{icon:r,"aria-hidden":!0})]}),`
`,(0,a.jsxs)(t.li,{children:[`Test with `,(0,a.jsx)(t.strong,{children:`reduced motion`}),` preferences enabled `,(0,a.jsx)(n,{icon:r,"aria-hidden":!0})]}),`
`]}),`
`,(0,a.jsx)(t.h2,{children:`Reduced motion support`}),`
`,(0,a.jsxs)(t.p,{children:[`Eufemia respects the `,(0,a.jsx)(t.code,{children:`prefers-reduced-motion`}),` user preference, automatically reducing or removing animations and transitions for users with motion sensitivity or vestibular disorders. This includes:`]}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:`Modal and drawer animations`}),`
`,(0,a.jsx)(t.li,{children:`Accordion expansions/collapses`}),`
`,(0,a.jsx)(t.li,{children:`Progress indicator animations`}),`
`,(0,a.jsx)(t.li,{children:`Scroll behavior transitions`}),`
`,(0,a.jsx)(t.li,{children:`Icon rotations and transforms`}),`
`]}),`
`,(0,a.jsxs)(t.p,{children:[`All animations are automatically minimized when a user has enabled reduced motion in their operating system settings. This is compliant with `,(0,a.jsx)(t.a,{href:`https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html`,children:`WCAG 2.1 Success Criterion 2.3.3 Animation from Interactions`}),`.`]}),`
`,(0,a.jsx)(t.h2,{children:`Keyboard users`}),`
`,(0,a.jsxs)(t.p,{children:[`Should be able to navigate the application by their keyboard only. For those it is extremely important that `,(0,a.jsx)(t.a,{href:`/uilib/usage/accessibility/focus`,children:`active focus management`}),` is done right and has the required `,(0,a.jsx)(t.a,{href:`https://www.w3.org/TR/2008/REC-WCAG20-20081211/#navigation-mechanisms-focus-visible`,children:`focus ring`}),` in place.`]}),`
`,(0,a.jsxs)(t.blockquote,{children:[`
`,(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.a,{href:`https://www.w3.org/TR/WCAG21/#keyboard`,children:(0,a.jsx)(t.strong,{children:`2.1.1 Keyboard:`})}),` All functionality of the content is `,(0,a.jsx)(t.em,{children:`operable through a keyboard`}),` interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user's movement and not just the endpoints.`]}),`
`]}),`
`,(0,a.jsx)(t.h3,{children:`Your responsibility`}),`
`,(0,a.jsx)(t.p,{children:`You as a developer have to make sure your application supports keyboard navigation. This will also make your application more assistive technology and screen friendly.`}),`
`,(0,a.jsxs)(t.p,{children:[`The `,(0,a.jsx)(t.code,{children:`@dnb/eufemia`}),` and it's building blocks are supporting keyboard usage.`]}),`
`,(0,a.jsxs)(t.p,{children:[`Read more about `,(0,a.jsx)(t.a,{href:`/uilib/usage/accessibility/focus`,children:`focus management and the helper tools`}),`.`]}),`
`,(0,a.jsx)(t.h2,{children:`Screen reader users`}),`
`,(0,a.jsxs)(t.p,{children:[`Should be able to use the most commonly used screen readers like VoiceOver (Apple devices) and NVDA or JAWS on Windows. Read more about `,(0,a.jsx)(t.a,{href:`/uilib/usage/accessibility/screenreader`,children:`screen readers`}),`.`]}),`
`,(0,a.jsxs)(t.blockquote,{children:[`
`,(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.a,{href:`https://www.w3.org/TR/WCAG21/#compatible`,children:(0,a.jsx)(t.strong,{children:`4.1 Compatible:`})}),` Maximize compatibility with current and future user agents, `,(0,a.jsx)(t.em,{children:`including assistive technologies`}),`.`]}),`
`]}),`
`,(0,a.jsx)(t.h3,{children:`Your responsibility`}),`
`,(0,a.jsxs)(t.p,{children:[`Good keyboard support is crucial to making web applications accessible for assistive technologies. So - `,(0,a.jsx)(t.a,{href:`/uilib/usage/accessibility/checklist/#landmark--and-semantics-example`,children:`think landmark and semantics first`}),`. This also includes `,(0,a.jsx)(t.a,{href:`/uilib/usage/best-practices/for-typography#think-semantics-first`,children:`typography`}),` and best practices for `,(0,a.jsx)(t.a,{href:`/uilib/usage/accessibility/screenreader`,children:`images and illustrations`}),`.`]}),`
`,(0,a.jsx)(t.h2,{children:`Typography accessibility`}),`
`,(0,a.jsx)(t.p,{children:`Typography plays a crucial role in accessibility. Beyond semantic markup, consider:`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:`Line length`}),`: Use the `,(0,a.jsx)(t.code,{children:`proseMaxWidth`}),` property on typography components to maintain optimal reading line lengths`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:`Font scaling`}),`: Ensure text remains readable at 200% zoom`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:`Contrast`}),`: Maintain sufficient color contrast between text and background`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:`Spacing`}),`: Use consistent spacing that works with assistive technologies`]}),`
`]}),`
`,(0,a.jsxs)(t.p,{children:[`Read more about `,(0,a.jsx)(t.a,{href:`/uilib/usage/best-practices/for-typography#line-length-and-readability`,children:`typography best practices`}),` for accessibility.`]}),`
`,(0,a.jsxs)(t.h2,{children:[(0,a.jsx)(t.strong,{children:`200%`}),` in `,(0,a.jsx)(t.code,{children:`font-size`}),` {#font-size}`]}),`
`,(0,a.jsxs)(t.p,{children:[`The `,(0,a.jsx)(t.a,{href:`https://www.w3.org/TR/WCAG21/`,children:`WCAG 2.1`}),` document is describing it clearly:`]}),`
`,(0,a.jsxs)(t.blockquote,{children:[`
`,(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.a,{href:`https://www.w3.org/TR/WCAG21/#resize-text`,children:(0,a.jsx)(t.strong,{children:`1.4.4 Resize text:`})}),` Text can be resized without assistive technology `,(0,a.jsx)(t.em,{children:`up to 200 percent without loss of content or functionality`}),`.`,(0,a.jsx)(`br`,{}),(0,a.jsx)(`br`,{}),` `,(0,a.jsx)(t.a,{href:`https://www.w3.org/TR/WCAG21/#visual-presentation`,children:(0,a.jsx)(t.strong,{children:`1.4.8 Visual Presentation:`})}),` Text can be resized without assistive technology up to 200 percent in a way that `,(0,a.jsx)(t.em,{children:`does not require the user to scroll horizontally`}),` to read a line of text.`]}),`
`]}),`
`,(0,a.jsx)(t.h3,{children:`Your responsibility`}),`
`,(0,a.jsxs)(t.p,{children:[`This means; every application `,(0,a.jsx)(t.strong,{children:`has to be made responsive`}),`. Even if the application lives in a static sized container (960px). Use your browser or system settings to change the `,(0,a.jsx)(t.code,{children:`font-size`}),` for testing purposes.`]}),`
`,(0,a.jsxs)(t.p,{children:[`Read `,(0,a.jsx)(t.a,{href:`/uilib/layout`,children:`more about responsive layouts`}),`.`]}),`
`,(0,a.jsxs)(t.p,{children:[`The `,(0,a.jsx)(t.code,{children:`@dnb/eufemia`}),` and its building blocks are build from ground up to support font-size adaption automatically.`]}),`
`,(0,a.jsx)(t.h2,{children:`320px screen width minimum`}),`
`,(0,a.jsx)(t.p,{children:`This is to ensure that users with visual limitations can sufficiently zoom the page even on a medium-sized monitor. It's equivalent to 400% zoom in a 1280px viewport.`}),`
`,(0,a.jsxs)(t.blockquote,{children:[`
`,(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.a,{href:`https://www.w3.org/TR/WCAG21/#reflow`,children:(0,a.jsx)(t.strong,{children:`1.4.10 Reflow:`})}),` Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for: Vertical scrolling content at a width equivalent to 320 CSS pixels.`]}),`
`]}),`
`,(0,a.jsx)(t.p,{children:`Make sure that you take into consideration any paddings that might be added around your content. If the content you are working on will be placed inside a container with 16px padding on each side, you will need to test at 288px (320 - 16 - 16).`})]})}function s(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}export{s as default};