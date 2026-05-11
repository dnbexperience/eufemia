import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";var n=e();function r(e){let r={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`Typography`}),`
`,(0,n.jsx)(r.h2,{children:`Headings and styling`}),`
`,(0,n.jsxs)(r.p,{children:[`Never use headings (like `,(0,n.jsx)(r.code,{children:`<h3>`}),`) for purely styling purposes. Headings have a defined purpose and place in a web document. Using them correctly benefits all users.`]}),`
`,(0,n.jsxs)(r.p,{children:[`Use headings where you think that someone with a `,(0,n.jsx)(r.strong,{children:`screen reader`}),` would have the benefit of finding and reading a title.`]}),`
`,(0,n.jsx)(r.h3,{children:`Think semantics first`}),`
`,(0,n.jsxs)(r.p,{children:[`Heading levels should have their logical hierarchy and only `,(0,n.jsx)(r.strong,{children:`increase by one`}),`: `,(0,n.jsx)(r.code,{children:`<h1>`}),` followed by `,(0,n.jsx)(r.code,{children:`<h2>`}),` followed by `,(0,n.jsx)(r.code,{children:`<h3>`}),` and so on.`]}),`
`,(0,n.jsxs)(r.p,{children:[`For styling purposes, use these classes `,(0,n.jsx)(r.code,{children:`.dnb-h--xx-large`}),`, `,(0,n.jsx)(r.code,{children:`.dnb-h--x-large`}),`, `,(0,n.jsx)(r.code,{children:`.dnb-h--large`}),`, `,(0,n.jsx)(r.code,{children:`.dnb-h--medium`}),` (`,(0,n.jsx)(r.code,{children:`.dnb-lead`}),`) or style your typography according to the UX prototypes.`]}),`
`,(0,n.jsx)(r.h2,{children:`Line length and readability`}),`
`,(0,n.jsx)(r.p,{children:`For optimal readability and accessibility, maintain appropriate line lengths for text content. Long lines can be difficult to read, especially for users with dyslexia or visual impairments.`}),`
`,(0,n.jsx)(r.h3,{children:`Using proseMaxWidth for optimal line length`}),`
`,(0,n.jsxs)(r.p,{children:[`Typography components like `,(0,n.jsx)(r.code,{children:`H2`}),` and `,(0,n.jsx)(r.code,{children:`P`}),` support the `,(0,n.jsx)(r.code,{children:`proseMaxWidth`}),` property to limit text width based on character count, creating optimal reading line lengths:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`<H2 proseMaxWidth={80}>
  This heading will be limited to approximately 80 characters wide
</H2>
<P proseMaxWidth={60}>
  This paragraph will be limited to approximately 60 characters wide
</P>
`})}),`
`,(0,n.jsx)(r.h3,{children:`Accessibility benefits`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Improved readability`}),`: Optimal line length reduces eye strain and improves comprehension`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Better for screen readers`}),`: Shorter lines are easier to navigate with assistive technologies`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Responsive design`}),`: Character-based width adapts to different font sizes and zoom levels`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Dyslexia-friendly`}),`: Shorter lines help users with reading difficulties`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Recommended line lengths`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Headings`}),`: 60-80 characters for optimal impact`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Body text`}),`: 45-75 characters for comfortable reading`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`Captions and small text`}),`: 40-60 characters`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Disable local fonts`}),`
`,(0,n.jsx)(r.p,{children:`If you are actively developing, testing or measuring your web app, make sure you disable locally installed fonts which are being used as web fonts. This way you can ensure that the browser will not use these locally installed fonts and display the fonts the end user will actually see.`})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};