import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";var n=e();function r(e){let r={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`Screen readers`}),`
`,(0,n.jsx)(r.p,{children:`In order for screen reader users to be able to properly navigate and access content, you need to architect and develop navigation and content presentation with screen readers in mind.`}),`
`,(0,n.jsxs)(r.p,{children:[`To avoid much work afterwards, make sure you actually check your application with a screen reader `,(0,n.jsx)(r.strong,{children:`regularly during development`}),`.`]}),`
`,(0,n.jsx)(r.h2,{children:`Mobile`}),`
`,(0,n.jsxs)(r.p,{children:[`Also, screen readers `,(0,n.jsx)(r.strong,{children:`behave differently`}),` on mobile phones than desktop browsers. So, use both in your frontend tooling.`]}),`
`,(0,n.jsx)(r.h2,{children:`Focus Highlight for NVDA`}),`
`,(0,n.jsxs)(r.p,{children:[`If you are using NVDA on Windows to test your application, there is an NVDA add-on, called `,(0,n.jsx)(r.a,{href:`https://addons.nvda-project.org/addons/focusHighlight.en.html`,children:`Focus Highlight`}),`, showing the current focus visually. This makes it so much easier to navigate and understand where you currently are in the context.`]}),`
`,(0,n.jsx)(r.h2,{children:`Images and illustrations`}),`
`,(0,n.jsxs)(r.p,{children:[`Example usage of `,(0,n.jsx)(r.code,{children:`role`}),`, `,(0,n.jsx)(r.code,{children:`aria-label`}),`, `,(0,n.jsx)(r.code,{children:`aria-labelledby`}),` and `,(0,n.jsx)(r.code,{children:`aria-hidden`}),`. There is no one fits all. It depends on the situation what accessibility features you have to prefer over others. But in general:`]}),`
`,(0,n.jsxs)(r.blockquote,{children:[`
`,(0,n.jsx)(r.p,{children:`Try to use HTML 5 first, and use ARIA as sugar on top.`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`Some random examples of image and illustration usage:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-html`,children:`<a class="dnb-anchor" aria-label="descriptive text" href="/action">
  <svg aria-hidden="true">icon only ...</svg>
</a>

<a class="dnb-anchor" href="/action">
  <svg>
    <title>descriptive text</title>
    icon only ...
  </svg>
</a>

<img role="presentation" aria-label="descriptive text" src="..." />

<svg role="img" alt="descriptive text" src="..." />

<figure>
  <img alt="image alt" src="..." aria-hidden="true" />
  <figcaption>Descriptive text <cite>reference etc.</cite></figcaption>
</figure>

<object data="..." aria-labelledby="figure-id" />
<label id="figure-id">descriptive text</label>
`})}),`
`,(0,n.jsx)(r.h2,{children:`Usage of aria-label, aria-labelledby, and aria-describedby`}),`
`,(0,n.jsxs)(r.p,{children:[`There are limitations to when or where you can use `,(0,n.jsx)(r.code,{children:`aria-label`}),`, `,(0,n.jsx)(r.code,{children:`aria-labelledby`}),`, and `,(0,n.jsx)(r.code,{children:`aria-describedby`}),` attributes, because they do not work consistently with all HTML elements.`]}),`
`,(0,n.jsxs)(r.p,{children:[`The `,(0,n.jsx)(r.code,{children:`aria-label`}),` and `,(0,n.jsx)(r.code,{children:`aria-labelledby`}),` attributes can be used to give an element an accessible name.
The `,(0,n.jsx)(r.code,{children:`aria-describedby`}),` attribute can be used to give an element an accessible description.`]}),`
`,(0,n.jsxs)(r.p,{children:[`Do `,(0,n.jsx)(r.strong,{children:`not`}),` use `,(0,n.jsx)(r.code,{children:`aria-label`}),`, `,(0,n.jsx)(r.code,{children:`aria-labelledby`}),`, or `,(0,n.jsx)(r.code,{children:`aria-describedby`}),` with any other elements like:`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`div`}),`, `,(0,n.jsx)(r.code,{children:`span`}),`, `,(0,n.jsx)(r.code,{children:`p`}),`, `,(0,n.jsx)(r.code,{children:`blockquote`}),`, or `,(0,n.jsx)(r.code,{children:`strong`}),` etc.`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`they generally won’t work across all assistive technology combinations (screen readers).`}),`
`,(0,n.jsx)(r.h3,{children:`Where can I use them?`}),`
`,(0,n.jsxs)(r.p,{children:[`The `,(0,n.jsx)(r.code,{children:`aria-label`}),`, `,(0,n.jsx)(r.code,{children:`aria-labelledby`}),`, and `,(0,n.jsx)(r.code,{children:`aria-describedby`}),` attributes can be used with:`]}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`interactive HTML elements like `,(0,n.jsx)(r.code,{children:`<a>`}),` (when the href attribute is present), `,(0,n.jsx)(r.code,{children:`audio`}),` and `,(0,n.jsx)(r.code,{children:`video`}),` (when the controls attribute is present), `,(0,n.jsx)(r.code,{children:`input`}),` (unless they are of type="hidden"), `,(0,n.jsx)(r.code,{children:`button`}),`, and `,(0,n.jsx)(r.code,{children:`textarea`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`elements that have a landmark role – either implicit (`,(0,n.jsx)(r.code,{children:`header`}),`, `,(0,n.jsx)(r.code,{children:`footer`}),`, `,(0,n.jsx)(r.code,{children:`main`}),`, `,(0,n.jsx)(r.code,{children:`nav`}),`, `,(0,n.jsx)(r.code,{children:`aside`}),`, `,(0,n.jsx)(r.code,{children:`section`}),`, and `,(0,n.jsx)(r.code,{children:`form`}),`) or explicitly set via the role attribute.`]}),`
`,(0,n.jsxs)(r.li,{children:[`elements that have an explicit widget role applied, using the role attribute – there are 27 widget roles in ARIA 1.1, including `,(0,n.jsx)(r.code,{children:`dialog`}),`, `,(0,n.jsx)(r.code,{children:`slider`}),`, `,(0,n.jsx)(r.code,{children:`progressbar`}),`, and `,(0,n.jsx)(r.code,{children:`tooltip`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`elements like `,(0,n.jsx)(r.code,{children:`img`}),`, `,(0,n.jsx)(r.code,{children:`figure`}),` and `,(0,n.jsx)(r.code,{children:`iframe`}),`.`]}),`
`]})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};