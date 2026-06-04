import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";var r=e(t());function i(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Typography`}),`
`,(0,r.jsx)(t.h2,{children:`Headings and styling`}),`
`,(0,r.jsxs)(t.p,{children:[`Never use headings (like `,(0,r.jsx)(t.code,{children:`<h3>`}),`) for purely styling purposes. Headings have a defined purpose and place in a web document. Using them correctly benefits all users.`]}),`
`,(0,r.jsxs)(t.p,{children:[`Use headings where you think that someone with a `,(0,r.jsx)(t.strong,{children:`screen reader`}),` would have the benefit of finding and reading a title.`]}),`
`,(0,r.jsx)(t.h3,{children:`Think semantics first`}),`
`,(0,r.jsxs)(t.p,{children:[`Heading levels should have their logical hierarchy and only `,(0,r.jsx)(t.strong,{children:`increase by one`}),`: `,(0,r.jsx)(t.code,{children:`<h1>`}),` followed by `,(0,r.jsx)(t.code,{children:`<h2>`}),` followed by `,(0,r.jsx)(t.code,{children:`<h3>`}),` and so on.`]}),`
`,(0,r.jsxs)(t.p,{children:[`For styling purposes, use these classes `,(0,r.jsx)(t.code,{children:`.dnb-h--xx-large`}),`, `,(0,r.jsx)(t.code,{children:`.dnb-h--x-large`}),`, `,(0,r.jsx)(t.code,{children:`.dnb-h--large`}),`, `,(0,r.jsx)(t.code,{children:`.dnb-h--medium`}),` (`,(0,r.jsx)(t.code,{children:`.dnb-lead`}),`) or style your typography according to the UX prototypes.`]}),`
`,(0,r.jsx)(t.h2,{children:`Line length and readability`}),`
`,(0,r.jsx)(t.p,{children:`For optimal readability and accessibility, maintain appropriate line lengths for text content. Long lines can be difficult to read, especially for users with dyslexia or visual impairments.`}),`
`,(0,r.jsx)(t.h3,{children:`Using proseMaxWidth for optimal line length`}),`
`,(0,r.jsxs)(t.p,{children:[`Typography components like `,(0,r.jsx)(t.code,{children:`H2`}),` and `,(0,r.jsx)(t.code,{children:`P`}),` support the `,(0,r.jsx)(t.code,{children:`proseMaxWidth`}),` property to limit text width based on character count, creating optimal reading line lengths:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`<H2 proseMaxWidth={80}>
  This heading will be limited to approximately 80 characters wide
</H2>
<P proseMaxWidth={60}>
  This paragraph will be limited to approximately 60 characters wide
</P>
`})}),`
`,(0,r.jsx)(t.h3,{children:`Accessibility benefits`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`Improved readability`}),`: Optimal line length reduces eye strain and improves comprehension`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`Better for screen readers`}),`: Shorter lines are easier to navigate with assistive technologies`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`Responsive design`}),`: Character-based width adapts to different font sizes and zoom levels`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`Dyslexia-friendly`}),`: Shorter lines help users with reading difficulties`]}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Recommended line lengths`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`Headings`}),`: 60-80 characters for optimal impact`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`Body text`}),`: 45-75 characters for comfortable reading`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`Captions and small text`}),`: 40-60 characters`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Disable local fonts`}),`
`,(0,r.jsx)(t.p,{children:`If you are actively developing, testing or measuring your web app, make sure you disable locally installed fonts which are being used as web fonts. This way you can ensure that the browser will not use these locally installed fonts and display the fonts the end user will actually see.`})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};